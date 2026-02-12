
"use server"

import { prisma } from "@/lib/prisma"
import { calculateTotalPV, calculateRank } from "@/lib/pv-calculations"
import { revalidatePath } from "next/cache"

interface CreateOrderParams {
    userId: string
    market: "MY" | "SG"
    currency: "MYR" | "SGD"
    items: { productId: string; quantity: number }[]
}

export async function createOrder({ userId, market, currency, items }: CreateOrderParams) {
    try {
        // 1. Fetch products to get prices and PV
        const productIds = items.map(i => i.productId)
        const products = await prisma.product.findMany({
            where: { id: { in: productIds } }
        })

        const productMap = new Map(products.map(p => [p.id, p]))

        // 2. Calculate totals
        let totalAmount = 0
        let totalPV = 0
        const orderItemsEndpointData: {
            productId: string
            qty: number
            unitPrice: number
            unitPv: number
        }[] = []

        for (const item of items) {
            const product = productMap.get(item.productId)
            if (!product) throw new Error(`Product ${item.productId} not found`)

            const price = currency === "MYR" ? Number(product.priceMyr) : Number(product.priceSgd)
            const lineTotal = price * item.quantity
            const linePV = product.pvValue * item.quantity

            totalAmount += lineTotal
            totalPV += linePV

            orderItemsEndpointData.push({
                productId: product.id,
                qty: item.quantity,
                unitPrice: price,
                unitPv: product.pvValue
            })
        }

        // 3. Transaction
        const result = await prisma.$transaction(async (tx) => {
            // A. Create Order
            const order = await tx.order.create({
                data: {
                    userId,
                    market,
                    currency,
                    totalAmount,
                    totalPv: totalPV,
                    status: "PAID", // Simulating immediate payment
                    orderItems: {
                        create: orderItemsEndpointData
                    }
                }
            })

            // B. Update Member Stats
            // Upsert stats for user
            const stats = await tx.memberStats.upsert({
                where: { userId },
                create: {
                    userId,
                    pvMonth: totalPV,
                    pvLifetime: totalPV,
                    rank: "SILVER" // Default logic
                },
                update: {
                    pvMonth: { increment: totalPV },
                    pvLifetime: { increment: totalPV }
                }
            })

            // C. Check Rank Upgrade
            const newRank = calculateRank(stats.pvLifetime)
            if (newRank !== stats.rank) {
                await tx.memberStats.update({
                    where: { userId },
                    data: { rank: newRank }
                })
            }

            // D. Check Rewards
            // Fetch active reward rules
            const rules = await tx.rewardRule.findMany({ where: { active: true } })

            // Fetch existing rewards for this user to prevent duplicates if rule is one-time (optional logic)
            // For now, simple implementation: Check if threshold matches logic. 
            // NOTE: "Accumulation" logic often implies triggering when crossing a threshold.
            // Here we will check if the NEW lifetime PV satisfies rules that weren't satisfied before? 
            // OR mostly simply: check if current total matches criteria.

            // Let's implement a simple check: specific thresholds trigger specific rewards.
            // 300 PV -> Free Shipping
            // 450 PV -> RM 20 Voucher
            // 1000 PV -> VIP Status

            for (const rule of rules) {
                // Check if user qualifies
                if (stats.pvLifetime >= rule.pvThreshold) {
                    // Check if user ALREADY has this reward (to avoid spamming one-time rewards)
                    const existing = await tx.userReward.findFirst({
                        where: {
                            userId,
                            ruleId: rule.id
                        }
                    })

                    if (!existing) {
                        await tx.userReward.create({
                            data: {
                                userId,
                                ruleId: rule.id,
                                status: "ISSUED"
                            }
                        })
                    }
                }
            }

            return { order, stats, newRank }
        })

        revalidatePath('/dashboard')
        revalidatePath('/dashboard/rewards')

        return { success: true, orderId: result.order.id, accruedPV: totalPV }

    } catch (error) {
        console.error(error)
        return { success: false, error: "Failed to create order" }
    }
}

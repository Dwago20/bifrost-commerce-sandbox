
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding data...')

    // 1. Reward Rules
    const rules = [
        {
            name: 'Free Shipping',
            pvThreshold: 300,
            rewardType: 'SHIPPING',
            rewardValue: 'FREE',
            active: true,
        },
        {
            name: 'RM20 Voucher',
            pvThreshold: 500,
            rewardType: 'VOUCHER',
            rewardValue: '20',
            active: true,
        },
        {
            name: 'VIP Status + Voucher',
            pvThreshold: 1000,
            rewardType: 'STATUS',
            rewardValue: 'VIP_AND_50_VOUCHER',
            active: true,
        },
    ]

    for (const rule of rules) {
        await prisma.rewardRule.create({
            data: rule,
        })
    }

    // 2. Products (30 items)
    const products = []
    for (let i = 1; i <= 30; i++) {
        const isSg = i % 2 === 0
        const basePrice = (i * 10) + 9
        products.push({
            name: `Product ${i}`,
            description: `Description for Product ${i}`,
            priceMyr: basePrice,
            priceSgd: Math.round(basePrice / 3), // Approx conversion
            pvValue: Math.floor(basePrice * 0.8), // PV is usually close to price
            active: true,
        })
    }

    for (const product of products) {
        await prisma.product.create({
            data: product,
        })
    }

    console.log('Seeding completed.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

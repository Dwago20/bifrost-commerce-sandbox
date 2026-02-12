import { Product } from "@prisma/client"

export function calculateTotalPV(items: { product: Product; quantity: number }[]): number {
    return items.reduce((total, item) => {
        return total + (item.product.pvValue * item.quantity)
    }, 0)
}

export function calculateRank(lifetimePV: number): "Silver" | "Gold" | "Platinum" {
    if (lifetimePV >= 1000) return "Platinum"
    if (lifetimePV >= 300) return "Gold"
    return "Silver"
}

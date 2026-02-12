
"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createOrder } from "@/actions/order"
import { useMarket } from "@/context/MarketContext"
import { Product } from "@prisma/client"

interface CheckoutFormProps {
    products: Product[]
    testUserId: string
}

export function CheckoutForm({ products, testUserId }: CheckoutFormProps) {
    const { market, currency } = useMarket()
    const [isPending, startTransition] = useTransition()
    const [quantities, setQuantities] = useState<Record<string, number>>({})
    const [result, setResult] = useState<{ success: boolean; accruedPV?: number; error?: string } | null>(null)

    const handleCreateOrder = () => {
        const items = Object.entries(quantities)
            .filter(([_, qty]) => qty > 0)
            .map(([productId, quantity]) => ({ productId, quantity }))

        if (items.length === 0) return alert("Select at least one item")

        startTransition(async () => {
            const res = await createOrder({
                userId: testUserId,
                market,
                currency,
                items
            })
            setResult(res)
        })
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="p-4 space-y-4">
                    <h3 className="font-semibold">Test Products</h3>
                    {products.map(product => (
                        <div key={product.id} className="flex justify-between items-center bg-muted/20 p-2 rounded">
                            <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {currency} {currency === "MYR" ? product.priceMyr.toString() : product.priceSgd.toString()}
                                    {" / "}
                                    <span className="text-primary font-bold">{product.pvValue} PV</span>
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setQuantities(prev => ({ ...prev, [product.id]: Math.max(0, (prev[product.id] || 0) - 1) }))}
                                >-</Button>
                                <span className="w-8 text-center">{quantities[product.id] || 0}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setQuantities(prev => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }))}
                                >+</Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Button onClick={handleCreateOrder} disabled={isPending} className="w-full">
                {isPending ? "Processing..." : `Place Order (${market})`}
            </Button>

            {result && (
                <div className={`p-4 rounded border ${result.success ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
                    {result.success ? `Order Successful! Earned ${result.accruedPV} PV.` : `Error: ${result.error}`}
                </div>
            )}
        </div>
    )
}

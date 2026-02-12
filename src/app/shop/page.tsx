"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useMarket } from "@/context/MarketContext"

export default function ShopPage() {
    const { currency, market } = useMarket()

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Shop ({market})</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i}>
                        <CardHeader>
                            <CardTitle>Product {i}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Description for Product {i}</p>
                            <p className="font-bold mt-2">
                                {currency} {market === "MY" ? (i * 10).toFixed(2) : (i * 10 * 0.3).toFixed(2)}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button>Add to Cart</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

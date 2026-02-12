
import { Button } from "@/components/ui/button"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-4">Product {id}</h1>
            <p className="text-gray-600 mb-6">Detailed description goes here.</p>
            <div className="flex gap-4 items-center">
                <span className="text-2xl font-bold">RM 99.00</span>
                <Button>Add to Cart</Button>
            </div>
        </div>
    )
}

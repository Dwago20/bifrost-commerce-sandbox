
import { Button } from "@/components/ui/button"

export default function CartPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            <div className="border p-4 rounded-lg mb-6">
                <p>Cart is empty (for now).</p>
            </div>
            <div className="flex justify-end">
                <Button>Proceed to Checkout</Button>
            </div>
        </div>
    )
}

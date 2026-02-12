
import { CheckoutForm } from "@/components/CheckoutForm"
import { prisma } from "@/lib/prisma"

export default async function CheckoutPage() {
    // Determine or create a test user
    let testUser = await prisma.user.findFirst({ where: { email: "test@example.com" } })
    if (!testUser) {
        testUser = await prisma.user.create({
            data: {
                name: "Test User",
                email: "test@example.com",
            }
        })
    }

    // Fetch some products
    const products = await prisma.product.findMany({ take: 5 })

    return (
        <div className="container mx-auto py-10 max-w-md">
            <h1 className="text-3xl font-bold mb-6">Checkout (PV Simulation)</h1>
            <p className="mb-4 text-sm text-gray-500">User: {testUser.email}</p>
            <CheckoutForm products={products} testUserId={testUser.id} />
        </div>
    )
}

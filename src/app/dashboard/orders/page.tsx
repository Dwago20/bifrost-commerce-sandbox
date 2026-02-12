
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrdersPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Order History</h1>
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Order #1001</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Date: 2023-10-25</p>
                    <p>Total: RM 150.00</p>
                    <p>Status: Pending</p>
                </CardContent>
            </Card>
        </div>
    )
}


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function AdminOrdersPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Total (MYR)</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>#1001</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>150.00</TableCell>
                        <TableCell><Badge>Pending</Badge></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

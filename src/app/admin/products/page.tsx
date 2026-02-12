
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminProductsPage() {
    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between mb-6">
                <h1 className="text-3xl font-bold">Manage Products</h1>
                <Button>Add Product</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price (MYR)</TableHead>
                        <TableHead>PV</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Product 1</TableCell>
                        <TableCell>19.00</TableCell>
                        <TableCell>15</TableCell>
                        <TableCell>
                            <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

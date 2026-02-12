
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminRewardsPage() {
    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between mb-6">
                <h1 className="text-3xl font-bold">Manage Reward Rules</h1>
                <Button>Add Rule</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>PV Threshold</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Free Shipping</TableCell>
                        <TableCell>300</TableCell>
                        <TableCell>SHIPPING</TableCell>
                        <TableCell>
                            <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

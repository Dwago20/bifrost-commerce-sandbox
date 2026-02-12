
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
    const session = await getSession()
    if (!session?.userId) {
        redirect("/login")
    }

    const user = await prisma.user.findUnique({
        where: { id: session.userId },
        include: { memberStats: true }
    })

    const stats = user?.memberStats || { rank: "SILVER", pvMonth: 0, pvLifetime: 0 }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Member Dashboard</h1>
            <p className="mb-6 text-muted-foreground">Welcome back, {user?.name || "Member"}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Rank</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">{stats.rank}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>PV (Month)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pvMonth}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>PV (Lifetime)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pvLifetime}</div>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
            <Card>
                <CardContent className="p-4 text-sm text-gray-500">
                    Order history not yet implemented in UI view.
                </CardContent>
            </Card>
        </div>
    )
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function TeamPage() {
    const session = await getSession()
    if (!session?.userId) {
        redirect("/login")
    }

    const user = await prisma.user.findFirst({
        where: { id: session.userId },
        include: {
            sponsor: true,
            downlines: {
                include: {
                    memberStats: true
                }
            }
        }
    })

    if (!user) return <div>User not found</div>

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">My Team</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                    <CardHeader><CardTitle>My Sponsor</CardTitle></CardHeader>
                    <CardContent>
                        {user.sponsor ? (
                            <div>
                                <p className="font-semibold">{user.sponsor.name}</p>
                                <p className="text-sm text-gray-500">{user.sponsor.email}</p>
                            </div>
                        ) : (
                            <p className="text-gray-500">No Sponsor (Root)</p>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>My Referral Info</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p>Referral Code:</p>
                            <div className="p-2 bg-muted rounded font-mono font-bold text-center border cursor-copy select-all">
                                {user.referralCode}
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">Total Downlines: {user.downlines.length}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-xl font-bold mb-4">Direct Downlines</h2>
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground">
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Joined</th>
                                    <th className="p-4">Rank</th>
                                    <th className="p-4">PV (Lifetime)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.downlines.map(downline => (
                                    <tr key={downline.id} className="border-b last:border-0 hover:bg-muted/10">
                                        <td className="p-4 font-medium">{downline.name}</td>
                                        <td className="p-4 text-muted-foreground">{downline.email}</td>
                                        <td className="p-4">{downline.createdAt.toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${downline.memberStats?.rank === 'PLATINUM' ? 'bg-purple-100 text-purple-800' :
                                                downline.memberStats?.rank === 'GOLD' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                {downline.memberStats?.rank || "SILVER"}
                                            </span>
                                        </td>
                                        <td className="p-4">{downline.memberStats?.pvLifetime || 0}</td>
                                    </tr>
                                ))}
                                {user.downlines.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                            No downlines yet. Share your referral code to grow your team!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

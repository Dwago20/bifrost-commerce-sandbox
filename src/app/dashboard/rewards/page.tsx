
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { prisma } from "@/lib/prisma"

export default async function RewardsPage() {
    const user = await prisma.user.findFirst({
        where: { email: "test@example.com" },
        include: {
            memberStats: true,
            rewards: {
                include: { rule: true }
            }
        }
    })

    const rewards = user?.rewards || []
    const lifetimePV = user?.memberStats?.pvLifetime || 0

    // Possible rewards for display (this logic would normally be dynamic)
    const nextMilestones = [
        { threshold: 300, name: "Free Shipping", type: "SHIPPING" },
        { threshold: 450, name: "RM 20 Voucher", type: "VOUCHER" },
        { threshold: 1000, name: "VIP Status", type: "STATUS" }
    ].filter(m => lifetimePV < m.threshold)

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">My Rewards</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Unlocked / Issued Rewards */}
                {rewards.map(r => (
                    <Card key={r.id} className="border-green-200 bg-green-50">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center text-lg">
                                <span>{r.rule.name}</span>
                                <Badge className="bg-green-600 hover:bg-green-700">{r.status}</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">Unlocked at {r.issuedAt.toLocaleDateString()}</p>
                            <p className="font-semibold mt-2">
                                {r.rule.rewardType === "VOUCHER" && "Code: SAVE20"}
                                {r.rule.rewardType === "SHIPPING" && "Applied automatically at checkout"}
                                {r.rule.rewardType === "STATUS" && "You are now a VIP!"}
                            </p>
                        </CardContent>
                    </Card>
                ))}

                {/* Locked Milestones */}
                {nextMilestones.map(m => (
                    <Card key={m.threshold} className="opacity-60 border-dashed">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center text-lg">
                                <span>{m.name}</span>
                                <Badge variant="outline">Locked</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Reach <strong>{m.threshold} PV</strong> to unlock</p>
                            <p className="text-sm mt-1 text-muted-foreground">{m.threshold - lifetimePV} PV remaining</p>
                        </CardContent>
                    </Card>
                ))}

                {rewards.length === 0 && nextMilestones.length === 0 && (
                    <p>No rewards found.</p>
                )}
            </div>
        </div>
    )
}

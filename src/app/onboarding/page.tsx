
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function OnboardingPage() {
    return (
        <div className="container mx-auto flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Onboarding</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Select Market</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select market" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="my">Malaysia (MY)</SelectItem>
                                <SelectItem value="sg">Singapore (SG)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Preferred Language</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="ms">Bahasa Melayu</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full">Complete Setup</Button>
                </CardContent>
            </Card>
        </div>
    )
}

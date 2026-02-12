"use client"

import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUser } from "@/actions/auth"

const initialState = {
    error: "",
}

export default function SignupPage() {
    const [state, formAction] = useFormState(registerUser, initialState)

    return (
        <div className="container mx-auto flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md space-y-8 p-8 border rounded-lg shadow-sm">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Create Account</h2>
                    <p className="text-gray-500">Join the platform today</p>
                </div>

                <form action={formAction} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" placeholder="John Doe" required />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    <div>
                        <Label htmlFor="market">Market</Label>
                        <select id="market" name="market" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="MY">Malaysia (MY)</option>
                            <option value="SG">Singapore (SG)</option>
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                        <Input id="referralCode" name="referralCode" placeholder="Enter sponsor's code" />
                    </div>

                    {state?.error && (
                        <p className="text-red-500 text-sm text-center">{state.error}</p>
                    )}

                    <Button type="submit" className="w-full">Sign Up</Button>
                </form>
            </div>
        </div>
    )
}

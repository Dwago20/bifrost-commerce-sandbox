
"use client"

import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUser } from "@/actions/auth"

const initialState = {
    error: "",
}

export default function LoginPage() {
    const [state, formAction] = useFormState(loginUser, initialState)

    return (
        <div className="container mx-auto flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md space-y-8 p-8 border rounded-lg shadow-sm">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Welcome Back</h2>
                    <p className="text-gray-500">Sign in to your account</p>
                </div>

                <form action={formAction} className="space-y-6">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>

                    {state?.error && (
                        <p className="text-red-500 text-sm text-center">{state.error}</p>
                    )}

                    <Button type="submit" className="w-full">Sign In</Button>
                </form>
            </div>
        </div>
    )
}

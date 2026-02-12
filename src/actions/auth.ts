
"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function registerUser(prevState: any, formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string // In a real app, hash this!
    const market = formData.get("market") as string
    const referralCode = formData.get("referralCode") as string

    if (!email || !name) {
        return { error: "Missing fields" }
    }

    // 1. Check for existing user
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
        return { error: "User already exists" }
    }

    // 2. Resolve Sponsor
    let sponsorId = null
    if (referralCode) {
        const sponsor = await prisma.user.findUnique({ where: { referralCode } })
        if (sponsor) {
            sponsorId = sponsor.id
        } else {
            return { error: "Invalid Referral Code" }
        }
    }

    // 3. Generate Referral Code for new user (e.g. first part of email + random 4 chars)
    const newReferralCode = email.split("@")[0].substring(0, 8) + Math.random().toString(36).substring(2, 6).toUpperCase()

    await prisma.user.create({
        data: {
            name,
            email,
            market: market === "SG" ? "SG" : "MY",
            referralCode: newReferralCode,
            sponsorId,
            memberStats: {
                create: {
                    rank: "SILVER",
                    pvMonth: 0,
                    pvLifetime: 0
                }
            }
        }
    })

    redirect("/login")
}

import { createSession } from "@/lib/session"

export async function loginUser(prevState: any, formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
        return { error: "Missing fields" }
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
        return { error: "Invalid credentials" }
    }

    await createSession(user.id)
    redirect("/dashboard")
}

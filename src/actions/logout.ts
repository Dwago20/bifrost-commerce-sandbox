
"use server"
import { logout } from "@/lib/session"

export async function logoutAction() {
    await logout()
}

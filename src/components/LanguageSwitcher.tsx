
"use client"

import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LanguageSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const onSelectChange = (val: string) => {
        const nextLocale = val
        startTransition(() => {
            // Simple reload to switch language for now, usually needs path rewriting
            // For this phase, we'll assume middleware handles /en /ms prefix
            // But client-side navigation needs to know the path.
            // A more robust solution uses next-intl's navigation wrappers.
            // For simplicity in this step, we will use window.location
            const currentPath = window.location.pathname
            const segments = currentPath.split('/')
            // segments[0] is empty, segments[1] is locale
            segments[1] = nextLocale
            const newPath = segments.join('/')
            window.location.href = newPath
        })
    }

    return (
        <Select value={locale} onValueChange={onSelectChange} disabled={isPending}>
            <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ms">Bahasa</SelectItem>
            </SelectContent>
        </Select>
    )
}

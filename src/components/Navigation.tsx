
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, Menu, Package, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logoutAction } from "@/actions/logout"
import { useTranslations } from "next-intl"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { MarketSwitcher } from "@/components/MarketSwitcher"

export function Navigation() {
    const pathname = usePathname()
    const t = useTranslations('Navigation')

    // Hide navigation on auth pages and onboarding
    if (["/login", "/signup", "/onboarding"].includes(pathname)) {
        return null
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            Bifrost Commerce
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/shop"
                            className={pathname === "/shop" ? "text-foreground" : "text-foreground/60 transition-colors hover:text-foreground"}
                        >
                            {t('shop')}
                        </Link>
                        <Link
                            href="/dashboard"
                            className={pathname?.startsWith("/dashboard") ? "text-foreground" : "text-foreground/60 transition-colors hover:text-foreground"}
                        >
                            {t('dashboard')}
                        </Link>
                        <Link
                            href="/admin"
                            className={pathname?.startsWith("/admin") ? "text-foreground" : "text-foreground/60 transition-colors hover:text-foreground"}
                        >
                            {t('admin')}
                        </Link>
                    </nav>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                                Bifrost
                            </Link>
                            <Link href="/shop" className="hover:text-foreground">
                                Shop
                            </Link>
                            <Link href="/dashboard" className="hover:text-foreground">
                                Dashboard
                            </Link>
                            <Link href="/admin" className="hover:text-foreground">
                                Admin
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search could go here */}
                    </div>
                    <nav className="flex items-center gap-2">
                        <div className="hidden md:flex gap-2 mr-2">
                            <MarketSwitcher />
                            <LanguageSwitcher />
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/cart">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="sr-only">Cart</span>
                            </Link>
                        </Button>



                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <User className="h-5 w-5" />
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard">Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/rewards">Rewards</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <form action={logoutAction}>
                                    <DropdownMenuItem asChild>
                                        <button type="submit" className="w-full text-left cursor-pointer">Logout</button>
                                    </DropdownMenuItem>
                                </form>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>
                </div>
            </div>
        </header>
    )
}

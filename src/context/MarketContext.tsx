
"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Market = "MY" | "SG"
type Currency = "MYR" | "SGD"

interface MarketContextType {
    market: Market
    currency: Currency
    setMarket: (market: Market) => void
}

const MarketContext = createContext<MarketContextType | undefined>(undefined)

export function MarketProvider({ children }: { children: React.ReactNode }) {
    const [market, setMarketState] = useState<Market>("MY")
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        const storedMarket = localStorage.getItem("market") as Market
        if (storedMarket && (storedMarket === "MY" || storedMarket === "SG")) {
            setMarketState(storedMarket)
        }
        setIsInitialized(true)
    }, [])

    const setMarket = (newMarket: Market) => {
        setMarketState(newMarket)
        localStorage.setItem("market", newMarket)
    }

    const currency: Currency = market === "MY" ? "MYR" : "SGD"

    if (!isInitialized) {
        return null // Or a loading spinner
    }

    return (
        <MarketContext.Provider value={{ market, currency, setMarket }}>
            {children}
        </MarketContext.Provider>
    )
}

export function useMarket() {
    const context = useContext(MarketContext)
    if (context === undefined) {
        throw new Error("useMarket must be used within a MarketProvider")
    }
    return context
}

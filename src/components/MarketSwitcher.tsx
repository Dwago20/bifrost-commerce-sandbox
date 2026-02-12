
"use client"

import { useMarket } from "@/context/MarketContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function MarketSwitcher() {
    const { market, setMarket } = useMarket()

    return (
        <Select value={market} onValueChange={(val) => setMarket(val as "MY" | "SG")}>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Market" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="MY">Malaysia (MYR)</SelectItem>
                <SelectItem value="SG">Singapore (SGD)</SelectItem>
            </SelectContent>
        </Select>
    )
}

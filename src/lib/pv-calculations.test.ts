
import { describe, it, expect } from 'vitest'
import { calculateRank, calculateTotalPV } from './pv-calculations'

describe('PV Calculations', () => {
    describe('calculateTotalPV', () => {
        it('should return 0 for empty items', () => {
            const result = calculateTotalPV([])
            expect(result).toBe(0)
        })

        it('should calculate total PV correctly', () => {
            const items = [
                { product: { pvValue: 10 } as any, quantity: 2 },
                { product: { pvValue: 50 } as any, quantity: 1 }
            ]
            const result = calculateTotalPV(items)
            expect(result).toBe(70) // (10 * 2) + (50 * 1) = 70
        })

        it('should handle zero quantity', () => {
            const items = [
                { product: { pvValue: 100 } as any, quantity: 0 }
            ]
            const result = calculateTotalPV(items)
            expect(result).toBe(0)
        })
    })

    describe('calculateRank', () => {
        it('should return Silver for 0 PV', () => {
            expect(calculateRank(0)).toBe('Silver')
        })

        it('should return Silver for 299 PV', () => {
            expect(calculateRank(299)).toBe('Silver')
        })

        it('should return Gold for 300 PV', () => {
            expect(calculateRank(300)).toBe('Gold')
        })

        it('should return Gold for 999 PV', () => {
            expect(calculateRank(999)).toBe('Gold')
        })

        it('should return Platinum for 1000 PV', () => {
            expect(calculateRank(1000)).toBe('Platinum')
        })

        it('should return Platinum for > 1000 PV', () => {
            expect(calculateRank(5000)).toBe('Platinum')
        })
    })
})

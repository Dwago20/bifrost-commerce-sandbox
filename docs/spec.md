# Bifrost Commerce Sandbox Spec

## Core User Stories
- **Guest**: Browses products, filters by price/category, views PDP.
- **User**: Signs up, completes onboarding (market/locale/shipping).
- **Member**: Views dashboard with rank (Silver/Gold/Platinum), PV this month/lifetime, and rewards.
- **Checkout**: Creates an order, computes PV, and triggers rewards automatically (e.g., PV ≥ 500 unlock voucher).
- **Admin**: Manages products, PV values, and reward rules.

## Markets
- **Definition**: MY / SG
- **Currency**: MYR / SGD
- **Locale**: EN / MS

## Ranks
- **Silver**: PV < 300
- **Gold**: 300–999
- **Platinum**: ≥ 1000

## Rewards
- **PV ≥ 300**: "Free Shipping"
- **PV ≥ 500**: "RM20 voucher"
- **PV ≥ 1000**: "VIP status + voucher"

All logic must be deterministic and testable.

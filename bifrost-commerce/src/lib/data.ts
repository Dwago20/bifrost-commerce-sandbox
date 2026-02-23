import type { Product, TierThreshold, Member, Order, PVTransaction, Reward, Notification, LocaleConfig } from '@/types';

// ============================================================
// Locale Configuration
// ============================================================
export const LOCALES: LocaleConfig[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
];

// ============================================================
// Tier Configuration
// ============================================================
export const TIER_THRESHOLDS: TierThreshold[] = [
    {
        tier: 'bronze',
        minPV: 0,
        maxPV: 499,
        benefits: ['5% member discount', 'Birthday bonus PV', 'Member-only promotions'],
        color: '#CD7F32',
        icon: '🥉',
    },
    {
        tier: 'silver',
        minPV: 500,
        maxPV: 1999,
        benefits: ['10% member discount', 'Free shipping on RM150+', 'Early access to new products', 'Double PV events'],
        color: '#C0C0C0',
        icon: '🥈',
    },
    {
        tier: 'gold',
        minPV: 2000,
        maxPV: 4999,
        benefits: ['15% member discount', 'Free shipping always', 'Exclusive products', 'Personal shopper', 'VIP events'],
        color: '#FFD700',
        icon: '🥇',
    },
    {
        tier: 'platinum',
        minPV: 5000,
        maxPV: Infinity,
        benefits: ['20% member discount', 'Free shipping + priority', 'All Gold benefits', 'Annual retreat invite', 'Profit sharing'],
        color: '#E5E4E2',
        icon: '💎',
    },
];

// ============================================================
// Sample Products
// ============================================================
export const PRODUCTS: Product[] = [
    {
        id: 'prod-001',
        name: 'Vitamin C Brightening Serum',
        slug: 'vitamin-c-brightening-serum',
        description: 'A lightweight, fast-absorbing serum with 15% Vitamin C, Niacinamide, and Hyaluronic Acid. Visibly reduces dark spots in 4 weeks and evens out skin tone for a radiant, dewy complexion.',
        price: 89.90,
        compareAtPrice: 119.90,
        currency: 'MYR',
        images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop'],
        category: 'skincare',
        tags: ['bestseller', 'vitamin-c', 'brightening'],
        inStock: true,
        pvValue: 32,
        rating: 4.8,
        reviewCount: 1243,
        createdAt: '2025-01-15',
        variants: [
            { id: 'v-001a', name: 'Size', value: '30ml', priceModifier: 0, inStock: true },
            { id: 'v-001b', name: 'Size', value: '50ml', priceModifier: 30, inStock: true },
        ],
    },
    {
        id: 'prod-002',
        name: 'Bird\'s Nest Collagen Drink',
        slug: 'birds-nest-collagen-drink',
        description: 'Premium bird\'s nest extract blended with marine collagen peptides and red dates. Supports youthful skin, stronger nails, and healthier joints. 6 bottles × 75ml per box.',
        price: 158.00,
        compareAtPrice: 198.00,
        currency: 'MYR',
        images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop'],
        category: 'supplements',
        tags: ['collagen', 'anti-aging', 'bestseller'],
        inStock: true,
        pvValue: 55,
        rating: 4.9,
        reviewCount: 2087,
        createdAt: '2025-02-01',
    },
    {
        id: 'prod-003',
        name: 'Hyaluronic Acid Hydrating Gel',
        slug: 'hyaluronic-acid-hydrating-gel',
        description: 'Oil-free gel moisturizer with triple-weight Hyaluronic Acid, Ceramides, and Centella Asiatica. Provides 72-hour hydration and strengthens the skin barrier. Perfect for Malaysia\'s humid climate.',
        price: 69.90,
        currency: 'MYR',
        images: ['https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=600&h=600&fit=crop'],
        category: 'skincare',
        tags: ['hydrating', 'sensitive-skin'],
        inStock: true,
        pvValue: 25,
        rating: 4.7,
        reviewCount: 876,
        createdAt: '2025-02-10',
    },
    {
        id: 'prod-004',
        name: 'Argan Oil Repair Shampoo',
        slug: 'argan-oil-repair-shampoo',
        description: 'Sulfate-free shampoo enriched with Moroccan Argan Oil, Keratin, and Biotin. Repairs heat-damaged hair, tames frizz, and restores shine. 300ml bottle with pump.',
        price: 45.90,
        compareAtPrice: 59.90,
        currency: 'MYR',
        images: ['https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&h=600&fit=crop'],
        category: 'haircare',
        tags: ['sulfate-free', 'repair'],
        inStock: true,
        pvValue: 16,
        rating: 4.6,
        reviewCount: 534,
        createdAt: '2025-03-05',
    },
    {
        id: 'prod-005',
        name: 'Probiotics + Enzyme Complex',
        slug: 'probiotics-enzyme-complex',
        description: '20 billion CFU multi-strain probiotics with digestive enzymes and prebiotic fiber. Supports gut health, bloating relief, and immune function. 60 vegetarian capsules.',
        price: 129.00,
        currency: 'MYR',
        images: ['https://images.unsplash.com/photo-1550572017-edd951b55104?w=600&h=600&fit=crop'],
        category: 'supplements',
        tags: ['probiotics', 'gut-health', 'daily-essential'],
        inStock: true,
        pvValue: 45,
        rating: 4.5,
        reviewCount: 412,
        createdAt: '2025-03-15',
    },
    {
        id: 'prod-006',
        name: 'K-Beauty Essentials Set',
        slug: 'k-beauty-essentials-set',
        description: 'Complete 4-step Korean skincare routine: Foam Cleanser + Toner + Vitamin C Serum + Hydrating Gel. Curated for Southeast Asian skin. Save 30% vs buying individually.',
        price: 199.00,
        compareAtPrice: 285.00,
        currency: 'MYR',
        images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop'],
        category: 'bundles',
        tags: ['bundle', 'value-pack', 'gift-idea', 'bestseller'],
        inStock: true,
        pvValue: 70,
        rating: 4.9,
        reviewCount: 328,
        createdAt: '2025-04-01',
    },
    {
        id: 'prod-007',
        name: 'Tea Tree Clarifying Cleanser',
        slug: 'tea-tree-clarifying-cleanser',
        description: 'Gentle daily cleanser with Tea Tree Oil, 2% Salicylic Acid, and Green Tea Extract. Unclogs pores, controls excess oil, and prevents breakouts without over-drying. 150ml.',
        price: 39.90,
        currency: 'MYR',
        images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop'],
        category: 'skincare',
        tags: ['cleanser', 'acne-care'],
        inStock: true,
        pvValue: 14,
        rating: 4.4,
        reviewCount: 651,
        createdAt: '2025-04-10',
    },
    {
        id: 'prod-008',
        name: 'Rosemary Scalp Treatment Oil',
        slug: 'rosemary-scalp-treatment-oil',
        description: 'Concentrated hair serum with Rosemary Oil, Caffeine, Biotin, and Pea Peptides. Stimulates hair follicles, strengthens roots, and reduces hair fall in 8 weeks. 60ml dropper bottle.',
        price: 79.90,
        compareAtPrice: 99.90,
        currency: 'MYR',
        images: ['https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=600&h=600&fit=crop'],
        category: 'haircare',
        tags: ['hair-growth', 'scalp-care'],
        inStock: true,
        pvValue: 28,
        rating: 4.7,
        reviewCount: 789,
        createdAt: '2025-05-01',
    },
    {
        id: 'prod-009',
        name: 'Evening Primrose & Vitamin E',
        slug: 'evening-primrose-vitamin-e',
        description: 'Cold-pressed Evening Primrose Oil 1000mg with natural Vitamin E. Supports hormonal balance, healthier skin, and reduces PMS discomfort. 90 softgels per bottle.',
        price: 65.00,
        currency: 'MYR',
        images: ['https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=600&fit=crop'],
        category: 'wellness',
        tags: ['women-health', 'skin-support'],
        inStock: true,
        pvValue: 23,
        rating: 4.6,
        reviewCount: 445,
        createdAt: '2025-05-15',
    },
    {
        id: 'prod-010',
        name: 'Total Wellness Bundle',
        slug: 'total-wellness-bundle',
        description: 'Best-value health pack: Bird\'s Nest Collagen Drink + Probiotics Complex + Evening Primrose Oil. Everything for daily wellness. Save 25% — our top-selling gift set.',
        price: 289.00,
        compareAtPrice: 352.00,
        currency: 'MYR',
        images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=600&fit=crop'],
        category: 'bundles',
        tags: ['bundle', 'bestseller', 'gift-idea'],
        inStock: true,
        pvValue: 100,
        rating: 4.9,
        reviewCount: 567,
        createdAt: '2025-06-01',
    },
];

// ============================================================
// Sample Member
// ============================================================
export const MOCK_MEMBER: Member = {
    id: 'mem-001',
    name: 'Aishah Rahman',
    email: 'aishah@example.com',
    avatar: '/avatars/member-1.jpg',
    tier: 'silver',
    currentPV: 845,
    lifetimePV: 2340,
    joinDate: '2024-08-15',
    referralCode: 'AISHAH2024',
    teamSize: 12,
};

// ============================================================
// Sample Orders
// ============================================================
export const MOCK_ORDERS: Order[] = [
    {
        id: 'ORD-2025-001',
        memberId: 'mem-001',
        items: [
            { product: PRODUCTS[0], quantity: 2 },
            { product: PRODUCTS[1], quantity: 1 },
        ],
        totalPrice: 337.80,
        totalPV: 119,
        status: 'delivered',
        shippingAddress: {
            fullName: 'Aishah Rahman',
            phone: '+60123456789',
            line1: '123 Jalan Bangsar',
            city: 'Kuala Lumpur',
            state: 'WP Kuala Lumpur',
            postalCode: '59100',
            country: 'MY',
        },
        paymentMethod: 'card',
        createdAt: '2025-09-15T10:30:00Z',
        updatedAt: '2025-09-18T14:00:00Z',
        trackingNumber: 'MY123456789',
    },
    {
        id: 'ORD-2025-002',
        memberId: 'mem-001',
        items: [
            { product: PRODUCTS[5], quantity: 1 },
        ],
        totalPrice: 199.00,
        totalPV: 70,
        status: 'shipped',
        shippingAddress: {
            fullName: 'Aishah Rahman',
            phone: '+60123456789',
            line1: '123 Jalan Bangsar',
            city: 'Kuala Lumpur',
            state: 'WP Kuala Lumpur',
            postalCode: '59100',
            country: 'MY',
        },
        paymentMethod: 'fpx',
        createdAt: '2025-10-02T08:15:00Z',
        updatedAt: '2025-10-03T11:30:00Z',
        trackingNumber: 'MY987654321',
    },
    {
        id: 'ORD-2025-003',
        memberId: 'mem-001',
        items: [
            { product: PRODUCTS[3], quantity: 1 },
            { product: PRODUCTS[7], quantity: 1 },
        ],
        totalPrice: 125.80,
        totalPV: 44,
        status: 'processing',
        shippingAddress: {
            fullName: 'Aishah Rahman',
            phone: '+60123456789',
            line1: '123 Jalan Bangsar',
            city: 'Kuala Lumpur',
            state: 'WP Kuala Lumpur',
            postalCode: '59100',
            country: 'MY',
        },
        paymentMethod: 'card',
        createdAt: '2025-10-10T16:45:00Z',
        updatedAt: '2025-10-10T16:45:00Z',
    },
];

// ============================================================
// Sample PV Transactions
// ============================================================
export const MOCK_PV_TRANSACTIONS: PVTransaction[] = [
    { id: 'pv-001', memberId: 'mem-001', amount: 155, type: 'purchase', description: 'Order ORD-2025-001', orderId: 'ORD-2025-001', createdAt: '2025-09-15T10:30:00Z' },
    { id: 'pv-002', memberId: 'mem-001', amount: 50, type: 'bonus', description: 'Welcome Bonus PV', createdAt: '2024-08-15T00:00:00Z' },
    { id: 'pv-003', memberId: 'mem-001', amount: 120, type: 'purchase', description: 'Order ORD-2025-002', orderId: 'ORD-2025-002', createdAt: '2025-10-02T08:15:00Z' },
    { id: 'pv-004', memberId: 'mem-001', amount: 30, type: 'team', description: 'Team member signup bonus', createdAt: '2025-10-05T12:00:00Z' },
    { id: 'pv-005', memberId: 'mem-001', amount: 75, type: 'purchase', description: 'Order ORD-2025-003', orderId: 'ORD-2025-003', createdAt: '2025-10-10T16:45:00Z' },
    { id: 'pv-006', memberId: 'mem-001', amount: 100, type: 'bonus', description: 'Monthly target bonus', createdAt: '2025-10-01T00:00:00Z' },
    { id: 'pv-007', memberId: 'mem-001', amount: 45, type: 'team', description: 'Team volume bonus', createdAt: '2025-09-30T00:00:00Z' },
    { id: 'pv-008', memberId: 'mem-001', amount: 200, type: 'purchase', description: 'Previous month purchases', createdAt: '2025-08-20T00:00:00Z' },
    { id: 'pv-009', memberId: 'mem-001', amount: 70, type: 'team', description: 'Team member purchases', createdAt: '2025-08-15T00:00:00Z' },
];

// ============================================================
// Sample Rewards
// ============================================================
export const MOCK_REWARDS: Reward[] = [
    { id: 'rw-001', name: 'RM20 Voucher', description: 'Redeemable on any purchase above RM100', pvRequired: 200, type: 'voucher', value: 20, isActive: true },
    { id: 'rw-002', name: 'Free Mini Serum', description: 'Complimentary Radiance Boost Serum 10ml', pvRequired: 350, type: 'product', value: 0, isActive: true },
    { id: 'rw-003', name: '15% Off Next Order', description: 'One-time 15% discount on your next order', pvRequired: 500, type: 'discount', value: 15, isActive: true },
    { id: 'rw-004', name: 'RM50 Cashback', description: 'Cashback credited to your member wallet', pvRequired: 800, type: 'cashback', value: 50, isActive: true },
];

// ============================================================
// Sample Notifications
// ============================================================
export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 'notif-001', title: '🎉 Tier Upgrade!', message: 'Congratulations! You\'ve been upgraded to Silver tier.', type: 'tier_upgrade', isRead: false, createdAt: '2025-10-08T09:00:00Z' },
    { id: 'notif-002', title: '📦 Order Shipped', message: 'Your order ORD-2025-002 has been shipped. Track it now!', type: 'order_update', isRead: false, createdAt: '2025-10-03T11:30:00Z' },
    { id: 'notif-003', title: '💎 Bonus PV Earned', message: 'You earned 30 bonus PV from a new team member signup.', type: 'pv_bonus', isRead: true, createdAt: '2025-10-05T12:00:00Z' },
    { id: 'notif-004', title: '🎁 Reward Unlocked', message: 'You can now redeem the RM20 Voucher reward!', type: 'reward_earned', isRead: true, createdAt: '2025-09-20T08:00:00Z' },
];

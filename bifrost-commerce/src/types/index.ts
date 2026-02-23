// ============================================================
// CommerceFlow — Core Types
// ============================================================

// --- Product Types ---
export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    currency: string;
    images: string[];
    category: ProductCategory;
    variants?: ProductVariant[];
    tags: string[];
    inStock: boolean;
    pvValue: number; // Point Value for this product
    rating: number;
    reviewCount: number;
    createdAt: string;
}

export interface ProductVariant {
    id: string;
    name: string;
    value: string;
    priceModifier: number;
    inStock: boolean;
}

export type ProductCategory =
    | 'skincare'
    | 'supplements'
    | 'haircare'
    | 'wellness'
    | 'bundles';

// --- Cart Types ---
export interface CartItem {
    product: Product;
    quantity: number;
    selectedVariant?: ProductVariant;
}

export interface Cart {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    totalPV: number;
}

// --- Member Types ---
export type MemberTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface Member {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    tier: MemberTier;
    currentPV: number;
    lifetimePV: number;
    joinDate: string;
    referralCode: string;
    referredBy?: string;
    teamSize: number;
}

export interface PVTransaction {
    id: string;
    memberId: string;
    amount: number;
    type: 'purchase' | 'bonus' | 'team' | 'adjustment';
    description: string;
    orderId?: string;
    createdAt: string;
}

export interface TierThreshold {
    tier: MemberTier;
    minPV: number;
    maxPV: number;
    benefits: string[];
    color: string;
    icon: string;
}

// --- Order Types ---
export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';

export interface Order {
    id: string;
    memberId: string;
    items: CartItem[];
    totalPrice: number;
    totalPV: number;
    status: OrderStatus;
    shippingAddress: Address;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
    trackingNumber?: string;
}

export interface Address {
    fullName: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

// --- Reward Types ---
export interface Reward {
    id: string;
    name: string;
    description: string;
    pvRequired: number;
    type: 'product' | 'discount' | 'voucher' | 'cashback';
    value: number;
    isActive: boolean;
    expiresAt?: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'tier_upgrade' | 'reward_earned' | 'order_update' | 'pv_bonus' | 'system';
    isRead: boolean;
    createdAt: string;
}

// --- i18n Types ---
export type Locale = 'en' | 'ms' | 'zh';

export interface LocaleConfig {
    code: Locale;
    name: string;
    nativeName: string;
    flag: string;
}

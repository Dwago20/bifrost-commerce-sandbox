'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, ProductVariant, Locale } from '@/types';

// ============================================================
// Cart Store
// ============================================================
interface CartStore {
    items: CartItem[];
    isCartOpen: boolean;
    addItem: (product: Product, variant?: ProductVariant) => void;
    removeItem: (productId: string, variantId?: string) => void;
    updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
    clearCart: () => void;
    toggleCart: () => void;
    setCartOpen: (open: boolean) => void;
    totalItems: () => number;
    totalPrice: () => number;
    totalPV: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isCartOpen: false,

            addItem: (product, variant) => {
                set((state) => {
                    const existingIndex = state.items.findIndex(
                        (item) =>
                            item.product.id === product.id &&
                            item.selectedVariant?.id === variant?.id
                    );

                    if (existingIndex >= 0) {
                        const newItems = [...state.items];
                        newItems[existingIndex].quantity += 1;
                        return { items: newItems };
                    }

                    return {
                        items: [...state.items, { product, quantity: 1, selectedVariant: variant }],
                    };
                });
            },

            removeItem: (productId, variantId) => {
                set((state) => ({
                    items: state.items.filter(
                        (item) =>
                            !(item.product.id === productId && item.selectedVariant?.id === variantId)
                    ),
                }));
            },

            updateQuantity: (productId, quantity, variantId) => {
                if (quantity <= 0) {
                    get().removeItem(productId, variantId);
                    return;
                }
                set((state) => ({
                    items: state.items.map((item) =>
                        item.product.id === productId && item.selectedVariant?.id === variantId
                            ? { ...item, quantity }
                            : item
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),
            toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
            setCartOpen: (open) => set({ isCartOpen: open }),

            totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: () =>
                get().items.reduce(
                    (sum, item) =>
                        sum +
                        (item.product.price + (item.selectedVariant?.priceModifier || 0)) *
                        item.quantity,
                    0
                ),
            totalPV: () =>
                get().items.reduce(
                    (sum, item) => sum + item.product.pvValue * item.quantity,
                    0
                ),
        }),
        {
            name: 'commerceflow-cart',
        }
    )
);

// ============================================================
// Locale Store
// ============================================================
interface LocaleStore {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleStore>()(
    persist(
        (set) => ({
            locale: 'en',
            setLocale: (locale) => set({ locale }),
        }),
        {
            name: 'commerceflow-locale',
        }
    )
);

// ============================================================
// UI Store
// ============================================================
interface UIStore {
    isMobileMenuOpen: boolean;
    isSearchOpen: boolean;
    activeCategory: string;
    toggleMobileMenu: () => void;
    setMobileMenuOpen: (open: boolean) => void;
    toggleSearch: () => void;
    setActiveCategory: (category: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
    isMobileMenuOpen: false,
    isSearchOpen: false,
    activeCategory: 'all',
    toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
    toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
    setActiveCategory: (category) => set({ activeCategory: category }),
}));

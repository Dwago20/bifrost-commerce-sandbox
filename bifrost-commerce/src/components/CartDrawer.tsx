'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore, useLocaleStore } from '@/lib/store';
import { t, formatPrice } from '@/lib/i18n';

export default function CartDrawer() {
    const { items, isCartOpen, setCartOpen, removeItem, updateQuantity, totalPrice, totalPV } = useCartStore();
    const { locale } = useLocaleStore();

    // Lock body scroll when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div className="overlay" onClick={() => setCartOpen(false)} style={{ zIndex: 50 }} />

            {/* Drawer */}
            <div
                className="animate-slide-in-right"
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    maxWidth: 420,
                    background: 'var(--color-surface)',
                    zIndex: 51,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '-8px 0 30px rgba(0,0,0,0.1)',
                }}
            >
                {/* Header */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '20px 24px',
                    borderBottom: '1px solid var(--color-border-light)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <ShoppingBag size={20} style={{ color: 'var(--color-primary)' }} />
                        <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
                            {t('cart.title', locale)}
                        </h2>
                        <span className="badge badge-primary" style={{ fontSize: 11 }}>
                            {items.length}
                        </span>
                    </div>
                    <button className="btn btn-ghost btn-icon" onClick={() => setCartOpen(false)} aria-label="Close cart">
                        <X size={20} />
                    </button>
                </div>

                {/* Items */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
                    {items.length === 0 ? (
                        <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            height: '100%', gap: 16, textAlign: 'center', padding: '40px 0',
                        }}>
                            <div style={{
                                width: 80, height: 80, borderRadius: '50%',
                                background: 'var(--color-primary-50)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <ShoppingBag size={32} style={{ color: 'var(--color-primary)' }} />
                            </div>
                            <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                                {t('cart.empty', locale)}
                            </p>
                            <p style={{ fontSize: 14, color: 'var(--color-text-tertiary)', maxWidth: 250 }}>
                                {t('cart.empty_subtitle', locale)}
                            </p>
                            <Link
                                href="/shop"
                                className="btn btn-primary"
                                onClick={() => setCartOpen(false)}
                                style={{ textDecoration: 'none', marginTop: 8 }}
                            >
                                {t('cart.browse', locale)}
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {items.map((item, index) => (
                                <div
                                    key={`${item.product.id}-${item.selectedVariant?.id || 'default'}`}
                                    className="animate-fade-in"
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        display: 'flex', gap: 14,
                                        padding: 14,
                                        background: '#FAFAFA',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border-light)',
                                    }}
                                >
                                    {/* Product Image Placeholder */}
                                    <div style={{
                                        width: 72, height: 72, borderRadius: 'var(--radius-sm)',
                                        background: 'linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100))',
                                        flexShrink: 0,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 24,
                                    }}>
                                        🧴
                                    </div>

                                    {/* Details */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 2, lineHeight: 1.3 }}>
                                            {item.product.name}
                                        </h4>
                                        {item.selectedVariant && (
                                            <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                                                {item.selectedVariant.value}
                                            </span>
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                                            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-primary)' }}>
                                                {formatPrice(
                                                    (item.product.price + (item.selectedVariant?.priceModifier || 0)) * item.quantity
                                                )}
                                            </span>
                                            <span className="pv-badge">+{item.product.pvValue * item.quantity} PV</span>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                                                style={{
                                                    width: 28, height: 28, borderRadius: 'var(--radius-sm)',
                                                    border: '1px solid var(--color-border)', background: 'white',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    cursor: 'pointer', transition: 'all var(--transition-fast)',
                                                }}
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span style={{ fontSize: 14, fontWeight: 600, minWidth: 20, textAlign: 'center' }}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                                                style={{
                                                    width: 28, height: 28, borderRadius: 'var(--radius-sm)',
                                                    border: '1px solid var(--color-border)', background: 'white',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    cursor: 'pointer', transition: 'all var(--transition-fast)',
                                                }}
                                            >
                                                <Plus size={12} />
                                            </button>
                                            <button
                                                onClick={() => removeItem(item.product.id, item.selectedVariant?.id)}
                                                style={{
                                                    marginLeft: 'auto',
                                                    width: 28, height: 28, borderRadius: 'var(--radius-sm)',
                                                    border: 'none', background: 'var(--color-error-bg)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    cursor: 'pointer', color: 'var(--color-error)',
                                                    transition: 'all var(--transition-fast)',
                                                }}
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div style={{
                        padding: '20px 24px',
                        borderTop: '1px solid var(--color-border-light)',
                        background: 'white',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
                                {t('cart.subtotal', locale)}
                            </span>
                            <span style={{ fontSize: 18, fontWeight: 700 }}>
                                {formatPrice(totalPrice())}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                            <span style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>
                                {t('cart.pv_earned', locale)}
                            </span>
                            <span className="pv-badge">
                                +{totalPV()} PV
                            </span>
                        </div>
                        <Link
                            href="/checkout"
                            className="btn btn-primary btn-lg"
                            onClick={() => setCartOpen(false)}
                            style={{ width: '100%', textDecoration: 'none' }}
                        >
                            {t('cart.checkout', locale)}
                            <ArrowRight size={16} />
                        </Link>
                        <button
                            className="btn btn-ghost"
                            onClick={() => setCartOpen(false)}
                            style={{ width: '100%', marginTop: 8, fontSize: 13 }}
                        >
                            {t('cart.continue', locale)}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

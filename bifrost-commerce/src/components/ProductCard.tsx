'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Star, Check } from 'lucide-react';
import { useCartStore, useLocaleStore } from '@/lib/store';
import { t, formatPrice, getDiscountPercent } from '@/lib/i18n';
import type { Product } from '@/types';

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const { addItem } = useCartStore();
    const { locale } = useLocaleStore();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product, product.variants?.[0]);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
    };

    const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
    const discountPercent = hasDiscount ? getDiscountPercent(product.price, product.compareAtPrice!) : 0;

    return (
        <Link
            href={`/shop/${product.slug}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            <div
                className="card card-elevated animate-fade-in-up"
                style={{
                    animationDelay: `${index * 80}ms`,
                    animationFillMode: 'backwards',
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Image Area */}
                <div style={{
                    position: 'relative',
                    paddingTop: '100%',
                    background: '#F8F7F4',
                    overflow: 'hidden',
                }}>
                    {/* Product Image */}
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        loading="lazy"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.4s ease',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />

                    {/* Badges */}
                    <div style={{
                        position: 'absolute', top: 12, left: 12,
                        display: 'flex', flexDirection: 'column', gap: 6,
                    }}>
                        {hasDiscount && (
                            <span style={{
                                padding: '4px 10px', borderRadius: 'var(--radius-full)',
                                background: '#EF4444', color: 'white',
                                fontSize: 11, fontWeight: 700,
                            }}>
                                -{discountPercent}%
                            </span>
                        )}
                        {product.tags.includes('bestseller') && (
                            <span style={{
                                padding: '4px 10px', borderRadius: 'var(--radius-full)',
                                background: 'var(--color-accent)', color: 'white',
                                fontSize: 11, fontWeight: 700,
                            }}>
                                ⭐ Bestseller
                            </span>
                        )}
                    </div>

                    {/* PV Badge */}
                    <div style={{
                        position: 'absolute', top: 12, right: 12,
                    }}>
                        <span className="pv-badge" style={{ fontSize: 11 }}>
                            +{product.pvValue} PV
                        </span>
                    </div>

                    {/* Quick Add Button */}
                    <button
                        onClick={handleAddToCart}
                        style={{
                            position: 'absolute', bottom: 12, right: 12,
                            width: 42, height: 42, borderRadius: 'var(--radius-md)',
                            background: isAdded ? 'var(--color-success)' : 'var(--color-primary)',
                            color: 'white', border: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            transition: 'all var(--transition-base)',
                            transform: isAdded ? 'scale(1.1)' : 'scale(1)',
                        }}
                    >
                        {isAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '16px 16px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Category */}
                    <span style={{
                        fontSize: 11, fontWeight: 600, color: 'var(--color-primary)',
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                        marginBottom: 6,
                    }}>
                        {t(`nav.${product.category}`, locale)}
                    </span>

                    {/* Name */}
                    <h3 style={{
                        fontSize: 15, fontWeight: 600, lineHeight: 1.3,
                        marginBottom: 8, fontFamily: 'var(--font-sans)',
                        color: 'var(--color-text-primary)',
                    }}>
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                        <div style={{ display: 'flex', gap: 1 }}>
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={12}
                                    fill={i < Math.floor(product.rating) ? '#F59E0B' : 'none'}
                                    stroke={i < Math.floor(product.rating) ? '#F59E0B' : '#D1D5DB'}
                                />
                            ))}
                        </div>
                        <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                            ({product.reviewCount})
                        </span>
                    </div>

                    {/* Price */}
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                            {formatPrice(product.price)}
                        </span>
                        {hasDiscount && (
                            <span style={{
                                fontSize: 13, color: 'var(--color-text-tertiary)',
                                textDecoration: 'line-through',
                            }}>
                                {formatPrice(product.compareAtPrice!)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

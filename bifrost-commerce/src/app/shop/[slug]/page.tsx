'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Star, Check, Minus, Plus, Share2, Heart, Package, Shield, RotateCcw } from 'lucide-react';
import { useCartStore, useLocaleStore } from '@/lib/store';
import { t, formatPrice, getDiscountPercent } from '@/lib/i18n';
import { PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { locale } = useLocaleStore();
    const { addItem } = useCartStore();

    const product = PRODUCTS.find((p) => p.slug === params.slug);
    const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [activeTab, setActiveTab] = useState<'desc' | 'details' | 'reviews'>('desc');

    if (!product) {
        return (
            <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 64, marginBottom: 24 }}>😅</div>
                <h1 style={{ fontSize: 28, marginBottom: 12 }}>Product Not Found</h1>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 32 }}>
                    The product you&apos;re looking for doesn&apos;t exist.
                </p>
                <Link href="/shop" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                    <ArrowLeft size={16} /> Back to Shop
                </Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem(product, selectedVariant || undefined);
        }
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
    const discountPercent = hasDiscount ? getDiscountPercent(product.price, product.compareAtPrice!) : 0;
    const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div style={{ background: 'var(--color-bg)' }}>
            {/* Breadcrumb */}
            <div className="container" style={{ padding: '16px 24px' }}>
                <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--color-text-tertiary)' }}>
                    <Link href="/" style={{ color: 'var(--color-text-tertiary)', textDecoration: 'none' }}>Home</Link>
                    <span>/</span>
                    <Link href="/shop" style={{ color: 'var(--color-text-tertiary)', textDecoration: 'none' }}>Shop</Link>
                    <span>/</span>
                    <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{product.name}</span>
                </nav>
            </div>

            {/* Product Detail */}
            <div className="container" style={{ paddingBottom: 64 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 48,
                    alignItems: 'start',
                }}>
                    {/* Left: Image */}
                    <div className="animate-fade-in-up" style={{
                        position: 'sticky', top: 100,
                    }}>
                        <div style={{
                            width: '100%', aspectRatio: '1',
                            borderRadius: 'var(--radius-xl)',
                            background: '#F8F7F4',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />

                            {/* Badges */}
                            {hasDiscount && (
                                <span style={{
                                    position: 'absolute', top: 16, left: 16,
                                    padding: '6px 14px', borderRadius: 'var(--radius-full)',
                                    background: '#EF4444', color: 'white',
                                    fontSize: 13, fontWeight: 700,
                                }}>
                                    -{discountPercent}% OFF
                                </span>
                            )}
                            <span className="pv-badge" style={{
                                position: 'absolute', top: 16, right: 16, fontSize: 13,
                            }}>
                                +{product.pvValue} PV
                            </span>
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <span className="badge badge-primary" style={{ textTransform: 'capitalize' }}>
                                {product.category}
                            </span>
                            {product.tags.includes('bestseller') && (
                                <span className="badge badge-warning">⭐ Bestseller</span>
                            )}
                        </div>

                        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                            <div style={{ display: 'flex', gap: 2 }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16}
                                        fill={i < Math.floor(product.rating) ? '#F59E0B' : 'none'}
                                        stroke={i < Math.floor(product.rating) ? '#F59E0B' : '#D1D5DB'}
                                    />
                                ))}
                            </div>
                            <span style={{ fontSize: 14, fontWeight: 600 }}>{product.rating}</span>
                            <span style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>
                                ({product.reviewCount} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div style={{ marginBottom: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                                <span style={{ fontSize: 32, fontWeight: 800 }}>{formatPrice(product.price)}</span>
                                {hasDiscount && (
                                    <span style={{
                                        fontSize: 18, color: 'var(--color-text-tertiary)', textDecoration: 'line-through',
                                    }}>
                                        {formatPrice(product.compareAtPrice!)}
                                    </span>
                                )}
                            </div>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 6, marginTop: 8,
                                padding: '8px 12px', borderRadius: 'var(--radius-md)',
                                background: 'var(--color-success-bg)', width: 'fit-content',
                            }}>
                                <span style={{ fontSize: 14, fontWeight: 600, color: '#065F46' }}>
                                    Earn +{product.pvValue * quantity} PV with this purchase
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <p style={{
                            fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 28,
                        }}>
                            {product.description}
                        </p>

                        {/* Variants */}
                        {product.variants && product.variants.length > 0 && (
                            <div style={{ marginBottom: 28 }}>
                                <label className="input-label">Select Variant</label>
                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    {product.variants.map((v) => (
                                        <button
                                            key={v.id}
                                            onClick={() => setSelectedVariant(v)}
                                            style={{
                                                padding: '10px 18px',
                                                borderRadius: 'var(--radius-md)',
                                                border: selectedVariant?.id === v.id
                                                    ? '2px solid var(--color-primary)'
                                                    : '1.5px solid var(--color-border)',
                                                background: selectedVariant?.id === v.id ? 'var(--color-primary-50)' : 'white',
                                                color: selectedVariant?.id === v.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                                fontSize: 13, fontWeight: 600,
                                                cursor: 'pointer',
                                                transition: 'all var(--transition-base)',
                                                opacity: v.inStock ? 1 : 0.5,
                                            }}
                                            disabled={!v.inStock}
                                        >
                                            {v.name}
                                            {!v.inStock && ' (Out)'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity + Add to Cart */}
                        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 0,
                                border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)',
                                overflow: 'hidden',
                            }}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={{
                                        width: 44, height: 44, border: 'none', background: 'white',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}
                                >
                                    <Minus size={16} />
                                </button>
                                <span style={{
                                    width: 50, textAlign: 'center', fontWeight: 600, fontSize: 15,
                                    borderLeft: '1.5px solid var(--color-border)',
                                    borderRight: '1.5px solid var(--color-border)',
                                    height: 44, lineHeight: '44px',
                                }}>
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{
                                        width: 44, height: 44, border: 'none', background: 'white',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="btn btn-primary btn-lg"
                                style={{
                                    flex: 1, minWidth: 200,
                                    background: isAdded ? 'var(--color-success)' : undefined,
                                }}
                            >
                                {isAdded ? (
                                    <>
                                        <Check size={18} /> Added to Cart!
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag size={18} /> {t('product.add_to_cart', locale)}
                                    </>
                                )}
                            </button>

                            <button className="btn btn-secondary btn-icon" style={{ height: 52 }}>
                                <Heart size={18} />
                            </button>
                        </div>

                        {/* Trust Signals */}
                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
                            padding: '20px 0', borderTop: '1px solid var(--color-border-light)',
                        }}>
                            {[
                                { icon: <Package size={18} />, label: 'Free Shipping' },
                                { icon: <Shield size={18} />, label: '100% Authentic' },
                                { icon: <RotateCcw size={18} />, label: '30-Day Return' },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)',
                                }}>
                                    <div style={{ color: 'var(--color-primary)' }}>{item.icon}</div>
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <section style={{ marginTop: 80 }}>
                        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 32 }}>
                            You May Also Like
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                            gap: 24,
                        }}>
                            {related.map((p, i) => (
                                <ProductCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { useLocaleStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

const CATEGORIES = ['all', 'skincare', 'supplements', 'haircare', 'wellness', 'bundles'] as const;

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular' | 'pv-desc';

export default function ShopPage() {
    const { locale } = useLocaleStore();
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('popular');

    const filtered = useMemo(() => {
        let items = [...PRODUCTS];

        // Category filter
        if (activeCategory !== 'all') {
            items = items.filter((p) => p.category === activeCategory);
        }

        // Search filter
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            items = items.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.tags.some((tag: string) => tag.toLowerCase().includes(q))
            );
        }

        // Sort
        switch (sortBy) {
            case 'price-asc':
                items.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                items.sort((a, b) => b.price - a.price);
                break;
            case 'pv-desc':
                items.sort((a, b) => b.pvValue - a.pvValue);
                break;
            case 'popular':
                items.sort((a, b) => b.reviewCount - a.reviewCount);
                break;
            default: // newest
                break;
        }

        return items;
    }, [activeCategory, searchQuery, sortBy]);

    return (
        <div style={{ background: 'var(--color-bg)', minHeight: '70vh' }}>
            {/* Header */}
            <section style={{
                background: 'linear-gradient(135deg, var(--color-primary-50) 0%, #EDE9FE 100%)',
                padding: '48px 0 40px',
            }}>
                <div className="container">
                    <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
                        {t('nav.shop', locale)}
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 16 }}>
                        {t('home.featured_subtitle', locale)}
                    </p>
                </div>
            </section>

            <div className="container" style={{ padding: '32px 0 64px' }}>
                {/* Toolbar */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    marginBottom: 32, flexWrap: 'wrap',
                }}>
                    {/* Search */}
                    <div style={{
                        position: 'relative', flex: '1 1 280px',
                    }}>
                        <Search
                            size={18}
                            style={{
                                position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                                color: 'var(--color-text-tertiary)',
                            }}
                        />
                        <input
                            type="text"
                            placeholder={t('nav.search_placeholder', locale)}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input"
                            style={{ paddingLeft: 42, width: '100%' }}
                        />
                    </div>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="input"
                        style={{ width: 'auto', minWidth: 160, cursor: 'pointer' }}
                    >
                        <option value="popular">Most Popular</option>
                        <option value="newest">Newest</option>
                        <option value="price-asc">Price: Low → High</option>
                        <option value="price-desc">Price: High → Low</option>
                        <option value="pv-desc">Highest PV</option>
                    </select>
                </div>

                {/* Categories */}
                <div style={{
                    display: 'flex', gap: 8, marginBottom: 32,
                    flexWrap: 'wrap',
                }}>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '8px 18px',
                                borderRadius: 'var(--radius-full)',
                                border: activeCategory === cat ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                                background: activeCategory === cat ? 'var(--color-primary)' : 'white',
                                color: activeCategory === cat ? 'white' : 'var(--color-text-secondary)',
                                fontSize: 13,
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all var(--transition-base)',
                                textTransform: 'capitalize',
                            }}
                        >
                            {cat === 'all' ? t('nav.all', locale) : t(`nav.${cat}`, locale)}
                        </button>
                    ))}
                </div>

                {/* Results Count */}
                <div style={{ marginBottom: 20, fontSize: 14, color: 'var(--color-text-tertiary)' }}>
                    {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
                </div>

                {/* Product Grid */}
                {filtered.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                        gap: 24,
                    }}>
                        {filtered.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </div>
                ) : (
                    <div style={{
                        textAlign: 'center', padding: '64px 20px',
                        color: 'var(--color-text-tertiary)',
                    }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                        <p style={{ fontSize: 16, fontWeight: 600 }}>No products found</p>
                        <p style={{ fontSize: 14, marginTop: 8 }}>Try a different search or category</p>
                    </div>
                )}
            </div>
        </div>
    );
}

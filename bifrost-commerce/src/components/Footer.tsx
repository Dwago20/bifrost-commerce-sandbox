'use client';

import Link from 'next/link';
import { useLocaleStore } from '@/lib/store';
import { t } from '@/lib/i18n';

export default function Footer() {
    const { locale } = useLocaleStore();

    return (
        <footer style={{
            background: '#111827',
            color: '#D1D5DB',
            padding: '64px 0 32px',
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 48,
                    marginBottom: 48,
                }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: 10,
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'white', fontWeight: 800, fontSize: 18, fontFamily: 'var(--font-serif)',
                            }}>
                                B
                            </div>
                            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'white' }}>
                                CommerceFlow
                            </span>
                        </div>
                        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#9CA3AF', maxWidth: 280 }}>
                            {t('footer.tagline', locale)}
                        </p>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 16, fontFamily: 'var(--font-sans)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            {t('footer.shop', locale)}
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {['skincare', 'supplements', 'haircare', 'wellness', 'bundles'].map((cat) => (
                                <Link
                                    key={cat}
                                    href={`/shop?category=${cat}`}
                                    style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: 14, transition: 'color var(--transition-fast)' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                                >
                                    {t(`nav.${cat}`, locale)}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 16, fontFamily: 'var(--font-sans)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            {t('footer.company', locale)}
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {['about', 'careers', 'contact'].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item}`}
                                    style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: 14, transition: 'color var(--transition-fast)' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                                >
                                    {t(`footer.${item}`, locale)}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 16, fontFamily: 'var(--font-sans)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            {t('footer.support', locale)}
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {['faq', 'shipping', 'returns', 'privacy', 'terms'].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item}`}
                                    style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: 14, transition: 'color var(--transition-fast)' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                                >
                                    {t(`footer.${item}`, locale)}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid #374151',
                    paddingTop: 24,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 16,
                }}>
                    <p style={{ fontSize: 13, color: '#6B7280' }}>
                        © 2025 CommerceFlow. {t('footer.rights', locale)}
                    </p>
                    <div style={{ display: 'flex', gap: 16 }}>
                        {['🇲🇾', '🇸🇬', '🇧🇳', '🇮🇩'].map((flag, i) => (
                            <span key={i} style={{ fontSize: 20, opacity: 0.7, cursor: 'pointer', transition: 'opacity var(--transition-fast)' }}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
                            >
                                {flag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

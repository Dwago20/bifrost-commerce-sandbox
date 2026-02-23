'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X, Search, Globe, User, ChevronDown } from 'lucide-react';
import { useCartStore, useLocaleStore, useUIStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { LOCALES } from '@/lib/data';
import type { Locale } from '@/types';

export default function Navbar() {
    const { totalItems, toggleCart } = useCartStore();
    const { locale, setLocale } = useLocaleStore();
    const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUIStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: t('nav.home', locale) },
        { href: '/shop', label: t('nav.shop', locale) },
        { href: '/dashboard', label: t('nav.dashboard', locale) },
    ];

    const currentLocale = LOCALES.find((l) => l.code === locale);
    const itemCount = mounted ? totalItems() : 0;

    return (
        <>
            <nav
                className="navbar"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    background: isScrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(16px)',
                    borderBottom: isScrolled ? '1px solid var(--color-border-light)' : '1px solid transparent',
                    transition: 'all var(--transition-base)',
                    boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none',
                }}
            >
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Image src="/logo.png" alt="CommerceFlow Logo" width={36} height={36} style={{ borderRadius: 8 }} />
                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                            CommerceFlow
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    textDecoration: 'none', fontSize: 14, fontWeight: 500,
                                    color: 'var(--color-text-secondary)',
                                    transition: 'color var(--transition-fast)',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {/* Language Switcher */}
                        <div style={{ position: 'relative' }}>
                            <button
                                className="btn btn-ghost btn-icon"
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                aria-label="Change language"
                                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px' }}
                            >
                                <Globe size={16} />
                                <span className="hide-mobile" style={{ fontSize: 13, fontWeight: 500 }}>
                                    {currentLocale?.nativeName}
                                </span>
                                <ChevronDown size={14} className="hide-mobile" />
                            </button>
                            {isLangOpen && (
                                <div
                                    style={{
                                        position: 'absolute', top: '100%', right: 0, marginTop: 8,
                                        background: 'var(--color-surface)', borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border-light)', boxShadow: 'var(--shadow-lg)',
                                        minWidth: 180, overflow: 'hidden', zIndex: 100,
                                    }}
                                    className="animate-scale-in"
                                >
                                    {LOCALES.map((loc) => (
                                        <button
                                            key={loc.code}
                                            onClick={() => { setLocale(loc.code as Locale); setIsLangOpen(false); }}
                                            style={{
                                                width: '100%', padding: '10px 16px', border: 'none',
                                                background: locale === loc.code ? 'var(--color-primary-50)' : 'transparent',
                                                color: locale === loc.code ? 'var(--color-primary)' : 'var(--color-text-primary)',
                                                fontSize: 14, fontWeight: locale === loc.code ? 600 : 400,
                                                display: 'flex', alignItems: 'center', gap: 10,
                                                cursor: 'pointer', fontFamily: 'var(--font-sans)',
                                                transition: 'background var(--transition-fast)',
                                            }}
                                            onMouseEnter={(e) => { if (locale !== loc.code) e.currentTarget.style.background = '#F9FAFB'; }}
                                            onMouseLeave={(e) => { if (locale !== loc.code) e.currentTarget.style.background = 'transparent'; }}
                                        >
                                            <span>{loc.nativeName}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Search */}
                        <Link href="/shop" className="btn btn-ghost btn-icon hide-mobile" aria-label="Search">
                            <Search size={18} />
                        </Link>

                        {/* Account */}
                        <Link href="/register" className="btn btn-ghost btn-icon hide-mobile" aria-label="Account">
                            <User size={18} />
                        </Link>

                        {/* Cart */}
                        <button
                            className="btn btn-ghost btn-icon"
                            onClick={toggleCart}
                            aria-label="Cart"
                            style={{ position: 'relative' }}
                        >
                            <ShoppingBag size={18} />
                            {mounted && itemCount > 0 && (
                                <span style={{
                                    position: 'absolute', top: 2, right: 2,
                                    width: 18, height: 18, borderRadius: '50%',
                                    background: 'var(--color-primary)', color: 'white',
                                    fontSize: 10, fontWeight: 700,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {itemCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="btn btn-ghost btn-icon show-mobile"
                            onClick={toggleMobileMenu}
                            aria-label="Menu"
                            style={{ display: 'none' }}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <>
                    <div className="overlay" onClick={() => setMobileMenuOpen(false)} />
                    <div
                        style={{
                            position: 'fixed', top: 72, left: 0, right: 0, bottom: 0,
                            background: 'var(--color-surface)', zIndex: 45,
                            padding: '24px 16px',
                            overflowY: 'auto',
                        }}
                        className="animate-fade-in"
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    style={{
                                        textDecoration: 'none', padding: '14px 16px',
                                        fontSize: 16, fontWeight: 500, color: 'var(--color-text-primary)',
                                        borderRadius: 'var(--radius-md)',
                                        transition: 'background var(--transition-fast)',
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-primary-50)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <hr style={{ border: 'none', borderTop: '1px solid var(--color-border-light)', margin: '8px 0' }} />
                            <Link
                                href="/register"
                                onClick={() => setMobileMenuOpen(false)}
                                className="btn btn-primary"
                                style={{ marginTop: 8, textDecoration: 'none' }}
                            >
                                <User size={16} />
                                {t('nav.signup', locale)}
                            </Link>
                        </div>
                    </div>
                </>
            )}

            {/* Spacer */}
            <div style={{ height: 72 }} />
        </>
    );
}

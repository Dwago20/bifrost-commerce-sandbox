import en from '@/locales/en.json';
import ms from '@/locales/ms.json';
import zh from '@/locales/zh.json';
import type { Locale } from '@/types';

const messages: Record<Locale, typeof en> = { en, ms, zh };

/**
 * Get a translated string by dot-notation key path.
 * Example: t('nav.home', 'en') => "Home"
 */
export function t(key: string, locale: Locale = 'en'): string {
    const keys = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any = messages[locale];

    for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
            result = result[k];
        } else {
            // Fallback to English
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let fallback: any = messages['en'];
            for (const fk of keys) {
                if (fallback && typeof fallback === 'object' && fk in fallback) {
                    fallback = fallback[fk];
                } else {
                    return key; // Return key if not found in fallback either
                }
            }
            return typeof fallback === 'string' ? fallback : key;
        }
    }

    return typeof result === 'string' ? result : key;
}

/**
 * Format a price in MYR
 */
export function formatPrice(amount: number): string {
    return `RM ${(Number(amount) || 0).toFixed(2)}`;
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateStr: string, locale: Locale = 'en'): string {
    const date = new Date(dateStr);
    const localeMap: Record<Locale, string> = {
        en: 'en-MY',
        ms: 'ms-MY',
        zh: 'zh-CN',
    };
    return date.toLocaleDateString(localeMap[locale], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Get the tier display name
 */
export function getTierName(tier: string): string {
    return tier.charAt(0).toUpperCase() + tier.slice(1);
}

/**
 * Calculate discount percentage
 */
export function getDiscountPercent(price: number, compareAtPrice: number): number {
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

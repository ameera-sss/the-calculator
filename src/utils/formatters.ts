import type { Lang } from '../context/PreferencesContext';

/**
 * Number & Currency Formatting Utilities
 */

export function safeNumber(val: string | number): number {
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  const cleaned = val.replace(/,/g, '').trim();
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function formatSAR(amount: number, lang: Lang = 'ar'): string {
  if (isNaN(amount) || !isFinite(amount)) {
    return lang === 'en' ? '0.00 SAR' : '0.00 ر.س';
  }
  const locale = lang === 'en' ? 'en-US' : 'ar-SA';
  const formatted = amount.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return lang === 'en' ? `${formatted} SAR` : `${formatted} ر.س`;
}

export function formatPercent(rate: number, lang: Lang = 'ar'): string {
  if (isNaN(rate) || !isFinite(rate)) return '0%';
  const locale = lang === 'en' ? 'en-US' : 'ar-SA';
  return `${rate.toLocaleString(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  })}%`;
}

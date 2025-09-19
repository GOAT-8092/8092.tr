export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'tr';

export const pathnames = {
  '/': '/',
  '/takim': {
    tr: '/takim',
    en: '/team',
  },
  '/projelerimiz': {
    tr: '/projelerimiz',
    en: '/projects',
  },
  '/galeri': {
    tr: '/galeri',
    en: '/gallery',
  },
  '/iletisim': {
    tr: '/iletisim',
    en: '/contact',
  },
} as const;

export const localeNames = {
  tr: 'Türkçe',
  en: 'English',
} as const;

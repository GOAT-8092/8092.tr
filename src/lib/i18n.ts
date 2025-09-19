import type { SSRResult } from 'astro';

export interface Translation {
  [key: string]: string | Translation;
}

export interface Translations {
  [lang: string]: Translation;
}

// Available languages
export const LANGUAGES = {
  tr: { name: 'Türkçe', flag: '🇹🇷' },
  en: { name: 'English', flag: '🇺🇸' },
} as const;

export type Language = keyof typeof LANGUAGES;

// Default language
export const DEFAULT_LANGUAGE: Language = 'tr';

// Translation functions
export function getTranslation(translations: Translations, lang: Language, key: string): string {
  const keys = key.split('.');
  let current: any = translations[lang] || translations[DEFAULT_LANGUAGE];

  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      // Fallback to default language
      current = translations[DEFAULT_LANGUAGE];
      for (const fallbackKey of keys) {
        if (current && typeof current === 'object' && fallbackKey in current) {
          current = current[fallbackKey];
        } else {
          return key; // Return key if translation not found
        }
      }
      break;
    }
  }

  return typeof current === 'string' ? current : key;
}

// Import translations at module level
import { translations as translationData } from './translations';

export function getTranslations(lang: Language): Translation {
  return translationData[lang] || translationData[DEFAULT_LANGUAGE];
}

// Astro integration for i18n
export function createI18nMiddleware() {
  return function middleware({ request }: { request: globalThis.Request }): {
    request: globalThis.Request;
    locals: { lang: Language };
  } {
    const url = new URL(request.url);
    const langMatch = url.pathname.match(/^\/([a-z]{2})\//);
    const lang = (langMatch?.[1] as Language) || DEFAULT_LANGUAGE;

    return {
      request,
      locals: { lang },
    };
  };
}

// Helper function to get current language from Astro context
export function getCurrentLanguage(Astro: Readonly<SSRResult>): Language {
  return (Astro as any).locals?.lang || DEFAULT_LANGUAGE;
}

// URL helpers
export function getLocalizedUrl(path: string, lang: Language): string {
  // First remove any existing language prefix
  const pathWithoutLang = removeLangFromPath(path);
  const cleanPath = pathWithoutLang.replace(/^\/+/, '');

  if (lang === DEFAULT_LANGUAGE) {
    // For default language (Turkish), return root path
    return cleanPath ? `/${cleanPath}` : '/';
  } else {
    // For other languages, add language prefix
    return cleanPath ? `/${lang}/${cleanPath}` : `/${lang}/`;
  }
}

export function removeLangFromPath(path: string): string {
  // Remove language prefix like /en/ or /en from the beginning
  return path.replace(/^\/[a-z]{2}(\/|$)/, '/');
}

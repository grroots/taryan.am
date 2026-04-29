// src/lib/i18n.ts - обновленные функции
import { locales, type Locale } from '@/i18n/request';

/**
 * Получить дефолтную локаль
 */
export function getDefaultLocale(): Locale {
  return 'hy';
}

/**
 * Проверить, является ли строка валидной локалью
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Получить локаль из pathname
 */
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length === 0) {
    return getDefaultLocale();
  }
  
  const potentialLocale = segments[0];
  
  if (isValidLocale(potentialLocale)) {
    return potentialLocale;
  }
  
  return getDefaultLocale();
}

/**
 * Удалить локаль из pathname (с учетом скрытого префикса)
 */
export function removeLocaleFromPathname(pathname: string, locale: Locale): string {
  // Для дефолтной локали (hy) префикс уже скрыт
  if (locale === getDefaultLocale()) {
    return pathname;
  }
  
  const withoutLocale = pathname.replace(new RegExp(`^/${locale}(/|$)`), '/');
  return withoutLocale === '' ? '/' : withoutLocale;
}

/**
 * Добавить локаль к pathname (с учетом скрытого префикса)
 */
export function addLocaleToPathname(pathname: string, locale: Locale): string {
  // Для дефолтной локали (hy) не добавляем префикс
  if (locale === getDefaultLocale()) {
    return pathname === '/' ? '/' : pathname;
  }
  
  const cleanPathname = pathname === '/' ? '' : pathname;
  return `/${locale}${cleanPathname}`;
}

/**
 * Получить альтернативные URL для всех локалей (с учетом скрытого префикса)
 */
export function getAlternateUrls(pathname: string, baseUrl: string = 'https://taryan.am') {
  const alternatives: Record<string, string> = {};
  
  locales.forEach(locale => {
    const localizedPath = addLocaleToPathname(pathname, locale);
    alternatives[locale] = `${baseUrl}${localizedPath}`;
  });
  
  // x-default указывает на армянскую версию (без префикса)
  alternatives['x-default'] = `${baseUrl}${addLocaleToPathname(pathname, getDefaultLocale())}`;
  
  return alternatives;
}

/**
 * Получить правильную локаль для метаданных
 */
export function getMetaLocale(locale: Locale): string {
  const metaLocales: Record<Locale, string> = {
    hy: 'hy_AM',
    ru: 'ru_RU',
    en: 'en_US'
  };
  
  return metaLocales[locale];
}

/**
 * Получить направление текста для локали
 */
export function getTextDirection(locale: Locale): 'ltr' | 'rtl' {
  void locale;
  return 'ltr';
}

/**
 * Получить название языка на языке интерфейса
 */
export function getLanguageName(locale: Locale, displayLocale: Locale): string {
  const names: Record<Locale, Record<Locale, string>> = {
    hy: {
      hy: 'Հայերեն',
      ru: 'Русский',
      en: 'English'
    },
    ru: {
      hy: 'Армянский',
      ru: 'Русский',
      en: 'Английский'
    },
    en: {
      hy: 'Armenian',
      ru: 'Russian',
      en: 'English'
    }
  };
  
  return names[displayLocale][locale];
}

/**
 * Получить короткое название языка
 */
export function getLanguageShortName(locale: Locale): string {
  const shortNames: Record<Locale, string> = {
    hy: 'Հայ',
    ru: 'Рус',
    en: 'Eng'
  };
  
  return shortNames[locale];
}

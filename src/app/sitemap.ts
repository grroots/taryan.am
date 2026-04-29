import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';

const siteUrl = 'https://taryan.am';

function getLocalizedUrl(locale: string) {
  return locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, getLocalizedUrl(locale)])
  );

  languages['x-default'] = siteUrl;

  return routing.locales.map((locale) => ({
    url: getLocalizedUrl(locale),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: {
      languages,
    },
  }));
}

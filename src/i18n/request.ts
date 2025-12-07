// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Для Next.js 15 + next-intl 4.x
  let locale = await requestLocale;
  
  console.log('🔍 DEBUG: requestLocale:', locale);
  
  // Fallback для невалидных локалей
  if (!locale || !routing.locales.includes(locale as any)) {
    console.log('❌ Invalid locale, using fallback');
    locale = routing.defaultLocale;
  }

  try {
    const messages = (await import(`@/lib/dictionaries/${locale}.json`)).default;
    
    console.log('✅ Messages loaded for locale:', locale);
    
    return {
      locale,
      messages,
      timeZone: 'Asia/Yerevan',
      now: new Date(),
      formats: {
        dateTime: {
          short: {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }
        }
      }
    };
  } catch (error) {
    console.error('Failed to load messages:', error);
    
    // Fallback
    const fallbackMessages = (await import('@/lib/dictionaries/hy.json')).default;
    return {
      locale: routing.defaultLocale,
      messages: fallbackMessages,
      timeZone: 'Asia/Yerevan',
      now: new Date(),
      formats: {
        dateTime: {
          short: {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }
        }
      }
    };
  }
});

export const locales = routing.locales;
export type Locale = (typeof routing.locales)[number];
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "../globals.css";

import { analyticsConfig } from '@/lib/analytics';
import { routing } from '@/i18n/routing';

export async function generateMetadata({ 
  params 
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  
  const defaultMetadata = {
    title: "Արմեն Մխիթարյան | E-commerce Content Lead",
    description: "E-commerce content-ի, առցանց կատալոգների, AI գործիքների և content operations-ի համակարգային զարգացում",
  };

  const metadataByLocale: Record<string, typeof defaultMetadata> = {
    hy: {
      title: "Արմեն Մխիթարյան | E-commerce Content Lead",
      description: "E-commerce content-ի, առցանց կատալոգների, AI գործիքների և content operations-ի համակարգային զարգացում",
    },
    ru: {
      title: "Армен Мхитарян | E-commerce Content Lead",
      description: "Системное развитие онлайн-каталогов, карточек товаров, SEO-контента, AI-инструментов и content operations",
    },
    en: {
      title: "Armen Mkhitaryan | E-commerce Content Lead",
      description: "Systematic development of online catalogs, product content standards, SEO content, AI tools and content operations",
    },
  };

  const currentMetadata = metadataByLocale[locale] || defaultMetadata;

  return {
    title: currentMetadata.title,
    description: currentMetadata.description,
    keywords: [
      "content manager",
      "e-commerce content lead",
      "content operations",
      "catalog content strategy",
      "product content standards",
      "AI for e-commerce content",
      "քոնթենթ մենեջեր", 
      "контент менеджер",
      "copywriting",
      "SEO",
      "e-commerce",
      "Armen Mkhitaryan",
      "Армен Мхитарян",
      "Արմեն Մխիթարյան"
    ].join(", "),
    authors: [{ name: "Armen Mkhitaryan" }],
    creator: "Armen Mkhitaryan",
    publisher: "Armen Mkhitaryan",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === 'hy' ? 'hy_AM' : locale === 'ru' ? 'ru_RU' : 'en_US',
      // URL без префикса для армянского
      url: `https://taryan.am${locale === 'hy' ? '' : `/${locale}`}`,
      title: currentMetadata.title,
      description: currentMetadata.description,
      siteName: "Armen Mkhitaryan - Content Manager",
      images: [
        {
          url: "https://taryan.am/og-image.webp",
          width: 1200,
          height: 630,
          alt: currentMetadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: currentMetadata.title,
      description: currentMetadata.description,
      images: ["https://taryan.am/twitter-image.webp"],
    },
    alternates: {
      canonical: `https://taryan.am${locale === 'hy' ? '' : `/${locale}`}`,
      languages: {
        'hy': 'https://taryan.am',        // ← Армянский БЕЗ префикса
        'ru': 'https://taryan.am/ru',     // ← Русский с префиксом
        'en': 'https://taryan.am/en',     // ← Английский с префиксом
        'x-default': 'https://taryan.am', // ← По умолчанию армянский
      },
    },
    other: {
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'Taryan.am',
    },
  };
}

// Генерация статических параметров для всех локалей
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  console.log('🔍 Layout: received locale:', locale);

  // Проверяем валидность локали с помощью hasLocale из next-intl
  if (!hasLocale(routing.locales, locale)) {
    console.log('❌ Layout: Invalid locale', locale);
    notFound();
  }

  // Устанавливаем локаль для статического рендеринга
  setRequestLocale(locale);

  // Получаем сообщения для текущей локали
  let messages;
  try {
    messages = await getMessages();
    console.log('✅ Layout: Messages loaded successfully for', locale);
  } catch (error) {
    console.error(`❌ Layout: Failed to load messages for locale: ${locale}`, error);
    notFound();
  }

  return (
    <html lang={locale} dir="ltr" className="scroll-smooth">
      <head>
        {/* DNS prefetch для улучшения производительности */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect для критических ресурсов */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Favicon и иконки */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Theme colors */}
        <meta name="theme-color" content="#2B7A8A" />
        
        {/* Performance hints */}
        <link rel="preload" href="/assets/fonts/DejaVuSans.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/DejaVuSerif.woff2" as="font" type="font/woff2" crossOrigin="" />
        
        {/* Hreflang links для SEO */}
        <link rel="alternate" hrefLang="hy" href="https://taryan.am" />
        <link rel="alternate" hrefLang="ru" href="https://taryan.am/ru" />
        <link rel="alternate" hrefLang="en" href="https://taryan.am/en" />
        <link rel="alternate" hrefLang="x-default" href="https://taryan.am" />
      </head>
      <body className="antialiased bg-body text-main min-h-screen overflow-x-hidden">
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${analyticsConfig.googleTagManagerId}');
            `,
          }}
        />
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(${analyticsConfig.yandexMetrikaId}, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
              });
            `,
          }}
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${analyticsConfig.googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${analyticsConfig.yandexMetrikaId}`}
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        
        {/* Skip to content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
      </body>
    </html>
  );
}

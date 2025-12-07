// src/app/[locale]/page.tsx - ТЕСТОВАЯ ВЕРСИЯ
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Server Components (статичные)
import ServerServicesSection from '@/components/sections/ServicesSection/ServerServicesSection';
import Header from '@/components/layout/Header/index';
import Footer from '@/components/layout/Footer/index';

// Client Components (интерактивные) - пока оставляем как есть
import SkillsSection from '@/components/sections/SkillsSection/index';
import ContactSection from '@/components/sections/ContactSection/index';

// Client wrapper для интерактивности
import ClientPageWrapper from '@/components/client/ClientPageWrapper';

import { routing } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: string }>;
}

// Генерация статических параметров
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Генерация метаданных на сервере
export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  // Динамическая загрузка переводов для метаданных
  try {
    const messages = await import(`@/lib/dictionaries/${locale}.json`);
    const t = messages.default;

    const siteUrl = 'https://taryan.am';
    const currentUrl = locale === 'hy' ? siteUrl : `${siteUrl}/${locale}`;

    return {
      title: t.seo?.meta?.title || "Armen Mkhitaryan | Content Manager",
      description: t.seo?.meta?.description || "Content manager with 5+ years of experience",
      
      // Канонические URL
      alternates: {
        canonical: currentUrl,
        languages: {
          'hy': 'https://taryan.am',
          'ru': 'https://taryan.am/ru', 
          'en': 'https://taryan.am/en',
          'x-default': 'https://taryan.am'
        }
      },

      // Open Graph
      openGraph: {
        title: t.seo?.meta?.title,
        description: t.seo?.meta?.description,
        url: currentUrl,
        siteName: "Armen Mkhitaryan - Content Manager",
        locale: locale === 'hy' ? 'hy_AM' : locale === 'ru' ? 'ru_RU' : 'en_US',
        type: 'website',
      },

      // Robots
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
    };
  } catch (error) {
    console.error('Error loading metadata translations:', error);
    return {
      title: "Armen Mkhitaryan | Content Manager",
      description: "Content manager with 5+ years of experience",
    };
  }
}

// Основной Server Component
export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  // Валидация локали
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Включение статического рендеринга
  setRequestLocale(locale);

  // Загрузка переводов для структурированных данных
  let structuredData = {};
  try {
    const messages = await import(`@/lib/dictionaries/${locale}.json`);
    const t = messages.default;

    structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Armen Mkhitaryan",
      "alternateName": ["Армен Мхитарян", "Արմեն Մխիթարյան"],
      "jobTitle": "Content Manager",
      "description": t.seo?.schema?.description || "Experienced content manager",
      "url": locale === 'hy' ? 'https://taryan.am' : `https://taryan.am/${locale}`,
      "sameAs": [
        "https://linkedin.com/in/taryan",
        "https://github.com/taryan"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance"
      },
      "knowsAbout": [
        "Content Management",
        "Copywriting", 
        "SEO",
        "E-commerce"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Yerevan",
        "addressCountry": "AM"
      }
    };
  } catch (error) {
    console.error('Error loading structured data:', error);
  }

  return (
    <div className="min-h-screen bg-body text-main">
      {/* Структурированные данные */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* Header - остается Client Component */}
      <Header locale={locale} />

      {/* Основной контент */}
      <main id="main-content" role="main">
        
        {/* Тестовая Server Section - Services */}
        <section
          id="services"
          className="section-light"
          aria-label="Services section"
        >
          <ServerServicesSection locale={locale} />
        </section>

        {/* Client Components в обертке для интерактивности */}
        <ClientPageWrapper locale={locale}>
          {/* Skills Section - Client Component */}
          <section
            id="skills"
            className="section-dark"
            aria-label="Skills section"
          >
            <SkillsSection />
          </section>

          {/* Contact Section - Client Component */}
          <section
            id="contact"
            className="section-light"
            aria-label="Contact section"
          >
            <ContactSection />
          </section>
        </ClientPageWrapper>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
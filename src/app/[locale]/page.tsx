import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Header from '@/components/layout/Header/index';
import Footer from '@/components/layout/Footer/index';
import HeroSection from '@/components/sections/HeroSection/index';
import AboutSection from '@/components/sections/AboutSection/index';
import ServicesSection from '@/components/sections/ServicesSection/index';
import PortfolioSection from '@/components/sections/PortfolioSection/index';
import SkillsSection from '@/components/sections/SkillsSection/index';
import PricingSection from '@/components/sections/PricingSection/index';
import ContactSection from '@/components/sections/ContactSection/index';

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
      title: t.seo?.meta?.title || "Armen Mkhitaryan | Operational Content Leader",
      description: t.seo?.meta?.description || "Operational Content Leader focused on catalog systems, SEO, filtering, UI/UX, visuals and team leadership",
      
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
        siteName: "Armen Mkhitaryan - Operational Content Leader",
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
      title: "Armen Mkhitaryan | Operational Content Leader",
      description: "Operational Content Leader focused on catalog systems, SEO, filtering, UI/UX, visuals and team leadership",
    };
  }
}

// Основной Server Component
export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  // Валидация локали
  if (!routing.locales.some((supportedLocale) => supportedLocale === locale)) {
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
      "jobTitle": t.seo?.schema?.job_title || "Operational Content Leader",
      "description": t.seo?.schema?.description || "Operational leader in e-commerce content systems, catalog structure, SEO, filtering, UI/UX, visuals and team leadership",
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
        "Operational Content Leadership",
        "Content Operations",
        "Content Team Leadership",
        "Catalog Content Strategy",
        "Product Content Standards",
        "E-commerce Filtering",
        "UI/UX Content",
        "Product Visuals",
        "AI for E-commerce Content",
        "SEO"
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

      <Header locale={locale} />

      <main id="main-content" role="main">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <SkillsSection />
        <PricingSection />
        <ContactSection />
      </main>

      <Footer locale={locale} />
    </div>
  );
}

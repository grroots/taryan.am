// src/components/sections/HeroSection/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { 
  Boxes,
  CalendarClock,
  FolderKanban,
  Mail,
  Linkedin,
  PenTool,
  NotebookPen,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const t = useTranslations('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Stats configuration based on locale keys
  const stats = [
    {
      key: 'value_prop_9years',
      value: t('value_prop_9years'), // Используем ключ локализации
      label: t('value_prop_9years_desc')
    },
    {
      key: 'value_prop_1000',
      value: t('value_prop_1000'), // Используем ключ локализации
      label: t('value_prop_1000_desc')
    },
    {
      key: 'value_prop_ecommerce',
      value: t('value_prop_ecommerce'), // Используем ключ локализации
      label: t('value_prop_ecommerce_desc')
    }
  ];

  // Логика кнопок как в старых файлах
  const handlePrimaryCtaClick = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSecondaryCtaClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSocialClick = (platform: string, url: string) => {
    // Для будущей аналитики
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={cn(styles.heroSection, className)}>
      {/* Background Particles */}
      <div className={styles.heroParticles} aria-hidden="true" />

      {/* Desktop Layout */}
      <div className={styles.heroDesktop}>
        {/* Decorative line separator */}
        <div className={styles.heroDecorative} aria-hidden="true">
          <div className={styles.heroDecorativeLine}></div>
          <div className={styles.heroDecorativeGlow}></div>
        </div>

        {/* Left Column - Content */}
        <div className={styles.heroLeftColumn}>
          <div
            className={cn(
              styles.heroTextContent,
              isVisible && styles.heroVisible
            )}
          >
            {/* Greeting with icons */}
            <div className={styles.heroGreetingContainer}>
              <PenTool className={cn(styles.heroGreetingIcon, styles.heroGreetingIconLeft)} />
              <p className={styles.heroGreeting}>
                {t('greeting')}
              </p>
              <NotebookPen className={cn(styles.heroGreetingIcon, styles.heroGreetingIconRight)} />
            </div>

            {/* Main title */}
            <h1 className={styles.heroTitle}>
              {t('name')}
            </h1>

            {/* Subtitle with glass effect */}
            <div className={styles.heroSubtitleContainer}>
              <div className={styles.heroSubtitleGlow} aria-hidden="true"></div>
              <h2 className={styles.heroSubtitle}>
                {t('title')}
              </h2>
            </div>

            {/* Value Proposition Block */}
            <div className={styles.heroValueProps}>
              <div className={styles.valuePropsGrid}>
                {stats.map((stat, index) => (
                  <div key={stat.key} className={styles.valueProp}>
                    <div className={styles.valuePropIcon}>
                      {index === 0 && <CalendarClock className={styles.valuePropIconSvg} />}
                      {index === 1 && <Boxes className={styles.valuePropIconSvg} />}
                      {index === 2 && <FolderKanban className={styles.valuePropIconSvg} />}
                    </div>
                    <span className={styles.valuePropValue}>
                      {stat.value}
                    </span>
                    <span className={styles.valuePropLabel}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className={styles.heroSocialLinks}>
              <a
                href="https://www.linkedin.com/in/armen-mkhitaryan"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroSocialLink}
                onClick={() => handleSocialClick('linkedin', 'https://www.linkedin.com/in/armen-mkhitaryan')}
                aria-label="Visit Armen Mkhitaryan's LinkedIn profile"
              >
                <Linkedin className={styles.heroSocialIcon} />
              </a>

              <a
                href="mailto:info@taryan.am"
                className={styles.heroSocialLink}
                onClick={() => handleSocialClick('email', 'mailto:info@taryan.am')}
                aria-label="Send email to info@taryan.am"
              >
                <Mail className={styles.heroSocialIcon} />
              </a>
            </div>

            {/* Desktop Buttons */}
            <div className={styles.heroActions}>
              <button 
                onClick={handlePrimaryCtaClick}
                className={cn(styles.heroCtaButton, styles.heroCtaPrimary)}
              >
                <span className={styles.heroCtaContent}>
                  {t('cta_button')}
                  <ArrowRight className={styles.heroCtaArrow} />
                </span>
                <div className={styles.heroCtaShine} aria-hidden="true"></div>
              </button>

              <button 
                onClick={handleSecondaryCtaClick}
                className={cn(styles.heroCtaButton, styles.heroCtaSecondary)}
              >
                <span className={styles.heroCtaContent}>
                  {t('cta_button_secondary')}
                  <ArrowRight className={styles.heroCtaArrow} />
                </span>
                <div className={styles.heroCtaShine} aria-hidden="true"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className={styles.heroRightColumn}>
          <div className={styles.heroImageOverlayContainer}>
            <div className={styles.heroImageGradient} aria-hidden="true"></div>
            <div className={styles.heroImageBottomGradient} aria-hidden="true"></div>
          </div>
          <div className={styles.heroImageContainer}>
            <img
              src="/assets/img/Armen-Mkhitaryan-Content.webp"
              alt={`${t('name')} - ${t('title')}`}
              className={styles.heroImage}
              loading="eager"
            />
            {/* Image overlay effects */}
            <div className={styles.heroImageOverlay} aria-hidden="true"></div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.heroMobile}>
        {/* Background Image */}
        <div className={styles.heroMobileBackground}>
          <img
            src="/assets/img/Armen-Mkhitaryan-Content.webp"
            alt={`${t('name')} - ${t('title')}`}
            className={styles.heroMobileBackgroundImage}
            loading="eager"
          />
          <div className={styles.heroMobileBackgroundOverlay} aria-hidden="true"></div>
        </div>

        {/* Content */}
        <div className={styles.heroMobileContent}>
          <div
            className={cn(
              styles.heroMobileInner,
              isVisible && styles.heroMobileVisible
            )}
          >
            {/* Glass morphism card */}
            <div className={styles.heroGlassCard}>
              {/* Greeting */}
              <div className={styles.heroMobileGreeting}>
                <PenTool className={styles.heroMobileGreetingIcon} />
                <p className={styles.heroMobileGreetingText}>
                  {t('greeting')}
                </p>
                <NotebookPen className={styles.heroMobileGreetingIcon} />
              </div>

              {/* Main title */}
              <h1 className={styles.heroMobileTitle}>
                {t('name')}
              </h1>

              {/* Subtitle */}
              <div className={styles.heroMobileSubtitleContainer}>
                <div className={styles.heroMobileSubtitle}>
                  <h2 className={styles.heroMobileSubtitleText}>
                    {t('title')}
                  </h2>
                </div>
              </div>

              {/* Mobile Value Proposition */}
              <div className={styles.heroMobileValueProps}>
                <div className={styles.heroMobileValuePropsInner}>
                  {stats.map((stat, index) => (
                    <div key={stat.key} className={styles.heroMobileValueProp}>
                      <div className={styles.heroMobileValuePropIcon}>
                        {index === 0 && <CalendarClock className={styles.heroMobileValuePropIconSvg} />}
                        {index === 1 && <Boxes className={styles.heroMobileValuePropIconSvg} />}
                        {index === 2 && <FolderKanban className={styles.heroMobileValuePropIconSvg} />}
                      </div>
                      <div className={styles.heroMobileValuePropValue}>{stat.value}</div>
                      <div className={styles.heroMobileValuePropLabel}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className={styles.heroMobileSocial}>
                <a
                  href="https://www.linkedin.com/in/armen-mkhitaryan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.heroMobileSocialLink}
                  onClick={() => handleSocialClick('linkedin', 'https://www.linkedin.com/in/armen-mkhitaryan')}
                  aria-label="Visit Armen Mkhitaryan's LinkedIn profile"
                >
                  <Linkedin className={styles.heroMobileSocialIcon} />
                </a>

                <a
                  href="mailto:info@taryan.am"
                  className={styles.heroMobileSocialLink}
                  onClick={() => handleSocialClick('email', 'mailto:info@taryan.am')}
                  aria-label="Send email to info@taryan.am"
                >
                  <Mail className={styles.heroMobileSocialIcon} />
                </a>
              </div>

              {/* Mobile Buttons */}
              <div className={styles.heroMobileButtons}>
                <button 
                  onClick={handlePrimaryCtaClick}
                  className={cn(styles.heroMobileButton, styles.heroMobileButtonPrimary)}
                >
                  <span className={styles.heroMobileButtonContent}>
                    {t('cta_button')}
                    <ArrowRight className={styles.heroMobileButtonArrow} />
                  </span>
                  <div className={styles.heroMobileButtonShine} aria-hidden="true"></div>
                </button>

                <button 
                  onClick={handleSecondaryCtaClick}
                  className={cn(styles.heroMobileButton, styles.heroMobileButtonSecondary)}
                >
                  <span className={styles.heroMobileButtonContent}>
                    {t('cta_button_secondary')}
                    <ArrowRight className={styles.heroMobileButtonArrow} />
                  </span>
                  <div className={styles.heroMobileButtonShine} aria-hidden="true"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

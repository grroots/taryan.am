// src/components/sections/PricingSection/index.tsx
'use client';

import { useTranslations } from 'next-intl';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { Check, CalendarClock, SearchCheck, ShieldCheck, Target } from "lucide-react";
import { usePackages } from "@/data/packages";
import PricingCard from "@/components/ui/PricingCard";
import Button from "@/components/ui/Button";
import { cn } from '@/lib/utils';
import styles from './PricingSection.module.css';

interface PricingSectionProps {
  className?: string;
}

const PricingSection: React.FC<PricingSectionProps> = ({ className }) => {
  const t = useTranslations('pricing');
  const { trackPackageSelect, trackButtonClick } = useAnalytics();
  const packages = usePackages();

  // Проверяем что пакеты загрузились
  if (!packages || packages.length === 0) {
    return (
      <section id="pricing" className="section-light">
        <div className="container-section">
          <div className="text-center py-16">
            <div className="text-xl text-text-primary">
              {t('loading')}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Функция для обработки выбора пакета + аналитика
  const handlePackageSelect = (packageId: string, packageName: string) => {
    trackPackageSelect(packageName);
    
    // Скролл к секции контактов
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Добавляем параметры в URL для предзаполнения формы
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('subject', 'services');
        url.searchParams.set('service', packageId);
        window.history.replaceState({}, '', url.toString());
        
        // Диспатчим событие для ContactSection
        window.dispatchEvent(new CustomEvent('presetContactForm', {
          detail: { 
            subject: 'services', 
            service: packageId
          }
        }));
      }
    }
  };

  // Функция для обработки кнопки "Получить предложение" + аналитика
  const handleCustomOfferClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    trackButtonClick('get_custom_offer', 'pricing');
    
    // Скролл к секции контактов
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Добавляем параметры в URL для кастомного предложения
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('subject', 'services');
        url.searchParams.set('service', 'custom');
        window.history.replaceState({}, '', url.toString());
        
        // Диспатчим событие для ContactSection
        window.dispatchEvent(new CustomEvent('presetContactForm', {
          detail: { 
            subject: 'services', 
            service: 'custom'
          }
        }));
      }
    }
  };

  return (
    <section 
      id="pricing" 
      className={cn(styles.pricingSection, "scrollReveal", className)}
    >
      <div className={styles.pricingContainer}>
        {/* Header */}
        <div className={cn(styles.pricingHeader, "fadeInUp")}>
          <div className={styles.subtitleContainer}>
            <CalendarClock className={styles.subtitleIcon} />
            <span className={styles.subtitle}>
              {t('subtitle')}
            </span>
          </div>

          <h2 className={styles.title}>
            {t('title')}
          </h2>

          <p className={styles.description}>
            {t('description')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className={cn(styles.pricingGrid, "fadeInUp")}>
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={cn(styles.pricingCardWrapper, "staggeredFadeIn hoverLift", {
                "staggered-delay-1": index === 0,
                "staggered-delay-2": index === 1,
                "staggered-delay-3": index === 2,
              })}
            >
              <PricingCard 
                package={pkg}
                className={styles.pricingCardCustom}
                onSelect={() => handlePackageSelect(pkg.id, pkg.title)}
              />
            </div>
          ))}
        </div>

        {/* "Не нашли подходящий вариант?" */}
        <div className={cn(styles.ctaSection, "scaleIn")}>
          <div className={styles.ctaContainer}>
            
            {/* Верхняя часть - flex row */}
            <div className={styles.ctaContent}>
              
              {/* Левая часть (50%) */}
              <div className={styles.ctaLeft}>
                <h3 className={styles.ctaTitle}>
                  {t('included_title')}
                </h3>
                
                {/* Чек-лист (4 пункта друг под другом вертикально) */}
                <div className={styles.featuresList}>
                  <div className={cn(styles.featureItem, "staggeredSlideUp")}>
                    <Check className={styles.featureIcon} />
                    <span className={styles.featureText}>{t('included_strategy')}</span>
                  </div>
                  <div className={cn(styles.featureItem, "staggeredSlideUp")}>
                    <Check className={styles.featureIcon} />
                    <span className={styles.featureText}>{t('included_reporting')}</span>
                  </div>
                  <div className={cn(styles.featureItem, "staggeredSlideUp")}>
                    <Check className={styles.featureIcon} />
                    <span className={styles.featureText}>{t('included_support')}</span>
                  </div>
                  <div className={cn(styles.featureItem, "staggeredSlideUp")}>
                    <Check className={styles.featureIcon} />
                    <span className={styles.featureText}>{t('included_guarantee')}</span>
                  </div>
                </div>
              </div>

              {/* Вертикальная разделительная линия */}
              <div className={styles.divider}></div>
              
              {/* Правая часть (50%) */}
              <div className={styles.ctaRight}>
                <h3 className={styles.ctaRightTitle}>
                  {t('not_found')}
                </h3>
                <p className={styles.ctaRightDescription}>
                  {t('not_found_desc')}
                </p>

                {/* Группы с иконками и текстами (text-center group) */}
                <div className={styles.benefitsGrid}>
                  <div className={cn(styles.benefitItem, "staggeredFadeIn")}>
                    <div className={cn(styles.benefitIcon, "hoverScale")}>
                      <SearchCheck className={styles.benefitIconSvg} />
                    </div>
                    <h4 className={styles.benefitTitle}>
                      {t('flexible_terms')}
                    </h4>
                    <p className={styles.benefitDescription}>
                      {t('flexible_terms_desc')}
                    </p>
                  </div>
                  
                  <div className={cn(styles.benefitItem, "staggeredFadeIn")}>
                    <div className={cn(styles.benefitIcon, "hoverScale")}>
                      <Target className={styles.benefitIconSvg} />
                    </div>
                    <h4 className={styles.benefitTitle}>
                      {t('quality')}
                    </h4>
                    <p className={styles.benefitDescription}>
                      {t('quality_desc')}
                    </p>
                  </div>
                  
                  <div className={cn(styles.benefitItem, "staggeredFadeIn")}>
                    <div className={cn(styles.benefitIcon, "hoverScale")}>
                      <ShieldCheck className={styles.benefitIconSvg} />
                    </div>
                    <h4 className={styles.benefitTitle}>
                      {t('result')}
                    </h4>
                    <p className={styles.benefitDescription}>
                      {t('result_desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Горизонтальная разделительная линия на всю ширину */}
            <div className={styles.horizontalDivider}></div>

            {/* Нижняя часть - центрированная кнопка */}
            <div className={styles.ctaButtonContainer}>
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleCustomOfferClick}
                className={cn(styles.ctaButton, "hoverLift")}
              >
                {t('get_offer')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

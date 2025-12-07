// src/components/sections/AboutSection/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { 
  ShoppingBag,
  User,
  Target,
  CircleCheckBig,
  Package,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './AboutSection.module.css';

interface AboutSectionProps {
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  const t = useTranslations('about');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Three words data
  const threeWords = [
    {
      key: 'creative',
      label: t('creative'),
      icon: CircleCheckBig
    },
    {
      key: 'literary', 
      label: t('literary'),
      icon: CircleCheckBig
    },
    {
      key: 'organized',
      label: t('organized'),
      icon: CircleCheckBig
    }
  ];

  // About items 
  const aboutItems = [
    {
      icon: Package,
      title: t('text_creation'),
      description: t('text_creation_desc'),
    },
    {
      icon: ShoppingBag,
      title: t('content_management'),
      description: t('content_management_desc'),
    },
    {
      icon: Globe,
      title: t('cms'),
      description: t('cms_desc'),
    },
  ];

  // Platforms data
  const platforms = [
    { 
      name: t('platform_wildberries'), 
      stat: t('platform_wildberries_stat') 
    },
    { 
      name: t('platform_ozon'), 
      stat: t('platform_ozon_stat') 
    },
    { 
      name: t('platform_ebay'), 
      stat: t('platform_ebay_stat') 
    },
    { 
      name: t('platform_ecommerce'), 
      stat: t('platform_ecommerce_stat') 
    }
  ];

  // Timeline data - полная структура из старого компонента
  const timelineSteps = [
    {
      year: '2016',
      title: t('start'),
      description: t('start_desc')
    },
    {
      year: '2018',
      title: t('growth'),
      description: t('growth_desc')
    },
    {
      year: '2021',
      title: t('senior_path'),
      description: t('senior_desc')
    }
  ];

  return (
    <section 
      id="about" 
      className={cn(styles.aboutSection, className)}
    >
      <div className={styles.aboutContainer}>
        {/* Section Header */}
        <div className={cn(
          styles.aboutHeader,
          isVisible ? styles.visible : styles.hidden
        )}>
          <div className={styles.aboutBadge}>
            <User className={styles.aboutBadgeIcon} />
            <span className={styles.aboutBadgeText}>
              {t('who_am_i')}
            </span>
          </div>
          
          <h2 className={styles.aboutTitle}>
            {t('three_words')}
          </h2>

          {/* Three words with icons */}
          <div className={styles.aboutWordsGrid}>
            {threeWords.map((word) => {
              const IconComponent = word.icon;
              return (
                <div key={word.key} className={styles.aboutWord}>
                  <IconComponent className={styles.aboutWordIcon} />
                  <span className={styles.aboutWordText}>{word.label}</span>
                </div>
              );
            })}
          </div>

          <p className={styles.aboutSubtitle}>
            {t('description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className={styles.aboutServices}>
          <div className={styles.aboutServicesGrid}>
            {aboutItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className={cn(
                    styles.aboutServiceCard,
                    isVisible ? styles.visible : styles.hidden
                  )}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={styles.aboutServiceContent}>
                    <div className={styles.aboutServiceBody}>
                      <div className={styles.aboutServiceIcon}>
                        <IconComponent />
                      </div>
                      <h3 className={styles.aboutServiceTitle}>
                        {item.title}
                      </h3>
                      <p className={styles.aboutServiceDescription}>
                        {item.description}
                      </p>
                    </div>
                    <div className={styles.aboutServiceOverlay} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className={cn(
          styles.aboutTimeline,
          isVisible ? styles.visible : styles.hidden
        )}>
          <div className={styles.aboutTimelineCard}>
            <div className={styles.aboutTimelineHeader}>
              <div className={styles.aboutTimelineBadge}>
                <Target className={styles.aboutTimelineBadgeIcon} />
                <h3 className={styles.aboutTimelineTitle}>
                  {t('specialization_path')}
                </h3>
              </div>
              <p className={styles.aboutTimelineSubtitle}>
                {t('help_understand')}
              </p>
            </div>

            <div className={styles.aboutTimelineSteps}>
              {timelineSteps.map((step, index) => (
                <div key={index} className={styles.aboutTimelineStep}>
                  <div className={styles.aboutTimelineYear}>
                    <span>{step.year}</span>
                  </div>
                  <h4 className={styles.aboutTimelineStepTitle}>
                    {step.title}
                  </h4>
                  <p className={styles.aboutTimelineStepDescription}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Platforms specialization */}
            <div className={styles.aboutPlatforms}>
              <div className={styles.aboutPlatformsContent}>
                <h4 className={styles.aboutPlatformsTitle}>{t('platforms_title')}</h4>
                <div className={styles.aboutPlatformsList}>
                  {platforms.map((platform, index) => (
                    <div key={index} className={styles.aboutPlatformItem}>
                      <div className={styles.aboutPlatformItemContent}>
                        <div className={styles.aboutPlatformDot} />
                        <span className={styles.aboutPlatformName}>
                          {platform.name}
                        </span>
                        <span className={styles.aboutPlatformStat}>
                          ({platform.stat})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className={styles.aboutDivider}></div>
    </section>
  );
};

export default AboutSection;
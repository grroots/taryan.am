'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { 
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Globe,
  Handshake,
  FolderOpen,
  Package,
  Workflow
} from 'lucide-react';
import { useProjects } from '@/data/projects';
import PortfolioCard from '@/components/ui/PortfolioCard';
import { cn } from '@/lib/utils';
import styles from './PortfolioSection.module.css';

interface PortfolioSectionProps {
  className?: string;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ className }) => {
  const t = useTranslations('portfolio');
  const projects = useProjects();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerSlide = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(projects.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const achievements = [
    { 
      number: t('stats.projects_count'), 
      label: t('stats.projects_label'),
      icon: FolderOpen
    },
    { 
      number: t('stats.clients_count'), 
      label: t('stats.clients_label'),
      icon: Handshake
    },
    { 
      number: t('stats.cms_count'), 
      label: t('stats.cms_label'),
      icon: Globe
    },
    { 
      number: t('stats.products_count'), 
      label: t('stats.products_label'),
      icon: Package
    },
  ];

  return (
    <section 
      id="portfolio" 
      className={cn("section-light scrollReveal", className)}
    >
      <div className="container-section">
        {/* Section Header */}
        <div className={cn(
          styles.portfolioHeader,
          "fadeInUp",
          isVisible && styles.visible
        )}>
          <div className={styles.portfolioSubtitleContainer}>
            <FolderKanban className={styles.portfolioIcon} />
            <span className={styles.portfolioSubtitle}>
              {t('subtitle')}
            </span>
          </div>

          <h2 className={cn("section-title", styles.portfolioTitle)}>
            {t('title')}
          </h2>

          <p className={styles.portfolioDescription}>
            {t('description')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className={styles.portfolioCarouselContainer}>
          {/* Navigation Buttons - убрана анимация scale */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className={cn(styles.portfolioNavButton, styles.portfolioNavButtonPrev)}
                aria-label="Previous slide"
              >
                <ChevronLeft className={styles.portfolioNavIcon} />
              </button>

              <button
                onClick={nextSlide}
                className={cn(styles.portfolioNavButton, styles.portfolioNavButtonNext)}
                aria-label="Next slide"
              >
                <ChevronRight className={styles.portfolioNavIcon} />
              </button>
            </>
          )}

          {/* Portfolio Cards */}
          <div className={styles.portfolioCarouselWrapper}>
            <div
              className={cn(
                styles.portfolioCarousel,
                styles[`slide${currentSlide}`]
              )}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div 
                  key={slideIndex} 
                  className={cn(
                    styles.portfolioSlide,
                    isMobile ? styles.portfolioSlideMobile : styles.portfolioSlideDesktop
                  )}
                >
                  {projects
                    .slice(
                      slideIndex * itemsPerSlide,
                      (slideIndex + 1) * itemsPerSlide
                    )
                    .map((project) => (
                      <div
                        key={project.id}
                        className={cn(
                          styles.portfolioCardWrapper,
                          isMobile ? styles.portfolioCardMobile : styles.portfolioCardDesktop,
                          `staggeredFadeIn`,
                          isVisible && styles.visible
                        )}
                      >
                        <PortfolioCard project={project} />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        {totalSlides > 1 && (
          <div className={styles.portfolioDotsContainer}>
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  styles.portfolioDot,
                  currentSlide === index && styles.portfolioDotActive
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Results Section */}
        <div className={cn(
          styles.portfolioStatsSection,
          "fadeInUp",
          isVisible && styles.visible
        )}>
          <div className={styles.portfolioStatsContainer}>
            <div className={styles.portfolioStatsHeader}>
              <h3 className={styles.portfolioStatsTitle}>
                <Workflow className={styles.portfolioStatsIcon} />
                {t('results_title')}
              </h3>
              <p className={styles.portfolioStatsSubtitle}>
                {t('results_subtitle')}
              </p>
            </div>
            
            <div className={styles.portfolioStatsGrid}>
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={index} className={styles.portfolioStatItem}>
                    <div className={styles.portfolioStatContent}>
                      <div className={styles.portfolioStatIconWrapper}>
                        <IconComponent className={styles.portfolioStatIcon} />
                      </div>
                      <div className={styles.portfolioStatNumber}>
                        {achievement.number}
                      </div>
                      <div className={styles.portfolioStatLabel}>
                        {achievement.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Approach section */}
            <div className={styles.portfolioApproachSection}>
              {t('approach_title') && (
                <h4 className={styles.portfolioApproachTitle}>{t('approach_title')}</h4>
              )}
              <div className={styles.portfolioApproachGrid}>
                <div className={styles.portfolioApproachItem}>
                  <div className={styles.portfolioApproachDot} />
                  <span className={styles.portfolioApproachText}>{t('approach_analysis')}</span>
                </div>
                <div className={styles.portfolioApproachItem}>
                  <div className={styles.portfolioApproachDot} />
                  <span className={styles.portfolioApproachText}>{t('approach_optimization')}</span>
                </div>
                <div className={styles.portfolioApproachItem}>
                  <div className={styles.portfolioApproachDot} />
                  <span className={styles.portfolioApproachText}>{t('approach_kpi')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Highlights */}
        <div className={cn(
          styles.portfolioCaseStudies,
          "fadeInUp",
          isVisible && styles.visible
        )}>
          <div className={styles.portfolioCaseGrid}>
            {/* Domus Experience */}
            <div className={styles.portfolioCaseBlock}>
              <div className={styles.portfolioCaseHeader}>
                <div className={styles.portfolioCaseIconWrapper}>
                  <Image
                    src="/assets/img/logos/domus-logo.png"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.portfolioCaseIconImage}
                  />
                </div>
                <h4 className={styles.portfolioCaseTitle}>{t('case_domus_title')}</h4>
              </div>
              <div className={styles.portfolioCaseContent}>
                <div className={styles.portfolioCaseRow}>
                  <span className={styles.portfolioCaseLabel}>{t('case_domus_role')}</span>
                  <span className={styles.portfolioCaseValue}>{t('case_domus_role_value')}</span>
                </div>
                <div className={styles.portfolioCaseRow}>
                  <span className={styles.portfolioCaseLabel}>{t('case_domus_period')}</span>
                  <span className={styles.portfolioCaseValue}>{t('case_domus_period_value')}</span>
                </div>
                <div className={styles.portfolioCaseRow}>
                  <span className={styles.portfolioCaseLabel}>{t('case_domus_focus')}</span>
                  <span className={styles.portfolioCaseValue}>{t('case_domus_focus_value')}</span>
                </div>
              </div>
            </div>

            {/* Marketplace content */}
            <div className={styles.portfolioCaseBlock}>
              <div className={styles.portfolioCaseHeader}>
                <div className={styles.portfolioCaseIconWrapper}>
                  <Image
                    src="/assets/img/logos/innotek-logo.png"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.portfolioCaseIconImage}
                  />
                </div>
                <h4 className={styles.portfolioCaseTitle}>{t('case_ecommerce_title')}</h4>
              </div>
              <div className={styles.portfolioCaseContent}>
                <div className={styles.portfolioCaseRow}>
                  <span className={styles.portfolioCaseLabel}>{t('case_ecommerce_processed')}</span>
                  <span className={styles.portfolioCaseValue}>{t('case_ecommerce_processed_count')}</span>
                </div>
                <div className={styles.portfolioCaseRow}>
                  <span className={styles.portfolioCaseLabel}>{t('case_ecommerce_type')}</span>
                  <span className={styles.portfolioCaseValue}>{t('case_ecommerce_type_value')}</span>
                </div>
                <div className={styles.portfolioCaseRow}>
                  <span className={styles.portfolioCaseLabel}>{t('case_ecommerce_specialization')}</span>
                  <span className={styles.portfolioCaseValue}>{t('case_ecommerce_specialization_value')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className={styles.portfolioSectionDivider}></div>
    </section>
  );
};

export default PortfolioSection;

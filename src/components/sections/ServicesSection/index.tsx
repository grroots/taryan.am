// src/components/sections/ServicesSection/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { 
  ShoppingCart, 
  Zap,
  Settings,
  Target,
  FileText,
  Pen,
  CheckCircle,
  ShoppingBag,
  Globe,
  Monitor,
  Package
} from 'lucide-react';
import { useServices } from '@/data/services';
import { cn } from '@/lib/utils';
import TermsModal from '@/components/ui/TermsModal';
import styles from './ServicesSection.module.css';

interface ServicesSectionProps {
  className?: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ className }) => {
  const t = useTranslations('services');
  const [isVisible, setIsVisible] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const services = useServices();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Список приоритетных услуг
  const priorityServices = ['copywriting', 'blog', 'products'];

  // Специализации
  const specializations = [
    { name: t('spec_wildberries'), icon: ShoppingCart },
    { name: t('spec_ozon'), icon: ShoppingBag },
    { name: t('spec_ebay'), icon: Globe },
    { name: t('spec_wordpress'), icon: Monitor },
    { name: t('spec_ecommerce'), icon: Package },
    { name: t('spec_cms'), icon: Settings }
  ];

  // Преимущества сотрудничества
  const cooperationBenefits = [
    {
      icon: CheckCircle,
      title: t('cooperation_benefits.discussion'),
      description: t('cooperation_benefits.discussion_desc')
    },
    {
      icon: Target,
      title: t('cooperation_benefits.individual'),
      description: t('cooperation_benefits.individual_desc')
    },
    {
      icon: FileText,
      title: t('cooperation_benefits.transparent'),
      description: t('cooperation_benefits.transparent_desc')
    }
  ];

  const handleServiceClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTermsClick = () => {
    setIsTermsModalOpen(true);
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="services" 
      className={cn(styles.servicesSection, "section-dark", "scrollReveal", className)}
    >
      <div className="container-section">
        {/* Section Header */}
        <div className={cn(
          styles.servicesHeader,
          isVisible ? styles.headerVisible : styles.headerHidden
        )}>
          <div className={styles.headerIcon}>
            <Settings className="w-8 h-8 text-warm" />
            <span className={styles.headerSubtitle}>
              {t('subtitle')}
            </span>
          </div>

          <h2 className={cn("section-title", styles.servicesTitle)}>
            {t('title')}
          </h2>
          
          <p className={styles.servicesDescription}>
            {t('description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className={styles.servicesGrid}>
          {services.map((service) => {
            const isPriority = priorityServices.includes(service.id);
            
            return (
              <div
                key={service.id}
                className={cn(
                  styles.serviceCardWrapper,
                  isVisible ? styles.cardVisible : styles.cardHidden
                )}
              >
                {/* Priority Badge */}
                {isPriority && (
                  <div className={styles.priorityBadge}>
                    <Pen className="w-4 h-4" />
                  </div>
                )}

                <div 
                  className={styles.serviceCard}
                  onClick={handleServiceClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleServiceClick();
                    }
                  }}
                >
                  {/* Service Icon */}
                  <div className={styles.serviceIconContainer}>
                    <div className={styles.serviceIcon}>
                      {service.icon}
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className={styles.serviceTitle}>
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className={styles.serviceDescription}>
                    {service.description}
                  </p>

                  {/* Features List */}
                  {service.features && service.features.length > 0 && (
                    <div className={styles.serviceFeatures}>
                      <ul className={styles.featuresList}>
                        {service.features.slice(0, 3).map((feature, featureIndex) => (
                          <li key={featureIndex} className={styles.featureItem}>
                            <div className={styles.featureDot} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Hover Effects */}
                  <div className={styles.hoverOverlay} />
                  <div className={styles.glowEffect} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Cooperation Section */}
        <div className={cn(
          styles.cooperationSection,
          isVisible ? styles.cooperationVisible : styles.cooperationHidden
        )}>
          <div className={styles.cooperationContainer}>
            <div className={styles.cooperationCard}>
              
              {/* Main Content */}
              <div className={styles.cooperationContent}>
                
                {/* Left Part - Benefits */}
                <div className={styles.cooperationLeft}>
                  <h3 className={styles.cooperationTitle}>
                    <Zap className="w-6 h-6 text-warm" />
                    {t('cooperation')}
                  </h3>
                  
                  <p className={styles.cooperationText}>
                    {t('cooperation_benefits.discussion_desc')}
                  </p>
                  
                  {/* Benefits List */}
                  <div className={styles.benefitsList}>
                    {cooperationBenefits.map((benefit, index) => {
                      const IconComponent = benefit.icon;
                      return (
                        <div key={index} className={styles.benefitItem}>
                          <IconComponent className={styles.benefitIcon} />
                          <div>
                            <h4 className={styles.benefitTitle}>{benefit.title}</h4>
                            <p className={styles.benefitDescription}>{benefit.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className={styles.verticalDivider}></div>
                
                {/* Right Part - Specializations */}
                <div className={styles.cooperationRight}>
                  <h4 className={styles.specializationsTitle}>{t('specializations_title')}</h4>
                  <div className={styles.specializationsGrid}>
                    {specializations.map((spec, index) => {
                      const IconComponent = spec.icon;
                      return (
                        <div key={index} className={styles.specializationItem}>
                          <IconComponent className="w-4 h-4" />
                          <span>{spec.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className={styles.horizontalDivider}></div>

              {/* CTA Buttons */}
              <div className={styles.ctaButtons}>
                <button
                  onClick={handleTermsClick}
                  className={styles.ctaPrimary}
                >
                  <FileText className="w-4 h-4" />
                  {t('cooperation_conditions')}
                </button>
                
                <button
                  onClick={handleContactClick}
                  className={styles.ctaSecondary}
                >
                  <Settings className="w-4 h-4" />
                  {t('contact_me')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        defaultTab="terms"
      />
    </section>
  );
};

export default ServicesSection;

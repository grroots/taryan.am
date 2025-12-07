// src/components/ui/PricingCard/index.tsx
'use client';

import { useState } from "react";
import { Check, Star, ChevronDown } from "lucide-react";
import { useTranslations } from 'next-intl';
import { cn } from "@/lib/utils";
import type { Package } from "@/types";
import Button from "@/components/ui/Button";
import styles from './PricingCard.module.css';

interface PricingCardProps {
  package: Package;
  className?: string;
  onSelect?: () => void;
  animated?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  package: pkg,
  className = "",
  onSelect,
  animated = true,
}) => {
  const t = useTranslations('pricing');
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  // Проверяем что пакет существует
  if (!pkg) {
    return null;
  }

  // Разделяем features на видимые и скрытые
  const visibleFeatures = pkg.features ? pkg.features.slice(0, 3) : [];
  const hiddenFeatures = pkg.features ? pkg.features.slice(3) : [];
  const hasHiddenFeatures = hiddenFeatures.length > 0;

  return (
    <div
      className={cn(
        styles.pricingCard,
        pkg.popular && styles.popularCard,
        animated && "hoverLift",
        className
      )}
    >
      {/* Popular Badge */}
      {pkg.popular && (
        <div className={styles.popularBadge}>
          <div className={styles.popularBadgeIcon}>
            <Star className={styles.starIcon} />
          </div>
        </div>
      )}

      {/* Package Header */}
      <div className={styles.cardHeader}>
        <h3 className={styles.packageName}>
          {pkg.name}
        </h3>
        
        <div className={styles.priceSection}>
          <div className={styles.price}>
            {pkg.price}
          </div>
          {pkg.period && (
            <div className={styles.period}>
              {pkg.period}
            </div>
          )}
        </div>
        
        {/* Annual Plan */}
        {pkg.annual && (
          <div className={styles.annualPlan}>
            {pkg.annual}
          </div>
        )}
        
        <p className={styles.description}>
          {pkg.description}
        </p>
      </div>

      {/* Features List */}
      <div className={styles.featuresSection}>
        <ul className={styles.featuresList}>
          {/* Видимые features (первые 3) */}
          {visibleFeatures.map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              <div className={styles.featureIconWrapper}>
                <Check className={styles.featureIcon} />
              </div>
              <span className={styles.featureText}>
                {feature}
              </span>
            </li>
          ))}
          
          {/* Скрытые features - показываем если раскрыто */}
          {hasHiddenFeatures && showAllFeatures && (
            <div className={cn(styles.hiddenFeatures, styles.expanded)}>
              {hiddenFeatures.map((feature, index) => (
                <li key={index + 3} className={styles.featureItem}>
                  <div className={styles.featureIconWrapper}>
                    <Check className={styles.featureIcon} />
                  </div>
                  <span className={styles.featureText}>
                    {feature}
                  </span>
                </li>
              ))}
            </div>
          )}
          
          {/* Show More/Less кнопка - всегда в конце */}
          {hasHiddenFeatures && (
            <li 
              className={cn(styles.featureItem, styles.showMoreFeature)}
              onClick={() => setShowAllFeatures(!showAllFeatures)}
            >
              <div className={styles.featureIconWrapper}>
                <ChevronDown className={styles.featureIcon} />
              </div>
              <span className={styles.featureText}>
                {showAllFeatures ? t('show_less') : t('show_more')}
              </span>
            </li>
          )}
        </ul>
      </div>

      {/* Action Button */}
      <div className={styles.cardFooter}>
        <Button
          variant={pkg.popular ? "primary" : "outline"}
          size="lg"
          fullWidth
          onClick={onSelect}
          className={cn(
            styles.actionButton,
            pkg.popular && styles.popularButton,
            animated && "hoverLift"
          )}
        >
          {pkg.buttonText || t('packages.select_package')}
        </Button>
      </div>

      {/* Background Effects */}
      <div className={styles.cardDecoration} />
      
      {/* Glow Effect for Popular */}
      {pkg.popular && (
        <div className={styles.popularGlow} />
      )}
    </div>
  );
};

export default PricingCard;
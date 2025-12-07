// src/components/ui/LanguageSelector.tsx
'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { cn } from '@/lib/utils';

interface LanguageConfig {
  code: string;
  name: string;
}

const languageConfigs: LanguageConfig[] = [
  { code: 'hy', name: 'ՀԱՅ' },
  { code: 'ru', name: 'РУС' },
  { code: 'en', name: 'EN' }
];

interface LanguageSelectorProps {
  className?: string;
  variant?: 'default' | 'compact' | 'desktop' | 'mobile';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className = '', 
  variant = 'default'
}) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { trackButtonClick } = useAnalytics();
  
  // Получаем доступные языки (исключая текущий)
  const availableLanguages = languageConfigs.filter(lang => lang.code !== locale);

  // Изменить язык
  const handleChangeLanguage = (newLocale: string) => {
    if (locale !== newLocale) {
      trackButtonClick(`language_change_${newLocale}`, 'language_selector');
      router.replace(pathname, { locale: newLocale });
    }
  };

  // Базовые стили в зависимости от варианта
  const getVariantStyles = () => {
    switch (variant) {
      case 'mobile':
        return {
          container: "flex items-center justify-center w-full",
          button: "px-4 py-3 text-base font-medium text-white hover:text-blue-400 transition-colors"
        };
      case 'desktop':
        return {
          container: "inline-flex items-center",
          button: "px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary transition-all duration-300 hover:bg-white/10 rounded-lg"
        };
      case 'compact':
        return {
          container: "inline-flex items-center",
          button: "px-2 py-1 text-sm font-medium text-text-secondary hover:text-primary transition-all duration-300 hover:bg-white/10 rounded-lg"
        };
      default:
        return {
          container: "inline-flex items-center",
          button: "px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary transition-all duration-300 hover:bg-white/10 rounded-lg"
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={cn(styles.container, className)}>
      {availableLanguages.map((lang, index) => (
        <React.Fragment key={lang.code}>
          {index > 0 && variant !== 'mobile' && (
            <span className="mx-2 text-text-secondary/50">|</span>
          )}
          {index > 0 && variant === 'mobile' && (
            <span className="mx-3 text-white/30">•</span>
          )}
          <button
            onClick={() => handleChangeLanguage(lang.code)}
            className={styles.button}
            type="button"
          >
            {lang.name}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default LanguageSelector;
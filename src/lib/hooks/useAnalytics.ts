// src/lib/hooks/useAnalytics.ts
import { useCallback } from 'react';
import { analyticsConfig } from '@/lib/analytics';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const useAnalytics = () => {
  const trackEvent = useCallback((eventData: AnalyticsEvent) => {
    // Отправляем только в production
    if (process.env.NODE_ENV !== 'production') return;

    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventData.action, {
        event_category: eventData.category,
        event_label: eventData.label,
        value: eventData.value,
      });
    }

    // Yandex.Metrika
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(analyticsConfig.yandexMetrikaId, 'reachGoal', eventData.action, {
        category: eventData.category,
        label: eventData.label,
        value: eventData.value,
      });
    }
  }, []);

  // Отслеживание клика по кнопке
  const trackButtonClick = useCallback((buttonName: string, section?: string) => {
    trackEvent({
      action: 'button_click',
      category: 'engagement',
      label: `${section ? `${section}_` : ''}${buttonName}`,
    });
  }, [trackEvent]);

  // Отслеживание отправки формы
  const trackFormSubmit = useCallback((formName: string, success: boolean = true) => {
    trackEvent({
      action: success ? 'form_submit_success' : 'form_submit_error',
      category: 'form',
      label: formName,
    });
  }, [trackEvent]);

  // Отслеживание просмотра секции
  const trackSectionView = useCallback((sectionName: string) => {
    trackEvent({
      action: 'section_view',
      category: 'navigation',
      label: sectionName,
    });
  }, [trackEvent]);

  // Отслеживание скролла до секции (для Header)
  const trackSectionScroll = useCallback((sectionName: string) => {
    trackEvent({
      action: 'section_scroll',
      category: 'navigation',
      label: sectionName,
    });
  }, [trackEvent]);

  // Отслеживание кликов по соцсетям (для HeroSection)
  const trackSocialClick = useCallback((platform: string, section?: string) => {
    trackEvent({
      action: 'social_click',
      category: 'engagement',
      label: `${section ? `${section}_` : ''}${platform}`,
    });
  }, [trackEvent]);

  // Отслеживание выбора пакета (для PricingSection)
  const trackPackageSelect = useCallback((packageName: string) => {
    trackEvent({
      action: 'package_select',
      category: 'conversion',
      label: packageName,
    });
  }, [trackEvent]);

  // Отслеживание загрузки файла/документа
  const trackDownload = useCallback((fileName: string, fileType?: string) => {
    trackEvent({
      action: 'file_download',
      category: 'downloads',
      label: `${fileName}${fileType ? `_${fileType}` : ''}`,
    });
  }, [trackEvent]);

  // Отслеживание клика по внешней ссылке
  const trackExternalLink = useCallback((url: string, linkText?: string) => {
    trackEvent({
      action: 'external_link_click',
      category: 'engagement',
      label: linkText || url,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackButtonClick,
    trackFormSubmit,
    trackSectionView,
    trackDownload,
    trackExternalLink,
    trackSectionScroll,
    trackSocialClick,
    trackPackageSelect,
  };
};

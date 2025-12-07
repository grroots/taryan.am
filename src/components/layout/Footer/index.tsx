// src/components/layout/Footer/index.tsx
'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import styles from './Footer.module.css';

interface FooterProps {
  locale: string;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ locale, className }) => {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();
  
  const getBrandHref = () => {
    if (locale === 'hy') return '/';
    if (locale === 'ru') return '/ru';
    if (locale === 'en') return '/en';
    return '/';
  };

  return (
    <footer className={cn(styles.footer, className)}>
      <div className={styles.footerContainer}>
        <div className={styles.footerBottom}>
          {/* Copyright */}
          <div className={styles.copyright}>
            <p>
              © {currentYear} {t('copyright')} | 
              <Link 
                href={getBrandHref()} 
                className={styles.brandLink}
              >
                {t('brandname')}
              </Link>
            </p>
          </div>

          {/* Text */}
          <div className={styles.footerText}>
            <p>{t('text')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
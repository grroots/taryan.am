// src/components/layout/Header/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronRight,
  BriefcaseBusiness,
  LayoutList,
  NotebookTabs
} from 'lucide-react';
import LanguageSelector from '@/components/ui/LanguageSelector';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import styles from './Header.module.css';

interface HeaderProps {
  locale: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ locale, className }) => {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const params = useParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Получаем текущий locale из URL или props
  const currentLocale = locale || (params?.locale as string) || pathname.split('/')[1] || 'hy';

  // Безопасное получение переводов
  const getSafeTranslation = (key: string, fallback: string = '') => {
    try {
      return t(key);
    } catch {
      console.warn(`Translation missing for key: navigation.${key}`);
      return fallback || key;
    }
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      
      setIsScrolled(scrollTop > 20);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Navigation items
  const navItems = [
    { 
      key: 'services', 
      href: `/${currentLocale}#services`, 
      icon: BriefcaseBusiness,
      label: getSafeTranslation('services', 'Services') 
    },
    { 
      key: 'pricing', 
      href: `/${currentLocale}#pricing`, 
      icon: LayoutList,
      label: getSafeTranslation('pricing', 'Pricing') 
    },
    { 
      key: 'contact', 
      href: `/${currentLocale}#contact`, 
      icon: NotebookTabs,
      label: getSafeTranslation('contact', 'Contact') 
    },
  ];

  const isActiveLink = (href: string) => {
    const hrefPath = href.split('#')[0];
    const currentPath = pathname.split('#')[0];
    
    if (hrefPath === `/${currentLocale}`) {
      return currentPath === `/${currentLocale}` || currentPath === '/' || currentPath === `/${currentLocale}/`;
    }
    
    return currentPath === hrefPath;
  };

  const handleMobileToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleBackdropClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={cn(
          styles.header,
          isScrolled && styles.headerScrolled,
          className
        )}
      >
        <div className={styles.headerContainer}>
          {/* Logo */}
          <Link 
            href={`/${currentLocale}`}
            className={styles.logo}
            onClick={handleLinkClick}
          >
            <svg
              className={styles.logoIcon}
              viewBox="0 0 204.3 100"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Taryan logo"
            >
              <path fill="currentColor" d="M5.2,78.6c.7-1.7,1.6-3.1,3.7-3.1,2.5,0,4.1,1.9,3.6,4.4-.3,1.7.6,2.8,1.9,3.6,3.8,2.3,7.9,2.5,12.2,1.4,7.4-1.9,12.1-7,15.7-13.3,3.7-6.6,6-13.7,8.1-21,1.5-5.1,2.7-10.2,4.4-15.2,1.9-5.6,4.2-11,8.5-15.2.7-.7,1.6-1.3,2.2-1.8-1.4,4-3.1,7.9-4.3,12-1.9,6.7-3.2,13.6-5.1,20.3-2.7,9.4-6.2,18.5-13,25.8-6.1,6.6-13.6,10.5-22.7,10.5-1.8,0-3.6,0-5.4-.3-4.5-.7-8.3-2.5-9.9-7.3v-.6Z"/>
              <path fill="currentColor" d="M107.1,4.9c-2.8,6.3-8.3,9.1-14.5,10.8-7.8,2.2-15.7,2.2-23.7,1.5-8.3-.7-16.6-1.5-24.9-.6-6.2.7-12.2,2-17.1,6.2-3.7,3.2-5.6,7.4-4.9,12.3.7,4.3,3.3,7.1,7.5,8.1,4.2,1,7.8-.3,10.7-3.4,2.5-2.7,2.9-6,2.3-9.5,1.7.3,2.8,1.7,3,3.6.4,3.6-1.1,6.4-4,8.5-4.7,3.5-9.9,4.3-15.4,2.1-6.2-2.5-8.3-9.9-4.9-16.2,3-5.4,7.8-8.7,13.3-11.1,5.1-2.2,10.6-3.6,16.2-3.9,6.8-.3,13.6-.5,20.4-.6,5.1,0,10.2.4,15.3.2,5.3-.2,10.5-.9,15.2-3.5,2.3-1.3,4.5-2.8,4.5-5.8,1.3-.3.9.6,1,1.3Z"/>
              <path fill="currentColor" d="M77.4,75.4c-1.3-.5-1.9-1.4-1.9-2.8s0-.5,0-.9c0-.3,0-.4,0-.4s-.3.1-.6.4c0,0-.2.2-.5.4s-.5.4-.6.5c-.1.1-.4.3-.7.5-.3.2-.6.4-.8.5-.2.1-.5.3-.8.5-.3.2-.6.3-.9.4-.3,0-.5.2-.8.2-.3,0-.6,0-.9,0-.9,0-1.6-.3-2.2-.9-.7-.6-1-1.4-1-2.4s.2-1.5.5-2.3c.2-.5.5-1,.9-1.7.4-.7.6-1,.7-1,0,0,.2-.1.3-.3,0-.2.2-.3.3-.4,1-1.1,2-1.8,2.8-2.3.8-.4,1.4-.5,2-.4.9.1,1.7.5,2.4,1.1.7.6,1.1,1.4,1.1,2.2,0,.3,0,.6-.2.6-.1,0-.4,0-.7,0-.2-.1-.5-.4-.8-1-.3-.6-.5-.9-.6-1-.2-.2-.5-.2-.8-.2-1,0-2.1.7-3.3,2.1-1.8,2.2-2.7,4-2.7,5.4s0,.7.1.8c0,.1.3.2.6.2,1.1,0,2.7-.8,4.7-2.4,2-1.6,3.4-2.9,4.4-4.1.3-.2.5-.3.7-.2s.4.2.7.4c.3.2.5.3.7.3.3,0,.7.2,1,.7.3.4.2.7-.3.7-.4,0-.9.5-1.4,1.4-.6.9-.9,1.7-1,2.3,0,.1,0,.3,0,.6,0,.5.2.8.5.8s.8-.2,1.6-.5c1.1-.5,2.1-1.2,3-1.8.9-.7,2.2-1.8,4-3.4,1.8-1.6,2.8-2.4,3.2-2.4s.4.1.6.4c.2.3.3.5.3.6s-.1.3-.4.5c-.3.2-.7.6-1.1,1.1-1.4,1.5-3.2,3.1-5.3,4.7-2.1,1.6-3.9,2.4-5.3,2.4s-.7,0-.9-.1Z"/>
              <path fill="currentColor" d="M97.5,74.1c0-.9.9-3.5,2.8-7.8.8-1.7,1.2-2.8,1.4-3.2.2-.4.4-.6.6-.6h0c.3,0,.5.1.7.3.2.2.3.4.3.5s0,.4-.2.8c-.2.7-.3,1.1-.4,1.2.1,0,.6-.3,1.4-1,1.6-1.4,2.9-2,4-2s.9.2,1.2.5c.3.3.5.9.5,1.9,0,1.4-.2,2.6-.6,3.5,0,.1,0,.2,0,.2s0,0,.2.1h.2c.3,0,.6,0,1.2-.3.5-.2,1.1-.5,1.8-.8.7-.3,1.2-.6,1.6-.7h.1c.1,0,.2,0,.3.3s.1.3.1.4v.4c0,0,0,.1,0,.2,0,0,0,0,0,.1,0,0,0,0-.1,0,0,0-.1,0-.2,0,0,0-.1,0-.2.1-.1,0-.2.1-.3.1-2.1,1.1-3.8,1.6-5.1,1.6s-.8,0-1.1-.2c-.2-.1-.3-.4-.3-.7s.2-1.2.5-2.1c.4-1.6.5-2.6.5-2.8h0c-.4,0-1.3.5-2.7,1.7-1.7,1.4-2.8,2.5-3.3,3.4-.2.3-.3.4-.5.4s-.4,0-.6-.1l-.7,1.8c-.7,1.7-1.2,2.8-1.3,3.4,0,.4-.2.6-.5.6s-.5-.1-.8-.4c-.2-.3-.4-.5-.4-.8Z"/>
              <path fill="currentColor" d="M138.1,61.6c-.3.4-.7,1.2-1.3,2.5-2.3,5.4-4.3,9.4-5.7,12.2-.9,1.7-1.4,2.6-1.4,2.6,0,.1,1.6.2,4.9.2,5.6,0,10.3.2,13.8.7.9.1,1.6.3,2,.5.4.2.5.4.5.8h0c0,.2,0,.3-.1.3s-.3,0-.7,0c-1.5-.2-3.7-.4-6.8-.6-3.1-.2-5.6-.3-7.6-.3h-.8c-4.4.1-6.6.4-6.7,1,0,.2-.6,1-1.8,2.6-1.1,1.5-1.7,2.3-1.9,2.3,0,0-.1.1-.2.3,0,.2-.1.2-.2.3,0,0-.2.2-.5.4-.2.3-.5.5-.7.8-.2.3-.4.4-.4.5-3.1,3.1-5.7,5-7.7,5.9-.7.3-1.5.5-2.5.5s-.6,0-.8-.1c-.8-.3-1.5-.8-2-1.5-.5-.7-.8-1.4-.8-2.3v-.2c0-.9.5-1.9,1.3-3s1.9-2.1,3.2-3c1.6-1.1,3.2-2,4.8-2.7,2.1-.9,4.4-1.7,6.8-2.2l2.2-.5.7-1.2c1.1-1.8,2.2-4,3.4-6.5l-1.8,1.7s0,0-.1,0c0,.2-.5.6-1.5,1.2-.9.6-1.6,1-1.9,1.1-.3.1-.6.2-.9.2-.7,0-1.3-.2-1.7-.7-.4-.5-.6-1.1-.6-1.9h0c0-1.1.7-3,2-5.7,1.3-2.7,2.4-4.4,3.1-5.1.5-.5.9-.7,1.3-.7.3,0,.5.2.8.5.2.3.3.6.3.9s-.1.5-.4.5c-.5,0-1.5,1.6-3,4.7-1.5,3.1-2.3,5-2.3,5.8s0,.2,0,.2c0,0,0,0,.1,0,.3,0,.9-.3,1.8-1,.9-.7,1.8-1.4,2.7-2.3,2.3-2.2,4-4.1,4.9-5.6.2-.4.5-1.1.9-2.1.6-1.3,1-2.2,1.3-2.7.3-.5.6-.7.9-.7.4,0,.7.2,1,.5.2.4.2.7,0,1ZM125.8,81.5l-.9.2c-2.7.7-5.1,1.7-7.4,2.8-2.3,1.2-4.1,2.5-5.4,3.9-.4.5-.8,1-1.2,1.7-.3.6-.5,1.2-.5,1.7,0,1.2.5,1.8,1.5,1.8s.6,0,1-.2c1-.3,2.4-1.1,4.1-2.4,1.7-1.3,3-2.5,4-3.6.3-.4.5-.6.5-.6.2-.2.9-.9,2-2.4,1.1-1.4,1.8-2.4,2.1-2.9Z"/>
              <path fill="currentColor" d="M161.3,75.4c-1.3-.5-1.9-1.4-1.9-2.8s0-.5,0-.9c0-.3,0-.4,0-.4s-.3.1-.6.4c0,0-.2.2-.5.4s-.5.4-.6.5c-.1.1-.4.3-.7.5-.3.2-.6.4-.8.5-.2.1-.5.3-.8.5-.3.2-.6.3-.9.4-.3,0-.5.2-.8.2-.3,0-.6,0-.9,0-.9,0-1.6-.3-2.2-.9-.7-.6-1-1.4-1-2.4s.2-1.5.5-2.3c.2-.5.5-1,.9-1.7.4-.7.6-1,.7-1,0,0,.2-.1.3-.3,0-.2.2-.3.3-.4,1-1.1,2-1.8,2.8-2.3.8-.4,1.4-.5,2-.4.9.1,1.7.5,2.4,1.1.7.6,1.1,1.4,1.1,2.2,0,.3,0,.6-.2.6-.1,0-.4,0-.7,0-.2-.1-.5-.4-.8-1-.3-.6-.5-.9-.6-1-.2-.2-.5-.2-.8-.2-1,0-2.1.7-3.3,2.1-1.8,2.2-2.7,4-2.7,5.4s0,.7.1.8c0,.1.3.2.6.2,1.1,0,2.7-.8,4.7-2.4,2-1.6,3.4-2.9,4.4-4.1.3-.2.5-.3.7-.2s.4.2.7.4c.3.2.5.3.7.3.3,0,.7.2,1,.7.3.4.2.7-.3.7-.4,0-.9.5-1.4,1.4-.6.9-.9,1.7-1,2.3,0,.1,0,.3,0,.6,0,.5.2.8.5.8s.8-.2,1.6-.5c1.1-.5,2.1-1.2,3-1.8.9-.7,2.2-1.8,4-3.4,1.8-1.6,2.8-2.4,3.2-2.4s.4.1.6.4c.2.3.3.5.3.6s-.1.3-.4.5c-.3.2-.7.6-1.1,1.1-1.4,1.5-3.2,3.1-5.3,4.7-2.1,1.6-3.9,2.4-5.3,2.4s-.7,0-.9-.1Z"/>
              <path fill="currentColor" d="M186.8,61.8c.2-.2.5-.3.7-.3s.4,0,.8.2c.4.1.6.2.7.2-1.4,2.8-2.2,4.3-2.3,4.4,0,0,0,0,0,.1.2,0,.7-.3,1.6-.9,2.1-1.4,3.7-2.1,4.6-2.1s.9.2,1.2.5c.4.4.5.9.5,1.4,0,.7-.5,2.2-1.5,4.5-.7,1.6-1.1,2.4-1.1,2.5h0s.4-.2,1.1-.7s1.5-1,2.3-1.5s1.5-.9,1.8-1.1c.1,0,.5-.3,1-.7s.8-.6.8-.6c0,0,.1-.1.2-.1.4,0,.8.2,1,.6l.4.5-2.5,1.8c-2.5,1.7-4.2,2.8-4.9,3.3-.8.5-1.3.7-1.7.8h-.2c-.4,0-.8-.2-1.1-.5-.3-.3-.4-.7-.4-1.2s0-.3,0-.5c0,0,.5-1.1,1.3-3.2.8-2.1,1.3-3.3,1.3-3.7s0-.1,0-.1c-.3,0-1,.4-2.3,1.2-2.7,1.8-4.4,3-5.1,3.4-.3.2-.5.4-.7.8-.5,1-1.2,2.5-2.1,4.5-.1.2-.4.4-.7.4s-.5,0-.8-.2c-.3-.1-.4-.2-.4-.4h0c.7-2.2,2.8-6.6,6.2-13.2Z"/>
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.key} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={cn(
                      styles.navLink,
                      isActiveLink(item.href) && styles.navLinkActive
                    )}
                    onClick={handleLinkClick}
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className={styles.actions}>
            {/* Desktop Language Switcher */}
            <div className={styles.desktopLangSwitcher}>
              <LanguageSelector variant="desktop" />
            </div>

            {/* Desktop CTA Button */}
            <div className={styles.desktopCta}>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  window.location.href = `/${currentLocale}#contact`;
                  handleLinkClick();
                }}
              >
                {getSafeTranslation('collaboration', 'Collaboration')}
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={handleMobileToggle}
              className={cn(
                styles.mobileToggle,
                isMobileMenuOpen && styles.mobileToggleActive
              )}
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={styles.mobileToggleBar}></span>
              <span className={styles.mobileToggleBar}></span>
              <span className={styles.mobileToggleBar}></span>
            </button>
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <div 
          className={styles.scrollIndicator}
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
          aria-hidden="true"
        />
      </header>

      {/* Mobile Menu Backdrop */}
      <div 
        className={cn(
          styles.mobileBackdrop,
          isMobileMenuOpen && styles.mobileBackdropOpen
        )}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div 
        className={cn(
          styles.mobileMenu,
          isMobileMenuOpen && styles.mobileMenuOpen
        )}
      >
        <div className={styles.mobileMenuContainer}>
          
          {/* Mobile Language Selector */}
          <div className={styles.mobileLangSwitcher}>
            <LanguageSelector variant="mobile" />
          </div>

          {/* Mobile Navigation */}
          <nav className={styles.mobileNav}>
            <ul className={styles.mobileNavList}>
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.key} className={styles.mobileNavItem}>
                    <Link
                      href={item.href}
                      className={cn(
                        styles.mobileNavLink,
                        isActiveLink(item.href) && styles.mobileNavLinkActive
                      )}
                      onClick={handleLinkClick}
                    >
                      <div className={styles.mobileNavLinkContent}>
                        <IconComponent className={styles.mobileNavIcon} />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile CTA Button */}
          <div className={styles.mobileCta}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => {
                window.location.href = `/${currentLocale}#contact`;
                handleLinkClick();
              }}
            >
              {getSafeTranslation('collaboration', 'Collaboration')}
            </Button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Header;

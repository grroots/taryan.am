// src/types/index.ts
import { ReactNode } from "react";

// === CSS MODULES ТИПИЗАЦИЯ === 
export interface CSSModuleClasses {
  readonly [key: string]: string;
}

export interface ComponentWithStyles {
  className?: string;
  styles?: CSSModuleClasses;
}

// Form types
export interface FormData {
  name: string;
  email: string;
  subject: string;
  service: string;
  message: string;
  honeypot: string;
}

// Service types
export interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
}

// Portfolio types
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url?: string;
  github?: string;
  category: "web" | "mobile" | "design" | "other";
}

// Pricing types
export interface Package {
  id: string;
  name: string;
  title: string;
  price: string;
  annual?: string;
  period?: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
  maxVisibleFeatures?: number;
}

export interface PricingCardProps extends ComponentWithStyles {
  package: Package;
  onSelect?: () => void;
  animated?: boolean;
  maxVisibleFeatures?: number;
}

// Skills types
export interface Skill {
  id: string;
  name: string;
  icon: ReactNode;
  color: string;
  level?: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

// Navigation types
export interface NavigationItem {
  key: string;
  label: string;
  href?: string;
}

// Contact types
export interface ContactInfo {
  id: string;
  type: "email" | "phone" | "location" | "social";
  label: string;
  value: string;
  icon: React.ReactNode;
  url?: string;
}

// Section types
export interface SectionProps {
  className?: string;
}

export interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light";
  minHeight?: boolean;
  spacing?: "default" | "compact" | "large";
}

// Component prop types с поддержкой CSS Modules
export interface CardProps extends ComponentWithStyles {
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: "default" | "hover" | "interactive";
}

export interface ButtonProps extends ComponentWithStyles {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent" | "warm" | "success" | "warning" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  'aria-label'?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

// Header/Navigation prop types с поддержкой CSS Modules
export interface HeaderProps extends ComponentWithStyles {
  scrollToSection: (sectionId: string) => void;
  scrollToHero: () => void;
}

export interface NavigationProps extends ComponentWithStyles {
  scrollToSection: (sectionId: string) => void;
  scrollToHero: () => void;
  isMobile?: boolean;
  onItemClick?: () => void;
}

// Footer prop types
export interface FooterProps extends ComponentWithStyles {
  // Дополнительные пропы для Footer если нужны
}

// CSS Modules component props
export interface ModuleComponentProps extends ComponentWithStyles {
  children?: React.ReactNode;
  variant?: string;
  size?: string;
  disabled?: boolean;
}

// Hook types
export interface UseScrollToSectionReturn {
  scrollToSection: (sectionId: string) => void;
  scrollToHero: () => void;
}

// Form validation types
export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  service?: string;
  message?: string;
  general?: string;
}

export interface FormStatus {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}

// Animation types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
}

export interface StaggeredAnimationConfig extends AnimationConfig {
  staggerDelay?: number;
  startDelay?: number;
}

// CSS Animation types
export interface CSSAnimationClasses {
  enter: string;
  enterActive: string;
  exit: string;
  exitActive: string;
}

// Theme types
export interface ThemeColors {
  primary: string;
  primaryHover: string;
  secondary: string;
  background: string;
  text: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  animations: {
    duration: {
      fast: string;
      base: string;
      slow: string;
    };
    easing: {
      inOut: string;
      out: string;
      in: string;
    };
  };
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Analytics types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  locale?: string;
}

export interface GoogleAnalyticsConfig {
  trackingId: string;
  enabled: boolean;
}

export interface YandexMetrikaConfig {
  counterId: number;
  enabled: boolean;
}

export interface AnalyticsConfig {
  googleAnalytics: GoogleAnalyticsConfig;
  yandexMetrika: YandexMetrikaConfig;
}

// Intersection Observer types
export interface IntersectionObserverConfig {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export interface VisibilityState {
  isVisible: boolean;
  hasBeenVisible: boolean;
  entry?: IntersectionObserverEntry;
}

// Scroll types
export interface ScrollPosition {
  x: number;
  y: number;
}

export interface ScrollDirection {
  horizontal: 'left' | 'right' | 'none';
  vertical: 'up' | 'down' | 'none';
}

// Utility types
export type SectionId = 
  | "hero"
  | "about" 
  | "skills"
  | "services"
  | "portfolio"
  | "pricing"
  | "contact";

export type ComponentVariant = 
  | "primary" 
  | "secondary" 
  | "outline" 
  | "ghost" 
  | "accent" 
  | "warm"
  | "success"
  | "warning" 
  | "danger";

export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SectionVariant = "dark" | "light";

// CSS Module utility types
export type CSSModuleClassName = string | undefined | null | false;
export type CSSModuleClassNames = CSSModuleClassName | CSSModuleClassName[];

// Next.js specific types
export interface LocaleParams {
  locale: string;
}

export interface PageProps {
  params: LocaleParams;
}

// Locale types
export type Locale = 'hy' | 'ru' | 'en';

// Responsive types
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ResponsiveValue<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

// Performance types
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime?: number;
}

// Error types
export interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  errorBoundary?: string;
}

// SEO types
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
  locale: Locale;
}

// Window types for analytics and global functions
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    ym?: (id: number, method: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}

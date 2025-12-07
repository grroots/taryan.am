import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Утилита для объединения классов Tailwind CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Утилиты для валидации форм
export const validation = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },
  
  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },
  
  required: (value: string): boolean => {
    return value.trim().length > 0;
  },
  
  noHtml: (value: string): boolean => {
    return !/<[^>]*>/g.test(value);
  }
};

// Утилиты для форматирования
export const format = {
  // Очистка строки от HTML тегов и опасных символов
  sanitize: (str: string): string => {
    return str
      .replace(/<[^>]*>/g, '')
      .replace(/[<>"'&]/g, '')
      .trim();
  },
  
  // Форматирование телефонного номера
  phone: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('374')) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
    }
    return phone;
  },
  
  // Обрезка текста с многоточием
  truncate: (text: string, length: number): string => {
    if (text.length <= length) return text;
    return text.slice(0, length).trim() + '...';
  },
  
  // Форматирование цены
  price: (amount: number, currency: string = 'AMD'): string => {
    return new Intl.NumberFormat('hy-AM', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  }
};

// Утилиты для работы с URL и навигацией
export const navigation = {
  // Проверка активной ссылки
  isActiveLink: (pathname: string, href: string): boolean => {
    if (href === '/') {
      return pathname === '/' || pathname === '/hy' || pathname === '/ru' || pathname === '/en';
    }
    return pathname.includes(href);
  },
  
  // Создание ссылки с локалью
  createLocalizedPath: (path: string, locale: string): string => {
    if (locale === 'hy') {
      return path === '/' ? '/' : path;
    }
    return `/${locale}${path === '/' ? '' : path}`;
  },
  
  // Скролл к элементу
  scrollToElement: (elementId: string, offset: number = 80): void => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
};

// Утилиты для работы с localStorage
export const storage = {
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// Утилиты для работы с анимациями и задержками
export const animation = {
  // Задержка выполнения
  delay: (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  
  // Плавная анимация появления элемента
  fadeIn: (element: HTMLElement, duration: number = 300): void => {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start: number;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / duration;
      
      element.style.opacity = Math.min(progress, 1).toString();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
};

// Утилиты для работы с формами
export const forms = {
  // Получение данных формы как объект
  getFormData: (form: HTMLFormElement): Record<string, any> => {
    const formData = new FormData(form);
    const data: Record<string, any> = {};
    
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    return data;
  },
  
  // Валидация всей формы
  validateForm: (data: Record<string, string>, rules: Record<string, any>): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    Object.keys(rules).forEach(field => {
      const value = data[field] || '';
      const fieldRules = rules[field];
      
      if (fieldRules.required && !validation.required(value)) {
        errors[field] = 'Это поле обязательно';
        return;
      }
      
      if (fieldRules.email && value && !validation.email(value)) {
        errors[field] = 'Введите корректный email';
        return;
      }
      
      if (fieldRules.minLength && value && !validation.minLength(value, fieldRules.minLength)) {
        errors[field] = `Минимум ${fieldRules.minLength} символов`;
        return;
      }
      
      if (fieldRules.maxLength && value && !validation.maxLength(value, fieldRules.maxLength)) {
        errors[field] = `Максимум ${fieldRules.maxLength} символов`;
        return;
      }
    });
    
    return errors;
  }
};

// Утилиты для работы с устройствами
export const device = {
  // Проверка мобильного устройства
  isMobile: (): boolean => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  },
  
  // Проверка планшета
  isTablet: (): boolean => {
    return typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
  },
  
  // Проверка десктопа
  isDesktop: (): boolean => {
    return typeof window !== 'undefined' && window.innerWidth >= 1024;
  }
};

// Утилиты для работы с датами
export const date = {
  // Форматирование даты для армянской локали
  formatDate: (date: Date, locale: string = 'hy-AM'): string => {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  },
  
  // Получение относительного времени
  getRelativeTime: (date: Date, locale: string = 'hy-AM'): string => {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    const diff = date.getTime() - Date.now();
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    
    if (Math.abs(days) < 1) {
      const hours = Math.round(diff / (1000 * 60 * 60));
      if (Math.abs(hours) < 1) {
        const minutes = Math.round(diff / (1000 * 60));
        return rtf.format(minutes, 'minute');
      }
      return rtf.format(hours, 'hour');
    }
    
    return rtf.format(days, 'day');
  }
};

// Утилиты для дебаг режима
export const debug = {
  // Логирование только в development режиме
  log: (...args: any[]): void => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[DEBUG]', ...args);
    }
  },
  
  // Измерение времени выполнения
  time: (label: string): void => {
    if (process.env.NODE_ENV === 'development') {
      console.time(label);
    }
  },
  
  timeEnd: (label: string): void => {
    if (process.env.NODE_ENV === 'development') {
      console.timeEnd(label);
    }
  }
};
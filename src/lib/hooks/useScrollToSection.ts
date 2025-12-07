// src/lib/hooks/useScrollToSection.ts
import { useCallback } from "react";

export interface UseScrollToSectionReturn {
  scrollToSection: (sectionId: string) => void;
  scrollToHero: () => void;
}

export const useScrollToSection = (): UseScrollToSectionReturn => {
  const scrollToSection = useCallback((sectionId: string) => {
    // Проверяем что мы в браузере
    if (typeof window === 'undefined') return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  const scrollToHero = useCallback(() => {
    // Проверяем что мы в браузере
    if (typeof window === 'undefined') return;
    
    const element = document.getElementById("hero");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // Fallback to top of page
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  return {
    scrollToSection,
    scrollToHero,
  };
};
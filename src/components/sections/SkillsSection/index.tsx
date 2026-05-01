'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { 
  Bot,
  Boxes,
  BrainCircuit,
  ChartNoAxesCombined,
  ClipboardList,
  Users,
  FileText,
  Network,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSkills } from '@/data/skills';
import Button from '@/components/ui/Button';
import styles from './SkillsSection.module.css';

interface SkillsSectionProps {
  className?: string;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ className }) => {
  const t = useTranslations('skills');
  const locale = useLocale();
  const skills = useSkills();
  
  const [activeCategory, setActiveCategory] = useState<string>('web-tech');
  const [visibleSkills, setVisibleSkills] = useState<Set<string>>(new Set());
  const skillsRef = useRef<HTMLDivElement>(null);

  // Категории с иконками
  const categoriesConfig = [
    { id: 'web-tech', icon: Boxes },
    { id: 'creative', icon: Network },
    { id: 'writing', icon: FileText },
    { id: 'analytics', icon: ChartNoAxesCombined },
    { id: 'ai', icon: BrainCircuit }
  ];

  // Форматы менторства (только для армянского)
  const mentorshipFormats = [
    {
      icon: ClipboardList,
      formatKey: 'video_calls',
      descriptionKey: 'video_calls_desc',
    },
    {
      icon: ShieldCheck,
      formatKey: 'courses',
      descriptionKey: 'courses_desc',
    },
    {
      icon: Bot,
      formatKey: 'yearly_mentorship',
      descriptionKey: 'yearly_mentorship_desc',
    },
  ];

  // Проверка языка для отображения менторства
  const shouldShowMentorship = locale === 'hy';

  // Фильтрация навыков по категории
  const activeSkills = skills.find(category => category.id === activeCategory)?.skills || [];

  // Intersection Observer для анимаций
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillId = entry.target.getAttribute('data-skill-id');
            if (skillId) {
              setVisibleSkills(prev => new Set([...prev, skillId]));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const skillElements = skillsRef.current?.querySelectorAll('[data-skill-id]');
    skillElements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [activeSkills]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setVisibleSkills(new Set()); // Сброс анимаций
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // Предзаполнение формы для менторства (только для армянского)
      if (shouldShowMentorship) {
        const url = new URL(window.location.href);
        url.searchParams.set('subject', 'mentorship');
        window.history.replaceState({}, '', url.toString());
        
        window.dispatchEvent(new CustomEvent('presetContactForm', {
          detail: { subject: 'mentorship' }
        }));
      }
    }
  };

  return (
    <section 
      id="skills" 
      className={cn(styles.skillsSection, className)}
    >
      <div className={styles.skillsContainer}>
        {/* Заголовок секции */}
        <div className={styles.skillsHeader}>
          <div className={styles.skillsBadge}>
            <Network className={styles.skillsBadgeIcon} />
            <span className={styles.skillsBadgeText}>
              {t('subtitle')}
            </span>
          </div>
          
          <h2 className={styles.skillsTitle}>
            {t('title')}
          </h2>
          
          <p className={styles.skillsSubtitle}>
            {t('principle')}
          </p>
        </div>

        {/* Фильтр категорий */}
        <div className={styles.skillsCategories}>
          {categoriesConfig.map((categoryConfig, index) => {
            const category = skills.find(cat => cat.id === categoryConfig.id);
            if (!category) return null;

            const IconComponent = categoryConfig.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={cn(
                  styles.categoryButton,
                  isActive && styles.categoryButtonActive
                )}
                data-category-index={index}
              >
                <div className={styles.categoryButtonContent}>
                  <IconComponent className={styles.categoryIcon} />
                  <span>{category.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Сетка навыков */}
        <div 
          ref={skillsRef}
          className={styles.skillsGrid}
        >
          {activeSkills.map((skill, index) => {
            const isVisible = visibleSkills.has(skill.id);
            const skillLevel = skill.level ?? 0;
            
            return (
              <div
                key={skill.id}
                data-skill-id={skill.id}
                className={styles.skillCard}
                data-skill-index={index}
              >
                <div 
                  className={styles.skillIcon}
                  data-skill-color={skill.color}
                >
                  <div className={styles.skillIconSvg}>
                    {skill.icon}
                  </div>
                </div>
                
                <h3 className={styles.skillName}>
                  {skill.name}
                </h3>
                
                {/* Прогресс бар */}
                <div className={styles.skillProgress}>
                  <div 
                    className={cn(
                      styles.skillProgressBar,
                      isVisible && styles.skillProgressBarVisible
                    )}
                    data-skill-level={skillLevel}
                    data-skill-color={skill.color}
                  />
                </div>
                
                {/* Уровень навыка */}
                <div className={styles.skillLevel}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <div
                      key={i}
                      className={cn(
                        styles.skillLevelDot,
                        i < skillLevel && styles.skillLevelDotActive
                      )}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Условное отображение секций */}
        {shouldShowMentorship ? (
          // Блок менторства для армянского
          <div className={styles.mentorshipSection}>
            <div className={styles.mentorshipCard}>
              <div className={styles.mentorshipHeader}>
                <div className={styles.mentorshipBadge}>
                  <Users className={styles.mentorshipBadgeIcon} />
                  <h3 className={styles.mentorshipTitle}>
                    {t('mentorship')}
                  </h3>
                </div>
                <p className={styles.mentorshipDescription}>
                  {t('mentorship_desc')}
                </p>
              </div>

              {/* Форматы менторства */}
              <div className={styles.mentorshipFormats}>
                {mentorshipFormats.map((format, index) => {
                  const IconComponent = format.icon;
                  return (
                    <div
                      key={index}
                      className={styles.mentorshipFormat}
                    >
                      <div className={styles.mentorshipFormatIcon}>
                        <IconComponent className={styles.mentorshipFormatIconSvg} />
                      </div>
                      <h4 className={styles.mentorshipFormatTitle}>
                        {t(format.formatKey)}
                      </h4>
                      <p className={styles.mentorshipFormatDesc}>
                        {t(format.descriptionKey)}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* CTA кнопка */}
              <div className={styles.mentorshipCta}>
                <Button 
                  variant="accent"
                  size="lg"
                  onClick={handleContactClick}
                  className={styles.mentorshipButton}
                >
                  {t('apply_mentorship')}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Блок партнерства для русского/английского
          <div className={styles.partnershipSection}>
            <div className={styles.partnershipCard}>
              <div className={styles.partnershipHeader}>
                <BrainCircuit className={styles.partnershipIcon} />
                <h3 className={styles.partnershipTitle}>
                  {t('for_partnership_title')}
                </h3>
              </div>
              <p className={styles.partnershipDescription}>
                {t('for_partnership_desc')}
              </p>
              <Button 
                variant="accent"
                size="lg"
                onClick={handleContactClick}
                className={styles.partnershipButton}
              >
                {t('for_partnership_button')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;

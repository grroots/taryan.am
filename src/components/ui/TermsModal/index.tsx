// src/components/ui/TermsModal/index.tsx
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations, useMessages } from 'next-intl';
import { 
  X, 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Check,
  XCircle,
  AlertTriangle,
  Microscope,
  AlarmClock,
  ScrollText,
  Users,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './TermsModal.module.css';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'terms' | 'faq';
}

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  icon?: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ 
  question, 
  answer, 
  isOpen, 
  onToggle,
  icon 
}) => {
  return (
    <div className={styles.accordionItem}>
      <button
        onClick={onToggle}
        className={cn(styles.accordionButton, 'group')}
        aria-expanded={isOpen}
      >
        <div className={styles.accordionButtonContent}>
          {icon && (
            <div className={styles.accordionIcon}>
              {icon}
            </div>
          )}
          <h3 className={styles.accordionQuestion}>
            {question}
          </h3>
        </div>
        <div className={styles.accordionToggle}>
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className={styles.accordionContent}>
          <p className={styles.accordionAnswer}>
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

const TermsModal: React.FC<TermsModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultTab = 'terms' 
}) => {
  const t = useTranslations('terms');
  const messages = useMessages();
  const [activeTab, setActiveTab] = useState<'terms' | 'faq'>(defaultTab);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering portal
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveTab(defaultTab);
    } else {
      document.body.style.overflow = 'unset';
      setOpenFAQ(null);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, defaultTab]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Don't render anything if not mounted or not open
  if (!mounted || !isOpen) return null;

  // FAQ данные - получаем каждый элемент отдельно с новой структурой
  const faqItems = [
    {
      question: t('faq.items.0.question'),
      answer: t('faq.items.0.answer')
    },
    {
      question: t('faq.items.1.question'),
      answer: t('faq.items.1.answer')
    },
    {
      question: t('faq.items.2.question'),
      answer: t('faq.items.2.answer')
    },
    {
      question: t('faq.items.3.question'),
      answer: t('faq.items.3.answer')
    },
    {
      question: t('faq.items.4.question'),
      answer: t('faq.items.4.answer')
    }
  ];

  // FAQ Icons mapping
  const faqIcons = [
    <Microscope className="w-4 h-4" key="microscope" />,
    <AlarmClock className="w-4 h-4" key="alarm" />,
    <ScrollText className="w-4 h-4" key="scroll" />,
    <Users className="w-4 h-4" key="users" />,
    <ShieldCheck className="w-4 h-4" key="shield" />
  ];

  // Render modal using portal to ensure it's outside main DOM tree
  const modalContent = (
    <div 
      className={styles.modalOverlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modalContainer}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderContent}>
            <FileText className={styles.modalHeaderIcon} />
            <h2 id="modal-title" className={styles.modalTitle}>
              {t('title')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className={styles.modalCloseButton}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className={styles.tabsContainer}>
          <button
            onClick={() => setActiveTab('terms')}
            className={cn(
              styles.tabButton,
              activeTab === 'terms' ? styles.tabButtonActive : styles.tabButtonInactive
            )}
          >
            <div className={styles.tabButtonContent}>
              <FileText className="w-4 h-4" />
              {t('cooperation_terms.title')}
            </div>
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={cn(
              styles.tabButton,
              activeTab === 'faq' ? styles.tabButtonActive : styles.tabButtonInactive
            )}
          >
            <div className={styles.tabButtonContent}>
              <HelpCircle className="w-4 h-4" />
              {t('faq.title')}
            </div>
          </button>
        </div>

        {/* Content */}
        <div className={styles.modalContent}>
          {activeTab === 'terms' && (
            <div className={styles.termsContainer}>
              {/* Subtitle */}
              <div className={styles.termsSubtitle}>
                <p>{t('subtitle')}</p>
              </div>

              {/* Terms Sections */}
              <div className={styles.termsSections}>
                
                {/* 1. Format */}
                <div className={styles.termsSection}>
                  <h3 className={styles.sectionTitle}>
                    {t('cooperation_terms.format.title')}
                  </h3>
                  <div className={styles.sectionContent}>
                    <div className={styles.listItem}>
                      <Check className={styles.listIconSuccess} />
                      <p>{t('cooperation_terms.format.content.0')}</p>
                    </div>
                    <div className={styles.listItem}>
                      <Check className={styles.listIconSuccess} />
                      <p>{t('cooperation_terms.format.content.1')}</p>
                    </div>
                    <div className={styles.listItem}>
                      <Check className={styles.listIconSuccess} />
                      <p>{t('cooperation_terms.format.content.2')}</p>
                    </div>
                  </div>
                </div>

                {/* 2. Services */}
                <div className={styles.termsSection}>
                  <h3 className={styles.sectionTitle}>
                    {t('cooperation_terms.services.title')}
                  </h3>
                  <div className={styles.sectionContent}>
                    {/* Provided Services */}
                    <div className={styles.servicesList}>
                      <div className={styles.listItem}>
                        <Check className={styles.listIconSuccess} />
                        <p>{t('cooperation_terms.services.provided.0')}</p>
                      </div>
                    </div>
                    
                    {/* Not Provided Services */}
                    <div className={styles.servicesList}>
                      <div className={styles.listItem}>
                        <XCircle className={styles.listIconError} />
                        <p>{t('cooperation_terms.services.not_provided.0')}</p>
                      </div>
                    </div>

                    {/* Combined Note */}
                    <div className={styles.warningNote}>
                      <AlertTriangle className={styles.warningIcon} />
                      <p>{t('cooperation_terms.services.combined_note')}</p>
                    </div>
                  </div>
                </div>

                {/* 3. Deadlines */}
                <div className={styles.termsSection}>
                  <h3 className={styles.sectionTitle}>
                    {t('cooperation_terms.deadlines.title')}
                  </h3>
                  <div className={styles.sectionContent}>
                    <div className={styles.listItem}>
                      <Check className={styles.listIconSuccess} />
                      <p>{t('cooperation_terms.deadlines.content.0')}</p>
                    </div>
                    <div className={styles.listItem}>
                      <Check className={styles.listIconSuccess} />
                      <p>{t('cooperation_terms.deadlines.content.1')}</p>
                    </div>
                  </div>
                </div>

                {/* 4. Payment */}
                <div className={styles.termsSection}>
                  <h3 className={styles.sectionTitle}>
                    {t('cooperation_terms.payment.title')}
                  </h3>
                  <div className={styles.sectionContent}>
                    <div className={styles.listItem}>
                      <Check className={styles.listIconSuccess} />
                      <p>{t('cooperation_terms.payment.content.0')}</p>
                    </div>
                    <div className={styles.listItem}>
                      <Check className={styles.listIconSuccess} />
                      <p>{t('cooperation_terms.payment.content.1')}</p>
                    </div>
                    <div className={styles.listItem}>
                      <Check className={styles.listIconSuccess} />
                      <p>{t('cooperation_terms.payment.content.2')}</p>
                    </div>
                  </div>
                </div>

                {/* 5. Modifications */}
                <div className={styles.termsSection}>
                  <h3 className={styles.sectionTitle}>
                    {t('cooperation_terms.modifications.title')}
                  </h3>
                  <div className={styles.sectionContent}>
                    <div className={styles.listItem}>
                      <Check className={styles.listIconSuccess} />
                      <p>{t('cooperation_terms.modifications.content.0')}</p>
                    </div>
                  </div>
                </div>

                {/* 6. Confidentiality */}
                <div className={styles.termsSection}>
                  <h3 className={styles.sectionTitle}>
                    {t('cooperation_terms.confidentiality.title')}
                  </h3>
                  <div className={styles.sectionContent}>
                    <div className={styles.listItem}>
                      <AlertTriangle className={styles.listIconWarning} />
                      <p>{t('cooperation_terms.confidentiality.content.0')}</p>
                    </div>
                    <div className={styles.listItem}>
                      <AlertTriangle className={styles.listIconWarning} />
                      <p>{t('cooperation_terms.confidentiality.content.1')}</p>
                    </div>
                  </div>
                </div>

                {/* 7. Terms Changes */}
                <div className={styles.termsSection}>
                  <h3 className={styles.sectionTitle}>
                    {t('cooperation_terms.terms_changes.title')}
                  </h3>
                  <div className={styles.sectionContent}>
                    <div className={styles.listItem}>
                      <Check className={styles.listIconSuccess} />
                      <p>{t('cooperation_terms.terms_changes.content.0')}</p>
                    </div>
                    <div className={styles.listItem}>
                      <Check className={styles.listIconSuccess} />
                      <p>{t('cooperation_terms.terms_changes.content.1')}</p>
                    </div>
                    <div className={styles.listItem}>
                      <Check className={styles.listIconSuccess} />
                      <p>{t('cooperation_terms.terms_changes.content.2')}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className={styles.faqContainer}>
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFAQ === index}
                  onToggle={() => toggleFAQ(index)}
                  icon={faqIcons[index] || <HelpCircle className="w-4 h-4" />}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render modal content through portal
  return createPortal(modalContent, document.body);
};

export default TermsModal;
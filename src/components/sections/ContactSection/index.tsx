// src/components/sections/ContactSection/index.tsx
'use client';

import { useTranslations } from 'next-intl';
import { MessageCircle, Mail, MailPlus, Phone, Clock, User, Linkedin, Instagram, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import ContactForm from '@/components/ui/ContactForm';
import styles from './ContactSection.module.css';

interface ContactSectionProps {
  className?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ className }) => {
  const t = useTranslations('contact');

  // Contact methods configuration
  const contactMethods = [
    {
      id: 'email',
      type: 'email' as const,
      label: t('methods.email.label'),
      value: t('methods.email.value'),
      description: t('methods.email.description'),
      icon: Mail,
      href: 'mailto:info@taryan.am',
    },
    {
	  id: 'addmail',
      type: 'email' as const,
      label: t('methods.addmail.label'),
      value: t('methods.addmail.value'),
      description: t('methods.addmail.description'),
      icon: MailPlus,
      email: t('methods.addmail.email'),
      href: `mailto:${t('methods.addmail.email')}`,
    },
    {
      id: 'phone', 
      type: 'phone' as const,
      label: t('methods.phone.label'),
      value: t('methods.phone.value'),
      description: t('methods.phone.description'),
      icon: Phone,
      href: `tel:${t('methods.phone.value')}`,
    },
    {
      id: 'telegram',
      type: 'social' as const,
      label: t('methods.telegram.label'), 
      value: t('methods.telegram.value'),
      description: t('methods.telegram.description'),
      icon: Send,
      href: 'https://t.me/armenmkhitaryan',
    },
    {
      id: 'whatsapp',
      type: 'social' as const,
      label: t('methods.whatsapp.label'),
      value: t('methods.whatsapp.value'), 
      description: t('methods.whatsapp.description'),
      icon: MessageCircle,
      href: 'https://wa.me/37433310061',
    },
    {
      id: 'linkedin',
      type: 'social' as const, 
      label: t('methods.linkedin.label'),
      value: t('methods.linkedin.value'),
      description: t('methods.linkedin.description'),
      icon: Linkedin,
      href: 'https://linkedin.com/in/armen-mkhitaryan',
    },
    {
      id: 'instagram',
      type: 'social' as const,
      label: t('methods.instagram.label'),
      value: t('methods.instagram.value'),
      description: t('methods.instagram.description'), 
      icon: Instagram,
      href: 'https://www.instagram.com/armkhitaryan',
    },
  ];

  return (
    <section 
      id="contact" 
      className={cn(styles.contactSection, "scrollReveal", className)}
    >
      <div className={styles.contactContainer}>
        {/* Section Header */}
        <div className={cn(styles.contactHeader, "fadeInUp")}>
          <div className={styles.contactHeaderIcon}>
            <MessageCircle className={styles.headerIcon} />
            <span className={styles.headerSubtitle}>
              {t('subtitle')}
            </span>
          </div>

          <h2 className={styles.contactTitle}>
            {t('title')}
          </h2>
          
          <p className={styles.contactSubtitle}>
            {t('description')}
          </p>
        </div>

        {/* Content Grid */}
        <div className={styles.contactContent}>
          {/* Левая колонка: Quick Response Card + Contact Form */}
          <div className={cn(styles.contactLeftColumn, "fadeInUp")}>
            {/* Quick Response Card - сверху */}
            <div className={styles.quickResponseCard}>
              <div className={styles.quickResponseHeader}>
                <Clock className={styles.quickResponseIcon} />
                <h4 className={styles.quickResponseTitle}>
                  {t('quick_response')}
                </h4>
              </div>
              <p className={styles.quickResponseDescription}>
                {t('quick_response_desc')}
              </p>
            </div>
            
            {/* Contact Form - снизу */}
            <ContactForm />
          </div>

          {/* Правая колонка: Contact Info */}
          <div className={cn(styles.contactRightColumn, "fadeInUp")}>
            <div className={styles.contactInfoContainer}>
              <h3 className={styles.contactInfoTitle}>
                <User className={styles.contactInfoIcon} />
                {t('contact_info')}
              </h3>

              <div className={styles.contactMethods}>
                {contactMethods.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <a
                      key={index}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactMethod}
                      aria-label={`${t('contact_via')} ${contact.label}: ${contact.value}`}
                    >
                      <div className={styles.contactMethodIcon}>
                        <IconComponent className={styles.contactIcon} />
                      </div>
                      <div className={styles.contactMethodContent}>
                        <div className={styles.contactMethodTop}>
                          <div className={styles.contactMethodLabel}>
                            {contact.label}
                          </div>
                          <div className={styles.contactMethodValue}>
                            {contact.value}
                          </div>
                        </div>
                        <div className={styles.contactMethodDescription}>
                          {contact.description}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

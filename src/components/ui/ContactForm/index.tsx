// components/ui/ContactForm/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Send, MessagesSquare, Shield, ChevronDown, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import styles from './ContactForm.module.css';

interface FormData {
  name: string;
  email: string;
  subject: string;
  service: string;
  message: string;
  honeypot: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  service?: string;
  message?: string;
  general?: string;
}

const ContactForm: React.FC = () => {
  const t = useTranslations('contact');
  const common = useTranslations('common');
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    service: "",
    message: "",
    honeypot: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [rateLimitCount, setRateLimitCount] = useState(0);

  // Subject options
  const subjects = [
    { value: "", label: common('select_theme') },
    { value: "mentorship", label: t('subjects.mentorship') },
    { value: "services", label: t('subjects.services') },
    { value: "proposals", label: t('subjects.proposals') },
  ];

  // Service packages
  const servicePackages = [
    { value: "", label: common('select_package') },
    { value: "small", label: t('packages.small') },
    { value: "large", label: t('packages.large') },
    { value: "project", label: t('packages.project') },
    { value: "custom", label: t('packages.custom') },
  ];

  // Handle preset form from URL or events
  useEffect(() => {
    const presetForm = (data: { subject?: string; service?: string }) => {
      if (data.subject || data.service) {
        setFormData(prev => ({
          ...prev,
          subject: data.subject || prev.subject,
          service: data.service || prev.service,
        }));

        const url = new URL(window.location.href);
        url.searchParams.delete('subject');
        url.searchParams.delete('service');
        window.history.replaceState({}, '', url.toString());
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const presetSubject = urlParams.get('subject');
    const presetService = urlParams.get('service');
    
    if (presetSubject || presetService) {
      presetForm({
        subject: presetSubject || undefined,
        service: presetService || undefined
      });
    }

    const handlePresetContactForm = (event: CustomEvent) => {
      const { subject, service } = event.detail;
      presetForm({ subject, service });
    };

    window.addEventListener('presetContactForm', handlePresetContactForm as EventListener);

    return () => {
      window.removeEventListener('presetContactForm', handlePresetContactForm as EventListener);
    };
  }, []);

  // Form validation
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = common('required_field');
    } else if (formData.name.length < 2) {
      newErrors.name = common('min_chars').replace('{count}', '2');
    } else if (formData.name.length > 50) {
      newErrors.name = common('max_chars').replace('{count}', '50');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = common('required_field');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = common('invalid_email');
    }

    if (!formData.subject) {
      newErrors.subject = common('required_field');
    }

    if (formData.subject === "services" && !formData.service) {
      newErrors.service = common('required_field');
    }

    if (!formData.message.trim()) {
      newErrors.message = common('required_field');
    } else if (formData.message.length < 10) {
      newErrors.message = common('min_chars').replace('{count}', '10');
    } else if (formData.message.length > 1000) {
      newErrors.message = common('max_chars').replace('{count}', '1000');
    }

    if (formData.honeypot) {
      newErrors.general = common('suspicious_activity');
    }

    return newErrors;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let sanitizedValue = value;
    if (name !== "message" && name !== "subject" && name !== "service") {
      sanitizedValue = value.replace(/<[^>]*>/g, "").replace(/[<>\"']/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
      ...(name === "subject" && value !== "services" ? { service: "" } : {})
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (rateLimitCount >= 3) {
      setSubmitStatus("error");
      setErrors({
        general: common('too_many_attempts'),
      });
      return;
    }

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const subjectLabel = subjects.find(s => s.value === formData.subject)?.label || formData.subject;
      const serviceLabel = formData.service ? 
        ` - ${servicePackages.find(s => s.value === formData.service)?.label}` : '';
      
      const emailSubject = `${subjectLabel}${serviceLabel} - ${formData.name}`;

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "948ac1f0-886a-465d-a106-b3a9617bca73",
          name: formData.name,
          email: formData.email,
          subject: emailSubject,
          message: formData.message,
          from_name: formData.name,
          replyto: formData.email,
          inquiry_type: subjectLabel,
          service_package: serviceLabel,
          botcheck: formData.honeypot,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Error sending message");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", service: "", message: "", honeypot: "" });
      setRateLimitCount((prev) => prev + 1);

      setTimeout(() => {
        setRateLimitCount((prev) => Math.max(0, prev - 1));
      }, 600000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");

      if (error instanceof Error) {
        if (
          error.message.includes("rate limit") ||
          error.message.includes("too many")
        ) {
          setErrors({ general: common('rate_limit_error') });
        } else if (error.message.includes("access_key")) {
          setErrors({
            general: common('contact_alternative'),
          });
        } else if (error.message.includes("validation")) {
          setErrors({ general: common('validation_error') });
        } else {
          setErrors({ general: error.message });
        }
      } else {
        setErrors({
          general: t('error_message'),
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactForm}>
      <div className={styles.formHeader}>
        <MessagesSquare className={styles.formHeaderIcon} />
        <h3 className={styles.formTitle}>
          {t('form_title')}
        </h3>
      </div>

      {/* Success Message */}
      {submitStatus === "success" && (
        <div className={styles.formSuccess}>
          <CheckCircle className={styles.formSuccessIcon} />
          <p>{t('success_message')}</p>
        </div>
      )}

      {/* Error Message */}
      {errors.general && (
        <div className={styles.formError}>
          <AlertCircle className={styles.formErrorIcon} />
          <p>{errors.general}</p>
        </div>
      )}

      {/* Honeypot field */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleInputChange}
        className={styles.honeypotField}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className={styles.formContent}>
        <div className={styles.formGrid}>
          {/* Name Field */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              {t('name_label')} *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={cn(styles.formInput, errors.name && styles.formInputError)}
              placeholder={t('name_placeholder')}
              required
              disabled={isSubmitting}
              maxLength={50}
            />
            {errors.name && (
              <p className={styles.formFieldError}>
                <AlertCircle className={styles.formFieldErrorIcon} />
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              {t('email_label')} *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={cn(styles.formInput, errors.email && styles.formInputError)}
              placeholder="your@email.com"
              required
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className={styles.formFieldError}>
                <AlertCircle className={styles.formFieldErrorIcon} />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Subject Field */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            {t('subject_label')} *
          </label>
          <div className={styles.formSelectWrapper}>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={cn(styles.formInput, styles.formSelect, errors.subject && styles.formInputError)}
              required
              disabled={isSubmitting}
            >
              {subjects.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </select>
            <ChevronDown className={styles.formSelectIcon} />
          </div>
          {errors.subject && (
            <p className={styles.formFieldError}>
              <AlertCircle className={styles.formFieldErrorIcon} />
              {errors.subject}
            </p>
          )}
        </div>

        {/* Service Package Field */}
        {formData.subject === "services" && (
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              {t('service_label')} *
            </label>
            <div className={styles.formSelectWrapper}>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className={cn(styles.formInput, styles.formSelect, errors.service && styles.formInputError)}
                required
                disabled={isSubmitting}
              >
                {servicePackages.map((pkg) => (
                  <option key={pkg.value} value={pkg.value}>
                    {pkg.label}
                  </option>
                ))}
              </select>
              <ChevronDown className={styles.formSelectIcon} />
            </div>
            {errors.service && (
              <p className={styles.formFieldError}>
                <AlertCircle className={styles.formFieldErrorIcon} />
                {errors.service}
              </p>
            )}
          </div>
        )}

        {/* Message Field */}
        <div className={cn(styles.formGroup, styles.formGroupFull)}>
          <label className={styles.formLabel}>
            {t('message_label')} *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className={cn(styles.formTextarea, errors.message && styles.formInputError)}
            placeholder={t('message_placeholder')}
            required
            disabled={isSubmitting}
            maxLength={1000}
          />
          <div className={styles.formFieldFooter}>
            {errors.message ? (
              <p className={styles.formFieldError}>
                <AlertCircle className={styles.formFieldErrorIcon} />
                {errors.message}
              </p>
            ) : (
              <div></div>
            )}
            <p className={styles.characterCounter}>
              {formData.message.length}/1000
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className={styles.formSubmit}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleSubmit}
            disabled={isSubmitting || rateLimitCount >= 3}
            className={styles.submitButton}
          >
            {isSubmitting ? (
              <>
                <div className={styles.submitSpinner}></div>
                {t('sending')}
              </>
            ) : (
              <>
                {t('send_button')}
                <Send className={styles.submitIcon} />
              </>
            )}
          </Button>

          {/* Security Notice */}
          <div className={styles.securityNotice}>
            <Shield className={styles.securityIcon} />
            <span>{t('protected_spam')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
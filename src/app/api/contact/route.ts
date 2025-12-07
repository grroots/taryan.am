// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Инициализация Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Типы для формы
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  service?: string;
  message: string;
  honeypot?: string;
  locale?: string;
}

// Валидация email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Санитизация строк
function sanitizeString(str: string): string {
  return str
    .replace(/<[^>]*>/g, '') // Удаляем HTML теги
    .replace(/[<>\"']/g, '') // Удаляем опасные символы
    .trim();
}

// Проверка на спам
function isSpam(data: ContactFormData): boolean {
  // Проверка honeypot поля
  if (data.honeypot && data.honeypot.trim() !== '') {
    return true;
  }

  // Проверка на подозрительные паттерны
  const suspiciousPatterns = [
    /viagra|cialis|casino|poker|loan|mortgage/i,
    /click here|free money|make money|work from home/i,
    /сайт|раскрутка|продвижение|реклама/i,
  ];

  const fullText = `${data.name} ${data.email} ${data.message}`.toLowerCase();
  
  return suspiciousPatterns.some(pattern => pattern.test(fullText));
}

// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Инициализация Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Типы для формы
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  service?: string;
  message: string;
  honeypot?: string;
  locale?: string;
}

// Валидация email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Санитизация строк
function sanitizeString(str: string): string {
  return str
    .replace(/<[^>]*>/g, '') // Удаляем HTML теги
    .replace(/[<>\"']/g, '') // Удаляем опасные символы
    .trim();
}

// Проверка на спам
function isSpam(data: ContactFormData): boolean {
  // Проверка honeypot поля
  if (data.honeypot && data.honeypot.trim() !== '') {
    return true;
  }

  // Проверка на подозрительные паттерны
  const suspiciousPatterns = [
    /viagra|cialis|casino|poker|loan|mortgage/i,
    /click here|free money|make money|work from home/i,
    /сайт|раскрутка|продвижение|реклама/i,
  ];

  const fullText = `${data.name} ${data.email} ${data.message}`.toLowerCase();
  
  return suspiciousPatterns.some(pattern => pattern.test(fullText));
}

// Получаем переводы из JSON файлов
async function getTranslations(locale: string = 'hy') {
  try {
    let translations;
    
    switch (locale) {
      case 'hy':
        translations = (await import('@/lib/dictionaries/hy.json')).default;
        break;
      case 'ru':
        translations = (await import('@/lib/dictionaries/ru.json')).default;
        break;
      case 'en':
        translations = (await import('@/lib/dictionaries/en.json')).default;
        break;
      default:
        translations = (await import('@/lib/dictionaries/hy.json')).default;
    }
    
    return translations;
  } catch (error) {
    console.error('Failed to load translations:', error);
    // Fallback to Armenian if translation loading fails
    return (await import('@/lib/dictionaries/hy.json')).default;
  }
}

// Шаблон письма
async function createEmailTemplate(data: ContactFormData): Promise<string> {
  const locale = data.locale || 'hy';
  const translations = await getTranslations(locale);
  
  // Получаем переводы из JSON файлов
  const subjectLabel = translations.contact.subjects[data.subject] || data.subject;
  const serviceLabel = data.service ? translations.contact.packages[data.service] || data.service : '';

  return `
    <div style="font-family: 'DejaVu Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #2B7A8A, #1A6B7A); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">📧 Նոր հաղորդագրություն</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">taryan.am կայքից</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
        <div style="background: white; padding: 25px; border-radius: 8px; border: 1px solid #dee2e6;">
          <h2 style="color: #2B7A8A; margin-top: 0; font-size: 20px;">📋 Մանրամասներ</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #495057; width: 120px;">
                👤 Անուն:
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #212529;">
                ${sanitizeString(data.name)}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #495057;">
                📧 Email:
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #212529;">
                <a href="mailto:${data.email}" style="color: #2B7A8A; text-decoration: none;">
                  ${data.email}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #495057;">
                📝 Թեմա:
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #212529;">
                ${subjectLabel}
              </td>
            </tr>
            ${serviceLabel ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #495057;">
                📦 Փաթեթ:
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #212529;">
                ${serviceLabel}
              </td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #495057;" colspan="2">
                💬 Հաղորդագրություն:
              </td>
            </tr>
          </table>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin-top: 15px; border-left: 4px solid #2B7A8A;">
            <p style="margin: 0; line-height: 1.6; color: #212529; white-space: pre-wrap;">${sanitizeString(data.message)}</p>
          </div>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 6px; border-left: 4px solid #1976d2;">
          <p style="margin: 0; font-size: 14px; color: #1565c0;">
            <strong>ℹ️ Ինֆորմացիա:</strong> Այս հաղորդագրությունը ուղարկվել է ${new Date().toLocaleString('hy-AM', { timeZone: 'Asia/Yerevan' })}-ին (Երևանի ժամանակով)
          </p>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
        <p>© 2025 Armen Mkhitaryan | Content Manager</p>
        <p>🌐 <a href="https://taryan.am" style="color: #2B7A8A;">taryan.am</a></p>
      </div>
    </div>
  `;
}

// Rate limiting store (в production лучше использовать Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Проверка rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(ip);
  
  if (!limit || now > limit.resetTime) {
    // Сбрасываем лимит каждые 10 минут
    rateLimitStore.set(ip, { count: 1, resetTime: now + 10 * 60 * 1000 });
    return true;
  }
  
  if (limit.count >= 3) {
    return false;
  }
  
  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Получаем IP адрес для rate limiting
    const ip = request.headers.get('x-forwarded-for') ?? 
              request.headers.get('x-real-ip') ?? 
              'unknown';

    // Проверяем rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Парсим данные формы
    const data: ContactFormData = await request.json();

    // Базовая валидация
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Валидация email
    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Проверка на спам
    if (isSpam(data)) {
      return NextResponse.json(
        { success: false, error: 'Spam detected' },
        { status: 400 }
      );
    }

    // Валидация длины полей
    if (data.name.length > 50 || data.message.length > 1000) {
      return NextResponse.json(
        { success: false, error: 'Field length exceeded' },
        { status: 400 }
      );
    }

    // Проверяем наличие API ключа
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { success: false, error: 'Service temporarily unavailable' },
        { status: 500 }
      );
    }

    // Формируем subject для письма используя переводы из JSON
    const translations = await getTranslations(data.locale);
    const subjectLabel = translations.contact.subjects[data.subject] || data.subject;
    const serviceLabel = data.service ? ` - ${translations.contact.packages[data.service] || data.service}` : '';
    const emailSubject = `${subjectLabel}${serviceLabel} - ${data.name}`;

    // Отправляем email через Resend
    const emailResponse = await resend.emails.send({
      from: 'info@taryan.am',
      to: ['info@taryan.am'],
      replyTo: data.email,
      subject: emailSubject,
      html: await createEmailTemplate(data),
      text: `
Նոր հաղորդագրություն taryan.am կայքից

Անուն: ${data.name}
Email: ${data.email}
Թեմա: ${subjectLabel}${serviceLabel}

Հաղորդագրություն:
${data.message}

---
Ուղարկվել է: ${new Date().toLocaleString('hy-AM', { timeZone: 'Asia/Yerevan' })}
      `.trim(),
    });

    if (emailResponse.error) {
      console.error('Resend API error:', emailResponse.error);
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', emailResponse.data?.id);

    // Возвращаем успешный ответ
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully',
        id: emailResponse.data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Обработка GET запросов (опционально, для healthcheck)
export async function GET() {
  return NextResponse.json(
    { message: 'Contact API is working' },
    { status: 200 }
  );
}

  return `
    <div style="font-family: 'DejaVu Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #2B7A8A, #1A6B7A); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">📧 Նոր հաղորդագրություն</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">taryan.am կայքից</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
        <div style="background: white; padding: 25px; border-radius: 8px; border: 1px solid #dee2e6;">
          <h2 style="color: #2B7A8A; margin-top: 0; font-size: 20px;">📋 Մանրամասներ</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #495057; width: 120px;">
                👤 Անուն:
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #212529;">
                ${sanitizeString(data.name)}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #495057;">
                📧 Email:
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #212529;">
                <a href="mailto:${data.email}" style="color: #2B7A8A; text-decoration: none;">
                  ${data.email}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #495057;">
                📝 Թեմա:
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #212529;">
                ${subjectLabel}
              </td>
            </tr>
            ${serviceLabel ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #495057;">
                📦 Փաթեթ:
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #212529;">
                ${serviceLabel}
              </td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #495057;" colspan="2">
                💬 Հաղորդագրություն:
              </td>
            </tr>
          </table>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin-top: 15px; border-left: 4px solid #2B7A8A;">
            <p style="margin: 0; line-height: 1.6; color: #212529; white-space: pre-wrap;">${sanitizeString(data.message)}</p>
          </div>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 6px; border-left: 4px solid #1976d2;">
          <p style="margin: 0; font-size: 14px; color: #1565c0;">
            <strong>ℹ️ Ինֆորմացիա:</strong> Այս հաղորդագրությունը ուղարկվել է ${new Date().toLocaleString('hy-AM', { timeZone: 'Asia/Yerevan' })}-ին (Երևանի ժամանակով)
          </p>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
        <p>© 2025 Armen Mkhitaryan | Content Manager</p>
        <p>🌐 <a href="https://taryan.am" style="color: #2B7A8A;">taryan.am</a></p>
      </div>
    </div>
  `;
}

// Rate limiting store (в production лучше использовать Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Проверка rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(ip);
  
  if (!limit || now > limit.resetTime) {
    // Сбрасываем лимит каждые 10 минут
    rateLimitStore.set(ip, { count: 1, resetTime: now + 10 * 60 * 1000 });
    return true;
  }
  
  if (limit.count >= 3) {
    return false;
  }
  
  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Получаем IP адрес для rate limiting
    const ip = request.headers.get('x-forwarded-for') ?? 
              request.headers.get('x-real-ip') ?? 
              'unknown';

    // Проверяем rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Парсим данные формы
    const data: ContactFormData = await request.json();

    // Базовая валидация
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Валидация email
    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Проверка на спам
    if (isSpam(data)) {
      return NextResponse.json(
        { success: false, error: 'Spam detected' },
        { status: 400 }
      );
    }

    // Валидация длины полей
    if (data.name.length > 50 || data.message.length > 1000) {
      return NextResponse.json(
        { success: false, error: 'Field length exceeded' },
        { status: 400 }
      );
    }

    // Проверяем наличие API ключа
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { success: false, error: 'Service temporarily unavailable' },
        { status: 500 }
      );
    }

    // Формируем subject для письма
    const subjectLabels: Record<string, string> = {
      mentorship: 'Մենթորշիփ',
      services: 'Ծառայություններ', 
      proposals: 'Առաջարկներ'
    };

    const serviceLabels: Record<string, string> = {
      start: 'ՓՈՔՐ',
      business: 'ՄԵԾ', 
      custom: 'ԽՈՇՈՐ',
      individual: 'Անհատական'
    };

    const subjectLabel = subjectLabels[data.subject] || data.subject;
    const serviceLabel = data.service ? ` - ${serviceLabels[data.service] || data.service}` : '';
    const emailSubject = `${subjectLabel}${serviceLabel} - ${data.name}`;

    // Отправляем email через Resend
    const emailResponse = await resend.emails.send({
      from: 'info@taryan.am',
      to: ['info@taryan.am'],
      replyTo: data.email,
      subject: emailSubject,
      html: createEmailTemplate(data),
      text: `
Նոր հաղորդագրություն taryan.am կայքից

Անուն: ${data.name}
Email: ${data.email}
Թեմա: ${subjectLabel}${serviceLabel}

Հաղորդագրություն:
${data.message}

---
Ուղարկվել է: ${new Date().toLocaleString('hy-AM', { timeZone: 'Asia/Yerevan' })}
      `.trim(),
    });

    if (emailResponse.error) {
      console.error('Resend API error:', emailResponse.error);
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', emailResponse.data?.id);

    // Возвращаем успешный ответ
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully',
        id: emailResponse.data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Обработка GET запросов (опционально, для healthcheck)
export async function GET() {
  return NextResponse.json(
    { message: 'Contact API is working' },
    { status: 200 }
  );
}
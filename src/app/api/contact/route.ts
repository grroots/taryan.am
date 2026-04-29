import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  service?: string;
  message: string;
  honeypot?: string;
  locale?: string;
}

type Dictionary = {
  contact: {
    subjects: Record<string, string>;
    packages: Record<string, string>;
  };
};

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getSmtpConfig() {
  const port = Number(process.env.SMTP_PORT || 465);

  return {
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER,
    to: process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER,
  };
}

function isSmtpConfigured(): boolean {
  const config = getSmtpConfig();
  return Boolean(config.host && config.port && config.user && config.pass && config.from && config.to);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeString(str: string): string {
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"']/g, '')
    .trim();
}

function isSpam(data: ContactFormData): boolean {
  if (data.honeypot?.trim()) {
    return true;
  }

  const suspiciousPatterns = [
    /viagra|cialis|casino|poker|loan|mortgage/i,
    /click here|free money|make money|work from home/i,
    /сайт|раскрутка|продвижение|реклама/i,
  ];

  const fullText = `${data.name} ${data.email} ${data.message}`.toLowerCase();
  return suspiciousPatterns.some((pattern) => pattern.test(fullText));
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 10 * 60 * 1000 });
    return true;
  }

  if (limit.count >= 3) {
    return false;
  }

  limit.count += 1;
  return true;
}

async function getTranslations(locale = 'hy'): Promise<Dictionary> {
  try {
    switch (locale) {
      case 'ru':
        return (await import('@/lib/dictionaries/ru.json')).default as Dictionary;
      case 'en':
        return (await import('@/lib/dictionaries/en.json')).default as Dictionary;
      case 'hy':
      default:
        return (await import('@/lib/dictionaries/hy.json')).default as Dictionary;
    }
  } catch (error) {
    console.error('Failed to load translations:', error);
    return (await import('@/lib/dictionaries/hy.json')).default as Dictionary;
  }
}

async function createEmailTemplate(data: ContactFormData): Promise<string> {
  const translations = await getTranslations(data.locale);
  const subjectLabel = translations.contact.subjects[data.subject] || data.subject;
  const serviceLabel = data.service ? translations.contact.packages[data.service] || data.service : '';

  return `
    <div style="font-family: 'DejaVu Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #2B7A8A, #1A6B7A); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">New message</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">From taryan.am</p>
      </div>

      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
        <div style="background: white; padding: 25px; border-radius: 8px; border: 1px solid #dee2e6;">
          <h2 style="color: #2B7A8A; margin-top: 0; font-size: 20px;">Details</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #495057; width: 120px;">Name:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #212529;">${sanitizeString(data.name)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #495057;">Email:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #212529;">
                <a href="mailto:${data.email}" style="color: #2B7A8A; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #495057;">Subject:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #212529;">${subjectLabel}</td>
            </tr>
            ${serviceLabel ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #495057;">Package:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #212529;">${serviceLabel}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #495057;" colspan="2">Message:</td>
            </tr>
          </table>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin-top: 15px; border-left: 4px solid #2B7A8A;">
            <p style="margin: 0; line-height: 1.6; color: #212529; white-space: pre-wrap;">${sanitizeString(data.message)}</p>
          </div>
        </div>

        <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 6px; border-left: 4px solid #1976d2;">
          <p style="margin: 0; font-size: 14px; color: #1565c0;">
            <strong>Info:</strong> Sent at ${new Date().toLocaleString('hy-AM', { timeZone: 'Asia/Yerevan' })} Yerevan time.
          </p>
        </div>
      </div>

      <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
        <p>© 2026 Armen Mkhitaryan | E-commerce Content Lead</p>
        <p><a href="https://taryan.am" style="color: #2B7A8A;">taryan.am</a></p>
      </div>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const data: ContactFormData = await request.json();

    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (isSpam(data)) {
      return NextResponse.json(
        { success: false, error: 'Spam detected' },
        { status: 400 }
      );
    }

    if (data.name.length > 50 || data.message.length > 1000) {
      return NextResponse.json(
        { success: false, error: 'Field length exceeded' },
        { status: 400 }
      );
    }

    if (!isSmtpConfigured()) {
      console.error('SMTP contact form configuration is incomplete');
      return NextResponse.json(
        { success: false, error: 'Service temporarily unavailable' },
        { status: 500 }
      );
    }

    const translations = await getTranslations(data.locale);
    const subjectLabel = translations.contact.subjects[data.subject] || data.subject;
    const serviceLabel = data.service ? ` - ${translations.contact.packages[data.service] || data.service}` : '';
    const emailSubject = `${subjectLabel}${serviceLabel} - ${data.name}`;

    const smtpConfig = getSmtpConfig();
    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass,
      },
    });

    const emailResponse = await transporter.sendMail({
      from: smtpConfig.from,
      to: smtpConfig.to,
      replyTo: data.email,
      subject: emailSubject,
      html: await createEmailTemplate(data),
      text: `
New message from taryan.am

Name: ${data.name}
Email: ${data.email}
Subject: ${subjectLabel}${serviceLabel}

Message:
${data.message}

Sent at: ${new Date().toLocaleString('hy-AM', { timeZone: 'Asia/Yerevan' })}
      `.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully',
        id: emailResponse.messageId,
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

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API is working' },
    { status: 200 }
  );
}

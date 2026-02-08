import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Input length limits to prevent DoS
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;

// Sanitize string input
function sanitize(str: string | undefined, maxLength: number): string {
  if (!str) return '';
  return str.slice(0, maxLength).trim();
}

export async function POST(request: NextRequest) {
  try {
    const rawData = await request.json();

    // Sanitize all inputs with length limits
    const data: ContactFormData = {
      name: sanitize(rawData.name, MAX_NAME_LENGTH),
      email: sanitize(rawData.email, MAX_EMAIL_LENGTH),
      subject: sanitize(rawData.subject, MAX_SUBJECT_LENGTH),
      message: sanitize(rawData.message, MAX_MESSAGE_LENGTH),
    };

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // In production, you would send an email here using a service like:
    // - Resend (https://resend.com)
    // - SendGrid
    // - AWS SES
    //
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'NOWADAYS. <noreply@nowadayswilmington.com>',
    //   to: 'hello@nowadayswilmington.com',
    //   subject: `[${data.subject}] New message from ${data.name}`,
    //   html: `...email template...`,
    // });

    // For now, log the submission (remove in production)
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

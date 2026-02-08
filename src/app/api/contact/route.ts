import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  guestCount?: string;
  preferredDate?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.eventType || !data.message) {
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
    // - EmailJS
    //
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'MK Traditions <noreply@mktraditions.com>',
    //   to: 'mktraditions.nc@gmail.com',
    //   subject: `New Inquiry: ${data.eventType} from ${data.name}`,
    //   html: `...email template...`,
    // });

    // For now, log the submission (remove in production)
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      eventType: data.eventType,
      guestCount: data.guestCount,
      preferredDate: data.preferredDate,
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

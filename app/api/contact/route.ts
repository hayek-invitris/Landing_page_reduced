import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { sanitizeContactForm } from '@/lib/sanitization';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting: Simple in-memory store (for production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max 5 requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // Per hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Check honeypot
    if (body.honeypot) {
      // Silently reject but return success to confuse bots
      return NextResponse.json({ success: true });
    }

    // Check timing (should be at least 3 seconds)
    if (body.formLoadTime && Date.now() - body.formLoadTime < 3000) {
      return NextResponse.json(
        { error: 'Please take a moment to fill out the form properly.' },
        { status: 400 }
      );
    }

    // Sanitize and validate
    const sanitizedData = sanitizeContactForm({
      firstName: body.firstName || '',
      lastName: body.lastName || '',
      email: body.email || '',
      company: body.company || '',
      message: body.message || '',
    });

    if (!sanitizedData.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', errors: sanitizedData.errors },
        { status: 400 }
      );
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Invitris Contact Form <user@invitris.com>',
      to: ['contact@invitris.com'],
      replyTo: sanitizedData.email,
      subject: `New Contact: ${sanitizedData.firstName} ${sanitizedData.lastName} - ${sanitizedData.company}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedData.firstName} ${sanitizedData.lastName}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Company:</strong> ${sanitizedData.company}</p>
        <hr />
        <h3>Message:</h3>
        <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">
          Sent from Invitris website contact form<br>
          IP: ${ip}
        </p>
      `,
      text: `
New Contact Form Submission

Name: ${sanitizedData.firstName} ${sanitizedData.lastName}
Email: ${sanitizedData.email}
Company: ${sanitizedData.company}

Message:
${sanitizedData.message}

---
Sent from Invitris website contact form
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data?.id);
    return NextResponse.json({ success: true, id: data?.id });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}

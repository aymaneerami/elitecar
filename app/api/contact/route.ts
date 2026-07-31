import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;

  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    // Get IP for rate limiting
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
    const { name, phone, email, service, carType, carModel, message } = body;

    // Enhanced input validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedPhone = phone ? phone.trim().slice(0, 20) : '';
    const sanitizedEmail = email.trim().toLowerCase().slice(0, 100);
    const sanitizedMessage = message.trim().slice(0, 1000);
    const sanitizedService = service ? service.trim().slice(0, 50) : '';
    const sanitizedCarType = carType ? carType.trim().slice(0, 50) : '';
    const sanitizedCarModel = carModel ? carModel.trim().slice(0, 50) : '';

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /onerror=/i,
      /onload=/i,
      /onclick=/i,
    ];

    const allInputs = [sanitizedName, sanitizedPhone, sanitizedEmail, sanitizedMessage, sanitizedService, sanitizedCarType, sanitizedCarModel];
    for (const input of allInputs) {
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(input)) {
          return NextResponse.json(
            { error: 'Invalid input detected' },
            { status: 400 }
          );
        }
      }
    }

    // Send email
    const data = await resend.emails.send({
      from: 'Elitecar <onboarding@resend.dev>',
      to: process.env.YOUR_EMAIL || 'your-email@example.com',
      subject: `Nouveau contact de ${sanitizedName} - ${sanitizedService || 'Général'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">Nouveau message de contact</h2>
          <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; color: white;">
            <p><strong>Nom:</strong> ${sanitizedName}</p>
            <p><strong>Téléphone:</strong> ${sanitizedPhone || 'Non fourni'}</p>
            <p><strong>Email:</strong> ${sanitizedEmail}</p>
            <p><strong>Service:</strong> ${sanitizedService || 'Non spécifié'}</p>
            <p><strong>Type de véhicule:</strong> ${sanitizedCarType || 'Non spécifié'}</p>
            <p><strong>Modèle de véhicule:</strong> ${sanitizedCarModel || 'Non spécifié'}</p>
            <hr style="border-color: #333; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="background: #333; padding: 15px; border-radius: 4px;">${sanitizedMessage}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
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
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    const {
      name,
      phone,
      email,
      service,
      carType,
      carModel,
      message,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedPhone = phone?.trim().slice(0, 20) || '';
    const sanitizedEmail = email.trim().toLowerCase().slice(0, 100);
    const sanitizedMessage = message.trim().slice(0, 1000);
    const sanitizedService = service?.trim().slice(0, 50) || '';
    const sanitizedCarType = carType?.trim().slice(0, 50) || '';
    const sanitizedCarModel = carModel?.trim().slice(0, 50) || '';

    const { data, error } = await resend.emails.send({
      from: 'EliteCar <onboarding@resend.dev>',
      to: process.env.YOUR_EMAIL!,
      replyTo: sanitizedEmail,
      subject: `Nouveau contact de ${sanitizedName} - ${
        sanitizedService || 'Général'
      }`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
          <h2 style="color:#f59e0b;">Nouveau message de contact</h2>

          <p><strong>Nom:</strong> ${sanitizedName}</p>
          <p><strong>Email:</strong> ${sanitizedEmail}</p>
          <p><strong>Téléphone:</strong> ${sanitizedPhone || 'Non fourni'}</p>
          <p><strong>Service:</strong> ${sanitizedService || 'Non spécifié'}</p>
          <p><strong>Type de véhicule:</strong> ${sanitizedCarType || 'Non spécifié'}</p>
          <p><strong>Modèle:</strong> ${sanitizedCarModel || 'Non spécifié'}</p>

          <hr>

          <p><strong>Message:</strong></p>
          <p>${sanitizedMessage}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);

      return NextResponse.json(
        {
          success: false,
          error,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error('Server Error:', err);

    return NextResponse.json(
      {
        success: false,
        error: err,
      },
      {
        status: 500,
      }
    );
  }
}
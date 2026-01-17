import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json({ error: 'Telefone é obrigatório' }, { status: 400 });
    }

    // Clean phone number (remove non-digits)
    const cleanPhone = phone.replace(/\D/g, '');

    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: 'Telefone inválido' }, { status: 400 });
    }

    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiration (5 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Save OTP
    await db.otp.create({
      id: crypto.randomUUID(),
      phone: cleanPhone,
      code,
      expires_at: expiresAt.toISOString(),
      verified: false
    });

    // In a real app, send via WhatsApp API (Twilio/Z-API) here.
    // For now, log to console for dev purposes.
    console.log(`[DEV ONLY] OTP for ${cleanPhone}: ${code}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Código enviado para seu WhatsApp',
      // Return code in dev mode for easier testing
      dev_code: process.env.NODE_ENV !== 'production' ? code : undefined
    });

  } catch (error) {
    console.error('OTP Request error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

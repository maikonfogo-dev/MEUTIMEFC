import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phone, channel } = body as {
      email?: string;
      phone?: string;
      channel?: 'email' | 'whatsapp';
    };

    if (!email && !phone) {
      return NextResponse.json({ error: 'Email ou telefone é obrigatório' }, { status: 400 });
    }

    const finalChannel: 'email' | 'whatsapp' = channel || (phone ? 'whatsapp' : 'email');

    if (finalChannel === 'email') {
      if (!email) {
        return NextResponse.json({ error: 'Email é obrigatório para recuperação por email' }, { status: 400 });
      }

      const user = await db.users.findByEmail(email);

      if (!user || !user.email) {
        return NextResponse.json({
          success: true,
          message: 'Se este email estiver cadastrado, enviaremos um link para redefinir sua senha.'
        });
      }

      const resetToken = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

      await db.passwordResets.create({
        id: resetToken,
        userId: user.id,
        channel: 'email',
        contact: user.email,
        expires_at: expiresAt,
        used: false
      });

      const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}`;

      console.log('Password reset requested for', user.email, 'link:', resetLink);

      return NextResponse.json({
        success: true,
        message: 'Se este email estiver cadastrado, enviaremos um link para redefinir sua senha.',
        dev_reset_link: process.env.NODE_ENV === 'development' ? resetLink : undefined
      });
    }

    if (!phone) {
      return NextResponse.json({ error: 'Telefone é obrigatório para recuperação via WhatsApp' }, { status: 400 });
    }

    const cleanPhone = phone.replace(/\D/g, '');
    const user = await db.users.findByPhone(cleanPhone);

    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'Se este telefone estiver cadastrado, enviaremos instruções pelo WhatsApp.'
      });
    }

    const resetToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    await db.passwordResets.create({
      id: resetToken,
      userId: user.id,
      channel: 'whatsapp',
      contact: cleanPhone,
      expires_at: expiresAt,
      used: false
    });

    console.log('Password help via WhatsApp requested for', cleanPhone);

    return NextResponse.json({
      success: true,
      message: 'Se este telefone estiver cadastrado, enviaremos instruções pelo WhatsApp.'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}

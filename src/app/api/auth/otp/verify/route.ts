import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { cookies } from 'next/headers';
import { User } from '@/types/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone, code } = body;

    if (!phone || !code) {
      return NextResponse.json({ error: 'Telefone e código são obrigatórios' }, { status: 400 });
    }

    const cleanPhone = phone.replace(/\D/g, '');

    // 1. Verify OTP
    const validOtp = await db.otp.findValid(cleanPhone, code);

    if (!validOtp) {
      return NextResponse.json({ error: 'Código inválido ou expirado' }, { status: 400 });
    }

    // Mark OTP as verified
    await db.otp.markVerified(validOtp.id);

    // 2. Find or Create User
    let user = await db.users.findByPhone(cleanPhone);

    if (!user) {
      // Auto-register
      const newUser: User = {
        id: crypto.randomUUID(),
        name: `Usuário ${cleanPhone.slice(-4)}`,
        phone: cleanPhone,
        role: 'torcedor',
        is_socio: false,
        team_id: 'default-team',
        created_at: new Date().toISOString()
      };
      user = await db.users.create(newUser);
    }

    // 3. Generate Token
    const token = auth.generateToken(user);
    
    // 4. Set Cookie
    cookies().set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    // 5. Return User & Token
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        is_socio: user.is_socio,
        permissions: db.roles.getPermissions(user.role)
      },
      token
    });

  } catch (error) {
    console.error('OTP Verify error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

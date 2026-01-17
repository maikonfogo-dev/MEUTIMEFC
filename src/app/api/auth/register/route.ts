import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { User } from '@/types/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, teamId } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const existingUser = await db.users.findByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const finalPassword = password || Math.random().toString(36).slice(-8);
    const passwordHash = await auth.hashPassword(finalPassword);

    const newUser: User = {
      id: crypto.randomUUID(),
      name: name || email.split('@')[0],
      email,
      password_hash: passwordHash,
      role: 'torcedor',
      is_socio: false,
      team_id: teamId || 'default-team',
      created_at: new Date().toISOString()
    };

    const createdUser = await db.users.create(newUser);

    const token = auth.generateToken(createdUser);
    
    cookies().set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24
    });

    return NextResponse.json({
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
        is_socio: createdUser.is_socio,
        permissions: db.roles.getPermissions(createdUser.role)
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

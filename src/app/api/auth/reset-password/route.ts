import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, password } = body as { token?: string; password?: string };

    if (!token || !password) {
      return NextResponse.json({ error: 'Token e nova senha são obrigatórios' }, { status: 400 });
    }

    const reset = await db.passwordResets.findValid(token);

    if (!reset) {
      return NextResponse.json({ error: 'Link de redefinição inválido ou expirado' }, { status: 400 });
    }

    const user = await db.users.update(reset.userId, {});
    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const passwordHash = await auth.hashPassword(password);
    await db.users.update(reset.userId, { password_hash: passwordHash });
    await db.passwordResets.markUsed(token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET() {
  const token = cookies().get('auth_token')?.value;
  if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const decoded = auth.verifyToken(token);
  if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

  const sessions = (await db.sessions.findAll()).filter(s => s.isActive);
  
  // Add current session if not present (mocking it)
  if (!sessions.find(s => s.token === token)) {
      const currentSession = {
          id: 'current',
          userId: decoded.userId,
          token: token,
          ipAddress: '127.0.0.1', // Mock
          userAgent: 'Mozilla/5.0...', // Mock
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          isActive: true
      };
      sessions.push(currentSession);
  }

  return NextResponse.json(sessions);
}

export async function DELETE(request: Request) {
    const token = cookies().get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    const decoded = auth.verifyToken(token);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id === 'all') {
        await db.sessions.killAll();
    } else if (id) {
        await db.sessions.kill(id);
    }

    return NextResponse.json({ success: true });
}

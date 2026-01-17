import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { POST as registerPOST } from './register/route';
import { POST as loginPOST } from './login/route';
import { GET as meGET } from './me/route';

const cookieStore: Record<string, string> = {};

jest.mock('next/headers', () => ({
  cookies: () => ({
    get: (name: string) => {
      const value = cookieStore[name];
      return value ? { name, value } : undefined;
    },
    set: (name: string, value: string) => {
      cookieStore[name] = value;
    },
    delete: (name: string) => {
      delete cookieStore[name];
    }
  })
}));

describe('Fluxo de autenticação por email/senha', () => {
  it('registra, faz login e recupera usuário logado', async () => {
    const email = 'auth-flow@test.com';
    const password = '123456';

    await prisma.user.deleteMany({ where: { email } });

    const registerReq = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Teste', email, password })
    });

    const registerRes = await registerPOST(registerReq);
    expect(registerRes.status).toBe(200);

    const registerData: any = await registerRes.json();
    expect(registerData.user.email).toBe(email);

    const loginReq = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const loginRes = await loginPOST(loginReq);
    expect(loginRes.status).toBe(200);

    const loginData: any = await loginRes.json();
    expect(loginData.user.email).toBe(email);
    expect(loginData.token).toBeDefined();

    const decoded: any = auth.verifyToken(loginData.token);
    expect(decoded.userId).toBeDefined();

    const meRes = await meGET();
    expect(meRes.status).toBe(200);

    const meData: any = await meRes.json();
    expect(meData.user.email).toBe(email);
  });
});


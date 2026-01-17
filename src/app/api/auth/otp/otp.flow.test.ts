import prisma from '@/lib/prisma';
import { POST as otpRequestPOST } from './request/route';
import { POST as otpVerifyPOST } from './verify/route';

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

describe('Fluxo OTP via WhatsApp', () => {
  it('gera código, verifica e autentica usuário', async () => {
    const phone = '+55 (62) 99999-0000';
    const cleanPhone = phone.replace(/\D/g, '');

    await prisma.otp.deleteMany({ where: { phone: cleanPhone } });
    await prisma.user.deleteMany({ where: { phone: cleanPhone } });

    const requestReq = new Request('http://localhost/api/auth/otp/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });

    const requestRes = await otpRequestPOST(requestReq);
    expect(requestRes.status).toBe(200);

    const requestData: any = await requestRes.json();
    expect(requestData.success).toBe(true);
    expect(requestData.dev_code).toBeDefined();

    const code = requestData.dev_code as string;

    const verifyReq = new Request('http://localhost/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code })
    });

    const verifyRes = await otpVerifyPOST(verifyReq);
    expect(verifyRes.status).toBe(200);

    const verifyData: any = await verifyRes.json();
    expect(verifyData.user.phone).toBe(cleanPhone);
    expect(verifyData.token).toBeDefined();
  });

  it('retorna erro para código OTP inválido', async () => {
    const phone = '+55 (62) 98888-7777';
    const cleanPhone = phone.replace(/\D/g, '');

    await prisma.otp.deleteMany({ where: { phone: cleanPhone } });
    await prisma.user.deleteMany({ where: { phone: cleanPhone } });

    const requestReq = new Request('http://localhost/api/auth/otp/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });

    const requestRes = await otpRequestPOST(requestReq);
    expect(requestRes.status).toBe(200);

    const wrongCode = '000000';

    const verifyReq = new Request('http://localhost/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code: wrongCode })
    });

    const verifyRes = await otpVerifyPOST(verifyReq);
    expect(verifyRes.status).toBe(400);

    const verifyData: any = await verifyRes.json();
    expect(verifyData.error).toBe('Código inválido ou expirado');
  });

  it('retorna erro para código OTP expirado', async () => {
    const phone = '+55 (62) 97777-6666';
    const cleanPhone = phone.replace(/\D/g, '');

    await prisma.otp.deleteMany({ where: { phone: cleanPhone } });
    await prisma.user.deleteMany({ where: { phone: cleanPhone } });

    const requestReq = new Request('http://localhost/api/auth/otp/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });

    const requestRes = await otpRequestPOST(requestReq);
    expect(requestRes.status).toBe(200);

    const requestData: any = await requestRes.json();
    const code = requestData.dev_code as string;

    await prisma.otp.updateMany({
      where: { phone: cleanPhone, code },
      data: { expires_at: new Date(Date.now() - 60 * 1000) }
    });

    const verifyReq = new Request('http://localhost/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code })
    });

    const verifyRes = await otpVerifyPOST(verifyReq);
    expect(verifyRes.status).toBe(400);

    const verifyData: any = await verifyRes.json();
    expect(verifyData.error).toBe('Código inválido ou expirado');
  });
});

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import jwt from 'jsonwebtoken';
import { GET as settingsGET, PUT as settingsPUT } from './route';
import { GET as logsGET } from './logs/route';
import { GET as consentsGET } from './consents/route';
import { GET as sessionsGET, DELETE as sessionsDELETE } from './sessions/route';
import { db } from '@/lib/db';

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

async function ensureAdminUser() {
  const email = 'admin-settings@test.com';
  await prisma.user.deleteMany({ where: { email } });

  const teamId = 'settings-team';

  await prisma.team.upsert({
    where: { id: teamId },
    update: {},
    create: {
      id: teamId,
      name: 'Time Settings',
      planId: 'test'
    }
  });

  const user = await prisma.user.create({
    data: {
      name: 'Admin Settings',
      email,
      phone: null,
      password_hash: null,
      role: 'admin_time',
      is_socio: false,
      team_id: teamId
    }
  });

  const token = auth.generateToken({
    id: user.id,
    name: user.name,
    email: user.email ?? undefined,
    phone: undefined,
    password_hash: undefined,
    role: user.role,
    is_socio: user.is_socio,
    team_id: user.team_id,
    created_at: user.created_at.toISOString()
  });

  cookieStore['auth_token'] = token;

  return { user, teamId };
}

async function ensureTorcedorUser() {
  const email = 'torcedor-settings@test.com';
  await prisma.user.deleteMany({ where: { email } });

  const teamId = 'settings-team-torcedor';

  await prisma.team.upsert({
    where: { id: teamId },
    update: {},
    create: {
      id: teamId,
      name: 'Time Torcedor',
      planId: 'test'
    }
  });

  const user = await prisma.user.create({
    data: {
      name: 'Torcedor Settings',
      email,
      phone: null,
      password_hash: null,
      role: 'torcedor',
      is_socio: false,
      team_id: teamId
    }
  });

  const token = auth.generateToken({
    id: user.id,
    name: user.name,
    email: user.email ?? undefined,
    phone: undefined,
    password_hash: undefined,
    role: user.role,
    is_socio: user.is_socio,
    team_id: user.team_id,
    created_at: user.created_at.toISOString()
  });

  cookieStore['auth_token'] = token;

  return { user, teamId };
}

describe('Rotas protegidas de settings', () => {
  it('acessa GET /api/settings com usuário autenticado', async () => {
    await ensureAdminUser();

    const res = await settingsGET();
    expect(res.status).toBe(200);

    const data: any = await res.json();
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('general');
  });

  it('permite PUT /api/settings alterando security e payments com admin', async () => {
    await ensureAdminUser();

    const req = new Request('http://localhost/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        security: {
          passwordPolicy: {
            minLength: 10,
            requireNumbers: true,
            requireSymbols: true
          },
          loginMethods: {
            whatsapp: true,
            email: false,
            google: true
          },
          sessionTimeoutMinutes: 120
        },
        payments: {
          pixEnabled: true,
          creditCardEnabled: false,
          gateway: 'stripe',
          activePlan: 'pro',
          webhookUrl: 'https://example.com/webhook'
        }
      })
    });

    const res = await settingsPUT(req);
    expect(res.status).toBe(200);

    const data: any = await res.json();
    expect(data.security.passwordPolicy.minLength).toBe(10);
    expect(data.security.loginMethods.email).toBe(false);
    expect(data.security.sessionTimeoutMinutes).toBe(120);
    expect(data.payments.gateway).toBe('stripe');
    expect(data.payments.activePlan).toBe('pro');
    expect(data.payments.webhookUrl).toBe('https://example.com/webhook');
  });

  it('nega PUT /api/settings para usuário sem permissão', async () => {
    await ensureTorcedorUser();

    const req = new Request('http://localhost/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        general: {
          teamName: 'Alteração não permitida'
        }
      })
    });

    const res = await settingsPUT(req);
    expect(res.status).toBe(403);

    const data: any = await res.json();
    expect(data.error).toBe('Forbidden');
  });

  it('retorna logs filtrados por tenant em /api/settings/logs', async () => {
    const { user, teamId } = await ensureAdminUser();

    await db.settings.update(
      teamId,
      { general: { ...dataDefaults().general, teamName: 'Novo Nome' } } as any,
      user.id,
      user.email ?? undefined
    );

    const res = await logsGET();
    expect(res.status).toBe(200);

    const logs: any[] = await res.json();
    expect(Array.isArray(logs)).toBe(true);
  });

  it('retorna consents em /api/settings/consents', async () => {
    const { user } = await ensureAdminUser();

    await db.consents.create({
      id: crypto.randomUUID(),
      userId: user.id,
      consentType: 'privacy_policy',
      accepted: true,
      acceptedAt: new Date().toISOString(),
      ipAddress: '127.0.0.1'
    });

    const res = await consentsGET();
    expect(res.status).toBe(200);

    const consents: any[] = await res.json();
    expect(Array.isArray(consents)).toBe(true);
  });

  it('nega acesso a consents para usuário sem role adequada', async () => {
    const { user } = await ensureTorcedorUser();

    await db.consents.create({
      id: crypto.randomUUID(),
      userId: user.id,
      consentType: 'privacy_policy',
      accepted: true,
      acceptedAt: new Date().toISOString(),
      ipAddress: '127.0.0.1'
    });

    const res = await consentsGET();
    expect(res.status).toBe(403);

    const data: any = await res.json();
    expect(data.error).toBe('Unauthorized');
  });

  it('retorna sessões ativas em /api/settings/sessions', async () => {
    await ensureAdminUser();

    const res = await sessionsGET();
    expect(res.status).toBe(200);

    const sessions: any[] = await res.json();
    expect(Array.isArray(sessions)).toBe(true);
    expect(sessions.length).toBeGreaterThan(0);
  });

  it('retorna 400 em PUT /api/settings com tipos inesperados', async () => {
    await ensureAdminUser();

    const req = new Request('http://localhost/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        security: {
          passwordPolicy: {
            minLength: '10',
            requireNumbers: 'yes',
            requireSymbols: 1
          },
          loginMethods: {
            whatsapp: 'true',
            email: 'false',
            google: 123
          },
          sessionTimeoutMinutes: '60'
        },
        general: {
          teamName: 123,
          logoUrl: 456,
          primaryColor: 789,
          secondaryColor: 101112,
          language: 'fr-FR',
          timezone: 131415
        },
        lgpd: {
          privacyPolicy: 123,
          dataRetentionMonths: '12',
          cookieConsentRequired: 'yes',
          dpoEmail: 456
        },
        store: {
          enabled: 'yes',
          defaultProfitMargin: '30',
          minStockAlert: '5',
          shippingFlatRate: '15.00',
          oneClickCheckout: 'no'
        },
        leagues: {
          currentSeason: 2026,
          defaultPointsWin: '3',
          defaultPointsDraw: '1',
          maxTeamsPerLeague: '20',
          regulationUrl: 123
        },
        broadcast: {
          enabled: 'yes',
          platform: 'vimeo',
          streamDelaySeconds: '0',
          monetizationEnabled: 'no'
        },
        notifications: {
          whatsappEnabled: 'yes',
          emailEnabled: 'yes',
          pushEnabled: 'yes',
          welcomeTemplateId: 123,
          matchReminderTemplateId: 456
        }
      })
    });

    const res = await settingsPUT(req);
    expect(res.status).toBe(400);

    const data: any = await res.json();
    expect(data.error).toBe('Invalid settings payload');
    expect(Array.isArray(data.fields)).toBe(true);
    expect(data.fields).toEqual(
      expect.arrayContaining([
        'security.passwordPolicy.minLength',
        'security.passwordPolicy.requireNumbers',
        'security.passwordPolicy.requireSymbols',
        'security.loginMethods.whatsapp',
        'security.loginMethods.email',
        'security.loginMethods.google',
        'security.sessionTimeoutMinutes',
        'general.teamName',
        'general.logoUrl',
        'general.primaryColor',
        'general.secondaryColor',
        'general.language',
        'general.timezone',
        'lgpd.privacyPolicy',
        'lgpd.dataRetentionMonths',
        'lgpd.cookieConsentRequired',
        'lgpd.dpoEmail',
        'store.enabled',
        'store.defaultProfitMargin',
        'store.minStockAlert',
        'store.shippingFlatRate',
        'store.oneClickCheckout',
        'leagues.currentSeason',
        'leagues.defaultPointsWin',
        'leagues.defaultPointsDraw',
        'leagues.maxTeamsPerLeague',
        'leagues.regulationUrl',
        'broadcast.enabled',
        'broadcast.platform',
        'broadcast.streamDelaySeconds',
        'broadcast.monetizationEnabled',
        'notifications.whatsappEnabled',
        'notifications.emailEnabled',
        'notifications.pushEnabled',
        'notifications.welcomeTemplateId',
        'notifications.matchReminderTemplateId'
      ])
    );
  });

  it('desativa todas as sessões ao chamar DELETE /api/settings/sessions?id=all', async () => {
    const { user } = await ensureAdminUser();

    const now = Date.now();

    await db.sessions.create({
      id: `session-all-1-${now}`,
      userId: user.id,
      token: 'token-all-1',
      ipAddress: '127.0.0.1',
      userAgent: 'jest-test',
      createdAt: new Date(now - 1000).toISOString(),
      expiresAt: new Date(now + 60 * 60 * 1000).toISOString(),
      isActive: true
    });

    await db.sessions.create({
      id: `session-all-2-${now}`,
      userId: user.id,
      token: 'token-all-2',
      ipAddress: '127.0.0.1',
      userAgent: 'jest-test',
      createdAt: new Date(now - 2000).toISOString(),
      expiresAt: new Date(now + 60 * 60 * 1000).toISOString(),
      isActive: true
    });

    const beforeRes = await sessionsGET();
    const beforeSessions: any[] = await beforeRes.json();
    const beforeIds = beforeSessions.map(s => s.id);
    expect(beforeIds.join(',')).toContain('session-all-1-');
    expect(beforeIds.join(',')).toContain('session-all-2-');

    const deleteReq = new Request('http://localhost/api/settings/sessions?id=all', {
      method: 'DELETE'
    });

    const deleteRes = await sessionsDELETE(deleteReq);
    expect(deleteRes.status).toBe(200);

    const afterRes = await sessionsGET();
    const afterSessions: any[] = await afterRes.json();
    const afterIds = afterSessions.map(s => s.id);
    expect(afterIds.join(',')).not.toContain('session-all-1-');
    expect(afterIds.join(',')).not.toContain('session-all-2-');
  });

  it('desativa sessão específica ao chamar DELETE /api/settings/sessions?id={id}', async () => {
    const { user } = await ensureAdminUser();

    const now = Date.now();

    await db.sessions.create({
      id: `session-one-1-${now}`,
      userId: user.id,
      token: 'token-one-1',
      ipAddress: '127.0.0.1',
      userAgent: 'jest-test',
      createdAt: new Date(now - 1000).toISOString(),
      expiresAt: new Date(now + 60 * 60 * 1000).toISOString(),
      isActive: true
    });

    await db.sessions.create({
      id: `session-one-2-${now}`,
      userId: user.id,
      token: 'token-one-2',
      ipAddress: '127.0.0.1',
      userAgent: 'jest-test',
      createdAt: new Date(now - 2000).toISOString(),
      expiresAt: new Date(now + 60 * 60 * 1000).toISOString(),
      isActive: true
    });

    const beforeRes = await sessionsGET();
    const beforeSessions: any[] = await beforeRes.json();
    const beforeIds = beforeSessions.map(s => s.id);
    const firstId = beforeIds.find(id => id.startsWith('session-one-1-'));
    const secondId = beforeIds.find(id => id.startsWith('session-one-2-'));
    expect(firstId).toBeDefined();
    expect(secondId).toBeDefined();

    const deleteReq = new Request(`http://localhost/api/settings/sessions?id=${firstId}`, {
      method: 'DELETE'
    });

    const deleteRes = await sessionsDELETE(deleteReq);
    expect(deleteRes.status).toBe(200);

    const afterRes = await sessionsGET();
    const afterSessions: any[] = await afterRes.json();
    const afterIds = afterSessions.map(s => s.id);
    expect(afterIds).not.toContain(firstId);
    expect(afterIds).toEqual(expect.arrayContaining([secondId]));
  });

   it('retorna 401 para GET /api/settings com token inválido', async () => {
    cookieStore['auth_token'] = 'invalid-token';

    const res = await settingsGET();
    expect(res.status).toBe(401);

    const data: any = await res.json();
    expect(data.error).toBe('Invalid token');
  });

  it('retorna 401 para GET /api/settings com token expirado', async () => {
    const secret = process.env.JWT_SECRET || 'default-secret-key-change-in-prod';
    const expiredToken = jwt.sign(
      { userId: 'user-expired', role: 'admin_time', teamId: 'team', isSocio: false, permissions: [] },
      secret,
      { expiresIn: '-1s' }
    );

    cookieStore['auth_token'] = expiredToken;

    const res = await settingsGET();
    expect(res.status).toBe(401);

    const data: any = await res.json();
    expect(data.error).toBe('Invalid token');
  });

  it('retorna 401 para logs com token inválido', async () => {
    cookieStore['auth_token'] = 'invalid-token';

    const res = await logsGET();
    expect(res.status).toBe(401);

    const data: any = await res.json();
    expect(data.error).toBe('Invalid token');
  });

  it('retorna 401 para sessions com token inválido', async () => {
    cookieStore['auth_token'] = 'invalid-token';

    const res = await sessionsGET();
    expect(res.status).toBe(401);

    const data: any = await res.json();
    expect(data.error).toBe('Invalid token');
  });

  it('retorna 401 para consents com token inválido', async () => {
    cookieStore['auth_token'] = 'invalid-token';

    const res = await consentsGET();
    expect(res.status).toBe(401);

    const data: any = await res.json();
    expect(data.error).toBe('Invalid token');
  });

  it('retorna 401 ao acessar logs sem autenticação', async () => {
    delete cookieStore['auth_token'];

    const res = await logsGET();
    expect(res.status).toBe(401);

    const data: any = await res.json();
    expect(data.error).toBe('Not authenticated');
  });

  it('retorna 401 ao acessar sessions sem autenticação', async () => {
    delete cookieStore['auth_token'];

    const res = await sessionsGET();
    expect(res.status).toBe(401);

    const data: any = await res.json();
    expect(data.error).toBe('Not authenticated');
  });
});

function dataDefaults() {
  return {
    general: {
      teamName: 'Meu Time FC',
      logoUrl: '/logo.png',
      primaryColor: '#0F5132',
      secondaryColor: '#2ECC71',
      language: 'pt-BR',
      timezone: 'America/Sao_Paulo'
    }
  };
}

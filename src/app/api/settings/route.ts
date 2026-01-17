import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { SystemSettings } from '@/types/settings';

export async function GET() {
  const token = cookies().get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const decoded = auth.verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const users = await db.users.findAll();
  const user = users.find(u => u.id === decoded.userId);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Determine Tenant ID
  // Super Admin -> global
  // Admin Time -> user.team_id
  // Organizer -> user.leagueId (assuming structure, falling back to global or team)
  
  let tenantId = 'global';
  if (user.role === 'admin_time' && user.team_id) {
    tenantId = user.team_id;
  } else if (user.role === 'organizador_liga' && (user as any).leagueId) {
    tenantId = (user as any).leagueId;
  }

  const settings = await db.settings.get(tenantId);

  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const token = cookies().get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const decoded = auth.verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const users = await db.users.findAll();
  const user = users.find(u => u.id === decoded.userId);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const permissions = db.roles.getPermissions(user.role);
  if (!permissions.includes('sistema.configuracoes')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let tenantId = 'global';
  if (user.role === 'admin_time' && user.team_id) {
    tenantId = user.team_id;
  } else if (user.role === 'organizador_liga' && (user as any).leagueId) {
    tenantId = (user as any).leagueId;
  }

  try {
    const body = await request.json();
    const updates = body as Partial<SystemSettings>;
    
    delete (updates as any).id;

    const validationErrors: string[] = [];

    if (updates.security) {
      const sec = updates.security as any;
      if (sec.passwordPolicy) {
        const pp = sec.passwordPolicy;
        if (pp.minLength !== undefined && typeof pp.minLength !== 'number') {
          validationErrors.push('security.passwordPolicy.minLength');
        }
        if (pp.requireNumbers !== undefined && typeof pp.requireNumbers !== 'boolean') {
          validationErrors.push('security.passwordPolicy.requireNumbers');
        }
        if (pp.requireSymbols !== undefined && typeof pp.requireSymbols !== 'boolean') {
          validationErrors.push('security.passwordPolicy.requireSymbols');
        }
      }
      if (sec.loginMethods) {
        const lm = sec.loginMethods;
        if (lm.whatsapp !== undefined && typeof lm.whatsapp !== 'boolean') {
          validationErrors.push('security.loginMethods.whatsapp');
        }
        if (lm.email !== undefined && typeof lm.email !== 'boolean') {
          validationErrors.push('security.loginMethods.email');
        }
        if (lm.google !== undefined && typeof lm.google !== 'boolean') {
          validationErrors.push('security.loginMethods.google');
        }
      }
      if (sec.sessionTimeoutMinutes !== undefined && typeof sec.sessionTimeoutMinutes !== 'number') {
        validationErrors.push('security.sessionTimeoutMinutes');
      }
    }

    if (updates.payments) {
      const pay = updates.payments as any;
      if (pay.pixEnabled !== undefined && typeof pay.pixEnabled !== 'boolean') {
        validationErrors.push('payments.pixEnabled');
      }
      if (pay.creditCardEnabled !== undefined && typeof pay.creditCardEnabled !== 'boolean') {
        validationErrors.push('payments.creditCardEnabled');
      }
      if (pay.gateway !== undefined && !['mercadopago', 'stripe', 'pagarme'].includes(pay.gateway)) {
        validationErrors.push('payments.gateway');
      }
      if (pay.activePlan !== undefined && !['free', 'pro', 'enterprise'].includes(pay.activePlan)) {
        validationErrors.push('payments.activePlan');
      }
      if (pay.webhookUrl !== undefined && typeof pay.webhookUrl !== 'string') {
        validationErrors.push('payments.webhookUrl');
      }
    }

    if (updates.general) {
      const gen = updates.general as any;
      if (gen.teamName !== undefined && typeof gen.teamName !== 'string') validationErrors.push('general.teamName');
      if (gen.logoUrl !== undefined && typeof gen.logoUrl !== 'string') validationErrors.push('general.logoUrl');
      if (gen.primaryColor !== undefined && typeof gen.primaryColor !== 'string') validationErrors.push('general.primaryColor');
      if (gen.secondaryColor !== undefined && typeof gen.secondaryColor !== 'string') validationErrors.push('general.secondaryColor');
      if (gen.language !== undefined && !['pt-BR', 'en-US', 'es'].includes(gen.language)) validationErrors.push('general.language');
      if (gen.timezone !== undefined && typeof gen.timezone !== 'string') validationErrors.push('general.timezone');
    }

    if (updates.lgpd) {
      const lgpd = updates.lgpd as any;
      if (lgpd.privacyPolicy !== undefined && typeof lgpd.privacyPolicy !== 'string') validationErrors.push('lgpd.privacyPolicy');
      if (lgpd.dataRetentionMonths !== undefined && typeof lgpd.dataRetentionMonths !== 'number') validationErrors.push('lgpd.dataRetentionMonths');
      if (lgpd.cookieConsentRequired !== undefined && typeof lgpd.cookieConsentRequired !== 'boolean') validationErrors.push('lgpd.cookieConsentRequired');
      if (lgpd.dpoEmail !== undefined && typeof lgpd.dpoEmail !== 'string') validationErrors.push('lgpd.dpoEmail');
    }

    if (updates.store) {
      const store = updates.store as any;
      if (store.enabled !== undefined && typeof store.enabled !== 'boolean') validationErrors.push('store.enabled');
      if (store.defaultProfitMargin !== undefined && typeof store.defaultProfitMargin !== 'number') validationErrors.push('store.defaultProfitMargin');
      if (store.minStockAlert !== undefined && typeof store.minStockAlert !== 'number') validationErrors.push('store.minStockAlert');
      if (store.shippingFlatRate !== undefined && typeof store.shippingFlatRate !== 'number') validationErrors.push('store.shippingFlatRate');
      if (store.oneClickCheckout !== undefined && typeof store.oneClickCheckout !== 'boolean') validationErrors.push('store.oneClickCheckout');
    }

    if (updates.leagues) {
      const leagues = updates.leagues as any;
      if (leagues.currentSeason !== undefined && typeof leagues.currentSeason !== 'string') validationErrors.push('leagues.currentSeason');
      if (leagues.defaultPointsWin !== undefined && typeof leagues.defaultPointsWin !== 'number') validationErrors.push('leagues.defaultPointsWin');
      if (leagues.defaultPointsDraw !== undefined && typeof leagues.defaultPointsDraw !== 'number') validationErrors.push('leagues.defaultPointsDraw');
      if (leagues.maxTeamsPerLeague !== undefined && typeof leagues.maxTeamsPerLeague !== 'number') validationErrors.push('leagues.maxTeamsPerLeague');
      if (leagues.regulationUrl !== undefined && typeof leagues.regulationUrl !== 'string') validationErrors.push('leagues.regulationUrl');
    }

    if (updates.broadcast) {
      const broadcast = updates.broadcast as any;
      if (broadcast.enabled !== undefined && typeof broadcast.enabled !== 'boolean') validationErrors.push('broadcast.enabled');
      if (broadcast.platform !== undefined && !['youtube', 'twitch', 'rtmp'].includes(broadcast.platform)) validationErrors.push('broadcast.platform');
      if (broadcast.streamDelaySeconds !== undefined && typeof broadcast.streamDelaySeconds !== 'number') validationErrors.push('broadcast.streamDelaySeconds');
      if (broadcast.monetizationEnabled !== undefined && typeof broadcast.monetizationEnabled !== 'boolean') validationErrors.push('broadcast.monetizationEnabled');
    }

    if (updates.notifications) {
      const notif = updates.notifications as any;
      if (notif.whatsappEnabled !== undefined && typeof notif.whatsappEnabled !== 'boolean') validationErrors.push('notifications.whatsappEnabled');
      if (notif.emailEnabled !== undefined && typeof notif.emailEnabled !== 'boolean') validationErrors.push('notifications.emailEnabled');
      if (notif.pushEnabled !== undefined && typeof notif.pushEnabled !== 'boolean') validationErrors.push('notifications.pushEnabled');
      if (notif.welcomeTemplateId !== undefined && typeof notif.welcomeTemplateId !== 'string') validationErrors.push('notifications.welcomeTemplateId');
      if (notif.matchReminderTemplateId !== undefined && typeof notif.matchReminderTemplateId !== 'string') validationErrors.push('notifications.matchReminderTemplateId');
    }

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Invalid settings payload', fields: validationErrors },
        { status: 400 }
      );
    }
    
    const updatedSettings = await db.settings.update(
      tenantId, 
      {
        ...updates,
        updatedBy: user.email
      }, 
      user.id, 
      user.email
    );

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}

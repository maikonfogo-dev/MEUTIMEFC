import fs from 'fs';
import path from 'path';
import { User as AuthUser, OTP, PermissionKey, PasswordReset as PasswordResetType } from '@/types/auth';
import { SystemSettings, DEFAULT_SETTINGS, SettingsLog, UserSession, PrivacyConsent } from '@/types/settings';
import prisma from '@/lib/prisma';

const DATA_DIR = path.join(process.cwd(), 'data');

// RBAC Configuration (Expanded)
const ROLES_CONFIG: Record<string, PermissionKey[]> = {
  'torcedor': [
    'loja.ver', 
    'loja.comprar', 
    'view_loja', 
    'comprar_produto', 
    'ver_campeonatos'
  ],
  'socio': [
    // Torcedor
    'loja.ver', 
    'loja.comprar', 
    'view_loja', 
    'comprar_produto', 
    'ver_campeonatos',
    // Sócio Exclusives
    'checkout_1_click', 
    'acesso_beneficios'
  ],
  'admin_time': [
    'loja.ver',
    'loja.criar_produto',
    'loja.editar_produto',
    'loja.ver_pedidos',
    'transmissao.ver_metricas',
    'auth.gerenciar_usuarios',
    'sistema.configuracoes', // Allow settings access
    // Legacy
    'gerenciar_produtos', 
    'gerenciar_pedidos', 
    'ver_relatorios'
  ],
  'organizador_liga': [
    'liga.criar',
    'liga.editar',
    'liga.publicar',
    'liga.ver_dashboard',
    'transmissao.iniciar',
    'transmissao.encerrar',
    'transmissao.ver_metricas',
    'sistema.configuracoes', // Allow settings access
    // Legacy
    'criar_campeonato', 
    'gerenciar_times', 
    'gerenciar_tabela'
  ],
  'arbitro': [
    'ver_escalas', 
    'registrar_resultados'
  ],
  'super_admin': [
    'sistema.configuracoes',
    'auth.gerenciar_permissoes',
    'auth.gerenciar_usuarios',
    'loja.ver_pedidos',
    'liga.ver_dashboard'
  ]
};

// Map legacy 'admin' and 'organizador' to new names for compatibility
const ROLE_MAPPING: Record<string, string> = {
  'admin': 'admin_time',
  'organizador': 'organizador_liga'
};

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const prismaAny = prisma as any;

export const db = {
  users: {
    findAll: async (): Promise<AuthUser[]> => {
      const users = await prisma.user.findMany();
      return users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email ?? undefined,
        phone: u.phone ?? undefined,
        password_hash: u.password_hash ?? undefined,
        role: u.role,
        is_socio: u.is_socio,
        team_id: u.team_id,
        created_at: u.created_at.toISOString()
      }));
    },

    findByEmail: async (email: string): Promise<AuthUser | undefined> => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return undefined;
      return {
        id: user.id,
        name: user.name,
        email: user.email ?? undefined,
        phone: user.phone ?? undefined,
        password_hash: user.password_hash ?? undefined,
        role: user.role,
        is_socio: user.is_socio,
        team_id: user.team_id,
        created_at: user.created_at.toISOString()
      };
    },

    findByPhone: async (phone: string): Promise<AuthUser | undefined> => {
      const user = await prisma.user.findUnique({ where: { phone } });
      if (!user) return undefined;
      return {
        id: user.id,
        name: user.name,
        email: user.email ?? undefined,
        phone: user.phone ?? undefined,
        password_hash: user.password_hash ?? undefined,
        role: user.role,
        is_socio: user.is_socio,
        team_id: user.team_id,
        created_at: user.created_at.toISOString()
      };
    },

    create: async (user: AuthUser): Promise<AuthUser> => {
      const created = await prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email ?? null,
          phone: user.phone ?? null,
          password_hash: user.password_hash ?? null,
          role: user.role,
          is_socio: user.is_socio,
          team_id: user.team_id,
          created_at: new Date(user.created_at)
        }
      });

      return {
        id: created.id,
        name: created.name,
        email: created.email ?? undefined,
        phone: created.phone ?? undefined,
        password_hash: created.password_hash ?? undefined,
        role: created.role,
        is_socio: created.is_socio,
        team_id: created.team_id,
        created_at: created.created_at.toISOString()
      };
    },

    update: async (userId: string, updates: Partial<AuthUser>): Promise<AuthUser | null> => {
      try {
        const updated = await prisma.user.update({
          where: { id: userId },
          data: {
            name: updates.name,
            email: updates.email ?? null,
            phone: updates.phone ?? null,
            password_hash: updates.password_hash ?? null,
            role: updates.role,
            is_socio: updates.is_socio,
            team_id: updates.team_id,
            created_at: updates.created_at ? new Date(updates.created_at) : undefined
          }
        });

        return {
          id: updated.id,
          name: updated.name,
          email: updated.email ?? undefined,
          phone: updated.phone ?? undefined,
          password_hash: updated.password_hash ?? undefined,
          role: updated.role,
          is_socio: updated.is_socio,
          team_id: updated.team_id,
          created_at: updated.created_at.toISOString()
        };
      } catch {
        return null;
      }
    }
  },

  roles: {
    getPermissions: (roleName: string): PermissionKey[] => {
      const mappedRole = ROLE_MAPPING[roleName] || roleName;
      return ROLES_CONFIG[mappedRole] || ROLES_CONFIG['torcedor'];
    }
  },

  settings: {
    get: async (tenantId: string = 'global'): Promise<SystemSettings> => {
      const record = await prismaAny.systemSettings.findUnique({
        where: { id: tenantId }
      });

      if (!record) {
        const settingsToPersist: SystemSettings = {
          ...DEFAULT_SETTINGS,
          id: tenantId
        };

        await prismaAny.systemSettings.create({
          data: {
            id: tenantId,
            data: settingsToPersist
          }
        });

        return settingsToPersist;
      }

      const data = record.data as SystemSettings;

      return {
        ...data,
        id: record.id
      };
    },
    
    update: async (tenantId: string, updates: Partial<SystemSettings>, userId?: string, userEmail?: string): Promise<SystemSettings> => {
      const existing = await prismaAny.systemSettings.findUnique({
        where: { id: tenantId }
      });
      
      const currentSettings: SystemSettings = existing
        ? { ...(existing.data as SystemSettings), id: tenantId }
        : { ...DEFAULT_SETTINGS, id: tenantId };

      const oldSettings: SystemSettings = { ...currentSettings };
      
      const newSettings: SystemSettings = {
        ...currentSettings,
        ...updates,
        updatedAt: new Date().toISOString()
      };

      await prismaAny.systemSettings.upsert({
        where: { id: tenantId },
        update: { data: newSettings },
        create: { id: tenantId, data: newSettings }
      });

      if (userId && userEmail) {
        const updatedModules = Object.keys(updates) as (keyof SystemSettings)[];

        for (const m of updatedModules) {
          if (m === 'id' || m === 'updatedAt') continue;

          await db.logs.create({
            id: crypto.randomUUID(),
            tenantId,
            userId,
            userEmail,
            module: m as any,
            action: 'UPDATE',
            oldValue: (oldSettings as any)[m],
            newValue: (newSettings as any)[m],
            createdAt: new Date().toISOString()
          });
        }
      }

      return newSettings;
    }
  },

  logs: {
    findAll: async (): Promise<SettingsLog[]> => {
      const records = await prismaAny.settingsLog.findMany({
        orderBy: { createdAt: 'desc' }
      });

      return records.map((log: any) => ({
        id: log.id,
        tenantId: log.tenantId,
        userId: log.userId,
        userEmail: log.userEmail,
        module: log.module as any,
        action: log.action,
        oldValue: log.oldValue as any,
        newValue: log.newValue as any,
        createdAt: log.createdAt.toISOString()
      }));
    },

    create: async (log: SettingsLog): Promise<SettingsLog> => {
      await prismaAny.settingsLog.create({
        data: {
          id: log.id,
          tenantId: log.tenantId,
          userId: log.userId,
          userEmail: log.userEmail,
          module: log.module,
          action: log.action,
          oldValue: log.oldValue,
          newValue: log.newValue,
          createdAt: new Date(log.createdAt)
        }
      });

      return log;
    }
  },

  sessions: {
    findAll: async (): Promise<UserSession[]> => {
      const records = await prismaAny.userSession.findMany();

      return records.map((session: any) => ({
        id: session.id,
        userId: session.userId,
        token: session.token,
        ipAddress: session.ipAddress,
        userAgent: session.userAgent,
        createdAt: session.createdAt.toISOString(),
        expiresAt: session.expiresAt.toISOString(),
        isActive: session.isActive
      }));
    },

    create: async (session: UserSession): Promise<UserSession> => {
      const created = await prismaAny.userSession.create({
        data: {
          id: session.id,
          userId: session.userId,
          token: session.token,
          ipAddress: session.ipAddress,
          userAgent: session.userAgent,
          createdAt: new Date(session.createdAt),
          expiresAt: new Date(session.expiresAt),
          isActive: session.isActive
        }
      });

      return {
        id: created.id,
        userId: created.userId,
        token: created.token,
        ipAddress: created.ipAddress,
        userAgent: created.userAgent,
        createdAt: created.createdAt.toISOString(),
        expiresAt: created.expiresAt.toISOString(),
        isActive: created.isActive
      };
    },

    kill: async (sessionId: string): Promise<void> => {
      await prismaAny.userSession.updateMany({
        where: { id: sessionId },
        data: { isActive: false }
      });
    },

    killAll: async (): Promise<void> => {
      await prismaAny.userSession.updateMany({
        data: { isActive: false }
      });
    }
  },

  consents: {
    findAll: async (): Promise<PrivacyConsent[]> => {
      const records = await prismaAny.privacyConsent.findMany();

      return records.map((consent: any) => ({
        id: consent.id,
        userId: consent.userId,
        consentType: consent.consentType as any,
        accepted: consent.accepted,
        acceptedAt: consent.acceptedAt.toISOString(),
        ipAddress: consent.ipAddress
      }));
    },

    create: async (consent: PrivacyConsent): Promise<PrivacyConsent> => {
      const created = await prismaAny.privacyConsent.create({
        data: {
          id: consent.id,
          userId: consent.userId,
          consentType: consent.consentType,
          accepted: consent.accepted,
          acceptedAt: new Date(consent.acceptedAt),
          ipAddress: consent.ipAddress
        }
      });

      return {
        id: created.id,
        userId: created.userId,
        consentType: created.consentType as any,
        accepted: created.accepted,
        acceptedAt: created.acceptedAt.toISOString(),
        ipAddress: created.ipAddress
      };
    }
  },

  otp: {
    findAll: async (): Promise<OTP[]> => {
      const records = await prismaAny.otp.findMany();

      return records.map((otp: any) => ({
        id: otp.id,
        phone: otp.phone,
        code: otp.code,
        expires_at: otp.expires_at.toISOString(),
        verified: otp.verified
      }));
    },

    create: async (otp: OTP): Promise<OTP> => {
      await prismaAny.otp.deleteMany({
        where: { phone: otp.phone }
      });

      const created = await prismaAny.otp.create({
        data: {
          id: otp.id,
          phone: otp.phone,
          code: otp.code,
          expires_at: new Date(otp.expires_at),
          verified: otp.verified
        }
      });

      return {
        id: created.id,
        phone: created.phone,
        code: created.code,
        expires_at: created.expires_at.toISOString(),
        verified: created.verified
      };
    },

    findValid: async (phone: string, code: string): Promise<OTP | undefined> => {
      const record = await prismaAny.otp.findFirst({
        where: {
          phone,
          code,
          verified: false,
          expires_at: { gt: new Date() }
        }
      });

      if (!record) {
        return undefined;
      }

      return {
        id: record.id,
        phone: record.phone,
        code: record.code,
        expires_at: record.expires_at.toISOString(),
        verified: record.verified
      };
    },

    markVerified: async (id: string): Promise<void> => {
      await prismaAny.otp.updateMany({
        where: { id },
        data: { verified: true }
      });
    }
  },

  passwordResets: {
    findAll: async (): Promise<PasswordResetType[]> => {
      const resets = await prisma.passwordReset.findMany();
      return resets.map(r => ({
        id: r.id,
        userId: r.userId,
        channel: r.channel as any,
        contact: r.contact,
        expires_at: r.expires_at.toISOString(),
        used: r.used
      }));
    },

    create: async (reset: PasswordResetType): Promise<PasswordResetType> => {
      await prisma.passwordReset.deleteMany({
        where: {
          userId: reset.userId,
          channel: reset.channel
        }
      });

      const created = await prisma.passwordReset.create({
        data: {
          id: reset.id,
          userId: reset.userId,
          channel: reset.channel,
          contact: reset.contact,
          expires_at: new Date(reset.expires_at),
          used: reset.used
        }
      });

      return {
        id: created.id,
        userId: created.userId,
        channel: created.channel as any,
        contact: created.contact,
        expires_at: created.expires_at.toISOString(),
        used: created.used
      };
    },

    findValid: async (token: string): Promise<PasswordResetType | undefined> => {
      const reset = await prisma.passwordReset.findFirst({
        where: {
          id: token,
          used: false,
          expires_at: { gt: new Date() }
        }
      });

      if (!reset) return undefined;

      return {
        id: reset.id,
        userId: reset.userId,
        channel: reset.channel as any,
        contact: reset.contact,
        expires_at: reset.expires_at.toISOString(),
        used: reset.used
      };
    },

    markUsed: async (token: string) => {
      await prisma.passwordReset.updateMany({
        where: { id: token },
        data: { used: true }
      });
    }
  }
};

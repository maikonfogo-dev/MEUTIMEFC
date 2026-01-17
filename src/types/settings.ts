export type SettingsModule = 
  | 'general' 
  | 'users' 
  | 'security' 
  | 'lgpd' 
  | 'payments' 
  | 'store' 
  | 'leagues' 
  | 'broadcast' 
  | 'notifications' 
  | 'integrations';

export interface GeneralSettings {
  teamName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  language: 'pt-BR' | 'en-US' | 'es';
  timezone: string;
}

export interface SecuritySettings {
  passwordPolicy: {
    minLength: number;
    requireNumbers: boolean;
    requireSymbols: boolean;
  };
  loginMethods: {
    whatsapp: boolean;
    email: boolean;
    google: boolean;
  };
  sessionTimeoutMinutes: number;
}

export interface LGPDSettings {
  privacyPolicy: string; // Markdown content
  dataRetentionMonths: number;
  cookieConsentRequired: boolean;
  dpoEmail: string;
}

export interface PaymentSettings {
  pixEnabled: boolean;
  creditCardEnabled: boolean;
  gateway: 'mercadopago' | 'stripe' | 'pagarme';
  activePlan: 'free' | 'pro' | 'enterprise';
  webhookUrl?: string;
}

export interface StoreSettings {
  enabled: boolean;
  defaultProfitMargin: number;
  minStockAlert: number;
  shippingFlatRate: number;
  oneClickCheckout: boolean;
}

export interface LeagueSettings {
  currentSeason: string;
  defaultPointsWin: number;
  defaultPointsDraw: number;
  maxTeamsPerLeague: number;
  regulationUrl?: string;
}

export interface BroadcastSettings {
  enabled: boolean;
  platform: 'youtube' | 'twitch' | 'rtmp';
  streamDelaySeconds: number;
  monetizationEnabled: boolean;
}

export interface NotificationSettings {
  whatsappEnabled: boolean;
  emailEnabled: boolean;
  pushEnabled: boolean;
  welcomeTemplateId?: string;
  matchReminderTemplateId?: string;
}

export interface IntegrationSettings {
  webhooks: {
    url: string;
    events: string[];
    active: boolean;
  }[];
  apiKeys: {
    id: string;
    name: string;
    key: string; // masked
    createdAt: string;
  }[];
}

export interface SettingsLog {
  id: string;
  tenantId: string;
  userId: string;
  userEmail: string; // Denormalized for display
  module: SettingsModule;
  action: string;
  oldValue?: any;
  newValue?: any;
  createdAt: string;
}

export interface UserSession {
  id: string;
  userId: string;
  token: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
}

export interface PrivacyConsent {
  id: string;
  userId: string;
  consentType: 'privacy_policy' | 'cookie_usage' | 'marketing';
  accepted: boolean;
  acceptedAt: string;
  ipAddress: string;
}

export interface SystemSettings {
  id: string; // usually tenantId or 'global'
  general: GeneralSettings;
  security: SecuritySettings;
  lgpd: LGPDSettings;
  payments: PaymentSettings;
  store: StoreSettings;
  leagues: LeagueSettings;
  broadcast: BroadcastSettings;
  notifications: NotificationSettings;
  integrations: IntegrationSettings;
  updatedAt: string;
  updatedBy: string;
}

export const DEFAULT_SETTINGS: SystemSettings = {
  id: 'global',
  updatedAt: new Date().toISOString(),
  updatedBy: 'system',
  general: {
    teamName: 'Meu Time FC',
    logoUrl: '/logo.png',
    primaryColor: '#0F5132',
    secondaryColor: '#2ECC71',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo'
  },
  security: {
    passwordPolicy: { minLength: 8, requireNumbers: true, requireSymbols: false },
    loginMethods: { whatsapp: true, email: true, google: false },
    sessionTimeoutMinutes: 60
  },
  lgpd: {
    privacyPolicy: '# Política de Privacidade\n\n...',
    dataRetentionMonths: 12,
    cookieConsentRequired: true,
    dpoEmail: 'dpo@meutimefc.com'
  },
  payments: {
    pixEnabled: true,
    creditCardEnabled: true,
    gateway: 'mercadopago',
    activePlan: 'free'
  },
  store: {
    enabled: true,
    defaultProfitMargin: 30,
    minStockAlert: 5,
    shippingFlatRate: 15.00,
    oneClickCheckout: true
  },
  leagues: {
    currentSeason: '2026',
    defaultPointsWin: 3,
    defaultPointsDraw: 1,
    maxTeamsPerLeague: 20
  },
  broadcast: {
    enabled: false,
    platform: 'youtube',
    streamDelaySeconds: 0,
    monetizationEnabled: false
  },
  notifications: {
    whatsappEnabled: true,
    emailEnabled: true,
    pushEnabled: true
  },
  integrations: {
    webhooks: [],
    apiKeys: []
  }
};

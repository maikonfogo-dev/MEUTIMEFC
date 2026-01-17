import { Role } from "@/types/saas";

export type PlanType = 'free' | 'essential' | 'professional' | 'league';

export interface PlanLimits {
  maxPlayers: number; // -1 for unlimited
  maxSponsors: number; // -1 for unlimited
  hasCustomDomain: boolean;
  hasWhiteLabel: boolean; // Remove MeuTime FC branding
  hasFinancial: boolean; // Sócio torcedor management
  hasWhatsApp: boolean;
  hasExport: boolean;
}

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    maxPlayers: 15,
    maxSponsors: 3,
    hasCustomDomain: false,
    hasWhiteLabel: false,
    hasFinancial: false,
    hasWhatsApp: false,
    hasExport: false,
  },
  essential: {
    maxPlayers: -1,
    maxSponsors: -1,
    hasCustomDomain: false,
    hasWhiteLabel: true,
    hasFinancial: false, // Sem pagamento online
    hasWhatsApp: false,
    hasExport: false,
  },
  professional: {
    maxPlayers: -1,
    maxSponsors: -1,
    hasCustomDomain: false, // League only usually, but let's keep simple
    hasWhiteLabel: true,
    hasFinancial: true,
    hasWhatsApp: true,
    hasExport: true,
  },
  league: {
    maxPlayers: -1,
    maxSponsors: -1,
    hasCustomDomain: true,
    hasWhiteLabel: true,
    hasFinancial: true,
    hasWhatsApp: true,
    hasExport: true,
  }
};

export function checkLimit(plan: PlanType, currentCount: number, limitKey: 'maxPlayers' | 'maxSponsors'): boolean {
  const limit = PLAN_LIMITS[plan][limitKey];
  if (limit === -1) return true;
  return currentCount < limit;
}

export function hasFeature(plan: PlanType, featureKey: keyof Omit<PlanLimits, 'maxPlayers' | 'maxSponsors'>): boolean {
  return PLAN_LIMITS[plan][featureKey];
}

export function canAccess(role: Role, requiredRole: Role): boolean {
  const hierarchy: Record<Role, number> = {
    'SUPER_ADMIN': 4,
    'TEAM_ADMIN': 3,
    'EDITOR': 2,
    'MEMBER': 1
  };
  return hierarchy[role] >= hierarchy[requiredRole];
}

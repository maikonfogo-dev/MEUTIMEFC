import { TeamData } from "../types/team";

export const PERMISSIONS = {
  free: {
    canAddSponsors: true,
    maxSponsors: 1,
    canHighlightSponsor: false, // Master
    canViewSponsorMetrics: false,
    allowedCategories: ['Apoiador']
  },
  essential: {
    canAddSponsors: true,
    maxSponsors: 999, // Unlimited
    canHighlightSponsor: false,
    canViewSponsorMetrics: false,
    allowedCategories: ['Ouro', 'Prata', 'Apoiador']
  },
  professional: {
    canAddSponsors: true,
    maxSponsors: 999,
    canHighlightSponsor: true, // Master allowed
    canViewSponsorMetrics: true,
    allowedCategories: ['Master', 'Ouro', 'Prata', 'Apoiador']
  },
  league: {
    canAddSponsors: true,
    maxSponsors: 999,
    canHighlightSponsor: true,
    canViewSponsorMetrics: true,
    allowedCategories: ['Master', 'Ouro', 'Prata', 'Apoiador']
  }
};

export type PlanType = 'free' | 'essential' | 'professional' | 'league';

export function getTeamPermissions(planId: string) {
  return PERMISSIONS[planId as PlanType] || PERMISSIONS.free;
}

export function checkLimit(currentCount: number, limit: number) {
  return currentCount < limit;
}

export function hasFeature(planId: string, feature: keyof typeof PERMISSIONS.free) {
  const permissions = getTeamPermissions(planId);
  return permissions[feature];
}

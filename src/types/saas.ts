export type Role = 'SUPER_ADMIN' | 'TEAM_ADMIN' | 'EDITOR' | 'MEMBER';

export interface SaasPlan {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: string[];
  recommended?: boolean;
  cta: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  teamId?: string; // Null if Super Admin
}

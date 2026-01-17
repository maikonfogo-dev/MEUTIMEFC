// Core SaaS Types
export type UserRole = 'super_admin' | 'team_admin' | 'editor' | 'member';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  teamId?: string; // Optional because super_admin might not belong to a specific team
  avatarUrl?: string;
}

export interface Team {
  id: string;
  slug: string;
  name: string;
  logoUrl: string;
  colors: {
    primary: string;
    secondary: string;
  };
  city?: string;
  neighborhood?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

// Extended types with Team ID relation for Database/API structure
export interface Player {
  id: string;
  teamId: string;
  name: string;
  nickname?: string;
  position: 'Goleiro' | 'Zagueiro' | 'Lateral' | 'Meio-Campo' | 'Atacante' | 'Técnico';
  number: number;
  photoUrl: string;
  status: 'active' | 'injured' | 'inactive';
  stats?: {
    goals: number;
    assists: number;
    matches: number;
  };
}

export interface Sponsor {
  id: string;
  teamId: string;
  name: string;
  logoUrl: string;
  description: string;
  websiteUrl?: string;
  instagramUrl?: string;
  isMaster?: boolean;
}

export interface Match {
  id: string;
  teamId: string;
  date: string;
  location: string;
  opponent: string;
  opponentLogoUrl?: string;
  isHome: boolean;
  score?: {
    home: number;
    away: number;
  };
  championshipId?: string;
}

export interface Championship {
  id: string;
  teamId: string;
  name: string;
  year: number;
  logoUrl?: string;
}

export interface News {
  id: string;
  teamId: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  imageUrl?: string;
  published: boolean;
}

export interface Jersey {
  id: string;
  teamId: string;
  name: string; // Titular, Reserva, Alternativo
  imageUrl: string;
  description: string;
  price?: number;
  buyUrl?: string;
}

export interface MembershipPlan {
  id: string;
  teamId: string;
  name: string;
  price: number;
  period: 'mensal' | 'anual';
  benefits: string[];
  active: boolean;
}

export interface Title {
  id: string;
  teamId: string;
  name: string;
  year: number;
  championship: string;
  imageUrl?: string;
}

// Aggregate type for the Public App (same as before but using the new interfaces)
export interface PublicTeamData extends Omit<Team, 'id' | 'status' | 'createdAt'> {
  players: Omit<Player, 'teamId'>[];
  sponsors: Omit<Sponsor, 'teamId'>[];
  nextMatch?: Omit<Match, 'teamId'>;
  lastMatches: Omit<Match, 'teamId'>[];
  news: Omit<News, 'teamId' | 'content' | 'published'>[];
  jerseys: Omit<Jersey, 'teamId'>[];
  plans: Omit<MembershipPlan, 'teamId' | 'active'>[];
  titles: Omit<Title, 'teamId'>[];
}

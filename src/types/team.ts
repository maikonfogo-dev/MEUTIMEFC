import { Product } from './store';

export interface Player {
  id: string;
  name: string;
  nickname?: string;
  position: 'Goleiro' | 'Zagueiro' | 'Lateral' | 'Meio-Campo' | 'Atacante' | 'Técnico';
  number: number;
  photoUrl: string;
  stats?: {
    goals: number;
    assists: number;
    matches: number;
  };
}

export type SponsorCategory = 'Master' | 'Ouro' | 'Prata' | 'Apoio';

export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  websiteUrl?: string;
  instagramUrl?: string;
  isMaster?: boolean;
  category?: SponsorCategory;
  stats?: {
    clicks: number;
    views: number;
  };
  whatsapp?: string;
  status?: 'active' | 'inactive';
  order?: number;
}

export interface Match {
  id: string;
  date: string;
  location: string;
  opponent: string;
  opponentLogoUrl?: string;
  isHome: boolean;
  score?: {
    home: number;
    away: number;
  };
  championship?: string;
  status?: 'scheduled' | 'live' | 'finished' | 'postponed';
  round?: string;
}

export interface Standing {
  position: number;
  teamName: string;
  points: number;
  games: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface Championship {
  id: string;
  name: string;
  season: string;
  type: 'points' | 'cup' | 'group';
  category: 'adult' | 'base' | 'female';
  status: 'ongoing' | 'finished' | 'upcoming';
  logoUrl?: string;
  teamsCount?: number;
  revenue?: number;
  standings?: Standing[];
  matches?: Match[];
}

export interface LiveStream {
  id: string;
  matchId: string;
  title: string;
  platform: 'youtube' | 'twitch' | 'custom';
  embedUrl: string;
  status: 'scheduled' | 'live' | 'ended';
  viewers?: number;
  sponsorId?: string;
}

export interface News {
  id: string;
  title: string;
  summary: string;
  content?: string;
  date: string;
  imageUrl?: string;
}

export interface JerseySize {
  size: 'P' | 'M' | 'G' | 'GG' | 'XG' | 'Infantil';
  stock: number;
}

export interface Jersey {
  id: string;
  name: string; // Titular, Reserva, Alternativo
  imageUrl: string;
  description: string;
  price?: number;
  buyUrl?: string;
  gallery?: string[];
  discountPrice?: number;
  sizes?: JerseySize[];
  tags?: string[];
  status?: 'active' | 'inactive';
  sponsorId?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  maxStock: number;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    cpf: string;
    phone: string;
    email: string;
    address: string;
  };
  items: CartItem[];
  total: number;
  paymentMethod: 'pix' | 'credit_card';
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}


export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  period: 'mensal' | 'anual';
  benefits: string[];
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  planId: string;
  status: 'active' | 'inactive' | 'pending' | 'overdue';
  since: string;
  paymentMethod?: 'credit_card' | 'pix' | 'boleto';
}

export interface Title {
  id: string;
  name: string;
  year: number;
  championship: string;
  imageUrl?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  date: string;
  target: 'all' | 'members' | 'public';
  linkUrl?: string;
}

export interface TeamData {
  slug: string;
  planId?: 'free' | 'essential' | 'professional' | 'league';
  name: string;
  city?: string;
  whatsapp?: string;
  logoUrl: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  players: Player[];
  sponsors: Sponsor[];
  nextMatch?: Match;
  lastMatches: Match[];
  championships?: Championship[];
  liveStreams?: LiveStream[];
  news: News[];
   jerseys?: Jersey[];
  products: Product[];
  orders?: Order[];
  plans: MembershipPlan[];
  members: Member[];
  titles: Title[];
  notifications?: Notification[];
}

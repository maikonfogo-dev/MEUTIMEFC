import { Championship, Match, Standing } from '@/types/team';

export interface LeagueGame {
  id: string;
  date: string;
  championshipName: string;
  homeTeam: string;
  awayTeam: string;
  status: 'scheduled' | 'live' | 'finished';
  homeScore?: number;
  awayScore?: number;
}

export interface LeagueSponsor {
  id: string;
  name: string;
  logo: string;
  revenue: string;
}

export interface LeagueData {
  league: {
    id: string;
    name: string;
    slug: string;
    adminName: string;
    plan: 'pro_league';
  };
  stats: {
    activeChampionships: number;
    registeredTeams: number;
    weeklyMatches: number;
    pendingRevenue: number;
    gamesPlayed: number;
    broadcasts: number;
    totalViews: number;
    totalRevenue: number;
  };
  championships: Championship[];
  nextGames: LeagueGame[];
  sponsors: LeagueSponsor[];
  chartData: {
    viewsPerGame: { date: string; value: number }[];
    revenuePerChampionship: { name: string; value: number }[];
  };
}

export const mockLeagueData: LeagueData = {
  league: {
    id: 'league_1',
    name: 'Liga Amadora de São Paulo',
    slug: 'liga-sp',
    adminName: 'Carlos Organizador',
    plan: 'pro_league',
  },
  stats: {
    activeChampionships: 2,
    registeredTeams: 24,
    weeklyMatches: 12,
    pendingRevenue: 850.00,
    gamesPlayed: 48,
    broadcasts: 12,
    totalViews: 15420,
    totalRevenue: 12500.00
  },
  championships: [
    {
      id: 'champ_1',
      name: 'Copa do Bairro 2026',
      season: '2026',
      type: 'cup',
      category: 'adult',
      status: 'ongoing',
      logoUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=CopaBairro',
      teamsCount: 16,
      revenue: 5200.00,
      matches: [], // Would contain matches
      standings: [
        {
          position: 1,
          teamName: 'Real Madruga',
          points: 12,
          games: 4,
          wins: 4,
          draws: 0,
          losses: 0,
          goalsFor: 10,
          goalsAgainst: 2,
          goalDifference: 8
        },
        {
          position: 2,
          teamName: 'Unidos da Vila',
          points: 9,
          games: 4,
          wins: 3,
          draws: 0,
          losses: 1,
          goalsFor: 8,
          goalsAgainst: 4,
          goalDifference: 4
        }
      ]
    },
    {
      id: 'champ_2',
      name: 'Superliga Várzea',
      season: '2026/1',
      type: 'points',
      category: 'adult',
      status: 'upcoming',
      logoUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=Superliga',
      teamsCount: 8,
      revenue: 2800.00
    }
  ],
  nextGames: [
    {
      id: 'game_live_1',
      date: '2026-02-20T20:00:00',
      championshipName: 'Copa do Bairro 2026',
      homeTeam: 'Real Madruga',
      awayTeam: 'Unidos da Vila',
      status: 'live',
      homeScore: 2,
      awayScore: 1
    },
    {
      id: 'game_sched_1',
      date: '2026-02-21T14:00:00',
      championshipName: 'Superliga Várzea',
      homeTeam: 'Tabajara FC',
      awayTeam: 'Íbis Sport',
      status: 'scheduled'
    }
  ],
  sponsors: [
    { id: '1', name: 'Padaria Central', logo: '🥖', revenue: '800,00' },
    { id: '2', name: 'Supermercado Bom Preço', logo: '🛒', revenue: '1.200,00' },
    { id: '3', name: 'Bar do Zé', logo: '🍺', revenue: '500,00' }
  ],
  chartData: {
    viewsPerGame: [
      { date: 'Seg', value: 1200 },
      { date: 'Ter', value: 900 },
      { date: 'Qua', value: 1500 },
      { date: 'Qui', value: 2100 },
      { date: 'Sex', value: 1800 },
      { date: 'Sáb', value: 2400 },
      { date: 'Dom', value: 2200 }
    ],
    revenuePerChampionship: [
      { name: 'Copa do Bairro', value: 5200 },
      { name: 'Superliga', value: 2800 },
      { name: 'Torneio Início', value: 1500 }
    ]
  }
};

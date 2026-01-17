import { TeamData } from '../types/team';

export const mockTeamData: TeamData = {
  slug: 'real-madruga',
  planId: 'professional',
  name: 'Real Madruga FC',
  city: 'São Paulo - SP',
  whatsapp: '11999999999',
  logoUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=RealMadruga', // Placeholder
  colors: {
    primary: '#10b981', // green-500
    secondary: '#ffffff',
  },
  players: [
    {
      id: '1',
      name: 'João da Silva',
      nickname: 'Muralha',
      position: 'Goleiro',
      number: 1,
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Muralha',
      stats: { matches: 20, goals: 0, assists: 1 }
    },
    {
      id: '2',
      name: 'Carlos Alberto',
      nickname: 'Capita',
      position: 'Zagueiro',
      number: 4,
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Capita',
      stats: { matches: 18, goals: 2, assists: 0 }
    },
    {
      id: '3',
      name: 'Lucas Pereira',
      nickname: 'Maestro',
      position: 'Meio-Campo',
      number: 10,
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maestro',
      stats: { matches: 22, goals: 10, assists: 15 }
    },
    {
      id: '4',
      name: 'Gabriel Barbosa',
      nickname: 'Gol',
      position: 'Atacante',
      number: 9,
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gol',
      stats: { matches: 21, goals: 25, assists: 3 }
    }
  ],
  sponsors: [
    {
      id: '1',
      name: 'Padaria do Zé',
      description: 'O melhor pão do bairro.',
      logoUrl: 'https://placehold.co/200x100?text=Padaria+do+Ze',
      isMaster: true,
      category: 'Master',
      websiteUrl: 'https://instagram.com',
      stats: { clicks: 120, views: 1500 },
      whatsapp: '5511999999999',
      status: 'active',
      order: 1
    },
    {
      id: '2',
      name: 'Bar do Tio',
      description: 'Cerveja gelada pós-jogo.',
      logoUrl: 'https://placehold.co/200x100?text=Bar+do+Tio',
      isMaster: false,
      category: 'Prata',
      stats: { clicks: 45, views: 800 },
      status: 'active',
      order: 2
    }
  ],
  nextMatch: {
    id: '101',
    date: '2026-02-15T14:00:00',
    location: 'Arena Várzea',
    opponent: 'Unidos da Vila',
    isHome: true,
    championship: 'Copa do Bairro'
  },
  lastMatches: [
    {
      id: '99',
      date: '2026-02-08T14:00:00',
      location: 'Campo do Inimigo',
      opponent: 'Pedreira FC',
      isHome: false,
      score: { home: 1, away: 2 },
      championship: 'Copa do Bairro'
    }
  ],
  news: [
    {
      id: '1',
      title: 'Real Madruga vence clássico!',
      summary: 'Com gol no finalzinho, time garante 3 pontos.',
      date: '2026-02-09',
      imageUrl: 'https://placehold.co/600x400?text=Vitoria'
    },
    {
      id: '2',
      title: 'Peneira para novos talentos',
      summary: 'Venha fazer parte do nosso elenco.',
      date: '2026-02-01',
      imageUrl: 'https://placehold.co/600x400?text=Peneira'
    }
  ],
  jerseys: [
    {
      id: '1',
      name: 'Uniforme Titular 2026',
      description: 'A tradicional camisa verde e branca do Real Madruga. Tecido Dry-Fit de alta performance, ideal para torcer e jogar.',
      imageUrl: 'https://placehold.co/600x800?text=Camisa+Titular',
      gallery: [
        'https://placehold.co/600x800?text=Frente',
        'https://placehold.co/600x800?text=Costas',
        'https://placehold.co/600x800?text=Detalhe'
      ],
      price: 129.90,
      discountPrice: 109.90,
      sizes: [
        { size: 'P', stock: 10 },
        { size: 'M', stock: 25 },
        { size: 'G', stock: 15 },
        { size: 'GG', stock: 5 },
        { size: 'Infantil', stock: 8 }
      ],
      tags: ['Lançamento', 'Oferta'],
      status: 'active',
      sponsorId: '1' // Padaria do Zé
    },
    {
      id: '2',
      name: 'Uniforme Reserva 2026',
      description: 'Elegância em preto com detalhes dourados. Edição especial para jogos noturnos e eventos casuais.',
      imageUrl: 'https://placehold.co/600x800?text=Camisa+Reserva',
      gallery: [
        'https://placehold.co/600x800?text=Frente+Preta',
        'https://placehold.co/600x800?text=Costas+Preta'
      ],
      price: 149.90,
      discountPrice: 129.90,
      sizes: [
        { size: 'P', stock: 5 },
        { size: 'M', stock: 10 },
        { size: 'G', stock: 10 },
        { size: 'GG', stock: 2 }
      ],
      tags: ['Edição Limitada'],
      status: 'active',
      sponsorId: '2' // Bar do Tio
    },
    {
      id: '3',
      name: 'Camisa de Treino',
      description: 'Leveza e conforto para o dia a dia. A mesma usada pelos jogadores durante a preparação.',
      imageUrl: 'https://placehold.co/600x800?text=Camisa+Treino',
      price: 89.90,
      sizes: [
        { size: 'M', stock: 50 },
        { size: 'G', stock: 50 }
      ],
      status: 'active'
    }
  ],
  plans: [
    {
      id: '1',
      name: 'Sócio Torcedor',
      price: 19.90,
      period: 'mensal',
      benefits: ['Carteirinha digital', 'Desconto na camisa', 'Sorteios mensais']
    },
    {
      id: '2',
      name: 'Sócio Ouro',
      price: 49.90,
      period: 'mensal',
      benefits: ['Tudo do Sócio Torcedor', 'Camisa oficial grátis/ano', 'Acesso VIP aos treinos']
    }
  ],
  titles: [
    {
      id: '1',
      name: 'Campeão da Copa do Bairro',
      year: 2024,
      championship: 'Copa do Bairro',
      imageUrl: 'https://placehold.co/300x300?text=Taca+2024'
    }
  ],
  members: [],
  products: [
    {
      id: '1',
      name: 'Camisa Oficial 2026',
      description: 'Manto sagrado do Real Madruga. Tecido Dry-Fit de alta performance.',
      price: 129.90,
      installments: { count: 3, value: 43.30 },
      images: ['https://placehold.co/600x800?text=Camisa+1+Frente', 'https://placehold.co/600x800?text=Camisa+1+Costas'],
      category: 'Camisa',
      isOfficial: true,
      isNew: true,
      variants: [
        { size: 'P', stock: 10 },
        { size: 'M', stock: 25 },
        { size: 'G', stock: 15 },
        { size: 'GG', stock: 5 }
      ]
    },
    {
      id: '2',
      name: 'Camisa Reserva 2026',
      description: 'Uniforme preto com detalhes dourados. Elegância dentro e fora de campo.',
      price: 129.90,
      installments: { count: 3, value: 43.30 },
      images: ['https://placehold.co/600x800?text=Camisa+2+Frente'],
      category: 'Camisa',
      isOfficial: true,
      variants: [
        { size: 'M', stock: 10 },
        { size: 'G', stock: 10 }
      ]
    },
    {
      id: '3',
      name: 'Boné Real Madruga',
      description: 'Boné aba curva com bordado 3D.',
      price: 59.90,
      images: ['https://placehold.co/600x600?text=Bone'],
      category: 'Acessório',
      variants: [
        { size: 'Único', stock: 50 }
      ]
    },
    {
      id: '4',
      name: 'Caneca do Torcedor',
      description: 'Para tomar aquele café ou cerveja gelada.',
      price: 39.90,
      images: ['https://placehold.co/600x600?text=Caneca'],
      category: 'Acessório',
      variants: [
        { size: 'Único', stock: 100 }
      ]
    }
  ],
  championships: [
    {
      id: '1',
      name: 'Copa do Bairro 2026',
      season: '2026',
      type: 'cup',
      category: 'adult',
      status: 'ongoing',
      logoUrl: 'https://placehold.co/200x200?text=Copa+Bairro'
    },
    {
      id: '2',
      name: 'Liga Municipal',
      season: '2026',
      type: 'points',
      category: 'adult',
      status: 'upcoming',
      logoUrl: 'https://placehold.co/200x200?text=Liga'
    }
  ],
  liveStreams: [
    {
      id: 'stream_01',
      matchId: '101',
      title: 'Real Madruga vs Unidos da Vila - Ao Vivo',
      platform: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      status: 'scheduled'
    }
  ]
};

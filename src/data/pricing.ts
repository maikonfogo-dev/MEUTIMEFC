import { SaasPlan } from "@/types/saas";

export const SAAS_PLANS: SaasPlan[] = [
  {
    id: 'free',
    name: 'Início de Jogo',
    price: {
      monthly: 0,
      yearly: 0
    },
    description: 'Indicado para times iniciantes.',
    features: [
      '1 time cadastrado',
      'Até 15 jogadores',
      'Página pública do time',
      'Campeonatos e títulos',
      'Patrocinadores (até 3)',
      'Painel gerenciador básico',
      'Logo MeuTime FC visível'
    ],
    cta: 'Começar Grátis'
  },
  {
    id: 'essential',
    name: 'Time Titular',
    price: {
      monthly: 29.90,
      yearly: 299.00
    },
    description: 'Ideal para a maioria dos times amadores.',
    features: [
      'Tudo do plano gratuito',
      'Jogadores ilimitados',
      'Camisas oficiais',
      'Sócio torcedor (sem pagamento online)',
      'Patrocinadores ilimitados',
      'Notícias e destaques',
      'Remoção da marca MeuTime FC',
      'Suporte por e-mail'
    ],
    recommended: true,
    cta: 'Assinar Agora'
  },
  {
    id: 'professional',
    name: 'Camisa 10',
    price: {
      monthly: 59.90,
      yearly: 599.00
    },
    description: 'Para times organizados e competitivos.',
    features: [
      'Tudo do Essencial',
      'Gestão completa de sócio torcedor',
      'Exportação de dados',
      'Estatísticas de jogadores',
      'Notificações push',
      'Integração com WhatsApp',
      'Painel avançado',
      'Suporte prioritário'
    ],
    cta: 'Assinar Profissional'
  },
  {
    id: 'league',
    name: 'Liga / Premium',
    price: {
      monthly: 0, // Sob consulta
      yearly: 0
    },
    description: 'Para ligas, projetos sociais ou múltiplos times.',
    features: [
      'Vários times no mesmo painel',
      'Acesso de coordenadores',
      'Relatórios gerais',
      'Domínio personalizado',
      'Suporte dedicado'
    ],
    cta: 'Falar com Consultor'
  }
];

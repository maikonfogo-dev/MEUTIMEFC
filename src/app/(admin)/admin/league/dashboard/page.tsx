'use client';

import { Trophy, Users, Calendar, DollarSign, Plus, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { LeagueData } from '@/data/mockLeague';

export default function LeagueDashboard() {
  const [data, setData] = useState<LeagueData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // In a real app, this would be a fetch to /api/league
        // For now we simulate it or import direct if server component, but this is client
        const res = await fetch('/api/league');
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Failed to fetch league data', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!data) return null;

  const stats = [
    { label: 'Campeonatos Ativos', value: data.stats.activeChampionships.toString(), icon: Trophy, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Times Inscritos', value: data.stats.registeredTeams.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Jogos na Semana', value: data.stats.weeklyMatches.toString(), icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Receita Pendente', value: `R$ ${data.stats.pendingRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Painel da Liga</h1>
          <p className="text-gray-500">Bem-vindo, {data.league.adminName}</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-colors">
          <Plus className="w-4 h-4" /> Novo Campeonato
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Championships */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-gray-900 text-lg">Meus Campeonatos</h2>
            <Link href="/admin/league/championships" className="text-primary-600 text-sm font-medium hover:underline">
              Ver todos
            </Link>
          </div>
          
          <div className="space-y-4">
            {data.championships.map((champ) => (
              <div key={champ.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden relative">
                    {champ.logoUrl ? (
                      <Image src={champ.logoUrl} alt={champ.name} fill className="object-cover" sizes="40px" />
                    ) : (
                      <Trophy className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{champ.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className={`px-2 py-0.5 rounded-full ${champ.status === 'ongoing' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {champ.status === 'ongoing' ? 'Em andamento' : 'Em breve'}
                      </span>
                      <span>• {champ.category}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900 block">{champ.season}</span>
                  <Link href={`/admin/league/championships/${champ.id}`} className="text-xs text-primary-600 hover:underline">
                    Gerenciar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / Notifications */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Ações Rápidas</h2>
          <div className="space-y-2">
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between group transition-colors border border-transparent hover:border-gray-100">
              <span className="text-sm text-gray-700 font-medium">Cadastrar Súmula</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600" />
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between group transition-colors border border-transparent hover:border-gray-100">
              <span className="text-sm text-gray-700 font-medium">Aprovar Times</span>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">3</span>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between group transition-colors border border-transparent hover:border-gray-100">
              <span className="text-sm text-gray-700 font-medium">Configurar Regulamento</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600" />
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm mb-3">Próximos Jogos</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Real x Barcelona</span>
                <span className="text-xs text-gray-400">Hoje, 19:00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Chelsea x City</span>
                <span className="text-xs text-gray-400">Amanhã, 20:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
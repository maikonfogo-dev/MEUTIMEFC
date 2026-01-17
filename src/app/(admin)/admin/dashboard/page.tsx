"use client";

import { Users, Trophy, TrendingUp, Newspaper, Calendar, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TeamData } from '@/types/team';

export default function AdminDashboard() {
  const [data, setData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/team');
        const teamData = await res.json();
        setData(teamData);
      } catch (error) {
        console.error('Failed to fetch team data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!data) return null;

  const activeMembers = data.members.filter(m => m.status === 'active').length;
  const totalRevenue = data.members.reduce((acc, member) => {
    const plan = data.plans.find(p => p.id === member.planId);
    return acc + (plan?.price || 0);
  }, 0);
  
  const nextMatch = data.nextMatch;
  const daysToNextMatch = nextMatch 
    ? Math.ceil((new Date(nextMatch.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const stats = [
    { name: 'Jogadores Ativos', value: data.players.length.toString(), icon: Users, change: '+0', changeType: 'neutral' },
    { name: 'Sócios Torcedores', value: activeMembers.toString(), icon: Users, change: '+2', changeType: 'positive' },
    { name: 'Vendas do Mês', value: 'R$ 1.250,00', icon: TrendingUp, change: '+12.5%', changeType: 'positive' },
    { name: 'Pedidos Pendentes', value: '8', icon: Calendar, change: '-2', changeType: 'positive' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold font-heading text-gray-800 mb-6">Visão Geral</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{item.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <span className={`font-medium ${item.changeType === 'positive' ? 'text-green-600' : 'text-gray-500'}`}>
                  {item.change}
                </span>{' '}
                <span className="text-gray-500">desde o último mês</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Streaming Metrics - Frame 5 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
           <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
             <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
             Métricas de Transmissão
           </h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                 <p className="text-xs font-bold text-gray-500 uppercase mb-1">Jogos Transmitidos</p>
                 <p className="text-2xl font-bold text-gray-900">12</p>
                 <span className="text-xs text-green-600 font-bold flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +2 essa semana
                 </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                 <p className="text-xs font-bold text-gray-500 uppercase mb-1">Público Ao Vivo (Méd)</p>
                 <p className="text-2xl font-bold text-gray-900">1.240</p>
                 <span className="text-xs text-green-600 font-bold flex items-center gap-1 mt-1">
                    <Users className="w-3 h-3" /> +15% vs mês anterior
                 </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                 <p className="text-xs font-bold text-gray-500 uppercase mb-1">Receita Ads</p>
                 <p className="text-2xl font-bold text-gray-900">R$ 890,00</p>
                 <span className="text-xs text-green-600 font-bold flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +8% vs mês anterior
                 </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                 <p className="text-xs font-bold text-gray-500 uppercase mb-1">Engajamento (Chat)</p>
                 <p className="text-2xl font-bold text-gray-900">4.5k</p>
                 <span className="text-xs text-gray-500 font-bold flex items-center gap-1 mt-1">
                    Mensagens enviadas
                 </span>
              </div>
           </div>
        </div>

        {/* Próximo Jogo */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Próximo Jogo</h2>
          {nextMatch ? (
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <div className="text-center min-w-[60px]">
                <span className="block text-2xl font-bold text-gray-900 font-mono">
                  {new Date(nextMatch.date).getDate()}
                </span>
                <span className="block text-xs font-bold uppercase text-gray-500">
                  {new Date(nextMatch.date).toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}
                </span>
              </div>
              <div className="flex-1 px-4 text-center border-l border-r border-gray-200 mx-4">
                <div className="text-sm font-medium text-gray-900">{nextMatch.championship}</div>
                <div className="mt-1 text-sm text-gray-500 font-mono">
                  {nextMatch.location} • {new Date(nextMatch.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="mt-2 font-bold text-primary-600">
                  {nextMatch.isHome ? `${data.name} vs ${nextMatch.opponent}` : `${nextMatch.opponent} vs ${data.name}`}
                </div>
              </div>
              <Link href="/admin/matches" className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Gerenciar
              </Link>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
              Nenhum jogo agendado.
            </div>
          )}
        </div>

        {/* Atalhos Rápidos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/players/new" className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-colors group">
              <Users className="w-6 h-6 text-gray-400 group-hover:text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-primary-700">Novo Jogador</span>
            </Link>
            <Link href="/admin/news/new" className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-colors group">
              <Newspaper className="w-6 h-6 text-gray-400 group-hover:text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-primary-700">Publicar Notícia</span>
            </Link>
            <Link href="/admin/matches/new" className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-colors group">
              <Calendar className="w-6 h-6 text-gray-400 group-hover:text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-primary-700">Agendar Jogo</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

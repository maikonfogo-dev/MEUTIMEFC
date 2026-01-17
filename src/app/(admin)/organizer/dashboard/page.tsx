'use client';

import { 
  Trophy, 
  Users, 
  Video, 
  Eye, 
  DollarSign, 
  Shield, 
  PlayCircle, 
  BarChart2, 
  Plus, 
  MoreVertical,
  Calendar,
  Activity,
  Radio
} from 'lucide-react';
import { mockLeagueData } from '@/data/mockLeague';
import Link from 'next/link';

export default function LeagueDashboard() {
  const { league, stats, championships, nextGames, sponsors, chartData } = mockLeagueData;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* Header Fixo */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            {league.name.substring(0, 1)}
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">{league.name}</h1>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Painel do Organizador</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 relative">
            <Activity className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
            {/* User Avatar Placeholder */}
            <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">AD</div>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto space-y-8">
        
        {/* KPIs Frame: Liga_KPIs */}
        <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[
            { label: 'Campeonatos', value: stats.activeChampionships, icon: Trophy, color: 'text-yellow-600', bg: 'bg-yellow-50' },
            { label: 'Jogos Realizados', value: stats.gamesPlayed, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Transmissões', value: stats.broadcasts, icon: Video, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Visualizações', value: stats.totalViews.toLocaleString(), icon: Eye, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Receita Total', value: `R$ ${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Times Inscritos', value: stats.registeredTeams, icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          ].map((kpi, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
                  <kpi.icon className="w-5 h-5" />
                </div>
                {i === 4 && <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">+12%</span>}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <p className="text-xs text-gray-500 font-medium uppercase mt-1">{kpi.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Charts Frame: Liga_Graficos_Audiencia */}
        <section className="grid lg:grid-cols-3 gap-6">
          
          {/* Line Chart - Visualizações */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-gray-400" />
                Audiência da Semana
              </h3>
              <select className="text-sm border-gray-200 rounded-lg text-gray-500 bg-gray-50">
                <option>Últimos 7 dias</option>
                <option>Últimos 30 dias</option>
              </select>
            </div>
            
            {/* Simple CSS Line Chart Simulation */}
            <div className="h-64 flex items-end justify-between gap-2 px-2 relative">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="w-full h-px bg-gray-100"></div>
                ))}
              </div>
              
              {chartData.viewsPerGame.map((data, i) => (
                <div key={i} className="relative flex-1 flex flex-col items-center group z-10">
                  <div 
                    className="w-full mx-1 bg-primary-500/10 border-t-2 border-primary-500 rounded-t-sm hover:bg-primary-500/20 transition-all relative"
                    style={{ height: `${(data.value / 2500) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {data.value} views
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 mt-2 font-mono">{data.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart - Receita */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-400" />
              Receita por Campeonato
            </h3>
            
            <div className="flex-1 flex flex-col justify-center gap-6">
              {chartData.revenuePerChampionship.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{item.name}</span>
                    <span className="font-bold text-gray-900">R$ {item.value}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-2.5 rounded-full" 
                      style={{ width: `${(item.value / 5000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-6 w-full py-2 text-sm font-bold text-primary-600 border border-primary-100 rounded-lg hover:bg-primary-50 transition-colors">
              Ver Relatório Financeiro
            </button>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Championships List Frame: Liga_Campeonatos_Lista */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Ligas Ativas e Campeonatos</h3>
              <button className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                <Plus className="w-4 h-4" /> Novo
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Nome</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Times</th>
                    <th className="px-6 py-4">Receita</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {championships.map((champ) => (
                    <tr key={champ.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-medium text-gray-900">{champ.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                          champ.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                          champ.status === 'finished' ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {champ.status === 'ongoing' ? 'Ativo' : champ.status === 'finished' ? 'Finalizado' : 'Em Breve'}
                        </span>
                      </td>
                      <td className="px-6 py-4">{champ.teamsCount}</td>
                      <td className="px-6 py-4 text-emerald-600 font-medium">R$ {champ.revenue}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-primary-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Broadcast Frame: Liga_Jogos_Transmissao */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                Jogos Agendados
              </h3>
            </div>
            <div className="p-6 flex-1 flex flex-col gap-6">
              {nextGames.map((game) => (
                <div key={game.id} className={`p-4 rounded-xl border ${game.status === 'live' ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-gray-50'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-gray-500 uppercase">{game.championshipName}</span>
                    {game.status === 'live' && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded animate-pulse">AO VIVO</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm font-bold text-gray-900">{game.homeTeam}</div>
                    <div className="text-xs font-mono bg-gray-200 px-2 py-1 rounded text-gray-600">
                      {game.status === 'live' ? `${game.homeScore} x ${game.awayScore}` : 'VS'}
                    </div>
                    <div className="text-sm font-bold text-gray-900">{game.awayTeam}</div>
                  </div>
                  {game.status === 'live' ? (
                    <button className="w-full py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-500/20">
                      <Video className="w-4 h-4" /> Gerenciar Live
                    </button>
                  ) : (
                    <button className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                      <PlayCircle className="w-4 h-4" /> Iniciar Transmissão
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Monetization Frame: Liga_Monetizacao */}
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              Patrocinadores Ativos
            </h3>
            <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors">
              <Plus className="w-4 h-4" /> Adicionar
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {sponsors.map((sponsor) => (
              <div key={sponsor.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-2xl shadow-sm">
                    {sponsor.logo}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{sponsor.name}</p>
                    <p className="text-xs text-gray-500 font-medium">Patrocínio Master</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">R$ {sponsor.revenue}</p>
                  <p className="text-xs text-gray-400">Mensal</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

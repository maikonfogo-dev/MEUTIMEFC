'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, Trophy, Calendar, Users, Video, 
  Edit, Save, PlayCircle, BarChart2, Shield 
} from 'lucide-react';
import { mockTeamData } from '@/data/mockTeam';
import Link from 'next/link';
import Image from 'next/image';

export default function ChampionshipDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('matches');
  
  // Find championship
  const championship = mockTeamData.championships?.find(c => c.id === params.id);

  if (!championship) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-bold text-gray-800">Campeonato não encontrado</h1>
        <button onClick={() => router.back()} className="text-primary-600 hover:underline mt-2">
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()} 
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 bg-gray-100 rounded-lg p-2 flex items-center justify-center">
            {championship.logoUrl ? (
              <Image
                src={championship.logoUrl}
                alt={championship.name}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            ) : (
              <Trophy className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{championship.name}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium bg-primary-50 text-primary-700 px-2 py-0.5 rounded">
                {championship.season}
              </span>
              <span>•</span>
              <span>{championship.type === 'points' ? 'Pontos Corridos' : 'Mata-mata'}</span>
              <span>•</span>
              <span className="capitalize">{championship.status === 'ongoing' ? 'Em Andamento' : 'Finalizado'}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
            <Edit className="w-4 h-4" />
            Editar Info
          </button>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm shadow-primary-600/20">
            <PlayCircle className="w-4 h-4" />
            Gerenciar Transmissões
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Times Inscritos</span>
            <Shield className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-2xl font-bold text-gray-900">{championship.standings?.length || 0}</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Jogos Realizados</span>
            <Calendar className="w-4 h-4 text-green-500" />
          </div>
          <span className="text-2xl font-bold text-gray-900">
            {championship.matches?.filter(m => m.status === 'finished').length || 0}
            <span className="text-gray-400 text-sm font-normal ml-1">/ {championship.matches?.length || 0}</span>
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Gols Marcados</span>
            <Trophy className="w-4 h-4 text-yellow-500" />
          </div>
          <span className="text-2xl font-bold text-gray-900">
            {championship.standings?.reduce((acc, curr) => acc + curr.goalsFor, 0) || 0}
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Audiência Total</span>
            <Video className="w-4 h-4 text-red-500" />
          </div>
          <span className="text-2xl font-bold text-gray-900">12.5k</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          {[
            { id: 'matches', label: 'Jogos & Resultados', icon: Calendar },
            { id: 'standings', label: 'Tabela de Classificação', icon: BarChart2 },
            { id: 'teams', label: 'Times', icon: Users },
            { id: 'streams', label: 'Transmissões', icon: Video },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
        
        {/* MATCHES TAB */}
        {activeTab === 'matches' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800">Gerenciar Partidas</h3>
              <button className="text-sm text-primary-600 font-medium hover:underline">
                + Adicionar Jogo
              </button>
            </div>
            
            <div className="space-y-4">
              {championship.matches?.map((match) => (
                <div key={match.id} className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-100 gap-4">
                  
                  {/* Match Info */}
                  <div className="flex items-center gap-6 flex-1">
                    <div className="flex flex-col items-center w-24">
                      <span className="text-xs text-gray-500 mb-1">
                        {new Date(match.date).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="text-xs font-bold text-gray-700">
                        {new Date(match.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 flex-1 justify-center">
                      <span className={`font-bold text-sm text-right flex-1 ${match.score?.home && match.score?.away && match.score.home > match.score.away ? 'text-green-600' : ''}`}>
                        {match.isHome ? mockTeamData.name : match.opponent}
                      </span>
                      
                      <div className="flex items-center gap-2 bg-white px-3 py-1 rounded border border-gray-200">
                        <span className="font-mono font-bold text-lg w-6 text-center">{match.score?.home ?? '-'}</span>
                        <span className="text-gray-400">:</span>
                        <span className="font-mono font-bold text-lg w-6 text-center">{match.score?.away ?? '-'}</span>
                      </div>
                      
                      <span className={`font-bold text-sm text-left flex-1 ${match.score?.home && match.score?.away && match.score.away > match.score.home ? 'text-green-600' : ''}`}>
                        {!match.isHome ? mockTeamData.name : match.opponent}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 md:w-auto w-full justify-end border-t md:border-t-0 border-gray-200 pt-3 md:pt-0">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase mr-2 ${
                      match.status === 'finished' ? 'bg-gray-200 text-gray-700' :
                      match.status === 'live' ? 'bg-red-100 text-red-700 animate-pulse' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {match.status === 'finished' ? 'Encerrado' : match.status === 'live' ? 'Ao Vivo' : 'Agendado'}
                    </span>
                    
                    <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors" title="Editar Placar">
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    {match.status !== 'finished' && (
                       <button className={`p-2 border rounded-lg transition-colors ${
                         match.status === 'live' 
                           ? 'bg-red-50 border-red-200 text-red-600' 
                           : 'bg-white border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200'
                       }`} title="Transmissão">
                         <Video className="w-4 h-4" />
                       </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STANDINGS TAB */}
        {activeTab === 'standings' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Pos</th>
                  <th className="px-6 py-4 font-medium">Time</th>
                  <th className="px-6 py-4 font-medium text-center">P</th>
                  <th className="px-6 py-4 font-medium text-center">J</th>
                  <th className="px-6 py-4 font-medium text-center">V</th>
                  <th className="px-6 py-4 font-medium text-center">E</th>
                  <th className="px-6 py-4 font-medium text-center">D</th>
                  <th className="px-6 py-4 font-medium text-center">SG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {championship.standings?.map((team) => (
                  <tr key={team.position} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{team.position}º</td>
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                      {team.teamName}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-gray-900">{team.points}</td>
                    <td className="px-6 py-4 text-center text-gray-500">{team.games}</td>
                    <td className="px-6 py-4 text-center text-green-600">{team.wins}</td>
                    <td className="px-6 py-4 text-center text-gray-500">{team.draws}</td>
                    <td className="px-6 py-4 text-center text-red-600">{team.losses}</td>
                    <td className="px-6 py-4 text-center text-gray-500">{team.goalDifference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TEAMS TAB */}
        {activeTab === 'teams' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800">Times Inscritos</h3>
              <button className="text-sm text-primary-600 font-medium hover:underline">
                + Adicionar Time
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {championship.standings?.map((team, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 border border-gray-100 rounded-lg hover:border-primary-200 transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{team.teamName}</h4>
                    <span className="text-xs text-gray-500">Inscrito em 01/01/2026</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STREAMS TAB */}
        {activeTab === 'streams' && (
          <div className="p-6 text-center py-12">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Central de Transmissão</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Configure suas chaves de transmissão RTMP ou integre com YouTube/Facebook para transmitir seus jogos.
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
              Configurar Nova Transmissão
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

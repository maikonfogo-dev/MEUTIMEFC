'use client';

import { useState } from 'react';
import { mockTeamData } from '@/data/mockTeam';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Shield } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

export default function ChampionshipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'standings' | 'matches'>('standings');

  const team = mockTeamData;
  const championship = team.championships?.find(c => c.id === params.id);

  if (!championship) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Campeonato não encontrado</p>
        <button onClick={() => router.back()} className="text-primary-600 mt-4">Voltar</button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <header className="bg-white p-4 sticky top-0 z-10 border-b border-gray-100 flex items-center gap-4">
        <Link href={`/team/${params.slug}/championships`} className="p-2 -ml-2 text-gray-600 hover:text-primary-600 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-bold font-heading text-gray-900 truncate flex-1">{championship.name}</h1>
      </header>

      {/* Championship Info Banner */}
      <div className="bg-white p-6 flex flex-col items-center border-b border-gray-100">
        <div className="w-24 h-24 bg-gray-50 rounded-full p-2 mb-3 shadow-sm flex items-center justify-center relative overflow-hidden">
           {championship.logoUrl ? (
             <Image src={championship.logoUrl} alt={championship.name} fill className="object-contain" />
           ) : (
             <Shield className="w-10 h-10 text-gray-300" />
           )}
        </div>
        <h2 className="text-xl font-bold text-gray-900 text-center">{championship.name}</h2>
        <p className="text-gray-500 text-sm mt-1">{championship.season} • {championship.category === 'adult' ? 'Adulto' : 'Base'}</p>
        
        {/* Stats Summary */}
        <div className="flex gap-8 mt-6 w-full justify-center">
          <div className="text-center">
            <span className="block text-2xl font-bold text-primary-600">{championship.standings?.length || 0}</span>
            <span className="text-xs text-gray-400 uppercase font-bold">Times</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-bold text-primary-600">{championship.matches?.length || 0}</span>
            <span className="text-xs text-gray-400 uppercase font-bold">Jogos</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-100 sticky top-[73px] z-10">
        <button
          onClick={() => setActiveTab('standings')}
          className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'standings' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500'
          }`}
        >
          Classificação
        </button>
        <button
          onClick={() => setActiveTab('matches')}
          className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'matches' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500'
          }`}
        >
          Jogos
        </button>
      </div>

      <div className="p-4">
        {activeTab === 'standings' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 bg-gray-50 uppercase border-b border-gray-100">
                  <tr>
                    <th className="px-3 py-3 w-10 text-center">#</th>
                    <th className="px-3 py-3">Time</th>
                    <th className="px-3 py-3 text-center font-bold text-gray-900">P</th>
                    <th className="px-3 py-3 text-center">J</th>
                    <th className="px-3 py-3 text-center">V</th>
                    <th className="px-3 py-3 text-center">SG</th>
                  </tr>
                </thead>
                <tbody>
                  {championship.standings?.map((standing, index) => (
                    <tr key={index} className={`border-b border-gray-50 last:border-0 hover:bg-gray-50 ${index < 4 ? 'bg-green-50/30' : ''}`}>
                      <td className="px-3 py-3 text-center font-bold text-gray-500">{standing.position}</td>
                      <td className="px-3 py-3 font-medium text-gray-900 flex items-center gap-2">
                        {standing.teamName}
                      </td>
                      <td className="px-3 py-3 text-center font-bold text-primary-600">{standing.points}</td>
                      <td className="px-3 py-3 text-center text-gray-600">{standing.games}</td>
                      <td className="px-3 py-3 text-center text-gray-600">{standing.wins}</td>
                      <td className="px-3 py-3 text-center text-gray-600">{standing.goalDifference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-gray-50 text-[10px] text-gray-400 text-center">
              P: Pontos • J: Jogos • V: Vitórias • SG: Saldo de Gols
            </div>
          </div>
        )}

        {activeTab === 'matches' && (
          <div className="space-y-4">
            {championship.matches?.map((match) => (
              <div key={match.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-gray-400">{match.round || 'Rodada'}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                    match.status === 'scheduled' ? 'bg-gray-100 text-gray-500' :
                    match.status === 'live' ? 'bg-red-100 text-red-600 animate-pulse' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {match.status === 'scheduled' ? 'Agendado' : match.status === 'live' ? 'AO VIVO' : 'Finalizado'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col items-center w-[35%]">
                    <div className="w-10 h-10 bg-gray-100 rounded-full mb-2 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-gray-400" />
                    </div>
                    <span className="text-xs font-bold text-center line-clamp-2">{match.isHome ? 'Real Madruga' : match.opponent}</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center w-[30%]">
                    {match.status === 'scheduled' ? (
                      <div className="text-center">
                        <span className="block text-xl font-bold text-gray-300">VS</span>
                        <span className="text-[10px] text-gray-400 mt-1 block">
                          {new Date(match.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg">
                           <span className="text-2xl font-bold text-gray-900">{match.score?.home}</span>
                           <span className="text-gray-300">-</span>
                           <span className="text-2xl font-bold text-gray-900">{match.score?.away}</span>
                        </div>
                        {match.status === 'live' && (
                          <span className="text-[10px] font-mono text-red-600 font-bold animate-pulse">
                            35&apos; 1T
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-center w-[35%]">
                    <div className="w-10 h-10 bg-gray-100 rounded-full mb-2 flex items-center justify-center">
                       <Shield className="w-5 h-5 text-gray-400" />
                    </div>
                    <span className="text-xs font-bold text-center line-clamp-2">{match.isHome ? match.opponent : 'Real Madruga'}</span>
                  </div>
                </div>
                
                {match.status === 'live' && (
                  <div className="mb-4">
                    <Link 
                      href={`/team/${params.slug}/live/stream-1`} 
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-600/20"
                    >
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      Assistir Ao Vivo
                    </Link>
                  </div>
                )}
                
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-50">
                   <div className="flex items-center gap-1">
                     <Calendar className="w-3 h-3" />
                     {new Date(match.date).toLocaleDateString('pt-BR')}
                   </div>
                   <div className="flex items-center gap-1">
                     <MapPin className="w-3 h-3" />
                     {match.location}
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

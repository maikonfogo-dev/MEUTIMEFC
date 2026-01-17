'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Medal, Target, Footprints, Users } from 'lucide-react';
import Link from 'next/link';
import { TeamData, Player, Championship, Standing } from '@/types/team';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function TeamStatsPage() {
  const params = useParams();
  const [data, setData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'goals' | 'assists' | 'standings'>('goals');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/team');
        const teamData = await res.json();
        setData(teamData);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-50 pt-20 text-center">Carregando...</div>;
  }

  if (!data) return null;

  const topScorers = [...data.players]
    .filter(p => (p.stats?.goals || 0) > 0)
    .sort((a, b) => (b.stats?.goals || 0) - (a.stats?.goals || 0))
    .slice(0, 10);

  const topAssists = [...data.players]
    .filter(p => (p.stats?.assists || 0) > 0)
    .sort((a, b) => (b.stats?.assists || 0) - (a.stats?.assists || 0))
    .slice(0, 10);

  // Assuming first championship for now or iterating
  const mainChampionship = data.championships?.[0];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-primary-600 px-4 py-6 text-white sticky top-0 z-30">
        <div className="flex items-center gap-3 mb-4">
          <Link href={`/team/${params.slug}`} className="text-white/80 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold font-heading">Estatísticas</h1>
        </div>

        {/* Tabs */}
        <div className="flex bg-primary-700/50 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('goals')}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${
              activeTab === 'goals' ? 'bg-white text-primary-900 shadow-sm' : 'text-primary-100 hover:bg-primary-600'
            }`}
          >
            Artilharia
          </button>
          <button
            onClick={() => setActiveTab('assists')}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${
              activeTab === 'assists' ? 'bg-white text-primary-900 shadow-sm' : 'text-primary-100 hover:bg-primary-600'
            }`}
          >
            Passes
          </button>
          <button
            onClick={() => setActiveTab('standings')}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${
              activeTab === 'standings' ? 'bg-white text-primary-900 shadow-sm' : 'text-primary-100 hover:bg-primary-600'
            }`}
          >
            Tabela
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* GOALS */}
        {activeTab === 'goals' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary-600" />
              <h2 className="font-bold text-gray-900">Artilheiros da Temporada</h2>
            </div>
            {topScorers.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {topScorers.map((player, index) => (
                  <div key={player.id} className="flex items-center p-4 hover:bg-gray-50">
                    <div className={`w-6 text-center font-bold ${index < 3 ? 'text-primary-600' : 'text-gray-400'}`}>
                      {index + 1}º
                    </div>
                    <div className="ml-4 w-10 h-10 bg-gray-100 rounded-full overflow-hidden flex-shrink-0 relative">
                      {player.photoUrl ? (
                        <Image src={player.photoUrl} alt={player.name} fill className="object-cover" />
                      ) : (
                        <Users className="w-full h-full p-2 text-gray-400" />
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="font-bold text-gray-900">{player.name}</p>
                      <p className="text-xs text-gray-500">{player.position}</p>
                    </div>
                    <div className="text-xl font-bold font-mono text-primary-600">
                      {player.stats?.goals}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                Nenhum gol registrado ainda.
              </div>
            )}
          </div>
        )}

        {/* ASSISTS */}
        {activeTab === 'assists' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center gap-2">
              <Footprints className="w-5 h-5 text-secondary-500" />
              <h2 className="font-bold text-gray-900">Líderes em Assistências</h2>
            </div>
            {topAssists.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {topAssists.map((player, index) => (
                  <div key={player.id} className="flex items-center p-4 hover:bg-gray-50">
                    <div className={`w-6 text-center font-bold ${index < 3 ? 'text-secondary-600' : 'text-gray-400'}`}>
                      {index + 1}º
                    </div>
                  <div className="ml-4 w-10 h-10 bg-gray-100 rounded-full overflow-hidden flex-shrink-0 relative">
                    {player.photoUrl ? (
                      <Image src={player.photoUrl} alt={player.name} fill className="object-cover" />
                    ) : (
                      <Users className="w-full h-full p-2 text-gray-400" />
                    )}
                  </div>
                    <div className="ml-3 flex-1">
                      <p className="font-bold text-gray-900">{player.name}</p>
                      <p className="text-xs text-gray-500">{player.position}</p>
                    </div>
                    <div className="text-xl font-bold font-mono text-secondary-600">
                      {player.stats?.assists}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                Nenhuma assistência registrada ainda.
              </div>
            )}
          </div>
        )}

        {/* STANDINGS */}
        {activeTab === 'standings' && (
          <div className="space-y-6">
            {data.championships && data.championships.length > 0 ? (
              data.championships.map(champ => (
                <div key={champ.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="font-bold text-gray-900">{champ.name}</h2>
                    <p className="text-xs text-gray-500">{champ.season}</p>
                  </div>
                  
                  {champ.standings && champ.standings.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase">
                          <tr>
                            <th className="px-4 py-3 text-left">#</th>
                            <th className="px-4 py-3 text-left">Time</th>
                            <th className="px-4 py-3 text-center">P</th>
                            <th className="px-4 py-3 text-center">J</th>
                            <th className="px-4 py-3 text-center">V</th>
                            <th className="px-4 py-3 text-center">SG</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {champ.standings.sort((a, b) => a.position - b.position).map((team) => (
                            <tr key={team.teamName} className={team.teamName === data.name ? "bg-primary-50" : ""}>
                              <td className="px-4 py-3 font-bold text-gray-900">{team.position}º</td>
                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{team.teamName}</td>
                              <td className="px-4 py-3 text-center font-bold text-gray-900">{team.points}</td>
                              <td className="px-4 py-3 text-center text-gray-500">{team.games}</td>
                              <td className="px-4 py-3 text-center text-gray-500">{team.wins}</td>
                              <td className="px-4 py-3 text-center text-gray-500">{team.goalDifference}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      Tabela não disponível.
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-100 shadow-sm">
                Nenhum campeonato registrado.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

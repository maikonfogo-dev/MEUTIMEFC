"use client";

import { Calendar, MapPin, Plus, Trophy, Clock, Trash2, Edit, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Match, TeamData } from "@/types/team";

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await fetch('/api/team');
      const data: TeamData = await res.json();
      
      const allMatches: Match[] = [
        ...(data.nextMatch ? [data.nextMatch] : []),
        ...(data.lastMatches || [])
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      // Remove duplicates if any
      const uniqueMatches = Array.from(new Map(allMatches.map(m => [m.id, m])).values());
      
      setMatches(uniqueMatches);
    } catch (error) {
      console.error('Failed to fetch matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (matchId: string) => {
    if (!confirm('Tem certeza que deseja remover este jogo?')) return;
    try {
      const res = await fetch('/api/team');
      const teamData: TeamData = await res.json();
      
      // Update both nextMatch and lastMatches
      const updatedNextMatch = teamData.nextMatch?.id === matchId ? undefined : teamData.nextMatch;
      const updatedLastMatches = teamData.lastMatches?.filter(m => m.id !== matchId) || [];
      
      await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...teamData, 
          nextMatch: updatedNextMatch,
          lastMatches: updatedLastMatches 
        }),
      });

      setMatches(prev => prev.filter(m => m.id !== matchId));
    } catch (error) {
      console.error('Failed to delete match:', error);
      alert('Erro ao remover jogo');
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partidas</h1>
          <p className="text-gray-500">Gerencie o calendário de jogos</p>
        </div>
        <Link
          href="/admin/matches/new"
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Jogo
        </Link>
      </div>

      <div className="grid gap-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group"
          >
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center justify-center w-16 text-center">
                <span className="text-xs font-bold text-gray-500 uppercase">
                  {new Date(match.date).toLocaleDateString('pt-BR', { month: 'short' })}
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  {new Date(match.date).getDate()}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(match.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              <div className="h-10 w-px bg-gray-100" />

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">
                    {match.isHome ? 'Meu Time' : match.opponent} 
                    <span className="mx-2 text-gray-400">vs</span> 
                    {match.isHome ? match.opponent : 'Meu Time'}
                  </h3>
                  {match.status === 'live' && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded-full animate-pulse">
                      AO VIVO
                    </span>
                  )}
                  {match.status === 'finished' && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full">
                      ENCERRADO
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    {match.championship || 'Amistoso'}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {match.location}
                  </div>
                  {(match.status === 'finished' || match.status === 'live') && match.score && (
                    <div className="font-mono font-bold text-gray-900 bg-gray-100 px-2 rounded">
                      {match.score.home} - {match.score.away}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link
                href={`/admin/matches/${match.id}`}
                className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
              </Link>
              <button
                onClick={() => handleDelete(match.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {matches.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-gray-900 font-medium">Nenhum jogo agendado</h3>
            <p className="text-gray-500 text-sm">Adicione partidas ao calendário do time.</p>
          </div>
        )}
      </div>
    </div>
  );
}

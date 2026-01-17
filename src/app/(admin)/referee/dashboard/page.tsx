'use client';

import { Calendar, Clock, MapPin, ChevronRight, CheckCircle, Flag } from 'lucide-react';
import Link from 'next/link';
import { mockLeagueData } from '@/data/mockLeague';

export default function RefereeDashboard() {
  const games = mockLeagueData.nextGames;

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 pb-20">
      
      {/* Mobile Header */}
      <header className="bg-gray-900 text-white p-6 pb-12 rounded-b-[2.5rem] shadow-xl relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold font-heading">Olá, Juiz</h1>
            <p className="text-gray-400 text-sm">Pronto para o jogo?</p>
          </div>
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
             <Flag className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
        
        {/* Next Game Highlight */}
        <div className="bg-white text-gray-900 p-4 rounded-xl shadow-lg transform translate-y-4">
           <div className="flex justify-between items-center mb-2">
             <span className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1">
               <Clock className="w-3 h-3" /> Em 15 min
             </span>
             <span className="text-xs font-bold text-gray-400">Copa Verão</span>
           </div>
           <div className="flex justify-between items-center font-bold text-lg mb-2">
             <span>Real Madruga</span>
             <span className="text-gray-300">vs</span>
             <span>Unidos da Vila</span>
           </div>
           <Link href="/referee/match/game_101" className="block w-full py-3 bg-primary-600 text-white text-center rounded-lg font-bold hover:bg-primary-700 transition-colors">
             Iniciar Partida
           </Link>
        </div>
      </header>

      <main className="px-4 pt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 px-2">Escala de Jogos</h2>
        
        <div className="space-y-4">
          {games.map((game) => (
            <Link key={game.id} href={`/referee/match/${game.id}`} className="block bg-white p-4 rounded-xl shadow-sm border border-gray-200 active:scale-95 transition-transform">
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-500 uppercase">{game.championshipName}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" /> {new Date(game.date).toLocaleDateString('pt-BR')}
                    <Clock className="w-3 h-3 ml-2" /> {new Date(game.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                {game.status === 'live' ? (
                  <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                    EM ANDAMENTO
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-full">
                    AGENDADO
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-400 text-xs">
                    {game.homeTeam.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="font-bold text-gray-800">{game.homeTeam}</span>
                </div>
                <span className="text-gray-300 font-bold">vs</span>
                <div className="flex items-center gap-3 flex-row-reverse text-right">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-400 text-xs">
                    {game.awayTeam.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="font-bold text-gray-800">{game.awayTeam}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4 px-2">Histórico Recente</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 opacity-60">
           <div className="flex items-center gap-3 text-gray-500">
             <CheckCircle className="w-5 h-5" />
             <span className="text-sm font-medium">Nenhum jogo finalizado recentemente.</span>
           </div>
        </div>
      </main>
    </div>
  );
}

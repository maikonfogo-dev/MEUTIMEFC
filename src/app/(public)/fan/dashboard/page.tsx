'use client';

import { PlayCircle, Calendar, Trophy, Shirt, Star, ChevronRight, Search, Bell, Menu, X, DollarSign } from 'lucide-react';
import { mockLeagueData } from '@/data/mockLeague';
import Link from 'next/link';

export default function FanDashboard() {
  const { nextGames, championships } = mockLeagueData;
  const liveGame = nextGames.find(g => g.status === 'live');

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      
      {/* Mobile Header */}
      <nav className="bg-white px-4 py-3 shadow-sm sticky top-0 z-30 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Menu className="w-6 h-6 text-gray-600" />
          <span className="text-lg font-bold font-heading text-primary-600">MeuTime FC</span>
        </div>
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 text-gray-500" />
          <Link href="/fan/notifications">
            <Bell className="w-5 h-5 text-gray-500 hover:text-primary-600 transition-colors" />
          </Link>
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
            <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">TC</div>
          </div>
        </div>
      </nav>

      <main className="space-y-6">
        
        {/* Live Game Highlight */}
        {liveGame && (
          <section className="bg-gray-900 text-white pb-6">
            <div className="relative aspect-video w-full bg-black">
              {/* Simulated Video Player */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
                <PlayCircle className="w-16 h-16 text-white opacity-80 animate-pulse" />
              </div>
              <div className="absolute top-4 left-4 bg-red-600 px-2 py-1 rounded text-xs font-bold animate-pulse">AO VIVO</div>
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="font-bold text-lg drop-shadow-md">{liveGame.championshipName}</h2>
                <p className="text-sm drop-shadow-md">Transmissão Oficial</p>
              </div>
            </div>
            
            <div className="px-4 mt-4">
              <div className="flex justify-between items-center bg-gray-800 p-4 rounded-xl border border-gray-700">
                <div className="flex flex-col items-center w-1/3">
                  <div className="w-10 h-10 bg-gray-700 rounded-full mb-1 flex items-center justify-center font-bold text-xs">RM</div>
                  <span className="text-xs font-bold text-center leading-tight">{liveGame.homeTeam}</span>
                </div>
                <div className="text-2xl font-bold font-mono tracking-widest text-center w-1/3">
                  {liveGame.homeScore} - {liveGame.awayScore}
                  <span className="block text-[10px] font-sans font-normal text-red-500 mt-1">2º TEMPO • 32&apos;</span>
                </div>
                <div className="flex flex-col items-center w-1/3">
                  <div className="w-10 h-10 bg-gray-700 rounded-full mb-1 flex items-center justify-center font-bold text-xs">UV</div>
                  <span className="text-xs font-bold text-center leading-tight">{liveGame.awayTeam}</span>
                </div>
              </div>
              
              {/* Banner Patrocinado Live */}
              <div className="mt-4 bg-white rounded-lg p-2 flex items-center justify-between shadow-sm">
                 <div className="flex items-center gap-2">
                   <span className="text-2xl">🍺</span>
                   <div>
                     <p className="text-xs font-bold text-gray-900">Bar do Zé</p>
                     <p className="text-[10px] text-gray-500">O melhor pós-jogo da cidade!</p>
                   </div>
                 </div>
                 <button className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full">
                   Ver Oferta
                 </button>
              </div>
            </div>
          </section>
        )}

        {/* Upcoming Games */}
        <section className="px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-900 text-lg">Próximos Jogos</h2>
            <Link href="#" className="text-xs font-bold text-primary-600">Ver todos</Link>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {nextGames.filter(g => g.status !== 'live').map((game) => (
              <div key={game.id} className="min-w-[280px] bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-shrink-0">
                <div className="flex justify-between items-center mb-3">
                   <span className="text-[10px] font-bold text-gray-500 uppercase bg-gray-100 px-2 py-1 rounded">{game.championshipName}</span>
                   <span className="text-[10px] font-bold text-gray-400">
                     {new Date(game.date).toLocaleDateString('pt-BR', {weekday: 'short', day: '2-digit', month: '2-digit'})}
                   </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                   <div className="flex items-center gap-2">
                     <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold">
                       {game.homeTeam.substring(0, 2)}
                     </div>
                     <span className="font-bold text-sm">{game.homeTeam}</span>
                   </div>
                   <span className="text-xs text-gray-400 font-bold">VS</span>
                   <div className="flex items-center gap-2 flex-row-reverse">
                     <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold">
                       {game.awayTeam.substring(0, 2)}
                     </div>
                     <span className="font-bold text-sm">{game.awayTeam}</span>
                   </div>
                </div>
                <button className="w-full py-2 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold hover:bg-primary-50 hover:text-primary-600 transition-colors flex items-center justify-center gap-1">
                  <Bell className="w-3 h-3" /> Lembrar-me
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Championships List */}
        <section className="px-4">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Campeonatos</h2>
          <div className="space-y-3">
            {championships.map((champ) => (
              <div key={champ.id} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm">{champ.name}</h3>
                  <p className="text-xs text-gray-500">{champ.teamsCount} Times • Fase de Grupos</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </div>
            ))}
          </div>
        </section>

        {/* Monetization / Store */}
        <section className="px-4">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-500 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8 blur-2xl"></div>
            <div className="relative z-10">
              <h3 className="font-bold text-xl mb-2">Sócio Torcedor</h3>
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                   <Star className="w-6 h-6 text-yellow-300 fill-current" />
                </div>
                <div>
                  <p className="font-bold text-sm">Seus Benefícios Ativos:</p>
                  <ul className="text-xs text-primary-50 list-disc pl-4 mt-1 space-y-1">
                    <li>Desconto de 20% na Loja Oficial</li>
                    <li>Acesso antecipado a ingressos</li>
                    <li>Carteirinha Digital</li>
                  </ul>
                </div>
              </div>
              <button className="w-full bg-white text-primary-900 px-6 py-3 rounded-lg font-bold text-sm shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-2">
                <span className="text-lg">⚡</span> Comprar em 1 Clique
              </button>
            </div>
          </div>
        </section>

        <section className="px-4 pb-8">
           <div className="flex justify-between items-center mb-4">
             <h2 className="font-bold text-gray-900 text-lg">Loja Oficial</h2>
             <Link href="#" className="text-xs font-bold text-primary-600">Ver pedidos</Link>
           </div>
           
           {/* Meus Pedidos Recentes */}
           <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 shadow-sm">
             <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Última Compra</h3>
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                 <Shirt className="w-6 h-6 text-gray-400" />
               </div>
               <div className="flex-1">
                 <p className="font-bold text-sm text-gray-900">Camisa Oficial 2026</p>
                 <p className="text-xs text-gray-500">Entregue em 10/01/2026</p>
               </div>
               <button className="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg">
                 Repetir
               </button>
             </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
               <div className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center">
                 <Shirt className="w-10 h-10 text-gray-300" />
               </div>
               <p className="font-bold text-sm text-gray-900">Camisa Oficial 2026</p>
               <p className="text-emerald-600 font-bold text-sm mt-1">R$ 129,90</p>
             </div>
             <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
               <div className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center">
                 <Trophy className="w-10 h-10 text-gray-300" />
               </div>
               <p className="font-bold text-sm text-gray-900">Caneca do Campeão</p>
               <p className="text-emerald-600 font-bold text-sm mt-1">R$ 39,90</p>
             </div>
           </div>
        </section>

      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 py-3 px-6 flex justify-between items-center z-30">
        <Link href="#" className="flex flex-col items-center gap-1 text-primary-600">
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-bold">Jogos</span>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
          <Trophy className="w-5 h-5" />
          <span className="text-[10px] font-medium">Tabelas</span>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
          <PlayCircle className="w-5 h-5" />
          <span className="text-[10px] font-medium">Ao Vivo</span>
        </Link>
        <Link href="/team/meutime-fc/membership" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
          <DollarSign className="w-5 h-5" />
          <span className="text-[10px] font-medium">Sócio</span>
        </Link>
      </nav>

    </div>
  );
}

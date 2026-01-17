import { mockTeamData } from '@/data/mockTeam';
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function MatchesPage() {
  const { nextMatch, lastMatches } = mockTeamData;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold font-heading mb-6 text-gray-800">Jogos</h1>

      {nextMatch && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-primary-600 mb-3">Próximo Confronto</h2>
          <div className="bg-white rounded-xl shadow-md border border-primary-100 p-5 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-primary-500"></div>
             <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
               <span>{nextMatch.championship}</span>
               <span>{new Date(nextMatch.date).toLocaleDateString('pt-BR')}</span>
             </div>
             
             <div className="flex items-center justify-between mb-4">
                <div className="text-center w-1/3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2 relative overflow-hidden">
                    <Image src={mockTeamData.logoUrl} alt={mockTeamData.name} fill className="object-contain" />
                  </div>
                  <span className="font-bold text-sm block">{mockTeamData.name}</span>
                </div>
                <div className="text-center w-1/3">
                  <span className="text-2xl font-bold text-gray-300">VS</span>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(nextMatch.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
                <div className="text-center w-1/3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center text-gray-400 font-bold text-xs">ADV</div>
                  <span className="font-bold text-sm block">{nextMatch.opponent}</span>
                </div>
             </div>
             
             <div className="flex items-center justify-center text-xs text-gray-500 gap-1">
               <MapPin className="w-3 h-3" />
               {nextMatch.location}
             </div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Últimos Resultados</h2>
        <div className="space-y-3">
          {lastMatches.map((match) => (
            <div key={match.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 w-1/3">
                 <span className={`font-bold text-sm truncate ${match.score!.home > match.score!.away ? 'text-green-600' : ''}`}>
                   {match.isHome ? mockTeamData.name : match.opponent}
                 </span>
              </div>
              <div className="flex items-center gap-3 font-mono font-bold text-lg bg-gray-50 px-3 py-1 rounded">
                <span>{match.score?.home}</span>
                <span>-</span>
                <span>{match.score?.away}</span>
              </div>
              <div className="flex items-center justify-end gap-2 w-1/3 text-right">
                 <span className={`font-bold text-sm truncate ${match.score!.away > match.score!.home ? 'text-green-600' : ''}`}>
                   {!match.isHome ? mockTeamData.name : match.opponent}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

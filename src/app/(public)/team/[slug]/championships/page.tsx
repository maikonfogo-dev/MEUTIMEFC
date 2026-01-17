'use client';

import { PlayCircle, Calendar, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { mockTeamData } from '@/data/mockTeam';
import Image from 'next/image';

export default function ChampionshipsPage() {
  const params = useParams();
  const team = mockTeamData;
  const championships = team.championships || [];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <header className="bg-white p-6 sticky top-0 z-10 border-b border-gray-100">
        <h1 className="text-2xl font-bold font-heading text-gray-900 mb-2">Seu campeonato ao vivo, profissional e acessível.</h1>
        <p className="text-gray-500 mb-4">Crie campeonatos, gerencie partidas e transmita jogos ao vivo em uma única plataforma.</p>
        
        {/* Benefits Icons */}
        <div className="flex gap-4 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          <div className="flex items-center gap-2 whitespace-nowrap bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
             <PlayCircle className="w-4 h-4 text-red-600" />
             <span className="text-xs font-bold text-gray-700">Transmissão ao vivo</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
             <Calendar className="w-4 h-4 text-blue-600" />
             <span className="text-xs font-bold text-gray-700">Tabelas automáticas</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
             <Trophy className="w-4 h-4 text-yellow-600" />
             <span className="text-xs font-bold text-gray-700">Estatísticas reais</span>
          </div>
        </div>

        <Link
          href="/admin/register?type=league"
          className="w-full bg-primary-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary-600/20 hover:bg-primary-700 transition-colors text-center block"
        >
          Criar Campeonato Agora
        </Link>
      </header>

      <div className="p-4 space-y-4">
        {championships.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Nenhum campeonato encontrado.
          </div>
        ) : (
          championships.map((champ) => (
            <Link
              key={champ.id}
              href={`/team/${params.slug}/championships/${champ.id}`}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden block hover:shadow-md transition-shadow"
            >
              <div className="flex p-4 gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 p-1 flex items-center justify-center relative overflow-hidden">
                  {champ.logoUrl ? (
                    <Image src={champ.logoUrl} alt={champ.name} fill className="object-contain" />
                  ) : (
                    <Trophy className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                      {champ.season}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                       champ.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                       champ.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                       'bg-gray-100 text-gray-700'
                    }`}>
                      {champ.status === 'ongoing' ? 'Ao Vivo' : champ.status === 'upcoming' ? 'Em Breve' : 'Finalizado'}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 truncate">{champ.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1 gap-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {champ.type === 'points' ? 'Pontos Corridos' : 'Mata-mata'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-lg group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    Acompanhar
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}

        {/* Live Stream Banner (if any) */}
        {team.liveStreams && team.liveStreams.some(s => s.status === 'live' || s.status === 'scheduled') && (
          <div className="mt-8">
            <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-red-600" />
              Transmissões
            </h2>
            <div className="space-y-3">
              {team.liveStreams.map(stream => (
                <Link 
                  key={stream.id} 
                  href={`/team/${params.slug}/live/${stream.id}`}
                  className="block bg-black rounded-xl overflow-hidden relative group"
                >
                  <div className="aspect-video bg-gray-900 flex items-center justify-center relative opacity-80 group-hover:opacity-100 transition-opacity">
                    <Image src={`https://img.youtube.com/vi/${stream.embedUrl.split('/').pop()}/0.jpg`} alt={stream.title} fill className="object-cover absolute inset-0 opacity-50" />
                    <PlayCircle className="w-12 h-12 text-white relative z-10" />
                    
                    {stream.status === 'live' && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        AO VIVO
                      </div>
                    )}
                    {stream.status === 'scheduled' && (
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                        EM BREVE
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-gray-900 text-white">
                    <h3 className="font-bold text-sm line-clamp-1">{stream.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {stream.status === 'live' ? `${stream.viewers} assistindo` : 'Toque para definir lembrete'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

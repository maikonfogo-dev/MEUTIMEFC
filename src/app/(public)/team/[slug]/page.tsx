import { mockTeamData } from '@/data/mockTeam';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ChevronRight, Trophy, Crown, ShoppingBag } from 'lucide-react';

export default async function TeamHome({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Em um app real, buscaríamos os dados do time com base no slug
  const team = mockTeamData;

  // Filter active sponsors and sort by order
  const sponsors = team.sponsors
    .filter(s => s.status === 'active')
    .sort((a, b) => (a.order || 99) - (b.order || 99));

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="bg-primary-600 text-white p-6 pb-12 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full p-2 mb-3 shadow-md">
             <Image
               src={team.logoUrl}
               alt={team.name}
               width={96}
               height={96}
               className="w-full h-full object-contain rounded-full"
             />
          </div>
          <h1 className="text-2xl font-bold font-heading">{team.name}</h1>
          <p className="text-primary-100 text-sm">Desde 2015</p>
        </div>
      </header>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 px-4 -mt-8 relative z-20 mb-2">
        <Link href={`/team/${slug}/stats`} className="bg-white p-3 rounded-xl shadow-md flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
          <Trophy className="w-6 h-6 text-yellow-500 mb-1" />
          <span className="text-xs font-bold text-gray-700">Estatísticas</span>
        </Link>
        <Link href={`/team/${slug}/membership`} className="bg-white p-3 rounded-xl shadow-md flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
          <Crown className="w-6 h-6 text-primary-600 mb-1" />
          <span className="text-xs font-bold text-gray-700">Sócio</span>
        </Link>
        <Link href={`/team/${slug}/store`} className="bg-white p-3 rounded-xl shadow-md flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
          <ShoppingBag className="w-6 h-6 text-green-600 mb-1" />
          <span className="text-xs font-bold text-gray-700">Loja</span>
        </Link>
      </div>

      <div className="p-4 space-y-6">
        {/* Live Stream Banner */}
        {team.liveStreams?.some(s => s.status === 'live') && (
          <Link href={`/team/${slug}/live/${team.liveStreams?.find(s => s.status === 'live')?.id}`} className="block relative rounded-xl overflow-hidden shadow-lg group">
             <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 animate-pulse z-10">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                AO VIVO
             </div>
             <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                 <Image
                   src={`https://img.youtube.com/vi/${team.liveStreams?.find(s => s.status === 'live')?.embedUrl.split('/').pop()}/hqdefault.jpg`}
                   alt={team.liveStreams?.find(s => s.status === 'live')?.title || 'Transmissão ao vivo'}
                   fill
                   className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                 />
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
                       <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                    <span className="text-white font-bold text-sm shadow-black drop-shadow-md">Assistir Agora</span>
                 </div>
             </div>
             <div className="bg-gray-900 p-3">
               <h3 className="text-white font-bold text-sm truncate">{team.liveStreams?.find(s => s.status === 'live')?.title}</h3>
             </div>
          </Link>
        )}

        {/* Next Match */}
        {team.nextMatch && (
          <section>
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-gray-800">Próximo Jogo</h2>
              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">
                {team.nextMatch.championship}
              </span>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center w-1/3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full mb-2 p-1">
                    <Image
                      src={team.logoUrl}
                      alt={team.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <span className="font-bold text-sm text-center truncate w-full">{team.name}</span>
                </div>
                <div className="flex flex-col items-center justify-center w-1/3">
                  <span className="text-xs text-gray-500 mb-1 font-mono">
                    {new Date(team.nextMatch.date).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="text-xl font-bold text-gray-800">VS</span>
                  <span className="text-xs text-gray-500 mt-1 text-center font-mono">
                    {new Date(team.nextMatch.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex flex-col items-center w-1/3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full mb-2 flex items-center justify-center text-gray-400">
                    <span className="text-xs">ADV</span>
                  </div>
                  <span className="font-bold text-sm text-center truncate w-full">{team.nextMatch.opponent}</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center text-xs text-gray-500 gap-2">
                <Calendar className="w-3 h-3" />
                <span>{team.nextMatch.location}</span>
              </div>
            </div>
          </section>
        )}

        {/* Championships */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-gray-800">Campeonatos</h2>
            <Link href={`/team/${slug}/championships`} className="text-primary-600 text-sm font-medium flex items-center">
              Ver todos <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {team.championships?.slice(0, 2).map((champ) => (
              <Link
                key={champ.id}
                href={`/team/${slug}/championships/${champ.id}`}
                className="bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3 shadow-sm"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-lg p-1 flex-shrink-0">
                  {champ.logoUrl ? (
                    <Image
                      src={champ.logoUrl}
                      alt={champ.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Trophy className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-900">{champ.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="bg-primary-50 text-primary-700 px-1.5 py-0.5 rounded text-[10px] font-bold">{champ.season}</span>
                    <span>•</span>
                    <span>{champ.type === 'points' ? 'Pontos' : 'Copa'}</span>
                  </div>
                </div>
                {champ.status === 'ongoing' && (
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* News */}
        <section>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-gray-800">Notícias</h2>
            <button className="text-primary-600 text-sm font-medium flex items-center">
              Ver todas <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {team.news.map((news) => (
              <div key={news.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex">
                <div className="w-24 h-24 bg-gray-200 flex-shrink-0 relative">
                  {news.imageUrl && (
                    <Image
                      src={news.imageUrl}
                      alt={news.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-3 flex flex-col justify-center">
                  <span className="text-xs text-primary-600 font-medium mb-1">{new Date(news.date).toLocaleDateString('pt-BR')}</span>
                  <h3 className="font-bold text-gray-900 leading-tight mb-1">{news.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{news.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sponsors */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-gray-800">Patrocinadores</h2>
            <Link href={`/team/${slug}/sponsors`} className="text-primary-600 text-sm font-medium flex items-center">
              Ver todos <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {sponsors.slice(0, 4).map((sponsor) => (
              <Link 
                href={`/team/${slug}/sponsors/${sponsor.id}`}
                key={sponsor.id}  
                className={`bg-white rounded-lg border border-gray-100 p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow relative overflow-hidden ${sponsor.category === 'Master' ? 'col-span-2 border-primary-200 bg-primary-50' : ''}`}
              >
                {sponsor.category === 'Master' && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[8px] font-bold px-2 py-0.5 rounded-bl-lg">
                    MASTER
                  </div>
                )}
                <div className={`flex items-center justify-center mb-2 ${sponsor.category === 'Master' ? 'h-16 w-full' : 'h-12 w-full'}`}>
                   <Image
                     src={sponsor.logoUrl}
                     alt={sponsor.name}
                     width={160}
                     height={64}
                     className="max-w-full max-h-full object-contain"
                   />
                </div>
                <span className="font-medium text-xs text-gray-900">{sponsor.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

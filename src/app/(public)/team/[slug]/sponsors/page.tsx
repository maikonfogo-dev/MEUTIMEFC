"use client";

import { mockTeamData } from "@/data/mockTeam";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, MessageCircle } from "lucide-react";
import { SponsorCategory } from "@/types/team";
import Image from "next/image";

const categoryLabels: Record<SponsorCategory, string> = {
  'Master': 'Patrocinadores Master',
  'Ouro': 'Patrocinadores Ouro',
  'Prata': 'Patrocinadores Prata',
  'Apoio': 'Apoiadores'
};

const categoryOrder: SponsorCategory[] = ['Master', 'Ouro', 'Prata', 'Apoio'];

export default function SponsorsPublicPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const team = mockTeamData; // In real app, fetch by slug
  const sponsors = team.sponsors.filter(s => s.status === 'active').sort((a, b) => (a.order || 99) - (b.order || 99));

  // Group sponsors by category
  const groupedSponsors = sponsors.reduce((acc, sponsor) => {
    const category = sponsor.category || 'Apoio';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(sponsor);
    return acc;
  }, {} as Record<SponsorCategory, typeof sponsors>);

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white p-4 sticky top-0 z-10 border-b border-gray-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href={`/team/${slug}`} className="p-2 -ml-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold font-heading text-gray-900">Patrocinadores</h1>
        </div>
        <Link 
          href={`/team/${slug}/sponsors/advertise`}
          className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full hover:bg-primary-100 transition-colors"
        >
          Quero anunciar
        </Link>
      </header>

      {/* Hero / Copy Comercial */}
      <div className="bg-primary-900 text-white p-6 -mt-px">
        <h2 className="text-2xl font-bold font-heading mb-3">
          Sua marca apoiando o futebol local.
        </h2>
        <p className="text-primary-100 text-sm leading-relaxed mb-6">
          Visibilidade real para quem acredita no esporte. A Área do Patrocinador do MeuTime FC conecta marcas a times com engajamento verdadeiro.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-primary-50">
            <span className="text-secondary-400">✔</span> Exposição constante no app
          </div>
          <div className="flex items-center gap-2 text-sm text-primary-50">
            <span className="text-secondary-400">✔</span> Público local e engajado
          </div>
          <div className="flex items-center gap-2 text-sm text-primary-50">
            <span className="text-secondary-400">✔</span> Presença digital profissional
          </div>
          <div className="flex items-center gap-2 text-sm text-primary-50">
            <span className="text-secondary-400">✔</span> Retorno real
          </div>
        </div>

        <div className="p-4 bg-primary-800/50 rounded-lg border border-primary-700/50">
          <p className="text-center font-medium text-white mb-3">
            &quot;Quem apoia o futebol de bairro, ganha o respeito da comunidade.&quot;
          </p>
          <button 
            onClick={() => window.open(`https://wa.me/${team.whatsapp}?text=Quero ser um patrocinador do ${team.name}`, '_blank')}
            className="w-full bg-secondary-500 text-primary-900 font-bold py-3 rounded-lg hover:bg-secondary-400 transition-colors"
          >
            Seja um patrocinador
          </button>
        </div>
      </div>

      <div className="p-4 space-y-8">
        {categoryOrder.map((category) => {
          const categorySponsors = groupedSponsors[category];
          if (!categorySponsors || categorySponsors.length === 0) return null;

          return (
            <section key={category}>
              <h2 className="text-lg font-bold text-gray-800 mb-4 pl-2 border-l-4 border-primary-500">
                {categoryLabels[category]}
              </h2>
              
              <div className={`grid gap-4 ${category === 'Master' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {categorySponsors.map((sponsor) => (
                  <Link 
                    key={sponsor.id}
                    href={`/team/${params.slug}/sponsors/${sponsor.id}`}
                    className={`
                      bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-all flex flex-col items-center text-center group relative overflow-hidden
                      ${category === 'Master' 
                        ? 'border-yellow-400 ring-1 ring-yellow-400 shadow-yellow-100' 
                        : 'border-gray-100'
                      }
                    `}
                  >
                    {category === 'Master' && (
                      <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-bl-lg z-10">
                        MASTER
                      </div>
                    )}
                    
                    <div className={`relative mb-3 flex items-center justify-center overflow-hidden ${category === 'Master' ? 'h-40 w-full' : 'h-20 w-full'}`}>
                      <Image 
                        src={sponsor.logoUrl} 
                        alt={sponsor.name}
                        fill
                        className="object-contain filter group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <h3 className={`font-bold text-gray-900 mb-1 ${category === 'Master' ? 'text-xl' : 'text-base'}`}>
                      {sponsor.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">{sponsor.description}</p>
                    
                    <div className="mt-auto flex gap-2 w-full">
                      {sponsor.websiteUrl && (
                        <button 
                          className="flex-1 py-1.5 flex items-center justify-center gap-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-100"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(sponsor.websiteUrl, '_blank');
                          }}
                        >
                          <ExternalLink className="w-3 h-3" />
                          Site
                        </button>
                      )}
                      {sponsor.whatsapp && (
                        <button 
                          className="flex-1 py-1.5 flex items-center justify-center gap-1 bg-green-50 text-green-600 text-xs font-medium rounded-lg hover:bg-green-100"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(`https://wa.me/${sponsor.whatsapp}`, '_blank');
                          }}
                        >
                          <MessageCircle className="w-3 h-3" />
                          Zap
                        </button>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {sponsors.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>Seja o primeiro patrocinador deste time!</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { mockTeamData } from '@/data/mockTeam';
import { Trophy } from 'lucide-react';

export default function AboutPage() {
  const { titles, sponsors } = mockTeamData;

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold font-heading text-gray-800">Sobre o Clube</h1>

      {/* Títulos */}
      <section>
        <h2 className="text-lg font-semibold text-primary-600 mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5" /> Galeria de Troféus
        </h2>
        <div className="space-y-4">
          {titles.map((title) => (
            <div key={title.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4 items-center">
              <div className="w-16 h-16 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-500">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{title.name}</h3>
                <p className="text-sm text-gray-500">{title.championship} • {title.year}</p>
              </div>
            </div>
          ))}
          {titles.length === 0 && (
            <p className="text-gray-500 text-sm">Ainda estamos em busca da primeira taça!</p>
          )}
        </div>
      </section>

      {/* Todos os Patrocinadores */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Nossos Parceiros</h2>
        <div className="grid grid-cols-1 gap-4">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center text-xs text-gray-400 font-bold">
                LOGO
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{sponsor.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{sponsor.description}</p>
                {sponsor.websiteUrl && (
                  <a href={sponsor.websiteUrl} target="_blank" className="text-primary-600 text-xs font-medium hover:underline">
                    Visitar site
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="pt-8 text-center">
        <p className="text-xs text-gray-400">
          Desenvolvido com ❤️ por <span className="font-bold text-gray-600">MeuTime FC</span>
        </p>
      </section>
    </div>
  );
}

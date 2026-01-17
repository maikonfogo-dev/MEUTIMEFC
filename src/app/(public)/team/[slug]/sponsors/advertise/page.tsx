"use client";

import { mockTeamData } from "@/data/mockTeam";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Smartphone, Users, Globe, Trophy } from "lucide-react";
import { useParams } from "next/navigation";

export default function SponsorAdvertisePage() {
  const params = useParams();
  const team = mockTeamData; // In real app, fetch by params.slug

  return (
    <div className="pb-20 bg-white min-h-screen">
      {/* Header */}
      <header className="bg-white p-4 sticky top-0 z-10 border-b border-gray-100 flex items-center gap-4">
        <Link href={`/team/${params.slug}/sponsors`} className="p-2 -ml-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-bold font-heading text-gray-900">Seja um Patrocinador</h1>
      </header>

      {/* Hero Section */}
      <div className="bg-primary-900 text-white px-6 py-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold font-heading mb-4">
            Apoiando o futebol local.<br />Fortalecendo a comunidade.
          </h2>
          <p className="text-primary-100 text-lg max-w-lg mx-auto leading-relaxed">
            Conecte sua marca a quem vive e respira o esporte com paixão verdadeira.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-12">
        {/* Quem Somos */}
        <section className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quem Somos</h3>
          <p className="text-gray-600 leading-relaxed">
            O <span className="font-bold text-primary-700">{team.name}</span> utiliza a plataforma MeuTime FC para organizar e divulgar suas atividades, conectando clube, torcedores e marcas em um único ecossistema digital profissional e engajado.
          </p>
        </section>

        {/* Por Que Patrocinar */}
        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Por que patrocinar?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all">
              <div className="bg-primary-100 p-3 rounded-full text-primary-600 mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Comunidade</h4>
              <p className="text-sm text-gray-600">Apoie o desenvolvimento social e esportivo local.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all">
              <div className="bg-secondary-100 p-3 rounded-full text-secondary-600 mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Visibilidade</h4>
              <p className="text-sm text-gray-600">Sua marca vista por torcedores, jogadores e famílias.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600 mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Esporte e Saúde</h4>
              <p className="text-sm text-gray-600">Associe sua empresa a valores positivos e saudáveis.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all">
              <div className="bg-green-100 p-3 rounded-full text-green-600 mb-4">
                <Smartphone className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Relacionamento</h4>
              <p className="text-sm text-gray-600">Canal direto com um público fiel e engajado.</p>
            </div>
          </div>
        </section>

        {/* Onde sua marca aparece */}
        <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Onde sua marca aparece</h3>
          <ul className="space-y-4 max-w-md mx-auto">
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-secondary-500 flex-shrink-0" />
              <span className="text-gray-700">App oficial do time (PWA)</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-secondary-500 flex-shrink-0" />
              <span className="text-gray-700">Página exclusiva do patrocinador</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-secondary-500 flex-shrink-0" />
              <span className="text-gray-700">Destaques em jogos e campeonatos</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-secondary-500 flex-shrink-0" />
              <span className="text-gray-700">Comunicação direta com torcedores</span>
            </li>
          </ul>
        </section>

        {/* Formatos */}
        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Formatos de Patrocínio</h3>
          <div className="space-y-4">
            <div className="border border-yellow-400 bg-yellow-50 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                PREMIUM
              </div>
              <h4 className="font-bold text-yellow-900 text-lg mb-1">Patrocinador Master</h4>
              <p className="text-yellow-800 text-sm">Destaque máximo na home, camisa e topo da lista.</p>
            </div>
            <div className="border border-gray-200 bg-white rounded-xl p-6">
              <h4 className="font-bold text-gray-900 text-lg mb-1">Patrocinador Oficial</h4>
              <p className="text-gray-600 text-sm">Visibilidade garantida na lista e detalhes.</p>
            </div>
            <div className="border border-gray-200 bg-white rounded-xl p-6">
              <h4 className="font-bold text-gray-900 text-lg mb-1">Apoiador</h4>
              <p className="text-gray-600 text-sm">Presença digital acessível para pequenos negócios.</p>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="bg-primary-900 rounded-2xl p-8 text-center text-white">
          <p className="font-heading text-xl font-bold mb-6 italic">
            &quot;Quem apoia o futebol de bairro, conquista a confiança da comunidade.&quot;
          </p>
          <button 
            onClick={() => {
              if (team.whatsapp) {
                window.open(`https://wa.me/${team.whatsapp}?text=Olá, tenho interesse em patrocinar o ${team.name}`, '_blank');
              }
            }}
            disabled={!team.whatsapp}
            className="w-full sm:w-auto bg-secondary-500 text-primary-900 font-bold px-8 py-4 rounded-xl hover:bg-secondary-400 transition-colors shadow-lg shadow-secondary-900/20 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Quero ser um Patrocinador
          </button>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-primary-200 text-sm">
            {team.whatsapp && (
              <span className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" /> WhatsApp: {team.whatsapp}
              </span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

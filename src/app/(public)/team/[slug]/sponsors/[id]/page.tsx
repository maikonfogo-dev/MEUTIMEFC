"use client";

import { mockTeamData } from "@/data/mockTeam";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Globe, Instagram, MessageCircle, Share2, Award } from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function SponsorDetailPage() {
  const params = useParams();
  const team = mockTeamData; // In real app, fetch by params.slug
  const sponsor = team.sponsors.find(s => s.id === params.id);

  if (!sponsor) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <p className="text-gray-500 mb-4">Patrocinador não encontrado.</p>
        <Link href={`/team/${params.slug}/sponsors`} className="text-primary-600 font-medium">
          Voltar para Patrocinadores
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white p-4 sticky top-0 z-10 border-b border-gray-100 flex items-center justify-between">
        <Link href={`/team/${params.slug}/sponsors`} className="p-2 -ml-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-bold font-heading text-gray-900 truncate max-w-[200px]">{sponsor.name}</h1>
        <button className="p-2 -mr-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-full transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </header>

      <div className="p-4 space-y-6">
        {/* Logo Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
          {sponsor.category === 'Master' && (
             <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm">
               MASTER
             </div>
          )}
          <div className="w-48 h-32 mb-4 relative">
            <Image 
              src={sponsor.logoUrl} 
              alt={sponsor.name}
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">{sponsor.name}</h2>
          <p className="text-gray-500 text-center text-sm">{sponsor.description}</p>
        </div>

        {/* Seal */}
        <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 flex items-center gap-3">
          <div className="bg-primary-100 p-2 rounded-full text-primary-600">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-primary-900 text-sm">Apoiador do Futebol Amador</h3>
            <p className="text-xs text-primary-700">Esta empresa incentiva o esporte local.</p>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3 text-lg">Sobre</h3>
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {sponsor.description}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {sponsor.websiteUrl && (
            <a 
              href={sponsor.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">Visitar Site Oficial</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          )}

          {sponsor.instagramUrl && (
            <a 
              href={sponsor.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-pink-50 p-2 rounded-lg text-pink-600 group-hover:bg-pink-100 transition-colors">
                  <Instagram className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">Seguir no Instagram</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          )}

          {sponsor.whatsapp && (
            <a 
              href={`https://wa.me/${sponsor.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-green-600 rounded-xl shadow-sm hover:bg-green-700 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg text-white">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="font-medium text-white">Falar no WhatsApp</span>
              </div>
              <ExternalLink className="w-4 h-4 text-white/70" />
            </a>
          )}
          {sponsor.whatsapp && (
            <a 
              href={`https://wa.me/${sponsor.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-50 p-2 rounded-lg text-green-600 group-hover:bg-green-100 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">Falar no WhatsApp</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

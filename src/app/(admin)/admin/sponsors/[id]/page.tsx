"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Eye, 
  MousePointer, 
  Clock, 
  TrendingUp, 
  Calendar,
  Share2,
  Phone,
  ExternalLink,
  CheckCircle,
  MoreHorizontal,
  Download
} from "lucide-react";
import { mockTeamData } from "@/data/mockTeam";
import { SponsorCategory } from "@/types/team";

const categoryStyles: Record<SponsorCategory, { bg: string, text: string, badge: string }> = {
  'Master': { bg: 'bg-yellow-50', text: 'text-yellow-800', badge: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  'Ouro': { bg: 'bg-amber-50', text: 'text-amber-800', badge: 'bg-amber-100 text-amber-800 border-amber-200' },
  'Prata': { bg: 'bg-gray-50', text: 'text-gray-800', badge: 'bg-gray-100 text-gray-800 border-gray-200' },
  'Apoio': { bg: 'bg-blue-50', text: 'text-blue-800', badge: 'bg-blue-100 text-blue-700 border-blue-100' }
};

export default function SponsorDetailPage({ params }: { params: { id: string } }) {
  const sponsor = mockTeamData.sponsors.find(s => s.id === params.id) || mockTeamData.sponsors[0];
  const styles = (sponsor.category && categoryStyles[sponsor.category]) || categoryStyles['Apoio'];

  // Mock Data for Charts
  const dailyViews = [45, 52, 38, 65, 48, 59, 72]; // Last 7 days
  const clicksPerMonth = [12, 19, 15, 25, 32, 28]; // Last 6 months
  const maxView = Math.max(...dailyViews);
  const maxClick = Math.max(...clicksPerMonth);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/sponsors"
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden relative">
              <Image src={sponsor.logoUrl} alt={sponsor.name} fill className="object-contain p-2" sizes="64px" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-heading text-gray-900">{sponsor.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles.badge}`}>
                  {sponsor.category}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${sponsor.status === 'active' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                  {sponsor.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Compartilhar Relatório</span>
            </button>
            <button className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Baixar PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPIs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Eye className="w-16 h-16 text-primary-600" />
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-2">
            <Eye className="w-4 h-4" />
            Visualizações
          </div>
          <div className="text-3xl font-bold text-gray-900">{sponsor.stats?.views.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-xs font-medium text-green-600 mt-2 bg-green-50 w-fit px-2 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            +12.5% este mês
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <MousePointer className="w-16 h-16 text-blue-600" />
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-2">
            <MousePointer className="w-4 h-4" />
            Cliques
          </div>
          <div className="text-3xl font-bold text-gray-900">{sponsor.stats?.clicks.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-xs font-medium text-green-600 mt-2 bg-green-50 w-fit px-2 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            +5.2% este mês
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp className="w-16 h-16 text-amber-600" />
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-2">
            <TrendingUp className="w-4 h-4" />
            CTR (Taxa de Clique)
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {sponsor.stats ? ((sponsor.stats.clicks / sponsor.stats.views) * 100).toFixed(1) : '0.0'}%
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-gray-500 mt-2">
            Média do mercado: 1.5%
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Clock className="w-16 h-16 text-purple-600" />
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-2">
            <Clock className="w-4 h-4" />
            Dias Restantes
          </div>
          <div className="text-3xl font-bold text-gray-900">28</div>
          <div className="flex items-center gap-1 text-xs font-medium text-amber-600 mt-2 bg-amber-50 w-fit px-2 py-1 rounded-full">
            Renova em 15/03
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Views Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Visualizações por Dia</h3>
              <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500">
                <option>Últimos 7 dias</option>
                <option>Últimos 30 dias</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {dailyViews.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  <div 
                    className="w-full bg-primary-100 rounded-t-lg relative group-hover:bg-primary-200 transition-colors"
                    style={{ height: `${(value / maxView) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {value}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">Dia {index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clicks Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Cliques por Mês</h3>
              <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500">
                <option>Últimos 6 meses</option>
                <option>Este ano</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-4">
              {clicksPerMonth.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  <div 
                    className="w-full bg-secondary-400 rounded-t-lg relative group-hover:bg-secondary-300 transition-colors"
                    style={{ height: `${(value / maxClick) * 100}%` }}
                  >
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {value}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">Mês {index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Exposure & CTAs */}
        <div className="space-y-8">
          {/* Phone Mockup */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exposição da Marca</h3>
            <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[500px] w-[280px] shadow-xl">
              <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
              <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
              <div className="rounded-[2rem] overflow-hidden w-[252px] h-[472px] bg-white">
                {/* App Content Mockup */}
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="bg-primary-900 h-16 flex items-center justify-center pt-6">
                    <span className="text-white text-xs font-bold">MeuTime FC</span>
                  </div>
                  
                  {/* Body */}
                  <div className="flex-1 bg-gray-50 p-4 space-y-4 overflow-hidden">
                    {/* Sponsor Banner */}
                    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col items-center text-center animate-pulse">
                      <div className="w-16 h-16 mb-2 relative">
                        <Image src={sponsor.logoUrl} alt={sponsor.name} fill className="object-contain" sizes="64px" />
                      </div>
                      <p className="text-xs font-bold text-gray-800">{sponsor.name}</p>
                      <p className="text-[10px] text-gray-500 line-clamp-2">{sponsor.description}</p>
                      <button className="mt-2 w-full bg-secondary-500 text-primary-900 text-[10px] font-bold py-1.5 rounded">
                        Visitar Site
                      </button>
                    </div>
                    
                    {/* Fake Content */}
                    <div className="space-y-2 opacity-50">
                      <div className="h-24 bg-gray-200 rounded-lg"></div>
                      <div className="h-24 bg-gray-200 rounded-lg"></div>
                      <div className="h-24 bg-gray-200 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              Simulação de visualização no App do Torcedor
            </p>
          </div>

          {/* Action Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-secondary-500 hover:bg-secondary-400 text-primary-900 font-bold py-3 rounded-xl transition-colors shadow-lg shadow-secondary-500/20">
                <Clock className="w-4 h-4" />
                Renovar Patrocínio
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl border border-gray-300 transition-colors">
                <Phone className="w-4 h-4" />
                Falar com o Time
              </button>
              <div className="pt-4 border-t border-gray-100 mt-4">
                 <Link href={`/admin/sponsors/edit/${sponsor.id}`} className="block w-full text-center text-sm text-gray-500 hover:text-gray-700">
                   Editar dados do patrocinador
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
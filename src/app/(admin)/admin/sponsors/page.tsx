"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, ExternalLink, Eye, Lock, FileText, TrendingUp, MousePointer, Users, Calendar } from "lucide-react";
import { mockTeamData } from "@/data/mockTeam";
import { SponsorCategory } from "@/types/team";
import { getTeamPermissions } from "@/utils/permissions";

const categoryColors: Record<SponsorCategory, string> = {
  'Master': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Ouro': 'bg-amber-100 text-amber-800 border-amber-200',
  'Prata': 'bg-gray-100 text-gray-800 border-gray-200',
  'Apoio': 'bg-blue-50 text-blue-700 border-blue-100'
};

export default function SponsorsPage() {
  const sponsors = mockTeamData.sponsors.sort((a, b) => (a.order || 99) - (b.order || 99));
  const permissions = getTeamPermissions(mockTeamData.planId || 'free');

  // Metrics Calculations
  const totalSponsors = sponsors.length;
  const activeSponsors = sponsors.filter(s => s.status === 'active').length;
  const masterSponsors = sponsors.filter(s => s.category === 'Master').length;
  const totalViews = sponsors.reduce((acc, s) => acc + (s.stats?.views || 0), 0);
  const totalClicks = sponsors.reduce((acc, s) => acc + (s.stats?.clicks || 0), 0);
  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0';

  // Mock Data for Charts
  const viewsPerMonth = [
    { month: 'Ago', views: 120 },
    { month: 'Set', views: 350 },
    { month: 'Out', views: 450 },
    { month: 'Nov', views: 580 },
    { month: 'Dez', views: 890 },
    { month: 'Jan', views: totalViews }, // Current
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Patrocinadores</h1>
          <p className="text-gray-500">Gerencie os parceiros e patrocinadores do clube</p>
        </div>
        <div className="flex gap-2">
          <Link 
            href="/admin/sponsors/resources" 
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Materiais</span>
          </Link>
          <Link 
            href="/admin/sponsors/new" 
            className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Novo Patrocinador</span>
            <span className="sm:hidden">Novo</span>
          </Link>
        </div>
      </div>

      {/* Metrics Dashboard */}
      {permissions.canViewSponsorMetrics ? (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-2">
                <Users className="w-4 h-4" />
                Ativos
              </div>
              <div className="text-2xl font-bold text-gray-900">{activeSponsors}/{totalSponsors}</div>
              <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <span className="bg-green-100 px-1.5 rounded">{masterSponsors} Master</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-2">
                <Eye className="w-4 h-4" />
                Visualizações
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</div>
              <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12% mês
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-2">
                <MousePointer className="w-4 h-4" />
                Cliques
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalClicks.toLocaleString()}</div>
              <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +5% mês
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-2">
                <TrendingUp className="w-4 h-4" />
                CTR Médio
              </div>
              <div className="text-2xl font-bold text-gray-900">{ctr}%</div>
              <div className="text-xs text-gray-500 mt-1">
                Conv. Links
              </div>
            </div>
          </div>

          {/* Charts Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Views Chart */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                Visualizações por Mês
              </h3>
              <div className="h-48 flex items-end justify-between gap-2">
                {viewsPerMonth.map((item) => {
                  const height = Math.max((item.views / 1000) * 100, 10); // Simple scaling
                  return (
                    <div key={item.month} className="flex flex-col items-center gap-2 flex-1 group">
                      <div className="relative w-full bg-primary-50 rounded-t-sm hover:bg-primary-100 transition-colors" style={{ height: `${height}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.views} views
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Sponsors Chart */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                Top Patrocinadores (Cliques)
              </h3>
              <div className="space-y-4">
                {sponsors.slice(0, 5).map((sponsor) => {
                  const percentage = totalClicks > 0 ? ((sponsor.stats?.clicks || 0) / totalClicks) * 100 : 0;
                  return (
                    <div key={sponsor.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-gray-700">{sponsor.name}</span>
                        <span className="text-gray-500">{sponsor.stats?.clicks || 0} cliques ({percentage.toFixed(0)}%)</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-secondary-500 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-8 text-center">
          <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900 mb-1">Métricas Avançadas</h3>
          <p className="text-gray-500 mb-4 max-w-md mx-auto">Faça upgrade para o plano Profissional e tenha acesso ao Dashboard completo com visualizações, cliques e relatórios de desempenho.</p>
          <button className="bg-white text-primary-600 font-bold text-sm px-6 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
            Conhecer Plano Profissional
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-500">Patrocinador</th>
                <th className="px-6 py-3 font-medium text-gray-500">Categoria</th>
                <th className="px-6 py-3 font-medium text-gray-500">Métricas</th>
                <th className="px-6 py-3 font-medium text-gray-500">Contatos</th>
                <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 font-medium text-gray-500 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sponsors.map((sponsor) => (
                <tr key={sponsor.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center p-1 border border-gray-200 relative overflow-hidden">
                        <Image 
                          src={sponsor.logoUrl} 
                          alt={sponsor.name}
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{sponsor.name}</div>
                        <div className="text-gray-500 text-xs truncate max-w-[200px]">{sponsor.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[sponsor.category || 'Apoio'] || 'bg-gray-100 text-gray-800'}`}>
                      {sponsor.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {permissions.canViewSponsorMetrics ? (
                      <div className="flex flex-col text-xs text-gray-500 gap-1">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-gray-400" />
                          <span>{sponsor.stats?.views || 0} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 flex items-center justify-center">
                            <span className="block w-2 h-2 rounded-full bg-blue-400/50"></span>
                          </div>
                          <span>{sponsor.stats?.clicks || 0} cliques</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-gray-400 text-xs cursor-help" title="Disponível no plano Profissional">
                        <Lock className="w-3 h-3" />
                        <span>Pro</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      {sponsor.websiteUrl && (
                        <a href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600" title="Website">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {sponsor.whatsapp && (
                        <span className="hover:text-green-600 cursor-help" title={`WhatsApp: ${sponsor.whatsapp}`}>
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${
                      sponsor.status === 'active' 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-red-50 text-red-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sponsor.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                      {sponsor.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/sponsors/${sponsor.id}`}
                        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Ver Dashboard"
                      >
                        <TrendingUp className="w-4 h-4" />
                      </Link>
                      <Link 
                        href={`/admin/sponsors/edit/${sponsor.id}`}
                        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {sponsors.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Nenhum patrocinador cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

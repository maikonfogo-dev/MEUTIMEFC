'use client';

import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  CreditCard, 
  Settings, 
  ShieldCheck, 
  Globe,
  Database
} from 'lucide-react';

export default function SuperAdminDashboard() {
  const kpis = [
    { label: 'Times Ativos', value: '142', change: '+12%', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Receita MRR', value: 'R$ 42.5k', change: '+8.4%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Assinaturas SaaS', value: '1.2k', change: '+5%', icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Usuários', value: '45k', change: '+15%', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Painel Super Admin (SaaS)</h1>
            <p className="text-gray-500">Visão global do ecossistema MeuTime FC</p>
          </div>
          <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">
            <Settings className="w-4 h-4" />
            Configurações Globais
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${kpi.bg} ${kpi.color}`}>
                  <kpi.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {kpi.change}
                </span>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                <p className="text-sm text-gray-500 font-medium mt-1">{kpi.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Active Clients / Teams */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-400" />
                Últimos Clientes (Times)
              </h2>
              <button className="text-sm text-primary-600 font-bold hover:underline">Ver todos</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Time</th>
                    <th className="px-6 py-3">Plano</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Receita</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'Real Madruga', plan: 'Profissional', status: 'Ativo', rev: 'R$ 59,90' },
                    { name: 'Unidos da Vila', plan: 'Essencial', status: 'Ativo', rev: 'R$ 29,90' },
                    { name: 'Cantareira FC', plan: 'Profissional', status: 'Pendente', rev: 'R$ 0,00' },
                    { name: 'Bairro Novo', plan: 'Gratuito', status: 'Ativo', rev: 'R$ 0,00' },
                    { name: 'Atlético Várzea', plan: 'Profissional', status: 'Ativo', rev: 'R$ 59,90' },
                  ].map((team, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{team.name}</td>
                      <td className="px-6 py-4 text-gray-500">{team.plan}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          team.status === 'Ativo' ? 'bg-green-100 text-green-700' : 
                          team.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {team.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-bold">{team.rev}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Health / Plans */}
          <div className="space-y-6">
            
            {/* Server Status */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-gray-400" />
                Saúde do Sistema
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Database Load</span>
                    <span className="text-green-600 font-bold">24%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Storage Used</span>
                    <span className="text-blue-600 font-bold">45%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">API Latency</span>
                    <span className="text-green-600 font-bold">42ms</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan Distribution */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Distribuição de Planos</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Profissional</span>
                  <span className="font-bold text-gray-900">45%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Essencial</span>
                  <span className="font-bold text-gray-900">30%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Gratuito</span>
                  <span className="font-bold text-gray-900">25%</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

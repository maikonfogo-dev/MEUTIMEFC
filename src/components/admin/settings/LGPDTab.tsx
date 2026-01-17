'use client';

import { useState, useEffect } from 'react';
import { LGPDSettings, PrivacyConsent } from '@/types/settings';
import { Save, FileText, Download, Trash2, Users, CheckCircle, XCircle } from 'lucide-react';

interface LGPDTabProps {
  settings: LGPDSettings;
  onUpdate: (updates: Partial<LGPDSettings>) => void;
  isLoading: boolean;
}

export default function LGPDTab({ settings, onUpdate, isLoading }: LGPDTabProps) {
  const [formData, setFormData] = useState<LGPDSettings>(settings);
  const [consents, setConsents] = useState<PrivacyConsent[]>([]);
  const [loadingConsents, setLoadingConsents] = useState(true);

  useEffect(() => {
    fetchConsents();
  }, []);

  const fetchConsents = async () => {
    try {
      const res = await fetch('/api/settings/consents');
      if (res.ok) {
        const data = await res.json();
        setConsents(data);
      }
    } catch (error) {
      console.error('Failed to fetch consents:', error);
    } finally {
      setLoadingConsents(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handleExport = () => {
    // CSV Export logic
    const headers = ['User ID', 'Type', 'Status', 'Date'];
    const rows = consents.map(c => [
      c.userId,
      c.consentType,
      c.accepted ? 'Accepted' : 'Rejected',
      new Date(c.acceptedAt).toLocaleString('pt-BR')
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'privacy_consents.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary-600" />
          Política de Privacidade
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Conteúdo (Markdown)</label>
            <textarea
              value={formData.privacyPolicy}
              onChange={(e) => setFormData({...formData, privacyPolicy: e.target.value})}
              rows={10}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none font-mono text-sm"
              placeholder="# Política de Privacidade..."
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Retenção e Compliance</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Retenção de Logs (Meses)</label>
            <input
              type="number"
              value={formData.dataRetentionMonths}
              onChange={(e) => setFormData({...formData, dataRetentionMonths: parseInt(e.target.value)})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email do DPO</label>
            <input
              type="email"
              value={formData.dpoEmail}
              onChange={(e) => setFormData({...formData, dpoEmail: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-bold text-gray-900">Cookie Consent</p>
            <p className="text-sm text-gray-500">Exigir aceitação de cookies no primeiro acesso</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={formData.cookieConsentRequired} 
              onChange={(e) => setFormData({...formData, cookieConsentRequired: e.target.checked})}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary-600" />
          Consentimentos Ativos
        </h3>
        
        {loadingConsents ? (
          <div className="text-center py-4 text-gray-500">Carregando consentimentos...</div>
        ) : consents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-700 font-medium">
                <tr>
                  <th className="px-4 py-2 rounded-tl-lg">Usuário</th>
                  <th className="px-4 py-2">Tipo</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2 rounded-tr-lg">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {consents.map((consent) => (
                  <tr key={consent.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-mono text-xs">{consent.userId.substring(0, 8)}...</td>
                    <td className="px-4 py-2">{consent.consentType}</td>
                    <td className="px-4 py-2">
                      {consent.accepted ? (
                        <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs font-medium">
                          <CheckCircle className="w-3 h-3" /> Aceito
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2 py-0.5 rounded-full text-xs font-medium">
                          <XCircle className="w-3 h-3" /> Recusado
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {new Date(consent.acceptedAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Nenhum consentimento registrado ainda.</p>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Ferramentas de Titular</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <button 
            type="button" 
            onClick={handleExport}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" /> Exportar Dados (CSV)
          </button>
          <button type="button" className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Trash2 className="w-4 h-4" /> Solicitações de Exclusão
          </button>
        </div>
      </div>

      <div className="flex justify-end lg:relative fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 lg:bg-transparent lg:border-none lg:p-0 z-10">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full lg:w-auto flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-lg lg:shadow-none"
        >
          <Save className="w-5 h-5" />
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </form>
  );
}

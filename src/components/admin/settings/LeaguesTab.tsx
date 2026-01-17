import React, { useState } from 'react';
import { LeagueSettings } from '@/types/settings';
import { Save, Trophy, Upload, FileText, AlertCircle } from 'lucide-react';

interface LeaguesTabProps {
  settings: LeagueSettings;
  onUpdate: (updates: Partial<LeagueSettings>) => void;
  isLoading: boolean;
}

export default function LeaguesTab({ settings, onUpdate, isLoading }: LeaguesTabProps) {
  const [formData, setFormData] = useState<LeagueSettings>(settings);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field: keyof LeagueSettings, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsDirty(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header Mobile - Only visible on small screens when this tab is active */}
      <div className="lg:hidden flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-primary-600" />
        <h2 className="text-lg font-bold text-gray-900">Configurações de Ligas</h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary-600" />
            Temporada e Regras
          </h3>
          <p className="text-sm text-gray-500 mt-1">Defina as regras básicas para os campeonatos.</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temporada Atual
              </label>
              <input
                type="text"
                value={formData.currentSeason}
                onChange={(e) => handleChange('currentSeason', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                placeholder="Ex: 2026"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Limite de Times por Liga
              </label>
              <input
                type="number"
                value={formData.maxTeamsPerLeague}
                onChange={(e) => handleChange('maxTeamsPerLeague', parseInt(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Sistema de Pontuação</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pontos por Vitória
                </label>
                <input
                  type="number"
                  value={formData.defaultPointsWin}
                  onChange={(e) => handleChange('defaultPointsWin', parseInt(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pontos por Empate
                </label>
                <input
                  type="number"
                  value={formData.defaultPointsDraw}
                  onChange={(e) => handleChange('defaultPointsDraw', parseInt(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-600" />
            Regulamento
          </h3>
          <p className="text-sm text-gray-500 mt-1">Upload do regulamento oficial em PDF.</p>
        </div>

        <div className="p-6">
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-gray-900 font-medium mb-1">Clique para fazer upload</p>
            <p className="text-sm text-gray-500">PDF até 10MB</p>
            {formData.regulationUrl && (
                <div className="mt-4 flex items-center justify-center gap-2 text-green-600 bg-green-50 py-2 px-4 rounded-full inline-flex">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">Regulamento_2026.pdf</span>
                </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end lg:relative fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 lg:bg-transparent lg:border-none lg:p-0 z-10">
        <button
          type="submit"
          disabled={isLoading || !isDirty}
          className="w-full lg:w-auto flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-lg lg:shadow-none"
        >
          <Save className="w-5 h-5" />
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </form>
  );
}

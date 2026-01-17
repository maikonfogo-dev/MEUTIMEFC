import React, { useState } from 'react';
import { BroadcastSettings } from '@/types/settings';
import { Save, Video, Globe, Clock, DollarSign, AlertCircle } from 'lucide-react';

interface BroadcastTabProps {
  settings: BroadcastSettings;
  onUpdate: (updates: Partial<BroadcastSettings>) => void;
  isLoading: boolean;
}

export default function BroadcastTab({ settings, onUpdate, isLoading }: BroadcastTabProps) {
  const [formData, setFormData] = useState<BroadcastSettings>(settings);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field: keyof BroadcastSettings, value: any) => {
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
       {/* Header Mobile */}
       <div className="lg:hidden flex items-center gap-2 mb-4">
        <Video className="w-5 h-5 text-primary-600" />
        <h2 className="text-lg font-bold text-gray-900">Transmissão e Streaming</h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Video className="w-5 h-5 text-primary-600" />
              Configuração de Transmissão
            </h3>
            <p className="text-sm text-gray-500 mt-1">Gerencie as lives dos jogos.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${formData.enabled ? 'text-green-600' : 'text-gray-500'}`}>
              {formData.enabled ? 'Ativo' : 'Inativo'}
            </span>
            <button
              type="button"
              onClick={() => handleChange('enabled', !formData.enabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                formData.enabled ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className={`p-6 space-y-6 ${!formData.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-400" />
                Plataforma de Streaming
              </label>
              <select
                value={formData.platform}
                onChange={(e) => handleChange('platform', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-white"
              >
                <option value="youtube">YouTube Live</option>
                <option value="twitch">Twitch</option>
                <option value="rtmp">RTMP Personalizado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                Delay da Transmissão (segundos)
              </label>
              <input
                type="number"
                min="0"
                max="300"
                value={formData.streamDelaySeconds}
                onChange={(e) => handleChange('streamDelaySeconds', parseInt(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">Recomendado: 30s para evitar spoilers em apostas.</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
             <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
             <div className="text-sm text-blue-800">
                <p className="font-bold mb-1">Chave de Transmissão</p>
                <p>Para obter a chave RTMP, acesse o painel da sua plataforma escolhida. Mantenha essa chave segura.</p>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary-600" />
                    Monetização
                </h3>
                <p className="text-sm text-gray-500 mt-1">Permitir anúncios e doações durante a live.</p>
            </div>
            <div className="flex items-center gap-2">
                <button
                type="button"
                onClick={() => handleChange('monetizationEnabled', !formData.monetizationEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    formData.monetizationEnabled ? 'bg-green-600' : 'bg-gray-200'
                }`}
                >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.monetizationEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
                </button>
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

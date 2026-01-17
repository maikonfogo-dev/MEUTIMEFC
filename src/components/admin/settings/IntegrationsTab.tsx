import { useState } from 'react';
import { IntegrationSettings } from '@/types/settings';
import { Save, Webhook, Key, Plus, Trash2 } from 'lucide-react';

interface IntegrationsTabProps {
  settings: IntegrationSettings;
  onUpdate: (updates: Partial<IntegrationSettings>) => void;
  isLoading: boolean;
}

export default function IntegrationsTab({ settings, onUpdate, isLoading }: IntegrationsTabProps) {
  const [formData, setFormData] = useState<IntegrationSettings>(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const addWebhook = () => {
    setFormData(prev => ({
      ...prev,
      webhooks: [...prev.webhooks, { url: '', events: [], active: true }]
    }));
  };

  const removeWebhook = (index: number) => {
    setFormData(prev => ({
      ...prev,
      webhooks: prev.webhooks.filter((_, i) => i !== index)
    }));
  };

  const updateWebhook = (index: number, field: string, value: any) => {
    const newWebhooks = [...formData.webhooks];
    (newWebhooks[index] as any)[field] = value;
    setFormData(prev => ({ ...prev, webhooks: newWebhooks }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Webhook className="w-5 h-5 text-primary-600" />
            Webhooks
          </h3>
          <button 
            type="button" 
            onClick={addWebhook}
            className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Adicionar
          </button>
        </div>
        
        <div className="space-y-4">
          {formData.webhooks.map((webhook, i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">URL de Destino</label>
                  <input
                    type="text"
                    value={webhook.url}
                    onChange={(e) => updateWebhook(i, 'url', e.target.value)}
                    className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex items-end justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={webhook.active}
                      onChange={(e) => updateWebhook(i, 'active', e.target.checked)}
                      className="rounded text-primary-600"
                    />
                    <span className="text-sm text-gray-700">Ativo</span>
                  </label>
                  <button 
                    type="button" 
                    onClick={() => removeWebhook(i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {formData.webhooks.length === 0 && (
            <p className="text-center text-gray-500 py-4">Nenhum webhook configurado.</p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
          <Key className="w-5 h-5 text-primary-600" />
          Chaves de API
        </h3>
        <p className="text-sm text-gray-500 mb-4">Gerencie chaves para integrações externas.</p>
        
        {/* Mock API Keys List */}
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200">
            <div>
              <p className="font-bold text-sm">Chave Pública (Public Key)</p>
              <code className="text-xs text-gray-500">pk_live_...9d8f</code>
            </div>
            <button type="button" className="text-primary-600 hover:underline text-sm font-medium">Copiar</button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </form>
  );
}

import { useState } from 'react';
import { PaymentSettings } from '@/types/settings';
import { Save, CreditCard, DollarSign } from 'lucide-react';

interface PaymentsTabProps {
  settings: PaymentSettings;
  onUpdate: (updates: Partial<PaymentSettings>) => void;
  isLoading: boolean;
}

export default function PaymentsTab({ settings, onUpdate, isLoading }: PaymentsTabProps) {
  const [formData, setFormData] = useState<PaymentSettings>(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary-600" />
          Métodos de Pagamento
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                <span className="font-bold text-xs">PIX</span>
              </div>
              <div>
                <p className="font-bold text-gray-900">Pagamento via PIX</p>
                <p className="text-sm text-gray-500">Recebimento instantâneo com QR Code</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.pixEnabled} 
                onChange={(e) => setFormData({...formData, pixEnabled: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Cartão de Crédito</p>
                <p className="text-sm text-gray-500">Processamento via Gateway</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.creditCardEnabled} 
                onChange={(e) => setFormData({...formData, creditCardEnabled: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Gateway e Webhooks</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gateway Padrão</label>
            <select
              value={formData.gateway}
              onChange={(e) => setFormData({...formData, gateway: e.target.value as any})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none"
            >
              <option value="mercadopago">Mercado Pago</option>
              <option value="stripe">Stripe</option>
              <option value="pagarme">Pagar.me</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL de Webhook (Recebimento)</label>
            <input
              type="text"
              value={formData.webhookUrl || ''}
              onChange={(e) => setFormData({...formData, webhookUrl: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="https://api.seusite.com/webhooks/payment"
            />
          </div>
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

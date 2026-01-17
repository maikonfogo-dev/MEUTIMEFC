import { useState } from 'react';
import { StoreSettings } from '@/types/settings';
import { Save, ShoppingBag, Truck, Zap } from 'lucide-react';

interface StoreTabProps {
  settings: StoreSettings;
  onUpdate: (updates: Partial<StoreSettings>) => void;
  isLoading: boolean;
}

export default function StoreTab({ settings, onUpdate, isLoading }: StoreTabProps) {
  const [formData, setFormData] = useState<StoreSettings>(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-primary-600" />
          Configurações da Loja
        </h3>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
          <div>
            <p className="font-bold text-gray-900">Loja Ativa</p>
            <p className="text-sm text-gray-500">Habilitar módulo de e-commerce</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={formData.enabled} 
              onChange={(e) => setFormData({...formData, enabled: e.target.checked})}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Margem de Lucro Padrão (%)</label>
            <input
              type="number"
              value={formData.defaultProfitMargin}
              onChange={(e) => setFormData({...formData, defaultProfitMargin: parseFloat(e.target.value)})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alerta de Estoque Mínimo</label>
            <input
              type="number"
              value={formData.minStockAlert}
              onChange={(e) => setFormData({...formData, minStockAlert: parseInt(e.target.value)})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Logística e Checkout</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Truck className="w-4 h-4" /> Frete Fixo (R$)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.shippingFlatRate}
              onChange={(e) => setFormData({...formData, shippingFlatRate: parseFloat(e.target.value)})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Checkout 1-Clique</p>
                <p className="text-sm text-gray-500">Exclusivo para Sócios</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.oneClickCheckout} 
                onChange={(e) => setFormData({...formData, oneClickCheckout: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
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

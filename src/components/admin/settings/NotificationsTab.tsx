import { useState } from 'react';
import { NotificationSettings } from '@/types/settings';
import { Save, Bell, Mail, Smartphone, MessageSquare } from 'lucide-react';

interface NotificationsTabProps {
  settings: NotificationSettings;
  onUpdate: (updates: Partial<NotificationSettings>) => void;
  isLoading: boolean;
}

// Fallback if settings are undefined in parent (e.g. mock data incomplete)
const DEFAULT_NOTIFICATIONS: NotificationSettings = {
    whatsappEnabled: false,
    emailEnabled: true,
    pushEnabled: false,
    welcomeTemplateId: '',
    matchReminderTemplateId: ''
};

export default function NotificationsTab({ settings = DEFAULT_NOTIFICATIONS, onUpdate, isLoading }: NotificationsTabProps) {
  const [formData, setFormData] = useState<NotificationSettings>(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary-600" />
          Canais de Notificação
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg text-green-700">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900">WhatsApp</p>
                <p className="text-sm text-gray-500">Enviar lembretes e confirmações via WhatsApp</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.whatsappEnabled} 
                onChange={(e) => setFormData({...formData, whatsappEnabled: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Email Transacional</p>
                <p className="text-sm text-gray-500">Boas-vindas, recuperação de senha, recibos</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.emailEnabled} 
                onChange={(e) => setFormData({...formData, emailEnabled: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">Notificações no App Mobile / PWA</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.pushEnabled} 
                onChange={(e) => setFormData({...formData, pushEnabled: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Templates de Mensagem</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ID Template Boas-vindas</label>
            <input
              type="text"
              value={formData.welcomeTemplateId || ''}
              onChange={(e) => setFormData({...formData, welcomeTemplateId: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="ex: welcome_v2"
            />
            <p className="text-xs text-gray-500 mt-1">ID do template no provedor de email/whatsapp</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ID Lembrete de Jogo</label>
            <input
              type="text"
              value={formData.matchReminderTemplateId || ''}
              onChange={(e) => setFormData({...formData, matchReminderTemplateId: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="ex: match_reminder_1h"
            />
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

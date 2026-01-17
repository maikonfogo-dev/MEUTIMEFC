'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SystemSettings, SettingsModule, DEFAULT_SETTINGS, LeagueSettings, BroadcastSettings, NotificationSettings } from '@/types/settings';
import { 
  Settings, Users, Shield, FileText, DollarSign, 
  ShoppingBag, Trophy, Video, Bell, Link as LinkIcon, 
  Loader2, AlertCircle, History, ChevronLeft, Menu
} from 'lucide-react';

import GeneralTab from '@/components/admin/settings/GeneralTab';
import UsersTab from '@/components/admin/settings/UsersTab';
import SecurityTab from '@/components/admin/settings/SecurityTab';
import LGPDTab from '@/components/admin/settings/LGPDTab';
import PaymentsTab from '@/components/admin/settings/PaymentsTab';
import StoreTab from '@/components/admin/settings/StoreTab';
import IntegrationsTab from '@/components/admin/settings/IntegrationsTab';
import LeaguesTab from '@/components/admin/settings/LeaguesTab';
import BroadcastTab from '@/components/admin/settings/BroadcastTab';
import NotificationsTab from '@/components/admin/settings/NotificationsTab';
import LogsTab from '@/components/admin/settings/LogsTab';

const TABS = [
  { id: 'general', label: 'Geral', icon: Settings, description: 'Identidade visual e local' },
  { id: 'users', label: 'Usuários', icon: Users, description: 'Gestão de acessos e perfis' },
  { id: 'security', label: 'Segurança', icon: Shield, description: 'Senhas e sessões ativas' },
  { id: 'lgpd', label: 'LGPD', icon: FileText, description: 'Privacidade e dados' },
  { id: 'payments', label: 'Pagamentos', icon: DollarSign, description: 'Gateways e planos' },
  { id: 'store', label: 'Loja', icon: ShoppingBag, description: 'E-commerce e produtos' },
  { id: 'leagues', label: 'Ligas', icon: Trophy, description: 'Campeonatos e regras' },
  { id: 'broadcast', label: 'Transmissão', icon: Video, description: 'Streaming e lives' },
  { id: 'notifications', label: 'Notificações', icon: Bell, description: 'Email, Push e WhatsApp' },
  { id: 'integrations', label: 'Integrações', icon: LinkIcon, description: 'Webhooks e chaves API' },
  { id: 'logs', label: 'Logs', icon: History, description: 'Auditoria de alterações' },
];

export default function SettingsPage() {
  const { user, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsModule | 'logs'>('general');
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('Falha ao carregar configurações');
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      setError('Erro ao carregar configurações. Usando padrão.');
      setSettings(DEFAULT_SETTINGS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (module: SettingsModule, updates: any) => {
    if (!settings) return;
    
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    // Optimistic update
    const currentModuleSettings = settings && settings[module as keyof SystemSettings] 
      ? settings[module as keyof SystemSettings] 
      : {};
      
    const newSettings = { 
      ...settings, 
      [module]: { 
        ...(currentModuleSettings as object), 
        ...updates 
      } 
    };
    setSettings(newSettings as SystemSettings);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [module]: updates }),
      });

      if (!res.ok) throw new Error('Falha ao salvar');
      
      setSuccess('Configurações salvas com sucesso!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Erro ao salvar alterações.');
      // Revert would go here in a real app
    } finally {
      setIsSaving(false);
    }
  };

  const handleTabChange = (tabId: SettingsModule | 'logs') => {
    setActiveTab(tabId);
    setShowMobileMenu(false);
  };

  const handleBackToMenu = () => {
    setShowMobileMenu(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  // Ensure settings is not null for rendering
  const safeSettings = settings || DEFAULT_SETTINGS;

  const canEdit = hasPermission('sistema.configuracoes');
  const currentTab = TABS.find(t => t.id === activeTab);

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6 lg:space-y-8 pb-24 lg:pb-6">
      {/* Header Mobile */}
      <header className={`lg:block ${!showMobileMenu ? 'hidden' : 'block'}`}>
        <div className="flex items-center gap-3 mb-2">
            <div className="lg:hidden p-2 bg-gray-100 rounded-lg">
                <Menu className="w-5 h-5 text-gray-600" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold font-heading text-gray-900">Configurações</h1>
        </div>
        <p className="text-gray-500 text-sm lg:text-base">Gerencie as preferências globais, permissões e integrações.</p>
      </header>

      {/* Header Mobile Detail View */}
      {!showMobileMenu && (
        <div className="lg:hidden flex items-center gap-2 mb-4">
            <button 
                onClick={handleBackToMenu}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {currentTab?.icon && <currentTab.icon className="w-5 h-5 text-primary-600" />}
                {currentTab?.label}
            </h2>
        </div>
      )}

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-2 border border-red-200 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-2 border border-green-200 text-sm">
          <Settings className="w-5 h-5 flex-shrink-0" />
          {success}
        </div>
      )}

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs / Mobile Menu */}
        <aside className={`lg:w-64 flex-shrink-0 ${!showMobileMenu ? 'hidden lg:block' : 'block'}`}>
          <nav className="space-y-1 lg:space-y-1 grid grid-cols-1 gap-3 lg:block">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as SettingsModule | 'logs')}
                  className={`w-full flex items-center gap-4 lg:gap-3 px-4 py-4 lg:py-3 text-sm font-medium rounded-xl lg:rounded-lg transition-all border lg:border-none
                    ${isActive 
                      ? 'bg-primary-50 text-primary-700 shadow-sm border-primary-100 lg:shadow-none' 
                      : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-gray-100 shadow-sm lg:shadow-none lg:bg-transparent'
                    }`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-white lg:bg-transparent' : 'bg-gray-50 lg:bg-transparent'}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
                  </div>
                  <div className="text-left">
                    <span className="block text-base lg:text-sm font-bold lg:font-medium">{tab.label}</span>
                    <span className="block text-xs text-gray-400 font-normal lg:hidden">{tab.description}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main className={`flex-1 min-w-0 ${showMobileMenu ? 'hidden lg:block' : 'block'}`}>
          {!canEdit && activeTab !== 'users' && (
             <div className="mb-6 bg-blue-50 text-blue-700 p-4 rounded-lg text-sm">
               Você está em modo de visualização. Apenas administradores podem alterar estas configurações.
             </div>
          )}

          {activeTab === 'general' && (
            <GeneralTab 
              settings={safeSettings.general} 
              onUpdate={(u) => handleUpdate('general', u)} 
              isLoading={isSaving} 
            />
          )}
          
          {activeTab === 'security' && (
            <SecurityTab 
              settings={safeSettings.security} 
              onUpdate={(u) => handleUpdate('security', u)} 
              isLoading={isSaving} 
            />
          )}

          {activeTab === 'lgpd' && (
            <LGPDTab 
              settings={safeSettings.lgpd} 
              onUpdate={(u) => handleUpdate('lgpd', u)} 
              isLoading={isSaving} 
            />
          )}

          {activeTab === 'payments' && (
            <PaymentsTab 
              settings={safeSettings.payments} 
              onUpdate={(u) => handleUpdate('payments', u)} 
              isLoading={isSaving} 
            />
          )}

          {activeTab === 'store' && (
            <StoreTab 
              settings={safeSettings.store} 
              onUpdate={(u) => handleUpdate('store', u)} 
              isLoading={isSaving} 
            />
          )}

          {activeTab === 'integrations' && (
            <IntegrationsTab 
              settings={safeSettings.integrations} 
              onUpdate={(u) => handleUpdate('integrations', u)} 
              isLoading={isSaving} 
            />
          )}

          {activeTab === 'users' && <UsersTab />}

          {activeTab === 'leagues' && (
            <LeaguesTab 
              settings={safeSettings.leagues} 
              onUpdate={(u: Partial<LeagueSettings>) => handleUpdate('leagues', u)} 
              isLoading={isSaving} 
            />
          )}

          {activeTab === 'broadcast' && (
            <BroadcastTab 
              settings={safeSettings.broadcast} 
              onUpdate={(u: Partial<BroadcastSettings>) => handleUpdate('broadcast', u)} 
              isLoading={isSaving} 
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationsTab 
              settings={safeSettings.notifications} 
              onUpdate={(u: Partial<NotificationSettings>) => handleUpdate('notifications', u)} 
              isLoading={isSaving} 
            />
          )}

          {activeTab === 'logs' && <LogsTab />}

        </main>
      </div>
    </div>
  );
}

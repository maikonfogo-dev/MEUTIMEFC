import { useState, useEffect } from 'react';
import { SecuritySettings, UserSession } from '@/types/settings';
import { Save, Shield, Smartphone, Mail, LogOut, Globe, AlertTriangle } from 'lucide-react';

interface SecurityTabProps {
  settings: SecuritySettings;
  onUpdate: (updates: Partial<SecuritySettings>) => void;
  isLoading: boolean;
}

export default function SecurityTab({ settings, onUpdate, isLoading }: SecurityTabProps) {
  const [formData, setFormData] = useState<SecuritySettings>(settings);
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
        const res = await fetch('/api/settings/sessions');
        const data = await res.json();
        if (Array.isArray(data)) setSessions(data);
    } catch (err) {
        console.error('Failed to fetch sessions', err);
    } finally {
        setLoadingSessions(false);
    }
  };

  const killSession = async (id: string) => {
      if (!confirm('Tem certeza que deseja encerrar esta sessão?')) return;
      try {
          await fetch(`/api/settings/sessions?id=${id}`, { method: 'DELETE' });
          fetchSessions();
      } catch (err) {
          console.error('Failed to kill session', err);
      }
  };

  const killAllSessions = async () => {
      if (!confirm('Tem certeza? Todos os usuários precisarão fazer login novamente.')) return;
      try {
          await fetch(`/api/settings/sessions?id=all`, { method: 'DELETE' });
          fetchSessions();
      } catch (err) {
          console.error('Failed to kill all sessions', err);
      }
  };

  const handleToggle = (path: string, value: boolean) => {
    if (path.startsWith('loginMethods.')) {
      const method = path.split('.')[1] as keyof SecuritySettings['loginMethods'];
      setFormData(prev => ({
        ...prev,
        loginMethods: { ...prev.loginMethods, [method]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [path]: value } as any));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary-600" />
          Métodos de Login
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg text-green-700">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Login via WhatsApp</p>
                <p className="text-sm text-gray-500">Permitir acesso via código OTP no WhatsApp</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.loginMethods.whatsapp} 
                onChange={(e) => handleToggle('loginMethods.whatsapp', e.target.checked)}
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
                <p className="font-bold text-gray-900">Login via Email/Senha</p>
                <p className="text-sm text-gray-500">Permitir acesso tradicional com credenciais</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.loginMethods.email} 
                onChange={(e) => handleToggle('loginMethods.email', e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Sessão e Senhas</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timeout da Sessão (minutos)</label>
            <input
              type="number"
              value={formData.sessionTimeoutMinutes}
              onChange={(e) => setFormData({...formData, sessionTimeoutMinutes: parseInt(e.target.value)})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mínimo Caracteres Senha</label>
            <input
              type="number"
              value={formData.passwordPolicy.minLength}
              onChange={(e) => setFormData({
                ...formData, 
                passwordPolicy: { ...formData.passwordPolicy, minLength: parseInt(e.target.value) }
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary-600" />
                Sessões Ativas
            </h3>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                {sessions.length} Ativas
            </span>
        </div>
        
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">IP / Dispositivo</th>
                <th className="px-4 py-3">Início</th>
                <th className="px-4 py-3">Expira em</th>
                <th className="px-4 py-3 rounded-tr-lg text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loadingSessions ? (
                  <tr><td colSpan={4} className="p-4 text-center">Carregando sessões...</td></tr>
              ) : sessions.length === 0 ? (
                  <tr><td colSpan={4} className="p-4 text-center">Nenhuma sessão ativa encontrada.</td></tr>
              ) : (
                  sessions.map(session => (
                    <tr key={session.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">{session.ipAddress}</div>
                            <div className="text-xs text-gray-500 truncate max-w-[200px]" title={session.userAgent}>
                                {session.userAgent}
                            </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                            {new Date(session.createdAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                            {new Date(session.expiresAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-4 py-3 text-right">
                            <button 
                                type="button"
                                onClick={() => killSession(session.id)}
                                className="text-red-600 hover:text-red-800 text-xs font-bold border border-red-200 px-2 py-1 rounded bg-red-50"
                            >
                                Encerrar
                            </button>
                        </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Session Cards */}
        <div className="md:hidden space-y-4">
            {loadingSessions ? (
                <p className="text-center text-gray-500 text-sm">Carregando sessões...</p>
            ) : sessions.length === 0 ? (
                <p className="text-center text-gray-500 text-sm">Nenhuma sessão ativa encontrada.</p>
            ) : (
                sessions.map(session => (
                    <div key={session.id} className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="font-bold text-gray-900 text-sm">{session.ipAddress}</p>
                                <p className="text-xs text-gray-500 truncate max-w-[200px]">{session.userAgent}</p>
                            </div>
                            <button 
                                type="button"
                                onClick={() => killSession(session.id)}
                                className="text-red-600 hover:text-red-800 text-xs font-bold border border-red-200 px-2 py-1 rounded bg-red-50"
                            >
                                Encerrar
                            </button>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                            <span>Início: {new Date(session.createdAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                            <span>Expira: {new Date(session.expiresAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>

      <div className="bg-red-50 p-6 rounded-xl border border-red-100">
        <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Zona de Perigo
        </h3>
        <p className="text-sm text-red-600 mb-4">Ações irreversíveis ou que afetam todos os usuários.</p>
        <button 
            type="button" 
            onClick={killAllSessions}
            className="w-full md:w-auto justify-center bg-white border border-red-300 text-red-700 px-4 py-2 rounded-lg font-bold hover:bg-red-50 transition-colors flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Encerrar Todas as Sessões (Global Logout)
        </button>
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

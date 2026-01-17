import { useState, useEffect } from 'react';
import { SettingsLog } from '@/types/settings';
import { History, Search, Filter } from 'lucide-react';

export default function LogsTab() {
  const [logs, setLogs] = useState<SettingsLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/settings/logs')
      .then(res => res.json())
      .then(data => {
          if (Array.isArray(data)) setLogs(data);
          setIsLoading(false);
      })
      .catch(err => {
          console.error(err);
          setIsLoading(false);
      });
  }, []);

  const filteredLogs = logs.filter(log => 
    log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <History className="w-5 h-5 text-primary-600" />
            Histórico de Alterações (Audit Log)
          </h3>
          <div className="flex gap-2 w-full sm:w-auto">
             <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Buscar logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-primary-500"
                />
             </div>
             <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
                <Filter className="w-4 h-4" />
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Data/Hora</th>
                <th className="px-4 py-3">Usuário</th>
                <th className="px-4 py-3">Módulo</th>
                <th className="px-4 py-3">Ação</th>
                <th className="px-4 py-3 rounded-tr-lg">Detalhes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                  <tr><td colSpan={5} className="p-4 text-center text-gray-500">Carregando logs...</td></tr>
              ) : filteredLogs.length === 0 ? (
                  <tr><td colSpan={5} className="p-4 text-center text-gray-500">Nenhum registro encontrado.</td></tr>
              ) : (
                  filteredLogs.map(log => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">{log.userEmail}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                            {log.module}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium 
                            ${log.action === 'UPDATE' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-700'}`}>
                            {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 truncate max-w-xs">
                        <span title={JSON.stringify(log.newValue)}>
                            {log.newValue ? JSON.stringify(log.newValue).substring(0, 50) + '...' : '-'}
                        </span>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

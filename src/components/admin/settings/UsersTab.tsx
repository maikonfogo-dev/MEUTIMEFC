import { useState } from 'react';
import { User } from '@/types/auth'; 
import { Plus, Search, MoreVertical, Shield, Trash2, Edit, Lock, UserX } from 'lucide-react';

const MOCK_USERS: any[] = [
  { id: '1', name: 'Admin', email: 'admin@meutime.com', role: 'admin_time', phone: '5511999999999', status: 'active' },
  { id: '2', name: 'Organizador', email: 'org@liga.com', role: 'organizador_liga', phone: '5511988888888', status: 'active' },
  { id: '3', name: 'Torcedor', email: 'fan@gmail.com', role: 'torcedor', phone: '5511977777777', status: 'inactive' },
];

const PERMISSIONS_MOCK = [
    { id: 'p1', name: 'Gerenciar Usuários', roles: ['admin_time', 'super_admin'] },
    { id: 'p2', name: 'Configurações do Sistema', roles: ['admin_time', 'organizador_liga', 'super_admin'] },
    { id: 'p3', name: 'Ver Loja', roles: ['torcedor', 'socio', 'admin_time', 'super_admin'] },
    { id: 'p4', name: 'Checkout 1-Clique', roles: ['socio'] },
];

export default function UsersTab() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* FRAME – Settings_Usuarios */}
      <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary-600" />
            Usuários & Acessos
          </h3>
          <button className="hidden sm:flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" /> Novo Usuário
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 lg:py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-sm text-gray-500">
                <th className="py-3 px-4 font-medium">Nome</th>
                <th className="py-3 px-4 font-medium">Email</th>
                <th className="py-3 px-4 font-medium">Perfil</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-900 font-medium">{user.name}</td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${user.role === 'admin_time' ? 'bg-purple-100 text-purple-800' : 
                        user.role === 'organizador_liga' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border
                        ${user.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          {user.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button title="Editar" className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button title="Resetar Acesso" className="p-1 text-gray-400 hover:text-amber-600 transition-colors">
                        <Lock className="w-4 h-4" />
                      </button>
                      <button title="Desativar" className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <UserX className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
            {filteredUsers.map(user => (
                <div key={user.id} className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <p className="font-bold text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium
                            ${user.role === 'admin_time' ? 'bg-purple-100 text-purple-800' : 
                            user.role === 'organizador_liga' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                            {user.role}
                        </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium
                            ${user.status === 'active' ? 'text-green-700' : 'text-red-700'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            {user.status === 'active' ? 'Ativo' : 'Inativo'}
                        </span>
                        
                        <div className="flex gap-3">
                            <button className="text-blue-600 p-1">
                                <Edit className="w-5 h-5" />
                            </button>
                            <button className="text-amber-600 p-1">
                                <Lock className="w-5 h-5" />
                            </button>
                            <button className="text-red-600 p-1">
                                <UserX className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Mobile FAB */}
        <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 active:scale-95 transition-all z-50">
            <Plus className="w-6 h-6" />
        </button>

      </div>

      {/* FRAME – Settings_Permissoes */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Matriz de Permissões</h3>
            <button className="text-primary-600 font-bold text-sm hover:underline">Salvar Permissões</button>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-gray-50 text-gray-500">
                        <th className="py-3 px-4 text-left font-medium">Permissão</th>
                        <th className="py-3 px-4 text-center font-medium">Admin Time</th>
                        <th className="py-3 px-4 text-center font-medium">Org. Liga</th>
                        <th className="py-3 px-4 text-center font-medium">Sócio</th>
                        <th className="py-3 px-4 text-center font-medium">Torcedor</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {PERMISSIONS_MOCK.map(perm => (
                        <tr key={perm.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium text-gray-900">{perm.name}</td>
                            <td className="py-3 px-4 text-center">
                                <input type="checkbox" checked={perm.roles.includes('admin_time')} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" readOnly />
                            </td>
                            <td className="py-3 px-4 text-center">
                                <input type="checkbox" checked={perm.roles.includes('organizador_liga')} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" readOnly />
                            </td>
                            <td className="py-3 px-4 text-center">
                                <input type="checkbox" checked={perm.roles.includes('socio')} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" readOnly />
                            </td>
                            <td className="py-3 px-4 text-center">
                                <input type="checkbox" checked={perm.roles.includes('torcedor')} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" readOnly />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

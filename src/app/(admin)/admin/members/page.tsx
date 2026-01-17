"use client";

import { useState, useEffect } from "react";
import { Search, Download, Plus, MoreHorizontal, Loader2 } from "lucide-react";
import clsx from "clsx";
import { Member, MembershipPlan, TeamData } from "@/types/team";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/team');
        const data: TeamData = await res.json();
        setMembers(data.members || []);
        setPlans(data.plans || []);
      } catch (error) {
        console.error('Failed to fetch members:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const getPlanName = (id: string) => plans.find(p => p.id === id)?.name || "Desconhecido";

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateTestMember = async () => {
    if (!plans.length) {
      alert("Crie um plano primeiro!");
      return;
    }

    const newMember: Member = {
      id: crypto.randomUUID(),
      name: `Sócio Teste ${members.length + 1}`,
      email: `socio${members.length + 1}@email.com`,
      planId: plans[0].id,
      status: 'active',
      since: new Date().toISOString(),
      paymentMethod: 'pix'
    };

    try {
      const res = await fetch('/api/team');
      const teamData: TeamData = await res.json();
      const updatedMembers = [newMember, ...(teamData.members || [])];
      
      await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...teamData, members: updatedMembers }),
      });

      setMembers(updatedMembers);
    } catch (error) {
      console.error('Failed to create test member:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Sócios Torcedores</h1>
          <p className="text-gray-500">Gerencie a base de sócios do clube</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button 
            onClick={handleCreateTestMember}
            className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Novo Sócio (Teste)
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou email..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
           <select 
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
           >
             <option value="all">Todos os Status</option>
             <option value="active">Ativos</option>
             <option value="inactive">Inativos</option>
             <option value="overdue">Inadimplentes</option>
           </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sócio</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Plano</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Desde</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700 font-medium">
                      {getPlanName(member.planId)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={clsx(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                      member.status === 'active' && "bg-green-100 text-green-800 border-green-200",
                      member.status === 'inactive' && "bg-gray-100 text-gray-800 border-gray-200",
                      member.status === 'overdue' && "bg-red-100 text-red-800 border-red-200",
                      member.status === 'pending' && "bg-yellow-100 text-yellow-800 border-yellow-200",
                    )}>
                      {member.status === 'active' && 'Ativo'}
                      {member.status === 'inactive' && 'Inativo'}
                      {member.status === 'overdue' && 'Inadimplente'}
                      {member.status === 'pending' && 'Pendente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {new Date(member.since).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredMembers.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Nenhum sócio encontrado com os filtros atuais.
          </div>
        )}
      </div>
    </div>
  );
}

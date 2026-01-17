"use client";

import { Crown, Plus, Edit, Trash2, Loader2, Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MembershipPlan, TeamData } from "@/types/team";

export default function PlansPage() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch('/api/team');
        const data: TeamData = await res.json();
        setPlans(data.plans || []);
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();
  }, []);

  const handleDelete = async (planId: string) => {
    if (!confirm('Tem certeza que deseja remover este plano?')) return;
    try {
      const res = await fetch('/api/team');
      const teamData: TeamData = await res.json();
      
      const updatedPlans = (teamData.plans || []).filter(p => p.id !== planId);
      
      await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...teamData, plans: updatedPlans }),
      });

      setPlans(updatedPlans);
    } catch (error) {
      console.error('Failed to delete plan:', error);
      alert('Erro ao remover plano');
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planos de Sócio</h1>
          <p className="text-gray-500">Gerencie os planos e benefícios</p>
        </div>
        <Link
          href="/admin/plans/new"
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Plano
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
                  <Crown className="w-6 h-6" />
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/plans/${plan.id}`}
                    className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-900">R$ {plan.price.toFixed(2)}</span>
                <span className="text-gray-500 text-sm">/{plan.period}</span>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 flex-1">
              <ul className="space-y-3">
                {plan.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        
        {plans.length === 0 && (
          <div className="col-span-full py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <Crown className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">Nenhum plano criado</h3>
            <p className="text-gray-500 mb-4">Crie planos para que seus torcedores possam virar sócios.</p>
            <Link
              href="/admin/plans/new"
              className="inline-flex items-center gap-2 text-primary-600 font-medium hover:underline"
            >
              <Plus className="w-4 h-4" />
              Criar primeiro plano
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

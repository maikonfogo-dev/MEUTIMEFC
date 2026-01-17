"use client";

import { PlanForm } from "@/components/admin/PlanForm";
import { MembershipPlan, TeamData } from "@/types/team";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function EditPlanPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [plan, setPlan] = useState<MembershipPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchPlan() {
      try {
        const res = await fetch('/api/team');
        const data: TeamData = await res.json();
        const foundPlan = data.plans?.find(p => p.id === params.id);
        setPlan(foundPlan || null);
      } catch (error) {
        console.error('Failed to fetch plan:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlan();
  }, [params.id]);

  const handleUpdate = async (data: MembershipPlan) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/team');
      const teamData: TeamData = await res.json();

      const updatedPlans = (teamData.plans || []).map(p => 
        p.id === params.id ? { ...data, id: params.id } : p
      );

      await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...teamData, plans: updatedPlans }),
      });

      router.push("/admin/plans");
    } catch (error) {
      console.error('Failed to update plan:', error);
      alert('Erro ao atualizar plano');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">Plano não encontrado</h2>
        <p className="text-gray-500 mt-2">O plano que você está tentando editar não existe.</p>
      </div>
    );
  }

  return <PlanForm initialData={plan} onSubmit={handleUpdate} isSubmitting={isSubmitting} />;
}

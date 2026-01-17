"use client";

import { PlanForm } from "@/components/admin/PlanForm";
import { MembershipPlan, TeamData } from "@/types/team";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPlanPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: MembershipPlan) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/team');
      const teamData: TeamData = await res.json();

      const newPlan = { ...data, id: crypto.randomUUID() };
      const updatedPlans = [...(teamData.plans || []), newPlan];

      await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...teamData, plans: updatedPlans }),
      });

      router.push("/admin/plans");
    } catch (error) {
      console.error('Failed to create plan:', error);
      alert('Erro ao criar plano');
    } finally {
      setIsSubmitting(false);
    }
  };

  return <PlanForm onSubmit={handleCreate} isSubmitting={isSubmitting} />;
}

"use client";

import { ProductForm } from "@/components/admin/ProductForm";
import { Jersey, TeamData } from "@/types/team";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: Jersey) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/team');
      const teamData: TeamData = await res.json();

      const newProduct = { ...data, id: crypto.randomUUID() };
      const updatedJerseys = [...(teamData.jerseys || []), newProduct];

      await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...teamData, jerseys: updatedJerseys }),
      });

      router.push("/admin/store");
    } catch (error) {
      console.error('Failed to create product:', error);
      alert('Erro ao criar produto');
    } finally {
      setIsSubmitting(false);
    }
  };

  return <ProductForm onSubmit={handleCreate} isSubmitting={isSubmitting} />;
}

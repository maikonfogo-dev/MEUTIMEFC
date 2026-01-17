"use client";

import { NewsForm } from "@/components/admin/NewsForm";
import { News } from "@/types/team";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewNewsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: News) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to create news');
      }

      router.push("/admin/news");
    } catch (error) {
      console.error('Failed to create news:', error);
      alert('Erro ao criar notícia');
    } finally {
      setIsSubmitting(false);
    }
  };

  return <NewsForm onSubmit={handleCreate} isSubmitting={isSubmitting} />;
}

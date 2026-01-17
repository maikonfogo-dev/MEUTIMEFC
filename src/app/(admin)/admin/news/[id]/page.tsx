"use client";

import { NewsForm } from "@/components/admin/NewsForm";
import { News, TeamData } from "@/types/team";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function EditNewsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [newsItem, setNewsItem] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchNewsItem() {
      try {
        const res = await fetch(`/api/news/${params.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch news');
        }
        const item: News = await res.json();
        setNewsItem(item);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNewsItem();
  }, [params.id]);

  const handleUpdate = async (data: News) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/news/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to update news');
      }

      router.push("/admin/news");
    } catch (error) {
      console.error('Failed to update news:', error);
      alert('Erro ao atualizar notícia');
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

  if (!newsItem) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">Notícia não encontrada</h2>
      </div>
    );
  }

  return <NewsForm initialData={newsItem} onSubmit={handleUpdate} isSubmitting={isSubmitting} />;
}

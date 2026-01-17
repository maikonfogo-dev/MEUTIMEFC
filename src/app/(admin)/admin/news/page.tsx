"use client";

import { Calendar, Plus, Edit, Trash2, Loader2, Newspaper } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { News } from "@/types/team";

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      const data: News[] = await res.json();
      const sortedNews = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setNews(sortedNews);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (newsId: string) => {
    if (!confirm('Tem certeza que deseja remover esta notícia?')) return;
    try {
      const res = await fetch(`/api/news/${newsId}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error('Failed to delete news');
      }

      setNews((current) => current.filter((item) => item.id !== newsId));
    } catch (error) {
      console.error('Failed to delete news:', error);
      alert('Erro ao remover notícia');
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
          <h1 className="text-2xl font-bold text-gray-900">Notícias</h1>
          <p className="text-gray-500">Gerencie as notícias do clube</p>
        </div>
        <Link
          href="/admin/news/new"
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nova Notícia
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group"
          >
            <div className="relative h-48 bg-gray-100">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-300">
                  <Newspaper className="w-12 h-12" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  href={`/admin/news/${item.id}`}
                  className="p-2 bg-white/90 text-gray-600 hover:text-primary-600 rounded-lg shadow-sm"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-white/90 text-gray-600 hover:text-red-600 rounded-lg shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <Calendar className="w-3 h-3" />
                {new Date(item.date).toLocaleDateString('pt-BR')}
              </div>
              
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
                {item.summary}
              </p>
            </div>
          </div>
        ))}

        {news.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
            <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-gray-900 font-medium">Nenhuma notícia publicada</h3>
            <p className="text-gray-500 text-sm">Crie a primeira notícia para engajar a torcida.</p>
          </div>
        )}
      </div>
    </div>
  );
}

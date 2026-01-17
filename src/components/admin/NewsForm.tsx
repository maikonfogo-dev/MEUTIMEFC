"use client";

import { News } from "@/types/team";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import Image from "next/image";

interface NewsFormProps {
  initialData?: News;
  onSubmit: (data: News) => void;
  isSubmitting: boolean;
}

export function NewsForm({ initialData, onSubmit, isSubmitting }: NewsFormProps) {
  const [formData, setFormData] = useState<News>(
    initialData || {
      id: "",
      title: "",
      summary: "",
      content: "",
      date: new Date().toISOString().slice(0, 10),
      imageUrl: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto pb-20">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-900 mb-4">Informações da Notícia</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagem URL (Capa)</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl || ''}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {formData.imageUrl && (
          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
            <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Resumo (Chamada)</label>
          <textarea
            name="summary"
            required
            rows={3}
            value={formData.summary}
            onChange={handleChange}
            placeholder="Um breve resumo que aparecerá nos cards..."
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo Completo</label>
          <textarea
            name="content"
            rows={10}
            value={formData.content || ''}
            onChange={handleChange}
            placeholder="O conteúdo completo da notícia..."
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
          />
        </div>
      </div>

      <div className="fixed bottom-0 right-0 w-full md:w-[calc(100%-256px)] bg-white border-t border-gray-100 p-4 flex justify-end gap-3 z-10">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Salvar Notícia
            </>
          )}
        </button>
      </div>
    </form>
  );
}

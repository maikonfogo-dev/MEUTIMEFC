"use client";

import { useState } from "react";
import { Jersey, JerseySize } from "@/types/team";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Upload, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProductFormProps {
  initialData?: Jersey;
  onSubmit: (data: Jersey) => void;
  isSubmitting?: boolean;
}

const SIZES: JerseySize['size'][] = ['P', 'M', 'G', 'GG', 'XG', 'Infantil'];

export function ProductForm({ initialData, onSubmit, isSubmitting = false }: ProductFormProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState<Partial<Jersey>>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    imageUrl: initialData?.imageUrl || "",
    sizes: initialData?.sizes || SIZES.map(s => ({ size: s, stock: 0 })),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    
    onSubmit({
      ...formData,
      id: initialData?.id || crypto.randomUUID(),
    } as Jersey);
  };

  const updateStock = (size: string, stock: number) => {
    const newSizes = formData.sizes?.map(s => 
      s.size === size ? { ...s, stock } : s
    ) || [];
    setFormData({ ...formData, sizes: newSizes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/store"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-heading text-gray-900">
              {initialData ? "Editar Produto" : "Novo Produto"}
            </h1>
            <p className="text-gray-500">
              {initialData ? "Atualize os dados do produto" : "Cadastre um novo item na loja"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/store"
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? "Salvando..." : "Salvar Produto"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Informações do Produto</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nome do Produto</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">URL da Imagem</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Estoque por Tamanho</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {formData.sizes?.map((sizeItem) => (
                <div key={sizeItem.size} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tamanho {sizeItem.size}</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={sizeItem.stock}
                    onChange={(e) => updateStock(sizeItem.size, parseInt(e.target.value))}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-100 relative">
                {formData.imageUrl ? (
                  <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Upload className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">{formData.name || "Nome do Produto"}</h3>
                <p className="text-primary-600 font-bold mt-1">
                  R$ {(formData.price || 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

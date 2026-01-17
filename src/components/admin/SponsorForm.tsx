"use client";

import { useState } from "react";
import { Sponsor, SponsorCategory } from "@/types/team";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Image as ImageIcon, Globe, Instagram, Phone, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { mockTeamData } from "@/data/mockTeam";
import { getTeamPermissions } from "@/utils/permissions";

interface SponsorFormProps {
  initialData?: Sponsor;
  onSubmit: (data: Sponsor) => void;
  isSubmitting?: boolean;
}

const ALL_CATEGORIES: { value: SponsorCategory; label: string }[] = [
  { value: 'Master', label: 'Master (Principal)' },
  { value: 'Ouro', label: 'Ouro' },
  { value: 'Prata', label: 'Prata' },
  { value: 'Apoio', label: 'Apoiador' },
];

export function SponsorForm({ initialData, onSubmit, isSubmitting = false }: SponsorFormProps) {
  const router = useRouter();
  const permissions = getTeamPermissions(mockTeamData.planId || 'free');
  
  const [formData, setFormData] = useState<Partial<Sponsor>>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    logoUrl: initialData?.logoUrl || "",
    category: initialData?.category || "Apoio",
    status: initialData?.status || "active",
    websiteUrl: initialData?.websiteUrl || "",
    instagramUrl: initialData?.instagramUrl || "",
    whatsapp: initialData?.whatsapp || "",
    order: initialData?.order || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.logoUrl) return;
    
    onSubmit({
      ...formData,
      id: initialData?.id || crypto.randomUUID(),
    } as Sponsor);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/sponsors"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-heading text-gray-900">
              {initialData ? "Editar Patrocinador" : "Novo Patrocinador"}
            </h1>
            <p className="text-gray-500">
              {initialData ? "Atualize os dados do parceiro" : "Cadastre um novo parceiro"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/sponsors"
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
            {isSubmitting ? "Salvando..." : "Salvar Patrocinador"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Principais</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nome da Empresa</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Padaria do Zé"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Categoria</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {ALL_CATEGORIES.map((cat) => {
                    const isAllowed = permissions.allowedCategories.includes(cat.value);
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        disabled={!isAllowed}
                        onClick={() => setFormData({...formData, category: cat.value})}
                        className={`
                          px-3 py-2 rounded-lg text-sm font-medium border text-left transition-colors flex items-center justify-between
                          ${formData.category === cat.value
                            ? 'bg-primary-50 text-primary-700 border-primary-200'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                          }
                          ${!isAllowed ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                      >
                        <span>{cat.label}</span>
                        {!isAllowed && <Lock className="w-3 h-3 text-gray-400" />}
                      </button>
                    );
                  })}
                </div>
                {!permissions.allowedCategories.includes('Master') && (
                  <p className="text-xs text-amber-600 mt-2">
                    Faça upgrade para liberar categorias premium.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Descrição Curta (para o card)</label>
              <input
                type="text"
                required
                placeholder="Ex: O melhor pão do bairro."
                maxLength={60}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
              <p className="text-xs text-gray-500 text-right">{formData.description?.length}/60</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Descrição Completa (para página individual)</label>
              <textarea
                rows={5}
                placeholder="Conte a história do patrocinador, serviços oferecidos, endereço..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contato e Redes Sociais</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  placeholder="Website (https://...)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                />
              </div>

              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  placeholder="Instagram URL"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})}
                />
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="WhatsApp (apenas números)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Configurações</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Ordem de Exibição</label>
              <input
                type="number"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.order}
                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
              />
              <p className="text-xs text-gray-500">Menor número aparece primeiro</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-gray-400" />
                Logo (URL)
              </label>
              <input
                type="url"
                required
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.logoUrl}
                onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
              />
            </div>

            {/* Preview Logo */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
              {formData.logoUrl ? (
                <div className="relative w-full h-32">
                  <Image 
                    src={formData.logoUrl} 
                    alt="Preview" 
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <span className="text-xs">Preview do logo</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

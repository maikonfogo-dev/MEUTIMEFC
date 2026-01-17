"use client";

import { useState } from "react";
import { Player } from "@/types/team";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Upload, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PlayerFormProps {
  initialData?: Player;
  onSubmit: (data: Player) => void;
  isSubmitting?: boolean;
}

const POSITIONS = ['Goleiro', 'Zagueiro', 'Lateral', 'Meio-Campo', 'Atacante', 'Técnico'];

export function PlayerForm({ initialData, onSubmit, isSubmitting = false }: PlayerFormProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState<Partial<Player>>({
    name: initialData?.name || "",
    nickname: initialData?.nickname || "",
    position: initialData?.position || "Meio-Campo",
    number: initialData?.number || 0,
    photoUrl: initialData?.photoUrl || "",
    stats: {
      goals: initialData?.stats?.goals || 0,
      assists: initialData?.stats?.assists || 0,
      matches: initialData?.stats?.matches || 0,
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate
    if (!formData.name || !formData.position || formData.number === undefined) return;
    
    onSubmit({
      ...formData,
      id: initialData?.id || crypto.randomUUID(), // Mock ID generation
    } as Player);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/players"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-heading text-gray-900">
              {initialData ? "Editar Jogador" : "Novo Jogador"}
            </h1>
            <p className="text-gray-500">
              {initialData ? "Atualize os dados do atleta" : "Cadastre um novo atleta no elenco"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/players"
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
            {isSubmitting ? "Salvando..." : "Salvar Jogador"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Informações Pessoais</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Apelido (Opcional)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={formData.nickname}
                  onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Posição</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value as any})}
                >
                  {POSITIONS.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Número da Camisa</label>
                <input
                  type="number"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                  value={formData.number}
                  onChange={(e) => setFormData({...formData, number: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Estatísticas da Temporada</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Partidas</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                  value={formData.stats?.matches}
                  onChange={(e) => setFormData({
                    ...formData, 
                    stats: { ...formData.stats!, matches: parseInt(e.target.value) || 0 }
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Gols</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                  value={formData.stats?.goals}
                  onChange={(e) => setFormData({
                    ...formData, 
                    stats: { ...formData.stats!, goals: parseInt(e.target.value) || 0 }
                  })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Assistências</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                  value={formData.stats?.assists}
                  onChange={(e) => setFormData({
                    ...formData, 
                    stats: { ...formData.stats!, assists: parseInt(e.target.value) || 0 }
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info (Photo) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Foto do Perfil</h2>
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
                {formData.photoUrl ? (
                  <Image src={formData.photoUrl} alt="Preview" fill className="object-cover" sizes="128px" />
                ) : (
                  <Users className="w-12 h-12 text-gray-400" />
                )}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-white text-xs font-medium">Alterar Foto</span>
                </div>
              </div>
              
              <div className="w-full space-y-2">
                <label className="text-sm font-medium text-gray-700">URL da Imagem</label>
                <input
                  type="url"
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  value={formData.photoUrl}
                  onChange={(e) => setFormData({...formData, photoUrl: e.target.value})}
                />
                <p className="text-xs text-gray-500">Cole o link da foto do jogador.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

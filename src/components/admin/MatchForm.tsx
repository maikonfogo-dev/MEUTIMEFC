"use client";

import { Match } from "@/types/team";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import Image from "next/image";

interface MatchFormProps {
  initialData?: Match;
  onSubmit: (data: Match) => void;
  isSubmitting: boolean;
}

export function MatchForm({ initialData, onSubmit, isSubmitting }: MatchFormProps) {
  const [formData, setFormData] = useState<Match>(
    initialData || {
      id: "",
      date: new Date().toISOString().slice(0, 16),
      location: "",
      opponent: "",
      opponentLogoUrl: "",
      isHome: true,
      championship: "",
      status: "scheduled",
      score: { home: 0, away: 0 },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScoreChange = (team: 'home' | 'away', value: string) => {
    setFormData((prev) => ({
      ...prev,
      score: { ...prev.score!, [team]: parseInt(value) || 0 }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info Básica */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Informações do Jogo</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data e Hora</label>
                <input
                  type="datetime-local"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campeonato</label>
                <input
                  type="text"
                  name="championship"
                  value={formData.championship || ''}
                  onChange={handleChange}
                  placeholder="Ex: Liga Amadora 2024"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Ex: Arena do Bairro"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="scheduled">Agendado</option>
                  <option value="live">Ao Vivo</option>
                  <option value="finished">Finalizado</option>
                  <option value="postponed">Adiado</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isHome"
                  checked={formData.isHome}
                  onChange={(e) => setFormData(prev => ({ ...prev, isHome: e.target.checked }))}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <label htmlFor="isHome" className="text-sm font-medium text-gray-700">Jogo em Casa (Mandante)</label>
              </div>
            </div>
          </div>
        </div>

        {/* Adversário e Placar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Adversário</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Adversário</label>
                <input
                  type="text"
                  name="opponent"
                  required
                  value={formData.opponent}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL (Opcional)</label>
                <input
                  type="url"
                  name="opponentLogoUrl"
                  value={formData.opponentLogoUrl || ''}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {formData.opponentLogoUrl && (
                <div className="mt-2 p-4 border border-gray-100 rounded-lg flex justify-center bg-gray-50">
                  <Image
                    src={formData.opponentLogoUrl}
                    alt="Preview"
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Placar</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 text-center">
                <label className="block text-xs font-bold text-gray-500 mb-1">MEU TIME</label>
                <input
                  type="number"
                  min="0"
                  value={formData.score?.home}
                  onChange={(e) => handleScoreChange('home', e.target.value)}
                  className="w-full text-center text-2xl font-bold py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <span className="text-2xl font-bold text-gray-300">X</span>
              <div className="flex-1 text-center">
                <label className="block text-xs font-bold text-gray-500 mb-1">ADVERSÁRIO</label>
                <input
                  type="number"
                  min="0"
                  value={formData.score?.away}
                  onChange={(e) => handleScoreChange('away', e.target.value)}
                  className="w-full text-center text-2xl font-bold py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
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
              Salvar Jogo
            </>
          )}
        </button>
      </div>
    </form>
  );
}

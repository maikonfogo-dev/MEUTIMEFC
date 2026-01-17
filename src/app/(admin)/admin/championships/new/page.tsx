'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, Upload, Trophy, Users, Calendar, FileText, CheckCircle } from 'lucide-react';

export default function NewChampionshipPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: null,
    type: 'points',
    category: 'adult',
    teamsCount: 8,
    startDate: '',
    endDate: '',
    regulation: null
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const steps = [
    { id: 1, title: 'Informações', icon: Trophy },
    { id: 2, title: 'Formato', icon: FileText },
    { id: 3, title: 'Times', icon: Users },
    { id: 4, title: 'Datas', icon: Calendar },
    { id: 5, title: 'Regulamento', icon: CheckCircle },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span onClick={() => router.back()} className="cursor-pointer hover:text-gray-900">Campeonatos</span>
        <ChevronRight className="w-4 h-4" />
        <span className="font-bold text-gray-900">Novo Campeonato</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Stepper */}
        <div className="border-b border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.id} className="flex flex-col items-center relative z-10">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                    step >= s.id ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20' : 'bg-white border border-gray-200 text-gray-400'
                  }`}
                >
                  <s.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-bold ${step >= s.id ? 'text-primary-800' : 'text-gray-400'}`}>
                  {s.title}
                </span>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className={`absolute top-5 left-1/2 w-full h-[2px] -z-10 ${step > s.id ? 'bg-primary-600' : 'bg-gray-200'}`} style={{ width: 'calc(100% + 2rem)', left: '50%' }}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informações Gerais</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Campeonato</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Ex: Copa do Bairro 2026"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Curta</label>
                <textarea 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 h-24"
                  placeholder="Uma breve descrição sobre o campeonato..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo do Campeonato</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <span className="text-sm">Clique para fazer upload da logo</span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG até 5MB</span>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Formato de Disputa</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition-all ${formData.type === 'points' ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-600 ring-offset-2' : 'border-gray-200 hover:border-primary-300'}`}>
                  <input 
                    type="radio" 
                    name="type" 
                    value="points" 
                    className="sr-only"
                    checked={formData.type === 'points'}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  />
                  <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-2xl">📊</div>
                  <div className="text-center">
                    <span className="block font-bold text-gray-900">Pontos Corridos</span>
                    <span className="text-xs text-gray-500">Todos contra todos</span>
                  </div>
                </label>

                <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition-all ${formData.type === 'cup' ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-600 ring-offset-2' : 'border-gray-200 hover:border-primary-300'}`}>
                  <input 
                    type="radio" 
                    name="type" 
                    value="cup" 
                    className="sr-only"
                    checked={formData.type === 'cup'}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  />
                  <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-2xl">🏆</div>
                  <div className="text-center">
                    <span className="block font-bold text-gray-900">Mata-mata</span>
                    <span className="text-xs text-gray-500">Eliminatórias diretas</span>
                  </div>
                </label>

                <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition-all ${formData.type === 'groups' ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-600 ring-offset-2' : 'border-gray-200 hover:border-primary-300'}`}>
                  <input 
                    type="radio" 
                    name="type" 
                    value="groups" 
                    className="sr-only"
                    checked={formData.type === 'groups'}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  />
                  <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-2xl">🔢</div>
                  <div className="text-center">
                    <span className="block font-bold text-gray-900">Grupos + Finais</span>
                    <span className="text-xs text-gray-500">Misto</span>
                  </div>
                </label>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                <div className="flex gap-4">
                  {['adult', 'base', 'female'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="category" 
                        value={cat}
                        checked={formData.category === cat}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700 capitalize">
                        {cat === 'adult' ? 'Adulto' : cat === 'base' ? 'Base' : 'Feminino'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Times Participantes</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Times</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={formData.teamsCount}
                  onChange={(e) => setFormData({...formData, teamsCount: Number(e.target.value)})}
                >
                  {[4, 8, 16, 32].map(n => (
                    <option key={n} value={n}>{n} Times</option>
                  ))}
                </select>
              </div>

              <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm flex gap-3 items-start">
                <div className="mt-0.5">ℹ️</div>
                <p>Você poderá convidar os times ou cadastrá-los manualmente após criar o campeonato. Um link de convite será gerado.</p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Datas e Locais</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Início</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Término Previsto</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Locais dos Jogos</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Ex: Arena Várzea, Campo do Sesi..."
                />
                <p className="text-xs text-gray-500 mt-1">Separe por vírgula se for mais de um local.</p>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Regulamento</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
                <FileText className="w-8 h-8 mb-2 text-gray-400" />
                <span className="text-sm">Upload do Regulamento (PDF)</span>
                <span className="text-xs text-gray-400 mt-1">Opcional</span>
              </div>

              <div className="flex items-center gap-2 mt-6">
                <input type="checkbox" id="terms" className="rounded text-primary-600 focus:ring-primary-500" />
                <label htmlFor="terms" className="text-sm text-gray-700">Declaro que li e concordo com os termos da plataforma.</label>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${step === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
          >
            Voltar
          </button>
          
          {step < 5 ? (
            <button 
              onClick={nextStep}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
            >
              Próximo <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={() => router.push('/admin/championships')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-lg shadow-green-600/20"
            >
              Criar Campeonato <CheckCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

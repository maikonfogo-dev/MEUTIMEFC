"use client";

import { useState, useEffect } from "react";
import { Check, Crown, Loader2, ShieldCheck, Star, X } from "lucide-react";
import { MembershipPlan, TeamData, Member } from "@/types/team";

export default function MembershipPage() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [teamName, setTeamName] = useState("");
  
  // Modal State
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await fetch('/api/team');
      const data: TeamData = await res.json();
      setPlans(data.plans || []);
      setTeamName(data.name);
    } catch (error) {
      console.error('Failed to fetch plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = (plan: MembershipPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    
    setIsSubmitting(true);
    try {
      // 1. Fetch current team data
      const res = await fetch('/api/team');
      const teamData: TeamData = await res.json();

      // 2. Create new member
      const newMember: Member = {
        id: crypto.randomUUID(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        cpf: formData.cpf,
        planId: selectedPlan.id,
        status: 'pending', // Pending payment
        since: new Date().toISOString(),
        paymentMethod: 'pix'
      };

      // 3. Update team members
      const updatedMembers = [...(teamData.members || []), newMember];
      
      await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...teamData, members: updatedMembers }),
      });

      alert(`Parabéns! Sua solicitação para o plano ${selectedPlan.name} foi recebida. Entraremos em contato para finalizar o pagamento.`);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', phone: '', cpf: '' });
    } catch (error) {
      console.error('Failed to subscribe:', error);
      alert('Erro ao realizar inscrição. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-primary-900 text-white py-12 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute top-20 -left-10 w-40 h-40 rounded-full bg-primary-400 blur-2xl" />
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10 mb-2">
            <Crown className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-yellow-50">Seja Sócio Torcedor</span>
          </div>
          <h1 className="text-3xl font-bold font-heading">
            Faça parte da história do {teamName}
          </h1>
          <p className="text-gray-300 text-lg">
            Escolha seu plano, apoie o time e ganhe benefícios exclusivos dentro e fora de campo.
          </p>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="p-8 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-primary-600">R$ {plan.price.toFixed(2)}</span>
                  <span className="text-gray-500 font-medium">/{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500">
                  Cobrança recorrente. Cancele quando quiser.
                </p>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-600 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 active:scale-95 flex items-center justify-center gap-2"
                  onClick={() => handleSubscribe(plan)}
                >
                  Assinar Agora
                  <ShieldCheck className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {plans.length === 0 && (
            <div className="col-span-full bg-white p-12 rounded-2xl shadow-sm text-center">
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">Em breve</h3>
              <p className="text-gray-500 mt-2">
                Os planos de sócio torcedor estarão disponíveis em breve.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Why Join Section */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Por que ser sócio?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto text-blue-600">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Apoio Direto</h3>
            <p className="text-gray-500 text-sm">
              Sua mensalidade vai direto para melhorias no clube, materiais e estrutura.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto text-green-600">
              <Crown className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Experiências</h3>
            <p className="text-gray-500 text-sm">
              Participe de sorteios, eventos exclusivos e conheça os jogadores.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto text-purple-600">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Descontos</h3>
            <p className="text-gray-500 text-sm">
              Economize na compra de camisas oficiais e produtos na loja do clube.
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Modal */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="font-bold text-lg text-gray-900">Finalizar Inscrição</h3>
                <p className="text-sm text-gray-500">Plano: {selectedPlan.name} (R$ {selectedPlan.price.toFixed(2)})</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Seu nome"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="seu@email.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    value={formData.cpf}
                    onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                    placeholder="000.000.000-00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-700">
                <p className="font-medium mb-1">ℹ️ Importante</p>
                Após o envio, entraremos em contato via WhatsApp/Email para enviar o link de pagamento.
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-primary-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Confirmar Inscrição'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
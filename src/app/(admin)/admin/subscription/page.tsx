"use client";

import { useState } from "react";
import { CheckCircle, CreditCard, Calendar, Shield, Zap, Star, LayoutDashboard, Video, DollarSign, BarChart } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    id: 'pro-liga',
    name: 'Pro Liga',
    price: 149.00,
    period: 'mês',
    features: [
      'Criar campeonatos ilimitados',
      'Tabelas automáticas',
      'Estatísticas de jogos',
      'Gestão de times',
      'Sem transmissão ao vivo'
    ],
    recommended: false,
    color: 'border-gray-200',
    btnColor: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
  },
  {
    id: 'transmission',
    name: 'Transmissão',
    price: 299.00,
    period: 'mês',
    features: [
      'Tudo do Pro Liga',
      'Transmissão ao vivo (RTMP/YouTube)',
      'Player integrado no App',
      'Chat ao vivo',
      'Métricas de audiência'
    ],
    recommended: true,
    color: 'border-primary-500 ring-2 ring-primary-500',
    btnColor: 'bg-primary-600 text-white hover:bg-primary-700'
  },
  {
    id: 'monetization',
    name: 'Transmissão + Monetização',
    price: 499.00,
    period: 'mês',
    features: [
      'Tudo do Plano Transmissão',
      'Área de Patrocinadores',
      'Inserção de Banners na Live',
      'Relatórios Financeiros',
      'Vídeo Pré-Jogo (Vinheta)'
    ],
    recommended: false,
    color: 'border-yellow-400',
    btnColor: 'bg-gray-900 text-white hover:bg-gray-800'
  }
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState('transmission');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'boleto'>('pix');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-heading text-gray-900">Planos e Transmissão</h1>
        <p className="text-gray-500">Escolha o plano ideal para profissionalizar sua liga.</p>
      </div>

      {/* Current Plan Status */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Plano Transmissão Ativo</h3>
            <p className="text-sm text-gray-500">Próxima renovação em 15/03/2026</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm text-red-600 hover:text-red-700 font-medium px-4 py-2">
            Cancelar
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Gerenciar Cobrança
          </button>
        </div>
      </div>

      {/* Plans Selection */}
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="bg-gray-100 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'yearly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Anual
              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 rounded font-bold">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-white rounded-2xl p-6 border transition-all relative flex flex-col ${
                selectedPlan === plan.id 
                  ? `${plan.color} shadow-lg scale-105 z-10` 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Recomendado
                </div>
              )}
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-gray-900">R$ {billingCycle === 'yearly' ? (plan.price * 0.8).toFixed(0) : plan.price.toFixed(0)}</span>
                <span className="text-gray-500">/{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-xl font-bold transition-colors ${plan.btnColor}`}>
                {selectedPlan === plan.id ? 'Plano Selecionado' : 'Escolher Plano'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pay Per View Option */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white relative overflow-hidden">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
               <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold uppercase text-xs tracking-wider">Pay Per View</span>
               </div>
               <h3 className="text-2xl font-bold mb-2">Transmissão Avulsa</h3>
               <p className="text-gray-300 max-w-lg">
                 Não quer assinar mensalmente? Pague apenas por jogo transmitido e rache o custo com os times.
               </p>
            </div>
            <div className="text-center md:text-right">
               <div className="text-3xl font-bold text-white mb-1">R$ 9,90</div>
               <div className="text-sm text-gray-400 mb-4">por jogo transmitido</div>
               <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                 Ativar Pay Per View
               </button>
            </div>
         </div>
         
         {/* Decorative Background Elements */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-gray-400" />
          Método de Pagamento
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className={`border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all ${paymentMethod === 'pix' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
            <input type="radio" name="payment" className="sr-only" checked={paymentMethod === 'pix'} onChange={() => setPaymentMethod('pix')} />
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xl">💠</div>
            <span className="font-medium text-gray-900">PIX</span>
            <span className="text-xs text-green-600 font-bold">-5% de desconto</span>
          </label>
          
          <label className={`border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
            <input type="radio" name="payment" className="sr-only" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
            <CreditCard className="w-8 h-8 text-gray-700" />
            <span className="font-medium text-gray-900">Cartão de Crédito</span>
            <span className="text-xs text-gray-500">Até 12x sem juros</span>
          </label>
          
          <label className={`border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all ${paymentMethod === 'boleto' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
            <input type="radio" name="payment" className="sr-only" checked={paymentMethod === 'boleto'} onChange={() => setPaymentMethod('boleto')} />
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200">
              <div className="w-5 h-3 border-t-2 border-b-2 border-gray-800"></div>
            </div>
            <span className="font-medium text-gray-900">Boleto</span>
            <span className="text-xs text-gray-500">1-2 dias úteis</span>
          </label>
        </div>
      </div>
    </div>
  );
}

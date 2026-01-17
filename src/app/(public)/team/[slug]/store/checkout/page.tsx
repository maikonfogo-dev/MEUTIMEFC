'use client';

import { useStore } from '@/context/StoreContext';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, CheckCircle, Copy, ShieldCheck, Timer, Zap, Loader2, AlertCircle, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Order } from '@/types/store';
import { TeamData } from '@/types/team';

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useStore();
  const { user, isLoading: authLoading, hasPermission } = useAuth();
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const is1Click = searchParams.get('mode') === '1click';
  
  const [step, setStep] = useState<'info' | 'pix_confirm' | 'success'>('info');
  const [isLoading, setIsLoading] = useState(false);
  const [stockError, setStockError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: '',
    address: ''
  });

  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        phone: user.phone || '',
        // email is not in form data but implicit
      }));
    }
  }, [user]);

  const [pixCopied, setPixCopied] = useState(false);
  const [countdown, setCountdown] = useState(600); // 10 minutes

  // Handle 1-Click Checkout Logic
  useEffect(() => {
    // Only allow 1-click if user is logged in and has permission
    
    if (is1Click && cart.length > 0 && !authLoading) {
      if (!user) {
        return;
      }

      if (!hasPermission('checkout_1_click')) {
          return;
      }

      const init1Click = async () => {
        setIsLoading(true);
        setStockError(null);

        // 1. Simulate Stock Check
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const hasStockIssue = cart.some(item => item.quantity > 10);
        
        if (hasStockIssue) {
          setStockError('Alguns itens do seu carrinho não estão mais disponíveis na quantidade solicitada.');
          setIsLoading(false);
          return;
        }

        // 2. Use User Data
        setFormData({
          name: user.name,
          cpf: '123.456.789-00', // Mock for now
          phone: user.phone || '(11) 99999-9999',
          address: 'Endereço Cadastrado' // Mock
        });
        
        setStep('pix_confirm');
        setIsLoading(false);
      };

      init1Click();
    }
  }, [is1Click, cart, user, authLoading, hasPermission]);


  // Countdown timer for PIX
  useEffect(() => {
    if (step === 'pix_confirm' && countdown > 0) {
      const timer = setInterval(() => setCountdown(c => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, countdown]);

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <p className="text-gray-500 mb-4">Seu carrinho está vazio.</p>
        <Link href={`/team/${slug}/store`} className="text-primary-600 font-medium">
          Voltar para a Loja
        </Link>
      </div>
    );
  }

  const shippingCost = subtotal > 199 ? 0 : 15.90;
  const total = subtotal + shippingCost;

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865802BR5913Real Madruga6008Sao Paulo62070503***6304EA88");
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleWhatsAppCheckout = async () => {
    if (!formData.name || !formData.phone) {
      alert("Por favor, preencha seu nome e telefone.");
      return;
    }
    
    setIsLoading(true);

    try {
      // 1. Fetch current team data (needed for whatsapp number and to save order)
      const res = await fetch('/api/team');
      const teamData: TeamData = await res.json();

      // 2. Create Order Object
      const orderId = crypto.randomUUID();
      const newOrder: Order = {
        id: orderId,
        customer: {
          name: formData.name,
          cpf: formData.cpf,
          phone: formData.phone,
          address: formData.address,
        },
        items: cart,
        total: total,
        paymentMethod: 'pix', // Defaulting to PIX/Transfer for WhatsApp orders
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // 3. Save to Backend (Order + Notification)
      const updatedOrders = [...(teamData.orders || []), newOrder];
      
      // Create notification for admin
      const newNotification = {
        id: crypto.randomUUID(),
        title: 'Novo Pedido na Loja',
        message: `Novo pedido de ${formData.name} no valor de R$ ${total.toFixed(2)}`,
        type: 'success',
        date: new Date().toISOString(),
        target: 'all', // visible to all admins
        linkUrl: '/admin/store'
      };
      
      const updatedNotifications = [...(teamData.notifications || []), newNotification];

      await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...teamData, orders: updatedOrders, notifications: updatedNotifications }),
      });

      // 4. Generate WhatsApp Message
      const message = `*Novo Pedido - ${teamData.name}*\n\n` +
        `*Cliente:* ${formData.name}\n` +
        `*Telefone:* ${formData.phone}\n` +
        `*Endereço:* ${formData.address}\n\n` +
        `*Itens:*\n` +
        cart.map(item => `- ${item.quantity}x ${item.name} (${item.size})`).join('\n') +
        `\n\n*Total (com frete): R$ ${total.toFixed(2)}*\n\n` +
        `Aguardo instruções de pagamento.`;

      // Use team whatsapp or fallback
      const whatsappNumber = teamData.whatsapp?.replace(/\D/g, '') || '5511999999999';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      // 5. Clear Cart and Redirect
      clearCart();
      window.location.href = whatsappUrl;

    } catch (error) {
      console.error('Checkout failed', error);
      alert('Erro ao processar pedido.');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Processando Pedido</h2>
        <p className="text-gray-500">Conectando ao WhatsApp...</p>
      </div>
    );
  }

  if (stockError) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Estoque Esgotado</h2>
        <p className="text-gray-500 mb-8 max-w-xs mx-auto">{stockError}</p>
        <Link 
          href={`/team/${slug}/store`}
          className="text-primary-600 font-bold hover:underline"
        >
          Voltar para o Carrinho
        </Link>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-sm">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold font-heading text-gray-900 mb-2">Pedido Confirmado!</h1>
        <p className="text-gray-500 mb-8 max-w-xs mx-auto leading-relaxed">
          Obrigado por apoiar o time ⚽<br/>
          Você receberá os detalhes do pedido no seu WhatsApp.
        </p>
        <Link 
          href={`/team/${slug}/store`}
          className="bg-gray-900 text-white font-bold py-4 px-8 rounded-xl w-full max-w-xs hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
        >
          Acompanhar Pedido
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white p-4 border-b border-gray-100 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
        <button onClick={() => step === 'info' ? window.history.back() : setStep('info')} className="text-gray-500 p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg font-heading text-gray-900">
            {step === 'info' ? 'Checkout' : 'Pagamento PIX'}
          </h1>
          {is1Click && step === 'pix_confirm' && (
            <span className="text-[10px] text-green-600 font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" /> COMPRA 1-CLIQUE ATIVADA
            </span>
          )}
        </div>
      </header>

      <div className="p-4 space-y-6 max-w-md mx-auto">
        {step === 'info' && (
          <>
            {/* Form */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary-600" /> Seus Dados
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 ml-1 mb-1 block">Nome Completo</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 ml-1 mb-1 block">CPF</label>
                  <input 
                    type="text" 
                    value={formData.cpf}
                    onChange={e => setFormData({...formData, cpf: e.target.value})}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    placeholder="000.000.000-00"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 ml-1 mb-1 block">WhatsApp / Celular</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 ml-1 mb-1 block">Endereço de Entrega</label>
                  <textarea 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    rows={2}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
                    placeholder="Rua, Número, Bairro, Cidade"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Preview */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
               <h2 className="font-bold text-gray-900 mb-3">Forma de Pagamento</h2>
               <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-100 rounded-xl text-green-700">
                 <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                   <MessageCircle className="w-5 h-5 text-green-600" />
                 </div>
                 <span className="font-medium">Finalizar no WhatsApp</span>
                 <CheckCircle className="w-5 h-5 ml-auto" />
               </div>
               <p className="text-xs text-gray-500 mt-2 text-center">
                 Você será redirecionado para combinar o pagamento e entrega diretamente com o time.
               </p>
            </div>
          </>
        )}

        {step === 'pix_confirm' && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500">Total a pagar</span>
                <p className="text-3xl font-bold text-gray-900">R$ {total.toFixed(2).replace('.', ',')}</p>
              </div>

              <div className="bg-white p-4 border-2 border-dashed border-gray-200 rounded-xl mb-6 flex justify-center">
                 {/* Placeholder for QR Code */}
                 <div className="relative w-48 h-48">
                   <Image 
                     src={`https://api.dicebear.com/7.x/identicon/svg?seed=${total}`} 
                     alt="QR Code PIX"
                     fill
                     className="object-contain"
                   />
                 </div>
              </div>

              <div className="w-full space-y-3">
                <button 
                  onClick={handleCopyPix}
                  className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors active:scale-95"
                >
                  <Copy className="w-4 h-4" />
                  {pixCopied ? 'Código Copiado!' : 'Copiar Código PIX'}
                </button>
                
                <div className="flex items-center justify-center gap-2 text-sm text-yellow-600 bg-yellow-50 py-2 px-4 rounded-lg">
                  <Timer className="w-4 h-4" />
                  <span>Aguardando pagamento... {formatTime(countdown)}</span>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              <p>Após o pagamento, seu pedido será confirmado automaticamente em alguns segundos.</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      {step === 'info' && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 z-20 pb-safe">
          <div className="max-w-md mx-auto flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Total</span>
              <span className="text-xl font-bold text-gray-900">R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
            <button
              onClick={handleWhatsAppCheckout}
              className="bg-green-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-green-600/20 hover:bg-green-700 active:scale-95 transition-all flex-1 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Enviar Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
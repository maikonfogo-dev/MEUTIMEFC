"use client";

import { useStore } from '@/context/StoreContext';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function CartPage() {
  const params = useParams();
  const { cart, updateQuantity, subtotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-white p-6 rounded-full shadow-lg mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-300" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-500 mb-8 max-w-[200px]">Que tal dar uma olhada nos nossos mantos?</p>
        <Link 
          href={`/team/${params.slug}/store`}
          className="bg-primary-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-primary-700 transition-colors"
        >
          Voltar para a Loja
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      {/* Header */}
      <header className="bg-white p-4 sticky top-0 z-10 border-b border-gray-100 flex items-center gap-4">
        <Link href={`/team/${params.slug}/store`} className="p-2 -ml-2 text-gray-600 hover:text-primary-600 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-bold font-heading text-gray-900">Carrinho de Compras</h1>
      </header>

      <div className="p-4 space-y-4">
        {/* Items */}
        <div className="space-y-4">
          {cart.map((item: any) => (
            <div key={`${item.productId}-${item.size}`} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">Tamanho: <span className="font-bold">{item.size}</span></p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-primary-600">R$ {item.price.toFixed(2)}</span>
                  
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
                    >
                      {item.quantity === 1 ? <Trash2 className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                    </button>
                    <span className="text-xs font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.productId, item.size, Math.min(item.maxStock, item.quantity + 1))}
                      disabled={item.quantity >= item.maxStock}
                      className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary-600 transition-colors disabled:opacity-30"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-3">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Frete</span>
            <span className="text-green-600 font-medium">Grátis</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg text-gray-900">
            <span>Total</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-md mx-auto z-20">
        <Link
          href={`/team/${params.slug}/store/checkout`}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 transition-colors"
        >
          Finalizar Compra
        </Link>
      </div>
    </div>
  );
}

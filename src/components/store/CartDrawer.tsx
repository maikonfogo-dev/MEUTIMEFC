'use client';

import { useStore } from '@/context/StoreContext';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function CartDrawer() {
  const { isCartOpen, toggleCart, cart, updateQuantity, removeFromCart, subtotal } = useStore();
  const params = useParams();
  const slug = params.slug as string;

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary-600" />
            <h2 className="font-bold text-lg text-gray-900">Seu Carrinho</h2>
          </div>
          <button 
            onClick={toggleCart}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
              <ShoppingBag className="w-16 h-16 text-gray-200" />
              <p>Seu carrinho está vazio.</p>
              <button 
                onClick={toggleCart}
                className="text-primary-600 font-medium hover:underline"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-gray-500">Tamanho: {item.size}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="font-bold text-gray-900">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                        className="p-1 hover:bg-white rounded-md transition-colors text-gray-600"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded-md transition-colors text-primary-600"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.productId, item.size)}
                  className="text-gray-400 hover:text-red-500 self-start p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-white space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-gray-900 font-bold text-lg">
                <span>Total</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
            <Link 
              href={`/team/${slug}/store/checkout`}
              onClick={toggleCart}
              className="block w-full bg-primary-600 text-white text-center py-4 rounded-xl font-bold shadow-lg shadow-primary-600/20 active:scale-[0.98] transition-transform"
            >
              Finalizar Compra
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useStore } from '@/context/StoreContext';
import { useAuth } from '@/context/AuthContext';
import { ShoppingBag, ArrowLeft, Star, Heart, Share2, ShieldCheck, Truck, Zap, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ProductSize } from '@/types/store';
import { useParams } from 'next/navigation';
import { Jersey, TeamData } from '@/types/team';
import { Product } from '@/types/store';

export default function ProductDetailPage() {
  const params = useParams();
  const { toggleCart, addToCart, totalItems } = useStore();
  const { user } = useAuth();
  
  const [jersey, setJersey] = useState<Jersey | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isProcessing1Click, setIsProcessing1Click] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch('/api/team');
        const data: TeamData = await res.json();
        const found = data.jerseys?.find(p => p.id === params.id);
        setJersey(found || null);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  const isSocio = user?.is_socio;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!jersey) return <div className="p-8 text-center">Produto não encontrado</div>;

  // Map Jersey to Product for StoreContext
  const productMapped: Product = {
    id: jersey.id,
    name: jersey.name,
    description: jersey.description,
    price: jersey.price || 0,
    images: jersey.imageUrl ? [jersey.imageUrl] : [],
    category: 'Camisa', // Defaulting for now
    variants: (jersey.sizes || []).map(s => ({ size: s.size as ProductSize, stock: s.stock })),
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(productMapped, selectedSize, quantity);
    }
  };

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleOneClickBuy = async () => {
    if (!selectedSize) return;
    
    setIsProcessing1Click(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addToCart(productMapped, selectedSize, quantity);
    window.location.href = `/team/${params.slug}/store/checkout?mode=1click`;
  };

  const discountPrice = (jersey.price || 0) * 0.9;

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <header className="fixed top-0 z-30 w-full bg-transparent p-4 flex items-center justify-between pointer-events-none">
        <Link 
          href={`/team/${params.slug}/store`}
          className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 shadow-sm pointer-events-auto active:scale-90 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex gap-3 pointer-events-auto">
          <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 shadow-sm active:scale-90 transition-transform">
            <Share2 className="w-5 h-5" />
          </button>
          <button 
            onClick={toggleCart}
            className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 shadow-sm relative active:scale-90 transition-transform"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Gallery */}
      <div className="relative w-full aspect-[4/5] bg-gray-100">
        <Image
          src={jersey.imageUrl}
          alt={jersey.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="px-4 pt-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-primary-600 font-bold text-xs uppercase tracking-wider">Lançamento 2024</span>
            <h1 className="text-2xl font-bold font-heading text-gray-900">{jersey.name}</h1>
          </div>
          <button className="p-2 -mr-2 text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-end gap-2 mb-6">
          <span className="text-3xl font-bold text-gray-900">R$ {(jersey.price || 0).toFixed(2)}</span>
          {isSocio ? (
             <span className="text-sm text-green-600 font-bold mb-1.5 px-2 py-0.5 bg-green-50 rounded-full">
               Sócio paga R$ {discountPrice.toFixed(2)}
             </span>
          ) : (
            <div className="flex flex-col mb-1">
              <span className="text-xs text-gray-500">Sócio paga R$ {discountPrice.toFixed(2)}</span>
              <Link href={`/team/${params.slug}/membership`} className="text-xs font-bold text-primary-600 underline">
                Seja Sócio
              </Link>
            </div>
          )}
        </div>

        {/* Sizes */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-gray-900">Tamanho</span>
            <button className="text-xs text-primary-600 font-medium underline">Guia de medidas</button>
          </div>
          <div className="flex flex-wrap gap-3">
            {productMapped.variants.map((variant) => (
              <button
                key={variant.size}
                disabled={variant.stock === 0}
                onClick={() => setSelectedSize(variant.size)}
                className={`
                  h-12 w-12 rounded-lg border flex items-center justify-center font-bold transition-all
                  ${selectedSize === variant.size 
                    ? 'border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-600/30' 
                    : 'border-gray-200 text-gray-900 hover:border-gray-300'}
                  ${variant.stock === 0 ? 'opacity-50 cursor-not-allowed bg-gray-50 text-gray-400' : ''}
                `}
              >
                {variant.size}
              </button>
            ))}
          </div>
          {selectedSize && (
             <p className="text-xs text-gray-500 mt-2">
               {productMapped.variants.find(v => v.size === selectedSize)?.stock} unidades disponíveis
             </p>
          )}
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-2">Descrição</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            {jersey.description}
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 safe-area-bottom z-20">
        <div className="flex gap-3 max-w-md mx-auto">
          <button 
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className="flex-1 bg-gray-100 text-gray-900 font-bold h-12 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <ShoppingBag className="w-5 h-5" />
            Adicionar
          </button>
          <button 
            onClick={handleOneClickBuy}
            disabled={!selectedSize || isProcessing1Click}
            className="flex-1 bg-primary-600 text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary-600/30 hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {isProcessing1Click ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Zap className="w-5 h-5 fill-white" />
                Comprar Agora
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

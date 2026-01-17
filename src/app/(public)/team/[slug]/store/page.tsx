'use client';

import { ShoppingBag, Star, ShieldCheck, Loader2, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Jersey, TeamData } from '@/types/team';

export default function StorePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { totalItems, toggleCart } = useStore();
  const [jerseys, setJerseys] = useState<Jersey[]>([]);
  const [teamInfo, setTeamInfo] = useState<{name: string, logoUrl: string} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/team');
        const data: TeamData = await res.json();
        setJerseys(data.jerseys || []);
        setTeamInfo({
          name: data.name,
          logoUrl: data.logoUrl
        });
      } catch (error) {
        console.error('Failed to fetch store data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  const featuredProduct = jerseys[0];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Frame 01: Compact Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 h-16 flex items-center justify-between shadow-sm">
        <div className="w-10 h-10 rounded-full bg-gray-100 p-1">
          {teamInfo?.logoUrl && (
            <Image
              src={teamInfo.logoUrl}
              alt={teamInfo.name}
              width={40}
              height={40}
              className="w-full h-full object-contain rounded-full"
            />
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href={`/team/${slug}/store/orders`}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-full"
          >
            <User className="w-6 h-6" />
          </Link>

          <button 
            onClick={toggleCart}
            className="relative w-10 h-10 flex items-center justify-center text-gray-900 active:scale-90 transition-transform"
          >
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Frame 01: Banner Principal */}
      {featuredProduct && (
        <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] bg-gray-900 overflow-hidden">
          <Image
            src={featuredProduct.imageUrl}
            alt={featuredProduct.name}
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
            <span className="bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded w-fit mb-2">LANÇAMENTO</span>
            <h2 className="text-3xl font-bold text-white mb-1 font-heading">{featuredProduct.name}</h2>
            <p className="text-gray-200 text-sm mb-4 line-clamp-2">{featuredProduct.description}</p>
            <Link 
              href={`/team/${slug}/store/${featuredProduct.id}`}
              className="bg-white text-gray-900 font-bold py-3 px-6 rounded-xl w-full text-center hover:bg-gray-100 transition-colors"
            >
              Comprar Agora
            </Link>
          </div>
        </div>
      )}

      {/* Frame 02: Categorias / Destaques */}
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-lg">Uniformes</h3>
          <Link href="#" className="text-sm text-primary-600 font-medium">Ver tudo</Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {jerseys.map((product) => (
            <Link 
              key={product.id} 
              href={`/team/${slug}/store/${product.id}`}
              className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm active:scale-95 transition-transform"
            >
              <div className="relative aspect-[3/4] bg-gray-100 rounded-lg mb-3 overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {/* Badge Example */}
                {/* <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  -10%
                </div> */}
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-primary-600 font-bold">R$ {product.price?.toFixed(2)}</span>
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  4.8
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Banner Secundário */}
        <div className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="relative z-10 text-center">
            <ShieldCheck className="w-10 h-10 text-primary-500 mx-auto mb-3" />
            <h3 className="text-white font-bold text-lg mb-2">Sócio Torcedor tem Desconto</h3>
            <p className="text-gray-400 text-sm mb-4">Assine agora e garanta 20% OFF em toda a loja oficial.</p>
            <Link href={`/team/${slug}/membership`} className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg font-bold text-sm">
              Virar Sócio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

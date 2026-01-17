"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Shirt, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Jersey, TeamData } from '@/types/team';

export default function AdminStorePage() {
  const [jerseys, setJerseys] = useState<Jersey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/team');
        const data: TeamData = await res.json();
        setJerseys(data.jerseys || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    if (!confirm('Tem certeza que deseja remover este produto?')) return;

    try {
      const res = await fetch('/api/team');
      const teamData: TeamData = await res.json();
      const updatedJerseys = (teamData.jerseys || []).filter(p => p.id !== productId);

      await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...teamData, jerseys: updatedJerseys }),
      });

      setJerseys(updatedJerseys);
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Erro ao remover produto');
    }
  };

  const getStock = (sizes: { stock: number }[] | undefined) => (sizes || []).reduce((acc, curr) => acc + curr.stock, 0);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Loja do Clube</h1>
          <p className="text-gray-500">Gerencie os produtos, estoque e vendas.</p>
        </div>
        <Link 
          href="/admin/store/new" 
          className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-primary-600/20"
        >
          <Plus className="w-5 h-5" />
          Novo Produto
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <Shirt className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-500">Total de Produtos</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{jerseys.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {jerseys.map((jersey) => {
          const totalStock = getStock(jersey.sizes);
          return (
            <div key={jersey.id} className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
              <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                <Image
                  src={jersey.imageUrl}
                  alt={jersey.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link 
                    href={`/admin/store/${jersey.id}`}
                    className="p-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-primary-600 rounded-lg shadow-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={() => handleDelete(jersey.id)}
                    className="p-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-red-600 rounded-lg shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {totalStock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Esgotado
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 line-clamp-1" title={jersey.name}>{jersey.name}</h3>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{jersey.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-lg font-bold text-primary-600">
                    R$ {(jersey.price || 0).toFixed(2)}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    totalStock > 10 ? 'bg-green-100 text-green-700' : 
                    totalStock > 0 ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {totalStock} un
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {jerseys.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Shirt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Nenhum produto cadastrado</h3>
          <p className="text-gray-500 mt-1">Comece adicionando produtos à sua loja.</p>
        </div>
      )}
    </div>
  );
}

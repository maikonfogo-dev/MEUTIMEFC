'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { TeamData, Order } from '@/types/team';
import { Loader2, Package, Calendar, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function MyOrdersPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    async function fetchOrders() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/team');
        const data: TeamData = await res.json();
        
        // Filter orders for current user (by phone or email if available)
        // Since we are mocking, we match by name for simplicity if phone/email not consistent
        // But let's try to match strictly
        const userOrders = (data.orders || []).filter(order => {
            // Check if customer phone matches user phone
            if (user.phone && order.customer.phone === user.phone) return true;
            // Check if name is very similar
            if (order.customer.name.toLowerCase() === user.name.toLowerCase()) return true;
            return false;
        }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        setOrders(userOrders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
        fetchOrders();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Acesse sua conta</h2>
        <p className="text-gray-500 mb-6">Faça login para ver seus pedidos anteriores.</p>
        <Link 
          href="/auth/login" 
          className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors"
        >
          Fazer Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-safe">
      <header className="bg-white p-4 border-b border-gray-100 sticky top-0 z-10 flex items-center gap-4">
        <Link href={`/team/${slug}/store`} className="p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-full">
            <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-bold font-heading text-gray-900">Meus Pedidos</h1>
      </header>

      <div className="p-4 space-y-4">
        {orders.length === 0 ? (
            <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Você ainda não tem pedidos.</p>
                <Link href={`/team/${slug}/store`} className="text-primary-600 text-sm font-bold mt-2 block">
                    Ir para a Loja
                </Link>
            </div>
        ) : (
            orders.map(order => (
                <div key={order.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                ${order.status === 'paid' ? 'bg-green-100 text-green-800' : ''}
                                ${order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : ''}
                                ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                            `}>
                                {order.status === 'pending' ? 'Pendente' : order.status}
                            </span>
                            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                            </p>
                        </div>
                        <span className="font-bold text-gray-900">R$ {order.total.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-gray-50 pt-3 space-y-2">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-sm">
                                <span className="text-gray-400 w-4">{item.quantity}x</span>
                                <span className="text-gray-700 flex-1 truncate">{item.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-50 flex justify-end">
                        <Link 
                            href={`https://wa.me/5511999999999?text=Olá, gostaria de saber sobre o pedido ${order.id.slice(0,8)}...`}
                            target="_blank"
                            className="text-xs font-bold text-primary-600 flex items-center gap-1"
                        >
                            Ajuda <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
}

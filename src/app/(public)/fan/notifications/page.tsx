'use client';

import { useState, useEffect } from 'react';
import { Bell, ArrowLeft, Info, AlertTriangle, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { TeamData, Notification } from '@/types/team';

export default function FanNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/team');
        const data: TeamData = await res.json();
        
        // Filter and sort notifications
        // In a real app, we would filter by user role (member vs public)
        // For now, we show all public/all + members (assuming logged in context usually)
        const filtered = (data.notifications || [])
          .filter(n => ['all', 'public', 'members'].includes(n.target))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          
        setNotifications(filtered);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'alert': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-50 border-yellow-100';
      case 'success': return 'bg-green-50 border-green-100';
      case 'alert': return 'bg-red-50 border-red-100';
      default: return 'bg-blue-50 border-blue-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 py-3 shadow-sm sticky top-0 z-30 flex items-center gap-3">
        <Link href="/fan/dashboard" className="text-gray-600">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-bold font-heading text-gray-900">Notificações</h1>
      </div>

      <div className="p-4 space-y-4">
        {loading ? (
          <div className="text-center py-10 text-gray-500">Carregando...</div>
        ) : notifications.length > 0 ? (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 rounded-xl border ${getBgColor(notif.type)} relative overflow-hidden shadow-sm`}
            >
              <div className="flex items-start gap-3">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{notif.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                  <span className="text-xs text-gray-400 font-medium">
                    {new Date(notif.date).toLocaleDateString('pt-BR')} • {new Date(notif.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  
                  {notif.linkUrl && (
                    <Link 
                      href={notif.linkUrl}
                      className="mt-3 flex items-center gap-1 text-xs font-bold text-primary-600 hover:underline"
                    >
                      Ver detalhes <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Bell className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-sm font-medium">Nenhuma notificação por enquanto.</p>
          </div>
        )}
      </div>
    </div>
  );
}
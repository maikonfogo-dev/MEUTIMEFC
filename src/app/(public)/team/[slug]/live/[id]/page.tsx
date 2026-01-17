'use client';

import { useState } from 'react';
import { mockTeamData } from '@/data/mockTeam';
import { Heart, Send, Share2, Users } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LiveMatchPage() {
  const params = useParams();
  const router = useRouter();
  const team = mockTeamData;
  const stream = team.liveStreams?.find(s => s.id === params.id);
  const match = team.championships?.flatMap(c => c.matches).find(m => m?.id === stream?.matchId);
  const sponsor = team.sponsors.find(s => s.id === stream?.sponsorId);

  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { user: 'João Silva', text: 'Vamoooo Real Madruga!!', time: '14:02' },
    { user: 'Maria Souza', text: 'Esse ano é nosso!', time: '14:03' },
    { user: 'Pedro Santos', text: 'Golaaço!', time: '14:05' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    setMessages([...messages, { 
      user: 'Você', 
      text: chatMessage, 
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) 
    }]);
    setChatMessage('');
  };

  if (!stream) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Transmissão não encontrada</p>
        <button onClick={() => router.back()} className="text-primary-600 mt-4">Voltar</button>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Video Player Container */}
      <div className="relative w-full aspect-video bg-gray-900 sticky top-0 z-20">
        <iframe 
          src={stream.embedUrl} 
          title={stream.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        
        {/* Live Overlay */}
        <div className="absolute top-4 left-4 flex gap-2">
          <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 animate-pulse shadow-lg">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            AO VIVO
          </div>
          <div className="bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            <Users className="w-3 h-3" />
            {(stream.viewers || 0) + 124}
          </div>
        </div>
      </div>

      {/* Match Info & Sponsor */}
      <div className="bg-gray-900 p-4 border-b border-gray-800">
        <h1 className="text-white font-bold text-lg leading-tight">{stream.title}</h1>
        
        {match && (
          <div className="flex items-center gap-4 mt-3 bg-gray-800/50 p-2 rounded-lg">
             <div className="flex items-center gap-2 flex-1 justify-end">
               <span className="text-white font-bold text-sm truncate">{match.isHome ? 'Real Madruga' : match.opponent}</span>
               <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
             </div>
             <div className="bg-gray-800 px-3 py-1 rounded text-white font-mono font-bold">
               {match.score?.home || 0} - {match.score?.away || 0}
             </div>
             <div className="flex items-center gap-2 flex-1">
               <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
               <span className="text-white font-bold text-sm truncate">{match.isHome ? match.opponent : 'Real Madruga'}</span>
             </div>
          </div>
        )}

        {/* Sponsor Banner */}
        {sponsor && (
          <div className="mt-4 bg-white rounded-lg p-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 relative">
                <Image src={sponsor.logoUrl} alt={sponsor.name} fill className="object-contain" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Oferecimento</p>
                <p className="text-sm font-bold text-gray-900 leading-none">{sponsor.name}</p>
              </div>
            </div>
            <button className="bg-primary-600 text-white text-xs font-bold px-3 py-2 rounded-lg">
              Ver Oferta
            </button>
          </div>
        )}
      </div>

      {/* Live Chat */}
      <div className="flex-1 flex flex-col bg-gray-900">
        <div className="p-2 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-gray-400 text-xs font-bold uppercase">Chat ao vivo</h3>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-full">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-500 bg-gray-800 rounded-full">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[300px]">
          {messages.map((msg, idx) => (
            <div key={idx} className="flex gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-[10px] text-white font-bold flex-shrink-0">
                {msg.user.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className={`text-xs font-bold ${msg.user === 'Você' ? 'text-primary-400' : 'text-gray-300'}`}>{msg.user}</span>
                  <span className="text-[10px] text-gray-600">{msg.time}</span>
                </div>
                <p className="text-sm text-gray-200">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-3 bg-gray-900 border-t border-gray-800 flex gap-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-gray-800 text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600 placeholder-gray-500"
          />
          <button 
            type="submit"
            disabled={!chatMessage.trim()}
            className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

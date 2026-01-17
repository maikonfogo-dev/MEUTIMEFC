'use client';

import { useState, useEffect } from 'react';
import { Timer, StopCircle, Flag, CreditCard, Minus, Plus, Play } from 'lucide-react';
import Link from 'next/link';

export default function RefereeMatchControl() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      
      {/* Top Bar */}
      <div className="p-4 flex justify-between items-center bg-gray-800 border-b border-gray-700">
        <Link href="/referee/dashboard" className="text-gray-400 hover:text-white text-sm">
          &larr; Voltar
        </Link>
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Controle de Jogo</span>
        <div className="w-8"></div> {/* Spacer */}
      </div>

      {/* Timer Section */}
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="text-7xl font-mono font-bold tracking-tighter mb-4 tabular-nums">
          {formatTime(time)}
        </div>
        <button 
          onClick={() => setIsRunning(!isRunning)}
          className={`px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 transition-all transform active:scale-95 ${
            isRunning 
              ? 'bg-yellow-500 text-yellow-900 hover:bg-yellow-400' 
              : 'bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-600/30'
          }`}
        >
          {isRunning ? <StopCircle className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          {isRunning ? 'Pausar Jogo' : 'Iniciar Jogo'}
        </button>
      </div>

      {/* Scoreboard Control */}
      <div className="bg-gray-800 rounded-t-3xl p-6 flex-1">
        <div className="grid grid-cols-2 gap-8 mb-8">
          
          {/* Home Team */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 text-center">Real Madruga</h3>
            <div className="bg-gray-900 w-full rounded-2xl p-4 flex flex-col items-center border border-gray-700">
              <span className="text-5xl font-bold mb-4">{homeScore}</span>
              <div className="flex gap-2 w-full">
                <button 
                  onClick={() => setHomeScore(Math.max(0, homeScore - 1))}
                  className="flex-1 py-3 bg-gray-700 rounded-xl hover:bg-gray-600 flex items-center justify-center"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setHomeScore(homeScore + 1)}
                  className="flex-1 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-600/20"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Cards */}
            <div className="flex gap-2 mt-4">
               <button className="w-10 h-10 bg-yellow-400 rounded-lg shadow-sm hover:brightness-110"></button>
               <button className="w-10 h-10 bg-red-600 rounded-lg shadow-sm hover:brightness-110"></button>
            </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 text-center">Unidos da Vila</h3>
            <div className="bg-gray-900 w-full rounded-2xl p-4 flex flex-col items-center border border-gray-700">
              <span className="text-5xl font-bold mb-4">{awayScore}</span>
              <div className="flex gap-2 w-full">
                <button 
                  onClick={() => setAwayScore(Math.max(0, awayScore - 1))}
                  className="flex-1 py-3 bg-gray-700 rounded-xl hover:bg-gray-600 flex items-center justify-center"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setAwayScore(awayScore + 1)}
                  className="flex-1 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-600/20"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Cards */}
            <div className="flex gap-2 mt-4">
               <button className="w-10 h-10 bg-yellow-400 rounded-lg shadow-sm hover:brightness-110"></button>
               <button className="w-10 h-10 bg-red-600 rounded-lg shadow-sm hover:brightness-110"></button>
            </div>
          </div>

        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="py-4 bg-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-600">
            <Flag className="w-5 h-5" />
            Impedimento
          </button>
          <button className="py-4 bg-red-900/50 text-red-400 border border-red-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-900/70">
            Encerrar Partida
          </button>
        </div>
      </div>
    </div>
  );
}

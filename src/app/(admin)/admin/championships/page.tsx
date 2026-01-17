'use client';

import { useState } from 'react';
import { Plus, Search, Trophy, Calendar, MoreVertical, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { mockTeamData } from '@/data/mockTeam';

export default function AdminChampionshipsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // In a real app, this would come from an API/Database
  const championships = mockTeamData.championships || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campeonatos</h1>
          <p className="text-gray-500">Gerencie suas competições, tabelas e jogos.</p>
        </div>
        <Link 
          href="/admin/championships/new" 
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Novo Campeonato
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Buscar campeonato..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-700">
          <option value="all">Todos os Status</option>
          <option value="upcoming">Em Breve</option>
          <option value="ongoing">Em Andamento</option>
          <option value="finished">Finalizados</option>
        </select>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {championships.map((champ) => (
          <div key={champ.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                  {champ.logoUrl ? (
                    <Image
                      src={champ.logoUrl}
                      alt={champ.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Trophy className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex gap-2">
                   <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                     champ.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                     champ.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                     'bg-gray-100 text-gray-700'
                   }`}>
                     {champ.status === 'ongoing' ? 'Em Andamento' : champ.status === 'upcoming' ? 'Em Breve' : 'Finalizado'}
                   </span>
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-gray-900 mb-1">{champ.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{champ.season} • {champ.category === 'adult' ? 'Adulto' : 'Base'}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-gray-400" />
                  <span>{champ.type === 'points' ? 'Pontos Corridos' : 'Copa'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{champ.matches?.length || 0} Jogos</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center gap-2">
               <Link href={`/admin/championships/${champ.id}`} className="text-sm font-bold text-gray-700 hover:text-primary-600">
                 Gerenciar
               </Link>
               <div className="flex gap-2">
                  <button className="p-2 hover:bg-white rounded-full text-gray-500 hover:text-primary-600 transition-colors" title="Editar">
                    <Calendar className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-white rounded-full text-gray-500 hover:text-red-600 transition-colors" title="Transmissão">
                    <PlayCircle className="w-4 h-4" />
                  </button>
               </div>
            </div>
          </div>
        ))}
        
        {/* Empty State */}
        {championships.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-500">
            <Trophy className="w-16 h-16 text-gray-200 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">Nenhum campeonato encontrado</h3>
            <p className="max-w-md text-center mt-2 mb-6">Comece criando um novo campeonato para gerenciar tabelas e jogos.</p>
            <Link 
              href="/admin/championships/new" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Criar Primeiro Campeonato
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

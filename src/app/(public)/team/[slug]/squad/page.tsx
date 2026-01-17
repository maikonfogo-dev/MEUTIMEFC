import prisma from '@/lib/prisma';
import Image from 'next/image';
import type { Player } from '@prisma/client';

export default async function SquadPage() {
  const team = await prisma.team.findFirst({
    include: { players: true }
  });

  const players = (team?.players || []) as Player[];

  const groupedPlayers: Record<string, Player[]> = {
    'Goleiro': players.filter((p: Player) => p.position === 'Goleiro'),
    'Zagueiro': players.filter((p: Player) => p.position === 'Zagueiro'),
    'Lateral': players.filter((p: Player) => p.position === 'Lateral'),
    'Meio-Campo': players.filter((p: Player) => p.position === 'Meio-Campo'),
    'Atacante': players.filter((p: Player) => p.position === 'Atacante'),
    'Técnico': players.filter((p: Player) => p.position === 'Técnico'),
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold font-heading mb-6 text-gray-800">Elenco</h1>
      
      {Object.entries(groupedPlayers).map(([position, playersInPos]) => (
        playersInPos.length > 0 && (
          <div key={position} className="mb-6">
            <h2 className="text-lg font-semibold text-primary-600 mb-3 border-b border-gray-100 pb-2">
              {position}s
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {playersInPos.map((player: Player) => (
                <div key={player.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gray-100 mb-2 overflow-hidden relative">
                    {player.photoUrl && (
                      <Image src={player.photoUrl} alt={player.name} fill className="object-cover" />
                    )}
                  </div>
                  <span className="font-bold text-gray-800 text-sm">{player.nickname || player.name}</span>
                  <span className="text-xs text-gray-500 font-mono">#{player.number}</span>
                  {player.stats && (
                    <div className="mt-2 text-[10px] text-gray-400 flex gap-2 font-mono">
                      <span>{JSON.parse(player.stats).matches}J</span>
                      <span>{JSON.parse(player.stats).goals}G</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}

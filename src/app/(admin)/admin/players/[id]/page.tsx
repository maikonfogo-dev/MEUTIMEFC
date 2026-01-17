"use client";

import { PlayerForm } from "@/components/admin/PlayerForm";
import { Player, TeamData } from "@/types/team";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function EditPlayerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchPlayer() {
      try {
        const res = await fetch('/api/team');
        const data: TeamData = await res.json();
        const foundPlayer = data.players?.find(p => p.id === params.id);
        setPlayer(foundPlayer || null);
      } catch (error) {
        console.error('Failed to fetch player:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayer();
  }, [params.id]);

  const handleUpdate = async (data: Player) => {
    setIsSubmitting(true);
    try {
      // 1. Get current team data
      const res = await fetch('/api/team');
      const teamData: TeamData = await res.json();

      // 2. Update player list
      const updatedPlayers = teamData.players.map(p => 
        p.id === params.id ? { ...data, id: params.id } : p
      );

      // 3. Update team data
      await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...teamData, players: updatedPlayers }),
      });

      router.push("/admin/players");
    } catch (error) {
      console.error('Failed to update player:', error);
      alert('Erro ao atualizar jogador');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!player) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">Jogador não encontrado</h2>
        <p className="text-gray-500 mt-2">O jogador que você está tentando editar não existe.</p>
      </div>
    );
  }

  return <PlayerForm initialData={player} onSubmit={handleUpdate} isSubmitting={isSubmitting} />;
}

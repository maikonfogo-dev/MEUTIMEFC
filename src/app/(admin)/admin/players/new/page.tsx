"use client";

import { PlayerForm } from "@/components/admin/PlayerForm";
import { Player, TeamData } from "@/types/team";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPlayerPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: Player) => {
    setIsSubmitting(true);
    try {
      // 1. Get current team data
      const res = await fetch('/api/team');
      const teamData: TeamData = await res.json();

      // 2. Add new player
      const newPlayer = { ...data, id: crypto.randomUUID() };
      const updatedPlayers = [...(teamData.players || []), newPlayer];

      // 3. Update team data
      await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...teamData, players: updatedPlayers }),
      });

      router.push("/admin/players");
    } catch (error) {
      console.error('Failed to create player:', error);
      alert('Erro ao criar jogador');
    } finally {
      setIsSubmitting(false);
    }
  };

  return <PlayerForm onSubmit={handleCreate} isSubmitting={isSubmitting} />;
}

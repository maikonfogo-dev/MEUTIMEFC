"use client";

import { MatchForm } from "@/components/admin/MatchForm";
import { Match, TeamData } from "@/types/team";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewMatchPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: Match) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/team');
      const teamData: TeamData = await res.json();

      const newMatch: Match = { ...data, id: crypto.randomUUID() };
      
      // Combine all matches
      const allMatches = [
        ...(teamData.nextMatch ? [teamData.nextMatch] : []),
        ...(teamData.lastMatches || []),
        newMatch
      ];

      // Sort by date
      allMatches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      // Find Next Match (first future match)
      const now = new Date();
      const futureMatches = allMatches.filter(m => new Date(m.date) > now);
      const pastMatches = allMatches.filter(m => new Date(m.date) <= now);

      let nextMatch: Match | undefined = undefined;
      let lastMatches: Match[] = [];

      if (futureMatches.length > 0) {
        nextMatch = futureMatches[0]; // Closest future match
        // Remaining future matches go to lastMatches (or a new field if we had one, but for now we put them here)
        // Actually, let's put them in lastMatches so they are stored.
        lastMatches = [...futureMatches.slice(1), ...pastMatches];
      } else {
        lastMatches = pastMatches;
      }

      // Sort lastMatches descending for storage (optional, but good for "Recent Results")
      // But since we mix future/past, maybe just keep them consistent?
      // Let's sort descending by date.
      lastMatches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...teamData, 
          nextMatch, 
          lastMatches 
        }),
      });

      router.push("/admin/matches");
    } catch (error) {
      console.error('Failed to create match:', error);
      alert('Erro ao criar jogo');
    } finally {
      setIsSubmitting(false);
    }
  };

  return <MatchForm onSubmit={handleCreate} isSubmitting={isSubmitting} />;
}

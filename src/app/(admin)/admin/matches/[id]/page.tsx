"use client";

import { MatchForm } from "@/components/admin/MatchForm";
import { Match, TeamData } from "@/types/team";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function EditMatchPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchMatch() {
      try {
        const res = await fetch('/api/team');
        const data: TeamData = await res.json();
        
        let foundMatch = data.nextMatch?.id === params.id ? data.nextMatch : undefined;
        if (!foundMatch) {
          foundMatch = data.lastMatches?.find(m => m.id === params.id);
        }
        
        setMatch(foundMatch || null);
      } catch (error) {
        console.error('Failed to fetch match:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMatch();
  }, [params.id]);

  const handleUpdate = async (data: Match) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/team');
      const teamData: TeamData = await res.json();

      // Combine all matches except the one being updated (to avoid duplication if we just push)
      // Actually, easier to map:
      let allMatches = [
        ...(teamData.nextMatch ? [teamData.nextMatch] : []),
        ...(teamData.lastMatches || [])
      ];
      
      // Check if match exists (it should)
      const index = allMatches.findIndex(m => m.id === params.id);
      if (index >= 0) {
        allMatches[index] = { ...data, id: params.id };
      } else {
        // Fallback (should not happen)
        allMatches.push({ ...data, id: params.id });
      }

      // Sort by date
      allMatches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      // Find Next Match (first future match)
      const now = new Date();
      const futureMatches = allMatches.filter(m => new Date(m.date) > now);
      const pastMatches = allMatches.filter(m => new Date(m.date) <= now);

      let nextMatch: Match | undefined = undefined;
      let lastMatches: Match[] = [];

      if (futureMatches.length > 0) {
        nextMatch = futureMatches[0];
        lastMatches = [...futureMatches.slice(1), ...pastMatches];
      } else {
        lastMatches = pastMatches;
      }

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
      console.error('Failed to update match:', error);
      alert('Erro ao atualizar jogo');
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

  if (!match) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">Jogo não encontrado</h2>
      </div>
    );
  }

  return <MatchForm initialData={match} onSubmit={handleUpdate} isSubmitting={isSubmitting} />;
}

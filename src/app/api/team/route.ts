import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import prisma from '@/lib/prisma';

const getTeamCached = unstable_cache(
  async () => {
    const team = await prisma.team.findFirst({
      include: {
        players: true,
        sponsors: true,
        matches: true,
        products: true,
        news: true,
        members: true
      }
    });

    if (!team) return null;

    const nextMatch = team.matches.find(m => m.status === 'scheduled') || null;
    const lastMatches = team.matches.filter(m => m.status === 'finished');

    return {
      slug: team.id,
      planId: team.planId as any,
      name: team.name,
      city: team.city ?? undefined,
      whatsapp: team.whatsapp ?? undefined,
      logoUrl: team.logoUrl ?? '',
      colors: {
        primary: team.primaryColor ?? '#0F5132',
        secondary: team.secondaryColor ?? '#2ECC71',
        accent: team.accentColor ?? '#2ECC71'
      },
      players: team.players.map(p => ({
        id: p.id,
        name: p.name,
        nickname: p.nickname ?? undefined,
        position: p.position as any,
        number: p.number,
        photoUrl: p.photoUrl ?? '',
        stats: p.stats ? JSON.parse(p.stats) : undefined
      })),
      sponsors: team.sponsors.map(s => ({
        id: s.id,
        name: s.name,
        logoUrl: s.logoUrl,
        description: s.description,
        websiteUrl: s.websiteUrl ?? undefined,
        instagramUrl: s.instagramUrl ?? undefined,
        isMaster: s.isMaster,
        category: s.category as any,
        whatsapp: s.whatsapp ?? undefined,
        status: s.status as any,
        order: s.order ?? undefined
      })),
      nextMatch: nextMatch
        ? {
            id: nextMatch.id,
            date: nextMatch.date.toISOString(),
            location: nextMatch.location,
            opponent: nextMatch.opponent,
            opponentLogoUrl: nextMatch.opponentLogoUrl ?? undefined,
            isHome: nextMatch.isHome,
            score: nextMatch.score ? JSON.parse(nextMatch.score) : undefined,
            championship: nextMatch.championship ?? undefined,
            status: nextMatch.status as any,
            round: nextMatch.round ?? undefined
          }
        : undefined,
      lastMatches: lastMatches.map(m => ({
        id: m.id,
        date: m.date.toISOString(),
        location: m.location,
        opponent: m.opponent,
        opponentLogoUrl: m.opponentLogoUrl ?? undefined,
        isHome: m.isHome,
        score: m.score ? JSON.parse(m.score) : undefined,
        championship: m.championship ?? undefined,
        status: m.status as any,
        round: m.round ?? undefined
      })),
      news: team.news.map(n => ({
        id: n.id,
        title: n.title,
        summary: n.summary,
        content: n.content ?? undefined,
        date: n.date.toISOString(),
        imageUrl: n.imageUrl ?? undefined
      })),
      products: team.products.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        isNew: p.isNew,
        isOfficial: p.isOfficial,
        images: JSON.parse(p.images),
        variants: JSON.parse(p.variants),
        installments: p.installments ? JSON.parse(p.installments) : undefined
      })),
      plans: [],
      members: team.members.map(m => ({
        id: m.id,
        name: m.name,
        email: m.email,
        phone: m.phone ?? undefined,
        cpf: m.cpf ?? undefined,
        planId: m.planId,
        status: m.status as any,
        since: m.since.toISOString(),
        paymentMethod: m.paymentMethod as any
      })),
      titles: [],
      notifications: [],
      championships: [],
      liveStreams: []
    };
  },
  ['team-data'],
  { revalidate: 60 }
);

export async function GET() {
  try {
    const data = await getTeamCached();
    if (!data) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch team data' },
      { status: 500 }
    );
  }
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Updating team via API is not supported in this version' },
    { status: 405 }
  );
}

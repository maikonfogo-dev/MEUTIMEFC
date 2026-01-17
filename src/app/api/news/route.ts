import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function mapNews(entity: { id: string; title: string; summary: string; content: string | null; date: Date; imageUrl: string | null }) {
  return {
    id: entity.id,
    title: entity.title,
    summary: entity.summary,
    content: entity.content ?? undefined,
    date: entity.date.toISOString(),
    imageUrl: entity.imageUrl ?? undefined
  };
}

export async function GET() {
  try {
    const team = await prisma.team.findFirst();
    if (!team) {
      return NextResponse.json([]);
    }

    const items = await prisma.news.findMany({
      where: { teamId: team.id },
      orderBy: { date: 'desc' }
    });

    const mapped = items.map(mapNews);

    return NextResponse.json(mapped);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const team = await prisma.team.findFirst();
    if (!team) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      );
    }

    const created = await prisma.news.create({
      data: {
        teamId: team.id,
        title: body.title,
        summary: body.summary,
        content: body.content ?? null,
        date: new Date(body.date),
        imageUrl: body.imageUrl ?? null
      }
    });

    const mapped = mapNews(created);

    return NextResponse.json(mapped, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    );
  }
}


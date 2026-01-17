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

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const item = await prisma.news.findUnique({
      where: { id: params.id }
    });

    if (!item) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      );
    }

    const mapped = mapNews(item);

    return NextResponse.json(mapped);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch news item' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    const updated = await prisma.news.update({
      where: { id: params.id },
      data: {
        title: body.title,
        summary: body.summary,
        content: body.content ?? null,
        date: new Date(body.date),
        imageUrl: body.imageUrl ?? null
      }
    });

    const mapped = mapNews(updated);

    return NextResponse.json(mapped);
  } catch {
    return NextResponse.json(
      { error: 'Failed to update news' },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.news.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete news' },
      { status: 500 }
    );
  }
}


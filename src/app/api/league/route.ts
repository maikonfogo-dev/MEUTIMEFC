import { NextResponse } from 'next/server';
import { mockLeagueData } from '@/data/mockLeague';

export async function GET() {
  return NextResponse.json(mockLeagueData);
}

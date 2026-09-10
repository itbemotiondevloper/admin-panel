import { NextResponse } from 'next/server';
import { seoService } from '@/services/seo.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const redirects = await seoService.getRedirects();
    return NextResponse.json(redirects, {
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=30'
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch redirects' }, { status: 500 });
  }
}

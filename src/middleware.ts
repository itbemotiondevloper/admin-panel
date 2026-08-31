import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    // Note: Fetching from the backend API directly inside middleware.
    // In production, you might want to cache this or use Edge Config.
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/redirects/public`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    
    if (res.ok) {
      const data = await res.json();
      const redirects = data.data || [];
      
      const currentPath = request.nextUrl.pathname;
      
      const redirectMatch = redirects.find((r: any) => r.oldUrl === currentPath && r.isEnabled);
      
      if (redirectMatch) {
        return NextResponse.redirect(new URL(redirectMatch.newUrl, request.url), redirectMatch.status || 301);
      }
    }
  } catch (error) {
    console.error('Middleware redirect check failed', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

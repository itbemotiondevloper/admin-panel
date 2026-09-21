import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 400);

      const res = await fetch(`${apiUrl}/redirects/public`, {
        signal: controller.signal,
        next: { revalidate: 60 }
      });
      clearTimeout(timeoutId);
      
      if (res.ok) {
        const data = await res.json();
        const redirects = data.data || [];
        const currentPath = request.nextUrl.pathname;
        const redirectMatch = redirects.find((r: any) => r.oldUrl === currentPath && r.isEnabled);
        
        if (redirectMatch) {
          return NextResponse.redirect(new URL(redirectMatch.newUrl, request.url), redirectMatch.status || 301);
        }
      }
    }
  } catch (error) {
    // Fail silently in development/middleware
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
     * - hybridaction (browser extension trackers)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|hybridaction).*)',
  ],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function normalizePath(path: string): string {
  if (!path) return '/';
  const trimmed = path.trim().toLowerCase();
  if (trimmed.length > 1 && trimmed.endsWith('/')) {
    return trimmed.slice(0, -1);
  }
  return trimmed;
}

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  // Don't intercept admin panel or API paths for public redirects
  if (currentPath.startsWith('/admin') || currentPath.startsWith('/api')) {
    return NextResponse.next();
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const redirectApiUrl = new URL('/api/redirects', request.url);
    const res = await fetch(redirectApiUrl.toString(), {
      signal: controller.signal,
      next: { revalidate: 30 }
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const redirects: any[] = Array.isArray(data) ? data : (data.data || []);
      const normalizedCurrent = normalizePath(currentPath);

      const redirectMatch = redirects.find((r: any) => {
        const isRuleActive = r.status ? r.status === 'active' : r.isEnabled !== false;
        if (!isRuleActive) return false;

        const source = r.sourceUrl || r.oldUrl;
        if (!source) return false;

        const normalizedSource = normalizePath(source);
        return normalizedSource === normalizedCurrent || source === currentPath;
      });

      if (redirectMatch) {
        const dest = redirectMatch.destinationUrl || redirectMatch.newUrl;
        if (dest) {
          const statusCode = Number(redirectMatch.type || redirectMatch.status) === 302 ? 302 : 301;
          const destUrl = (dest.startsWith('http://') || dest.startsWith('https://'))
            ? new URL(dest)
            : new URL(dest.startsWith('/') ? dest : `/${dest}`, request.url);

          return NextResponse.redirect(destUrl, statusCode);
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
     * - favicon.ico, sitemap.xml, robots.txt
     * - static asset extensions (.png, .jpg, .svg, .webp, etc.)
     * - hybridaction (browser extension trackers)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llm.txt|hybridaction|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js)$).*)',
  ],
};

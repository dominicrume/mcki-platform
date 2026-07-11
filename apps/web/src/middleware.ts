import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Exclude static assets and API routes
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // The pillars are routes in one app. A subdomain maps onto its own segment, but every
  // pillar path must also resolve as-is from any origin, because the nav links to same-origin
  // paths like /ai. So: pass through anything already addressing a known pillar, and only
  // prefix the bare paths that a subdomain visitor would type.
  const PILLARS = ['education', 'ai', 'live', 'partners'] as const;
  const addressesPillar = PILLARS.some(
    (p) => url.pathname === `/${p}` || url.pathname.startsWith(`/${p}/`)
  );
  if (addressesPillar) return NextResponse.next();

  const subdomain = PILLARS.find((p) => hostname.startsWith(`${p}.`));
  if (subdomain) {
    url.pathname = `/${subdomain}${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
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

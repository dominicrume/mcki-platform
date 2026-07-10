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

  // Map each subdomain onto its route segment. Absolute links (/education/ai-workshop)
  // must resolve on the apex and on the subdomain alike, so skip the rewrite when the
  // segment is already present rather than prefixing it twice.
  for (const segment of ['education', 'ai', 'live'] as const) {
    if (!hostname.startsWith(`${segment}.`)) continue;
    if (url.pathname === `/${segment}` || url.pathname.startsWith(`/${segment}/`)) {
      return NextResponse.next();
    }
    url.pathname = `/${segment}${url.pathname === '/' ? '' : url.pathname}`;
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

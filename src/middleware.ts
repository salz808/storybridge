import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Define the main domain (this should be configurable)
  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'storybridge.com';
  
  // Extract subdomain
  let subdomain = '';
  if (hostname.endsWith(`.${mainDomain}`)) {
    subdomain = hostname.replace(`.${mainDomain}`, '');
  }

  // Handle tenant routing
  if (subdomain && subdomain !== 'www' && subdomain !== 'app') {
    // Rewrite to a dynamic route that handles the tenant
    // For example: /_sites/[site]/...
    return NextResponse.rewrite(new URL(`/_sites/${subdomain}${url.pathname}${url.search}`, request.url));
  }

  // If it's the app subdomain or main domain, continue as normal
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

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const URL = request.nextUrl.pathname;
  console.log('middleware URL: ', URL);

  const response = NextResponse.next();
  response.headers.set('x-full-url', URL);
  return response;
}

export const config = {
  matcher: [
    // Match all pages
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // Match all API routes
    '/api/:path*',
  ],
};

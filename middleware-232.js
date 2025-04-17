import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  if (pathname === '/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!isLoggedIn && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
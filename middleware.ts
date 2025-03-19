import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard');

    // Als de gebruiker niet is ingelogd, redirect naar login
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Als de gebruiker niet is goedgekeurd en geen admin is, redirect naar pending
    if (!token.isApproved && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/pending', req.url));
    }

    // Als de gebruiker geen admin is en probeert het dashboard te bereiken
    if (token.role !== 'admin' && (isDashboardRoute || isAdminRoute)) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/users/:path*',
  ]
}; 
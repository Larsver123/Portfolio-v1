import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard');

    // Debug log voor token informatie
    console.log('Token in middleware:', token);

    // Als de gebruiker niet is ingelogd, redirect naar login
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Als de gebruiker niet is goedgekeurd en geen admin is, redirect naar pending
    if (!token.isApproved && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/pending', req.url));
    }

    // Als de gebruiker geen admin is en probeert het dashboard te bereiken
    if (isDashboardRoute || isAdminRoute) {
      if (token.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Debug log voor authorized callback
        console.log('Token in authorized callback:', token);
        return !!token;
      }
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/users/:path*',
  ]
}; 
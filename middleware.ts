import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard');

    // If user is not approved and not admin, redirect to pending page
    if (token && !token.isApproved && token.role !== 'admin' && (isDashboardRoute || isAdminRoute)) {
      return NextResponse.redirect(new URL('/pending', req.url));
    }

    // If user is not admin, prevent access to admin routes
    if (token && token.role !== 'admin' && isAdminRoute) {
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
    '/api/admin/:path*',
  ]
}; 
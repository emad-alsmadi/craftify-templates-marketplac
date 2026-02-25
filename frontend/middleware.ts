import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicAuthPages = ['/login', '/signup'];

  const protectedPaths: Array<{ path: string; role: string | string[] }> = [
    { path: '/profile', role: ['user', 'admin', 'moderator'] },
    { path: '/welcome', role: ['user', 'admin', 'moderator'] },
    { path: '/admin', role: 'admin' },
  ];

  const protectedPath = protectedPaths.find((p) => path.startsWith(p.path));

  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('userRole')?.value;

  if (publicAuthPages.some((p) => path.startsWith(p))) {
    if (token && userRole) {
      if (userRole === 'admin') {
        return NextResponse.redirect(new URL('/profile', request.url));
      }
      return NextResponse.redirect(new URL('/welcome', request.url));
    }
  }

  if (protectedPath) {
    if (!token || !userRole) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const requiredRole = protectedPath.role;
    if (Array.isArray(requiredRole)) {
      if (!requiredRole.includes(userRole)) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    } else {
      if (userRole !== requiredRole) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/profile/:path*',
    '/welcome/:path*',
    '/admin/:path*',
  ],
};

import { NextRequest, NextResponse } from 'next/server';

import { CONFIG } from '@config';

const TOKEN_KEY = CONFIG.AUTH_TOKEN_KEY || '@token';

const needAuthPages = [
  '/cart',
  '/detail',
  '/history',
  '/list',
  '/modify',
  '/mypage',
  '/myreview',
  '/payment',
  '/review',
  '/withdraw',
];

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;
  const token = request.cookies.get(TOKEN_KEY);
  const isNeedAuthPages = needAuthPages.some((v) => {
    return pathname.startsWith(v);
  });
  if (isNeedAuthPages && !token) {
    const url = nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url, 307);
  }
  if (pathname === '/' && !token) {
    const url = nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url, 307);
  }

  if (pathname === '/login' && token) {
    const url = nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url, 307);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!manifest|_next|icons|fonts|images|api|static|favicon.ico).*)',
  ],
};

// not a fan that this is at root, and not at app/

import {
  type NextRequest,
  type MiddlewareConfig,
  NextResponse,
} from 'next/server'
import { COOKIE_NAME } from './utils/constants'

export const config: MiddlewareConfig = {
  matcher: ['/dashboard/:path*', '/'],
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const toUrl = (url: string) => new URL(url, request.url)

  if (pathname === '/') {
    return NextResponse.redirect(toUrl('/dashboard'))
  }

  if (pathname.startsWith('/dashboard') && !request.cookies.has(COOKIE_NAME)) {
    return NextResponse.redirect(toUrl('/signin'))
  }
}

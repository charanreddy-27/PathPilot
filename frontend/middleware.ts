import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  const { pathname } = request.nextUrl

  // Protected routes
  const protectedPaths = ['/chat']
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

  // Auth routes
  const authPaths = ['/login', '/register']
  const isAuthPath = authPaths.some(path => pathname.startsWith(path))

  // Redirect to login if accessing protected route without token
  if (isProtectedPath && !token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users from auth routes to /chat
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/chat', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/chat/:path*',
    '/login',
    '/register'
  ]
} 
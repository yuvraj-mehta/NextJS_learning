import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  const isPublicPath = path === '/' || path === '/signup' || path === '/verifyemail' || path === '/login';
  
  const token = request.cookies.get('token')?.value;

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
}
 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/signup',
    '/login',
    './verifyemail',
  ]
}
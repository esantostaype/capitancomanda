import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { Role } from './interfaces'

export async function middleware( req: NextRequest ) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  
  if ( !token ) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const { pathname } = req.nextUrl

  if ( token.role !== Role.ADMIN && token.role !== Role.OWNER ) {
    return NextResponse.redirect( new URL('/', req.url))
  }

  if ( pathname.startsWith('/admin/branches') && token.role !== Role.OWNER ) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return NextResponse.next()
}

export const config = { 
  matcher: ['/admin/:path*', '/kitchen/:path*', '/order/:path*']
}
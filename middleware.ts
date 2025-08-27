import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.AUTH_SECRET!)

async function verify(token: string) {
  await jwtVerify(token, secret) // wirft bei Ungültigkeit
}

export async function middleware(req: NextRequest) {
  // Alle Pfade, die geschützt sein sollen:
  const protectedPaths = ["/technology", "/contact", "/company", "/careers"]
  const path = req.nextUrl.pathname
  const needsAuth = protectedPaths.some((p) => path.startsWith(p))
  if (!needsAuth) return NextResponse.next()

  const token = req.cookies.get("site_auth")?.value
  if (!token) return NextResponse.redirect(new URL("/login", req.url))

  try {
    await verify(token)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: [
    "/technology/:path*",
    "/contact/:path*",
    "/company/:path*",
    "/careers/:path*",
  ],
}

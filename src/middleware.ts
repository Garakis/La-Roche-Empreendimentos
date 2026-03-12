import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('admin_session')?.value;

  // Protect all routes under /admin EXCEPT /admin/login
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    // Determine the environment secret
    const secretKey = process.env.JWT_SECRET || 'la-roche-super-secret-key-fallback';
    const key = new TextEncoder().encode(secretKey);

    try {
      if (!session) throw new Error("No session");
      
      // Verify JWT
      await jwtVerify(session, key, { algorithms: ['HS256'] });
      
      // Verification passed, allow access
      return NextResponse.next();
      
    } catch (error) {
      // Missing or invalid token -> Redirect to login
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow other public routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

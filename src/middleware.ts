import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key-change-in-prod';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Check if the route is protected
  // We can also rely on the config.matcher to filter, but explicit checks here are good for logic.
  
  // If no token is present, redirect to login
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    // Add callback URL so user is redirected back after login
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // 2. Verify the token
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // 3. Check Role Permissions
    const role = payload.role as string;

    // Admin routes protection
    if (pathname.startsWith('/admin')) {
      if (role !== 'admin') {
        // Redirect to home or unauthorized page
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    // Organizer routes protection (if we have a role for that, or assume admin can access)
    if (pathname.startsWith('/organizer')) {
        // Assuming organizer logic, for now let's restrict to admin or specific role if exists
        // User didn't specify 'organizer' role in the summary, only Admin/Socio/Torcedor.
        // But the file structure has /organizer. 
        // Let's assume only Admin can access for now or if we add an organizer role later.
        if (role !== 'admin') {
             return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Fan/Member routes protection
    // 'fan' or 'member' dashboard might be accessible to 'torcedor' and 'socio'
    // 'torcedor' is the basic logged in role.
    // So just having a valid token is enough for /fan usually, unless it's specific.
    
    // Continue navigation
    const response = NextResponse.next();
    
    // Pass user info to backend via headers if needed (optional)
    response.headers.set('X-User-Id', payload.userId as string);
    response.headers.set('X-User-Role', role);

    return response;

  } catch (error) {
    // Token verification failed (expired or invalid)
    // Clear cookie and redirect to login
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('auth_token');
    return response;
  }
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    '/admin/:path*',
    '/organizer/:path*',
    '/referee/:path*',
    // We can add '/fan/:path*' if we want to protect fan dashboard
    '/fan/:path*',
  ],
};

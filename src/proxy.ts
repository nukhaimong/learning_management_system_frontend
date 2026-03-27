import { NextRequest, NextResponse } from 'next/server';
import { getMe } from './services/auth/auth.server.service';
import { Role } from './constants';

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('Middleware running for:', pathname);

  // Get user session
  const { data, error } = await getMe();

  // Redirect to login if not authenticated
  if (!data || error) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Determine user role
  const userRole = data.role;
  const isAdmin = userRole === Role.Admin || userRole === Role.SuperAdmin;
  const isInstructor = userRole === Role.Instructor;
  const isStudent = !isAdmin && !isInstructor;

  // Role-based dashboard routing
  const isAdminRoute = pathname.startsWith('/admin-dashboard');
  const isInstructorRoute = pathname.startsWith('/instructor-dashboard');
  const isDashboardRoute =
    pathname === '/dashboard' || pathname.startsWith('/dashboard/');

  // Case 1: Student trying to access admin/instructor routes
  if (isStudent && (isAdminRoute || isInstructorRoute)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Case 2: Admin trying to access instructor routes or dashboard
  if (isAdmin) {
    if (isInstructorRoute || isDashboardRoute) {
      return NextResponse.redirect(new URL('/admin-dashboard', request.url));
    }
  }

  // Case 3: Instructor trying to access admin routes or dashboard
  if (isInstructor) {
    if (isAdminRoute || isDashboardRoute) {
      return NextResponse.redirect(
        new URL('/instructor-dashboard', request.url),
      );
    }
  }

  // Allow access to the requested route
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/admin-dashboard',
    '/admin-dashboard/:path*',
    '/instructor-dashboard',
    '/instructor-dashboard/:path*',
  ],
};

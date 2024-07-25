import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";
import { cookies } from "next/headers";
import { NAVIGATION, ROLES, Session } from "./lib/definitions";

export default async function middleware(req: NextRequest) {
  // Get path
  const path = req.nextUrl.pathname;

  const publicRoutes = [NAVIGATION.LOGIN.toString()];

  /* Define Protected Routes By User Roles */
  const isAdminProtectedRoute = path.startsWith(NAVIGATION.ADMIN);
  const isCaptainProtectedRoute = path.startsWith(NAVIGATION.CAPTAIN);
  const isUserProtectedRoute = path.startsWith(NAVIGATION.USER);

  // If on empty path - Go to Login page
  if (path == "/") {
    return NextResponse.redirect(new URL(NAVIGATION.LOGIN, req.nextUrl));
  }

  if (publicRoutes.includes(path)) {
    // If going to login page, please go
    return NextResponse.next();
  }

  // 3. Decrypt the session gotten from the cookie
  const cookie = cookies().get("session")?.value!;

  // 4. If no cookie found, redirect to /login page
  if (!cookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Retrieve session
  let session: Session | null = null;

  try {
    session = await decrypt(cookie);
  } catch (error) {
    // Redirect to login to create new session
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect to /login if the user is not authenticated or user is not an admin
  if (
    isAdminProtectedRoute &&
    (!session || session?.authorities != ROLES.ADMIN)
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  // Redirect to /login if the user is not authenticated or user is not an captain
  if (
    isCaptainProtectedRoute &&
    (!session || session?.authorities != ROLES.CAPTAIN)
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  // Redirect to /login if the user is not authenticated or user is not a user
  if (
    isUserProtectedRoute &&
    (!session || session?.authorities != ROLES.USER)
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Successful authentication, continue on path
  return NextResponse.next();
}

// Allow images and SVGs
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.gif$).*)",
  ],
};

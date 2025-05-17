// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth"; // your NextAuth instance
import { adminRoutes, patientRoutes, privateRoutes } from "./routes";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default auth(async (req: NextRequest) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const isLoggedIn = !!req.auth;
  const session = req.auth;

  // 1. API and static assets
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // 2. Auth routes (login/register)
  if (pathname.startsWith("/auth") && isLoggedIn) {
    return NextResponse.redirect(new URL("/patient", baseUrl));
  }

  if (!isLoggedIn && privateRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/auth/login", baseUrl));
  }

  if (isLoggedIn) {
    const role = session.user?.role;

    // ❌ Patient trying to access admin-only route
    if (adminRoutes.some(route => pathname.startsWith(route)) && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/patient", baseUrl));
    }

    // ❌ Admin trying to access patient-only route (optional)
    // if (patientRoutes.some(route => pathname.startsWith(route)) && role !== "PATIENT") {
    //   return NextResponse.redirect(new URL("/dashboard", baseUrl));
    // }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|api/auth).*)"],
};

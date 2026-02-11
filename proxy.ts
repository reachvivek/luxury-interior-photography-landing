import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and auth API without a session
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/api/admin/auth")
  ) {
    return NextResponse.next();
  }

  // Protect all other /admin routes
  const sessionCookie = request.cookies.get("admin_session");

  if (!sessionCookie?.value) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Basic timestamp expiry check (full HMAC validation happens server-side)
  try {
    const [timestamp] = sessionCookie.value.split(".");
    const tokenAge = Date.now() - parseInt(timestamp, 10);

    if (isNaN(tokenAge) || tokenAge > SESSION_DURATION_MS) {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
      response.cookies.delete("admin_session");
      return response;
    }
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

import { NextRequest, NextResponse } from "next/server";
import {
  verifyPassword,
  generateSessionToken,
  validateSessionToken,
  COOKIE_NAME,
  SESSION_DURATION_MS,
} from "@/lib/admin-auth";

// POST /api/admin/auth — Login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    if (!(await verifyPassword(password))) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const token = await generateSessionToken();
    const response = NextResponse.json({ success: true });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION_MS / 1000, // seconds
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/auth — Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}

// GET /api/admin/auth — Check session
export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get(COOKIE_NAME);

  if (!sessionCookie?.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const isValid = await validateSessionToken(sessionCookie.value);

  if (!isValid) {
    const response = NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  return NextResponse.json({ authenticated: true });
}

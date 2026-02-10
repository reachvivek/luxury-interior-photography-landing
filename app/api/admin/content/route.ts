import { NextRequest, NextResponse } from "next/server";
import { validateSessionToken, COOKIE_NAME } from "@/lib/admin-auth";
import { readContent, writeContent, isValidSection, listSections } from "@/lib/content";

function isAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (!cookie?.value) return false;
  return validateSessionToken(cookie.value);
}

// GET /api/admin/content?section=hero
export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const section = request.nextUrl.searchParams.get("section");

  // If no section specified, return list of available sections
  if (!section) {
    return NextResponse.json({ sections: listSections() });
  }

  if (!isValidSection(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  try {
    const data = readContent(section);
    return NextResponse.json({ section, data });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to read ${section}: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    );
  }
}

// PUT /api/admin/content?section=hero
export async function PUT(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const section = request.nextUrl.searchParams.get("section");

  if (!section || !isValidSection(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { data } = body;

    if (data === undefined) {
      return NextResponse.json({ error: "Missing data field" }, { status: 400 });
    }

    writeContent(section, data);
    return NextResponse.json({ success: true, section });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to write ${section}: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { isAuthenticated } from "@/lib/admin-auth";
import { readContent, writeContent, isValidSection, listSections } from "@/lib/content";

// GET /api/admin/content?section=hero
export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const section = request.nextUrl.searchParams.get("section");

  // If no section specified, return list of available sections
  if (!section) {
    const sections = await listSections();
    return NextResponse.json({ sections });
  }

  if (!isValidSection(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  try {
    const data = await readContent(section);
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
  if (!(await isAuthenticated(request))) {
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

    await writeContent(section, data);
    // Bust both caches so admin edits appear immediately:
    // - revalidatePath: page-level ISR cache (homepage)
    // - revalidateTag: data-layer cache used by getCachedSection on other pages
    revalidatePath("/", "layout");
    revalidateTag("content", "max");
    return NextResponse.json({ success: true, section });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to write ${section}: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    );
  }
}

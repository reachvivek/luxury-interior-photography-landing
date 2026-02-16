import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/blog/comments?slugs=a,b,c — batch comment counts for listing page
export async function GET(request: NextRequest) {
  const slugs = request.nextUrl.searchParams.get("slugs");
  if (!slugs) {
    return NextResponse.json({ error: "slugs required" }, { status: 400 });
  }

  try {
    const slugList = slugs.split(",").filter(Boolean);
    const results = await prisma.comment.groupBy({
      by: ["postSlug"],
      where: { postSlug: { in: slugList } },
      _count: { id: true },
    });

    const counts: Record<string, number> = {};
    for (const r of results) {
      counts[r.postSlug] = r._count.id;
    }
    return NextResponse.json({ counts });
  } catch {
    return NextResponse.json({ error: "Failed to fetch comment counts" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/blog/likes?slugs=a,b,c — batch like counts for listing page
export async function GET(request: NextRequest) {
  const slugs = request.nextUrl.searchParams.get("slugs");
  if (!slugs) {
    return NextResponse.json({ error: "slugs required" }, { status: 400 });
  }

  try {
    const slugList = slugs.split(",").filter(Boolean);
    const results = await prisma.like.groupBy({
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
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/blog/views?slug=xxx — get view count from PageView table
// GET /api/blog/views?slugs=a,b,c — batch mode for listing page
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  const slugs = request.nextUrl.searchParams.get("slugs");

  try {
    if (slug) {
      const count = await prisma.pageView.count({
        where: { path: `/blog/${slug}` },
      });
      return NextResponse.json({ count });
    }

    if (slugs) {
      const slugList = slugs.split(",").filter(Boolean);
      const paths = slugList.map((s) => `/blog/${s}`);

      const results = await prisma.pageView.groupBy({
        by: ["path"],
        where: { path: { in: paths } },
        _count: { id: true },
      });

      const counts: Record<string, number> = {};
      for (const r of results) {
        const s = r.path.replace("/blog/", "");
        counts[s] = r._count.id;
      }
      return NextResponse.json({ counts });
    }

    return NextResponse.json({ error: "slug or slugs required" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch views" }, { status: 500 });
  }
}

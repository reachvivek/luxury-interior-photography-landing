import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/blog/like?slug=xxx — get like count + whether current user liked
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  try {
    const session = await auth();
    const userId = (session?.user as any)?.id as string | undefined;

    const [count, userLiked] = await Promise.all([
      prisma.like.count({ where: { postSlug: slug } }),
      userId
        ? prisma.like.findUnique({
            where: { userId_postSlug: { userId, postSlug: slug } },
          })
        : null,
    ]);

    return NextResponse.json({ count, liked: !!userLiked });
  } catch {
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}

// POST /api/blog/like { slug } — toggle like for current user
export async function POST(request: NextRequest) {
  const session = await auth();
  const userId = (session?.user as any)?.id as string | undefined;

  if (!userId) {
    return NextResponse.json({ error: "Sign in to like" }, { status: 401 });
  }

  try {
    const { slug } = await request.json();
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const existing = await prisma.like.findUnique({
      where: { userId_postSlug: { userId, postSlug: slug } },
    });

    if (existing) {
      await prisma.like.delete({ where: { id: existing.id } });
    } else {
      await prisma.like.create({ data: { userId, postSlug: slug } });
    }

    const count = await prisma.like.count({ where: { postSlug: slug } });
    return NextResponse.json({ count, liked: !existing });
  } catch {
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 });
  }
}

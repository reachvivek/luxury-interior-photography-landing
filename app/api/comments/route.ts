import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/comments?slug=my-post-slug
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const comments = await prisma.comment.findMany({
    where: { postSlug: slug },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
  });

  return NextResponse.json(comments);
}

// POST /api/comments  { content, postSlug }
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content, postSlug } = await request.json();

  if (!content?.trim() || !postSlug) {
    return NextResponse.json(
      { error: "Content and postSlug are required" },
      { status: 400 }
    );
  }

  if (content.trim().length > 2000) {
    return NextResponse.json(
      { error: "Comment is too long (max 2000 characters)" },
      { status: 400 }
    );
  }

  const comment = await prisma.comment.create({
    data: {
      content: content.trim(),
      postSlug,
      userId: session.user.id,
    },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
  });

  return NextResponse.json(comment, { status: 201 });
}

// PUT /api/comments  { id, content }
export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, content } = await request.json();
  if (!id || !content?.trim()) {
    return NextResponse.json({ error: "id and content are required" }, { status: 400 });
  }

  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment || comment.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found or not yours" }, { status: 403 });
  }

  const updated = await prisma.comment.update({
    where: { id },
    data: { content: content.trim() },
    include: { user: { select: { id: true, name: true, image: true } } },
  });

  return NextResponse.json(updated);
}

// DELETE /api/comments?id=xxx
export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment || comment.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found or not yours" }, { status: 403 });
  }

  await prisma.comment.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

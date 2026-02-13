import { NextRequest, NextResponse } from "next/server";
import { validateSessionToken, COOKIE_NAME } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (!cookie?.value) return false;
  return validateSessionToken(cookie.value);
}

// GET /api/admin/comments - list all comments for admin
export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const page = Math.max(1, parseInt(request.nextUrl.searchParams.get("page") || "1", 10));
  const limit = 20;

  const [comments, total] = await Promise.all([
    prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: { select: { id: true, name: true, email: true, image: true } },
      },
    }),
    prisma.comment.count(),
  ]);

  return NextResponse.json({ comments, total, page, totalPages: Math.ceil(total / limit) });
}

// PUT /api/admin/comments - edit any comment as admin
export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, content } = await request.json();
  if (!id || !content?.trim()) {
    return NextResponse.json({ error: "Comment id and content required" }, { status: 400 });
  }

  const comment = await prisma.comment.update({
    where: { id },
    data: { content: content.trim() },
  });

  return NextResponse.json(comment);
}

// DELETE /api/admin/comments?id=xxx
export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Comment id required" }, { status: 400 });
  }

  await prisma.comment.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

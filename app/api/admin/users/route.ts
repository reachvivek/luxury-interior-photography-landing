import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

// GET /api/admin/users?search=john&provider=google&page=1&limit=20
export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim();
  const provider = searchParams.get("provider"); // "google", "credentials", or null for all
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));

  try {
    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    if (provider === "google") {
      where.accounts = { some: { provider: "google" } };
    } else if (provider === "credentials") {
      where.password = { not: null };
      where.accounts = { none: {} };
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          emailVerified: true,
          createdAt: true,
          accounts: {
            select: { provider: true },
          },
          _count: {
            select: { comments: true, sessions: true },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    // Provider counts for filter pills
    const [totalAll, googleCount, credentialsCount] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { accounts: { some: { provider: "google" } } } }),
      prisma.user.count({ where: { password: { not: null }, accounts: { none: {} } } }),
    ]);

    return NextResponse.json({
      users,
      total,
      counts: {
        all: totalAll,
        google: googleCount,
        credentials: credentialsCount,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// DELETE /api/admin/users?id=xxx
export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  try {
    // Delete related records first (accounts, sessions), then user
    await prisma.account.deleteMany({ where: { userId: id } });
    await prisma.session.deleteMany({ where: { userId: id } });
    await prisma.comment.deleteMany({ where: { userId: id } });
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

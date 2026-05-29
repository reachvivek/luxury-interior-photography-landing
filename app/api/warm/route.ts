import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Keeps the MongoDB Atlas connection pool warm so first-visitor TTFB
// does not pay the ~30s cold-start cost on a free-tier cluster.
// Wire this to a cron pinger (Vercel Cron, GitHub Actions, UptimeRobot,
// cron-job.org) hitting every ~4 minutes.
export const dynamic = "force-dynamic";

export async function GET() {
  const start = Date.now();
  try {
    await prisma.contentSection.findFirst({ select: { id: true } });
    return NextResponse.json({ ok: true, ms: Date.now() - start });
  } catch (error) {
    return NextResponse.json(
      { ok: false, ms: Date.now() - start, error: error instanceof Error ? error.message : "unknown" },
      { status: 500 },
    );
  }
}

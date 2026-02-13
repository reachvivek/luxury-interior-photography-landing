import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function parseDevice(ua: string): string {
  if (/mobile|android|iphone|ipad/i.test(ua)) return "Mobile";
  if (/tablet|ipad/i.test(ua)) return "Tablet";
  return "Desktop";
}

function parseBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return "Edge";
  if (/chrome/i.test(ua) && !/edg/i.test(ua)) return "Chrome";
  if (/firefox/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return "Safari";
  if (/opera|opr/i.test(ua)) return "Opera";
  return "Other";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, referrer, sessionId } = body;

    if (!path || typeof path !== "string") {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const ua = request.headers.get("user-agent") || "";
    const forwarded = request.headers.get("x-forwarded-for");
    const country = request.headers.get("x-vercel-ip-country") || undefined;
    const city = request.headers.get("x-vercel-ip-city") || undefined;

    // Skip bots
    if (/bot|crawler|spider|googlebot|bingbot/i.test(ua)) {
      return NextResponse.json({ ok: true });
    }

    await prisma.pageView.create({
      data: {
        path: path.substring(0, 500),
        referrer: referrer?.substring(0, 1000) || null,
        userAgent: ua.substring(0, 500) || null,
        country: country || (forwarded ? "Unknown" : "Local"),
        city: city || null,
        device: parseDevice(ua),
        browser: parseBrowser(ua),
        sessionId: sessionId || null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // Fail silently — don't break the site
  }
}

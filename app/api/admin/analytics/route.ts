import { NextRequest, NextResponse } from "next/server";
import { validateSessionToken, COOKIE_NAME } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (!cookie?.value) return false;
  return validateSessionToken(cookie.value);
}

// Filter for real page views (exclude _event/ paths)
const PAGE_VIEW_FILTER = { NOT: { path: { startsWith: "_event/" } } };
const EVENT_FILTER = { path: { startsWith: "_event/" } };

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get("days") || "30", 10);
  const since = new Date();
  since.setDate(since.getDate() - days);

  try {
    // Total page views (exclude events)
    const totalViews = await prisma.pageView.count({
      where: { createdAt: { gte: since }, ...PAGE_VIEW_FILTER },
    });

    // Unique sessions (page views only)
    const uniqueSessions = await prisma.pageView.groupBy({
      by: ["sessionId"],
      where: { createdAt: { gte: since }, sessionId: { not: null }, ...PAGE_VIEW_FILTER },
    });

    // --- Conversion events ---
    const whatsappClicks = await prisma.pageView.count({
      where: { createdAt: { gte: since }, path: "_event/whatsapp_click" },
    });

    const contactSubmits = await prisma.pageView.count({
      where: { createdAt: { gte: since }, path: "_event/contact_form_submit" },
    });

    // Conversion events by day
    const allEvents = await prisma.pageView.findMany({
      where: { createdAt: { gte: since }, ...EVENT_FILTER },
      select: { createdAt: true, path: true },
      orderBy: { createdAt: "asc" },
    });

    const eventsByDay: Record<string, { whatsapp: number; contact: number }> = {};
    for (let d = 0; d < days; d++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - d));
      eventsByDay[date.toISOString().split("T")[0]] = { whatsapp: 0, contact: 0 };
    }
    for (const ev of allEvents) {
      const day = ev.createdAt.toISOString().split("T")[0];
      if (eventsByDay[day]) {
        if (ev.path === "_event/whatsapp_click") eventsByDay[day].whatsapp++;
        if (ev.path === "_event/contact_form_submit") eventsByDay[day].contact++;
      }
    }

    // --- Page view analytics (exclude events) ---
    const viewsByPage = await prisma.pageView.groupBy({
      by: ["path"],
      where: { createdAt: { gte: since }, ...PAGE_VIEW_FILTER },
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 20,
    });

    const viewsByDevice = await prisma.pageView.groupBy({
      by: ["device"],
      where: { createdAt: { gte: since }, ...PAGE_VIEW_FILTER },
      _count: { device: true },
    });

    const viewsByCountry = await prisma.pageView.groupBy({
      by: ["country"],
      where: { createdAt: { gte: since }, country: { not: null }, ...PAGE_VIEW_FILTER },
      _count: { country: true },
      orderBy: { _count: { country: "desc" } },
      take: 15,
    });

    // Views per day
    const allViews = await prisma.pageView.findMany({
      where: { createdAt: { gte: since }, ...PAGE_VIEW_FILTER },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    const viewsByDay: Record<string, number> = {};
    for (let d = 0; d < days; d++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - d));
      viewsByDay[date.toISOString().split("T")[0]] = 0;
    }
    for (const v of allViews) {
      const day = v.createdAt.toISOString().split("T")[0];
      if (viewsByDay[day] !== undefined) viewsByDay[day]++;
    }

    // Top referrers
    const viewsByReferrer = await prisma.pageView.groupBy({
      by: ["referrer"],
      where: { createdAt: { gte: since }, referrer: { not: null }, ...PAGE_VIEW_FILTER },
      _count: { referrer: true },
      orderBy: { _count: { referrer: "desc" } },
      take: 10,
    });

    // Recent views with pagination, search, and sorting
    const rvPage = Math.max(1, parseInt(searchParams.get("rvPage") || "1", 10));
    const rvLimit = Math.min(100, Math.max(1, parseInt(searchParams.get("rvLimit") || "20", 10)));
    const rvSearch = searchParams.get("rvSearch")?.trim() || "";
    const rvSort = searchParams.get("rvSort") || "createdAt";
    const rvOrder = searchParams.get("rvOrder") === "asc" ? "asc" : "desc";

    const rvAllowedSorts = ["path", "device", "country", "city", "referrer", "createdAt"];
    const sortField = rvAllowedSorts.includes(rvSort) ? rvSort : "createdAt";

    const rvWhere: Record<string, unknown> = { ...PAGE_VIEW_FILTER };
    if (rvSearch) {
      rvWhere.OR = [
        { path: { contains: rvSearch, mode: "insensitive" } },
        { device: { contains: rvSearch, mode: "insensitive" } },
        { country: { contains: rvSearch, mode: "insensitive" } },
        { city: { contains: rvSearch, mode: "insensitive" } },
        { referrer: { contains: rvSearch, mode: "insensitive" } },
      ];
    }

    const [recentViews, recentViewsTotal] = await Promise.all([
      prisma.pageView.findMany({
        where: rvWhere,
        orderBy: { [sortField]: rvOrder },
        skip: (rvPage - 1) * rvLimit,
        take: rvLimit,
        select: {
          path: true,
          device: true,
          browser: true,
          country: true,
          city: true,
          referrer: true,
          createdAt: true,
        },
      }),
      prisma.pageView.count({ where: rvWhere }),
    ]);

    // Service page views specifically
    const serviceViews = viewsByPage
      .filter((v) => v.path.startsWith("/services") || v.path.startsWith("/residential") || v.path.startsWith("/hospitality") || v.path.startsWith("/commercial") || v.path.startsWith("/custom"))
      .map((v) => ({ page: v.path, views: v._count.path }));

    // Aggregate by service category for pie chart
    const categoryMap: Record<string, number> = {
      Residential: 0,
      "Hotels & Hospitality": 0,
      Commercial: 0,
      "Custom Interiors": 0,
    };
    for (const v of serviceViews) {
      if (v.page.startsWith("/residential")) categoryMap["Residential"] += v.views;
      else if (v.page.startsWith("/hospitality")) categoryMap["Hotels & Hospitality"] += v.views;
      else if (v.page.startsWith("/commercial")) categoryMap["Commercial"] += v.views;
      else if (v.page.startsWith("/custom")) categoryMap["Custom Interiors"] += v.views;
    }
    const serviceCategoryViews = Object.entries(categoryMap)
      .map(([category, views]) => ({ category, views }))
      .filter((c) => c.views > 0)
      .sort((a, b) => b.views - a.views);

    return NextResponse.json({
      totalViews,
      uniqueVisitors: uniqueSessions.length,
      // Conversions
      conversions: {
        whatsappClicks,
        contactSubmits,
        totalConversions: whatsappClicks + contactSubmits,
        conversionRate: totalViews > 0 ? ((whatsappClicks + contactSubmits) / totalViews * 100).toFixed(1) : "0.0",
        byDay: Object.entries(eventsByDay).map(([date, counts]) => ({
          date,
          whatsapp: counts.whatsapp,
          contact: counts.contact,
        })),
      },
      // Traffic
      viewsByPage: viewsByPage.map((v) => ({ page: v.path, views: v._count.path })),
      serviceViews,
      viewsByDevice: viewsByDevice.map((v) => ({ device: v.device, views: v._count.device })),
      viewsByCountry: viewsByCountry.map((v) => ({ country: v.country, views: v._count.country })),
      viewsByDay: Object.entries(viewsByDay).map(([date, views]) => ({ date, views })),
      topReferrers: viewsByReferrer
        .filter((v) => v.referrer)
        .map((v) => ({ referrer: v.referrer, views: v._count.referrer })),
      recentViews,
      recentViewsTotal,
      serviceCategoryViews,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Analytics failed: ${error instanceof Error ? error.message : "Unknown"}` },
      { status: 500 }
    );
  }
}

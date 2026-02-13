"use client";

/**
 * Lightweight event tracker for conversion metrics.
 * Stores events as page views with `_event/` prefix so
 * the analytics API can separate them from regular page views.
 */
export function trackEvent(event: string, meta?: Record<string, string>) {
  const sid = typeof window !== "undefined" ? sessionStorage.getItem("_mvs_sid") : "";
  fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      path: `_event/${event}`,
      referrer: meta?.source || null,
      sessionId: sid || undefined,
    }),
  }).catch(() => {});
}

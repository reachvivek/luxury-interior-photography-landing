import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";

export type ContentSection =
  | "hero"
  | "gallery"
  | "testimonials"
  | "stats"
  | "services"
  | "features"
  | "process"
  | "journal"
  | "portfolio"
  | "settings"
  | "about"
  | "contact"
  | "faq"
  | "services-page"
  | "cloudinary"
  | "service-videos";

const VALID_SECTIONS: ContentSection[] = [
  "hero",
  "gallery",
  "testimonials",
  "stats",
  "services",
  "features",
  "process",
  "journal",
  "portfolio",
  "settings",
  "about",
  "contact",
  "faq",
  "services-page",
  "cloudinary",
  "service-videos",
];

export function isValidSection(section: string): section is ContentSection {
  return VALID_SECTIONS.includes(section as ContentSection);
}

export async function readContent<T = unknown>(section: ContentSection): Promise<T> {
  const record = await prisma.contentSection.findUnique({
    where: { section },
  });

  if (!record) {
    throw new Error(`Content not found: ${section}`);
  }

  return record.data as T;
}

export async function writeContent(section: ContentSection, data: unknown): Promise<void> {
  await prisma.contentSection.upsert({
    where: { section },
    update: { data: data as object },
    create: { section, data: data as object },
  });
}

/**
 * Cached read of a ContentSection. Used by public pages so that the
 * MongoDB roundtrip happens at most once every 5 minutes regardless of
 * traffic. Pages stay `force-dynamic` (HTML re-rendered per request),
 * but the DB call is cached — so a cold Atlas cluster only impacts the
 * one visitor whose request triggers the next revalidation, and admin
 * saves call `revalidateTag("content")` to bust the cache instantly.
 *
 * Wrapped in try/catch so DB failures return null instead of crashing
 * the page (callers already fall back to hardcoded defaults).
 */
export const getCachedSection = unstable_cache(
  async (section: ContentSection): Promise<unknown | null> => {
    try {
      const record = await prisma.contentSection.findUnique({ where: { section } });
      return record?.data ?? null;
    } catch {
      return null;
    }
  },
  ["content-section"],
  { revalidate: 300, tags: ["content"] },
);

export async function listSections(): Promise<{ section: ContentSection; exists: boolean }[]> {
  const existing = await prisma.contentSection.findMany({
    select: { section: true },
  });

  const existingSet = new Set(existing.map((r) => r.section));

  return VALID_SECTIONS.map((section) => ({
    section,
    exists: existingSet.has(section),
  }));
}

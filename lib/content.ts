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
  | "cloudinary";

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

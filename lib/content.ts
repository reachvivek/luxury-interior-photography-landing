import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type ContentSection =
  | "hero"
  | "gallery"
  | "testimonials"
  | "stats"
  | "services"
  | "features"
  | "process"
  | "journal"
  | "portfolio";

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
];

export function isValidSection(section: string): section is ContentSection {
  return VALID_SECTIONS.includes(section as ContentSection);
}

export function readContent<T = unknown>(section: ContentSection): T {
  const filePath = path.join(CONTENT_DIR, `${section}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Content file not found: ${section}.json`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function writeContent(section: ContentSection, data: unknown): void {
  const filePath = path.join(CONTENT_DIR, `${section}.json`);

  // Ensure content directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function listSections(): { section: ContentSection; exists: boolean }[] {
  return VALID_SECTIONS.map((section) => ({
    section,
    exists: fs.existsSync(path.join(CONTENT_DIR, `${section}.json`)),
  }));
}

import "dotenv/config";
import { readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CONTENT_DIR = join(process.cwd(), "content");
const SKIP = new Set(["image-manifest.json"]);

async function main() {
  const files = readdirSync(CONTENT_DIR).filter(
    (f) => f.endsWith(".json") && !SKIP.has(f)
  );

  console.log(`Found ${files.length} content files to seed:\n`);

  for (const file of files) {
    const section = basename(file, ".json");
    const raw = readFileSync(join(CONTENT_DIR, file), "utf-8");
    const data = JSON.parse(raw);

    const result = await prisma.contentSection.upsert({
      where: { section },
      update: { data },
      create: { section, data },
    });

    console.log(`  ✓ ${section} → ${result.id}`);
  }

  // Seed admin credentials (only if not already present)
  const existing = await prisma.contentSection.findUnique({
    where: { section: "admin-auth" },
  });
  if (!existing) {
    await prisma.contentSection.create({
      data: { section: "admin-auth", data: { password: "nashray2024" } },
    });
    console.log(`  ✓ admin-auth (created with default password)`);
  } else {
    console.log(`  ✓ admin-auth (already exists, skipped)`);
  }

  console.log(`\nDone! Seeded ${files.length} content sections + admin auth into MongoDB.`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

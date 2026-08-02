import "dotenv/config";
import { readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CONTENT_DIR = join(process.cwd(), "content");

// Skip image-manifest — it's a build artifact, not editable content
const SKIP = ["image-manifest.json"];

async function main() {
  const files = readdirSync(CONTENT_DIR).filter(
    (f) => f.endsWith(".json") && !SKIP.includes(f)
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

  console.log(`\nDone! Seeded ${files.length} sections into MongoDB.`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

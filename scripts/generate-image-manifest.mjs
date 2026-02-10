/**
 * Pre-build script: scans public/images/ and generates a manifest JSON
 * so the admin API can list images without fs.readdir at runtime.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const IMAGES_DIR = path.join(ROOT, "public", "images");
const OUTPUT = path.join(ROOT, "content", "image-manifest.json");

const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function scan(dir, baseDir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...scan(full, baseDir));
    } else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      results.push("/" + path.relative(baseDir, full).replace(/\\/g, "/"));
    }
  }
  return results;
}

const images = scan(IMAGES_DIR, path.join(ROOT, "public"));

// Group by top-level folder inside /images/
const grouped = {};
for (const img of images) {
  const parts = img.split("/"); // ["", "images", "residential", ...]
  const category = parts[2] || "other";
  if (!grouped[category]) grouped[category] = [];
  grouped[category].push(img);
}

// Ensure content directory exists
const contentDir = path.dirname(OUTPUT);
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

fs.writeFileSync(
  OUTPUT,
  JSON.stringify({ images, grouped, total: images.length }, null, 2)
);

console.log(`Image manifest generated: ${images.length} images in ${Object.keys(grouped).length} categories`);

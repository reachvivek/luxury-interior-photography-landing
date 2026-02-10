import { NextRequest, NextResponse } from "next/server";
import { validateSessionToken, COOKIE_NAME } from "@/lib/admin-auth";
import fs from "fs";
import path from "path";

function isAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (!cookie?.value) return false;
  return validateSessionToken(cookie.value);
}

function getImagesRecursive(dir: string, baseDir: string): string[] {
  const images: string[] = [];
  const extensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

  if (!fs.existsSync(dir)) return images;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      images.push(...getImagesRecursive(fullPath, baseDir));
    } else if (extensions.includes(path.extname(entry.name).toLowerCase())) {
      // Convert to public URL path
      const relativePath = "/" + path.relative(baseDir, fullPath).replace(/\\/g, "/");
      images.push(relativePath);
    }
  }

  return images;
}

// GET /api/admin/images — List all images in /public/images
export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const publicDir = path.join(process.cwd(), "public");
  const imagesDir = path.join(publicDir, "images");
  const images = getImagesRecursive(imagesDir, publicDir);

  // Group by top-level folder
  const grouped: Record<string, string[]> = {};
  for (const img of images) {
    const parts = img.split("/"); // e.g. ["", "images", "residential", "villas", "file.jpg"]
    const category = parts[2] || "other";
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(img);
  }

  return NextResponse.json({ images, grouped, total: images.length });
}

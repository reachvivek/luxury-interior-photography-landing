import { NextRequest, NextResponse } from "next/server";
import { validateSessionToken, COOKIE_NAME } from "@/lib/admin-auth";
import fs from "fs";
import path from "path";

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (!cookie?.value) return false;
  return validateSessionToken(cookie.value);
}

// POST /api/admin/upload — Upload image to public/images/{folder}
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "hero";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WebP, and AVIF images are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be under 10MB" },
        { status: 400 }
      );
    }

    // Sanitize folder name — only allow alphanumeric, hyphens, slashes
    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9\-\/]/g, "");

    // Sanitize filename — lowercase, replace spaces with hyphens
    const ext = path.extname(file.name).toLowerCase();
    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9\-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    const fileName = `${baseName}${ext}`;

    // Ensure target directory exists
    const targetDir = path.join(process.cwd(), "public", "images", sanitizedFolder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Check for name collision — append timestamp if exists
    let finalName = fileName;
    const targetPath = path.join(targetDir, finalName);
    if (fs.existsSync(targetPath)) {
      finalName = `${baseName}-${Date.now()}${ext}`;
    }

    // Write file
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(targetDir, finalName), buffer);

    const publicPath = `/images/${sanitizedFolder}/${finalName}`;

    return NextResponse.json({ success: true, path: publicPath, name: finalName });
  } catch (error) {
    return NextResponse.json(
      { error: `Upload failed: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    );
  }
}

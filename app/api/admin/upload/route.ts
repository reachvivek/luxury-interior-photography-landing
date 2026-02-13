import { NextRequest, NextResponse } from "next/server";
import { validateSessionToken, COOKIE_NAME } from "@/lib/admin-auth";
import cloudinary, { CLOUDINARY_FOLDER } from "@/lib/cloudinary";

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (!cookie?.value) return false;
  return validateSessionToken(cookie.value);
}

// POST /api/admin/upload — Upload image to Cloudinary
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

    // Sanitize folder name
    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9\-\/]/g, "");

    // Convert file to base64 data URI for Cloudinary upload
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      folder: `${CLOUDINARY_FOLDER}/${sanitizedFolder}`,
      resource_type: "image",
    });

    return NextResponse.json({
      success: true,
      path: result.secure_url,
      name: result.public_id.split("/").pop() || result.public_id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Upload failed: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    );
  }
}

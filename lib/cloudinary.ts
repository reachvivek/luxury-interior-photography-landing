import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";

export const CLOUDINARY_FOLDER = "myvisualspace";

interface CloudinaryCreds {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

let cached: { creds: CloudinaryCreds; ts: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getCloudinaryCreds(): Promise<CloudinaryCreds> {
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.creds;

  try {
    const row = await prisma.contentSection.findUnique({
      where: { section: "cloudinary" },
    });

    if (row?.data && typeof row.data === "object") {
      const d = row.data as Record<string, string>;
      if (d.cloudName && d.apiKey && d.apiSecret) {
        const creds = { cloudName: d.cloudName, apiKey: d.apiKey, apiSecret: d.apiSecret };
        cached = { creds, ts: Date.now() };
        return creds;
      }
    }
  } catch {
    // DB unavailable — fall through to env vars
  }

  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  };
}

/** Returns a configured cloudinary instance with creds from MongoDB (cached 5min) */
export async function getConfiguredCloudinary() {
  const creds = await getCloudinaryCreds();
  cloudinary.config({
    cloud_name: creds.cloudName,
    api_key: creds.apiKey,
    api_secret: creds.apiSecret,
  });
  return cloudinary;
}

export default cloudinary;

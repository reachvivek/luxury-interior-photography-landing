import { prisma } from "./prisma";

export interface ServiceVideo {
  id: string;
  youtubeUrl: string;
  title?: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getServiceVideos(pageKey: string): Promise<ServiceVideo[]> {
  try {
    const record = await prisma.contentSection.findUnique({
      where: { section: "service-videos" },
    });
    const data = record?.data as any;
    return data?.[pageKey] ?? [];
  } catch {
    return [];
  }
}

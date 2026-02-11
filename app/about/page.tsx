import AboutPage from "@/components/AboutPage";
import { prisma } from "@/lib/prisma";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getAboutData() {
  try {
    const record = await prisma.contentSection.findUnique({ where: { section: "about" } });
    return (record?.data as any) ?? null;
  } catch {
    return null;
  }
}

export const dynamic = "force-dynamic";

export default async function Page() {
  const aboutData = await getAboutData();
  return <AboutPage aboutData={aboutData} />;
}

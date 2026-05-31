import AboutPage from "@/components/AboutPage";
import { getCachedSection } from "@/lib/content";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getAboutData() {
  const data = await getCachedSection("about");
  return (data as any) ?? null;
}

export const dynamic = "force-dynamic";

export default async function Page() {
  const aboutData = await getAboutData();
  return <AboutPage aboutData={aboutData} />;
}

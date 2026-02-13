import HomePage from "@/components/HomePage";
import { prisma } from "@/lib/prisma";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getContent(section: string) {
  try {
    const record = await prisma.contentSection.findUnique({
      where: { section },
    });
    return record?.data ?? null;
  } catch {
    return null;
  }
}

export const dynamic = "force-dynamic";

export default async function Page() {
  const [hero, gallery, features, process, journal, stats, testimonials, servicesPage] = await Promise.all([
    getContent("hero"),
    getContent("gallery"),
    getContent("features"),
    getContent("process"),
    getContent("journal"),
    getContent("stats"),
    getContent("testimonials"),
    getContent("services-page"),
  ]);

  return (
    <HomePage
      heroSlides={hero as any}
      galleryData={gallery as any}
      featuresData={features as any}
      processData={process as any}
      journalData={journal as any}
      statsData={stats as any}
      testimonialsData={testimonials as any}
      servicesPageData={servicesPage as any}
    />
  );
}

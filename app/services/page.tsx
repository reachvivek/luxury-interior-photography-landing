import ServicesPage from "@/components/ServicesPage";
import { prisma } from "@/lib/prisma";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getServicesPageData() {
  try {
    const record = await prisma.contentSection.findUnique({ where: { section: "services-page" } });
    return (record?.data as any) ?? null;
  } catch {
    return null;
  }
}

export const dynamic = "force-dynamic";

export default async function Page() {
  const servicesData = await getServicesPageData();
  return <ServicesPage servicesData={servicesData} />;
}

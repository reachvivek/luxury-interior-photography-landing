import ServicesPage from "@/components/ServicesPage";
import { getCachedSection } from "@/lib/content";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getServicesPageData() {
  const data = await getCachedSection("services-page");
  return (data as any) ?? null;
}

export const dynamic = "force-dynamic";

export default async function Page() {
  const servicesData = await getServicesPageData();
  return <ServicesPage servicesData={servicesData} />;
}

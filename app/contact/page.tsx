import ContactPage from "@/components/ContactPage";
import { getCachedSection } from "@/lib/content";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getContactData() {
  const data = await getCachedSection("contact");
  return (data as any) ?? null;
}

export const dynamic = "force-dynamic";

export default async function Page() {
  const contactData = await getContactData();
  return <ContactPage contactData={contactData} />;
}

import ContactPage from "@/components/ContactPage";
import { prisma } from "@/lib/prisma";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getContactData() {
  try {
    const record = await prisma.contentSection.findUnique({ where: { section: "contact" } });
    return (record?.data as any) ?? null;
  } catch {
    return null;
  }
}

export const dynamic = "force-dynamic";

export default async function Page() {
  const contactData = await getContactData();
  return <ContactPage contactData={contactData} />;
}

import FAQPage from "@/components/FAQPage";
import { prisma } from "@/lib/prisma";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getFAQData() {
  try {
    const record = await prisma.contentSection.findUnique({ where: { section: "faq" } });
    return (record?.data as any) ?? null;
  } catch {
    return null;
  }
}

export const dynamic = "force-dynamic";

export default async function Page() {
  const faqData = await getFAQData();
  return <FAQPage faqData={faqData} />;
}

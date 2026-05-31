import FAQPage from "@/components/FAQPage";
import { getCachedSection } from "@/lib/content";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getFAQData() {
  const data = await getCachedSection("faq");
  return (data as any) ?? null;
}

export const dynamic = "force-dynamic";

export default async function Page() {
  const faqData = await getFAQData();
  return <FAQPage faqData={faqData} />;
}

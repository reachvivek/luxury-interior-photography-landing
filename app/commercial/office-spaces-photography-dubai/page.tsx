import SubcategoryPage from "@/components/services/SubcategoryPage";
import { prisma } from "@/lib/prisma";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getSubcategoryData() {
  try {
    const record = await prisma.contentSection.findUnique({ where: { section: "portfolio" } });
    return (record?.data as any)?.commercial?.subcategories?.["office-spaces"] ?? null;
  } catch {
    return null;
  }
}

const FALLBACK = {
  mainCategory: "Commercial & Industry",
  subcategoryTitle: "Office Spaces Photography",
  description:
    "Professional office photography showcasing modern workspaces, executive offices, and collaborative environments designed for productivity and innovation.",
  heroImage: "/images/commercial/office-spaces/modern-commercial-building-night.jpg",
  approachTitle: "Corporate Excellence in Every Frame",
  approachDescription:
    "MyVisual.Space's office photography goes beyond standard documentation to capture the innovative spirit and professional culture that defines modern workplaces. We specialize in telling your company's story through imagery that showcases not just the physical space, but the collaboration, innovation, and prestige it represents. From sleek executive suites to dynamic open-plan environments, our photography attracts top talent and impresses clients by visually communicating your organization's values and commitment to employee experience.",
  processTitle: "Showcasing Your Professional Environment",
  processSteps: [
    "Comprehensive walkthrough to identify key spaces, brand elements, and architectural highlights",
    "Strategic scheduling around business hours to capture both active workplace energy and pristine empty spaces",
    "Architectural photography techniques for lobbies, conference rooms, and executive areas emphasizing scale and prestige",
    "Lifestyle shots incorporating employees to demonstrate culture and collaborative energy (when requested)",
    "Post-production enhancement maintaining professional authenticity while optimizing visual impact for marketing materials",
  ],
  impactTitle: "Attracting Talent and Clients",
  impactDescription:
    "Professional office photography delivers measurable ROI through multiple channels. Companies using MyVisual.Space's office imagery in recruitment materials report 45% higher application rates from qualified candidates. Commercial real estate listings featuring our photography lease 30% faster and command rental premiums, while corporate websites with professional workspace imagery see significantly improved client conversion rates and longer visitor engagement.",
  galleryImages: [
    {
      src: "/images/commercial/office-spaces/modern-commercial-building-night.jpg",
      alt: "Modern commercial building at night",
    },
    {
      src: "/images/commercial/coworking-spaces/modern-workspace-lounge-seating.jpg",
      alt: "Modern workspace lounge seating",
    },
    {
      src: "/images/commercial/coworking-spaces/cofiesto-cafe-wide-interior.jpg",
      alt: "Open plan office workspace",
    },
    {
      src: "/images/residential/home-offices/contemporary-office-space.jpg",
      alt: "Contemporary executive office",
    },
    {
      src: "/images/residential/home-offices/modern-workspace-window-seating.jpg",
      alt: "Office with window seating",
    },
    {
      src: "/images/commercial/coworking-spaces/cofiesto-cafe-interior-counter.jpg",
      alt: "Office reception and lounge area",
    },
  ],
};

export const dynamic = "force-dynamic";

export default async function OfficeSpacesPage() {
  const data = await getSubcategoryData();
  const d = data ?? FALLBACK;

  return (
    <SubcategoryPage
      mainCategory={d.mainCategory}
      subcategoryTitle={d.subcategoryTitle}
      description={d.description}
      heroImage={d.heroImage}
      approachTitle={d.approachTitle}
      approachDescription={d.approachDescription}
      processTitle={d.processTitle}
      processSteps={d.processSteps}
      impactTitle={d.impactTitle}
      impactDescription={d.impactDescription}
      galleryImages={d.galleryImages}
    />
  );
}

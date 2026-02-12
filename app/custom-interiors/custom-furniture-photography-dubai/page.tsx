import SubcategoryPage from "@/components/services/SubcategoryPage";
import { prisma } from "@/lib/prisma";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getSubcategoryData() {
  try {
    const record = await prisma.contentSection.findUnique({ where: { section: "portfolio" } });
    return (record?.data as any)?.["custom-interiors"]?.subcategories?.["custom-furniture"] ?? null;
  } catch {
    return null;
  }
}

const FALLBACK = {
  mainCategory: "Custom Interiors",
  subcategoryTitle: "Custom Furniture Photography",
  description: "Exquisite photography of bespoke furniture pieces, showcasing craftsmanship, materials, and unique design in custom-made furnishings.",
  heroImage: "/images/custom-interiors/custom-furniture/bespoke-bedroom-furniture.jpg",
  approachTitle: "Artistry in Every Detail",
  approachDescription: "MyVisual.Space captures custom furniture as fine art - celebrating the vision of designers and the mastery of artisans who create one-of-a-kind pieces. Our photography reveals the story behind each piece: the grain of exotic woods, the precision of joinery, the luxurious feel of upholstery, and the functional beauty of bespoke design. We understand that custom furniture represents significant investment and artistic expression, deserving imagery that commands attention and conveys true value.",
  processTitle: "Showcasing Bespoke Excellence",
  processSteps: [
    "Detailed consultation to understand design intent, unique features, and the narrative behind each custom piece",
    "Studio-quality lighting setup emphasizing material textures, finish quality, and three-dimensional form",
    "Multiple angles capturing both overall aesthetic and construction details - joinery, hardware, fabric work, and finishes",
    "In-situ photography showing pieces in their intended environment, demonstrating scale and contextual harmony",
    "Refined post-production highlighting material richness and craftsmanship without losing authentic character",
  ],
  impactTitle: "Elevating Craftsmanship to Investment",
  impactDescription: "Our custom furniture photography transforms artisan work into sought-after collectibles. Furniture makers and interior designers using MyVisual.Space's imagery report 45-60% increases in high-value commissions, as clients immediately recognize the quality difference. These images become enduring portfolio pieces that justify premium pricing, attract design publication features, and establish makers as leaders in bespoke luxury furniture creation.",
  galleryImages: [
    {
      src: "/images/custom-interiors/custom-furniture/bespoke-bedroom-furniture.jpg",
      alt: "Bespoke bedroom furniture",
    },
    {
      src: "/images/custom-interiors/custom-furniture/luxury-bathroom-vanity.jpg",
      alt: "Luxury bathroom vanity",
    },
    {
      src: "/images/custom-interiors/custom-furniture/custom-salon-divider.jpg",
      alt: "Custom salon divider",
    },
    {
      src: "/images/custom/custom-furniture/art-gallery-custom-seating.jpg",
      alt: "Art gallery custom seating",
    },
    {
      src: "/images/custom/custom-furniture/horse-sculpture-restaurant-detail.jpg",
      alt: "Custom restaurant sculpture detail",
    },
    {
      src: "/images/hospitality/hotel-suites/hotel-lobby-colorful-sofas.jpg",
      alt: "Custom hotel lobby furniture",
    },
  ],
};

export const dynamic = "force-dynamic";

export default async function CustomFurniturePage() {
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

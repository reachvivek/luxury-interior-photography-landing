import SubcategoryPage from "@/components/services/SubcategoryPage";
import { prisma } from "@/lib/prisma";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getSubcategoryData() {
  try {
    const record = await prisma.contentSection.findUnique({ where: { section: "portfolio" } });
    return (record?.data as any)?.commercial?.subcategories?.showrooms ?? null;
  } catch {
    return null;
  }
}

const FALLBACK = {
  mainCategory: "Commercial & Industry",
  subcategoryTitle: "Showrooms Photography",
  description:
    "Professional showroom photography showcasing product displays, automotive showrooms, furniture galleries, and design exhibitions in their best light.",
  heroImage: "/images/residential/villas/luxury-villa-with-porsche.jpg",
  approachTitle: "Prestige Products Presented Flawlessly",
  approachDescription:
    "Nashray's showroom photography elevates product presentation to an art form, whether showcasing luxury automobiles, designer furniture, or architectural materials. We understand that showrooms are theater - every display is carefully curated to inspire desire and communicate quality. Our photography captures the aspirational essence of your products while highlighting the immersive brand experience your showroom provides. From dramatic automotive reveals to elegant furniture vignettes, we create imagery that drives qualified buyers through your doors.",
  processTitle: "Perfecting Product Presentation",
  processSteps: [
    "Detailed planning session to understand featured products, brand positioning, and target clientele",
    "Precision lighting setup that enhances product finishes, textures, and premium details without distortion",
    "Strategic composition emphasizing both individual product excellence and cohesive display design",
    "Multiple perspectives capturing showroom flow, featured installations, and intimate product details",
    "Meticulous post-production ensuring accurate color representation and luxurious visual appeal",
  ],
  impactTitle: "Converting Browsers to Buyers",
  impactDescription:
    "Professional showroom photography accelerates the sales cycle by pre-qualifying prospects and building desire before the first visit. Automotive showrooms using Nashray's imagery report 60% more qualified appointments, while furniture and design showrooms see 45% longer customer dwell time and significantly higher conversion rates. Our photography becomes a powerful sales tool across digital marketing, print catalogs, and social media, establishing your showroom as the premier destination for discerning buyers.",
  galleryImages: [
    {
      src: "/images/residential/villas/luxury-villa-with-porsche.jpg",
      alt: "Luxury automotive showroom",
    },
    {
      src: "/images/hospitality/hotel-suites/luxury-resort-lobby-entrance.jpg",
      alt: "Modern showroom entrance",
    },
    {
      src: "/images/hospitality/hotel-suites/hotel-lobby-colorful-sofas.jpg",
      alt: "Furniture showroom display",
    },
    {
      src: "/images/custom/custom-furniture/art-gallery-custom-seating.jpg",
      alt: "Design gallery with custom seating",
    },
    {
      src: "/images/commercial/retail-stores/retail-store-product-shelving.jpg",
      alt: "Product display showroom",
    },
    {
      src: "/images/custom/design-details/luxury-chandelier-interior.jpg",
      alt: "Lighting design showroom",
    },
  ],
};

export const dynamic = "force-dynamic";

export default async function ShowroomsPage() {
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

import SubcategoryPage from "@/components/services/SubcategoryPage";
import { prisma } from "@/lib/prisma";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getSubcategoryData() {
  try {
    const record = await prisma.contentSection.findUnique({ where: { section: "portfolio" } });
    return (record?.data as any)?.["custom-interiors"]?.subcategories?.materials ?? null;
  } catch {
    return null;
  }
}

const FALLBACK = {
  mainCategory: "Custom Interiors",
  subcategoryTitle: "Material Close-ups Photography",
  description: "Detailed macro photography highlighting textures, finishes, and material quality in interior design, from luxurious fabrics to natural stone and exotic woods.",
  heroImage: "/images/custom-interiors/materials/marble-gold-bathroom.jpg",
  approachTitle: "The Language of Luxury Materials",
  approachDescription: "Nashray's material photography speaks to the tactile and visual qualities that define luxury - the depth of hand-finished plaster, the veining in rare marble, the luster of silk upholstery, the warmth of exotic hardwoods. Our macro and detail work captures what makes premium materials worth their investment, creating images that communicate quality to discerning clients who appreciate the difference between standard and exceptional. This level of detail photography is essential for material suppliers, designers, and luxury brands.",
  processTitle: "Revealing Material Excellence",
  processSteps: [
    "Specialized macro photography equipment capturing minute details, textures, and finish quality at high resolution",
    "Controlled lighting techniques revealing three-dimensional texture, color depth, and material characteristics",
    "Multiple exposures showcasing materials in different lighting conditions - natural, ambient, and dramatic",
    "Focus stacking for maximum sharpness and detail throughout the frame, from surface texture to depth elements",
    "Color-accurate post-production maintaining material authenticity while emphasizing luxury appeal and tactile qualities",
  ],
  impactTitle: "Selling the Substance of Luxury",
  impactDescription: "Our material photography transforms specification sheets into compelling visual stories that close sales. Material suppliers and luxury brands using Nashray's imagery report that clients make confident purchasing decisions faster, reducing sales cycles by 25-35%. These images become essential marketing assets - demonstrating quality differences that justify premium pricing and helping clients visualize how materials will elevate their projects to exceptional status.",
  galleryImages: [
    {
      src: "/images/custom-interiors/materials/marble-gold-bathroom.jpg",
      alt: "Marble and gold bathroom materials",
    },
    {
      src: "/images/custom-interiors/materials/luxury-wall-finish.jpg",
      alt: "Luxury wall finish texture",
    },
    {
      src: "/images/custom-interiors/materials/ornate-upholstery-fabric.jpg",
      alt: "Ornate upholstery fabric",
    },
    {
      src: "/images/custom-interiors/materials/white-brick-wall-texture.jpg",
      alt: "White brick wall texture",
    },
    {
      src: "/images/custom-interiors/materials/luxury-drapery-detail.jpg",
      alt: "Luxury drapery material detail",
    },
    {
      src: "/images/custom/material-closeups/material-texture-detail.jpg",
      alt: "Material texture close-up detail",
    },
  ],
};

export const dynamic = "force-dynamic";

export default async function MaterialsPage() {
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

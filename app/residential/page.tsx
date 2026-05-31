import CategoryPageLayout from "@/components/layouts/CategoryPageLayout";
import { getCachedSection } from "@/lib/content";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getPortfolioCategory() {
  const data = await getCachedSection("portfolio");
  return (data as any)?.residential ?? null;
}

// Hardcoded fallback
const FALLBACK = {
  mainCategory: "Residential Photography",
  basePath: "/residential",
  galleryImages: [
    { src: "/images/residential/penthouses/modern-penthouse-living-room.jpg", category: "Apartments & Penthouses" },
    { src: "/images/residential/villas/luxury-villa-grand-entrance.jpg", category: "Villas" },
    { src: "/images/residential/penthouses/penthouse-bedroom-cityview.jpg", category: "Apartments & Penthouses" },
    { src: "/images/residential/villas/luxury-villa-staircase.jpg", category: "Villas" },
    { src: "/images/residential/villas/luxury-villa-patio-view.jpg", category: "Vacation Rentals" },
    { src: "/images/residential/apartments/modern-apartment-building-exterior.jpg", category: "Apartments & Penthouses" },
    { src: "/images/residential/penthouses/penthouse-bathroom-skyline.jpg", category: "Apartments & Penthouses" },
    { src: "/images/residential/villas/luxury-villa-master-bedroom.jpg", category: "Vacation Rentals" },
  ],
  portfolioCategories: [
    { id: "villas", title: "Luxury Villas", description: "Spacious estates and contemporary villas showcasing refined living", images: ["/images/residential/villas/luxury-villa-grand-entrance.jpg", "/images/residential/villas/luxury-villa-staircase.jpg", "/images/residential/villas/luxury-villa-patio-view.jpg", "/images/residential/villas/luxury-villa-master-bedroom.jpg", "/images/residential/villas/luxury-stone-villa-exterior.jpg"] },
    { id: "apartments-penthouses", title: "Apartments & Penthouses", description: "Contemporary urban living from modern apartments to luxury penthouses with panoramic city views", images: ["/images/residential/apartments/modern-apartment-building-exterior.jpg", "/images/residential/penthouses/modern-penthouse-living-room.jpg", "/images/residential/penthouses/penthouse-bedroom-cityview.jpg", "/images/residential/penthouses/penthouse-bathroom-skyline.jpg", "/images/residential/penthouses/penthouse-interior-1.jpg"] },
    { id: "vacation-rentals", title: "Vacation Rentals", description: "Airbnb and short-term rental properties with lifestyle-focused photography that drives bookings", images: ["/images/residential/villas/luxury-villa-patio-view.jpg", "/images/residential/villas/luxury-villa-master-bedroom.jpg", "/images/residential/penthouses/modern-penthouse-living-room.jpg", "/images/residential/villas/luxury-villa-grand-entrance.jpg"] },
  ],
  categoryFilters: [
    { id: "all", label: "All" },
    { id: "villas", label: "Villas", href: "/residential/luxury-villas-photography-dubai" },
    { id: "apartments-penthouses", label: "Apartments & Penthouses", href: "/residential/apartments-penthouses-photography-dubai" },
    { id: "vacation-rentals", label: "Vacation Rentals", href: "/residential/vacation-rentals-photography-dubai" },
  ],
  ctaImage: "/images/residential/villas/luxury-villa-patio-view.jpg",
  ctaTitle: "Ready to showcase your property?",
  ctaDescription: "Let's create stunning visuals that capture the unique character and luxury of your residential space.",
};

export const dynamic = "force-dynamic";

export default async function ResidentialPage() {
  const data = await getPortfolioCategory();
  const d = data ?? FALLBACK;

  return (
    <CategoryPageLayout
      mainCategory={d.mainCategory}
      galleryImages={d.galleryImages}
      portfolioCategories={d.portfolioCategories}
      categoryFilters={d.categoryFilters}
      ctaImage={d.ctaImage}
      ctaTitle={d.ctaTitle}
      ctaDescription={d.ctaDescription}
      basePath={d.basePath}
    />
  );
}

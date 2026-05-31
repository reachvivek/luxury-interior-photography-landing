import CategoryPageLayout from "@/components/layouts/CategoryPageLayout";
import { getCachedSection } from "@/lib/content";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getPortfolioCategory() {
  const data = await getCachedSection("portfolio");
  return (data as any)?.hospitality ?? null;
}

// Hardcoded fallback
const FALLBACK = {
  mainCategory: "Hospitality Photography",
  basePath: "/hospitality",
  galleryImages: [
    { src: "/images/hospitality/restaurants/art-gallery-dining-room.jpg", category: "Restaurants" },
    { src: "/images/hospitality/hotel-suites/modern-resort-exterior-sunset.jpg", category: "Resorts" },
    { src: "/images/hospitality/hotel-suites/beachfront-resort-architecture.jpg", category: "Resorts" },
    { src: "/images/hospitality/restaurants/modern-cafe-interior-1.jpg", category: "Restaurants" },
    { src: "/images/hospitality/restaurants/contemporary-cafe-lounge.jpg", category: "Restaurants" },
    { src: "/images/hospitality/restaurants/sunset-dining-terrace.jpg", category: "Restaurants" },
    { src: "/images/hospitality/event-spaces/beach-wedding-pavilion.jpg", category: "Event Spaces" },
    { src: "/images/hospitality/hotel-suites/resort-pool-archway-view.jpg", category: "Resorts" },
    { src: "/images/hospitality/event-spaces/pool-terrace-evening.jpg", category: "Event Spaces" },
  ],
  portfolioCategories: [
    { id: "hotel-suites", title: "Hotel Suites & Lobbies", description: "Luxurious accommodations and welcoming spaces that define hospitality", images: ["/images/hospitality/hotel-suites/luxury-resort-lobby-entrance.jpg", "/images/hospitality/hotel-suites/hotel-lobby-colorful-sofas.jpg", "/images/hospitality/hotel-suites/hotel-courtyard-fountain-night.jpg", "/images/hospitality/hotel-suites/luxury-garden-terrace-night.jpg"] },
    { id: "resorts", title: "Resorts & Destinations", description: "Paradise destinations where luxury meets natural beauty", images: ["/images/hospitality/hotel-suites/beachfront-resort-architecture.jpg", "/images/hospitality/hotel-suites/modern-resort-exterior-sunset.jpg", "/images/hospitality/hotel-suites/resort-pool-archway-view.jpg", "/images/hospitality/event-spaces/pool-terrace-evening.jpg"] },
    { id: "restaurants", title: "Restaurants & Dining", description: "Culinary spaces where ambiance meets gastronomy", images: ["/images/hospitality/restaurants/art-gallery-dining-room.jpg", "/images/hospitality/restaurants/sunset-dining-terrace.jpg", "/images/hospitality/restaurants/colorful-restaurant-interior.jpg", "/images/hospitality/restaurants/modern-cafe-interior-1.jpg", "/images/hospitality/restaurants/contemporary-cafe-lounge.jpg", "/images/hospitality/restaurants/minimalist-cafe-design.jpg"] },
    { id: "event-spaces", title: "Event Spaces & Venues", description: "Venues designed for memorable experiences and celebrations", images: ["/images/hospitality/event-spaces/resort-event-pathway.jpg", "/images/hospitality/event-spaces/beach-wedding-pavilion.jpg", "/images/hospitality/event-spaces/lake-resort-panoramic-view-1.jpg"] },
  ],
  categoryFilters: [
    { id: "all", label: "All" },
    { id: "hotel-suites", label: "Hotels", href: "/hospitality/hotel-suites-photography-dubai" },
    { id: "resorts", label: "Resorts", href: "/hospitality/resorts-photography-dubai" },
    { id: "restaurants", label: "Restaurants", href: "/hospitality/restaurants-photography-dubai" },
    { id: "event-spaces", label: "Event Spaces", href: "/hospitality/event-spaces-photography-dubai" },
  ],
  ctaImage: "/images/hospitality/restaurants/art-gallery-dining-room.jpg",
  ctaTitle: "Ready to showcase your venue?",
  ctaDescription: "Let's create captivating imagery that attracts guests and elevates your hospitality brand.",
};

export const dynamic = "force-dynamic";

export default async function HospitalityPage() {
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

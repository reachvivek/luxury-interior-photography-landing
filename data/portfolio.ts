import { PortfolioImage } from "@/types";

export const portfolioImages: PortfolioImage[] = [
  // Residential
  {
    id: "res-001",
    src: "/images/residential/placeholder-1.jpg",
    alt: "Luxury villa living room",
    category: "residential",
    subcategory: "villas",
    title: "Elegant Living Room",
    location: "Dubai",
    featured: true,
  },
  // Hotels
  {
    id: "hotel-001",
    src: "/images/hotels/placeholder-1.jpg",
    alt: "Luxury hotel suite",
    category: "hotels",
    subcategory: "suites",
    title: "Presidential Suite",
    location: "Dubai",
    featured: true,
  },
  // Commercial
  {
    id: "com-001",
    src: "/images/commercial/placeholder-1.jpg",
    alt: "Modern office space",
    category: "commercial",
    subcategory: "offices",
    title: "Executive Office",
    location: "Dubai",
    featured: true,
  },
  // More images will be added as client provides them
];

export const getImagesByCategory = (category: string) => {
  return portfolioImages.filter((img) => img.category === category);
};

export const getFeaturedImages = () => {
  return portfolioImages.filter((img) => img.featured);
};

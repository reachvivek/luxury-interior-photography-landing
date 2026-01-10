"use client";

import ServiceGalleryLayout from "@/components/services/ServiceGalleryLayout";

// Gallery images with categories
const galleryImages = [
  { src: "/images/commercial/coworking-spaces/cofiesto-cafe-wide-interior.jpg", category: "Co-working Spaces" },
  { src: "/images/commercial/retail-stores/beauty-salon-interior-1.jpg", category: "Retail Stores" },
  { src: "/images/commercial/coworking-spaces/cofiesto-cafe-seating-area.jpg", category: "Co-working Spaces" },
  { src: "/images/commercial/retail-stores/beauty-salon-interior-2.jpg", category: "Retail Stores" },
  { src: "/images/commercial/coworking-spaces/modern-workspace-lounge-seating.jpg", category: "Co-working Spaces" },
  { src: "/images/commercial/retail-stores/hair-salon-wide-angle.jpg", category: "Retail Stores" },
  { src: "/images/commercial/retail-stores/salon-workstation-detail.jpg", category: "Retail Stores" },
];

// Portfolio categories
const portfolioCategories = [
  {
    id: "coworking-spaces",
    title: "Co-working Spaces & Cafes",
    description: "Modern workspaces designed for collaboration and productivity",
    images: [
      "/images/commercial/coworking-spaces/cofiesto-cafe-wide-interior.jpg",
      "/images/commercial/coworking-spaces/cofiesto-cafe-seating-area.jpg",
      "/images/commercial/coworking-spaces/cofiesto-cafe-window-seating.jpg",
      "/images/commercial/coworking-spaces/modern-workspace-lounge-seating.jpg",
    ]
  },
  {
    id: "retail-stores",
    title: "Retail Stores & Showrooms",
    description: "Commercial spaces that drive customer engagement and sales",
    images: [
      "/images/commercial/retail-stores/beauty-salon-interior-1.jpg",
      "/images/commercial/retail-stores/nail-salon-workspace.jpg",
      "/images/commercial/retail-stores/beauty-salon-interior-2.jpg",
      "/images/commercial/retail-stores/hair-salon-wide-angle.jpg",
      "/images/commercial/retail-stores/salon-workstation-detail.jpg",
    ]
  }
];

export default function CommercialPage() {
  return (
    <ServiceGalleryLayout
      galleryImages={galleryImages}
      mainCategory="Commercial Photography"
      portfolioCategories={portfolioCategories}
      cta={{
        imageSrc: "/images/commercial/coworking-spaces/modern-workspace-lounge-seating.jpg",
        title: "Ready to elevate your brand?",
        description: "Let's create professional imagery that showcases your commercial space and strengthens your brand presence.",
      }}
    />
  );
}

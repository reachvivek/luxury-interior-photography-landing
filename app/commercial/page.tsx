"use client";

import CategoryPageLayout from "@/components/layouts/CategoryPageLayout";

// Gallery images with categories
const galleryImages = [
  { src: "/images/commercial/office-spaces/modern-commercial-building-night.jpg", category: "Office Spaces" },
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
    id: "office-spaces",
    title: "Office Spaces",
    description: "Professional corporate environments designed for productivity and collaboration",
    images: [
      "/images/commercial/office-spaces/modern-commercial-building-night.jpg",
    ]
  },
  {
    id: "coworking-spaces",
    title: "Co-working Spaces",
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
    title: "Retail Stores",
    description: "Commercial spaces that drive customer engagement and sales",
    images: [
      "/images/commercial/retail-stores/beauty-salon-interior-1.jpg",
      "/images/commercial/retail-stores/nail-salon-workspace.jpg",
      "/images/commercial/retail-stores/beauty-salon-interior-2.jpg",
      "/images/commercial/retail-stores/hair-salon-wide-angle.jpg",
      "/images/commercial/retail-stores/salon-workstation-detail.jpg",
    ]
  },
  {
    id: "showrooms",
    title: "Showrooms",
    description: "Elegant display spaces showcasing products and brands",
    images: [
      "/images/commercial/retail-stores/retail-store-product-shelving.jpg",
    ]
  }
];

// Category filter options
const categoryFilters = [
  { id: 'all', label: 'All' },
  { id: 'office-spaces', label: 'Office Spaces', href: '/commercial/office-spaces' },
  { id: 'coworking-spaces', label: 'Co-working Spaces', href: '/commercial/coworking-spaces' },
  { id: 'retail-stores', label: 'Retail Stores', href: '/commercial/retail-stores' },
  { id: 'showrooms', label: 'Showrooms', href: '/commercial/showrooms' }
];

export default function CommercialPage() {
  return (
    <CategoryPageLayout
      mainCategory="Commercial Photography"
      galleryImages={galleryImages}
      portfolioCategories={portfolioCategories}
      categoryFilters={categoryFilters}
      ctaImage="/images/commercial/coworking-spaces/modern-workspace-lounge-seating.jpg"
      ctaTitle="Ready to elevate your brand?"
      ctaDescription="Let's create professional imagery that showcases your commercial space and strengthens your brand presence."
      basePath="/commercial"
    />
  );
}

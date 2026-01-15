"use client";

import CategoryPageLayout from "@/components/layouts/CategoryPageLayout";

// Gallery images with categories
const galleryImages = [
  { src: "/images/custom-interiors/architectural-elements/resort-archway-night.jpg", category: "Architectural Elements" },
  { src: "/images/custom-interiors/design-details/luxury-serving-detail.jpg", category: "Design Details" },
  { src: "/images/custom-interiors/architectural-elements/ornate-bathroom-ceiling.jpg", category: "Architectural Elements" },
  { src: "/images/custom-interiors/materials/marble-gold-bathroom.jpg", category: "Materials" },
  { src: "/images/custom-interiors/custom-furniture/bespoke-bedroom-furniture.jpg", category: "Custom Furniture" },
  { src: "/images/custom-interiors/design-details/custom-drapery-detail.jpg", category: "Design Details" },
  { src: "/images/custom-interiors/materials/white-brick-wall-texture.jpg", category: "Materials" },
  { src: "/images/custom-interiors/architectural-elements/luxury-ceiling-detail.jpg", category: "Architectural Elements" },
];

// Portfolio categories
const portfolioCategories = [
  {
    id: "architectural-elements",
    title: "Architectural Elements",
    description: "Unique structural features, ceilings, archways, and architectural statements",
    images: [
      "/images/custom-interiors/architectural-elements/ornate-bathroom-ceiling.jpg",
      "/images/custom-interiors/architectural-elements/resort-archway-night.jpg",
      "/images/custom-interiors/architectural-elements/luxury-ceiling-detail.jpg",
    ]
  },
  {
    id: "custom-furniture",
    title: "Custom Furniture",
    description: "Bespoke furniture pieces, custom shelving, and built-in elements",
    images: [
      "/images/custom-interiors/custom-furniture/bespoke-bedroom-furniture.jpg",
      "/images/custom-interiors/custom-furniture/luxury-bathroom-vanity.jpg",
    ]
  },
  {
    id: "materials",
    title: "Material Close-Ups",
    description: "Textures, finishes, and premium materials that define luxury spaces",
    images: [
      "/images/custom-interiors/materials/white-brick-wall-texture.jpg",
      "/images/custom-interiors/materials/marble-gold-bathroom.jpg",
      "/images/custom-interiors/materials/luxury-wall-finish.jpg",
    ]
  },
  {
    id: "design-details",
    title: "Design Details",
    description: "Decorative elements, styling touches, and exquisite details",
    images: [
      "/images/custom-interiors/design-details/luxury-serving-detail.jpg",
      "/images/custom-interiors/design-details/custom-drapery-detail.jpg",
      "/images/custom-interiors/design-details/decorative-table-setting.jpg",
    ]
  }
];

// Category filter options
const categoryFilters = [
  { id: 'all', label: 'All' },
  { id: 'architectural-elements', label: 'Architectural', href: '/custom-interiors/architectural-elements' },
  { id: 'custom-furniture', label: 'Furniture', href: '/custom-interiors/custom-furniture' },
  { id: 'materials', label: 'Materials', href: '/custom-interiors/materials' },
  { id: 'design-details', label: 'Details', href: '/custom-interiors/design-details' }
];

export default function CustomInteriorsPage() {
  return (
    <CategoryPageLayout
      mainCategory="Custom Interior Photography"
      galleryImages={galleryImages}
      portfolioCategories={portfolioCategories}
      categoryFilters={categoryFilters}
      ctaImage="/images/custom-interiors/design-details/custom-drapery-detail.jpg"
      ctaTitle="Ready to highlight your craftsmanship?"
      ctaDescription="Let's create stunning imagery that showcases the unique details and artistry of your custom interior work."
      basePath="/custom-interiors"
    />
  );
}

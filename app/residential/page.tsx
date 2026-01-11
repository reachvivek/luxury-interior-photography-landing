"use client";

import CategoryPageLayout from "@/components/layouts/CategoryPageLayout";

// Gallery images with categories
const galleryImages = [
  { src: "/images/residential/penthouses/modern-penthouse-living-room.jpg", category: "Penthouses" },
  { src: "/images/residential/villas/luxury-villa-grand-entrance.jpg", category: "Villas" },
  { src: "/images/residential/penthouses/penthouse-bedroom-cityview.jpg", category: "Penthouses" },
  { src: "/images/residential/villas/luxury-villa-staircase.jpg", category: "Villas" },
  { src: "/images/residential/home-offices/modern-workspace-window-seating.jpg", category: "Home Offices" },
  { src: "/images/residential/penthouses/penthouse-bathroom-skyline.jpg", category: "Penthouses" },
  { src: "/images/residential/villas/luxury-villa-master-bedroom.jpg", category: "Villas" },
  { src: "/images/residential/villas/luxury-villa-patio-view.jpg", category: "Villas" },
  { src: "/images/residential/apartments/modern-apartment-building-exterior.jpg", category: "Apartments" },
];

// Portfolio categories
const portfolioCategories = [
  {
    id: "villas",
    title: "Luxury Villas",
    description: "Spacious estates and contemporary villas showcasing refined living",
    images: [
      "/images/residential/villas/luxury-villa-grand-entrance.jpg",
      "/images/residential/villas/luxury-villa-staircase.jpg",
      "/images/residential/villas/luxury-villa-patio-view.jpg",
      "/images/residential/villas/luxury-villa-master-bedroom.jpg",
      "/images/residential/villas/luxury-stone-villa-exterior.jpg",
    ]
  },
  {
    id: "penthouses",
    title: "Penthouses",
    description: "High-rise luxury with panoramic city views and modern interiors",
    images: [
      "/images/residential/penthouses/modern-penthouse-living-room.jpg",
      "/images/residential/penthouses/penthouse-bedroom-cityview.jpg",
      "/images/residential/penthouses/penthouse-bathroom-skyline.jpg",
      "/images/residential/penthouses/penthouse-interior-1.jpg",
      "/images/residential/penthouses/penthouse-interior-3.jpg",
    ]
  },
  {
    id: "apartments",
    title: "Apartments",
    description: "Contemporary urban apartments with thoughtful design and finishes",
    images: [
      "/images/residential/apartments/modern-apartment-building-exterior.jpg",
    ]
  },
  {
    id: "home-offices",
    title: "Home Offices",
    description: "Inspiring workspaces designed for productivity and comfort",
    images: [
      "/images/residential/home-offices/modern-workspace-window-seating.jpg",
      "/images/residential/home-offices/contemporary-office-space.jpg",
      "/images/residential/home-offices/home-office-storage-design.jpg",
    ]
  }
];

// Category filter options
const categoryFilters = [
  { id: 'all', label: 'All' },
  { id: 'villas', label: 'Villas' },
  { id: 'penthouses', label: 'Penthouses' },
  { id: 'apartments', label: 'Apartments' },
  { id: 'home-offices', label: 'Home Offices' }
];

export default function ResidentialPage() {
  return (
    <CategoryPageLayout
      mainCategory="Residential Photography"
      galleryImages={galleryImages}
      portfolioCategories={portfolioCategories}
      categoryFilters={categoryFilters}
      ctaImage="/images/residential/villas/luxury-villa-patio-view.jpg"
      ctaTitle="Ready to showcase your property?"
      ctaDescription="Let's create stunning visuals that capture the unique character and luxury of your residential space."
      basePath="/residential"
    />
  );
}

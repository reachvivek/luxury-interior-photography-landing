"use client";

import CategoryPageLayout from "@/components/layouts/CategoryPageLayout";

// Gallery images with categories
const galleryImages = [
  { src: "/images/hospitality/restaurants/art-gallery-dining-room.jpg", category: "Restaurants" },
  { src: "/images/hospitality/hotel-suites/modern-resort-exterior-sunset.jpg", category: "Resorts" },
  { src: "/images/hospitality/hotel-suites/beachfront-resort-architecture.jpg", category: "Resorts" },
  { src: "/images/hospitality/restaurants/modern-cafe-interior-1.jpg", category: "Restaurants" },
  { src: "/images/hospitality/restaurants/contemporary-cafe-lounge.jpg", category: "Restaurants" },
  { src: "/images/hospitality/restaurants/sunset-dining-terrace.jpg", category: "Restaurants" },
  { src: "/images/hospitality/event-spaces/beach-wedding-pavilion.jpg", category: "Event Spaces" },
  { src: "/images/hospitality/hotel-suites/resort-pool-archway-view.jpg", category: "Resorts" },
  { src: "/images/hospitality/event-spaces/pool-terrace-evening.jpg", category: "Event Spaces" },
];

// Portfolio categories
const portfolioCategories = [
  {
    id: "hotel-suites",
    title: "Hotel Suites & Lobbies",
    description: "Luxurious accommodations and welcoming spaces that define hospitality",
    images: [
      "/images/hospitality/hotel-suites/luxury-resort-lobby-entrance.jpg",
      "/images/hospitality/hotel-suites/hotel-lobby-colorful-sofas.jpg",
      "/images/hospitality/hotel-suites/hotel-courtyard-fountain-night.jpg",
      "/images/hospitality/hotel-suites/luxury-garden-terrace-night.jpg",
    ]
  },
  {
    id: "resorts",
    title: "Resorts & Destinations",
    description: "Paradise destinations where luxury meets natural beauty",
    images: [
      "/images/hospitality/hotel-suites/beachfront-resort-architecture.jpg",
      "/images/hospitality/hotel-suites/modern-resort-exterior-sunset.jpg",
      "/images/hospitality/hotel-suites/resort-pool-archway-view.jpg",
      "/images/hospitality/event-spaces/pool-terrace-evening.jpg",
    ]
  },
  {
    id: "restaurants",
    title: "Restaurants & Dining",
    description: "Culinary spaces where ambiance meets gastronomy",
    images: [
      "/images/hospitality/restaurants/art-gallery-dining-room.jpg",
      "/images/hospitality/restaurants/sunset-dining-terrace.jpg",
      "/images/hospitality/restaurants/colorful-restaurant-interior.jpg",
      "/images/hospitality/restaurants/modern-cafe-interior-1.jpg",
      "/images/hospitality/restaurants/contemporary-cafe-lounge.jpg",
      "/images/hospitality/restaurants/minimalist-cafe-design.jpg",
    ]
  },
  {
    id: "event-spaces",
    title: "Event Spaces & Venues",
    description: "Venues designed for memorable experiences and celebrations",
    images: [
      "/images/hospitality/event-spaces/resort-event-pathway.jpg",
      "/images/hospitality/event-spaces/beach-wedding-pavilion.jpg",
      "/images/hospitality/event-spaces/lake-resort-panoramic-view-1.jpg",
    ]
  }
];

// Category filter options
const categoryFilters = [
  { id: 'all', label: 'All' },
  { id: 'hotel-suites', label: 'Hotels' },
  { id: 'resorts', label: 'Resorts' },
  { id: 'restaurants', label: 'Restaurants' },
  { id: 'event-spaces', label: 'Event Spaces' }
];

export default function HospitalityPage() {
  return (
    <CategoryPageLayout
      mainCategory="Hospitality Photography"
      galleryImages={galleryImages}
      portfolioCategories={portfolioCategories}
      categoryFilters={categoryFilters}
      ctaImage="/images/hospitality/restaurants/art-gallery-dining-room.jpg"
      ctaTitle="Ready to showcase your venue?"
      ctaDescription="Let's create captivating imagery that attracts guests and elevates your hospitality brand."
      basePath="/hospitality"
    />
  );
}

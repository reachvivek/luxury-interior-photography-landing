"use client";

import ServiceGalleryLayout from "@/components/services/ServiceGalleryLayout";

// Gallery images with categories
const galleryImages = [
  { src: "/images/hospitality/restaurants/art-gallery-dining-room.jpg", category: "Restaurants" },
  { src: "/images/hospitality/hotel-suites/modern-resort-exterior-sunset.jpg", category: "Hotels" },
  { src: "/images/hospitality/hotel-suites/beachfront-resort-architecture.jpg", category: "Hotels" },
  { src: "/images/hospitality/restaurants/modern-cafe-interior-1.jpg", category: "Restaurants" },
  { src: "/images/hospitality/restaurants/contemporary-cafe-lounge.jpg", category: "Restaurants" },
  { src: "/images/hospitality/restaurants/sunset-dining-terrace.jpg", category: "Restaurants" },
  { src: "/images/hospitality/event-spaces/beach-wedding-pavilion.jpg", category: "Event Spaces" },
  { src: "/images/hospitality/hotel-suites/resort-pool-archway-view.jpg", category: "Hotels" },
  { src: "/images/hospitality/event-spaces/pool-terrace-evening.jpg", category: "Event Spaces" },
];

// Portfolio categories
const portfolioCategories = [
  {
    id: "hotel-suites",
    title: "Hotel Suites & Lobbies",
    description: "Luxurious accommodations and welcoming spaces that define hospitality",
    images: [
      "/images/hospitality/hotel-suites/modern-resort-exterior-sunset.jpg",
      "/images/hospitality/hotel-suites/beachfront-resort-architecture.jpg",
      "/images/hospitality/hotel-suites/resort-pool-archway-view.jpg",
      "/images/hospitality/hotel-suites/luxury-resort-lobby-entrance.jpg",
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
    title: "Event Spaces & Resorts",
    description: "Venues designed for memorable experiences and celebrations",
    images: [
      "/images/hospitality/event-spaces/resort-event-pathway.jpg",
      "/images/hospitality/event-spaces/beach-wedding-pavilion.jpg",
      "/images/hospitality/event-spaces/pool-terrace-evening.jpg",
    ]
  }
];

export default function HospitalityPage() {
  return (
    <ServiceGalleryLayout
      galleryImages={galleryImages}
      mainCategory="Hospitality Photography"
      portfolioCategories={portfolioCategories}
      cta={{
        imageSrc: "/images/hospitality/restaurants/art-gallery-dining-room.jpg",
        title: "Ready to showcase your venue?",
        description: "Let's create captivating imagery that attracts guests and elevates your hospitality brand.",
      }}
    />
  );
}

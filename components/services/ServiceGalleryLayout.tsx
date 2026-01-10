"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ServiceGalleryHero from "./ServiceGalleryHero";
import PortfolioSection from "./PortfolioSection";
import ServiceCTA from "./ServiceCTA";

interface GalleryImage {
  src: string;
  category: string;
}

interface PortfolioCategory {
  id: string;
  title: string;
  description: string;
  images: string[];
}

interface ServiceGalleryLayoutProps {
  galleryImages: GalleryImage[];
  mainCategory: string;
  portfolioCategories: PortfolioCategory[];
  cta: {
    imageSrc: string;
    title: string;
    description: string;
  };
}

export default function ServiceGalleryLayout({
  galleryImages,
  mainCategory,
  portfolioCategories,
  cta,
}: ServiceGalleryLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <ServiceGalleryHero galleryImages={galleryImages} mainCategory={mainCategory} />
      <PortfolioSection categories={portfolioCategories} />
      <ServiceCTA {...cta} />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

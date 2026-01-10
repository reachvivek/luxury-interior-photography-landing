"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ServiceHero from "./ServiceHero";
import PortfolioSection from "./PortfolioSection";
import ServiceCTA from "./ServiceCTA";

interface PortfolioCategory {
  id: string;
  title: string;
  description: string;
  images: string[];
}

interface ServicePageLayoutProps {
  hero: {
    imageSrc: string;
    category: string;
    title: string;
    description: string;
  };
  portfolioCategories: PortfolioCategory[];
  cta: {
    imageSrc: string;
    title: string;
    description: string;
  };
}

export default function ServicePageLayout({
  hero,
  portfolioCategories,
  cta,
}: ServicePageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <ServiceHero {...hero} />
      <PortfolioSection categories={portfolioCategories} />
      <ServiceCTA {...cta} />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

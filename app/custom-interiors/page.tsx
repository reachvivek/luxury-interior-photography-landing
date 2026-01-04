"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = {
  architecture: [
    "/images/_DSC7185.jpg",
    "/images/_DSC7183_1.jpg",
    "/images/_DSC7184.jpg",
  ],
  furniture: [
    "/images/_DSC7186.jpg",
    "/images/_DSC7428.jpg",
    "/images/_DSC7472.jpg",
  ],
  materials: [
    "/images/_DSC7341.jpg",
    "/images/_DSC7473.jpg",
    "/images/_DSC5807_1.jpg",
  ],
  details: [
    "/images/_DSC7417.jpg",
  ],
};

const tabs = [
  { id: "architecture", label: "Unique Architectural Elements" },
  { id: "furniture", label: "Custom Furniture Photography" },
  { id: "materials", label: "Material Close-Ups" },
  { id: "details", label: "Design Details" },
];

export default function CustomInteriorsPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof categories>("architecture");
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % categories[activeTab].length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeTab]);

  useEffect(() => {
    setFeaturedIndex(0);
  }, [activeTab]);

  const handlePrevious = () => {
    setFeaturedIndex((prev) => (prev - 1 + categories[activeTab].length) % categories[activeTab].length);
  };

  const handleNext = () => {
    setFeaturedIndex((prev) => (prev + 1) % categories[activeTab].length);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-16 bg-[#EBE6E5]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-stone-900 mb-6">
            Custom Interiors
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Capturing the finest details and craftsmanship that make your space unique.
          </p>
        </div>
      </section>

      

      {/* Featured Image Carousel */}
      <section className="relative w-full h-screen">
        <Image
          src={categories[activeTab][featuredIndex]}
          alt={`${tabs.find(t => t.id === activeTab)?.label} Featured ${featuredIndex + 1}`}
          fill
          className="object-cover"
          priority
        />
        <button
          onClick={handlePrevious}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/80 hover:bg-white rounded-full transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-stone-900" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/80 hover:bg-white rounded-full transition-all"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-stone-900" />
        </button>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-black/50 text-white rounded-full text-sm">
          {featuredIndex + 1} / {categories[activeTab].length}
        </div>
      </section>

{/* Category Filters */}
      <section className="py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as keyof typeof categories)}
                className={`px-6 py-3 text-sm font-medium tracking-wide uppercase transition-all ${
                  activeTab === tab.id
                    ? "border-2 border-[#EBE6E5] bg-[#EBE6E5] text-stone-900"
                    : "border-2 border-stone-300 text-stone-600 hover:border-stone-400 hover:text-stone-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Gallery Grid */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-light text-stone-900 mb-12 text-center">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories[activeTab].map((image, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => setFeaturedIndex(index)}
              >
                <Image
                  src={image}
                  alt={`${tabs.find(t => t.id === activeTab)?.label} ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-16 bg-stone-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">
            Showcase your custom design
          </h2>
          <p className="text-xl text-stone-300 mb-10">
            Let us capture the unique elements that set your interiors apart.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-stone-900 hover:bg-stone-100 transition-all duration-200 text-sm font-medium tracking-widest uppercase rounded-full"
          >
            Book a Shoot
          </Link>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

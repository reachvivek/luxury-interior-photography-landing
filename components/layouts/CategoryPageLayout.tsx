"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import WhatsAppCTAButton from "@/components/shared/WhatsAppCTAButton";
import { useImageCarousel } from "@/hooks/useImageCarousel";

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

interface CategoryFilter {
  id: string;
  label: string;
}

interface CategoryPageLayoutProps {
  mainCategory: string;
  galleryImages: GalleryImage[];
  portfolioCategories: PortfolioCategory[];
  categoryFilters: CategoryFilter[];
  ctaImage: string;
  ctaTitle: string;
  ctaDescription: string;
  basePath: string; // e.g., "/residential", "/commercial"
}

export default function CategoryPageLayout({
  mainCategory,
  galleryImages,
  portfolioCategories,
  categoryFilters,
  ctaImage,
  ctaTitle,
  ctaDescription,
  basePath,
}: CategoryPageLayoutProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isFiltering, setIsFiltering] = useState(false);

  const {
    currentImageIndex,
    previousImageIndex,
    slideDirection,
    isTransitioning,
    handlePrevious,
    handleNext,
    handleThumbnailClick,
  } = useImageCarousel({
    totalImages: galleryImages.length,
    autoRotateInterval: 3000,
    transitionDuration: 900,
  });

  const currentImage = galleryImages[currentImageIndex];
  const previousImage = galleryImages[previousImageIndex];

  // Filter categories based on active selection
  const filteredCategories = activeCategory === 'all'
    ? portfolioCategories
    : portfolioCategories.filter(cat => cat.id === activeCategory);

  // Limit images per category to 4
  const limitedCategories = filteredCategories.map(cat => ({
    ...cat,
    images: cat.images.slice(0, 4)
  }));

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section - Full Height Image */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Previous Image - Sliding Out */}
        {isTransitioning && (
          <Image
            key={`prev-${previousImageIndex}`}
            src={previousImage.src}
            alt={previousImage.category}
            fill
            sizes="100vw"
            priority
            className={`object-cover transition-transform duration-[900ms] ease-in-out ${
              slideDirection === 'down' ? '-translate-y-full' : 'translate-y-full'
            }`}
          />
        )}

        {/* Current Image - Sliding In */}
        <Image
          key={`current-${currentImageIndex}`}
          src={currentImage.src}
          alt={currentImage.category}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10" />

        {/* Bottom Labels and Filters */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-6 md:px-16 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-6">
            {/* Left: Main Category and Sub-category */}
            <div className="text-white">
              <p className="text-xs md:text-sm tracking-[0.3em] uppercase opacity-80 mb-1">{mainCategory}</p>
              <p className="text-sm md:text-base font-light">{currentImage.category}</p>
            </div>

            {/* Center/Right: Category Filters */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {categoryFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    if (activeCategory !== filter.id) {
                      setIsFiltering(true);
                      setActiveCategory(filter.id);
                      // Smooth scroll to portfolio section
                      setTimeout(() => {
                        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                      setTimeout(() => setIsFiltering(false), 600);
                    }
                  }}
                  className={`px-4 py-2 text-xs md:text-sm tracking-wide uppercase rounded-full transition-all duration-300 backdrop-blur-sm ${
                    activeCategory === filter.id
                      ? 'bg-white text-stone-900 shadow-lg'
                      : 'bg-white/10 text-white border border-white/30 hover:bg-white/20 hover:border-white/50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Right Side (Vertical Centered) */}
        <div className="absolute top-1/2 -translate-y-1/2 right-6 md:right-8 z-20 flex flex-col items-center gap-3">
          {/* Previous Button (Up) */}
          <button
            onClick={handlePrevious}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/20 hover:border-white/50 transition-all duration-300 group"
            aria-label="Previous image"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-white transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>

          {/* Divider */}
          <div className="w-px h-8 bg-white/20"></div>

          {/* Next Button (Down) */}
          <button
            onClick={handleNext}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/20 hover:border-white/50 transition-all duration-300 group"
            aria-label="Next image"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-white transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Thumbnail Navigation */}
      <section className="relative bg-black px-6 md:px-16 py-10 md:py-12">
        <div className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide justify-center py-2 px-2">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                currentImageIndex === index
                  ? 'ring-2 ring-white scale-105'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={image.src}
                alt={`${image.category} thumbnail`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 md:py-24 px-6 md:px-16 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
            </div>
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-4">
              Portfolio {activeCategory !== 'all' && `• ${categoryFilters.find(f => f.id === activeCategory)?.label}`}
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900">
              {activeCategory === 'all' ? 'Featured Projects' : categoryFilters.find(f => f.id === activeCategory)?.label}
            </h2>
          </div>

          {/* Portfolio Categories */}
          <div className={`space-y-20 md:space-y-32 transition-all duration-500 ${
            isFiltering ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            {limitedCategories.map((category, categoryIndex) => (
              <div key={category.id} className="w-full">
                {/* Category Header */}
                <div className="mb-8 md:mb-12">
                  <h3 className="text-xl md:text-3xl font-serif font-light text-stone-900 mb-3">
                    {category.title}
                  </h3>
                  <p className="text-sm md:text-base text-stone-600 mb-6">
                    {category.description}
                  </p>

                  {/* WhatsApp Book Now Button */}
                  <div className="flex justify-center">
                    <WhatsAppCTAButton
                      message={`Hi Tsurov, I'm interested in booking a photography session for ${category.title}`}
                    />
                  </div>
                </div>

                {/* Image Grid - Alternating Layouts */}
                {categoryIndex % 2 === 0 ? (
                  // Layout 1: Large left, 2 stacked right
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {category.images[0] && (
                      <div className="relative aspect-[4/3] md:aspect-[3/4] rounded-lg overflow-hidden group">
                        <Image
                          src={category.images[0]}
                          alt={`${category.title} 1`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}
                    <div className="grid grid-rows-2 gap-4 md:gap-6">
                      {category.images.slice(1, 3).map((image, idx) => (
                        <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                          <Image
                            src={image}
                            alt={`${category.title} ${idx + 2}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Layout 2: 3-column grid
                  <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                    {category.images.slice(0, 3).map((image, idx) => (
                      <div key={idx} className="relative aspect-[4/5] rounded-lg overflow-hidden group">
                        <Image
                          src={image}
                          alt={`${category.title} ${idx + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Show remaining images in a row if more than 3 */}
                {category.images.length > 3 && (
                  <div className="grid md:grid-cols-4 gap-4 md:gap-6 mt-4 md:mt-6">
                    {category.images.slice(3).map((image, idx) => (
                      <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                        <Image
                          src={image}
                          alt={`${category.title} ${idx + 4}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* View More Button */}
                <div className="flex justify-center mt-8 md:mt-12">
                  <Link
                    href={`${basePath}/${category.id}`}
                    className="group inline-flex items-center gap-2 px-8 py-3 border border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900 hover:shadow-md transition-all duration-300 text-sm font-medium tracking-wide rounded-full"
                  >
                    <span>View More</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-16">
        <Image
          src={ctaImage}
          alt="Contact Background"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-white mb-6 md:mb-8">
            {ctaTitle}
          </h2>
          <p className="text-base md:text-lg text-stone-200 mb-8 md:mb-10 max-w-2xl mx-auto">
            {ctaDescription}
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-stone-900 hover:bg-stone-100 hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium tracking-widest uppercase rounded-full"
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

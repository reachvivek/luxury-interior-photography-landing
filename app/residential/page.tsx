"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { CONTACT } from "@/data/contact";

// Gallery images with categories
const galleryImages = [
  { src: "/images/residential/penthouses/penthouse-interior-1.jpg", category: "Penthouses" },
  { src: "/images/residential/villas/luxury-villa-with-porsche.jpg", category: "Villas" },
  { src: "/images/residential/penthouses/penthouse-interior-2.jpg", category: "Penthouses" },
  { src: "/images/residential/villas/luxury-stone-villa-exterior.jpg", category: "Villas" },
  { src: "/images/residential/penthouses/penthouse-interior-3.jpg", category: "Penthouses" },
  { src: "/images/residential/penthouses/penthouse-interior-4.jpg", category: "Penthouses" },
  { src: "/images/residential/villas/stone-villa-entrance-car.jpg", category: "Villas" },
  { src: "/images/residential/apartments/modern-apartment-building-exterior.jpg", category: "Apartments" },
];

// Portfolio categories
const portfolioCategories = [
  {
    id: "villas",
    title: "Luxury Villas",
    description: "Spacious estates and contemporary villas showcasing refined living",
    images: [
      "/images/residential/villas/luxury-villa-with-porsche.jpg",
      "/images/residential/villas/luxury-stone-villa-exterior.jpg",
      "/images/residential/villas/stone-villa-entrance-car.jpg",
    ]
  },
  {
    id: "penthouses",
    title: "Penthouses",
    description: "Sophisticated penthouses with panoramic views and modern design",
    images: [
      "/images/residential/penthouses/penthouse-interior-1.jpg",
      "/images/residential/penthouses/penthouse-interior-2.jpg",
      "/images/residential/penthouses/penthouse-interior-3.jpg",
      "/images/residential/penthouses/penthouse-interior-4.jpg",
    ]
  },
  {
    id: "apartments",
    title: "Modern Apartments",
    description: "Contemporary living spaces designed for urban sophistication",
    images: [
      "/images/residential/apartments/modern-apartment-building-exterior.jpg",
    ]
  }
];

export default function ResidentialPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'up' | 'down'>('down');

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection('down');
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setSlideDirection('up');
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNext = () => {
    setSlideDirection('down');
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const currentImage = galleryImages[currentImageIndex];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section - Full Height Image */}
      <section className="relative w-full h-screen overflow-hidden">
        <Image
          key={currentImageIndex}
          src={currentImage.src}
          alt={`Residential ${currentImage.category}`}
          fill
          sizes="100vw"
          className={`object-cover ${
            slideDirection === 'down'
              ? 'animate-slideInFromTop'
              : 'animate-slideInFromBottom'
          }`}
          priority
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10" />

        {/* Bottom Labels */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-6 md:px-16 py-6 md:py-8">
          {/* Left: Main Category and Sub-category */}
          <div className="text-white">
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase opacity-80 mb-1">Residential Photography</p>
            <p className="text-sm md:text-base font-light">{currentImage.category}</p>
          </div>
        </div>

        {/* Navigation Arrows - Bottom Right (Vertical) */}
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20 flex flex-col items-center gap-3">
          {/* Previous Button (Up) */}
          <button
            onClick={handlePrevious}
            className="group w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/40 hover:border-white/80 backdrop-blur-sm bg-black/20 hover:bg-black/40 transition-all duration-300 flex items-center justify-center"
            aria-label="Previous image"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-white/80 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>

          {/* Next Button (Down) */}
          <button
            onClick={handleNext}
            className="group w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/40 hover:border-white/80 backdrop-blur-sm bg-black/20 hover:bg-black/40 transition-all duration-300 flex items-center justify-center"
            aria-label="Next image"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-white/80 group-hover:text-white transition-colors"
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
              onClick={() => setCurrentImageIndex(index)}
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
              Portfolio
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900">
              Featured Projects
            </h2>
          </div>

          {/* Portfolio Categories */}
          <div className="space-y-20 md:space-y-32">
            {portfolioCategories.map((category, categoryIndex) => (
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
                    <a
                      href={`{CONTACT.whatsapp.url}?text=Hi%20Tsurov,%20I'm%20interested%20in%20booking%20a%20photography%20session%20for%20${encodeURIComponent(category.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 border border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900 hover:shadow-md transition-all duration-300 text-sm font-medium tracking-wide rounded-full group"
                    >
                      <svg
                        className="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Book Now
                    </a>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-16">
        <Image
          src="/images/residential/villas/luxury-villa-with-porsche.jpg"
          alt="Contact Background"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-white mb-6 md:mb-8">
            Ready to showcase your property?
          </h2>
          <p className="text-base md:text-lg text-stone-200 mb-8 md:mb-10 max-w-2xl mx-auto">
            Let's create stunning visuals that capture the unique character and luxury of your residential space.
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

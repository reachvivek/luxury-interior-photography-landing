"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CONTACT } from "@/data/contact";

interface SubcategoryImage {
  src: string;
  alt: string;
}

interface SubcategoryPageProps {
  mainCategory: string;
  subcategoryTitle: string;
  description: string;
  heroImage: string;
  galleryImages: SubcategoryImage[];
}

export default function SubcategoryPage({
  mainCategory,
  subcategoryTitle,
  description,
  heroImage,
  galleryImages,
}: SubcategoryPageProps) {
  const galleryAnimation = useScrollAnimation(0.15);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] md:h-screen w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={subcategoryTitle}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* Stronger Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80 z-10" />

        {/* Hero Content */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-6 md:px-16 py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              {/* Left: Text Content */}
              <div className="text-white">
                <p className="text-xs sm:text-sm tracking-[0.3em] uppercase opacity-90 mb-2 font-medium" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  {mainCategory}
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 text-white" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.7)' }}>
                  {subcategoryTitle}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-white max-w-2xl leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  {description}
                </p>
              </div>

              {/* Right: CTA Button */}
              <div className="md:flex-shrink-0">
                <a
                  href={`${CONTACT.whatsapp.url}?text=Hi%20Tsurov,%20I'm%20interested%20in%20booking%20a%20photography%20session%20for%20${encodeURIComponent(subcategoryTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-stone-900 hover:bg-stone-100 transition-all duration-300 text-sm font-medium tracking-wide rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-0.5 group"
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
          </div>
        </div>
      </section>

      {/* Gallery Section - Masonry Grid */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
            </div>
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-4">
              Gallery
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900">
              {galleryImages.length} Featured Images
            </h2>
          </div>

          {/* Masonry Gallery Grid */}
          <div
            ref={galleryAnimation.elementRef}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6"
          >
            {galleryImages.map((image, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                className={`relative break-inside-avoid rounded-lg overflow-hidden group cursor-pointer transition-all duration-700 ${
                  galleryAnimation.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: galleryAnimation.isVisible
                    ? `${idx * 80}ms`
                    : "0ms",
                }}
              >
                <div className="relative w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={1000}
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    <p className="text-sm font-medium">View Full Size</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            onClick={previousImage}
            className="absolute left-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            aria-label="Next image"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute top-6 left-6 z-50 text-white text-sm backdrop-blur-sm bg-black/30 px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>

          {/* Current Image - 16:9 Full Stretch */}
          <div className="relative w-[90vw] aspect-video">
            <Image
              src={galleryImages[currentImageIndex].src}
              alt={galleryImages[currentImageIndex].alt}
              fill
              sizes="90vw"
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 md:px-16">
        <Image
          src={heroImage}
          alt="Contact Background"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-white mb-6 md:mb-8">
            Ready to Showcase Your Space?
          </h2>
          <p className="text-base md:text-lg text-stone-200 mb-8 md:mb-10 max-w-2xl mx-auto">
            Let's create stunning visual content that captures the unique character of your {subcategoryTitle.toLowerCase()} project.
          </p>
          <a
            href={`${CONTACT.whatsapp.url}?text=Hi%20Tsurov,%20I'm%20interested%20in%20booking%20a%20photography%20session%20for%20${encodeURIComponent(subcategoryTitle)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-stone-900 hover:bg-stone-100 transition-all duration-300 text-sm font-medium tracking-widest uppercase rounded-full shadow-xl hover:-translate-y-0.5 group"
          >
            <svg
              className="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Book a Shoot
          </a>
        </div>
      </section>

      <Footer />
      {!lightboxOpen && <ScrollToTop />}
    </div>
  );
}

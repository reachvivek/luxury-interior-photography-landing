"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import WhatsAppCTAButton from "@/components/shared/WhatsAppCTAButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
  approachTitle: string;
  approachDescription: string;
  processTitle: string;
  processSteps: string[];
  impactTitle: string;
  impactDescription: string;
}

export default function SubcategoryPage({
  mainCategory,
  subcategoryTitle,
  description,
  heroImage,
  galleryImages,
  approachTitle,
  approachDescription,
  processTitle,
  processSteps,
  impactTitle,
  impactDescription,
}: SubcategoryPageProps) {
  const galleryAnimation = useScrollAnimation(0.15);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageTransitioning, setImageTransitioning] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    if (!imageTransitioning) {
      setImageTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
        setImageTransitioning(false);
      }, 300);
    }
  };

  const previousImage = () => {
    if (!imageTransitioning) {
      setImageTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
        setImageTransitioning(false);
      }, 300);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') previousImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxOpen, currentImageIndex]);

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
                <WhatsAppCTAButton
                  message={`Hi Tsurov, I'm interested in booking a photography session for ${subcategoryTitle}`}
                  variant="primary"
                  size="large"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Approach - Storytelling Section */}
      <section className="py-16 md:py-20 px-6 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-stone-900 mb-6">
              {approachTitle}
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-stone-600 leading-relaxed max-w-3xl mx-auto">
              {approachDescription}
            </p>
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
              Featured Work
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

      {/* The Process - Experience Section */}
      <section className="py-16 md:py-20 px-6 md:px-16 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: Process Details */}
            <div>
              <div className="flex mb-6 md:mb-8">
                <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-stone-900 mb-6">
                {processTitle}
              </h2>
              <div className="space-y-4">
                {processSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 text-sm font-medium">
                      {idx + 1}
                    </div>
                    <p className="text-sm md:text-base text-stone-600 leading-relaxed pt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Impact Statement */}
            <div className="bg-stone-50 p-8 md:p-10 rounded-lg">
              <div className="mb-6">
                <svg className="w-12 h-12 text-stone-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 mb-4">
                {impactTitle}
              </h3>
              <p className="text-sm md:text-base text-stone-600 leading-relaxed">
                {impactDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer group"
            aria-label="Close lightbox"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            onClick={previousImage}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
            aria-label="Next image"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 z-50 text-white text-xs md:text-sm backdrop-blur-sm bg-black/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>

          {/* Keyboard Instructions - Top Center */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-4 text-white/70 text-xs backdrop-blur-sm bg-black/30 px-4 py-2 rounded-full">
            <div className="flex items-center gap-1.5">
              <kbd className="px-2 py-0.5 bg-white/10 rounded text-white border border-white/20">ESC</kbd>
              <span>to exit</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-1.5">
              <kbd className="px-2 py-0.5 bg-white/10 rounded text-white border border-white/20">←</kbd>
              <kbd className="px-2 py-0.5 bg-white/10 rounded text-white border border-white/20">→</kbd>
              <span>to navigate</span>
            </div>
          </div>

          {/* Current Image - 16:9 Full Stretch */}
          <div className="relative w-screen aspect-video">
            <div className={`absolute inset-0 transition-opacity duration-300 ${imageTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <Image
                key={currentImageIndex}
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Bottom Gradient for Text Readability */}
            <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

            {/* Bottom Left - Image Description */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-12 z-20 max-w-xs md:max-w-xl">
              <p className="text-white text-xs md:text-sm lg:text-base font-light leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                {galleryImages[currentImageIndex].alt}
              </p>
              <p className="text-white/70 text-[10px] md:text-xs lg:text-sm mt-0.5 md:mt-1 tracking-wide">
                {subcategoryTitle}
              </p>
            </div>

            {/* Bottom Right - Photography Credit */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-12 z-20 text-right">
              <p className="text-white/80 text-[10px] md:text-xs lg:text-sm tracking-widest uppercase" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                Photography by Tsurov
              </p>
              <p className="text-white/60 text-[9px] md:text-xs mt-0.5 md:mt-1">
                Interior Photography Dubai
              </p>
            </div>
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

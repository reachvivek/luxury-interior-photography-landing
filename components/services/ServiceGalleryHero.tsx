"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface GalleryImage {
  src: string;
  category: string;
}

interface ServiceGalleryHeroProps {
  galleryImages: GalleryImage[];
  mainCategory: string;
}

export default function ServiceGalleryHero({
  galleryImages,
  mainCategory,
}: ServiceGalleryHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'up' | 'down'>('down');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousImageIndex(currentImageIndex);
      setSlideDirection('down');
      setIsTransitioning(true);
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
      setTimeout(() => setIsTransitioning(false), 900);
    }, 3000);

    return () => clearInterval(interval);
  }, [galleryImages.length, currentImageIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImageIndex, galleryImages.length]);

  const handlePrevious = () => {
    setPreviousImageIndex(currentImageIndex);
    setSlideDirection('up');
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setTimeout(() => setIsTransitioning(false), 900);
  };

  const handleNext = () => {
    setPreviousImageIndex(currentImageIndex);
    setSlideDirection('down');
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    setTimeout(() => setIsTransitioning(false), 900);
  };

  const handleThumbnailClick = (index: number) => {
    if (index === currentImageIndex) return;
    setPreviousImageIndex(currentImageIndex);
    setIsTransitioning(true);
    // Determine direction based on whether we're moving forward or backward
    if (index > currentImageIndex) {
      setSlideDirection('down');
    } else if (index < currentImageIndex) {
      setSlideDirection('up');
    }
    setCurrentImageIndex(index);
    setTimeout(() => setIsTransitioning(false), 900);
  };

  const currentImage = galleryImages[currentImageIndex];
  const previousImage = galleryImages[previousImageIndex];

  return (
    <>
      {/* Hero Section - Full Height Image */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Previous Image - Sliding Out */}
        {isTransitioning && (
          <Image
            key={`prev-${previousImageIndex}`}
            src={previousImage.src}
            alt={`${mainCategory} ${previousImage.category}`}
            fill
            sizes="100vw"
            className={`object-cover absolute inset-0 ${
              slideDirection === 'down'
                ? 'animate-slideOutToBottom'
                : 'animate-slideOutToTop'
            }`}
            priority
          />
        )}

        {/* Current Image - Sliding In */}
        <Image
          key={`current-${currentImageIndex}`}
          src={currentImage.src}
          alt={`${mainCategory} ${currentImage.category}`}
          fill
          sizes="100vw"
          className={`object-cover absolute inset-0 ${
            isTransitioning
              ? slideDirection === 'down'
                ? 'animate-slideInFromTop'
                : 'animate-slideInFromBottom'
              : ''
          }`}
          priority
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10" />

        {/* Bottom Labels */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-6 md:px-16 py-6 md:py-8">
          {/* Left: Main Category and Sub-category */}
          <div className="text-white">
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase opacity-80 mb-1">
              {mainCategory}
            </p>
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
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  category: string;
}

interface CategoryHeroProps {
  images: GalleryImage[];
  mainCategory: string;
  arrowOrientation?: 'vertical' | 'horizontal';
}

export default function CategoryHero({ images, mainCategory, arrowOrientation = 'vertical' }: CategoryHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'up' | 'down'>('down');

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection('down');
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrevious = () => {
    setSlideDirection('up');
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setSlideDirection('down');
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const currentImage = images[currentImageIndex];

  return (
    <>
      {/* Hero Section - Full Height Image */}
      <section className="relative w-full h-screen overflow-hidden">
        <Image
          key={currentImageIndex}
          src={currentImage.src}
          alt={`${mainCategory} ${currentImage.category}`}
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
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase opacity-80 mb-1">{mainCategory}</p>
            <p className="text-sm md:text-base font-light">{currentImage.category}</p>
          </div>
        </div>

        {/* Navigation Arrows - Bottom Right */}
        <div className={`absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20 flex ${arrowOrientation === 'vertical' ? 'flex-col' : 'flex-row'} items-center gap-3`}>
          {/* Previous Button */}
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
              {arrowOrientation === 'vertical' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              )}
            </svg>
          </button>

          {/* Next Button */}
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
              {arrowOrientation === 'vertical' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              )}
            </svg>
          </button>
        </div>
      </section>

      {/* Thumbnail Navigation */}
      <section className="relative bg-black px-6 md:px-16 py-10 md:py-12">
        <div className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide justify-center py-2 px-2">
          {images.map((image, index) => (
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
    </>
  );
}

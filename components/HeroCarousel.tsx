"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/constants/heroCarousel";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const autoPlayRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const goToNextSlide = () => {
    if (isAnimating) return;
    setDirection('next');
    setNextSlide((currentSlide + 1) % HERO_SLIDES.length);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      setIsAnimating(false);
    }, 600);
  };

  const goToPrevSlide = () => {
    if (isAnimating) return;
    setDirection('prev');
    setNextSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
      setIsAnimating(false);
    }, 600);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setDirection(index > currentSlide ? 'next' : 'prev');
    setNextSlide(index);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 600);
  };

  // Auto-play: Change slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  const current = HERO_SLIDES[currentSlide];
  const next = HERO_SLIDES[nextSlide];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Current Image - Always visible when not animating */}
      <div className="absolute inset-0">
        <div className="relative w-full h-screen">
          <Image
            src={current.image}
            alt={current.title}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* Next/Prev Image - Only visible during animation */}
      {isAnimating && (
        <div
          className={`absolute inset-0 transition-transform duration-600 ease-in-out ${
            direction === 'next'
              ? 'animate-slideUpIn'
              : 'animate-slideDownIn'
          }`}
        >
          <div className="relative w-full h-screen">
            <Image
              src={next.image}
              alt={next.title}
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      )}

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 md:px-16 lg:px-24">
        <div
          key={currentSlide}
          className="max-w-4xl w-full animate-fadeIn text-center"
        >
          {/* Category */}
          <p className="text-white text-[10px] md:text-xs font-normal tracking-[0.4em] uppercase mb-8 md:mb-10 opacity-65 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {current.category}
          </p>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-normal text-white mb-5 md:mb-7 leading-[1.05] tracking-normal drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            {current.title}
          </h1>

          {/* Description */}
          <p className="text-white text-sm md:text-base lg:text-lg mb-8 md:mb-10 max-w-2xl mx-auto opacity-95 leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] font-light">
            {current.description}
          </p>

          {/* CTA Button */}
          <Link
            href={current.ctaLink}
            className="inline-block px-8 md:px-10 py-3 md:py-4 bg-transparent border border-white/70 text-white hover:bg-white hover:text-stone-900 hover:border-white transition-all duration-300 text-xs md:text-sm font-normal tracking-widest uppercase rounded-full"
          >
            {current.ctaText}
          </Link>
        </div>
      </div>

      {/* Navigation Arrows - Bottom on Mobile, Sides on Desktop */}
      <div className="absolute inset-x-0 bottom-8 md:inset-0 z-20 flex items-end md:items-center justify-center md:justify-between gap-4 md:gap-0 md:px-8 lg:px-12 pointer-events-none">
        {/* Left Arrow */}
        <button
          onClick={goToPrevSlide}
          disabled={isAnimating}
          className="pointer-events-auto w-11 h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border border-white/50 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white opacity-70 hover:opacity-100 hover:bg-white/25 hover:border-white/80 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNextSlide}
          disabled={isAnimating}
          className="pointer-events-auto w-11 h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border border-white/50 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white opacity-70 hover:opacity-100 hover:bg-white/25 hover:border-white/80 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </button>
      </div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 pointer-events-none" />

      {/* Additional gradient from left for text protection */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

      <style jsx>{`
        @keyframes slideUpIn {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes slideDownIn {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slideUpIn {
          animation: slideUpIn 0.6s ease-in-out forwards;
        }

        .animate-slideDownIn {
          animation: slideDownIn 0.6s ease-in-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in forwards;
        }
      `}</style>
    </section>
  );
}

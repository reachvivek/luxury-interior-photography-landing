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

  // Removed auto-play - images only change on arrow click

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
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      )}

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 md:px-16">
        <div
          key={currentSlide}
          className="text-center max-w-4xl w-full animate-fadeIn"
        >
          {/* Category */}
          <p className="text-white text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-3 md:mb-4 opacity-90">
            {current.category}
          </p>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white mb-6 md:mb-8 tracking-wide px-4">
            {current.title}
          </h1>

          {/* Explore Button */}
          <Link
            href={current.link}
            className="inline-block px-6 md:px-8 py-2.5 md:py-3 border-2 border-white text-white hover:bg-white hover:text-stone-800 transition-all duration-300 text-xs md:text-sm font-semibold tracking-wide uppercase rounded-full"
          >
            EXPLORE
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-6 md:px-12 pointer-events-none">
        {/* Left Arrow */}
        <button
          onClick={goToPrevSlide}
          disabled={isAnimating}
          className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/50 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:border-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNextSlide}
          disabled={isAnimating}
          className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/50 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:border-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
        </button>
      </div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 pointer-events-none" />

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

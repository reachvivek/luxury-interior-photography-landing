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

  const scrollToNextSection = () => {
    const targetPosition = window.innerHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1800; // 1.8 seconds
    let start: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
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
        <div key={`current-${currentSlide}`} className="relative w-full h-screen overflow-hidden">
          <div className="w-full h-full animate-kenBurns">
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
          <div key={`next-${nextSlide}`} className="relative w-full h-screen overflow-hidden">
            <div className="w-full h-full animate-kenBurns">
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
        </div>
      )}

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 md:px-16 lg:px-24 pt-20 pb-32 md:pt-0 md:pb-0">
        <div
          key={currentSlide}
          className="max-w-4xl w-full animate-fadeIn text-center"
        >
          {/* Category */}
          <p className="text-white text-xs md:text-xs font-normal tracking-[0.3em] md:tracking-[0.4em] uppercase mb-6 md:mb-10 drop-shadow-[0_4px_20px_rgba(0,0,0,1)]">
            {current.category}
          </p>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-normal text-white mb-4 md:mb-7 leading-[1.1] tracking-normal drop-shadow-[0_6px_30px_rgba(0,0,0,1)] [text-shadow:_0_2px_20px_rgb(0_0_0_/_90%)]">
            {current.title}
          </h1>

          {/* Description */}
          <p className="text-white text-sm md:text-base lg:text-lg mb-7 md:mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_4px_20px_rgba(0,0,0,1)] font-light px-4 md:px-0">
            {current.description}
          </p>

          {/* CTA Button */}
          <Link
            href={current.ctaLink}
            className="inline-block px-8 md:px-10 py-3.5 md:py-4 bg-white/10 backdrop-blur-sm border-2 border-white/90 text-white hover:bg-white hover:text-stone-900 hover:border-white transition-all duration-300 text-xs md:text-sm font-medium tracking-widest uppercase rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.8)]"
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

      {/* Gradient Overlay for better text readability - Stronger on mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 md:from-black/50 md:via-black/40 md:to-black/60 pointer-events-none" />

      {/* Additional gradient from center for text protection on mobile */}
      <div className="absolute inset-0 bg-radial-gradient from-black/50 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/40 md:via-transparent md:to-transparent pointer-events-none" />

      {/* Scroll Down Indicator */}
      <button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer hover:opacity-100 transition-opacity"
        aria-label="Scroll to next section"
      >
        <svg
          className="w-8 h-8 text-white opacity-70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

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

        @keyframes kenBurns {
          0% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
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

        .animate-kenBurns {
          animation: kenBurns 5s ease-in-out forwards;
          transform-origin: center center;
        }
      `}</style>
    </section>
  );
}

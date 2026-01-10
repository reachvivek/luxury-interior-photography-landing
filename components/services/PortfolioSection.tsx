"use client";

import PortfolioCategory from "./PortfolioCategory";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface PortfolioCategory {
  id: string;
  title: string;
  description: string;
  images: string[];
}

interface PortfolioSectionProps {
  categories: PortfolioCategory[];
}

export default function PortfolioSection({ categories }: PortfolioSectionProps) {
  const headerAnimation = useScrollAnimation(0.2);

  return (
    <section id="portfolio" className="py-16 md:py-24 px-6 md:px-16 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerAnimation.elementRef}
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            headerAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-px h-8 sm:h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>
          <p className="text-xs sm:text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-4">
            Portfolio
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900">
            Featured Projects
          </h2>
        </div>

        {/* Portfolio Categories */}
        <div className="space-y-20 md:space-y-32">
          {categories.map((category, categoryIndex) => (
            <PortfolioCategory
              key={category.id}
              category={category}
              categoryIndex={categoryIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

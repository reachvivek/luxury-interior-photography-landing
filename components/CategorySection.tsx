"use client";

import Image from "next/image";
import { CategorySpace } from "@/types";

interface CategorySectionProps {
  title: string;
  spaces: CategorySpace[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function CategorySection({
  title,
  spaces,
  currentIndex,
  onIndexChange,
  onNext,
  onPrevious,
}: CategorySectionProps) {
  return (
    <>
      {/* Featured Image Section */}
      <section className="h-screen relative bg-[#F8F3F4]">
        <div className="relative h-screen">
          <Image
            src={spaces[currentIndex].image}
            alt={spaces[currentIndex].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

          {/* Title and Navigation */}
          <div className="absolute bottom-8 left-0 right-0 px-6 md:px-16 py-4 flex items-end justify-between">
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-serif font-light text-white">
              {title}
            </h2>

            <div className="flex flex-col items-end gap-3">
              <p className="text-xl md:text-2xl font-serif text-white/90">
                {spaces[currentIndex].title}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={onPrevious}
                  className="w-12 h-12 rounded-full border-2 border-white/80 text-white hover:bg-white hover:text-stone-900 transition-all duration-200 flex items-center justify-center"
                  aria-label="Previous"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={onNext}
                  className="w-12 h-12 rounded-full border-2 border-white/80 text-white hover:bg-white hover:text-stone-900 transition-all duration-200 flex items-center justify-center"
                  aria-label="Next"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      <section className="py-12 px-6 md:px-16 bg-[#F8F3F4]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {spaces.map((space, index) => (
              <button
                key={`${space.title}-${index}`}
                onClick={() => onIndexChange(index)}
                className={`group cursor-pointer transition-all duration-300 ${
                  index === currentIndex ? 'scale-105' : 'hover:scale-105'
                }`}
              >
                <div className={`relative aspect-square rounded-lg overflow-hidden mb-3 ${
                  index === currentIndex ? 'ring-4 ring-[#EBE6E5]' : 'ring-2 ring-[#EBE6E5]'
                }`}>
                  <Image
                    src={space.image}
                    alt={space.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <p className={`text-center font-serif transition-colors ${
                  index === currentIndex ? 'text-stone-900 font-medium' : 'text-stone-600'
                }`}>
                  {space.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

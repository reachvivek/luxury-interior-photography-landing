"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CategorySpace } from "@/types";

interface CategoryPreviewProps {
  title: string;
  href: string;
  description?: string;
  spaces: CategorySpace[];
}

export default function CategoryPreview({
  title,
  href,
  description,
  spaces,
}: CategoryPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotate images on hover every 3 seconds
  useEffect(() => {
    if (!isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % spaces.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, spaces.length]);

  // Reset to first image when hover ends
  useEffect(() => {
    if (!isHovered) {
      setCurrentImageIndex(0);
    }
  }, [isHovered]);

  return (
    <Link
      href={href}
      className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <Image
        src={spaces[currentImageIndex].image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlay - Always visible on mobile, hover on desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-white mb-2 md:mb-3 tracking-wide uppercase">
            {title}
          </h3>
          {description && (
            <p className="text-white/90 text-sm md:text-base mb-4 max-w-2xl">
              {description}
            </p>
          )}
          <div className="flex items-center text-white/80 text-sm font-normal tracking-wide uppercase">
            <span>View Portfolio</span>
            <svg
              className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

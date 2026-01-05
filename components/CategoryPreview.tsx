"use client";

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
  // Show max 3 preview images (or just the hero if you want even cleaner)
  const previewSpaces = spaces.slice(0, 3);
  const heroImage = spaces[0];

  return (
    <section className="py-16 md:py-20 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Category Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 mb-3">
          {title}
        </h2>

        {/* Optional Description */}
        {description && (
          <p className="text-stone-600 text-base md:text-lg mb-8 max-w-2xl">
            {description}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Hero Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={heroImage.image}
              alt={heroImage.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Preview Thumbnails + CTA */}
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {previewSpaces.map((space, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <Image
                    src={space.image}
                    alt={space.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href={href}
              className="inline-block px-8 py-3 border border-stone-300 text-stone-900 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300 text-sm font-normal tracking-wide uppercase rounded-full"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

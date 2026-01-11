"use client";

import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
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
}

export default function SubcategoryPage({
  mainCategory,
  subcategoryTitle,
  description,
  heroImage,
  galleryImages,
}: SubcategoryPageProps) {
  const headerAnimation = useScrollAnimation(0.2);
  const galleryAnimation = useScrollAnimation(0.15);

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

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-10" />

        {/* Hero Content */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-6 md:px-16 py-8 md:py-10">
          <div className="text-white drop-shadow-lg">
            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase opacity-90 mb-2 drop-shadow-md">
              {mainCategory}
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light drop-shadow-md mb-4">
              {subcategoryTitle}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-3xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            ref={headerAnimation.elementRef}
            className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
              headerAnimation.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
            </div>
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-4">
              Portfolio
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900">
              Featured Projects
            </h2>
          </div>

          {/* Image Gallery Grid */}
          <div
            ref={galleryAnimation.elementRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {galleryImages.map((image, idx) => (
              <div
                key={idx}
                className={`relative aspect-[3/4] rounded-lg overflow-hidden group transition-all duration-700 ${
                  galleryAnimation.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: galleryAnimation.isVisible
                    ? `${idx * 100}ms`
                    : "0ms",
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative min-h-[40vh] sm:min-h-[50vh] flex items-center justify-center px-6 md:px-16">
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
          <p className="text-base md:text-lg text-stone-200 mb-8 md:mb-10">
            Let's create stunning visual content for your {subcategoryTitle.toLowerCase()} project.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-stone-900 hover:bg-stone-100 transition-all duration-300 text-sm font-medium tracking-widest uppercase rounded-full"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

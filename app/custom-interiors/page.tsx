"use client";

import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

const architectureImages = [
  "/images/_DSC7185.jpg",
  "/images/_DSC7183_1.jpg",
  "/images/_DSC7184.jpg",
];

const furnitureImages = [
  "/images/_DSC7186.jpg",
  "/images/_DSC7428.jpg",
  "/images/_DSC7472.jpg",
];

const materialsImages = [
  "/images/_DSC7341.jpg",
  "/images/_DSC7473.jpg",
  "/images/_DSC5807_1.jpg",
];

const detailsImages = [
  "/images/_DSC7417.jpg",
];

export default function CustomInteriorsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-16 bg-[#EBE6E5]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-stone-900 mb-6">
            Custom Interiors
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Capturing the finest details and craftsmanship that make your space unique.
          </p>
        </div>
      </section>

      {/* Unique Architectural Elements */}
      <section id="architecture" className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-light text-stone-900 mb-12">
            Unique Architectural Elements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {architectureImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Architectural Element ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Furniture Photography */}
      <section id="furniture" className="py-20 px-6 md:px-16 bg-[#F5F0ED]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-light text-stone-900 mb-12">
            Custom Furniture Photography
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {furnitureImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Custom Furniture ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material Close-Ups */}
      <section id="materials" className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-light text-stone-900 mb-12">
            Material Close-Ups
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materialsImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Material Close-Up ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Details */}
      <section id="details" className="py-20 px-6 md:px-16 bg-[#F5F0ED]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-light text-stone-900 mb-12">
            Design Details
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailsImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Design Detail ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-16 bg-stone-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">
            Showcase your custom design
          </h2>
          <p className="text-xl text-stone-300 mb-10">
            Let us capture the unique elements that set your interiors apart.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-stone-900 hover:bg-stone-100 transition-all duration-200 text-sm font-medium tracking-widest uppercase"
          >
            Book a Shoot
          </Link>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

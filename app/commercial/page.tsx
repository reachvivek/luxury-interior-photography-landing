"use client";

import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

const officesImages = [
  "/images/_DSC7135.jpg",
  "/images/_DSC7175.jpg",
  "/images/_DSC7176.jpg",
];

const coworkingImages = [
  "/images/_DSC7144.jpg",
  "/images/_DSC7177.jpg",
  "/images/_DSC7179.jpg",
];

const retailImages = [
  "/images/_DSC7172.jpg",
  "/images/_DSC7180.jpg",
  "/images/_DSC7181.jpg",
];

const showroomsImages = [
  "/images/_DSC7174.jpg",
  "/images/_DSC7183.jpg",
];

export default function CommercialPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-16 bg-[#EBE6E5]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-stone-900 mb-6">
            Commercial & Industry
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Showcase your commercial space with photography that highlights design and brand identity.
          </p>
        </div>
      </section>

      {/* Office Spaces */}
      <section id="offices" className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-light text-stone-900 mb-12">
            Office Spaces
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officesImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Office Space ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-working Spaces */}
      <section id="coworking" className="py-20 px-6 md:px-16 bg-[#F5F0ED]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-light text-stone-900 mb-12">
            Co-working Spaces
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coworkingImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Co-working Space ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retail Stores */}
      <section id="retail" className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-light text-stone-900 mb-12">
            Retail Stores
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {retailImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Retail Store ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showrooms */}
      <section id="showrooms" className="py-20 px-6 md:px-16 bg-[#F5F0ED]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-light text-stone-900 mb-12">
            Showrooms
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showroomsImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Showroom ${index + 1}`}
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
            Elevate your commercial space
          </h2>
          <p className="text-xl text-stone-300 mb-10">
            Professional photography that showcases your business in the best light.
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

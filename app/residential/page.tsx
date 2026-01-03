"use client";

import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

const villasImages = [
  "/images/_DSC4745.jpg",
  "/images/_DSC4761.jpg",
  "/images/_DSC4762.jpg",
  "/images/_DSC4763.jpg",
  "/images/_DSC4764.jpg",
  "/images/_DSC4765.jpg",
];

const apartmentsImages = [
  "/images/_DSC4757.jpg",
  "/images/_DSC4766.jpg",
  "/images/_DSC4767.jpg",
  "/images/_DSC4821.jpg",
  "/images/_DSC4834.jpg",
  "/images/_DSC4845.jpg",
];

const penthousesImages = [
  "/images/_DSC4758.jpg",
  "/images/_DSC4925.JPG",
  "/images/_DSC4936.JPG",
  "/images/_DSC4937.JPG",
  "/images/_DSC4940.JPG",
];

const officesImages = [
  "/images/_DSC4759.jpg",
  "/images/_DSC5807_1.jpg",
];

export default function ResidentialPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-16 bg-[#EBE6E5]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-stone-900 mb-6">
            Residential Spaces
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Luxury villas, penthouses, and apartments captured with precision and artistry.
          </p>
        </div>
      </section>

      {/* Luxury Villas */}
      <section id="villas" className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-light text-stone-900 mb-12">
            Luxury Villas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {villasImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Luxury Villa ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apartments */}
      <section id="apartments" className="py-20 px-6 md:px-16 bg-[#F5F0ED]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-light text-stone-900 mb-12">
            Apartments
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartmentsImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Apartment ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Penthouses */}
      <section id="penthouses" className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-light text-stone-900 mb-12">
            Penthouses
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {penthousesImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Penthouse ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Home Offices */}
      <section id="offices" className="py-20 px-6 md:px-16 bg-[#F5F0ED]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-light text-stone-900 mb-12">
            Home Offices
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officesImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Home Office ${index + 1}`}
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
            Ready to showcase your property?
          </h2>
          <p className="text-xl text-stone-300 mb-10">
            Let's create stunning visuals that capture the unique character of your space.
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

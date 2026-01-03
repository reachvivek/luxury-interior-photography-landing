"use client";

import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

const suitesImages = [
  "/images/_DSC6300.jpg",
  "/images/_DSC7072.jpg",
  "/images/_DSC7075.jpg",
];

const restaurantsImages = [
  "/images/_DSC6309.jpg",
  "/images/_DSC7079.jpg",
  "/images/_DSC7081.jpg",
  "/images/_DSC7084.jpg",
];

const eventsImages = [
  "/images/_DSC6314.jpg",
  "/images/_DSC7088.jpg",
];

const lobbiesImages = [
  "/images/_DSC7069.jpg",
];

export default function HospitalityPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-16 bg-[#EBE6E5]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-stone-900 mb-6">
            Hotels & Hospitality
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Professional photography that elevates your hospitality brand and attracts guests.
          </p>
        </div>
      </section>

      {/* Hotel Suites */}
      <section id="suites" className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-light text-stone-900 mb-12">
            Hotel Suites
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suitesImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Hotel Suite ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section id="restaurants" className="py-20 px-6 md:px-16 bg-[#F5F0ED]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-light text-stone-900 mb-12">
            Restaurants
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurantsImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Restaurant ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Spaces */}
      <section id="events" className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-light text-stone-900 mb-12">
            Event Spaces
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Event Space ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lobbies */}
      <section id="lobbies" className="py-20 px-6 md:px-16 bg-[#F5F0ED]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-light text-stone-900 mb-12">
            Lobbies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lobbiesImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Lobby ${index + 1}`}
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
            Showcase your hospitality space
          </h2>
          <p className="text-xl text-stone-300 mb-10">
            Professional photography that attracts guests and elevates your brand presence.
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

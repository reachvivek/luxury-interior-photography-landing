"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

const categories = {
  offices: [
    "/images/_DSC7135.jpg",
    "/images/_DSC7175.jpg",
    "/images/_DSC7176.jpg",
  ],
  coworking: [
    "/images/_DSC7144.jpg",
    "/images/_DSC7177.jpg",
    "/images/_DSC7179.jpg",
  ],
  retail: [
    "/images/_DSC7172.jpg",
    "/images/_DSC7180.jpg",
    "/images/_DSC7181.jpg",
  ],
  showrooms: [
    "/images/_DSC7174.jpg",
    "/images/_DSC7183.jpg",
  ],
};

const tabs = [
  { id: "offices", label: "Office Spaces" },
  { id: "coworking", label: "Co-working Spaces" },
  { id: "retail", label: "Retail Stores" },
  { id: "showrooms", label: "Showrooms" },
];

export default function CommercialPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof categories>("offices");

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

      {/* Category Filters */}
      <section className="py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as keyof typeof categories)}
                className={`px-6 py-3 text-sm font-medium tracking-wide uppercase transition-all ${
                  activeTab === tab.id
                    ? "border-2 border-[#EBE6E5] bg-[#EBE6E5] text-stone-900"
                    : "border-2 border-stone-300 text-stone-600 hover:border-stone-400 hover:text-stone-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories[activeTab].map((image, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`${tabs.find(t => t.id === activeTab)?.label} ${index + 1}`}
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

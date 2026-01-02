"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import { useState } from "react";

export default function ResidentialPage() {
  const [activeTab, setActiveTab] = useState("villas");

  const categories = {
    villas: [
      { id: 1, title: "Modern Villa Entrance", image: "/images/1.png" },
      { id: 2, title: "Luxury Villa Exterior", image: "/images/2.png" },
      { id: 3, title: "Villa Pool Area", image: "/images/7.png" },
      { id: 4, title: "Villa Kitchen", image: "/images/8.png" },
      { id: 5, title: "Open Living Space", image: "/images/9.png" },
      { id: 6, title: "Architectural Staircase", image: "/images/5.png" },
    ],
    apartments: [
      { id: 1, title: "Living Room", image: "/images/4.png" },
      { id: 2, title: "Modern Kitchen", image: "/images/8.png" },
      { id: 3, title: "Open Plan Living", image: "/images/9.png" },
      { id: 4, title: "Contemporary Space", image: "/images/12.png" },
      { id: 5, title: "Dining Area", image: "/images/10.png" },
      { id: 6, title: "Interior Staircase", image: "/images/5.png" },
    ],
    penthouses: [
      { id: 1, title: "Penthouse Living", image: "/images/12.png" },
      { id: 2, title: "Rooftop Pool", image: "/images/13.png" },
      { id: 3, title: "Modern Kitchen", image: "/images/8.png" },
      { id: 4, title: "Open Living Area", image: "/images/4.png" },
      { id: 5, title: "City Views", image: "/images/13.png" },
      { id: 6, title: "Luxury Interior", image: "/images/9.png" },
    ],
    offices: [
      { id: 1, title: "Home Office", image: "/images/12.png" },
      { id: 2, title: "Creative Workspace", image: "/images/4.png" },
      { id: 3, title: "Study Area", image: "/images/9.png" },
      { id: 4, title: "Meeting Space", image: "/images/11.png" },
      { id: 5, title: "Executive Office", image: "/images/10.png" },
      { id: 6, title: "Modern Workspace", image: "/images/12.png" },
    ],
  };

  const tabs = [
    { id: "villas", label: "Luxury Villas" },
    { id: "apartments", label: "Apartments" },
    { id: "penthouses", label: "Penthouses" },
    { id: "offices", label: "Home Offices" },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-6">
            Residential Spaces
          </h1>
          <p className="text-lg sm:text-xl text-stone-600 max-w-3xl mx-auto font-inter">
            Capturing the essence of luxury living through expertly crafted photography.
            From intimate home offices to sprawling villas, we showcase residential spaces
            in their finest light.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-12 px-4 sm:px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium font-inter transition-all ${
                  activeTab === tab.id
                    ? "border border-stone-900 bg-white text-stone-900"
                    : "bg-transparent text-stone-600 hover:text-stone-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories[activeTab as keyof typeof categories].map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative aspect-[4/5] bg-stone-200 mb-4 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-serif font-medium text-stone-900">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-6">
            Ready to Showcase Your Property?
          </h2>
          <p className="text-lg text-stone-600 mb-8 font-inter">
            Let's create stunning visuals that capture the unique character of your space.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-stone-900 text-white hover:bg-stone-800 transition-all text-base font-medium font-inter"
          >
            Book a Shoot
          </Link>
        </div>
      </section>
    </div>
  );
}

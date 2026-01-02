"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import { useState } from "react";

export default function HospitalityPage() {
  const [activeTab, setActiveTab] = useState("suites");

  const categories = {
    suites: [
      { id: 1, title: "Luxury Suite Living", image: "/images/12.png" },
      { id: 2, title: "Presidential Suite", image: "/images/4.png" },
      { id: 3, title: "Suite Living Area", image: "/images/9.png" },
      { id: 4, title: "Contemporary Suite", image: "/images/12.png" },
      { id: 5, title: "Penthouse Suite", image: "/images/13.png" },
      { id: 6, title: "Elegant Interior", image: "/images/4.png" },
    ],
    restaurants: [
      { id: 1, title: "Fine Dining Space", image: "/images/10.png" },
      { id: 2, title: "Contemporary Restaurant", image: "/images/11.png" },
      { id: 3, title: "Dining Hall", image: "/images/10.png" },
      { id: 4, title: "Restaurant Interior", image: "/images/11.png" },
      { id: 5, title: "Modern Kitchen", image: "/images/8.png" },
      { id: 6, title: "Dining Area", image: "/images/9.png" },
    ],
    events: [
      { id: 1, title: "Event Space", image: "/images/11.png" },
      { id: 2, title: "Conference Hall", image: "/images/10.png" },
      { id: 3, title: "Grand Hall", image: "/images/11.png" },
      { id: 4, title: "Meeting Space", image: "/images/10.png" },
      { id: 5, title: "Banquet Area", image: "/images/9.png" },
      { id: 6, title: "VIP Lounge", image: "/images/12.png" },
    ],
  };

  const tabs = [
    { id: "suites", label: "Hotel Suites" },
    { id: "restaurants", label: "Restaurants" },
    { id: "events", label: "Event Spaces" },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-6">
            Hotels & Hospitality
          </h1>
          <p className="text-lg sm:text-xl text-stone-600 max-w-3xl mx-auto font-inter">
            Professional photography that elevates your hospitality brand. We capture the
            ambiance, elegance, and attention to detail that sets your venue apart.
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
            Showcase Your Hospitality Space
          </h2>
          <p className="text-lg text-stone-600 mb-8 font-inter">
            Professional photography that attracts guests and elevates your brand presence.
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

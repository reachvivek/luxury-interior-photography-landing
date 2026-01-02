"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import { useState } from "react";

export default function CustomInteriorsPage() {
  const [activeTab, setActiveTab] = useState("architecture");

  const categories = {
    architecture: [
      { id: 1, title: "Modern Entrance", image: "/images/1.png" },
      { id: 2, title: "Grand Exterior", image: "/images/2.png" },
      { id: 3, title: "Architectural Staircase", image: "/images/5.png" },
      { id: 4, title: "Floor-to-Ceiling Windows", image: "/images/10.png" },
      { id: 5, title: "Structural Design", image: "/images/11.png" },
      { id: 6, title: "Contemporary Architecture", image: "/images/1.png" },
    ],
    furniture: [
      { id: 1, title: "Custom Interior Design", image: "/images/4.png" },
      { id: 2, title: "Modern Furnishings", image: "/images/12.png" },
      { id: 3, title: "Elegant Staircase", image: "/images/5.png" },
      { id: 4, title: "Designer Furniture", image: "/images/9.png" },
      { id: 5, title: "Luxury Interiors", image: "/images/4.png" },
      { id: 6, title: "Contemporary Setup", image: "/images/12.png" },
    ],
    materials: [
      { id: 1, title: "Exterior Wall Detail", image: "/images/3.png" },
      { id: 2, title: "Modern Surfaces", image: "/images/8.png" },
      { id: 3, title: "Architectural Detail", image: "/images/1.png" },
      { id: 4, title: "Material Texture", image: "/images/3.png" },
      { id: 5, title: "Design Elements", image: "/images/2.png" },
      { id: 6, title: "Surface Details", image: "/images/8.png" },
    ],
    details: [
      { id: 1, title: "Interior Details", image: "/images/5.png" },
      { id: 2, title: "Design Accents", image: "/images/8.png" },
      { id: 3, title: "Architectural Elements", image: "/images/10.png" },
      { id: 4, title: "Custom Details", image: "/images/11.png" },
      { id: 5, title: "Fine Craftsmanship", image: "/images/5.png" },
      { id: 6, title: "Elegant Touches", image: "/images/3.png" },
    ],
  };

  const tabs = [
    { id: "architecture", label: "Unique Architectural Elements" },
    { id: "furniture", label: "Custom Furniture Photography" },
    { id: "materials", label: "Material Close-Ups" },
    { id: "details", label: "Design Details" },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-6">
            Custom Interiors
          </h1>
          <p className="text-lg sm:text-xl text-stone-600 max-w-3xl mx-auto font-inter">
            Capturing the finest details that make your space unique. From architectural
            elements to custom furniture, we highlight the craftsmanship and artistry
            of your interior design.
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
            Showcase Your Custom Design
          </h2>
          <p className="text-lg text-stone-600 mb-8 font-inter">
            Let us capture the unique elements that set your interiors apart.
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

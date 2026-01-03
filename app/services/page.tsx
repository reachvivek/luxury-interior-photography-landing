"use client";

import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

const services = [
  {
    title: "Interior Photography",
    description: "Professional photography that captures the essence of your interior spaces with precision lighting and expert composition.",
    features: [
      "High-resolution images",
      "Professional lighting setups",
      "Multiple angles and perspectives",
      "Same-day delivery option available",
    ],
    image: "/images/_DSC4745.jpg",
  },
  {
    title: "Architectural Photography",
    description: "Showcase your architectural projects with stunning imagery that highlights design details and spatial relationships.",
    features: [
      "Exterior and interior shots",
      "Drone photography available",
      "Twilight photography",
      "HDR processing",
    ],
    image: "/images/_DSC7135.jpg",
  },
  {
    title: "Real Estate Photography",
    description: "Increase property appeal with professional photography designed to attract buyers and boost sales.",
    features: [
      "Virtual staging available",
      "360-degree virtual tours",
      "Floorplan photography",
      "Optimized for MLS listings",
    ],
    image: "/images/_DSC4757.jpg",
  },
  {
    title: "Hospitality Photography",
    description: "Capture the ambiance and luxury of hotels, restaurants, and event spaces to attract guests and clients.",
    features: [
      "Hotel room photography",
      "Restaurant and bar photography",
      "Event space documentation",
      "Lifestyle photography",
    ],
    image: "/images/_DSC6300.jpg",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-16 bg-[#EBE6E5]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-stone-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Premium interior photography services tailored for architects, developers, and luxury brands across the UAE.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto space-y-24">
          {services.map((service, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <h2 className="text-4xl font-serif font-light text-stone-900 mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 text-stone-900 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-stone-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-16 bg-stone-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-stone-300 mb-10">
            Book a consultation to discuss your photography needs.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-stone-900 hover:bg-stone-100 transition-all duration-200 text-sm font-medium tracking-widest uppercase"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

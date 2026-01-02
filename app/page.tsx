"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import CategoryCard from "@/components/CategoryCard";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "Tsurov's photography elevated our interiors to another level.",
      author: "Emily Ross",
      role: "Interior Designer"
    },
    {
      quote: "Exceptional attention to detail and lighting. Every shot tells a story.",
      author: "Michael Chen",
      role: "Architect"
    },
    {
      quote: "The images captured the essence of our luxury spaces perfectly.",
      author: "Sarah Williams",
      role: "Real Estate Developer"
    },
    {
      quote: "Professional, creative, and delivers stunning results every time.",
      author: "David Martinez",
      role: "Hotel Manager"
    },
    {
      quote: "Their work showcases our designs in the most beautiful way possible.",
      author: "Lisa Anderson",
      role: "Design Studio Owner"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const residentialSpaces = [
    { title: "Luxury Villas", image: "/images/7.png", href: "/residential#villas" },
    { title: "Apartments", image: "/images/4.png", href: "/residential#apartments" },
    { title: "Penthouses", image: "/images/13.png", href: "/residential#penthouses" },
    { title: "Home Offices", image: "/images/12.png", href: "/residential#offices" },
  ];

  const hospitalitySpaces = [
    { title: "Hotel Suites", image: "/images/12.png", href: "/hospitality#suites" },
    { title: "Restaurants", image: "/images/10.png", href: "/hospitality#restaurants" },
    { title: "Event Spaces", image: "/images/11.png", href: "/hospitality#events" },
    { title: "Event Spaces", image: "/images/10.png", href: "/hospitality#events" },
  ];

  const commercialSpaces = [
    { title: "Office Spaces", image: "/images/12.png", href: "/commercial#offices" },
    { title: "Co-working Spaces", image: "/images/11.png", href: "/commercial#coworking" },
    { title: "Retail Stores", image: "/images/9.png", href: "/commercial#retail" },
    { title: "Showrooms", image: "/images/1.png", href: "/commercial#showrooms" },
  ];

  const customInteriorsSpaces = [
    { title: "Unique Architectural Elements", image: "/images/1.png", href: "/custom-interiors#architecture" },
    { title: "Custom Furniture Photography", image: "/images/5.png", href: "/custom-interiors#furniture" },
    { title: "Material Close-Ups", image: "/images/3.png", href: "/custom-interiors#materials" },
    { title: "Design Details", image: "/images/8.png", href: "/custom-interiors#details" },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section>
        <div className="relative h-screen">
          <Image
            src="/images/hero.png"
            alt="Luxury Interior"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/50"></div>

          {/* Content */}
          <div className="relative z-10 flex items-start justify-center h-full pt-[58px] md:pt-[90px] pb-32 px-6 md:px-16">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[72px] font-serif font-light text-stone-900 mb-6 md:whitespace-nowrap">
                Exceptional Interior Photography
              </h1>
              <p className="text-lg sm:text-xl md:text-[20px] text-stone-600 mb-12 max-w-2xl mx-auto leading-relaxed tracking-wide">
                Capturing Luxury, Elegance, and Detail.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <Link
                  href="/portfolio"
                  className="px-8 py-4 bg-stone-900 text-white hover:bg-stone-800 hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium tracking-widest uppercase"
                >
                  View Portfolio
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-200 text-sm font-medium tracking-widest uppercase"
                >
                  Book a Shoot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Residential Spaces */}
      <section className="pt-12 md:pt-16 pb-12 md:pb-16 px-6 md:px-16 bg-[#F8F3F4]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-16">
            <div className="flex-1 border-t border-stone-300"></div>
            <h2 className="px-8 text-4xl md:text-5xl lg:text-[48px] font-serif font-normal text-stone-900 text-center whitespace-nowrap">
              Residential Spaces
            </h2>
            <div className="flex-1 border-t border-stone-300"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {residentialSpaces.map((space) => (
              <CategoryCard
                key={space.title}
                title={space.title}
                image={space.image}
                href={space.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Hotels & Hospitality */}
      <section className="pt-4 md:pt-6 pb-12 md:pb-16 px-6 md:px-16 bg-[#F8F3F4]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-16">
            <div className="flex-1 border-t border-stone-300"></div>
            <h2 className="px-8 text-4xl md:text-5xl lg:text-[48px] font-serif font-normal text-stone-900 text-center whitespace-nowrap">
              Hotels & Hospitality
            </h2>
            <div className="flex-1 border-t border-stone-300"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {hospitalitySpaces.map((space, index) => (
              <CategoryCard
                key={`${space.title}-${index}`}
                title={space.title}
                image={space.image}
                href={space.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Commercial & Industry */}
      <section className="pt-4 md:pt-6 pb-12 md:pb-16 px-6 md:px-16 bg-[#F8F3F4]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-16">
            <div className="flex-1 border-t border-stone-300"></div>
            <h2 className="px-8 text-4xl md:text-5xl lg:text-[48px] font-serif font-normal text-stone-900 text-center whitespace-nowrap">
              Commercial & Industry
            </h2>
            <div className="flex-1 border-t border-stone-300"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {commercialSpaces.map((space) => (
              <CategoryCard
                key={space.title}
                title={space.title}
                image={space.image}
                href={space.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Custom Interiors */}
      <section className="pt-4 md:pt-6 pb-16 md:pb-20 px-6 md:px-16 bg-[#F8F3F4]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-16">
            <div className="flex-1 border-t border-stone-300"></div>
            <h2 className="px-8 text-4xl md:text-5xl lg:text-[48px] font-serif font-normal text-stone-900 text-center whitespace-nowrap">
              Custom Interiors
            </h2>
            <div className="flex-1 border-t border-stone-300"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {customInteriorsSpaces.map((space) => (
              <CategoryCard
                key={space.title}
                title={space.title}
                image={space.image}
                href={space.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 px-6 md:px-16 bg-stone-100">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="relative min-h-[200px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
                  index === currentTestimonial ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <blockquote className="text-3xl md:text-4xl font-serif font-light italic text-stone-700 mb-8 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <p className="text-lg text-stone-500 tracking-wide">
                  — {testimonial.author}, {testimonial.role}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-stone-900 w-8' : 'bg-stone-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

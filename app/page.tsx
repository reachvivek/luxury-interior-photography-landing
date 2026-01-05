"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryPreview from "@/components/CategoryPreview";
import Footer from "@/components/layout/Footer";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { residentialSpaces, hospitalitySpaces, commercialSpaces, customInteriorsSpaces } from "@/data/categories";
import { trustedByLogos } from "@/data/trustedBy";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Home() {
  // Scroll animations
  const howItWorksAnimation = useScrollAnimation(0.2);
  const whyChooseUsAnimation = useScrollAnimation(0.2);
  const valueStatementAnimation = useScrollAnimation(0.2);
  const trustedByAnimation = useScrollAnimation(0.2);
  const portfolioDividerAnimation = useScrollAnimation(0.2);
  const ctaAnimation = useScrollAnimation(0.3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* How It Works */}
      <section id="services" className="py-20 md:py-32 px-6 md:px-16 bg-gradient-to-b from-stone-50 to-white">
        <div
          ref={howItWorksAnimation.elementRef}
          className={`max-w-6xl mx-auto w-full transition-all duration-1000 ease-out ${
            howItWorksAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Decorative Line */}
          <div className="flex justify-center mb-8">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-600 to-transparent"></div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 text-center mb-16 md:mb-20">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {/* Step 01 */}
            <div className={`relative bg-white border-2 border-stone-200/80 rounded-2xl p-10 transition-all duration-500 hover:border-amber-600/40 hover:shadow-2xl hover:shadow-amber-600/5 group ${
              howItWorksAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Step Number Badge */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-600/30 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-white text-lg font-serif font-light">01</span>
                </div>
              </div>

              {/* Vertical Accent Line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-600/20 via-amber-600/5 to-transparent rounded-l-2xl group-hover:from-amber-600/40 transition-all duration-500"></div>

              <div className="text-center pt-8">
                <h3 className="text-2xl font-serif font-light text-stone-900 mb-3 group-hover:text-amber-900 transition-colors">Consultation</h3>
                <div className="flex justify-center mb-5">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-600/30 to-transparent group-hover:w-24 transition-all duration-500"></div>
                </div>
                <p className="text-xs text-amber-700/70 font-medium tracking-wider uppercase mb-4 group-hover:text-amber-700 transition-colors">
                  Understanding Your Requirements
                </p>
                <p className="text-stone-600 text-sm leading-relaxed">
                  We discuss your space, objectives, and photography requirements to align on what needs to be captured.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div className={`relative bg-white border-2 border-stone-200/80 rounded-2xl p-10 transition-all duration-500 hover:border-amber-600/40 hover:shadow-2xl hover:shadow-amber-600/5 group ${
              howItWorksAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>
              {/* Step Number Badge */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-600/30 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-white text-lg font-serif font-light">02</span>
                </div>
              </div>

              {/* Vertical Accent Line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-600/20 via-amber-600/5 to-transparent rounded-l-2xl group-hover:from-amber-600/40 transition-all duration-500"></div>

              <div className="text-center pt-8">
                <h3 className="text-2xl font-serif font-light text-stone-900 mb-3 group-hover:text-amber-900 transition-colors">On-Site Shoot</h3>
                <div className="flex justify-center mb-5">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-600/30 to-transparent group-hover:w-24 transition-all duration-500"></div>
                </div>
                <p className="text-xs text-amber-700/70 font-medium tracking-wider uppercase mb-4 group-hover:text-amber-700 transition-colors">
                  Lighting & Composition
                </p>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Photography session with lighting setup and multiple angles to capture each space.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className={`relative bg-white border-2 border-stone-200/80 rounded-2xl p-10 transition-all duration-500 hover:border-amber-600/40 hover:shadow-2xl hover:shadow-amber-600/5 group ${
              howItWorksAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '400ms' }}>
              {/* Step Number Badge */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-600/30 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-white text-lg font-serif font-light">03</span>
                </div>
              </div>

              {/* Vertical Accent Line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-600/20 via-amber-600/5 to-transparent rounded-l-2xl group-hover:from-amber-600/40 transition-all duration-500"></div>

              <div className="text-center pt-8">
                <h3 className="text-2xl font-serif font-light text-stone-900 mb-3 group-hover:text-amber-900 transition-colors">Curated Delivery</h3>
                <div className="flex justify-center mb-5">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-600/30 to-transparent group-hover:w-24 transition-all duration-500"></div>
                </div>
                <p className="text-xs text-amber-700/70 font-medium tracking-wider uppercase mb-4 group-hover:text-amber-700 transition-colors">
                  Ready-to-Use Images
                </p>
                <p className="text-stone-600 text-sm leading-relaxed">
                  High-resolution files edited and delivered for your portfolio, website, and marketing use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 px-6 md:px-16 bg-white">
        <div
          ref={whyChooseUsAnimation.elementRef}
          className="max-w-6xl mx-auto w-full"
        >
          {/* Decorative Line */}
          <div className="flex justify-center mb-8">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-600 to-transparent"></div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 text-center mb-16 md:mb-20">
            Why Choose Us
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 01 */}
            <div className="relative bg-gradient-to-br from-stone-50 to-stone-100/50 border border-stone-200/60 rounded-xl p-8 transition-all duration-500 hover:shadow-xl hover:border-amber-600/30 hover:-translate-y-1 group overflow-hidden">
              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-600/5 to-transparent rounded-bl-[60px] transition-all duration-500 group-hover:from-amber-600/10"></div>

              <div className="relative">
                <div className="text-amber-600/40 text-6xl font-serif font-light mb-6 group-hover:text-amber-600/60 transition-colors duration-500">01</div>
                <div className="h-px w-12 bg-gradient-to-r from-amber-600/40 to-transparent mb-5 group-hover:w-16 transition-all duration-500"></div>
                <h3 className="text-xl font-serif font-light text-stone-900 mb-3 group-hover:text-amber-900 transition-colors">Proven Experience</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Years of experience photographing residential, hospitality, and commercial interiors across the UAE.
                </p>
              </div>
            </div>

            {/* Card 02 */}
            <div className="relative bg-gradient-to-br from-stone-50 to-stone-100/50 border border-stone-200/60 rounded-xl p-8 transition-all duration-500 hover:shadow-xl hover:border-amber-600/30 hover:-translate-y-1 group overflow-hidden">
              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-600/5 to-transparent rounded-bl-[60px] transition-all duration-500 group-hover:from-amber-600/10"></div>

              <div className="relative">
                <div className="text-amber-600/40 text-6xl font-serif font-light mb-6 group-hover:text-amber-600/60 transition-colors duration-500">02</div>
                <div className="h-px w-12 bg-gradient-to-r from-amber-600/40 to-transparent mb-5 group-hover:w-16 transition-all duration-500"></div>
                <h3 className="text-xl font-serif font-light text-stone-900 mb-3 group-hover:text-amber-900 transition-colors">Transparent Payments</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  50% upfront, 50% upon delivery. No hidden fees.
                </p>
              </div>
            </div>

            {/* Card 03 */}
            <div className="relative bg-gradient-to-br from-stone-50 to-stone-100/50 border border-stone-200/60 rounded-xl p-8 transition-all duration-500 hover:shadow-xl hover:border-amber-600/30 hover:-translate-y-1 group overflow-hidden">
              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-600/5 to-transparent rounded-bl-[60px] transition-all duration-500 group-hover:from-amber-600/10"></div>

              <div className="relative">
                <div className="text-amber-600/40 text-6xl font-serif font-light mb-6 group-hover:text-amber-600/60 transition-colors duration-500">03</div>
                <div className="h-px w-12 bg-gradient-to-r from-amber-600/40 to-transparent mb-5 group-hover:w-16 transition-all duration-500"></div>
                <h3 className="text-xl font-serif font-light text-stone-900 mb-3 group-hover:text-amber-900 transition-colors">First-Time Client Offer</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  First-time clients receive a 20% discount on their first project.
                </p>
              </div>
            </div>

            {/* Card 04 */}
            <div className="relative bg-gradient-to-br from-stone-50 to-stone-100/50 border border-stone-200/60 rounded-xl p-8 transition-all duration-500 hover:shadow-xl hover:border-amber-600/30 hover:-translate-y-1 group overflow-hidden">
              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-600/5 to-transparent rounded-bl-[60px] transition-all duration-500 group-hover:from-amber-600/10"></div>

              <div className="relative">
                <div className="text-amber-600/40 text-6xl font-serif font-light mb-6 group-hover:text-amber-600/60 transition-colors duration-500">04</div>
                <div className="h-px w-12 bg-gradient-to-r from-amber-600/40 to-transparent mb-5 group-hover:w-16 transition-all duration-500"></div>
                <h3 className="text-xl font-serif font-light text-stone-900 mb-3 group-hover:text-amber-900 transition-colors">Fast Turnaround</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Short lead times and efficient post-production ensure timely delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 md:py-32 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div
            ref={valueStatementAnimation.elementRef}
            className={`text-center transition-all duration-1000 ease-out ${
              valueStatementAnimation.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Decorative Line */}
            <div className="flex justify-center mb-8">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-600 to-transparent"></div>
            </div>

            {/* Section Label */}
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-500 mb-8">
              About Us
            </p>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 leading-tight mb-12 max-w-4xl mx-auto">
              We capture your spaces with precision, artistry, and vision.
            </h2>

            {/* Description Paragraphs */}
            <div className="max-w-4xl mx-auto space-y-6 text-stone-600 leading-relaxed">
              <p className="text-base md:text-lg">
                Tsurov is passionate about transforming interior spaces into captivating visual stories. With a keen eye for detail and a commitment to excellence, specializing in creating stunning architectural and interior photography that showcases luxury. Every project brings a harmonious blend of technical expertise and artistic vision, ensuring that each image delivered reflects the unique character and elegance of the space.
              </p>
              <p className="text-base md:text-lg">
                With an unwavering dedication to craftsmanship and innovation, Tsurov has earned a reputation for delivering exceptional results across the UAE. From elegant residential properties to cutting-edge commercial developments, seamlessly integrating timeless composition with contemporary techniques. By meticulously capturing every detail of the design, exceeding expectations, bringing your vision to life and creating imagery that inspires, elevates your brand, and truly embodies the essence of luxury.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 md:py-20 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div
            ref={trustedByAnimation.elementRef}
            className={`transition-all duration-1000 ease-out ${
              trustedByAnimation.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-center text-xs md:text-sm text-stone-400 tracking-widest uppercase mb-10">
              Trusted By
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-12 items-center">
              {trustedByLogos.map((logo, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-700 ${
                    trustedByAnimation.isVisible ? 'translate-y-0' : 'translate-y-4'
                  }`}
                  style={{
                    transitionDelay: trustedByAnimation.isVisible ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 md:py-32 px-6 md:px-16 bg-white">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header */}
          <div
            ref={portfolioDividerAnimation.elementRef}
            className={`text-center mb-12 md:mb-16 transition-all duration-1000 ease-out ${
              portfolioDividerAnimation.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Decorative Line */}
            <div className="flex justify-center mb-8">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-600 to-transparent"></div>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 mb-6">
              Portfolio
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Explore our work across four main categories
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <CategoryPreview
              title="Residential"
              href="/residential"
              spaces={residentialSpaces}
            />

            <CategoryPreview
              title="Hotels & Hospitality"
              href="/hospitality"
              spaces={hospitalitySpaces}
            />

            <CategoryPreview
              title="Commercial"
              href="/commercial"
              spaces={commercialSpaces}
            />

            <CategoryPreview
              title="Custom Interiors"
              href="/custom-interiors"
              spaces={customInteriorsSpaces}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Final CTA */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-16">
        <Image
          src="/images/_DSC7185.jpg"
          alt="Interior Photography Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div
          ref={ctaAnimation.elementRef}
          className={`relative z-10 max-w-3xl mx-auto text-center w-full transition-all duration-1000 ease-out ${
            ctaAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-8">
            Ready to elevate your space?
          </h2>
          <p className="text-lg text-stone-200 mb-10">
            Schedule a consultation to discuss your project and vision.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-stone-900 hover:bg-stone-100 hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium tracking-widest uppercase rounded-full"
          >
            Request Availability
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

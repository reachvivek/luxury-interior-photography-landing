"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Footer from "@/components/layout/Footer";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ScrollToTop from "@/components/ui/ScrollToTop";
import JournalCard from "@/components/cards/JournalCard";
import ProcessStep from "@/components/cards/ProcessStep";
import FeatureCard from "@/components/cards/FeatureCard";
import { trustedByLogos } from "@/data/trustedBy";
import { journalPosts } from "@/data/journalPosts";
import { CONTACT } from "@/data/contact";
import { processSteps } from "@/data/processSteps";
import { features } from "@/data/features";
import { galleryRow1Images, galleryRow2Images } from "@/data/gallery";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Home() {
  // Scroll animations
  const howItWorksAnimation = useScrollAnimation(0.2);
  const whyChooseUsAnimation = useScrollAnimation(0.2);
  const valueStatementAnimation = useScrollAnimation(0.2);
  const trustedByAnimation = useScrollAnimation(0.2);
  const journalAnimation = useScrollAnimation(0.2);
  const ctaAnimation = useScrollAnimation(0.3);
  const service1Animation = useScrollAnimation(0.05);
  const service2Animation = useScrollAnimation(0.05);
  const service3Animation = useScrollAnimation(0.05);
  const service4Animation = useScrollAnimation(0.05);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // WhatsApp handler
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const messageText = `Hello, I'm ${formData.name}.\n\nEmail: ${formData.email}\n\n${formData.message}`;
    const whatsappURL = `${CONTACT.whatsapp.url}?text=${encodeURIComponent(messageText)}`;

    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* How It Works */}
      <section id="services" className="py-12 md:py-32 px-6 md:px-16 bg-gradient-to-b from-stone-50 to-white">
        <div
          ref={howItWorksAnimation.elementRef}
          className={`max-w-6xl mx-auto w-full transition-all duration-1000 ease-out ${
            howItWorksAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Decorative Line */}
          <div className="flex justify-center mb-4 md:mb-8">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 text-center mb-3 md:mb-6">
            How It Works
          </h2>
          <p className="text-stone-500 text-center text-xs md:text-sm mb-8 md:mb-24 max-w-xl mx-auto font-light">
            A thoughtful, streamlined process from first contact to final delivery
          </p>

          {/* Timeline Layout */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Lines Between Steps (Desktop) */}
            <div className="absolute top-12 left-0 right-0 h-px hidden lg:block">
              <div className="relative h-full max-w-5xl mx-auto">
                {/* Line segment 1→2 */}
                <div className="absolute top-0 left-[16.67%] w-[16.67%] h-px bg-stone-300/60"></div>
                {/* Line segment 2→3 */}
                <div className="absolute top-0 left-[41.67%] w-[16.67%] h-px bg-stone-300/60"></div>
                {/* Line segment 3→4 */}
                <div className="absolute top-0 left-[66.67%] w-[16.67%] h-px bg-stone-300/60"></div>
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
              {processSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`transition-all duration-700 ease-out ${
                    howItWorksAnimation.isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: howItWorksAnimation.isVisible ? `${index * 150}ms` : '0ms'
                  }}
                >
                  <ProcessStep step={step} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services - Main Directions */}
      <section className="py-12 md:py-32 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-16">
            {/* Decorative Line */}
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-amber-600 to-transparent"></div>
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 mb-3 md:mb-5">
              Services
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-stone-600 max-w-2xl mx-auto">
              Specialized photography services for every space
            </p>
          </div>
          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
            {/* Residential Photography */}
            <Link
              href="/residential"
              ref={service1Animation.elementRef}
              className={`group block rounded-xl overflow-hidden transition-all duration-1000 ease-out hover:shadow-2xl hover:-translate-y-2 ${
                service1Animation.isVisible
                  ? 'opacity-100 scale-100 shadow-xl'
                  : 'opacity-40 scale-85'
              }`}
            >
              <div className="relative aspect-[4/5] md:aspect-[3/4] max-h-[70vh] md:max-h-none overflow-hidden">
                <Image
                  src="/images/residential/penthouses/penthouse-interior-1.jpg"
                  alt="Residential Photography"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover transition-all duration-1200 ease-out group-hover:scale-110 ${
                    service1Animation.isVisible ? 'scale-100' : 'scale-120'
                  }`}
                />
                {/* Text Overlay - 2 Column Layout */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-16 pb-4 px-5 md:pt-24 md:pb-6 md:px-6">
                  <div className="flex items-end justify-between gap-4">
                    {/* Left Column - Title & Subtitle */}
                    <div className="flex-1 min-h-0">
                      <h3 className="text-xl md:text-2xl font-serif font-normal text-white mb-0">
                        Residential Photography
                      </h3>
                      {/* Subtitle: visible on mobile, hover-only on desktop */}
                      <p className="text-sm text-white/80 leading-relaxed mt-2 md:h-0 md:opacity-0 md:group-hover:h-auto md:group-hover:opacity-100 transition-all duration-500">
                        Luxury villas, apartments, and penthouses captured with elegance
                      </p>
                    </div>

                    {/* Right Column - Explore Button */}
                    <div className="flex items-center text-xs text-white/80 font-light flex-shrink-0">
                      <span>Explore</span>
                      <svg className="w-3 h-3 ml-1 translate-y-[0.5px] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Hotels Photography */}
            <Link
              href="/hospitality"
              ref={service2Animation.elementRef}
              className={`group block rounded-xl overflow-hidden transition-all duration-1000 ease-out delay-100 hover:shadow-2xl hover:-translate-y-2 ${
                service2Animation.isVisible
                  ? 'opacity-100 scale-100 shadow-xl'
                  : 'opacity-40 scale-85'
              }`}
            >
              <div className="relative aspect-[4/5] md:aspect-[3/4] max-h-[70vh] md:max-h-none overflow-hidden">
                <Image
                  src="/images/hospitality/restaurants/restaurant-dining-brick-wall.jpg"
                  alt="Hotels Photography"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover transition-all duration-1200 ease-out group-hover:scale-110 ${
                    service2Animation.isVisible ? 'scale-100' : 'scale-120'
                  }`}
                />
                {/* Text Overlay - 2 Column Layout */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-16 pb-4 px-5 md:pt-24 md:pb-6 md:px-6">
                  <div className="flex items-end justify-between gap-4">
                    {/* Left Column - Title & Subtitle */}
                    <div className="flex-1 min-h-0">
                      <h3 className="text-xl md:text-2xl font-serif font-normal text-white mb-0">
                        Hotels Photography
                      </h3>
                      {/* Subtitle: visible on mobile, hover-only on desktop */}
                      <p className="text-sm text-white/80 leading-relaxed mt-2 md:h-0 md:opacity-0 md:group-hover:h-auto md:group-hover:opacity-100 transition-all duration-500">
                        Hotel suites, restaurants, and hospitality spaces with refined detail
                      </p>
                    </div>

                    {/* Right Column - Explore Button */}
                    <div className="flex items-center text-xs text-white/80 font-light flex-shrink-0">
                      <span>Explore</span>
                      <svg className="w-3 h-3 ml-1 translate-y-[0.5px] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Commercial Photography */}
            <Link
              href="/commercial"
              ref={service3Animation.elementRef}
              className={`group block rounded-xl overflow-hidden transition-all duration-1000 ease-out delay-200 hover:shadow-2xl hover:-translate-y-2 ${
                service3Animation.isVisible
                  ? 'opacity-100 scale-100 shadow-xl'
                  : 'opacity-40 scale-85'
              }`}
            >
              <div className="relative aspect-[4/5] md:aspect-[3/4] max-h-[70vh] md:max-h-none overflow-hidden">
                <Image
                  src="/images/commercial/coworking-spaces/cofiesto-cafe-window-seating.jpg"
                  alt="Commercial Photography"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover transition-all duration-1200 ease-out group-hover:scale-110 ${
                    service3Animation.isVisible ? 'scale-100' : 'scale-120'
                  }`}
                />
                {/* Text Overlay - 2 Column Layout */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-16 pb-4 px-5 md:pt-24 md:pb-6 md:px-6">
                  <div className="flex items-end justify-between gap-4">
                    {/* Left Column - Title & Subtitle */}
                    <div className="flex-1 min-h-0">
                      <h3 className="text-xl md:text-2xl font-serif font-normal text-white mb-0">
                        Commercial Photography
                      </h3>
                      {/* Subtitle: visible on mobile, hover-only on desktop */}
                      <p className="text-sm text-white/80 leading-relaxed mt-2 md:h-0 md:opacity-0 md:group-hover:h-auto md:group-hover:opacity-100 transition-all duration-500">
                        Office spaces, retail stores, and showrooms with professional precision
                      </p>
                    </div>

                    {/* Right Column - Explore Button */}
                    <div className="flex items-center text-xs text-white/80 font-light flex-shrink-0">
                      <span>Explore</span>
                      <svg className="w-3 h-3 ml-1 translate-y-[0.5px] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Custom Interior Photography */}
            <Link
              href="/custom-interiors"
              ref={service4Animation.elementRef}
              className={`group block rounded-xl overflow-hidden transition-all duration-1000 ease-out delay-300 hover:shadow-2xl hover:-translate-y-2 ${
                service4Animation.isVisible
                  ? 'opacity-100 scale-100 shadow-xl'
                  : 'opacity-40 scale-85'
              }`}
            >
              <div className="relative aspect-[4/5] md:aspect-[3/4] max-h-[70vh] md:max-h-none overflow-hidden">
                <Image
                  src="/images/custom/design-details/luxury-chandelier-interior.jpg"
                  alt="Custom Interior Photography"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover transition-all duration-1200 ease-out group-hover:scale-110 ${
                    service4Animation.isVisible ? 'scale-100' : 'scale-120'
                  }`}
                />
                {/* Text Overlay - 2 Column Layout */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-16 pb-4 px-5 md:pt-24 md:pb-6 md:px-6">
                  <div className="flex items-end justify-between gap-4">
                    {/* Left Column - Title & Subtitle */}
                    <div className="flex-1 min-h-0">
                      <h3 className="text-xl md:text-2xl font-serif font-normal text-white mb-0">
                        Custom Interior Photography
                      </h3>
                      {/* Subtitle: visible on mobile, hover-only on desktop */}
                      <p className="text-sm text-white/80 leading-relaxed mt-2 md:h-0 md:opacity-0 md:group-hover:h-auto md:group-hover:opacity-100 transition-all duration-500">
                        Architectural elements, furniture, and design details beautifully composed
                      </p>
                    </div>

                    {/* Right Column - Explore Button */}
                    <div className="flex items-center text-xs text-white/80 font-light flex-shrink-0">
                      <span>Explore</span>
                      <svg className="w-3 h-3 ml-1 translate-y-[0.5px] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-32 px-6 md:px-16 bg-white">
        <div
          ref={whyChooseUsAnimation.elementRef}
          className="max-w-6xl mx-auto w-full"
        >
          {/* Decorative Line */}
          <div className="flex justify-center mb-4 md:mb-8">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 text-center mb-8 md:mb-20">
            Why Choose Us
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`transition-all duration-700 ease-out ${
                  whyChooseUsAnimation.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: whyChooseUsAnimation.isVisible ? `${index * 100}ms` : '0ms'
                }}
              >
                <FeatureCard feature={feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section - Brief with Read More */}
      <section id="about" className="flex items-center justify-center px-6 md:px-16 bg-gradient-to-b from-stone-50 to-white relative py-16 md:py-20">
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div
            ref={valueStatementAnimation.elementRef}
            className={`transition-all duration-1000 ease-out ${
              valueStatementAnimation.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Decorative Line */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
            </div>

            {/* Section Label */}
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-6 md:mb-8 text-center">
              About Us
            </p>

            {/* Main Heading */}
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 leading-tight mb-8 md:mb-12 max-w-4xl mx-auto px-4 text-center">
              Precision-Driven Interior Photography for Dubai's Luxury Market
            </h2>

            {/* Brief Description */}
            <p className="text-base md:text-lg text-stone-600 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
              Nashray specializes in architectural and interior photography, transforming spaces into refined visual narratives. We work with architects, developers, and luxury brands who demand excellence, creating imagery that elevates brands and drives results.
            </p>

            {/* Read More Button */}
            <div className="flex justify-center">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white hover:bg-stone-800 transition-all duration-300 text-sm font-medium tracking-wide rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Discover
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 md:py-20 bg-white overflow-hidden">
        <div className="w-full">
          <div
            ref={trustedByAnimation.elementRef}
            className={`transition-all duration-1000 ease-out ${
              trustedByAnimation.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-center text-xs md:text-sm text-stone-400 tracking-widest uppercase mb-10 px-6 md:px-16">
              Trusted By
            </p>
            {/* Infinite Scrolling Row */}
            <div className="relative overflow-hidden">
              <div className="flex gap-8 md:gap-12 animate-scroll-rtl">
                {/* Triple the logos for seamless infinite scroll */}
                {[...trustedByLogos, ...trustedByLogos, ...trustedByLogos].map((logo, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 bg-stone-50/80 border border-stone-200/60 rounded-xl hover:bg-white hover:border-stone-300 hover:shadow-lg transition-all duration-500 group overflow-hidden"
                    style={{ width: '160px', height: '160px' }}
                  >
                    <div className="relative w-full h-full grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 p-8">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        fill
                        sizes="160px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Journal Section */}
      <section className="py-12 md:py-28 px-6 md:px-16 bg-white relative">
        <div
          ref={journalAnimation.elementRef}
          className="max-w-7xl mx-auto"
        >
          {/* Decorative Line */}
          <div className="flex justify-center mb-6 md:mb-8" style={{ animation: 'fadeIn 0.6s ease-out both' }}>
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          {/* Section Label */}
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-6 md:mb-8 text-center" style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}>
            Journal
          </p>

          {/* Heading */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 leading-tight mb-4 md:mb-6 text-center" style={{ animation: 'fadeInUp 0.8s ease-out 0.15s both' }}>
            Thoughts, process, and perspectives behind our work
          </h2>

          {/* Journal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mt-12 md:mt-16">
            {journalPosts.slice(0, 3).map((post, index) => (
              <div
                key={post.id}
                className="transition-all duration-700 ease-out opacity-100"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${0.2 + index * 0.15}s both`
                }}
              >
                <JournalCard post={post} />
              </div>
            ))}
          </div>

          {/* Subtle CTA */}
          <div className="flex justify-center mt-12 md:mt-16">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm tracking-wide text-stone-700 hover:text-stone-900 transition-colors duration-300"
            >
              <span>Explore the Journal</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section id="gallery" className="py-12 md:py-20 bg-gradient-to-b from-stone-50 to-white overflow-hidden">
        <div className="mb-12 md:mb-16 px-6 md:px-16">
          {/* Decorative Line */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          {/* Section Label */}
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-4 text-center">
            Gallery
          </p>

          {/* Heading */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 leading-tight text-center">
            Selected Work
          </h2>
        </div>

        {/* Scrolling Gallery - Row 1 */}
        <div className="relative mb-4 md:mb-6 overflow-hidden">
          <div className="flex items-end gap-4 md:gap-6 animate-scroll-left">
            {[...galleryRow1Images, ...galleryRow1Images, ...galleryRow1Images].map((src, index) => {
              // Alternating pattern: big, small landscape (all 16:9)
              const isBig = index % 2 === 0;
              const sizeClasses = isBig
                ? 'w-[360px] md:w-[520px] h-[200px] md:h-[290px]' // Big 16:9
                : 'w-[280px] md:w-[400px] h-[160px] md:h-[225px]'; // Small 16:9

              return (
                <div
                  key={index}
                  className={`relative flex-shrink-0 ${sizeClasses} rounded-lg overflow-hidden group cursor-pointer`}
                >
                  <Image
                    src={src}
                    alt="Gallery work"
                    fill
                    sizes="(max-width: 768px) 360px, 520px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scrolling Gallery - Row 2 */}
        <div className="relative overflow-hidden">
          <div className="flex items-start gap-4 md:gap-6 animate-scroll-right">
            {[...galleryRow2Images, ...galleryRow2Images, ...galleryRow2Images].map((src, index) => {
              // Offset pattern for row 2: start with small, then big (all 16:9)
              const isBig = index % 2 === 1;
              const sizeClasses = isBig
                ? 'w-[360px] md:w-[520px] h-[200px] md:h-[290px]' // Big 16:9
                : 'w-[280px] md:w-[400px] h-[160px] md:h-[225px]'; // Small 16:9

              return (
                <div
                  key={index}
                  className={`relative flex-shrink-0 ${sizeClasses} rounded-lg overflow-hidden group cursor-pointer`}
                >
                  <Image
                    src={src}
                    alt="Gallery work"
                    fill
                    sizes="(max-width: 768px) 360px, 520px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="py-12 md:py-28 px-6 md:px-16 bg-gradient-to-b from-white to-stone-50 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-stone-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-stone-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Decorative Line */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          {/* Section Label */}
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-6 md:mb-8 text-center">
            Get in Touch
          </p>

          {/* Heading */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 leading-tight mb-4 md:mb-6 text-center">
            Let&apos;s Discuss Your Space
          </h2>

          {/* Subtext */}
          <p className="text-sm md:text-base text-stone-600 leading-relaxed mb-10 md:mb-12 text-center max-w-lg mx-auto">
            Share a few details and we&apos;ll thoughtfully guide the next steps.
          </p>

          {/* Desktop: Video & Form Side by Side | Mobile: Video Top, Form Bottom */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Video - Top on Mobile, Left on Desktop */}
            <div className="order-1">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/hQ0n9gxAAmc"
                  title="Nashray Photography Showreel"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>

            {/* Form Card - Bottom on Mobile, Right on Desktop */}
            <div className="order-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-stone-200/50 shadow-xl">
                <form className="space-y-6" onSubmit={handleWhatsAppSubmit}>
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs tracking-wide uppercase text-stone-500 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400/20 transition-all duration-300"
                    placeholder="Full name"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs tracking-wide uppercase text-stone-500 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400/20 transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs tracking-wide uppercase text-stone-500 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400/20 transition-all duration-300 resize-none"
                    placeholder="Tell us about your space and photography needs..."
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full md:w-auto md:min-w-[240px] px-8 py-4 bg-stone-900 text-white text-sm tracking-wide rounded-lg hover:bg-stone-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Start a Conversation
                  </button>
                </div>
              </form>

              {/* Contact info */}
              <div className="mt-10 pt-8 border-t border-stone-200/50">
                <p className="text-xs text-stone-500 text-center">
                  Or reach us directly at{' '}
                  <a href="mailto:hello@nashray.com" className="text-stone-700 hover:text-stone-900 underline">
                    hello@nashray.com
                  </a>
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-16">
        <Image
          src="/images/residential/penthouses/penthouse-interior-3.jpg"
          alt="Interior Photography Background"
          fill
          sizes="100vw"
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
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-white mb-8">
            Ready to elevate your space?
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-stone-200 mb-10">
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

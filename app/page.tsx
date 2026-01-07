"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Footer from "@/components/layout/Footer";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { trustedByLogos } from "@/data/trustedBy";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Home() {
  // Scroll animations
  const howItWorksAnimation = useScrollAnimation(0.2);
  const whyChooseUsAnimation = useScrollAnimation(0.2);
  const valueStatementAnimation = useScrollAnimation(0.2);
  const trustedByAnimation = useScrollAnimation(0.2);
  const ctaAnimation = useScrollAnimation(0.3);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // WhatsApp handler
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappNumber = '994503442505'; // Tsurov's WhatsApp number
    const messageText = `Hello, I'm ${formData.name}.\n\nEmail: ${formData.email}\n\n${formData.message}`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;

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
              {/* Consultation */}
              <div className="relative flex flex-col items-center text-center lg:items-center">
                {/* Icon Circle */}
                <div className="relative mb-3 md:mb-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-stone-200 bg-white flex items-center justify-center">
                    {/* Chat Icon */}
                    <svg className="w-7 h-7 md:w-10 md:h-10 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-base md:text-lg font-serif font-light text-stone-900 mb-1 md:mb-2">
                  Consultation
                </h3>
                <p className="text-[10px] md:text-xs text-stone-400 uppercase tracking-wider mb-2 md:mb-3 font-light">
                  Understanding Your Space
                </p>
                <p className="text-stone-600 text-xs md:text-sm leading-snug md:leading-relaxed max-w-xs font-light">
                  A brief conversation to understand your space, goals, and visual style.
                </p>
              </div>

              {/* Planning & Preparation */}
              <div className="relative flex flex-col items-center text-center lg:items-center">
                {/* Icon Circle */}
                <div className="relative mb-3 md:mb-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-stone-200 bg-white flex items-center justify-center">
                    {/* Clipboard/Planning Icon */}
                    <svg className="w-7 h-7 md:w-10 md:h-10 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-base md:text-lg font-serif font-light text-stone-900 mb-1 md:mb-2">
                  Planning & Preparation
                </h3>
                <p className="text-[10px] md:text-xs text-stone-400 uppercase tracking-wider mb-2 md:mb-3 font-light">
                  Thoughtful Setup
                </p>
                <p className="text-stone-600 text-xs md:text-sm leading-snug md:leading-relaxed max-w-xs font-light">
                  We plan angles, lighting, and timing to ensure every detail is captured beautifully.
                </p>
              </div>

              {/* On-Site Photography */}
              <div className="relative flex flex-col items-center text-center lg:items-center">
                {/* Icon Circle */}
                <div className="relative mb-3 md:mb-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-stone-200 bg-white flex items-center justify-center">
                    {/* Camera Icon */}
                    <svg className="w-7 h-7 md:w-10 md:h-10 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-base md:text-lg font-serif font-light text-stone-900 mb-1 md:mb-2">
                  On-Site Photography
                </h3>
                <p className="text-[10px] md:text-xs text-stone-400 uppercase tracking-wider mb-2 md:mb-3 font-light">
                  Professional Capture
                </p>
                <p className="text-stone-600 text-xs md:text-sm leading-snug md:leading-relaxed max-w-xs font-light">
                  A calm, efficient shoot focused on composition, light, and architectural detail.
                </p>
              </div>

              {/* Refined Delivery */}
              <div className="relative flex flex-col items-center text-center lg:items-center">
                {/* Icon Circle */}
                <div className="relative mb-3 md:mb-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-stone-200 bg-white flex items-center justify-center">
                    {/* Stacked Images Icon */}
                    <svg className="w-7 h-7 md:w-10 md:h-10 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                      {/* Back image */}
                      <rect x="4" y="6" width="12" height="12" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Middle image */}
                      <rect x="6" y="8" width="12" height="12" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Front image */}
                      <rect x="8" y="10" width="12" height="12" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-base md:text-lg font-serif font-light text-stone-900 mb-1 md:mb-2">
                  Refined Delivery
                </h3>
                <p className="text-[10px] md:text-xs text-stone-400 uppercase tracking-wider mb-2 md:mb-3 font-light">
                  Ready-to-Use Images
                </p>
                <p className="text-stone-600 text-xs md:text-sm leading-snug md:leading-relaxed max-w-xs font-light">
                  Carefully edited, high-resolution images delivered for web, print, and marketing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - Main Directions */}
      <section className="py-12 md:py-32 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            {/* Decorative Line */}
            <div className="flex justify-center mb-8">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-600 to-transparent"></div>
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 mb-5">
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
              className="group block rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative aspect-[4/5] md:aspect-[3/4] max-h-[70vh] md:max-h-none overflow-hidden">
                <Image
                  src="/images/residential/penthouses/penthouse-interior-1.jpg"
                  alt="Residential Photography"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Text Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-16 pb-4 px-5 md:pt-20 md:pb-5 md:px-6">
                  <h3 className="text-xl md:text-2xl font-serif font-normal text-white mb-1.5 md:mb-2">
                    Residential Photography
                  </h3>
                  <p className="text-sm md:text-sm text-white/80 leading-relaxed mb-2">
                    Luxury villas, apartments, and penthouses captured with elegance
                  </p>
                  <div className="flex items-center text-xs text-white/80 font-light">
                    <span>Explore</span>
                    <svg className="w-3 h-3 ml-1 translate-y-[0.5px] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Hotels Photography */}
            <Link
              href="/hospitality"
              className="group block rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative aspect-[4/5] md:aspect-[3/4] max-h-[70vh] md:max-h-none overflow-hidden">
                <Image
                  src="/images/hospitality/restaurants/restaurant-dining-brick-wall.jpg"
                  alt="Hotels Photography"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Text Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-16 pb-4 px-5 md:pt-20 md:pb-5 md:px-6">
                  <h3 className="text-xl md:text-2xl font-serif font-normal text-white mb-1.5 md:mb-2">
                    Hotels Photography
                  </h3>
                  <p className="text-sm md:text-sm text-white/80 leading-relaxed mb-2">
                    Hotel suites, restaurants, and hospitality spaces with refined detail
                  </p>
                  <div className="flex items-center text-xs text-white/80 font-light">
                    <span>Explore</span>
                    <svg className="w-3 h-3 ml-1 translate-y-[0.5px] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Commercial Photography */}
            <Link
              href="/commercial"
              className="group block rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative aspect-[4/5] md:aspect-[3/4] max-h-[70vh] md:max-h-none overflow-hidden">
                <Image
                  src="/images/commercial/coworking-spaces/cofiesto-cafe-window-seating.jpg"
                  alt="Commercial Photography"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Text Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-16 pb-4 px-5 md:pt-20 md:pb-5 md:px-6">
                  <h3 className="text-xl md:text-2xl font-serif font-normal text-white mb-1.5 md:mb-2">
                    Commercial Photography
                  </h3>
                  <p className="text-sm md:text-sm text-white/80 leading-relaxed mb-2">
                    Office spaces, retail stores, and showrooms with professional precision
                  </p>
                  <div className="flex items-center text-xs text-white/80 font-light">
                    <span>Explore</span>
                    <svg className="w-3 h-3 ml-1 translate-y-[0.5px] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Custom Interior Photography */}
            <Link
              href="/custom-interiors"
              className="group block rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative aspect-[4/5] md:aspect-[3/4] max-h-[70vh] md:max-h-none overflow-hidden">
                <Image
                  src="/images/custom/design-details/luxury-chandelier-interior.jpg"
                  alt="Custom Interior Photography"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Text Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-16 pb-4 px-5 md:pt-20 md:pb-5 md:px-6">
                  <h3 className="text-xl md:text-2xl font-serif font-normal text-white mb-1.5 md:mb-2">
                    Custom Interior Photography
                  </h3>
                  <p className="text-sm md:text-sm text-white/80 leading-relaxed mb-2">
                    Architectural elements, furniture, and design details beautifully composed
                  </p>
                  <div className="flex items-center text-xs text-white/80 font-light">
                    <span>Explore</span>
                    <svg className="w-3 h-3 ml-1 translate-y-[0.5px] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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
            {/* Card 01 */}
            <div className="relative bg-white border border-stone-200 rounded-lg p-5 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-stone-300 group">
              <div className="relative">
                <div className="text-stone-300 text-4xl md:text-6xl font-serif font-light mb-4 md:mb-6 group-hover:text-stone-400 transition-colors">01</div>
                <div className="h-px w-10 md:w-12 bg-gradient-to-r from-stone-300 to-transparent mb-3 md:mb-5"></div>
                <h3 className="text-base md:text-xl font-serif font-light text-stone-900 mb-2 md:mb-3">Proven Experience</h3>
                <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                  Years of experience photographing residential, hospitality, and commercial interiors across the UAE.
                </p>
              </div>
            </div>

            {/* Card 02 */}
            <div className="relative bg-white border border-stone-200 rounded-lg p-5 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-stone-300 group">
              <div className="relative">
                <div className="text-stone-300 text-4xl md:text-6xl font-serif font-light mb-4 md:mb-6 group-hover:text-stone-400 transition-colors">02</div>
                <div className="h-px w-10 md:w-12 bg-gradient-to-r from-stone-300 to-transparent mb-3 md:mb-5"></div>
                <h3 className="text-base md:text-xl font-serif font-light text-stone-900 mb-2 md:mb-3">Transparent Payments</h3>
                <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                  50% upfront, 50% upon delivery. No hidden fees.
                </p>
              </div>
            </div>

            {/* Card 03 */}
            <div className="relative bg-white border border-stone-200 rounded-lg p-5 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-stone-300 group">
              <div className="relative">
                <div className="text-stone-300 text-4xl md:text-6xl font-serif font-light mb-4 md:mb-6 group-hover:text-stone-400 transition-colors">03</div>
                <div className="h-px w-10 md:w-12 bg-gradient-to-r from-stone-300 to-transparent mb-3 md:mb-5"></div>
                <h3 className="text-base md:text-xl font-serif font-light text-stone-900 mb-2 md:mb-3">First-Time Client Offer</h3>
                <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                  First-time clients receive a 20% discount on their first project.
                </p>
              </div>
            </div>

            {/* Card 04 */}
            <div className="relative bg-white border border-stone-200 rounded-lg p-5 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-stone-300 group">
              <div className="relative">
                <div className="text-stone-300 text-4xl md:text-6xl font-serif font-light mb-4 md:mb-6 group-hover:text-stone-400 transition-colors">04</div>
                <div className="h-px w-10 md:w-12 bg-gradient-to-r from-stone-300 to-transparent mb-3 md:mb-5"></div>
                <h3 className="text-base md:text-xl font-serif font-light text-stone-900 mb-2 md:mb-3">Fast Turnaround</h3>
                <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                  Short lead times and efficient post-production ensure timely delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="flex items-center justify-center px-6 md:px-16 bg-gradient-to-b from-stone-50 to-white relative py-12 md:py-24">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-stone-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-stone-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
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
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 leading-tight mb-12 md:mb-16 max-w-4xl mx-auto px-4 text-center">
              We capture your spaces with precision, artistry, and vision.
            </h2>

            {/* Unified Content Card */}
            <div className="max-w-3xl mx-auto">
              {/* Image - Hero of the story */}
              <div className="relative aspect-[3/4] md:aspect-[16/10] w-full rounded-t-2xl md:rounded-t-3xl rounded-b-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/commercial/coworking-spaces/modern-workspace-lounge-seating.jpg"
                  alt="Modern workspace interior"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text Content Card - Overlapping */}
              <div className="bg-stone-50/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-stone-200/50 shadow-2xl -mt-10 mx-4 md:mx-8 relative z-10" style={{ boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.15)' }}>
                {/* Subtle Divider - Hairline */}
                <div className="flex justify-center mb-6">
                  <div className="w-6 h-px bg-stone-300"></div>
                </div>

                {/* Micro-Eyebrow */}
                <p className="text-[10px] md:text-xs tracking-[0.12em] uppercase text-stone-400 mb-6 text-left">
                  Architectural & Interior Photography
                </p>

                {/* Lead Line */}
                <p className="text-lg md:text-xl text-stone-900 font-medium leading-relaxed mb-6">
                  Tsurov specializes in architectural and interior photography.
                </p>

                {/* Body Copy - What you do */}
                <p className="text-sm md:text-base text-stone-600 leading-[1.75] mb-6 text-left">
                  We transform spaces into refined visual narratives, balancing technical precision with artistic vision.
                </p>

                {/* Body Copy - Why it matters */}
                <p className="text-sm md:text-base text-stone-600 leading-[1.75] text-left">
                  Each project showcases luxury at its finest, creating imagery that elevates brands and inspires audiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="flex items-center justify-center px-6 md:px-16 bg-gradient-to-b from-white to-stone-50 relative py-12 md:py-24">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-0 w-64 h-64 bg-stone-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-stone-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          {/* Decorative Line */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          {/* Section Label */}
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-4 md:mb-6 text-center">
            Our Approach
          </p>

          {/* Main Heading */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 leading-tight mb-12 md:mb-16 max-w-4xl mx-auto px-4 text-center">
            Intentional. Calm. Precise.
          </h2>

          {/* Desktop: 2-column, Mobile: Stacked */}
          <div className="grid md:grid-cols-2 gap-0 md:gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            {/* Image Block */}
            <div className="order-1">
              <div className="relative aspect-[5/7] md:aspect-[4/5] w-full rounded-t-2xl md:rounded-t-3xl rounded-b-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/commercial/coworking-spaces/cofiesto-cafe-window-seating.jpg"
                  alt="Interior design approach"
                  fill
                  className="object-cover"
                />
                {/* Subtle gradient at bottom for card connection */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Overlapping Content Card */}
            <div className="order-2 md:order-2">
              <div className="bg-stone-50/95 backdrop-blur-sm rounded-xl pt-10 pb-8 px-8 md:pt-12 md:pb-10 md:px-10 border border-stone-200/60 shadow-2xl -mt-10 md:mt-0 mx-4 md:mx-0 relative z-10" style={{ boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.15)' }}>
                {/* Subtle Divider - Hairline */}
                <div className="flex justify-center md:justify-start mb-8">
                  <div className="w-6 h-px bg-stone-300"></div>
                </div>

                {/* Micro-Eyebrow */}
                <p className="text-[10px] md:text-xs tracking-[0.12em] uppercase text-stone-400 mb-8 text-left">
                  Three Principles
                </p>

                {/* Principles List */}
                <div className="space-y-6 mb-8">
                  {/* Principle 1 */}
                  <div className="flex items-start gap-3">
                    <div className="w-px h-3 bg-stone-400 mt-1.5 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-stone-900 mb-1">
                        Clarity in Planning
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        Meticulous preparation for every space.
                      </p>
                    </div>
                  </div>

                  {/* Principle 2 */}
                  <div className="flex items-start gap-3">
                    <div className="w-px h-3 bg-stone-400 mt-1.5 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-stone-900 mb-1">
                        Respect for Design
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        Honoring architectural intent.
                      </p>
                    </div>
                  </div>

                  {/* Principle 3 */}
                  <div className="flex items-start gap-3">
                    <div className="w-px h-3 bg-stone-400 mt-1.5 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-stone-900 mb-1">
                        Refined Post-Production
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        Clean, timeless final imagery.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Micro-divider */}
                <div className="flex justify-center my-6">
                  <div className="w-8 h-px bg-stone-300"></div>
                </div>

                {/* Closing Paragraph */}
                <p className="text-sm md:text-base text-stone-600 leading-[1.75] text-left">
                  From refined residential interiors to contemporary commercial developments, we combine timeless composition with modern techniques to create imagery that elevates brands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 md:py-20 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-16">
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
            {/* Mobile: Auto-scrolling */}
            <div className="md:hidden overflow-hidden">
              <div className="flex gap-12 animate-scroll-rtl">
                {[...trustedByLogos, ...trustedByLogos].map((logo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center grayscale opacity-60 flex-shrink-0 min-w-[120px]"
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
            {/* Desktop: Grid */}
            <div className="hidden md:grid grid-cols-6 gap-8 md:gap-12 items-center">
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

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Journal Section */}
      <section className="py-12 md:py-28 px-6 md:px-16 bg-white relative">
        <div className="max-w-7xl mx-auto">
          {/* Decorative Line */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          {/* Section Label */}
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-6 md:mb-8 text-center">
            Journal
          </p>

          {/* Heading */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 leading-tight mb-4 md:mb-6 text-center">
            Thoughts, process, and perspectives behind our work
          </h2>

          {/* Journal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mt-12 md:mt-16">
            {/* Journal Card 1 */}
            <article className="group cursor-pointer">
              {/* Image */}
              <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-t-xl bg-stone-100">
                <Image
                  src="/images/hospitality/event-spaces/outdoor-patio-courtyard.jpg"
                  alt="Light as Language"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] tracking-wide uppercase text-stone-700 rounded-full">
                    Behind the Shoot
                  </span>
                </div>
              </div>

              {/* Content Below */}
              <div className="bg-stone-50/50 rounded-b-xl p-6 md:p-8 border border-t-0 border-stone-200/50">
                <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 leading-tight mb-3 group-hover:text-stone-700 transition-colors">
                  Light as Language: Capturing Spatial Depth
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed mb-4">
                  How we use natural and artificial light to reveal the true character of architectural spaces.
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-stone-500">
                    Jan 2026
                  </p>

                  <div className="flex items-center gap-1.5 text-stone-700 group-hover:text-stone-900 transition-colors">
                    <span className="text-xs font-light">Continue Reading</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </article>

            {/* Journal Card 2 */}
            <article className="group cursor-pointer">
              {/* Image */}
              <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-t-xl bg-stone-100">
                <Image
                  src="/images/residential/apartments/modern-apartment-building-exterior.jpg"
                  alt="Material Honesty"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] tracking-wide uppercase text-stone-700 rounded-full">
                    Design Insight
                  </span>
                </div>
              </div>

              {/* Content Below */}
              <div className="bg-stone-50/50 rounded-b-xl p-6 md:p-8 border border-t-0 border-stone-200/50">
                <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 leading-tight mb-3 group-hover:text-stone-700 transition-colors">
                  Material Honesty: Textures That Speak
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed mb-4">
                  Showcasing authentic materials and surface qualities that define contemporary interior design.
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-stone-500">
                    Dec 2025
                  </p>

                  <div className="flex items-center gap-1.5 text-stone-700 group-hover:text-stone-900 transition-colors">
                    <span className="text-xs font-light">Continue Reading</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </article>

            {/* Journal Card 3 */}
            <article className="group cursor-pointer">
              {/* Image */}
              <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-t-xl bg-stone-100">
                <Image
                  src="/images/residential/villas/luxury-villa-with-porsche.jpg"
                  alt="Preparing a Space"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] tracking-wide uppercase text-stone-700 rounded-full">
                    Process
                  </span>
                </div>
              </div>

              {/* Content Below */}
              <div className="bg-stone-50/50 rounded-b-xl p-6 md:p-8 border border-t-0 border-stone-200/50">
                <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 leading-tight mb-3 group-hover:text-stone-700 transition-colors">
                  Preparing a Space for Photography
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed mb-4">
                  Essential steps we take to ensure every space looks its absolute best before the shoot begins.
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-stone-500">
                    Nov 2025
                  </p>

                  <div className="flex items-center gap-1.5 text-stone-700 group-hover:text-stone-900 transition-colors">
                    <span className="text-xs font-light">Continue Reading</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Subtle CTA */}
          <div className="flex justify-center mt-12 md:mt-16">
            <Link
              href="/journal"
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

        {/* Scrolling Gallery - Row 1 (Left to Right) */}
        <div className="relative mb-4 md:mb-6">
          <div className="flex items-end gap-4 md:gap-6 animate-scroll-left">
            {[
              '/images/residential/penthouses/penthouse-interior-2.jpg',
              '/images/residential/villas/luxury-villa-with-porsche.jpg',
              '/images/hospitality/hotel-suites/hotel-lobby-colorful-sofas.jpg',
              '/images/commercial/retail-stores/cofiesto-storefront-exterior.jpg',
              '/images/residential/penthouses/penthouse-interior-4.jpg',
              '/images/hospitality/restaurants/restaurant-decorative-chandelier.jpg',
              '/images/commercial/coworking-spaces/cofiesto-cafe-wide-interior.jpg',
              '/images/custom/design-details/luxury-chandelier-interior.jpg',
              '/images/residential/villas/luxury-stone-villa-exterior.jpg',
              '/images/hospitality/restaurants/restaurant-dining-gallery.jpg',
              '/images/residential/penthouses/penthouse-interior-2.jpg',
              '/images/residential/villas/luxury-villa-with-porsche.jpg',
              '/images/hospitality/hotel-suites/hotel-lobby-colorful-sofas.jpg',
              '/images/commercial/retail-stores/cofiesto-storefront-exterior.jpg',
              '/images/residential/penthouses/penthouse-interior-4.jpg',
              '/images/hospitality/restaurants/restaurant-decorative-chandelier.jpg',
              '/images/commercial/coworking-spaces/cofiesto-cafe-wide-interior.jpg',
              '/images/custom/design-details/luxury-chandelier-interior.jpg',
              '/images/residential/villas/luxury-stone-villa-exterior.jpg',
              '/images/hospitality/restaurants/restaurant-dining-gallery.jpg',
              '/images/residential/penthouses/penthouse-interior-2.jpg',
              '/images/residential/villas/luxury-villa-with-porsche.jpg',
              '/images/hospitality/hotel-suites/hotel-lobby-colorful-sofas.jpg',
              '/images/commercial/retail-stores/cofiesto-storefront-exterior.jpg',
              '/images/residential/penthouses/penthouse-interior-4.jpg',
              '/images/hospitality/restaurants/restaurant-decorative-chandelier.jpg',
              '/images/commercial/coworking-spaces/cofiesto-cafe-wide-interior.jpg',
              '/images/custom/design-details/luxury-chandelier-interior.jpg',
              '/images/residential/villas/luxury-stone-villa-exterior.jpg',
              '/images/hospitality/restaurants/restaurant-dining-gallery.jpg',
            ].map((src, index) => {
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
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scrolling Gallery - Row 2 (Right to Left) */}
        <div className="relative">
          <div className="flex items-start gap-4 md:gap-6 animate-scroll-right">
            {[
              '/images/hospitality/event-spaces/lake-resort-panoramic-view-1.jpg',
              '/images/residential/penthouses/penthouse-interior-1.jpg',
              '/images/commercial/retail-stores/retail-store-product-shelving.jpg',
              '/images/residential/villas/stone-villa-entrance-car.jpg',
              '/images/hospitality/restaurants/salt-restaurant-outdoor-terrace-1.jpg',
              '/images/custom/architectural-elements/bridge-pool-cityscape-sunset.jpg',
              '/images/commercial/coworking-spaces/cofiesto-cafe-seating-area.jpg',
              '/images/hospitality/hotel-suites/hotel-courtyard-fountain-night.jpg',
              '/images/residential/penthouses/penthouse-interior-3.jpg',
              '/images/hospitality/event-spaces/cityscape-sunset-view.jpg',
              '/images/hospitality/event-spaces/lake-resort-panoramic-view-1.jpg',
              '/images/residential/penthouses/penthouse-interior-1.jpg',
              '/images/commercial/retail-stores/retail-store-product-shelving.jpg',
              '/images/residential/villas/stone-villa-entrance-car.jpg',
              '/images/hospitality/restaurants/salt-restaurant-outdoor-terrace-1.jpg',
              '/images/custom/architectural-elements/bridge-pool-cityscape-sunset.jpg',
              '/images/commercial/coworking-spaces/cofiesto-cafe-seating-area.jpg',
              '/images/hospitality/hotel-suites/hotel-courtyard-fountain-night.jpg',
              '/images/residential/penthouses/penthouse-interior-3.jpg',
              '/images/hospitality/event-spaces/cityscape-sunset-view.jpg',
              '/images/hospitality/event-spaces/lake-resort-panoramic-view-1.jpg',
              '/images/residential/penthouses/penthouse-interior-1.jpg',
              '/images/commercial/retail-stores/retail-store-product-shelving.jpg',
              '/images/residential/villas/stone-villa-entrance-car.jpg',
              '/images/hospitality/restaurants/salt-restaurant-outdoor-terrace-1.jpg',
              '/images/custom/architectural-elements/bridge-pool-cityscape-sunset.jpg',
              '/images/commercial/coworking-spaces/cofiesto-cafe-seating-area.jpg',
              '/images/hospitality/hotel-suites/hotel-courtyard-fountain-night.jpg',
              '/images/residential/penthouses/penthouse-interior-3.jpg',
              '/images/hospitality/event-spaces/cityscape-sunset-view.jpg',
            ].map((src, index) => {
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

        <div className="max-w-2xl mx-auto relative z-10">
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

          {/* Form Card */}
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
                <a href="mailto:hello@tsurov.com" className="text-stone-700 hover:text-stone-900 underline">
                  hello@tsurov.com
                </a>
              </p>
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
          <h2 className="text-2xl md:text-4xl font-serif font-light text-white mb-8">
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

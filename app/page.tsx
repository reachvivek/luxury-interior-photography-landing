"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import CategorySection from "@/components/CategorySection";
import Footer from "@/components/layout/Footer";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { residentialSpaces, hospitalitySpaces, commercialSpaces, customInteriorsSpaces } from "@/data/categories";
import { trustedByLogos } from "@/data/trustedBy";
import { ANIMATION } from "@/constants/animation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const heroRotatingPhrases = [
  "Elevates Design",
  "Tells Your Story",
  "Converts Buyers",
  "Defines Luxury",
  "Sells Properties"
];

export default function Home() {
  // Scroll animations
  const valueStatementAnimation = useScrollAnimation(0.2);
  const trustedByAnimation = useScrollAnimation(0.2);
  const portfolioDividerAnimation = useScrollAnimation(0.2);
  const howItWorksAnimation = useScrollAnimation(0.2);
  const ctaAnimation = useScrollAnimation(0.3);

  // Hero rotating text
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  // Smooth scroll to next section
  const scrollToNextSection = () => {
    const start = window.scrollY;
    const target = window.innerHeight;
    const duration = 3000; // 3 seconds
    const startTime = performance.now();

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const scroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, start + (target - start) * eased);

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  // Featured image state for each section
  const [residentialIndex, setResidentialIndex] = useState(0);
  const [hospitalityIndex, setHospitalityIndex] = useState(0);
  const [commercialIndex, setCommercialIndex] = useState(0);
  const [customIndex, setCustomIndex] = useState(0);

  // Auto-rotate hero text
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % heroRotatingPhrases.length);
    }, 3000); // Change phrase every 3 seconds

    return () => clearInterval(timer);
  }, []);

  // Auto-rotate featured images
  useEffect(() => {
    const timer = setInterval(() => {
      setResidentialIndex((prev) => (prev + 1) % residentialSpaces.length);
      setHospitalityIndex((prev) => (prev + 1) % hospitalitySpaces.length);
      setCommercialIndex((prev) => (prev + 1) % commercialSpaces.length);
      setCustomIndex((prev) => (prev + 1) % customInteriorsSpaces.length);
    }, ANIMATION.CATEGORY_ROTATION);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen">
        {/* Desktop Image */}
        <div className="hidden md:block relative w-full aspect-[16/11]">
          <Image
            src="/images/_DSC4757.jpg"
            alt="Luxury Interior"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/50"></div>
        </div>

        {/* Mobile Image - Full Height */}
        <div className="md:hidden relative w-full h-screen">
          <Image
            src="/images/_DSC4757.jpg"
            alt="Luxury Interior"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/50"></div>
        </div>

          {/* Content */}
          <div className="absolute inset-0 z-10 h-full px-6 md:px-16">
            {/* Desktop Layout - text + button centered */}
            <div className="hidden md:flex md:items-start md:justify-center md:h-full md:pt-[90px] md:pb-32">
              <div className="max-w-5xl mx-auto text-center mt-2">
                {/* <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[72px] font-serif font-light text-[stone]-900 mb-6 md:whitespace-nowrap">
                  Photography that{" "}
                  <span
                    key={currentPhraseIndex}
                    className="inline-block animate-[fadeIn_0.7s_ease-in]"
                  >
                    {heroRotatingPhrases[currentPhraseIndex]}
                  </span>
                </h1> */}
                {/* <p className="text-lg sm:text-xl md:text-[20px] text-stone-600 mb-12 max-w-2xl mx-auto leading-relaxed tracking-wide">
                  For architects, developers, and luxury brands who demand excellence.
                </p> */}
                <div className="flex flex-col items-center gap-4 mt-32">
                  {/* <Link
                    href="/contact"
                    className="px-8 py-4 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-200 text-sm font-medium tracking-widest uppercase"
                  >
                    Book a Shoot
                  </Link> */}
                  {/* <p className="text-xs text-stone-500 tracking-wide">
                    Trusted by architects, developers, and hospitality brands across the UAE
                  </p> */}
                </div>
              </div>
            </div>

            {/* Mobile Layout - text at top, button at bottom */}
            <div className="md:hidden flex flex-col justify-between h-full pt-36 pb-8">
              <div className="w-full text-center px-4 pt-2">
                {/* <h1 className="text-4xl font-serif font-light text-stone-900 mb-4 leading-tight">
                  Photography that{" "}
                  <span
                    key={currentPhraseIndex}
                    className="inline-block animate-[fadeIn_0.7s_ease-in]"
                  >
                    {heroRotatingPhrases[currentPhraseIndex]}
                  </span>
                </h1>
                <p className="text-base text-stone-600 leading-relaxed">
                  For architects, developers, and luxury brands who demand excellence.
                </p> */}
              </div>

              <div className="flex flex-col items-center gap-3 pb-20">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-200 text-xs font-medium tracking-widest uppercase"
                >
                  Book a Shoot
                </Link>
                <p className="text-xs text-stone-500 tracking-wide">
                  Trusted by brands across the UAE
                </p>
              </div>
            </div>
          </div>

        {/* Scroll Down Arrow */}
        <button
          onClick={scrollToNextSection}
          className="absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group cursor-pointer animate-bounce"
          style={{ top: 'calc(100vh - 52px)' }}
          aria-label="Scroll to next section"
        >
          <svg
            className="w-8 h-8 text-stone-600 group-hover:text-stone-900 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </section>

      {/* Value Statement & Trusted By */}
      <section id="about" className="py-16 md:py-20 px-6 md:px-16 bg-[#FFF8F2]">
        <div className="max-w-6xl mx-auto">
          {/* Value Statement */}
          <div
            ref={valueStatementAnimation.elementRef}
            className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ease-out ${
              valueStatementAnimation.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-xl md:text-2xl font-serif font-light text-stone-800 leading-relaxed">
              Precision-driven interior photography for architects, developers, and luxury brands.
            </p>
            <p className="text-sm md:text-base text-stone-500 mt-6 tracking-wide">
              Based in Dubai. Working across the UAE & beyond.
            </p>
          </div>

          {/* Trusted By */}
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

      {/* Portfolio Divider */}
      <section id="portfolio" className="py-24 px-6 md:px-16 bg-[#FFF8F2]">
        <div
          ref={portfolioDividerAnimation.elementRef}
          className={`max-w-7xl mx-auto text-center transition-all duration-1000 ease-out ${
            portfolioDividerAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center mb-8">
            <div className="flex-1 border-t border-stone-300"></div>
            <h2 className="px-8 text-5xl md:text-6xl lg:text-[64px] font-serif font-light text-stone-900">
              Portfolio
            </h2>
            <div className="flex-1 border-t border-stone-300"></div>
          </div>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-6">
            Explore our curated collection of interior photography showcasing luxury spaces across different categories
          </p>
          <p className="text-sm text-stone-400 tracking-wider">
            150+ projects across residential, hospitality, and commercial spaces
          </p>
        </div>
      </section>

      <CategorySection
        title="Residential Spaces"
        spaces={residentialSpaces}
        currentIndex={residentialIndex}
        onIndexChange={setResidentialIndex}
        onNext={() => setResidentialIndex((prev) => (prev + 1) % residentialSpaces.length)}
        onPrevious={() => setResidentialIndex((prev) => (prev - 1 + residentialSpaces.length) % residentialSpaces.length)}
      />

      <CategorySection
        title="Hotels & Hospitality"
        spaces={hospitalitySpaces}
        currentIndex={hospitalityIndex}
        onIndexChange={setHospitalityIndex}
        onNext={() => setHospitalityIndex((prev) => (prev + 1) % hospitalitySpaces.length)}
        onPrevious={() => setHospitalityIndex((prev) => (prev - 1 + hospitalitySpaces.length) % hospitalitySpaces.length)}
      />

      <CategorySection
        title="Commercial & Industry"
        spaces={commercialSpaces}
        currentIndex={commercialIndex}
        onIndexChange={setCommercialIndex}
        onNext={() => setCommercialIndex((prev) => (prev + 1) % commercialSpaces.length)}
        onPrevious={() => setCommercialIndex((prev) => (prev - 1 + commercialSpaces.length) % commercialSpaces.length)}
      />

      <CategorySection
        title="Custom Interiors"
        spaces={customInteriorsSpaces}
        currentIndex={customIndex}
        onIndexChange={setCustomIndex}
        onNext={() => setCustomIndex((prev) => (prev + 1) % customInteriorsSpaces.length)}
        onPrevious={() => setCustomIndex((prev) => (prev - 1 + customInteriorsSpaces.length) % customInteriorsSpaces.length)}
      />

      {/* How It Works */}
      <section id="services" className="min-h-screen flex items-center justify-center px-6 md:px-16 bg-[#F5F0ED]">
        <div
          ref={howItWorksAnimation.elementRef}
          className={`max-w-6xl mx-auto w-full transition-all duration-1000 ease-out ${
            howItWorksAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-900 text-center mb-16 md:mb-20">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <div className={`text-center transition-all duration-700 delay-100 ${
              howItWorksAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="text-stone-300 text-6xl md:text-7xl font-serif font-light mb-6">01</div>
              <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 mb-2">Consultation</h3>
              <p className="text-sm text-stone-500 font-medium tracking-wide mb-4">
                Understanding Your Vision & Requirements
              </p>
              <p className="text-stone-600 leading-relaxed">
                We discuss your space, brand, and specific needs to ensure every detail is captured perfectly.
              </p>
            </div>
            <div className={`text-center transition-all duration-700 delay-300 ${
              howItWorksAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="text-stone-300 text-6xl md:text-7xl font-serif font-light mb-6">02</div>
              <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 mb-2">On-Site Shoot</h3>
              <p className="text-sm text-stone-500 font-medium tracking-wide mb-4">
                Precision Lighting & Composition
              </p>
              <p className="text-stone-600 leading-relaxed">
                Professional photography session with expert lighting and angles tailored to your design.
              </p>
            </div>
            <div className={`text-center transition-all duration-700 delay-500 ${
              howItWorksAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="text-stone-300 text-6xl md:text-7xl font-serif font-light mb-6">03</div>
              <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 mb-2">Curated Delivery</h3>
              <p className="text-sm text-stone-500 font-medium tracking-wide mb-4">
                Polished, Ready-to-Use Images
              </p>
              <p className="text-stone-600 leading-relaxed">
                High-resolution files expertly edited for portfolio, marketing, and publication.
              </p>
            </div>
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
            className="inline-block px-10 py-4 bg-white text-stone-900 hover:bg-stone-100 hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium tracking-widest uppercase"
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

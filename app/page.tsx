"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import CategorySection from "@/components/CategorySection";
import Footer from "@/components/layout/Footer";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { residentialSpaces, hospitalitySpaces, commercialSpaces, customInteriorsSpaces } from "@/data/categories";
import { trustedByLogos } from "@/data/trustedBy";
import { ANIMATION } from "@/constants/animation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Home() {
  // Scroll animations
  const howItWorksAnimation = useScrollAnimation(0.2);
  const whyChooseUsAnimation = useScrollAnimation(0.2);
  const valueStatementAnimation = useScrollAnimation(0.2);
  const trustedByAnimation = useScrollAnimation(0.2);
  const portfolioDividerAnimation = useScrollAnimation(0.2);
  const ctaAnimation = useScrollAnimation(0.3);

  // Featured image state for each section
  const [residentialIndex, setResidentialIndex] = useState(0);
  const [hospitalityIndex, setHospitalityIndex] = useState(0);
  const [commercialIndex, setCommercialIndex] = useState(0);
  const [customIndex, setCustomIndex] = useState(0);

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
    <div className="min-h-screen bg-white">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* How It Works */}
      <section id="services" className="py-20 md:py-32 px-6 md:px-16 bg-white">
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

          {/* Section Label */}
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-500 mb-8 text-center">
            How We Work
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 text-center mb-16 md:mb-20">
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

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 px-6 md:px-16 bg-stone-50">
        <div
          ref={whyChooseUsAnimation.elementRef}
          className={`max-w-6xl mx-auto w-full transition-all duration-1000 ease-out ${
            whyChooseUsAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Decorative Line */}
          <div className="flex justify-center mb-8">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-600 to-transparent"></div>
          </div>

          {/* Section Label */}
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-500 mb-8 text-center">
            Why Clients Choose Us
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 text-center mb-16 md:mb-20">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-10">
            <div className={`text-center transition-all duration-700 delay-100 ${
              whyChooseUsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="text-stone-300 text-6xl md:text-7xl font-serif font-light mb-6">01</div>
              <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 mb-2">Extensive Experience</h3>
              <p className="text-sm text-stone-500 font-medium tracking-wide mb-4">
                Professional Expertise You Can Trust
              </p>
              <p className="text-stone-600 leading-relaxed">
                Years of experience capturing luxury interiors across the UAE, with a proven track record in residential, hospitality, and commercial photography.
              </p>
            </div>
            <div className={`text-center transition-all duration-700 delay-200 ${
              whyChooseUsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="text-stone-300 text-6xl md:text-7xl font-serif font-light mb-6">02</div>
              <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 mb-2">Transparent Payments</h3>
              <p className="text-sm text-stone-500 font-medium tracking-wide mb-4">
                Simple, Fair Payment Structure
              </p>
              <p className="text-stone-600 leading-relaxed">
                50% payment upfront to secure your booking, 50% upon final delivery. No hidden fees, no surprises.
              </p>
            </div>
            <div className={`text-center transition-all duration-700 delay-300 ${
              whyChooseUsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="text-stone-300 text-6xl md:text-7xl font-serif font-light mb-6">03</div>
              <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 mb-2">First-Time Client Offer</h3>
              <p className="text-sm text-stone-500 font-medium tracking-wide mb-4">
                Welcome Discount Available
              </p>
              <p className="text-stone-600 leading-relaxed">
                New clients receive 20% off their first project, making it easy to experience premium interior photography.
              </p>
            </div>
            <div className={`text-center transition-all duration-700 delay-400 ${
              whyChooseUsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="text-stone-300 text-6xl md:text-7xl font-serif font-light mb-6">04</div>
              <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 mb-2">Fast Turnaround</h3>
              <p className="text-sm text-stone-500 font-medium tracking-wide mb-4">
                Quick Delivery Without Compromise
              </p>
              <p className="text-stone-600 leading-relaxed">
                Short lead times for booking and efficient post-production process ensure your images are ready when you need them.
              </p>
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

      {/* Portfolio Divider */}
      <section id="portfolio" className="py-24 px-6 md:px-16 bg-white">
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

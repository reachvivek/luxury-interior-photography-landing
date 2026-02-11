"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronDown } from "lucide-react";
import faqDefaults from "@/content/faq.json";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface FAQPageProps {
  faqData?: any;
}

export default function FAQPage({ faqData }: FAQPageProps) {
  const heroAnimation = useScrollAnimation(0.1);
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const data = faqData ?? faqDefaults;
  const heroTitle = data?.hero?.title ?? faqDefaults.hero.title;
  const heroSubtitle = data?.hero?.subtitle ?? faqDefaults.hero.subtitle;
  const categories = data?.categories ?? faqDefaults.categories;
  const ctaTitle = data?.cta?.title ?? faqDefaults.cta.title;
  const ctaDescription = data?.cta?.description ?? faqDefaults.cta.description;
  const ctaButtonText = data?.cta?.buttonText ?? faqDefaults.cta.buttonText;
  const ctaButtonHref = data?.cta?.buttonHref ?? faqDefaults.cta.buttonHref;

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-40 md:pb-32 px-6 md:px-16 bg-gradient-to-b from-stone-50/30 via-white to-white overflow-hidden relative">
        <div
          ref={heroAnimation.elementRef}
          className={`max-w-5xl mx-auto text-center relative z-10 transition-all duration-1000 ease-out ${
            heroAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-extralight text-stone-900 mb-8 md:mb-10 tracking-tight leading-[0.95]">
            {heroTitle}
          </h1>
          <p className="text-base md:text-xl text-stone-600/90 max-w-2xl mx-auto leading-[1.65] font-light tracking-[0.01em]">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 md:py-32 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          {categories.map((category: any, categoryIndex: number) => (
            <div key={categoryIndex} className="mb-12 md:mb-16">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="w-10 h-px bg-gradient-to-r from-stone-300 to-transparent"></div>
                <h2 className="text-[10px] md:text-xs tracking-[0.16em] uppercase text-stone-400/80 font-medium">
                  {category.category}
                </h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((item: any, questionIndex: number) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openItems[key];

                  return (
                    <div
                      key={questionIndex}
                      className="border border-stone-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-stone-300"
                    >
                      <button
                        onClick={() => toggleItem(categoryIndex, questionIndex)}
                        className="w-full flex items-center justify-between p-5 md:p-6 text-left bg-white hover:bg-stone-50/50 transition-colors duration-200"
                      >
                        <h3 className="text-base md:text-lg font-serif font-light text-stone-900 pr-4 leading-[1.4]">
                          {item.question}
                        </h3>
                        <ChevronDown
                          className={`w-5 h-5 text-stone-400 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        } overflow-hidden`}
                      >
                        <div className="p-5 md:p-6 pt-0 md:pt-0">
                          <p className="text-sm md:text-base text-stone-600/90 leading-[1.7] font-light">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 px-6 md:px-16 bg-gradient-to-b from-white to-stone-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-extralight text-stone-900 mb-5 md:mb-7 tracking-tight leading-[1.1] px-4">
            {ctaTitle}
          </h2>
          <p className="text-base md:text-xl text-stone-600/90 mb-10 md:mb-12 font-light max-w-2xl mx-auto px-4 leading-[1.65]">
            {ctaDescription}
          </p>
          <Link
            href={ctaButtonHref}
            className="inline-flex items-center gap-3 px-10 py-4 md:px-12 md:py-5 bg-stone-900 text-white hover:bg-stone-800 transition-all duration-300 text-sm font-medium tracking-[0.1em] uppercase rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            {ctaButtonText}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

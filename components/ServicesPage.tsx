"use client";

import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import servicesDefaults from "@/content/services-page.json";

interface ServicesPageProps {
  servicesData?: any;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ServicesPage({ servicesData }: ServicesPageProps) {
  const data = servicesData ?? servicesDefaults;

  const heroTitle = data.hero?.title ?? servicesDefaults.hero.title;
  const heroSubtitle = data.hero?.subtitle ?? servicesDefaults.hero.subtitle;
  const services = data.services ?? servicesDefaults.services;
  const ctaTitle = data.cta?.title ?? servicesDefaults.cta.title;
  const ctaDescription = data.cta?.description ?? servicesDefaults.cta.description;
  const ctaButtonText = data.cta?.buttonText ?? servicesDefaults.cta.buttonText;
  const ctaButtonHref = data.cta?.buttonHref ?? servicesDefaults.cta.buttonHref;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-stone-900 mb-6">
            {heroTitle}
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto space-y-24">
          {services.map((service: any, index: number) => (
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
                  {service.features.map((feature: string, idx: number) => (
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
                {service.href && (
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 text-stone-700 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300 text-xs font-normal tracking-widest uppercase rounded-full"
                  >
                    Explore
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-16 bg-stone-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">
            {ctaTitle}
          </h2>
          <p className="text-xl text-stone-300 mb-10">
            {ctaDescription}
          </p>
          <Link
            href={ctaButtonHref}
            className="inline-block px-10 py-4 bg-white text-stone-900 hover:bg-stone-100 transition-all duration-200 text-sm font-medium tracking-widest uppercase rounded-full"
          >
            {ctaButtonText}
          </Link>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

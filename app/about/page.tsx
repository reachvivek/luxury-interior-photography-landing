"use client";

import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-stone-900 mb-6">
            About Tsurov
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Precision-driven interior photography for architects, developers, and luxury brands.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="/images/7.png"
              alt="About Tsurov Photography"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-serif font-light text-stone-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-lg text-stone-600 leading-relaxed">
              <p>
                Tsurov Photography specializes in capturing the essence of luxury interior spaces across the UAE. Based in Dubai, we work with architects, developers, and hospitality brands who demand excellence in every shot.
              </p>
              <p>
                Our approach combines technical precision with artistic vision, ensuring every image tells the story of your space. From high-end residential properties to commercial developments, we bring years of expertise to every project.
              </p>
              <p>
                We understand that great interior photography goes beyond just taking pictures - it's about showcasing design, highlighting craftsmanship, and creating images that sell.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-900 text-center mb-16">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-stone-300 text-6xl font-serif font-light mb-4">01</div>
              <h3 className="text-2xl font-serif font-light text-stone-900 mb-3">Precision</h3>
              <p className="text-stone-600 leading-relaxed">
                Every angle, every light, every detail is carefully considered to create perfect compositions.
              </p>
            </div>
            <div className="text-center">
              <div className="text-stone-300 text-6xl font-serif font-light mb-4">02</div>
              <h3 className="text-2xl font-serif font-light text-stone-900 mb-3">Excellence</h3>
              <p className="text-stone-600 leading-relaxed">
                We deliver the highest quality images that exceed expectations and elevate your brand.
              </p>
            </div>
            <div className="text-center">
              <div className="text-stone-300 text-6xl font-serif font-light mb-4">03</div>
              <h3 className="text-2xl font-serif font-light text-stone-900 mb-3">Partnership</h3>
              <p className="text-stone-600 leading-relaxed">
                We work closely with our clients to understand their vision and bring it to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-serif font-light text-stone-900 mb-2">150+</div>
              <p className="text-stone-600 tracking-wider uppercase text-sm">Projects</p>
            </div>
            <div>
              <div className="text-5xl font-serif font-light text-stone-900 mb-2">50+</div>
              <p className="text-stone-600 tracking-wider uppercase text-sm">Clients</p>
            </div>
            <div>
              <div className="text-5xl font-serif font-light text-stone-900 mb-2">5+</div>
              <p className="text-stone-600 tracking-wider uppercase text-sm">Years</p>
            </div>
            <div>
              <div className="text-5xl font-serif font-light text-stone-900 mb-2">100%</div>
              <p className="text-stone-600 tracking-wider uppercase text-sm">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-16 bg-stone-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">
            Let's work together
          </h2>
          <p className="text-xl text-stone-300 mb-10">
            Get in touch to discuss your next project.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-stone-900 hover:bg-stone-100 transition-all duration-200 text-sm font-medium tracking-widest uppercase rounded-full"
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

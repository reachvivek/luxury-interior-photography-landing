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
      <section className="pt-40 pb-24 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-extralight text-stone-900 mb-8 tracking-tight">
            About Nashray
          </h1>
          <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-light">
            Precision-driven interior photography for architects, developers, and luxury brands.
          </p>
        </div>
      </section>

      {/* Story Section - Desktop: Photo Left, Text Right | Mobile: Text Under Photo */}
      <section className="py-24 md:py-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
            {/* Photo - Left on Desktop, Top on Mobile */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden order-1 md:order-1 group">
              <Image
                src="/images/commercial/coworking-spaces/modern-workspace-lounge-seating.jpg"
                alt="About Nashray Photography"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            {/* Text - Right on Desktop, Bottom on Mobile */}
            <div className="order-2 md:order-2 md:pl-8">
              <p className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-stone-400 mb-6 font-medium">
                Our Story
              </p>
              <h2 className="text-3xl md:text-5xl font-serif font-extralight text-stone-900 mb-8 leading-tight">
                Transforming spaces into refined visual narratives
              </h2>
              <div className="space-y-6 text-base md:text-lg text-stone-600 leading-relaxed font-light max-w-xl">
                <p>
                  Nashray specializes in architectural and interior photography, balancing technical precision with artistic vision.
                </p>
                <p>
                  Based in Dubai, we work with architects, developers, and luxury brands who demand excellence. From refined residential interiors to contemporary commercial developments, we create imagery that elevates brands.
                </p>
                <p>
                  Each project showcases luxury at its finest, creating imagery that inspires audiences and drives business results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section - Intentional. Calm. Precise. */}
      <section className="flex items-center justify-center px-6 md:px-16 bg-gradient-to-b from-white via-stone-50/50 to-white relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex justify-center mb-8">
            <div className="w-px h-16 md:h-20 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          <p className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-stone-400 mb-8 text-center font-medium">
            Our Approach
          </p>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-extralight text-stone-900 leading-tight mb-16 md:mb-20 max-w-4xl mx-auto text-center">
            Intentional. Calm. Precise.
          </h2>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center max-w-6xl mx-auto">
            {/* Image Block - Left on Desktop, Top on Mobile */}
            <div className="order-1">
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden shadow-xl group">
                <Image
                  src="/images/commercial/coworking-spaces/cofiesto-cafe-window-seating.jpg"
                  alt="Interior design approach"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content Card - Right on Desktop, Bottom on Mobile */}
            <div className="order-2 md:order-2">
              <div className="bg-stone-50/80 backdrop-blur-sm rounded-xl pt-12 pb-10 px-10 md:pt-14 md:pb-12 md:px-12 border border-stone-200/40 shadow-lg">
                <div className="flex mb-10">
                  <div className="w-8 h-px bg-stone-300"></div>
                </div>

                <p className="text-[10px] tracking-[0.12em] uppercase text-stone-400 mb-10 font-medium">
                  Three Principles
                </p>

                <div className="space-y-8 mb-10">
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 mb-2">
                      Clarity in Planning
                    </h3>
                    <p className="text-sm md:text-base text-stone-500 leading-relaxed font-light">
                      Meticulous preparation for every space.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 mb-2">
                      Respect for Design
                    </h3>
                    <p className="text-sm md:text-base text-stone-500 leading-relaxed font-light">
                      Honoring architectural intent.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 mb-2">
                      Refined Post-Production
                    </h3>
                    <p className="text-sm md:text-base text-stone-500 leading-relaxed font-light">
                      Clean, timeless final imagery.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center my-8">
                  <div className="w-12 h-px bg-stone-300"></div>
                </div>

                <p className="text-sm md:text-base text-stone-600 leading-[1.8] font-light">
                  From refined residential interiors to contemporary commercial developments, we combine timeless composition with modern techniques to create imagery that elevates brands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          <p className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-stone-400 mb-8 text-center font-medium">
            Our Values
          </p>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-extralight text-stone-900 text-center mb-20 md:mb-24 max-w-4xl mx-auto leading-tight">
            The principles that guide our work
          </h2>

          <div className="grid md:grid-cols-3 gap-16 md:gap-20 max-w-6xl mx-auto">
            <div className="text-center md:text-left group">
              <div className="flex justify-center md:justify-start mb-6">
                <div className="w-12 h-px bg-stone-300 transition-all duration-500 group-hover:w-16"></div>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-light text-stone-900 mb-4">Precision</h3>
              <p className="text-stone-600 leading-relaxed font-light max-w-xs mx-auto md:mx-0">
                Every angle, every light, every detail is carefully considered to create perfect compositions.
              </p>
            </div>

            <div className="text-center md:text-left group">
              <div className="flex justify-center md:justify-start mb-6">
                <div className="w-12 h-px bg-stone-300 transition-all duration-500 group-hover:w-16"></div>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-light text-stone-900 mb-4">Excellence</h3>
              <p className="text-stone-600 leading-relaxed font-light max-w-xs mx-auto md:mx-0">
                We deliver the highest quality images that exceed expectations and elevate your brand.
              </p>
            </div>

            <div className="text-center md:text-left group">
              <div className="flex justify-center md:justify-start mb-6">
                <div className="w-12 h-px bg-stone-300 transition-all duration-500 group-hover:w-16"></div>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-light text-stone-900 mb-4">Partnership</h3>
              <p className="text-stone-600 leading-relaxed font-light max-w-xs mx-auto md:mx-0">
                We work closely with our clients to understand their vision and bring it to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-gradient-to-b from-white to-stone-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-extralight text-stone-800 mb-3">50</div>
              <p className="text-stone-500 tracking-[0.12em] uppercase text-[10px] md:text-xs font-light">Projects</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-extralight text-stone-800 mb-3">50+</div>
              <p className="text-stone-500 tracking-[0.12em] uppercase text-[10px] md:text-xs font-light">Clients</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-extralight text-stone-800 mb-3">4</div>
              <p className="text-stone-500 tracking-[0.12em] uppercase text-[10px] md:text-xs font-light">Years</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-extralight text-stone-800 mb-3">100%</div>
              <p className="text-stone-500 tracking-[0.12em] uppercase text-[10px] md:text-xs font-light">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDE0YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptMCAyMGMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6TTU2IDE0YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptMCAyMGMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6TTE2IDE0YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptMCAyMGMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-10">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-stone-600 to-transparent"></div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extralight text-white mb-6 tracking-tight">
            Let's work together
          </h2>
          <p className="text-lg md:text-xl text-stone-400 mb-12 font-light max-w-2xl mx-auto">
            Get in touch to discuss your next project.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-12 py-5 bg-white text-stone-900 hover:bg-stone-50 transition-all duration-300 text-sm font-medium tracking-[0.1em] uppercase rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Contact Us
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

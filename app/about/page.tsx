"use client";

import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function AboutPage() {
  const heroAnimation = useScrollAnimation(0.1);
  const storyAnimation = useScrollAnimation(0.2);
  const approachAnimation = useScrollAnimation(0.2);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-40 md:pb-32 px-6 md:px-16 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 overflow-hidden relative">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDE0YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptMCAyMGMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6TTU2IDE0YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptMCAyMGMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6TTE2IDE0YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptMCAyMGMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>

        <div
          ref={heroAnimation.elementRef}
          className={`max-w-5xl mx-auto text-center relative z-10 transition-all duration-1000 ease-out ${
            heroAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-600 to-transparent"></div>
          </div>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-extralight text-white mb-6 md:mb-8 tracking-tight">
            About Nashray
          </h1>
          <p className="text-base md:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed font-light">
            Architectural photography for spaces that deserve attention.
          </p>
        </div>
      </section>

      {/* Story Section with Overlapping Card */}
      <section className="pt-6 pb-12 md:py-32 px-6 md:px-16 overflow-visible">
        <div
          ref={storyAnimation.elementRef}
          className="max-w-7xl mx-auto"
        >
          <div className="relative md:flex md:items-center md:gap-0">
            {/* Photo - 60% width */}
            <div
              className={`md:w-[58%] relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 ease-out ${
                storyAnimation.isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-12'
              }`}
            >
              <Image
                src="/images/commercial/coworking-spaces/modern-workspace-lounge-seating.jpg"
                alt="Interior photography by Nashray"
                fill
                className="object-cover"
              />
              {/* Gradient overlay at bottom for mobile overlap */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent md:hidden"></div>
            </div>

            {/* Overlapping Content Card - overlaps from right */}
            <div
              className={`md:w-[50%] md:-ml-[8%] -mt-24 md:mt-0 relative z-10 transition-all duration-1000 ease-out delay-300 ${
                storyAnimation.isVisible
                  ? 'opacity-100 translate-x-0 translate-y-0'
                  : 'opacity-0 translate-x-0 translate-y-8 md:translate-y-0 md:translate-x-12'
              }`}
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-stone-100 p-6 md:p-10 relative backdrop-blur-sm">
                {/* Decorative accent */}
                <div className="absolute -top-3 -left-3 w-20 h-20 bg-stone-900/5 rounded-full blur-2xl"></div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="w-10 h-px bg-gradient-to-r from-stone-300 to-transparent"></div>
                    <p className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-stone-400 font-medium">
                      Who we are
                    </p>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-serif font-extralight text-stone-900 mb-4 md:mb-6 leading-tight">
                    Spaces, translated.
                  </h2>

                  <div className="space-y-3 md:space-y-4 text-sm md:text-base text-stone-600 leading-relaxed font-light">
                    <p>
                      Nashray is a Dubai-based interior and architectural photography studio specializing in clarity, restraint, and timeless composition.
                    </p>
                    <p>
                      Every project begins with understanding the designer's intent—the way light moves, how materials interact, what the space wants to say. The work balances technical precision with editorial sensibility.
                    </p>
                    <p>
                      From residential interiors to hospitality spaces, the approach remains consistent: capture what matters, remove what doesn't.
                    </p>
                  </div>

                  {/* Decorative bottom accent */}
                  <div className="flex items-center gap-2 mt-6 md:mt-8">
                    <div className="w-1 h-1 rounded-full bg-stone-300"></div>
                    <div className="w-8 h-px bg-stone-200"></div>
                    <div className="w-1 h-1 rounded-full bg-stone-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="flex items-center justify-center px-6 md:px-16 bg-gradient-to-b from-white via-stone-50/50 to-white relative py-12 md:py-32">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-px h-12 md:h-20 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          <p className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-stone-400 mb-6 md:mb-8 text-center font-medium">
            How it works
          </p>

          <h2 className="text-2xl md:text-5xl lg:text-6xl font-serif font-extralight text-stone-900 leading-tight mb-10 md:mb-20 max-w-4xl mx-auto text-center px-4">
            Intentional. Calm. Precise.
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-center max-w-6xl mx-auto">
            {/* Image Block */}
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

            {/* Content Card */}
            <div className="order-2 md:order-2">
              <div className="bg-stone-50/80 backdrop-blur-sm rounded-xl pt-8 pb-8 px-6 md:pt-14 md:pb-12 md:px-12 border border-stone-200/40 shadow-lg">
                <div className="flex mb-6 md:mb-10">
                  <div className="w-8 h-px bg-stone-300"></div>
                </div>

                <p className="text-[10px] tracking-[0.12em] uppercase text-stone-400 mb-6 md:mb-10 font-medium">
                  Three Principles
                </p>

                <div className="space-y-6 md:space-y-8 mb-6 md:mb-10">
                  <div>
                    <h3 className="text-lg md:text-2xl font-serif font-light text-stone-900 mb-2">
                      Planning
                    </h3>
                    <p className="text-sm md:text-base text-stone-500 leading-relaxed font-light">
                      Meticulous preparation for every space.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-2xl font-serif font-light text-stone-900 mb-2">
                      Respect
                    </h3>
                    <p className="text-sm md:text-base text-stone-500 leading-relaxed font-light">
                      Honoring the designer's original intent.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-2xl font-serif font-light text-stone-900 mb-2">
                      Restraint
                    </h3>
                    <p className="text-sm md:text-base text-stone-500 leading-relaxed font-light">
                      Clean, timeless imagery.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center my-6 md:my-8">
                  <div className="w-12 h-px bg-stone-300"></div>
                </div>

                <p className="text-sm md:text-base text-stone-600 leading-[1.8] font-light">
                  From penthouses to boutique hotels, the process balances natural light with architectural detail—creating images that feel both editorial and authentic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Excellence Section - 4 Directions */}
      <section className="py-12 md:py-32 px-6 md:px-16 bg-gradient-to-b from-white to-stone-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-px h-12 md:h-20 bg-gradient-to-b from-transparent via-amber-600 to-transparent"></div>
          </div>

          <p className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-stone-400 mb-6 text-center font-medium">
            Services
          </p>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-extralight text-stone-900 text-center mb-8 md:mb-20 max-w-4xl mx-auto leading-tight">
            Four specializations
          </h2>

          {/* Mobile: Compact Cards */}
          <div className="space-y-6 md:hidden">
            {/* Residential */}
            <Link href="/residential" className="block group">
              <div className="bg-stone-50/50 rounded-xl overflow-hidden shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src="/images/residential/penthouses/modern-penthouse-living-room.jpg"
                    alt="Residential"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] text-stone-400 tracking-wider mb-2 block">01</span>
                  <h3 className="text-lg font-serif font-light text-stone-900 mb-2">Residential</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    Villas, penthouses, and apartments presented with attention to light, materiality, and spatial flow.
                  </p>
                </div>
              </div>
            </Link>

            {/* Hospitality */}
            <Link href="/hospitality" className="block group">
              <div className="bg-stone-50/50 rounded-xl overflow-hidden shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src="/images/hospitality/hotel-suites/hotel-lobby-colorful-sofas.jpg"
                    alt="Hospitality"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] text-stone-400 tracking-wider mb-2 block">02</span>
                  <h3 className="text-lg font-serif font-light text-stone-900 mb-2">Hospitality</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    Hotels, restaurants, and resorts captured to convey atmosphere—the feeling guests will remember.
                  </p>
                </div>
              </div>
            </Link>

            {/* Commercial */}
            <Link href="/commercial" className="block group">
              <div className="bg-stone-50/50 rounded-xl overflow-hidden shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src="/images/commercial/retail-stores/beauty-salon-interior-1.jpg"
                    alt="Commercial"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] text-stone-400 tracking-wider mb-2 block">03</span>
                  <h3 className="text-lg font-serif font-light text-stone-900 mb-2">Commercial</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    Office spaces, retail environments, and showrooms photographed to reflect brand identity and function.
                  </p>
                </div>
              </div>
            </Link>

            {/* Details */}
            <Link href="/custom-interiors" className="block group">
              <div className="bg-stone-50/50 rounded-xl overflow-hidden shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src="/images/custom/design-details/art-gallery-gold-framed-artwork.jpg"
                    alt="Details"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] text-stone-400 tracking-wider mb-2 block">04</span>
                  <h3 className="text-lg font-serif font-light text-stone-900 mb-2">Details</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    Architectural elements, furniture, lighting—the details that deserve their own frame.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop: Original Layout */}
          <div className="hidden md:block space-y-20">
            {/* Residential */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl order-2 md:order-1">
                <Image
                  src="/images/residential/penthouses/modern-penthouse-living-room.jpg"
                  alt="Residential Photography"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block mb-4 px-4 py-1 bg-stone-100 rounded-full">
                  <span className="text-xs text-stone-600 tracking-wider">01</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-stone-900 mb-4">
                  Residential
                </h3>
                <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light">
                  Villas, penthouses, and apartments presented with attention to light, materiality, and spatial flow.
                </p>
              </div>
            </div>

            {/* Hospitality */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/hospitality/hotel-suites/hotel-lobby-colorful-sofas.jpg"
                  alt="Hospitality Photography"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="inline-block mb-4 px-4 py-1 bg-stone-100 rounded-full">
                  <span className="text-xs text-stone-600 tracking-wider">02</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-stone-900 mb-4">
                  Hospitality
                </h3>
                <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light">
                  Hotels, restaurants, and resorts captured to convey atmosphere—the feeling guests will remember.
                </p>
              </div>
            </div>

            {/* Commercial */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl order-2 md:order-1">
                <Image
                  src="/images/commercial/retail-stores/beauty-salon-interior-1.jpg"
                  alt="Commercial Photography"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block mb-4 px-4 py-1 bg-stone-100 rounded-full">
                  <span className="text-xs text-stone-600 tracking-wider">03</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-stone-900 mb-4">
                  Commercial
                </h3>
                <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light">
                  Office spaces, retail environments, and showrooms photographed to reflect brand identity and function.
                </p>
              </div>
            </div>

            {/* Custom */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/custom/design-details/art-gallery-gold-framed-artwork.jpg"
                  alt="Custom Interior Photography"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="inline-block mb-4 px-4 py-1 bg-stone-100 rounded-full">
                  <span className="text-xs text-stone-600 tracking-wider">04</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-stone-900 mb-4">
                  Details
                </h3>
                <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light">
                  Architectural elements, furniture, lighting—the details that deserve their own frame.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 px-6 md:px-16 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDE0YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptMCAyMGMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6TTU2IDE0YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptMCAyMGMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6TTE2IDE0YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptMCAyMGMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-600 to-transparent"></div>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-extralight text-white mb-4 md:mb-6 tracking-tight px-4">
            Begin a conversation
          </h2>
          <p className="text-base md:text-xl text-stone-400 mb-10 md:mb-12 font-light max-w-2xl mx-auto px-4">
            Discuss your project and what you'd like to achieve.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 md:px-12 md:py-5 bg-white text-stone-900 hover:bg-stone-50 transition-all duration-300 text-sm font-medium tracking-[0.1em] uppercase rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Get in touch
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

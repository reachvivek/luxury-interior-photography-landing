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
            About Nashray
          </h1>
          <p className="text-base md:text-xl text-stone-600/90 max-w-2xl mx-auto leading-[1.65] font-light tracking-[0.01em]">
            Interiors photographed with precision, restraint, and editorial intent.
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
                  <div className="flex items-center gap-3 mb-5 md:mb-7">
                    <div className="w-10 h-px bg-gradient-to-r from-stone-300 to-transparent"></div>
                    <p className="text-[10px] md:text-xs tracking-[0.16em] uppercase text-stone-400/80 font-medium">
                      About the studio
                    </p>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-serif font-extralight text-stone-900 mb-5 md:mb-7 leading-[1.15] tracking-[-0.01em]">
                    Spaces, translated.
                  </h2>

                  <div className="space-y-4 md:space-y-5 text-sm md:text-base text-stone-700/90 leading-[1.7] font-light max-w-[520px]">
                    <p>
                      Nashray is a Dubai-based interior and architectural photography studio specializing in clarity, restraint, and timeless composition.
                    </p>
                    <p>
                      Every project begins with understanding the designer's intent—the way light moves, how materials interact, what the space wants to say.
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

          <p className="text-[10px] md:text-xs tracking-[0.16em] uppercase text-stone-400/70 mb-8 md:mb-12 text-center font-medium">
            Our philosophy
          </p>

          <div className="mb-10 md:mb-20 max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-6xl lg:text-7xl font-serif font-extralight text-stone-900 leading-[1.05] tracking-[0.02em]">
              <span className="inline-block">Intentional.</span>
              {" "}
              <span className="inline-block">Calm.</span>
              {" "}
              <span className="inline-block">Precise.</span>
            </h2>
            <div className="flex justify-center mt-8 md:mt-10 gap-3">
              <div className="w-12 h-px bg-stone-300"></div>
              <div className="w-1 h-1 rounded-full bg-stone-400 self-center"></div>
              <div className="w-12 h-px bg-stone-300"></div>
            </div>
          </div>

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

                <p className="text-[10px] tracking-[0.14em] uppercase text-stone-400/70 mb-7 md:mb-12 font-medium">
                  The process
                </p>

                <div className="space-y-7 md:space-y-9 mb-7 md:mb-12">
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 mb-2.5 tracking-[-0.01em]">
                      Planning
                    </h3>
                    <p className="text-sm md:text-base text-stone-600/90 leading-[1.7] font-light">
                      We study the space before shooting—light angles, sightlines, designer intent.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 mb-2.5 tracking-[-0.01em]">
                      Execution
                    </h3>
                    <p className="text-sm md:text-base text-stone-600/90 leading-[1.7] font-light">
                      Precision in composition, natural light prioritized, minimal intervention.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 mb-2.5 tracking-[-0.01em]">
                      Refinement
                    </h3>
                    <p className="text-sm md:text-base text-stone-600/90 leading-[1.7] font-light">
                      Post-production focused on clarity—enhancing what's there, removing distraction.
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

          <p className="text-[10px] md:text-xs tracking-[0.16em] uppercase text-stone-400/70 mb-6 text-center font-medium">
            What we photograph
          </p>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-extralight text-stone-900 text-center mb-8 md:mb-20 max-w-4xl mx-auto leading-[1.15] tracking-[-0.01em]">
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
                  <p className="text-xs text-stone-600/90 leading-[1.65] font-light mb-3">
                    How high-end homes should look in print—composed, not styled.
                  </p>
                  <div className="flex items-center gap-1 text-stone-900 text-xs font-light">
                    <span>Explore</span>
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
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
                  <p className="text-xs text-stone-600/90 leading-[1.65] font-light mb-3">
                    Capturing atmosphere without artifice—spaces that invite, not perform.
                  </p>
                  <div className="flex items-center gap-1 text-stone-900 text-xs font-light">
                    <span>Explore</span>
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
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
                  <p className="text-xs text-stone-600/90 leading-[1.65] font-light mb-3">
                    Workspaces and retail interiors that balance function with refinement.
                  </p>
                  <div className="flex items-center gap-1 text-stone-900 text-xs font-light">
                    <span>Explore</span>
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
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
                  <h3 className="text-lg font-serif font-light text-stone-900 mb-2">Custom Interiors</h3>
                  <p className="text-xs text-stone-600/90 leading-[1.65] font-light mb-3">
                    Material close-ups and architectural details—context removed, craft revealed.
                  </p>
                  <div className="flex items-center gap-1 text-stone-900 text-xs font-light">
                    <span>Explore</span>
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop: Original Layout */}
          <div className="hidden md:block space-y-20">
            {/* Residential */}
            <Link href="/residential" className="grid md:grid-cols-2 gap-8 md:gap-12 items-center group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl order-2 md:order-1">
                <Image
                  src="/images/residential/penthouses/modern-penthouse-living-room.jpg"
                  alt="Residential Photography"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block mb-4 px-4 py-1 bg-stone-100 rounded-full">
                  <span className="text-xs text-stone-600 tracking-wider">01</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-stone-900 mb-4">
                  Residential
                </h3>
                <p className="text-sm md:text-base text-stone-600/90 leading-[1.7] font-light mb-4">
                  How high-end homes should look in print—composed, not styled.
                </p>
                <div className="inline-flex items-center gap-2 text-stone-900 text-sm font-light">
                  <span>Explore</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Hospitality */}
            <Link href="/hospitality" className="grid md:grid-cols-2 gap-8 md:gap-12 items-center group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/hospitality/hotel-suites/hotel-lobby-colorful-sofas.jpg"
                  alt="Hospitality Photography"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <div className="inline-block mb-4 px-4 py-1 bg-stone-100 rounded-full">
                  <span className="text-xs text-stone-600 tracking-wider">02</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-stone-900 mb-4">
                  Hospitality
                </h3>
                <p className="text-sm md:text-base text-stone-600/90 leading-[1.7] font-light mb-4">
                  Capturing atmosphere without artifice—spaces that invite, not perform.
                </p>
                <div className="inline-flex items-center gap-2 text-stone-900 text-sm font-light">
                  <span>Explore</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Commercial */}
            <Link href="/commercial" className="grid md:grid-cols-2 gap-8 md:gap-12 items-center group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl order-2 md:order-1">
                <Image
                  src="/images/commercial/retail-stores/beauty-salon-interior-1.jpg"
                  alt="Commercial Photography"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block mb-4 px-4 py-1 bg-stone-100 rounded-full">
                  <span className="text-xs text-stone-600 tracking-wider">03</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-stone-900 mb-4">
                  Commercial
                </h3>
                <p className="text-sm md:text-base text-stone-600/90 leading-[1.7] font-light mb-4">
                  Workspaces and retail interiors that balance function with refinement.
                </p>
                <div className="inline-flex items-center gap-2 text-stone-900 text-sm font-light">
                  <span>Explore</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Custom */}
            <Link href="/custom-interiors" className="grid md:grid-cols-2 gap-8 md:gap-12 items-center group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/custom/design-details/art-gallery-gold-framed-artwork.jpg"
                  alt="Custom Interior Photography"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <div className="inline-block mb-4 px-4 py-1 bg-stone-100 rounded-full">
                  <span className="text-xs text-stone-600 tracking-wider">04</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-stone-900 mb-4">
                  Custom Interiors
                </h3>
                <p className="text-sm md:text-base text-stone-600/90 leading-[1.7] font-light mb-4">
                  Material close-ups and architectural details—context removed, craft revealed.
                </p>
                <div className="inline-flex items-center gap-2 text-stone-900 text-sm font-light">
                  <span>Explore</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 px-6 md:px-16 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 relative overflow-hidden">
        {/* Organic texture overlay - large scale, non-repeating feel */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 40%, transparent 70%),
              url("data:image/svg+xml,%3Csvg width='800' height='800' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/%3E%3C/filter%3E%3C/defs%3E%3Cg fill='white' fill-opacity='1'%3E%3Ccircle cx='120' cy='95' r='2.5'/%3E%3Ccircle cx='280' cy='140' r='2'/%3E%3Ccircle cx='450' cy='180' r='3'/%3E%3Ccircle cx='620' cy='120' r='2'/%3E%3Ccircle cx='740' cy='200' r='2.5'/%3E%3Ccircle cx='160' cy='280' r='2'/%3E%3Ccircle cx='340' cy='320' r='2.5'/%3E%3Ccircle cx='520' cy='360' r='2'/%3E%3Ccircle cx='680' cy='340' r='3'/%3E%3Ccircle cx='90' cy='460' r='2.5'/%3E%3Ccircle cx='240' cy='520' r='2'/%3E%3Ccircle cx='420' cy='540' r='2.5'/%3E%3Ccircle cx='580' cy='500' r='2'/%3E%3Ccircle cx='720' cy='560' r='3'/%3E%3Ccircle cx='140' cy='640' r='2'/%3E%3Ccircle cx='320' cy='680' r='2.5'/%3E%3Ccircle cx='500' cy='720' r='2'/%3E%3Ccircle cx='660' cy='700' r='2.5'/%3E%3Ccircle cx='200' cy='180' r='1.5'/%3E%3Ccircle cx='380' cy='220' r='1.5'/%3E%3Ccircle cx='540' cy='240' r='1.5'/%3E%3Ccircle cx='700' cy='280' r='1.5'/%3E%3Ccircle cx='80' cy='360' r='1.5'/%3E%3Ccircle cx='260' cy='400' r='1.5'/%3E%3Ccircle cx='440' cy='440' r='1.5'/%3E%3Ccircle cx='600' cy='420' r='1.5'/%3E%3Ccircle cx='180' cy='560' r='1.5'/%3E%3Ccircle cx='360' cy='600' r='1.5'/%3E%3Ccircle cx='540' cy='640' r='1.5'/%3E%3Ccircle cx='680' cy='620' r='1.5'/%3E%3C/g%3E%3C/svg%3E")
            `,
            backgroundSize: 'cover, 1400px 1400px',
            backgroundPosition: 'center, 20% 30%',
            backgroundRepeat: 'no-repeat, repeat',
            mixBlendMode: 'screen'
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-600 to-transparent"></div>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-extralight text-white mb-5 md:mb-7 tracking-tight leading-[1.1] px-4">
            Let's discuss your space
          </h2>
          <p className="text-base md:text-xl text-stone-400/90 mb-10 md:mb-12 font-light max-w-2xl mx-auto px-4 leading-[1.65]">
            Share details about your project and we'll arrange a consultation.
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

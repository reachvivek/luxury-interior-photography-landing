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
  const valuesAnimation = useScrollAnimation(0.2);

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
            Precision-driven interior photography for architects, developers, and luxury brands.
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
                alt="About Nashray Photography"
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
                      Our Story
                    </p>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-serif font-extralight text-stone-900 mb-4 md:mb-6 leading-tight">
                    Transforming spaces into refined visual narratives
                  </h2>

                  <div className="space-y-3 md:space-y-4 text-sm md:text-base text-stone-600 leading-relaxed font-light">
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
            Our Approach
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
                      Clarity in Planning
                    </h3>
                    <p className="text-sm md:text-base text-stone-500 leading-relaxed font-light">
                      Meticulous preparation for every space.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-2xl font-serif font-light text-stone-900 mb-2">
                      Respect for Design
                    </h3>
                    <p className="text-sm md:text-base text-stone-500 leading-relaxed font-light">
                      Honoring architectural intent.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-2xl font-serif font-light text-stone-900 mb-2">
                      Refined Post-Production
                    </h3>
                    <p className="text-sm md:text-base text-stone-500 leading-relaxed font-light">
                      Clean, timeless final imagery.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center my-6 md:my-8">
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

      {/* Service Excellence Section - 4 Directions */}
      <section className="py-12 md:py-32 px-6 md:px-16 bg-gradient-to-b from-white to-stone-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-px h-12 md:h-20 bg-gradient-to-b from-transparent via-amber-600 to-transparent"></div>
          </div>

          <p className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-stone-400 mb-6 text-center font-medium">
            Our Expertise
          </p>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-extralight text-stone-900 text-center mb-12 md:mb-20 max-w-4xl mx-auto leading-tight">
            Four Pillars of Excellence
          </h2>

          <div className="space-y-16 md:space-y-24">
            {/* Residential Excellence */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl order-2 md:order-1">
                <Image
                  src="/images/residential/penthouses/penthouse-interior-1.jpg"
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
                  Residential Mastery
                </h3>
                <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light mb-4">
                  We transform luxury residences into visual stories that captivate buyers. Our expertise in capturing penthouses, villas, and apartments showcases every architectural nuance and design detail with sophistication.
                </p>
                <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light">
                  From natural light optimization to styling consultation, we ensure each residence is presented at its absolute finest—creating imagery that commands attention and drives results.
                </p>
              </div>
            </div>

            {/* Hospitality Excellence */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/hospitality/restaurants/restaurant-dining-brick-wall.jpg"
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
                  Hospitality Storytelling
                </h3>
                <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light mb-4">
                  Hotels, restaurants, and resorts demand imagery that captures ambiance and experience. We specialize in conveying the five-star feeling—the warmth of welcome, the refinement of service, the allure of escape.
                </p>
                <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light">
                  Our hospitality photography communicates luxury and comfort, inspiring guests to book their next experience before they even arrive.
                </p>
              </div>
            </div>

            {/* Commercial Excellence */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl order-2 md:order-1">
                <Image
                  src="/images/commercial/coworking-spaces/cofiesto-cafe-window-seating.jpg"
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
                  Commercial Precision
                </h3>
                <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light mb-4">
                  Office spaces, retail environments, and showrooms require photography that speaks to function and brand identity. We capture the professional elegance and strategic design that defines commercial success.
                </p>
                <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light">
                  Our commercial work helps businesses showcase their spaces as destinations where innovation happens, deals close, and brands thrive.
                </p>
              </div>
            </div>

            {/* Custom Excellence */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/custom/design-details/luxury-chandelier-interior.jpg"
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
                  Artisanal Detail
                </h3>
                <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light mb-4">
                  Beyond full spaces, we excel at capturing the artistry in details—bespoke furniture, designer lighting, architectural elements, and material textures that deserve their own spotlight.
                </p>
                <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light">
                  These images become visual poetry, perfect for portfolios, catalogs, and marketing materials that demand extraordinary attention to craft and composition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-32 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          <p className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-stone-400 mb-6 md:mb-8 text-center font-medium">
            Our Values
          </p>

          <h2 className="text-2xl md:text-5xl lg:text-6xl font-serif font-extralight text-stone-900 text-center mb-12 md:mb-24 max-w-4xl mx-auto leading-tight px-4">
            The principles that guide our work
          </h2>

          <div className="grid md:grid-cols-3 gap-10 md:gap-20 max-w-6xl mx-auto">
            <div className="text-center md:text-left group">
              <div className="flex justify-center md:justify-start mb-4 md:mb-6">
                <div className="w-12 h-px bg-stone-300 transition-all duration-500 group-hover:w-16"></div>
              </div>
              <h3 className="text-xl md:text-3xl font-serif font-light text-stone-900 mb-3 md:mb-4">Precision</h3>
              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light max-w-xs mx-auto md:mx-0">
                Every angle, every light, every detail is carefully considered to create perfect compositions.
              </p>
            </div>

            <div className="text-center md:text-left group">
              <div className="flex justify-center md:justify-start mb-4 md:mb-6">
                <div className="w-12 h-px bg-stone-300 transition-all duration-500 group-hover:w-16"></div>
              </div>
              <h3 className="text-xl md:text-3xl font-serif font-light text-stone-900 mb-3 md:mb-4">Excellence</h3>
              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light max-w-xs mx-auto md:mx-0">
                We deliver the highest quality images that exceed expectations and elevate your brand.
              </p>
            </div>

            <div className="text-center md:text-left group">
              <div className="flex justify-center md:justify-start mb-4 md:mb-6">
                <div className="w-12 h-px bg-stone-300 transition-all duration-500 group-hover:w-16"></div>
              </div>
              <h3 className="text-xl md:text-3xl font-serif font-light text-stone-900 mb-3 md:mb-4">Partnership</h3>
              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light max-w-xs mx-auto md:mx-0">
                We work closely with our clients to understand their vision and bring it to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-32 px-6 md:px-16 bg-gradient-to-b from-white to-stone-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-extralight text-stone-800 mb-2 md:mb-3">50</div>
              <p className="text-stone-500 tracking-[0.12em] uppercase text-[10px] md:text-xs font-light">Projects</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-extralight text-stone-800 mb-2 md:mb-3">50+</div>
              <p className="text-stone-500 tracking-[0.12em] uppercase text-[10px] md:text-xs font-light">Clients</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-extralight text-stone-800 mb-2 md:mb-3">4</div>
              <p className="text-stone-500 tracking-[0.12em] uppercase text-[10px] md:text-xs font-light">Years</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-extralight text-stone-800 mb-2 md:mb-3">100%</div>
              <p className="text-stone-500 tracking-[0.12em] uppercase text-[10px] md:text-xs font-light">Satisfaction</p>
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
            Let's work together
          </h2>
          <p className="text-base md:text-xl text-stone-400 mb-10 md:mb-12 font-light max-w-2xl mx-auto px-4">
            Get in touch to discuss your next project.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 md:px-12 md:py-5 bg-white text-stone-900 hover:bg-stone-50 transition-all duration-300 text-sm font-medium tracking-[0.1em] uppercase rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1"
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

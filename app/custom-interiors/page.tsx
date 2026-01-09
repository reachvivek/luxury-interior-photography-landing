"use client";

import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

// Portfolio categories
const portfolioCategories = [
  {
    id: "design-details",
    title: "Architectural Elements & Details",
    description: "Bespoke design features that define exceptional interiors",
    images: [
      "/images/custom/design-details/luxury-chandelier-interior.jpg",
    ]
  },
  {
    id: "architectural-elements",
    title: "Structural Beauty",
    description: "Bridges, facades, and architectural statements captured with precision",
    images: [
      "/images/custom/architectural-elements/bridge-pool-cityscape-sunset.jpg",
    ]
  }
];

export default function CustomInteriorsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section - Full Height */}
      <section className="relative h-screen w-full">
        <Image
          src="/images/custom/design-details/luxury-chandelier-interior.jpg"
          alt="Custom Interior Design Details"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center px-6 md:px-16">
          <div className="max-w-4xl w-full text-center">
            <p className="text-white text-xs md:text-sm tracking-[0.4em] uppercase mb-6 md:mb-8 opacity-90">
              Custom Interior Photography
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light text-white mb-6 md:mb-8 leading-tight">
              Architectural Artistry
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed font-light">
              Highlight architectural elements, furniture, and design details that make spaces unique and memorable.
            </p>
            <Link
              href="#portfolio"
              className="inline-block px-10 py-4 bg-transparent border border-white/70 text-white hover:bg-white hover:text-stone-900 transition-all duration-300 text-sm tracking-widest uppercase rounded-full"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 md:py-24 px-6 md:px-16 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
            </div>
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-4">
              Portfolio
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900">
              Featured Projects
            </h2>
          </div>

          {/* Portfolio Categories */}
          <div className="space-y-20 md:space-y-32">
            {portfolioCategories.map((category, categoryIndex) => (
              <div key={category.id} className="w-full">
                {/* Category Header */}
                <div className="mb-8 md:mb-12">
                  <h3 className="text-xl md:text-3xl font-serif font-light text-stone-900 mb-3">
                    {category.title}
                  </h3>
                  <p className="text-sm md:text-base text-stone-600 mb-6">
                    {category.description}
                  </p>

                  {/* WhatsApp Book Now Button */}
                  <div className="flex justify-center">
                    <a
                      href={`https://wa.me/971502060674?text=Hi%20Tsurov,%20I'm%20interested%20in%20booking%20a%20photography%20session%20for%20${encodeURIComponent(category.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 border border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900 hover:shadow-md transition-all duration-300 text-sm font-medium tracking-wide rounded-full group"
                    >
                      <svg
                        className="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Book Now
                    </a>
                  </div>
                </div>

                {/* Image Grid - Alternating Layouts */}
                {categoryIndex % 2 === 0 ? (
                  // Layout 1: Large left, 2 stacked right
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {category.images[0] && (
                      <div className="relative aspect-[4/3] md:aspect-[3/4] rounded-lg overflow-hidden group">
                        <Image
                          src={category.images[0]}
                          alt={`${category.title} 1`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}
                    <div className="grid grid-rows-2 gap-4 md:gap-6">
                      {category.images.slice(1, 3).map((image, idx) => (
                        <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                          <Image
                            src={image}
                            alt={`${category.title} ${idx + 2}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Layout 2: 3-column grid
                  <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                    {category.images.slice(0, 3).map((image, idx) => (
                      <div key={idx} className="relative aspect-[4/5] rounded-lg overflow-hidden group">
                        <Image
                          src={image}
                          alt={`${category.title} ${idx + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Show remaining images in a row if more than 3 */}
                {category.images.length > 3 && (
                  <div className="grid md:grid-cols-4 gap-4 md:gap-6 mt-4 md:mt-6">
                    {category.images.slice(3).map((image, idx) => (
                      <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                        <Image
                          src={image}
                          alt={`${category.title} ${idx + 4}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-16">
        <Image
          src="/images/custom/architectural-elements/bridge-pool-cityscape-sunset.jpg"
          alt="Contact Background"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-white mb-6 md:mb-8">
            Showcase your custom design
          </h2>
          <p className="text-base md:text-lg text-stone-200 mb-8 md:mb-10 max-w-2xl mx-auto">
            Let us capture the unique architectural elements and design details that set your space apart.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-stone-900 hover:bg-stone-100 hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium tracking-widest uppercase rounded-full"
          >
            Book a Shoot
          </Link>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

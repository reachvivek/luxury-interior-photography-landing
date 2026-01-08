"use client";

import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

// Portfolio categories
const portfolioCategories = [
  {
    id: "coworking-spaces",
    title: "Co-working Spaces & Cafes",
    description: "Modern workspaces designed for collaboration and productivity",
    images: [
      "/images/commercial/coworking-spaces/cofiesto-cafe-wide-interior.jpg",
      "/images/commercial/coworking-spaces/cofiesto-cafe-seating-area.jpg",
      "/images/commercial/coworking-spaces/cofiesto-cafe-window-seating.jpg",
      "/images/commercial/coworking-spaces/modern-workspace-lounge-seating.jpg",
    ]
  },
  {
    id: "retail-stores",
    title: "Retail Stores & Showrooms",
    description: "Commercial spaces that drive customer engagement and sales",
    images: [
      "/images/commercial/retail-stores/cofiesto-storefront-exterior.jpg",
      "/images/commercial/retail-stores/retail-store-product-shelving.jpg",
    ]
  }
];

export default function CommercialPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section - Full Height */}
      <section className="relative h-screen w-full">
        <Image
          src="/images/commercial/coworking-spaces/cofiesto-cafe-wide-interior.jpg"
          alt="Commercial Interior Photography"
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
              Commercial Photography
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light text-white mb-6 md:mb-8 leading-tight">
              Professional Spaces Captured
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed font-light">
              Showcase offices, retail stores, and commercial spaces with photography that elevates your brand and drives business.
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

      {/* About Section */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-gradient-to-b from-white to-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative Line */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-6">
            Our Approach
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900 mb-6 md:mb-8">
            Elevating Commercial Brands
          </h2>
          <p className="text-base md:text-lg text-stone-600 leading-relaxed max-w-3xl mx-auto">
            We specialize in photographing office spaces, retail environments, and commercial developments across the UAE. Our imagery showcases design excellence, brand identity, and the professional atmosphere that attracts clients and customers.
          </p>
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
                  <p className="text-sm md:text-base text-stone-600">
                    {category.description}
                  </p>
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
          src="/images/commercial/coworking-spaces/modern-workspace-lounge-seating.jpg"
          alt="Contact Background"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-white mb-6 md:mb-8">
            Ready to elevate your brand?
          </h2>
          <p className="text-base md:text-lg text-stone-200 mb-8 md:mb-10 max-w-2xl mx-auto">
            Let's create professional imagery that showcases your commercial space and strengthens your brand presence.
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

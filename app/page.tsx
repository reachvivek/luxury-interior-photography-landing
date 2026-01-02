import Link from "next/link";
import Navigation from "@/components/Navigation";
import Image from "next/image";

export default function Home() {
  const residentialSpaces = [
    { title: "Luxury Villas", image: "/images/7.png", href: "/residential#villas" },
    { title: "Apartments", image: "/images/4.png", href: "/residential#apartments" },
    { title: "Penthouses", image: "/images/13.png", href: "/residential#penthouses" },
    { title: "Home Offices", image: "/images/12.png", href: "/residential#offices" },
  ];

  const hospitalitySpaces = [
    { title: "Hotel Suites", image: "/images/12.png", href: "/hospitality#suites" },
    { title: "Restaurants", image: "/images/10.png", href: "/hospitality#restaurants" },
    { title: "Event Spaces", image: "/images/11.png", href: "/hospitality#events" },
    { title: "Event Spaces", image: "/images/10.png", href: "/hospitality#events" },
  ];

  const commercialSpaces = [
    { title: "Office Spaces", image: "/images/12.png", href: "/commercial#offices" },
    { title: "Co-working Spaces", image: "/images/11.png", href: "/commercial#coworking" },
    { title: "Retail Stores", image: "/images/9.png", href: "/commercial#retail" },
    { title: "Showrooms", image: "/images/1.png", href: "/commercial#showrooms" },
  ];

  const customInteriorsSpaces = [
    { title: "Unique Architectural Elements", image: "/images/1.png", href: "/custom-interiors#architecture" },
    { title: "Custom Furniture Photography", image: "/images/5.png", href: "/custom-interiors#furniture" },
    { title: "Material Close-Ups", image: "/images/3.png", href: "/custom-interiors#materials" },
    { title: "Design Details", image: "/images/8.png", href: "/custom-interiors#details" },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section>
        <div className="relative h-screen">
          <Image
            src="/images/hero.png"
            alt="Luxury Interior"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/50"></div>

          {/* Content */}
          <div className="relative z-10 flex items-start justify-center h-full pt-[58px] md:pt-[90px] pb-32 px-6 md:px-16">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[72px] font-serif font-light text-stone-900 mb-6 md:whitespace-nowrap">
                Exceptional Interior Photography
              </h1>
              <p className="text-lg sm:text-xl md:text-[20px] text-stone-600 mb-12 max-w-2xl mx-auto leading-relaxed tracking-wide">
                Capturing Luxury, Elegance, and Detail.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <Link
                  href="/portfolio"
                  className="px-8 py-4 bg-stone-900 text-white hover:bg-stone-800 hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium tracking-widest uppercase"
                >
                  View Portfolio
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-200 text-sm font-medium tracking-widest uppercase"
                >
                  Book a Shoot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Residential Spaces */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-[48px] font-serif font-normal text-stone-900 text-center mb-16">
            Residential Spaces
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {residentialSpaces.map((space) => (
              <Link
                key={space.title}
                href={space.href}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] bg-stone-200 mb-4 overflow-hidden">
                  <Image
                    src={space.image}
                    alt={space.title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-[600ms] ease-out"
                    style={{ transition: "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)" }}
                  />
                </div>
                <h3 className="text-[28px] font-serif font-medium text-stone-900 text-center">
                  {space.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hotels & Hospitality */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-[48px] font-serif font-normal text-stone-900 text-center mb-16">
            Hotels & Hospitality
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {hospitalitySpaces.map((space, index) => (
              <Link
                key={`${space.title}-${index}`}
                href={space.href}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] bg-stone-200 mb-4 overflow-hidden">
                  <Image
                    src={space.image}
                    alt={space.title}
                    fill
                    className="object-cover"
                    style={{ transition: "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)" }}
                  />
                </div>
                <h3 className="text-[28px] font-serif font-medium text-stone-900 text-center">
                  {space.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial & Industry */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-[48px] font-serif font-normal text-stone-900 text-center mb-16">
            Commercial & Industry
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {commercialSpaces.map((space) => (
              <Link
                key={space.title}
                href={space.href}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] bg-stone-200 mb-4 overflow-hidden">
                  <Image
                    src={space.image}
                    alt={space.title}
                    fill
                    className="object-cover"
                    style={{ transition: "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)" }}
                  />
                </div>
                <h3 className="text-[28px] font-serif font-medium text-stone-900 text-center">
                  {space.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Interiors */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-[48px] font-serif font-normal text-stone-900 text-center mb-16">
            Custom Interiors
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {customInteriorsSpaces.map((space) => (
              <Link
                key={space.title}
                href={space.href}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] bg-stone-200 mb-4 overflow-hidden">
                  <Image
                    src={space.image}
                    alt={space.title}
                    fill
                    className="object-cover"
                    style={{ transition: "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)" }}
                  />
                </div>
                <h3 className="text-[28px] font-serif font-medium text-stone-900 text-center">
                  {space.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-serif font-light italic text-stone-700 mb-8 leading-relaxed">
            "Tsurov's photography elevated our interiors to another level."
          </blockquote>
          <p className="text-lg text-stone-500 tracking-wide">
            — Emily Ross, Interior Designer
          </p>
        </div>
      </section>
    </div>
  );
}

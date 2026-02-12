"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/constants/navigation";
import { ANIMATION } from "@/constants/animation";
import ServicesDropdown from "@/components/ServicesDropdown";

const servicesData = [
  {
    title: "Residential",
    href: "/residential",
    subcategories: [
      { title: "Luxury Villas", href: "/residential/luxury-villas-photography-dubai" },
      { title: "Apartments & Penthouses", href: "/residential/apartments-penthouses-photography-dubai" },
      { title: "Vacation Rentals", href: "/residential/vacation-rentals-photography-dubai" }
    ]
  },
  {
    title: "Hotels & Hospitality",
    href: "/hospitality",
    subcategories: [
      { title: "Hotel Suites", href: "/hospitality/hotel-suites-photography-dubai" },
      { title: "Resorts", href: "/hospitality/resorts-photography-dubai" },
      { title: "Restaurants", href: "/hospitality/restaurants-photography-dubai" },
      { title: "Event Spaces", href: "/hospitality/event-spaces-photography-dubai" }
    ]
  },
  {
    title: "Commercial & Industry",
    href: "/commercial",
    subcategories: [
      { title: "Office Spaces", href: "/commercial/office-spaces-photography-dubai" },
      { title: "Co-working Spaces", href: "/commercial/coworking-spaces-photography-dubai" },
      { title: "Retail Stores", href: "/commercial/retail-stores-photography-dubai" },
      { title: "Showrooms", href: "/commercial/showrooms-photography-dubai" }
    ]
  },
  {
    title: "Custom Interiors",
    href: "/custom-interiors",
    subcategories: [
      { title: "Architectural Elements", href: "/custom-interiors/architectural-elements-photography-dubai" },
      { title: "Custom Furniture", href: "/custom-interiors/custom-furniture-photography-dubai" },
      { title: "Material Close-ups", href: "/custom-interiors/material-closeups-photography-dubai" },
      { title: "Design Details", href: "/custom-interiors/design-details-photography-dubai" }
    ]
  }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > window.innerHeight * 0.8);

      if (currentScrollY < ANIMATION.HEADER_HIDE_THRESHOLD) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);


  return (
    <>
      <style jsx>{`
        .logo-container-desktop,
        .logo-container-mobile,
        .logo-container-drawer {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.35);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          padding: 0 !important;
          margin: 0 !important;
          line-height: 0;
        }

        .logo-container-desktop {
          width: 44px;
          height: 44px;
        }

        .logo-container-mobile {
          width: 38px;
          height: 38px;
        }

        .logo-container-drawer {
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.06);
        }

        .logo-container-desktop :global(img),
        .logo-container-mobile :global(img),
        .logo-container-drawer :global(img) {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          display: block !important;
          margin: 0 !important;
          padding: 0 !important;
          border: none !important;
          vertical-align: top !important;
        }
      `}</style>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'backdrop-blur-xl bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.04)]'
          : 'backdrop-blur-md bg-gradient-to-b from-black/40 via-black/20 to-transparent'
      }`}>
        {/* Desktop Navigation — compact, gallery-minimal */}
        <div className="hidden lg:block w-full px-8 lg:px-16 xl:px-24 py-3">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between">
            {/* Left — Logo lockup with differentiated ".Space" */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="logo-container-desktop transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src="/logo/myvisualspace_logo.png"
                  alt="MyVisual.Space"
                  width={44}
                  height={44}
                  priority
                  className="logo-image"
                />
              </div>
              <span className={`font-serif text-lg tracking-[0.25em] cursor-pointer transition-all duration-300 uppercase font-light ${
                isScrolled ? 'text-stone-800 group-hover:text-stone-500' : 'text-white/95 group-hover:text-white'
              }`}>
                MyVisual<span className={`font-extralight ${isScrolled ? 'text-stone-400' : 'text-white/55'}`}>.Space</span>
              </span>
            </Link>

            {/* Right — Nav links + CTA */}
            <div className="flex gap-7 items-center">
              <nav className={`flex gap-7 items-center transition-colors duration-300 ${
                isScrolled ? 'text-stone-600' : 'text-white/75'
              }`}>
                {NAV_LINKS.left.map((link) => (
                  link.label === "Services" ? (
                    <ServicesDropdown key={link.href} isScrolled={isScrolled} />
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`transition-all duration-300 font-normal tracking-[0.15em] uppercase text-[11px] whitespace-nowrap hover:opacity-100 ${
                        isScrolled
                          ? 'opacity-70 hover:text-stone-900'
                          : 'opacity-75 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                ))}
                {NAV_LINKS.right.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-all duration-300 font-normal tracking-[0.15em] uppercase text-[11px] whitespace-nowrap hover:opacity-100 ${
                      isScrolled
                        ? 'opacity-70 hover:text-stone-900'
                        : 'opacity-75 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              {/* CTA — soft pill, gallery concierge feel */}
              <Link
                href="/contact"
                className={`px-5 py-2 transition-all duration-300 text-[11px] font-normal tracking-[0.15em] uppercase whitespace-nowrap rounded-full ${
                  isScrolled
                    ? 'border border-stone-200 text-stone-500 hover:bg-stone-900 hover:text-white hover:border-stone-900'
                    : 'border border-white/25 text-white/70 hover:bg-white hover:text-stone-900 hover:border-white'
                }`}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation — compact */}
        <div className="lg:hidden w-full px-5 py-2.5 grid grid-cols-3 items-center">
          <Link href="/" className="flex items-center">
            <div className="logo-container-mobile">
              <Image
                src="/logo/myvisualspace_logo.png"
                alt="MyVisual.Space"
                width={38}
                height={38}
                priority
                className="logo-image"
              />
            </div>
          </Link>
          <Link href="/" className="flex justify-center">
            <span className={`font-serif text-base font-light tracking-[0.25em] cursor-pointer transition-all duration-300 uppercase ${
              isScrolled ? 'text-stone-800' : 'text-white/95'
            }`} style={!isScrolled ? { textShadow: '0 1px 6px rgba(0,0,0,0.5)' } : {}}>
              MyVisual<span className={`font-extralight ${isScrolled ? 'text-stone-400' : 'text-white/55'}`}>.Space</span>
            </span>
          </Link>
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-1.5 transition-colors duration-300 ${
                isScrolled ? 'text-stone-700' : 'text-white/90'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-5 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="logo-container-drawer">
                <Image
                  src="/logo/myvisualspace_logo.png"
                  alt="MyVisual.Space"
                  width={44}
                  height={44}
                  className="logo-image"
                />
              </div>
              <span className="font-serif text-lg font-light text-stone-700 tracking-[0.2em] uppercase">Menu</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-700 transition-colors"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Menu Content */}
          <nav className="flex-1 overflow-y-auto px-5 py-6">
            <div className="flex flex-col space-y-5">
              {[...NAV_LINKS.left, ...NAV_LINKS.right].map((link) => (
                link.label === "Services" ? (
                  <div key={link.href}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full flex items-center justify-between text-stone-600 hover:text-stone-900 transition-colors font-normal tracking-[0.15em] text-sm py-1.5 uppercase border-b border-stone-100 hover:border-stone-200"
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileServicesOpen && (
                      <div className="mt-3 space-y-2">
                        {servicesData.map((service) => (
                          <div key={service.href} className="border-l border-stone-200 pl-4">
                            <div className="flex items-center justify-between">
                              <Link
                                href={service.href}
                                onClick={() => setIsOpen(false)}
                                className="flex-1 text-stone-600 hover:text-stone-900 transition-colors text-xs py-1.5 font-medium tracking-wide"
                              >
                                {service.title}
                              </Link>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedService(expandedService === service.href ? null : service.href);
                                }}
                                className="p-1 text-stone-400 hover:text-stone-700 transition-colors"
                              >
                                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${expandedService === service.href ? 'rotate-180' : ''}`} />
                              </button>
                            </div>
                            {expandedService === service.href && (
                              <div className="ml-2 mt-1 space-y-1 border-l border-stone-100 pl-3">
                                {service.subcategories.map((sub) => (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-stone-500 hover:text-stone-800 transition-all text-[11px] py-1.5 hover:pl-1"
                                  >
                                    {sub.title}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-stone-600 hover:text-stone-900 transition-colors font-normal tracking-[0.15em] text-sm py-1.5 uppercase border-b border-stone-100 hover:border-stone-200"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </nav>

          {/* Menu Footer */}
          <div className="p-5 border-t border-stone-100">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full px-5 py-2.5 bg-stone-800 text-white hover:bg-stone-700 transition-all duration-200 text-[11px] font-normal tracking-[0.15em] text-center uppercase rounded-full"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

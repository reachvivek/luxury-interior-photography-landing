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
      { title: "Luxury Villas", href: "/residential/villas" },
      { title: "Apartments", href: "/residential/apartments" },
      { title: "Penthouses", href: "/residential/penthouses" },
      { title: "Home Offices", href: "/residential/home-offices" }
    ]
  },
  {
    title: "Hotels & Hospitality",
    href: "/hospitality",
    subcategories: [
      { title: "Hotel Suites", href: "/hospitality/hotel-suites" },
      { title: "Restaurants", href: "/hospitality/restaurants" },
      { title: "Event Spaces", href: "/hospitality/event-spaces" }
    ]
  },
  {
    title: "Commercial & Industry",
    href: "/commercial",
    subcategories: [
      { title: "Office Spaces", href: "/commercial/office-spaces" },
      { title: "Co-working Spaces", href: "/commercial/coworking-spaces" },
      { title: "Retail Stores", href: "/commercial/retail-stores" },
      { title: "Showrooms", href: "/commercial/showrooms" }
    ]
  },
  {
    title: "Custom Interiors",
    href: "/custom-interiors",
    subcategories: [
      { title: "Architectural Elements", href: "/custom-interiors/architectural-elements" },
      { title: "Custom Furniture", href: "/custom-interiors/custom-furniture" },
      { title: "Material Close-ups", href: "/custom-interiors/materials" },
      { title: "Design Details", href: "/custom-interiors/design-details" }
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

      // Check if scrolled past hero section (viewport height)
      setIsScrolled(currentScrollY > window.innerHeight * 0.8);

      if (currentScrollY < ANIMATION.HEADER_HIDE_THRESHOLD) {
        // Always show header at the top of the page
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
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
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          padding: 0 !important;
          margin: 0 !important;
          line-height: 0;
        }

        .logo-container-desktop {
          width: 70px;
          height: 70px;
        }

        .logo-container-mobile {
          width: 60px;
          height: 60px;
        }

        .logo-container-drawer {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
          border: 1px solid rgba(0, 0, 0, 0.08);
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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled ? 'backdrop-blur-md bg-white/95' : 'backdrop-blur-[2px] bg-black/10'
      }`}>
        {/* Desktop Navigation */}
        <div className="hidden lg:block w-full px-6 md:px-16 lg:px-24 py-5">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between">
            {/* Left - Brand Name */}
            <Link href="/" className="flex items-center gap-3">
              <div className="logo-container-desktop">
                <Image
                  src="/logo/LOGO-NASHRAY.png"
                  alt="NASHRAY"
                  width={70}
                  height={70}
                  priority
                  className="logo-image"
                />
              </div>
              <h1 className={`font-serif text-2xl md:text-3xl tracking-[0.2em] cursor-pointer transition-colors duration-300 uppercase font-light ${
                isScrolled ? 'text-stone-900 hover:text-stone-600' : 'text-white hover:text-stone-200'
              }`}>
                NASHRAY
              </h1>
            </Link>

            {/* Right - Navigation Links & Button */}
            <div className="flex gap-8 items-center">
              <nav className={`flex gap-8 items-center transition-colors duration-300 ${
                isScrolled ? 'text-stone-900' : 'text-white'
              }`}>
                {NAV_LINKS.left.map((link) => (
                  link.label === "Services" ? (
                    <ServicesDropdown key={link.href} isScrolled={isScrolled} />
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`transition-colors duration-300 font-normal tracking-wide uppercase text-xs whitespace-nowrap ${
                        isScrolled ? 'hover:text-stone-600' : 'hover:text-stone-200'
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
                    className={`transition-colors duration-300 font-normal tracking-wide uppercase text-xs whitespace-nowrap ${
                      isScrolled ? 'hover:text-stone-600' : 'hover:text-stone-200'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Link
                href="/contact"
                className={`px-6 py-3 border transition-all duration-300 text-xs font-normal tracking-wide uppercase whitespace-nowrap rounded-full ${
                  isScrolled
                    ? 'border-stone-300 text-stone-900 hover:bg-stone-900 hover:text-white hover:border-stone-900'
                    : 'border-white/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-stone-900 hover:border-white'
                }`}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden w-full px-6 py-4 grid grid-cols-3 items-center">
          <Link href="/" className="flex items-center">
            <div className="logo-container-mobile">
              <Image
                src="/logo/LOGO-NASHRAY.png"
                alt="NASHRAY"
                width={60}
                height={60}
                priority
                className="logo-image"
              />
            </div>
          </Link>
          <Link href="/" className="flex justify-center">
            <h1 className={`font-serif text-xl font-light tracking-[0.2em] cursor-pointer transition-colors duration-300 uppercase ${
              isScrolled ? 'text-stone-900' : 'text-white'
            }`}>
              NASHRAY
            </h1>
          </Link>
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 drop-shadow-sm transition-colors duration-300 ${
                isScrolled ? 'text-stone-900' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Outside header */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer - Outside header */}
      <div className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="logo-container-drawer">
                <Image
                  src="/logo/LOGO-NASHRAY.png"
                  alt="NASHRAY"
                  width={60}
                  height={60}
                  className="logo-image"
                />
              </div>
              <h2 className="font-serif text-2xl font-light text-stone-800 tracking-[0.2em]">MENU</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Menu Content */}
          <nav className="flex-1 overflow-y-auto px-6 py-8">
            <div className="flex flex-col space-y-6">
              {[...NAV_LINKS.left, ...NAV_LINKS.right].map((link) => (
                link.label === "Services" ? (
                  <div key={link.href}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full flex items-center justify-between text-stone-700 hover:text-stone-900 transition-colors font-medium tracking-wide text-base py-2 uppercase border-b border-stone-100 hover:border-stone-300"
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileServicesOpen && (
                      <div className="mt-3 space-y-2">
                        {servicesData.map((service) => (
                          <div key={service.href} className="border-l-2 border-stone-200 pl-4">
                            <div className="flex items-center justify-between">
                              <Link
                                href={service.href}
                                onClick={() => setIsOpen(false)}
                                className="flex-1 text-stone-700 hover:text-stone-900 transition-colors text-sm py-2 font-medium"
                              >
                                {service.title}
                              </Link>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedService(expandedService === service.href ? null : service.href);
                                }}
                                className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
                              >
                                <ChevronDown className={`w-3 h-3 transition-transform ${expandedService === service.href ? 'rotate-180' : ''}`} />
                              </button>
                            </div>
                            {expandedService === service.href && (
                              <div className="ml-2 mt-1 space-y-1 border-l border-stone-200 pl-3">
                                {service.subcategories.map((sub) => (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-stone-600 hover:text-stone-900 transition-colors text-xs py-1.5"
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
                    className="text-stone-700 hover:text-stone-900 transition-colors font-medium tracking-wide text-base py-2 uppercase border-b border-stone-100 hover:border-stone-300"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </nav>

          {/* Menu Footer */}
          <div className="p-6 border-t border-stone-200">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full px-6 py-3 bg-stone-900 text-white hover:bg-stone-800 transition-all duration-200 text-xs font-normal tracking-wide text-center uppercase rounded-full"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

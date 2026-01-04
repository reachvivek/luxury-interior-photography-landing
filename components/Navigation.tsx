"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants/navigation";
import { ANIMATION } from "@/constants/animation";
import PortfolioDropdown from "@/components/PortfolioDropdown";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

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
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        {/* Desktop Navigation */}
        <div className="hidden lg:block w-full px-6 md:px-16 py-4">
          <div className="max-w-7xl mx-auto grid grid-cols-3 items-center gap-8">
            {/* Left - Navigation Links */}
            <nav className={`flex gap-6 text-sm items-center transition-colors duration-300 ${
              isScrolled ? 'text-stone-900' : 'text-white'
            }`}>
              {NAV_LINKS.left.map((link) => (
                link.label === "Portfolio" ? (
                  <PortfolioDropdown key={link.href} isScrolled={isScrolled} />
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors duration-300 font-semibold tracking-wide uppercase text-xs whitespace-nowrap ${
                      isScrolled ? 'hover:text-stone-600' : 'hover:text-stone-200'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Center - Brand Name */}
            <Link href="/" className="flex justify-center">
              <h1 className={`font-serif text-3xl font-light tracking-[0.3em] cursor-pointer transition-colors duration-300 ${
                isScrolled ? 'text-stone-900 hover:text-stone-600' : 'text-white hover:text-stone-200'
              }`}>
                TSUROV
              </h1>
            </Link>

            {/* Right - Navigation Links & Button */}
            <div className="flex gap-6 items-center justify-end">
              <nav className={`flex gap-6 text-sm items-center transition-colors duration-300 ${
                isScrolled ? 'text-stone-900' : 'text-white'
              }`}>
                {NAV_LINKS.right.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors duration-300 font-semibold tracking-wide uppercase text-xs whitespace-nowrap ${
                      isScrolled ? 'hover:text-stone-600' : 'hover:text-stone-200'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Link
                href="/contact"
                className={`px-6 py-2.5 border-2 transition-all duration-300 text-xs font-semibold tracking-wide uppercase whitespace-nowrap rounded-full ${
                  isScrolled
                    ? 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white'
                    : 'border-white text-white hover:bg-white hover:text-stone-800'
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
            <Image
              src="/logo/tsurov-model.png"
              alt="TSUROV"
              width={50}
              height={50}
              priority
              className="cursor-pointer object-contain"
            />
          </Link>
          <Link href="/" className="flex justify-center">
            <h1 className={`font-serif text-xl font-light tracking-[0.3em] cursor-pointer transition-colors duration-300 ${
              isScrolled ? 'text-stone-900' : 'text-white'
            }`}>
              TSUROV
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
            <h2 className="font-serif text-2xl font-light text-stone-800 tracking-[0.2em]">MENU</h2>
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
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-stone-700 hover:text-stone-900 transition-colors font-medium tracking-wide text-base py-2 uppercase border-b border-stone-100 hover:border-stone-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Menu Footer */}
          <div className="p-6 border-t border-stone-200">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full px-6 py-3 bg-stone-800 text-white hover:bg-stone-900 transition-all duration-200 text-sm font-semibold tracking-wide text-center uppercase rounded-full"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

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

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

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
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      {/* Desktop Navigation */}
      <div className="hidden lg:block w-full px-6 md:px-16 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center gap-8">
          {/* Left - Navigation Links */}
          <nav className="flex gap-6 text-sm text-white items-center">
            {NAV_LINKS.left.map((link) => (
              link.label === "Portfolio" ? (
                <PortfolioDropdown key={link.href} />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-stone-200 transition-colors duration-150 font-semibold tracking-wide uppercase text-xs whitespace-nowrap"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* Center - Brand Name */}
          <Link href="/" className="flex justify-center">
            <h1 className="font-serif text-3xl font-light text-white tracking-[0.3em] cursor-pointer hover:text-stone-200 transition-colors">
              TSUROV
            </h1>
          </Link>

          {/* Right - Navigation Links & Button */}
          <div className="flex gap-6 items-center justify-end">
            <nav className="flex gap-6 text-sm text-white items-center">
              {NAV_LINKS.right.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-stone-200 transition-colors duration-150 font-semibold tracking-wide uppercase text-xs whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/contact"
              className="px-6 py-2.5 border-2 border-white text-white hover:bg-white hover:text-stone-800 hover:border-white transition-all duration-200 text-xs font-semibold tracking-wide uppercase whitespace-nowrap"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden w-full px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/tsurov-white.png"
            alt="TSUROV"
            width={70}
            height={70}
            priority
            className="cursor-pointer object-contain"
          />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white drop-shadow-sm"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#EBE6E5]/95 backdrop-blur-md border-t border-stone-200/50">
          <nav className="flex flex-col px-6 py-6 space-y-6">
            {[...NAV_LINKS.left, ...NAV_LINKS.right].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-stone-700 hover:text-stone-900 transition-colors font-medium tracking-wide text-sm py-2 uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 border-2 border-stone-400 text-stone-800 hover:bg-stone-800 hover:text-white hover:border-stone-800 transition-all duration-200 text-sm font-medium tracking-wide text-center mt-4 uppercase"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

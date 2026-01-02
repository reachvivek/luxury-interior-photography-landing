"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/residential", label: "Residential" },
    { href: "/hospitality", label: "Hospitality" },
    { href: "/commercial", label: "Commercial" },
    { href: "/custom-interiors", label: "Custom Interiors" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#f5f3f0] border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif font-light text-stone-900 tracking-[0.02em]">
          TSUROV
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-10 text-sm text-stone-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-stone-900 transition-colors duration-150 font-medium tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button - Desktop */}
        <Link
          href="/contact"
          className="hidden lg:block px-6 py-2.5 border border-stone-800 text-stone-800 hover:bg-stone-900 hover:text-white transition-all duration-200 text-sm font-medium tracking-wide"
        >
          Get in Touch
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-stone-900"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-white/20">
          <nav className="flex flex-col px-6 py-6 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-stone-700 hover:text-stone-900 transition-colors font-medium tracking-wide text-sm py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 border border-stone-800 text-stone-800 hover:bg-stone-900 hover:text-white transition-all duration-200 text-sm font-medium tracking-wide text-center mt-4"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

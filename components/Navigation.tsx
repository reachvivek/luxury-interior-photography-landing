"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const leftNavLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#services", label: "Services" },
  ];

  const rightNavLinks = [
    { href: "/#portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#EBE6E5] border-b border-stone-200/50">
      {/* Desktop Navigation */}
      <div className="hidden lg:block max-w-7xl mx-auto px-6 md:px-16 py-5">
        <div className="grid grid-cols-3 items-center gap-8">
          {/* Left Navigation */}
          <nav className="flex gap-8 text-sm text-stone-700 justify-start">
            {leftNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-stone-900 transition-colors duration-150 font-medium tracking-wide uppercase text-xs"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Centered Logo */}
          <Link
            href="/"
            className="text-2xl font-serif font-light text-stone-900 tracking-[0.02em] text-center"
          >
            TSUROV
          </Link>

          {/* Right Navigation */}
          <div className="flex gap-8 items-center justify-end">
            {rightNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-stone-900 transition-colors duration-150 font-medium tracking-wide uppercase text-xs text-stone-700"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-stone-800 text-white hover:bg-stone-900 transition-all duration-200 text-xs font-medium tracking-wide uppercase"
            >
              Book
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-light text-stone-900 tracking-[0.02em]">
          TSUROV
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-stone-900"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-white/20">
          <nav className="flex flex-col px-6 py-6 space-y-6">
            {[...leftNavLinks, ...rightNavLinks].map((link) => (
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
              className="px-6 py-3 bg-stone-800 text-white hover:bg-stone-900 transition-all duration-200 text-sm font-medium tracking-wide text-center mt-4 uppercase"
            >
              Book
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

const serviceDirections = [
  {
    title: "Residential",
    href: "/residential",
  },
  {
    title: "Hotels & Hospitality",
    href: "/hospitality",
  },
  {
    title: "Commercial & Industry",
    href: "/commercial",
  },
  {
    title: "Custom Interiors",
    href: "/custom-interiors",
  },
];

interface ServicesDropdownProps {
  isScrolled?: boolean;
}

export default function ServicesDropdown({ isScrolled = false }: ServicesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Open dropdown on hover
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  // Close dropdown on mouse leave (with delay)
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1 transition-colors duration-300 font-normal tracking-wide uppercase text-xs ${
          isScrolled ? 'text-stone-900 hover:text-stone-600' : 'text-white hover:text-stone-200'
        }`}
      >
        Services
        <ChevronDown className={`w-3 h-3 opacity-70 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-stone-50 shadow-lg border border-stone-200 rounded-lg p-6 z-50">
          <div className="flex flex-col space-y-4">
            {serviceDirections.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="text-base font-serif font-light text-stone-900 hover:text-stone-600 transition-colors py-2 block"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

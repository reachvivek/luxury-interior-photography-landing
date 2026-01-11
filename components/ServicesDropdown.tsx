"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const servicesData = [
  {
    title: "Residential",
    href: "/residential",
    subcategories: [
      { title: "Luxury Villas", href: "/residential#villas" },
      { title: "Apartments", href: "/residential#apartments" },
      { title: "Penthouses", href: "/residential#penthouses" },
      { title: "Home Offices", href: "/residential#home-offices" }
    ]
  },
  {
    title: "Hotels & Hospitality",
    href: "/hospitality",
    subcategories: [
      { title: "Hotel Suites", href: "/hospitality#hotel-suites" },
      { title: "Restaurants", href: "/hospitality#restaurants" },
      { title: "Event Spaces", href: "/hospitality#event-spaces" }
    ]
  },
  {
    title: "Commercial & Industry",
    href: "/commercial",
    subcategories: [
      { title: "Office Spaces", href: "/commercial#office-spaces" },
      { title: "Co-working Spaces", href: "/commercial#coworking-spaces" },
      { title: "Retail Stores", href: "/commercial#retail-stores" },
      { title: "Showrooms", href: "/commercial#showrooms" }
    ]
  },
  {
    title: "Custom Interiors",
    href: "/custom-interiors",
    subcategories: [
      { title: "Architectural Elements", href: "/custom-interiors#architectural-elements" },
      { title: "Custom Furniture", href: "/custom-interiors#custom-furniture" },
      { title: "Material Close-ups", href: "/custom-interiors#materials" },
      { title: "Design Details", href: "/custom-interiors#design-details" }
    ]
  }
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
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[580px] max-w-[calc(100vw-2rem)] bg-white shadow-2xl border border-stone-200/60 rounded-2xl overflow-hidden z-50">
          <div className="grid grid-cols-2 divide-x divide-stone-200/50">
            {servicesData.map((service, index) => (
              <div
                key={service.href}
                className="p-5 hover:bg-stone-50/50 transition-all duration-200"
              >
                <Link
                  href={service.href}
                  className="group flex items-center justify-between mb-3 pb-2 border-b border-stone-200"
                >
                  <h3 className="text-sm font-serif font-medium text-stone-900 group-hover:text-stone-600 transition-colors uppercase tracking-wide">
                    {service.title}
                  </h3>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <ul className="space-y-1.5 pl-0">
                  {service.subcategories.map((sub) => (
                    <li key={sub.href}>
                      <Link
                        href={sub.href}
                        className="text-xs text-stone-600 hover:text-stone-900 transition-all block py-1 hover:pl-1.5 rounded hover:bg-stone-100/50"
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

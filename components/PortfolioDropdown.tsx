"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

const portfolioCategories = [
  {
    title: "Residential",
    href: "/residential",
    items: [
      { label: "Luxury Villas", href: "/residential#villas" },
      { label: "Apartments", href: "/residential#apartments" },
      { label: "Penthouses", href: "/residential#penthouses" },
      { label: "Home Offices", href: "/residential#offices" },
    ],
  },
  {
    title: "Hotels & Hospitality",
    href: "/hospitality",
    items: [
      { label: "Hotel Suites", href: "/hospitality#suites" },
      { label: "Restaurants", href: "/hospitality#restaurants" },
      { label: "Event Spaces", href: "/hospitality#events" },
    ],
  },
  {
    title: "Commercial & Industry",
    href: "/commercial",
    items: [
      { label: "Office Spaces", href: "/commercial#offices" },
      { label: "Co-working Spaces", href: "/commercial#coworking" },
      { label: "Retail Stores", href: "/commercial#retail" },
      { label: "Showrooms", href: "/commercial#showrooms" },
    ],
  },
  {
    title: "Custom Interiors",
    href: "/custom-interiors",
    items: [
      { label: "Unique Architectural Elements", href: "/custom-interiors#architecture" },
      { label: "Custom Furniture Photography", href: "/custom-interiors#furniture" },
      { label: "Material Close-Ups", href: "/custom-interiors#materials" },
      { label: "Design Details", href: "/custom-interiors#details" },
    ],
  },
];

interface PortfolioDropdownProps {
  isScrolled?: boolean;
}

export default function PortfolioDropdown({ isScrolled = false }: PortfolioDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={`flex items-center gap-1 transition-colors duration-300 font-normal tracking-wide uppercase text-xs ${
        isScrolled ? 'text-stone-900 hover:text-stone-600' : 'text-white hover:text-stone-200'
      }`}>
        Portfolio
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[800px] bg-white shadow-xl border border-stone-200 rounded-lg p-8 z-50">
          <div className="grid grid-cols-2 gap-10">
            {portfolioCategories.map((category) => (
              <div key={category.href}>
                <Link
                  href={category.href}
                  className="text-lg font-serif font-light text-stone-900 hover:text-stone-600 transition-colors mb-4 block tracking-wide"
                >
                  {category.title}
                </Link>
                <ul className="space-y-2.5 pl-1">
                  {category.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm font-normal text-stone-500 hover:text-stone-900 transition-colors block"
                      >
                        {item.label}
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

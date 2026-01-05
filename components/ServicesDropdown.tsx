"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown on click
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on ESC key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center gap-1 transition-colors duration-300 font-normal tracking-wide uppercase text-xs ${
          isScrolled ? 'text-stone-900 hover:text-stone-600' : 'text-white hover:text-stone-200'
        }`}
      >
        Services
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-72 bg-white shadow-xl border border-stone-200 rounded-lg p-6 z-50"
          role="menu"
          aria-label="Service directions"
        >
          <div className="flex flex-col space-y-3">
            {serviceDirections.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                onClick={() => setIsOpen(false)}
                role="menuitem"
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

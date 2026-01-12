"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

interface ServiceNavMenuProps {
  mainCategory: string;
  mainCategoryHref: string;
  navItems: NavItem[];
}

export default function ServiceNavMenu({
  mainCategory,
  mainCategoryHref,
  navItems,
}: ServiceNavMenuProps) {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex items-center gap-2 py-4 overflow-x-auto hide-scrollbar">
          {/* Main Category Link */}
          <Link
            href={mainCategoryHref}
            className={`flex-shrink-0 px-4 py-2 text-xs md:text-sm font-medium tracking-wide transition-all duration-300 rounded-full ${
              pathname === mainCategoryHref
                ? "bg-stone-900 text-white"
                : "bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            All {mainCategory}
          </Link>

          {/* Divider */}
          <div className="h-4 w-px bg-stone-300 flex-shrink-0 mx-1"></div>

          {/* Subcategory Links */}
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-shrink-0 px-4 py-2 text-xs md:text-sm font-medium tracking-wide transition-all duration-300 rounded-full whitespace-nowrap ${
                  isActive
                    ? "bg-stone-900 text-white"
                    : "bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";

interface Service {
  title: string;
  description: string;
  image: string;
  href: string;
  number: string;
}

interface MobileServicesShowcaseProps {
  services: Service[];
}

export default function MobileServicesShowcase({ services }: MobileServicesShowcaseProps) {
  return (
    <div className="md:hidden py-12 px-6">
      <div className="max-w-lg mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          {/* Decorative Line */}
          <div className="flex justify-center mb-4">
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-amber-600 to-transparent"></div>
          </div>
          <h2 className="text-3xl font-serif font-light text-stone-900 mb-3">
            Services
          </h2>
          <p className="text-sm text-stone-600">
            Specialized photography services for every space
          </p>
        </div>

        {/* Vertical Stack of Service Cards */}
        <div className="space-y-6">
          {services.map((service, index) => (
            <Link
              key={service.href}
              href={service.href}
              className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority={index === 0}
                />
                {/* Text Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-20 pb-6 px-6">
                  <div className="flex items-end justify-between gap-4">
                    {/* Left Column - Title & Subtitle */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-serif font-normal text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-white/80 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Right Column - Explore Button */}
                    <div className="flex items-center text-xs text-white/80 font-light flex-shrink-0">
                      <span>Explore</span>
                      <svg className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

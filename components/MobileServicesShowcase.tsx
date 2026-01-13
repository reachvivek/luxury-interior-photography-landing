"use client";

import { useEffect, useRef, useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const cardHeight = container.clientHeight;
      const newIndex = Math.round(scrollTop / cardHeight);
      setCurrentIndex(Math.min(newIndex, services.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [services]);

  return (
    <div
      ref={containerRef}
      className="relative w-full md:hidden overflow-y-auto snap-y snap-mandatory"
      style={{ height: '100vh', scrollBehavior: 'smooth' }}
    >
      {services.map((service, index) => (
        <div
          key={index}
          className="relative min-h-screen w-full snap-start snap-always flex-shrink-0 bg-stone-900"
        >
          {/* Background Image */}
          <div className="service-image absolute inset-0">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center z-10 p-8">
            {/* Centered Content */}
            <div className="service-content space-y-4 mb-auto mt-auto">
              <div className="inline-block mb-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                  <span className="text-white text-sm font-light tracking-wider">
                    {service.number}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight max-w-sm">
                {service.title}
              </h2>

              {/* Description */}
              <p className="text-base text-white/90 leading-relaxed font-light max-w-md">
                {service.description}
              </p>
            </div>

            {/* Bottom: Explore and Progress Indicators */}
            <div className="mt-auto space-y-6">
              {/* Explore Button */}
              <div className="flex justify-end">
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 group"
                >
                  <span className="text-sm font-light tracking-wide">Explore</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Progress Indicators */}
              <div className="space-y-3">
                <div className="flex gap-1.5 justify-center">
                {services.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-px rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-8 bg-white/80"
                        : "w-6 bg-white/20"
                    }`}
                  />
                ))}
              </div>

                <div className="text-center">
                  <span className="text-white/40 text-xs font-light tracking-wider">
                    {currentIndex + 1} / {services.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

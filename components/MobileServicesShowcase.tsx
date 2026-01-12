"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;

    cards.forEach((card, index) => {
      if (!card) return;

      // Set up scroll trigger for progress tracking only
      ScrollTrigger.create({
        trigger: card,
        start: "top center",
        end: "bottom center",
        onEnter: () => setCurrentIndex(index),
        onEnterBack: () => setCurrentIndex(index),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
          ref={(el) => { cardsRef.current[index] = el; }}
          className="relative h-screen w-full snap-start snap-always flex-shrink-0 bg-stone-900"
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
          <div className="relative h-full flex flex-col justify-between z-10">
            {/* Top: Number Badge and Content with dark background */}
            <div className="service-content space-y-4 bg-gradient-to-b from-black/70 via-black/40 to-transparent p-8 pt-24">
              <div className="inline-block">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                  <span className="text-white text-sm font-light tracking-wider">
                    {service.number}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-serif font-light text-white leading-tight max-w-xs">
                {service.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-white/95 leading-relaxed font-light max-w-sm">
                {service.description}
              </p>

              {/* Explore Button */}
              <Link
                href={service.href}
                className="inline-flex items-center gap-1.5 text-white/95 hover:text-white transition-colors duration-300 group"
              >
                <span className="text-xs font-light tracking-wider uppercase">Explore</span>
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Bottom: Progress Indicators */}
            <div className="space-y-3 p-6 pb-8">
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
      ))}
    </div>
  );
}

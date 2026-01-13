"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    const sections = sectionsRef.current;

    if (!wrapper || !container || sections.length === 0) return;

    // Create the horizontal scroll animation
    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        end: () => "+=" + (container.offsetWidth - window.innerWidth),
      }
    });

    // Track current index based on scroll position
    ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: () => "+=" + (container.offsetWidth - window.innerWidth),
      onUpdate: (self) => {
        const newIndex = Math.round(self.progress * (sections.length - 1));
        setCurrentIndex(newIndex);
      }
    });

    return () => {
      scrollTween.scrollTrigger?.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === wrapper) {
          trigger.kill();
        }
      });
    };
  }, [services]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full md:hidden overflow-hidden"
      style={{ height: '100vh' }}
    >
      <div
        ref={containerRef}
        className="flex h-full"
        style={{ width: `${services.length * 100}vw` }}
      >
        {services.map((service, index) => (
          <div
            key={service.href}
            ref={(el) => {
              if (el) sectionsRef.current[index] = el;
            }}
            className="relative h-full flex-shrink-0 bg-stone-900"
            style={{ width: '100vw' }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/95" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center z-10 p-8">
              {/* Centered Content */}
              <div className="space-y-4 mb-auto mt-auto">
                <div className="inline-block mb-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                    <span className="text-white text-sm font-light tracking-wider">
                      {service.number}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2
                  className="text-4xl md:text-5xl font-serif font-light text-white leading-tight max-w-sm"
                  style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.9)' }}
                >
                  {service.title}
                </h2>

                {/* Description */}
                <p
                  className="text-base text-white/90 leading-relaxed font-light max-w-md"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,1)' }}
                >
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
                <div className="space-y-4">
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

                  {/* Scroll Indicator */}
                  <div className="text-center">
                    <span className="text-white/30 text-[10px] font-light tracking-wider uppercase">
                      Scroll to explore
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

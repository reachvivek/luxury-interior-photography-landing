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

      // Set up scroll trigger for each card
      ScrollTrigger.create({
        trigger: card,
        start: "top center",
        end: "bottom center",
        onEnter: () => setCurrentIndex(index),
        onEnterBack: () => setCurrentIndex(index),
      });

      // Initial animation for content
      const content = card.querySelector('.service-content');
      if (content) {
        gsap.fromTo(
          content.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top center",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Image scale animation
      const image = card.querySelector('.service-image');
      if (image) {
        gsap.fromTo(
          image,
          { scale: 1.3, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top center",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-6 pt-24 pb-8 z-10">
            {/* Top: Number Badge and Content */}
            <div className="service-content space-y-6">
              <div className="inline-block">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                  <span className="text-white text-lg font-light tracking-wider">
                    {service.number}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-4xl font-serif font-light text-white leading-tight max-w-xs">
                {service.title}
              </h2>

              {/* Description */}
              <p className="text-base text-white/80 leading-relaxed font-light max-w-md">
                {service.description}
              </p>

              {/* Explore Button */}
              <Link
                href={service.href}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <span className="text-sm font-light tracking-wide">Explore</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Bottom: Progress Indicators */}
            <div className="space-y-4">
              <div className="flex gap-2 justify-center">
                {services.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-12 bg-white"
                        : "w-8 bg-white/30"
                    }`}
                  />
                ))}
              </div>

              <div className="text-center">
                <span className="text-white/60 text-sm font-light">
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

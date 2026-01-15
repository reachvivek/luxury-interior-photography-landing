"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const panels = panelsRef.current.filter(Boolean);
    if (panels.length === 0) return;

    // Clone first panel for seamless looping
    const copy = panels[0].cloneNode(true) as HTMLElement;
    containerRef.current.appendChild(copy);
    const allPanels = [...panels, copy];

    // Pin each panel
    const triggers = allPanels.map((panel) => {
      return ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        pin: true,
        pinSpacing: false,
      });
    });

    let maxScroll: number;

    // Snap to panels
    const pageScrollTrigger = ScrollTrigger.create({
      snap: (value) => {
        const snappedValue = gsap.utils.snap(1 / panels.length, value);
        if (snappedValue <= 0) {
          return 1.05 / maxScroll;
        } else if (snappedValue >= 1) {
          return maxScroll / (maxScroll + 1.05);
        }
        return snappedValue;
      },
    });

    const onResize = () => {
      maxScroll = ScrollTrigger.maxScroll(window) - 1;
    };

    onResize();
    window.addEventListener("resize", onResize);

    // Handle infinite loop scrolling
    const handleScroll = (e: Event) => {
      const scroll = pageScrollTrigger.scroll();
      if (scroll > maxScroll) {
        pageScrollTrigger.scroll(1);
        e.preventDefault();
      } else if (scroll < 1) {
        pageScrollTrigger.scroll(maxScroll - 1);
        e.preventDefault();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: false });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      pageScrollTrigger.kill();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", handleScroll);
      // Remove cloned panel
      if (copy.parentNode) {
        copy.parentNode.removeChild(copy);
      }
    };
  }, [services]);

  return (
    <div ref={containerRef} className="md:hidden">
      {services.map((service, index) => (
        <section
          key={service.href}
          ref={(el) => {
            if (el) panelsRef.current[index] = el;
          }}
          className="panel relative h-screen w-full"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between z-10 p-8">
            {/* Top: Number Badge */}
            <div className="flex justify-start">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                <span className="text-white text-lg font-light tracking-wider">
                  {service.number}
                </span>
              </div>
            </div>

            {/* Center: Title & Description */}
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <h2
                className="text-5xl font-serif font-light text-white leading-tight"
                style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
              >
                {service.title}
              </h2>

              <p
                className="text-lg text-white/90 leading-relaxed font-light max-w-md"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
              >
                {service.description}
              </p>
            </div>

            {/* Bottom: Explore Button */}
            <div className="flex justify-end">
              <Link
                href={service.href}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full hover:bg-white/20 transition-all duration-500 group"
              >
                <span className="text-sm font-light tracking-wide">Explore</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

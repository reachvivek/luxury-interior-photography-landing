"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const lastScrollTweenRef = useRef<number>(Date.now());
  const snapProgressRef = useRef<number>(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const totalWidth = services.length * window.innerWidth;
    const scrollSpeed = 4;

    const tl = gsap.timeline();
    timelineRef.current = tl;

    tl.to(content, {
      x: () => -(totalWidth - window.innerWidth),
      duration: 1,
      ease: "none"
    });

    // Add labels for each section
    services.forEach((_, i) => {
      const progress = i / (services.length - 1);
      tl.add(`section${i}`, progress);
    });

    // Directional snap function
    const directionalSnap = (value: number, st: any) => {
      if (Date.now() - lastScrollTweenRef.current < 1650) {
        return snapProgressRef.current;
      }

      const snapPoints = services.map((_, i) => i / (services.length - 1));

      if (st.direction > 0) {
        for (let i = 0; i < snapPoints.length; i++) {
          if (snapPoints[i] >= value) {
            return snapPoints[i];
          }
        }
        return snapPoints[snapPoints.length - 1];
      } else {
        for (let i = snapPoints.length - 1; i >= 0; i--) {
          if (snapPoints[i] <= value) {
            return snapPoints[i];
          }
        }
        return snapPoints[0];
      }
    };

    ScrollTrigger.create({
      animation: tl,
      trigger: wrapper,
      start: "top top",
      end: () => `+=${totalWidth / scrollSpeed}`,
      pin: true,
      scrub: 1,
      snap: {
        snapTo: directionalSnap,
        duration: 0.5
      },
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const index = Math.round(self.progress * (services.length - 1));
        setCurrentIndex(index);
      }
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    ScrollTrigger.addEventListener("refreshInit", handleResize);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.removeEventListener("refreshInit", handleResize);
    };
  }, [services]);

  const scrollToCard = (index: number) => {
    const triggers = ScrollTrigger.getAll();
    if (triggers.length > 0 && timelineRef.current) {
      const progress = index / (services.length - 1);
      snapProgressRef.current = progress;
      lastScrollTweenRef.current = Date.now();

      const scrollTrigger = triggers[0];
      const totalWidth = services.length * window.innerWidth;
      const scrollSpeed = 4;
      const targetScroll = (totalWidth / scrollSpeed) * progress;

      gsap.to(window, {
        scrollTo: scrollTrigger.start + targetScroll,
        duration: 1,
        ease: "power2.inOut",
        overwrite: "auto"
      });
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full md:hidden h-screen overflow-hidden">
      <div
        ref={contentRef}
        className="flex h-full"
        style={{ width: `${services.length * 100}vw` }}
      >
        {services.map((service, index) => (
          <div
            key={index}
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

                  {/* Navigation Arrows */}
                  <div className="flex items-center justify-center gap-8">
                    {/* Left Arrow */}
                    <button
                      onClick={() => scrollToCard(currentIndex - 1)}
                      disabled={currentIndex === 0}
                      className={`transition-all duration-300 ${
                        currentIndex === 0
                          ? 'opacity-20 cursor-not-allowed'
                          : 'opacity-60 hover:opacity-100 active:scale-95'
                      }`}
                      aria-label="Previous service"
                    >
                      <svg
                        className={`w-6 h-6 text-white ${currentIndex !== 0 ? 'animate-pulse' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ animationDuration: '2s' }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {/* Right Arrow */}
                    <button
                      onClick={() => scrollToCard(currentIndex + 1)}
                      disabled={currentIndex === services.length - 1}
                      className={`transition-all duration-300 ${
                        currentIndex === services.length - 1
                          ? 'opacity-20 cursor-not-allowed'
                          : 'opacity-60 hover:opacity-100 active:scale-95'
                      }`}
                      aria-label="Next service"
                    >
                      <svg
                        className={`w-6 h-6 text-white ${currentIndex !== services.length - 1 ? 'animate-pulse' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ animationDuration: '2s' }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
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

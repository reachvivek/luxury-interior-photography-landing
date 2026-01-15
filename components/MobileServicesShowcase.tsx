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
    <div className="md:hidden">
      {services.map((service, index) => (
        <section
          key={service.href}
          className="relative h-screen w-full"
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
            <div className="flex justify-start pt-4">
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
            <div className="flex justify-end pb-4">
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

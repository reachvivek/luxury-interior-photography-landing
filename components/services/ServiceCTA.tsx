"use client";

import Image from "next/image";
import Link from "next/link";

interface ServiceCTAProps {
  imageSrc: string;
  title: string;
  description: string;
}

export default function ServiceCTA({
  imageSrc,
  title,
  description,
}: ServiceCTAProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-16">
      <Image
        src={imageSrc}
        alt="Contact Background"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-white mb-6 md:mb-8">
          {title}
        </h2>
        <p className="text-base md:text-lg text-stone-200 mb-8 md:mb-10 max-w-2xl mx-auto">
          {description}
        </p>
        <Link
          href="/contact"
          className="inline-block px-10 py-4 bg-white text-stone-900 hover:bg-stone-100 hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium tracking-widest uppercase rounded-full"
        >
          Book a Shoot
        </Link>
      </div>
    </section>
  );
}

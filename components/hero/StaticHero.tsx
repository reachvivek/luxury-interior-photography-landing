import Image from "next/image";
import Link from "next/link";

interface StaticHeroProps {
  imageSrc: string;
  imageAlt: string;
  category: string;
  title: string;
  description: string;
}

export default function StaticHero({
  imageSrc,
  imageAlt,
  category,
  title,
  description,
}: StaticHeroProps) {
  return (
    <section className="relative h-screen w-full">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center px-6 md:px-16">
        <div className="max-w-4xl w-full text-center">
          <p className="text-white text-xs md:text-sm tracking-[0.4em] uppercase mb-6 md:mb-8 opacity-90">
            {category}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light text-white mb-6 md:mb-8 leading-tight">
            {title}
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed font-light">
            {description}
          </p>
          <Link
            href="#portfolio"
            className="inline-block px-10 py-4 bg-transparent border border-white/70 text-white hover:bg-white hover:text-stone-900 transition-all duration-300 text-sm tracking-widest uppercase rounded-full"
          >
            View Portfolio
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
    <div className="md:hidden px-4 py-8 space-y-8 bg-stone-100">
      {services.map((service, index) => (
        <motion.section
          key={service.href}
          className="relative h-[85vh] w-full rounded-[32px] overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
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
            {/* Multiple overlay layers for cross-browser compatibility */}
            <div className="absolute inset-0 bg-black/35" /> {/* Solid fallback - darkened for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/35" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between z-10 p-8">
            {/* Top: Number Badge */}
            <motion.div
              className="flex justify-start pt-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 shadow-lg">
                <span className="text-white text-lg font-light tracking-wider drop-shadow-md">
                  {service.number}
                </span>
              </div>
            </motion.div>

            {/* Center: Title & Description */}
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <motion.h2
                className="text-5xl font-serif font-light text-white leading-tight"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {service.title}
              </motion.h2>

              <motion.p
                className="text-lg text-white leading-relaxed font-light max-w-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                {service.description}
              </motion.p>
            </div>

            {/* Bottom: Explore Button */}
            <motion.div
              className="flex justify-end pb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                href={service.href}
                className="inline-flex items-center gap-3 px-8 py-4 bg-black/40 backdrop-blur-md text-white border border-white/40 rounded-full hover:bg-black/50 transition-all duration-500 group shadow-lg"
              >
                <span className="text-sm font-light tracking-wide">Explore</span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{
                    x: [0, 4, 0, -2, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </motion.svg>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      ))}
    </div>
  );
}

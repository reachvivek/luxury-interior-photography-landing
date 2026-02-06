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
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
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
              <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <span className="text-white text-lg font-light tracking-wider">
                  {service.number}
                </span>
              </div>
            </motion.div>

            {/* Center: Title & Description */}
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <motion.h2
                className="text-5xl font-serif font-light text-white leading-tight"
                style={{ textShadow: "0 4px 30px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8)" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {service.title}
              </motion.h2>

              <motion.p
                className="text-lg text-white leading-relaxed font-light max-w-md"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 1px 8px rgba(0,0,0,0.9)" }}
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
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/15 backdrop-blur-md text-white border border-white/30 rounded-full hover:bg-white/25 transition-all duration-500 group"
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
            </motion.div>
          </div>
        </motion.section>
      ))}
    </div>
  );
}

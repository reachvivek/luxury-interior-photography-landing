"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { stats as defaultStats } from "@/data/stats";
import { ANIMATION } from "@/constants/animation";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

interface StatsSectionProps {
  statsData?: StatItem[];
}

export default function StatsSection({ statsData }: StatsSectionProps) {
  const items: StatItem[] = statsData && statsData.length > 0 ? statsData : defaultStats;
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [animatedValues, setAnimatedValues] = useState<number[]>(items.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
          setStatsAnimated(true);

          const duration = ANIMATION.STATS_ANIMATION_DURATION;
          const steps = ANIMATION.STATS_ANIMATION_STEPS;
          const interval = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const progress = step / steps;

            setAnimatedValues(items.map((item) => Math.floor(item.value * progress)));

            if (step >= steps) {
              setAnimatedValues(items.map((item) => item.value));
              clearInterval(timer);
            }
          }, interval);
        }
      },
      { threshold: ANIMATION.STATS_OBSERVER_THRESHOLD }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsAnimated, items]);

  return (
    <section ref={statsRef} className="min-h-screen flex items-center justify-center px-6 md:px-16 bg-stone-900">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut"
              }}
            >
              <motion.div
                className="text-5xl md:text-6xl font-serif font-light text-white mb-3"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
              >
                {animatedValues[index]}{item.suffix || ""}
              </motion.div>
              <motion.div
                className="text-xs md:text-sm text-stone-400 tracking-widest uppercase"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
              >
                {item.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

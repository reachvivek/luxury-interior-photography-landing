"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { STATS_CONFIG } from "@/data/stats";
import { ANIMATION } from "@/constants/animation";

const statItems = [
  { key: "projects", label: "Projects Completed", suffix: "+" },
  { key: "experience", label: "Years Experience", suffix: "+" },
  { key: "properties", label: "Properties Photographed", suffix: "+" },
  { key: "satisfaction", label: "Client Satisfaction", suffix: "%" },
];

export default function StatsSection() {
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({
    projects: 0,
    experience: 0,
    properties: 0,
    satisfaction: 0
  });

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

            setStats({
              projects: Math.floor(STATS_CONFIG.projects * progress),
              experience: Math.floor(STATS_CONFIG.experience * progress),
              properties: Math.floor(STATS_CONFIG.properties * progress),
              satisfaction: Math.floor(STATS_CONFIG.satisfaction * progress)
            });

            if (step >= steps) {
              setStats(STATS_CONFIG);
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
  }, [statsAnimated]);

  return (
    <section ref={statsRef} className="min-h-screen flex items-center justify-center px-6 md:px-16 bg-stone-900">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {statItems.map((item, index) => (
            <motion.div
              key={item.key}
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
                {stats[item.key as keyof typeof stats]}{item.suffix}
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

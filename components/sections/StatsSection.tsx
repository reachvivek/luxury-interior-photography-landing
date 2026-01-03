"use client";

import { useState, useEffect, useRef } from "react";
import { STATS_CONFIG } from "@/data/stats";
import { ANIMATION } from "@/constants/animation";

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
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-serif font-light text-white mb-3">
              {stats.projects}+
            </div>
            <div className="text-xs md:text-sm text-stone-400 tracking-widest uppercase">
              Projects Completed
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-serif font-light text-white mb-3">
              {stats.experience}+
            </div>
            <div className="text-xs md:text-sm text-stone-400 tracking-widest uppercase">
              Years Experience
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-serif font-light text-white mb-3">
              {stats.properties}+
            </div>
            <div className="text-xs md:text-sm text-stone-400 tracking-widest uppercase">
              Properties Photographed
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-serif font-light text-white mb-3">
              {stats.satisfaction}%
            </div>
            <div className="text-xs md:text-sm text-stone-400 tracking-widest uppercase">
              Client Satisfaction
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

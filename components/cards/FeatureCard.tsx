"use client";

import { motion } from "framer-motion";
import { Feature } from "@/data/features";

interface FeatureCardProps {
  feature: Feature;
  index?: number;
}

export default function FeatureCard({ feature, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      className="relative bg-white border border-stone-200 rounded-lg p-5 md:p-8 transition-all duration-300 hover:shadow-xl hover:border-stone-300 group"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <div className="relative">
        <motion.div
          className="text-stone-300 text-4xl md:text-6xl font-serif font-light mb-4 md:mb-6 group-hover:text-stone-400 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
        >
          {feature.number}
        </motion.div>
        <motion.div
          className="h-px w-10 md:w-12 bg-gradient-to-r from-stone-300 to-transparent mb-3 md:mb-5"
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
        />
        <motion.h3
          className="text-base md:text-xl font-serif font-light text-stone-900 mb-2 md:mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.35 }}
        >
          {feature.title}
        </motion.h3>
        <motion.p
          className="text-stone-600 text-xs md:text-sm leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
        >
          {feature.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

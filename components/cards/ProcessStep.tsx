"use client";

import { motion } from "framer-motion";
import { ProcessStep as ProcessStepType } from "@/data/processSteps";

interface ProcessStepProps {
  step: ProcessStepType;
  index?: number;
}

const iconMap = {
  chat: (
    <svg className="w-7 h-7 md:w-10 md:h-10 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  clipboard: (
    <svg className="w-7 h-7 md:w-10 md:h-10 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  camera: (
    <svg className="w-7 h-7 md:w-10 md:h-10 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  images: (
    <svg className="w-7 h-7 md:w-10 md:h-10 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
      <rect x="4" y="6" width="12" height="12" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="6" y="8" width="12" height="12" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="8" y="10" width="12" height="12" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function ProcessStep({ step, index = 0 }: ProcessStepProps) {
  return (
    <motion.div
      className="relative flex flex-col items-center text-center lg:items-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
    >
      {/* Icon Circle */}
      <motion.div
        className="relative mb-3 md:mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <motion.div
          className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-stone-200 bg-white flex items-center justify-center shadow-sm"
          whileHover={{ boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
        >
          {iconMap[step.icon]}
        </motion.div>
      </motion.div>

      <motion.h3
        className="text-base md:text-lg font-serif font-light text-stone-900 mb-1 md:mb-2"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
      >
        {step.title}
      </motion.h3>
      <motion.p
        className="text-[10px] md:text-xs text-stone-400 uppercase tracking-wider mb-2 md:mb-3 font-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.25 }}
      >
        {step.subtitle}
      </motion.p>
      <motion.p
        className="text-stone-600 text-xs md:text-sm leading-snug md:leading-relaxed max-w-xs font-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
      >
        {step.description}
      </motion.p>
    </motion.div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { ANIMATION } from "@/constants/animation";

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, ANIMATION.TESTIMONIAL_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-16 bg-stone-50 overflow-hidden">
      <motion.div
        className="max-w-4xl mx-auto text-center relative w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Section Header */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-4">
            Testimonials
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-light text-stone-900">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="relative min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              index === currentTestimonial && (
                <motion.div
                  key={testimonial.id}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {/* Profile Image */}
                  {testimonial.image && (
                    <motion.div
                      className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-6 ring-2 ring-stone-300 shadow-lg"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </motion.div>
                  )}

                  {/* Quote */}
                  <motion.blockquote
                    className="text-lg md:text-2xl font-light text-stone-700 mb-6 leading-relaxed max-w-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </motion.blockquote>

                  {/* Author Info */}
                  <motion.div
                    className="space-y-1"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <p className="text-base md:text-lg font-medium text-stone-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm md:text-base text-stone-600">
                      {testimonial.role}
                      {testimonial.company && (
                        <>
                          {" "}
                          <span className="text-stone-400">at</span>{" "}
                          <span className="text-stone-700">{testimonial.company}</span>
                        </>
                      )}
                    </p>

                    {/* Star Rating */}
                    {testimonial.rating && (
                      <motion.div
                        className="flex justify-center gap-1 mt-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <motion.svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating! ? "text-amber-500" : "text-stone-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: 0.4 + i * 0.05 }}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <motion.div
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? 'bg-stone-900 w-8' : 'bg-stone-400 w-2'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

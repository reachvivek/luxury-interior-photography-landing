"use client";

import { useState, useEffect } from "react";
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
    <section className="min-h-screen flex items-center justify-center px-6 md:px-16 bg-stone-50">
      <div className="max-w-4xl mx-auto text-center relative w-full">
        <div className="relative min-h-[200px] flex items-center justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
                index === currentTestimonial ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <blockquote className="text-3xl md:text-4xl font-serif font-light italic text-stone-700 mb-8 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <p className="text-lg text-stone-500 tracking-wide">
                — {testimonial.name}, {testimonial.role}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? 'bg-stone-900 w-8' : 'bg-stone-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

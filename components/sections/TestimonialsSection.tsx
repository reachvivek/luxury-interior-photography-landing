"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
        <div className="relative min-h-[400px] flex items-center justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
                index === currentTestimonial ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Profile Image */}
              {testimonial.image && (
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-6 ring-2 ring-stone-300 shadow-lg">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              )}

              {/* Quote */}
              <blockquote className="text-lg md:text-2xl font-light text-stone-700 mb-6 leading-relaxed max-w-3xl">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author Info */}
              <div className="space-y-1">
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
                  <div className="flex justify-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating! ? "text-amber-500" : "text-stone-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}
              </div>
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

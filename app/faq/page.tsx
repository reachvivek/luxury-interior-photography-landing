"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    category: "General Questions",
    questions: [
      {
        question: "What types of properties do you photograph?",
        answer: "We specialize in residential interiors (villas, penthouses, apartments), hospitality spaces (hotels, restaurants, resorts), commercial environments (offices, retail stores, showrooms), and custom interior details. Each project receives the same level of precision and editorial focus."
      },
      {
        question: "Where are you based and do you travel?",
        answer: "We're based in Dubai, UAE. We work throughout the Middle East and are available for international projects. Travel costs are calculated based on location and project scope."
      },
      {
        question: "How far in advance should I book?",
        answer: "We recommend booking 2-4 weeks in advance, though we can accommodate urgent requests when our schedule allows. For larger projects or specific dates, earlier booking is advisable."
      }
    ]
  },
  {
    category: "Process & Timeline",
    questions: [
      {
        question: "What does your process look like?",
        answer: "Our process has three phases: Planning (site visit, light study, shot list), Execution (photography session with natural light prioritized), and Refinement (post-production focused on clarity and composition). Each phase ensures the final images reflect both the space and the designer's intent."
      },
      {
        question: "How long does a typical shoot take?",
        answer: "Most residential shoots take 3-5 hours. Larger properties or commercial spaces may require a full day or multiple sessions. We prioritize quality over speed—rushing compromises the work."
      },
      {
        question: "When will I receive my photos?",
        answer: "Edited images are delivered within 7-10 business days for standard projects. Rush delivery is available for an additional fee. You'll receive a curated selection of high-resolution images, fully edited and ready for use."
      }
    ]
  },
  {
    category: "Pricing & Packages",
    questions: [
      {
        question: "How is pricing structured?",
        answer: "Pricing depends on project scope, property size, location, and usage rights. We offer transparent quotes after an initial consultation. Contact us for a detailed proposal tailored to your needs."
      },
      {
        question: "Do you offer packages?",
        answer: "Yes. We have packages for residential, hospitality, and commercial projects. Custom packages are available for ongoing partnerships or large-scale developments. Get in touch to discuss what works best for your project."
      },
      {
        question: "What's included in the shoot?",
        answer: "All shoots include pre-shoot planning, on-site photography, professional editing, color correction, and high-resolution digital files. Usage rights and licensing are discussed based on your intended use."
      }
    ]
  },
  {
    category: "Preparation & Requirements",
    questions: [
      {
        question: "How should I prepare the space?",
        answer: "The space should be clean, decluttered, and styled as you want it photographed. We can guide you on styling details during the planning phase. Natural light is preferred, so shoot timing is coordinated around optimal lighting conditions."
      },
      {
        question: "Do you provide styling services?",
        answer: "We focus on photography. If styling assistance is needed, we can recommend trusted interior stylists in Dubai. Our role is to capture the space as designed, with minimal intervention."
      },
      {
        question: "What if the weather is bad on shoot day?",
        answer: "For projects dependent on natural light, we'll reschedule if weather conditions compromise the shoot. Interior shoots are less affected, but we monitor forecasts and adjust timing when needed."
      }
    ]
  },
  {
    category: "Usage & Deliverables",
    questions: [
      {
        question: "Can I use the photos for marketing?",
        answer: "Yes. Standard packages include usage rights for marketing, portfolios, websites, and social media. Commercial licensing for large-scale advertising or publications is discussed separately."
      },
      {
        question: "Will you credit my work?",
        answer: "Absolutely. We credit designers, architects, and developers when sharing work. We expect the same—proper photographer credit ensures our work reaches the right audience."
      },
      {
        question: "Can I request specific shots?",
        answer: "Yes. During planning, we discuss priorities and must-have shots. While we work with a curated eye, client input is valued. The final shot list balances your vision with what works photographically."
      }
    ]
  }
];

export default function FAQPage() {
  const heroAnimation = useScrollAnimation(0.1);
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-40 md:pb-32 px-6 md:px-16 bg-gradient-to-b from-stone-50/30 via-white to-white overflow-hidden relative">
        <div
          ref={heroAnimation.elementRef}
          className={`max-w-5xl mx-auto text-center relative z-10 transition-all duration-1000 ease-out ${
            heroAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-extralight text-stone-900 mb-8 md:mb-10 tracking-tight leading-[0.95]">
            Frequently Asked Questions
          </h1>
          <p className="text-base md:text-xl text-stone-600/90 max-w-2xl mx-auto leading-[1.65] font-light tracking-[0.01em]">
            Everything you need to know about working with Nashray.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 md:py-32 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12 md:mb-16">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="w-10 h-px bg-gradient-to-r from-stone-300 to-transparent"></div>
                <h2 className="text-[10px] md:text-xs tracking-[0.16em] uppercase text-stone-400/80 font-medium">
                  {category.category}
                </h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openItems[key];

                  return (
                    <div
                      key={questionIndex}
                      className="border border-stone-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-stone-300"
                    >
                      <button
                        onClick={() => toggleItem(categoryIndex, questionIndex)}
                        className="w-full flex items-center justify-between p-5 md:p-6 text-left bg-white hover:bg-stone-50/50 transition-colors duration-200"
                      >
                        <h3 className="text-base md:text-lg font-serif font-light text-stone-900 pr-4 leading-[1.4]">
                          {item.question}
                        </h3>
                        <ChevronDown
                          className={`w-5 h-5 text-stone-400 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        } overflow-hidden`}
                      >
                        <div className="p-5 md:p-6 pt-0 md:pt-0">
                          <p className="text-sm md:text-base text-stone-600/90 leading-[1.7] font-light">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 px-6 md:px-16 bg-gradient-to-b from-white to-stone-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-extralight text-stone-900 mb-5 md:mb-7 tracking-tight leading-[1.1] px-4">
            Still have questions?
          </h2>
          <p className="text-base md:text-xl text-stone-600/90 mb-10 md:mb-12 font-light max-w-2xl mx-auto px-4 leading-[1.65]">
            Get in touch and we'll answer any questions about your project.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 md:px-12 md:py-5 bg-stone-900 text-white hover:bg-stone-800 transition-all duration-300 text-sm font-medium tracking-[0.1em] uppercase rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Contact Us
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

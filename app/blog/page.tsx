"use client";

import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import EngagementStats from "@/components/blog/EngagementStats";
import { journalPosts } from "@/data/journalPosts";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section - Full Height */}
      <section className="relative h-screen w-full">
        <Image
          src="/images/hospitality/event-spaces/outdoor-patio-courtyard.jpg"
          alt="Blog & Insights"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center px-6 md:px-16">
          <div className="max-w-4xl w-full text-center">
            <p className="text-white text-xs md:text-sm tracking-[0.4em] uppercase mb-6 md:mb-8 opacity-90">
              Journal
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light text-white mb-6 md:mb-8 leading-tight">
              Insights & Perspectives
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
              Thoughts on photography, design, and the art of capturing exceptional spaces.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section id="articles" className="py-16 md:py-24 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Decorative Line */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-8 md:mb-12 text-center">
            Featured Article
          </p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center bg-stone-50 rounded-2xl overflow-hidden">
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[300px]">
              <Image
                src={journalPosts[0].image}
                alt={journalPosts[0].title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-8 md:p-12">
              <span className="inline-block px-3 py-1 bg-white text-[10px] tracking-wide uppercase text-stone-700 rounded-full mb-4">
                {journalPosts[0].category}
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-stone-900 mb-4">
                {journalPosts[0].title}
              </h2>
              <p className="text-sm md:text-base text-stone-600 leading-relaxed mb-6">
                {journalPosts[0].description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs md:text-sm text-stone-500">{journalPosts[0].date}</span>
                <Link
                  href={`/blog/${journalPosts[0].slug}`}
                  className="text-xs md:text-sm font-medium tracking-wider uppercase text-stone-900 hover:text-stone-600 transition-colors flex items-center gap-2"
                >
                  Read Article
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              {journalPosts[0].engagement && (
                <EngagementStats
                  views={journalPosts[0].engagement.views}
                  likes={journalPosts[0].engagement.likes}
                  commentCount={journalPosts[0].engagement.comments.length}
                  variant="full"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-gradient-to-b from-white to-stone-50">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
            </div>
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-4">
              Recent Articles
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900">
              Latest Insights
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {journalPosts.slice(1).map((post) => (
              <article
                key={post.id}
                className="group cursor-pointer"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-t-xl bg-stone-100 mb-5">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] tracking-wide uppercase text-stone-700 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-serif font-light text-stone-900 mb-2 md:mb-3 group-hover:text-stone-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm md:text-base text-stone-600 leading-relaxed mb-4">
                      {post.description}
                    </p>
                    <div className="pt-3 border-t border-stone-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-500">{post.date}</span>
                        <span className="text-xs font-medium tracking-wider uppercase text-stone-900 group-hover:text-stone-600 transition-colors flex items-center gap-1">
                          Read More
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                      {post.engagement && (
                        <EngagementStats
                          views={post.engagement.views}
                          likes={post.engagement.likes}
                          commentCount={post.engagement.comments.length}
                          variant="compact"
                        />
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 md:px-16">
        <Image
          src="/images/residential/penthouses/penthouse-interior-3.jpg"
          alt="Newsletter Background"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-white mb-6 md:mb-8">
            Stay Informed
          </h2>
          <p className="text-base md:text-lg text-stone-200 mb-8 md:mb-10">
            Subscribe to receive insights on interior photography and design trends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white/95 backdrop-blur-sm rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
            <button className="px-8 py-4 bg-white text-stone-900 hover:bg-stone-100 transition-all duration-200 text-sm font-medium tracking-widest uppercase rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

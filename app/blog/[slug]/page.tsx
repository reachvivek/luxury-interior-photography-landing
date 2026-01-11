"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import EngagementStats from "@/components/blog/EngagementStats";
import CommentsSection from "@/components/blog/CommentsSection";
import { journalPosts } from "@/data/journalPosts";
import { CONTACT } from "@/data/contact";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Find the blog post by slug
  const post = journalPosts.find((p) => p.slug === slug);

  // If post not found, show 404
  if (!post || !post.content) {
    notFound();
  }

  // Get related posts (exclude current post)
  const relatedPosts = journalPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section with Image */}
      <section className="relative h-[60vh] md:h-[70vh] w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

        {/* Category Badge - Top Left */}
        <div className="absolute top-24 md:top-32 left-6 md:left-16 z-20">
          <span className="inline-block px-4 py-2 bg-white/95 backdrop-blur-sm text-xs tracking-widest uppercase text-stone-700 rounded-full">
            {post.category}
          </span>
        </div>

        {/* Title - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-16 py-8 md:py-12">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white leading-tight mb-4 md:mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 md:gap-6 text-white/90 text-sm mb-4">
              <span>{post.author}</span>
              <span className="w-1 h-1 rounded-full bg-white/60"></span>
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/60"></span>
              <span>{post.readTime}</span>
            </div>
            {post.engagement && (
              <div className="mt-4">
                <EngagementStats
                  views={post.engagement.views}
                  likes={post.engagement.likes}
                  commentCount={post.engagement.comments.length}
                  variant="full"
                  theme="dark"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 md:py-24 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          {/* Introduction */}
          <div className="mb-12 md:mb-16">
            <p className="text-lg md:text-xl text-stone-700 leading-relaxed font-light">
              {post.content.intro}
            </p>
          </div>

          {/* Decorative Divider */}
          <div className="flex justify-center my-12 md:my-16">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12 md:space-y-16">
            {post.content.sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-2xl md:text-3xl font-serif font-light text-stone-900 mb-6 md:mb-8">
                  {section.heading}
                </h2>
                <div className="space-y-6">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-base md:text-lg text-stone-600 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Decorative Divider */}
          <div className="flex justify-center my-12 md:my-16">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>

          {/* Conclusion */}
          <div className="mb-12 md:mb-16">
            <p className="text-base md:text-lg text-stone-600 leading-relaxed">
              {post.content.conclusion}
            </p>
          </div>

          {/* Article Engagement Stats */}
          {post.engagement && (
            <div className="flex justify-center py-8 md:py-10 border-y border-stone-200 mb-8 md:mb-12">
              <EngagementStats
                views={post.engagement.views}
                likes={post.engagement.likes}
                commentCount={post.engagement.comments.length}
                variant="full"
              />
            </div>
          )}

          {/* WhatsApp CTA */}
          <div className="flex justify-center pt-8 md:pt-12">
            <a
              href={`${CONTACT.whatsapp.url}?text=Hi%20Nashray,%20I'm%20interested%20in%20booking%20a%20photography%20session`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900 hover:shadow-lg transition-all duration-300 text-sm font-medium tracking-widest uppercase rounded-full group"
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Book a Shoot
            </a>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      {post.engagement && post.engagement.comments && post.engagement.comments.length > 0 && (
        <CommentsSection comments={post.engagement.comments} />
      )}

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24 px-6 md:px-16 bg-gradient-to-b from-white to-stone-50">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="flex justify-center mb-6 md:mb-8">
                <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
              </div>
              <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-4">
                Continue Reading
              </p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900">
                Related Articles
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="group cursor-pointer">
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-t-xl bg-stone-100 mb-5">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] tracking-wide uppercase text-stone-700 rounded-full">
                          {relatedPost.category}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-serif font-light text-stone-900 mb-2 md:mb-3 group-hover:text-stone-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm md:text-base text-stone-600 leading-relaxed mb-4">
                        {relatedPost.description}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                        <span className="text-xs text-stone-500">
                          {relatedPost.date}
                        </span>
                        <span className="text-xs font-medium tracking-wider uppercase text-stone-900 group-hover:text-stone-600 transition-colors flex items-center gap-1">
                          Read More
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Back to Journal Link */}
            <div className="text-center mt-12 md:mt-16">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-stone-900 hover:text-stone-600 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
      <ScrollToTop />
    </div>
  );
}

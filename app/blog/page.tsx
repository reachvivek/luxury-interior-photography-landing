"use client";

import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

const blogPosts = [
  {
    title: "10 Tips for Preparing Your Space for a Photo Shoot",
    excerpt: "Learn how to get your interior ready for professional photography with these essential preparation tips.",
    image: "/images/_DSC4758.jpg",
    date: "January 2, 2026",
    category: "Tips & Tricks",
    slug: "preparing-space-photo-shoot",
  },
  {
    title: "The Importance of Lighting in Interior Photography",
    excerpt: "Discover how professional lighting can transform your interior spaces and create stunning imagery.",
    image: "/images/_DSC4763.jpg",
    date: "December 28, 2025",
    category: "Photography",
    slug: "importance-of-lighting",
  },
  {
    title: "How Professional Photography Increases Property Value",
    excerpt: "Explore the direct impact of high-quality photography on property sales and rental rates.",
    image: "/images/_DSC7172.jpg",
    date: "December 20, 2025",
    category: "Real Estate",
    slug: "photography-property-value",
  },
  {
    title: "Behind the Scenes: A Luxury Villa Shoot in Dubai",
    excerpt: "Take a look at our process for capturing a stunning luxury villa in the heart of Dubai.",
    image: "/images/_DSC4765.jpg",
    date: "December 15, 2025",
    category: "Case Study",
    slug: "luxury-villa-dubai",
  },
  {
    title: "Architectural Photography: Capturing Design Intent",
    excerpt: "Understanding how to photograph architecture to showcase the designer's vision and craftsmanship.",
    image: "/images/_DSC7341.jpg",
    date: "December 10, 2025",
    category: "Architecture",
    slug: "architectural-photography",
  },
  {
    title: "The Rise of Virtual Staging in Real Estate",
    excerpt: "How virtual staging is revolutionizing property marketing in the UAE and beyond.",
    image: "/images/_DSC6309.jpg",
    date: "December 5, 2025",
    category: "Technology",
    slug: "virtual-staging-real-estate",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-16 bg-[#EBE6E5]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-stone-900 mb-6">
            Blog & Insights
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Tips, trends, and insights from the world of interior photography and real estate marketing.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
              <Image
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 md:p-12">
              <span className="text-xs tracking-wider uppercase text-stone-500">
                {blogPosts[0].category}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-900 mt-2 mb-4">
                {blogPosts[0].title}
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-500">{blogPosts[0].date}</span>
                <Link
                  href={`/blog/${blogPosts[0].slug}`}
                  className="text-sm font-medium tracking-wider uppercase text-stone-900 hover:text-stone-600 transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-light text-stone-900 mb-12">
            Recent Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs tracking-wider uppercase text-stone-500">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-serif font-light text-stone-900 mt-2 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                    <span className="text-xs text-stone-500">{post.date}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-medium tracking-wider uppercase text-stone-900 hover:text-stone-600 transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-6 md:px-16 bg-stone-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-stone-300 mb-10">
            Get the latest tips and insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
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

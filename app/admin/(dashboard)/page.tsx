"use client";

import { useRouter } from "next/navigation";
import {
  Image,
  Images,
  FileText,
  MessageSquare,
  Sparkles,
  BarChart3,
  Settings,
  ExternalLink,
} from "lucide-react";

const SECTIONS = [
  {
    icon: <Image className="w-6 h-6" />,
    title: "Hero Slides",
    description: "Update homepage hero carousel — images, titles, and links",
    href: "/admin/hero",
    count: "4 slides",
  },
  {
    icon: <Images className="w-6 h-6" />,
    title: "Gallery",
    description: "Add, remove, or reorder portfolio gallery images",
    href: "/admin/gallery",
    count: "40 images",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Blog / Journal",
    description: "Write, edit, or delete blog posts and articles",
    href: "/admin/blog",
    count: "9 posts",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Testimonials",
    description: "Manage client reviews and ratings",
    href: "/admin/testimonials",
    count: "11 reviews",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Services",
    description: "Edit service offerings, features, and process steps",
    href: "/admin/services",
    count: "4 services",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Stats & Features",
    description: "Update statistics counters and 'Why Choose Us' features",
    href: "/admin/stats",
    count: "8 items",
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Settings",
    description: "WhatsApp, Instagram, and general site settings",
    href: "/admin/settings",
    count: "",
  },
];

export default function AdminDashboardPage() {
  const router = useRouter();

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif font-light text-stone-100">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Manage your website content from here. Click any section to start editing.
        </p>
      </div>

      {/* Quick link to live site */}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-xs font-medium text-stone-400 bg-stone-900/60 border border-stone-800/60 rounded-xl hover:text-stone-200 hover:border-stone-700/60 transition-all"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        View Live Site
      </a>

      {/* Sections grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTIONS.map((section) => (
          <button
            key={section.href}
            onClick={() => router.push(section.href)}
            className="group relative text-left bg-stone-900/60 border border-stone-800/60 rounded-2xl p-5 sm:p-6 hover:bg-stone-900/80 hover:border-stone-700/60 transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-stone-800/60 border border-stone-700/40 flex items-center justify-center text-stone-400 group-hover:text-stone-200 shrink-0 transition-colors">
                {section.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-stone-200 font-sans">
                  {section.title}
                </h3>
                <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                  {section.description}
                </p>
                {section.count && (
                  <span className="inline-block mt-3 text-[10px] uppercase tracking-widest text-stone-500 bg-stone-800/40 px-2 py-1 rounded-md">
                    {section.count}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

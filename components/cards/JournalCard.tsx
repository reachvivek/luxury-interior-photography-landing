import Image from "next/image";
import Link from "next/link";
import { JournalPost } from "@/data/journalPosts";
import EngagementStats from "@/components/blog/EngagementStats";

interface JournalCardProps {
  post: JournalPost;
}

export default function JournalCard({ post }: JournalCardProps) {
  return (
    <article className="group cursor-pointer">
      {/* Image */}
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-t-xl bg-stone-100">
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

        {/* Content Below */}
        <div className="bg-stone-50/50 rounded-b-xl p-6 md:p-8 border border-t-0 border-stone-200/50">
          <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 leading-tight mb-3 group-hover:text-stone-700 transition-colors">
            {post.title}
          </h3>

          <p className="text-sm text-stone-600 leading-relaxed mb-4">
            {post.description}
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-stone-500">
                {post.date}
              </p>

              <div className="flex items-center gap-1.5 text-stone-700 group-hover:text-stone-900 transition-colors">
                <span className="text-xs font-light">Continue Reading</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            {/* Engagement Stats */}
            {post.engagement && (
              <div className="pt-3 border-t border-stone-200">
                <EngagementStats
                  views={post.engagement.views}
                  likes={post.engagement.likes}
                  commentCount={post.engagement.comments.length}
                  variant="compact"
                />
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

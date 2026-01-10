"use client";

import { Comment } from "@/data/journalPosts";
import { CONTACT } from "@/data/contact";

interface CommentsSectionProps {
  comments: Comment[];
}

export default function CommentsSection({ comments }: CommentsSectionProps) {
  if (!comments || comments.length === 0) {
    return null;
  }

  // Get initials from author name
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate avatar color based on name
  const getAvatarColor = (name: string): string => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-orange-500",
      "bg-rose-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <section className="py-16 md:py-20 px-6 md:px-16 bg-stone-50">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 md:mb-12">
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-light text-stone-900 text-center mb-2">
            Reader Comments
          </h2>
          <p className="text-sm text-stone-500 text-center">
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </p>
        </div>

        {/* Comments List */}
        <div className="space-y-8">
          {comments.map((comment) => (
            <article
              key={comment.id}
              className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-stone-200"
            >
              <div className="flex gap-4">
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full ${getAvatarColor(
                    comment.author
                  )} flex items-center justify-center text-white font-medium text-sm`}
                >
                  {getInitials(comment.author)}
                </div>

                {/* Comment Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-medium text-stone-900">{comment.author}</h3>
                      {comment.role && (
                        <p className="text-xs text-stone-500 mt-0.5">{comment.role}</p>
                      )}
                    </div>
                    <time className="text-xs text-stone-400 whitespace-nowrap">
                      {comment.date}
                    </time>
                  </div>

                  <p className="text-sm md:text-base text-stone-600 leading-relaxed mb-3">
                    {comment.content}
                  </p>

                  {/* Comment Engagement */}
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-700 transition-colors">
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
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Add Comment CTA */}
        <div className="mt-12 pt-8 border-t border-stone-200 text-center">
          <p className="text-sm text-stone-600 mb-4">
            Want to share your thoughts on this article?
          </p>
          <a
            href={`${CONTACT.whatsapp.url}?text=Hi%20Tsurov,%20I'd%20like%20to%20comment%20on%20your%20article`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white hover:bg-stone-800 transition-all duration-200 text-sm font-medium tracking-wider uppercase rounded-full"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Send Message
          </a>
        </div>
      </div>
    </section>
  );
}

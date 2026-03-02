"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export interface ServiceVideo {
  id: string;
  youtubeUrl: string;
  title?: string;
}

interface VideoSectionProps {
  videos: ServiceVideo[];
  subcategoryTitle?: string;
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function VideoCard({ video }: { video: ServiceVideo }) {
  const [playing, setPlaying] = useState(false);
  const videoId = extractYouTubeId(video.youtubeUrl);

  if (!videoId) return null;

  return (
    <div className="relative rounded-lg overflow-hidden bg-stone-900 shadow-lg">
      <div className="relative aspect-video">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={video.title || "Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full group cursor-pointer"
          >
            {/* YouTube thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={video.title || "Video thumbnail"}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-2xl">
                <Play className="w-7 h-7 md:w-8 md:h-8 text-stone-900 ml-1" fill="currentColor" />
              </div>
            </div>
          </button>
        )}
      </div>
      {video.title && (
        <div className="px-4 py-3 bg-white">
          <p className="text-sm text-stone-700 font-medium truncate">{video.title}</p>
        </div>
      )}
    </div>
  );
}

export default function VideoSection({ videos, subcategoryTitle }: VideoSectionProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="py-16 md:py-24 px-6 md:px-16 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>
          </div>
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-4">
            Video Showcase
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-stone-900">
            {subcategoryTitle ? `${subcategoryTitle} in Motion` : "See Our Work in Motion"}
          </h2>
        </div>

        {/* Videos Grid */}
        <div className={`grid gap-6 md:gap-8 ${
          videos.length === 1
            ? "max-w-3xl mx-auto"
            : videos.length === 2
              ? "grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}

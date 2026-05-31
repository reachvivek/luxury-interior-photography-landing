import { notFound } from "next/navigation";
import BlogPostContent from "@/components/BlogPostContent";
import { getCachedSection } from "@/lib/content";
import { journalPosts as defaultPosts } from "@/data/journalPosts";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getJournalPosts() {
  const data = await getCachedSection("journal");
  return (data as any[]) ?? null;
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { readonly params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getJournalPosts();
  const journalPosts = posts && posts.length > 0 ? posts : defaultPosts;

  const post = journalPosts.find((p: any) => p.slug === slug);

  if (!post || (!post.content && !post.htmlContent) || post.status === "draft") {
    notFound();
  }

  const relatedPosts = journalPosts.filter((p: any) => p.id !== post.id && p.status !== "draft").slice(0, 2);

  return <BlogPostContent post={post} relatedPosts={relatedPosts} />;
}

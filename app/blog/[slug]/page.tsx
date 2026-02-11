import { notFound } from "next/navigation";
import BlogPostContent from "@/components/BlogPostContent";
import { prisma } from "@/lib/prisma";
import { journalPosts as defaultPosts } from "@/data/journalPosts";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getJournalPosts() {
  try {
    const record = await prisma.contentSection.findUnique({ where: { section: "journal" } });
    return (record?.data as any[]) ?? null;
  } catch {
    return null;
  }
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { readonly params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getJournalPosts();
  const journalPosts = posts && posts.length > 0 ? posts : defaultPosts;

  const post = journalPosts.find((p: any) => p.slug === slug);

  if (!post || !post.content) {
    notFound();
  }

  const relatedPosts = journalPosts.filter((p: any) => p.id !== post.id).slice(0, 2);

  return <BlogPostContent post={post} relatedPosts={relatedPosts} />;
}

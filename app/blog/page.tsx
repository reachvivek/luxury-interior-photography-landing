import BlogListPage from "@/components/BlogListPage";
import { prisma } from "@/lib/prisma";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getJournalPosts() {
  try {
    const record = await prisma.contentSection.findUnique({ where: { section: "journal" } });
    return (record?.data as any) ?? null;
  } catch {
    return null;
  }
}

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getJournalPosts();
  // Filter out drafts from public listing
  const published = Array.isArray(posts)
    ? posts.filter((p: any) => p.status !== "draft")
    : posts;

  return <BlogListPage posts={published} />;
}

import BlogListPage from "@/components/BlogListPage";
import { getCachedSection } from "@/lib/content";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getJournalPosts() {
  const data = await getCachedSection("journal");
  return (data as any) ?? null;
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

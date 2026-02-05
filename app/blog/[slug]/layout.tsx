import { Metadata } from 'next';
import { journalPosts } from '@/data/journalPosts';
import { SEO_CONFIG } from '@/constants/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  const { siteUrl, siteName } = SEO_CONFIG;

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: [
      post.category,
      'interior photography',
      'photography insights',
      'design photography',
      `${siteName} blog`,
    ],
    authors: [{ name: post.author || siteName }],
    openGraph: {
      title: `${post.title} | ${siteName}`,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || siteName],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | ${siteName}`,
      description: post.description,
      images: [post.image],
    },
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return journalPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

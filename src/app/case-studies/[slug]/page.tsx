import React from 'react';
import { BlogDetailsPageShared } from '@/components/blog/BlogDetailsPage';
import { postsService } from '@/services/posts.service';
import { Metadata } from 'next';

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await postsService.getPublishedPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.seo?.metaTitle || post.title} | Case Study | Quest For Tech`,
    description: post.seo?.metaDescription || post.excerpt,
    alternates: {
      canonical: post.seo?.canonicalUrl || undefined
    },
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: post.featuredImage ? [{ url: post.featuredImage }] : []
    }
  };
}

export default async function Page({ params }: RouteProps) {
  const { slug } = await params;
  return <BlogDetailsPageShared slug={slug} />;
}

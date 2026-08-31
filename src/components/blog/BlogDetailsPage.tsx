import React from 'react';
import BlogDetails from '@/features/Blog/BlogDetails';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { postsService } from '@/services/posts.service';
import { notFound } from 'next/navigation';

interface BlogDetailsPageSharedProps {
  slug: string;
}

export async function BlogDetailsPageShared({ slug }: BlogDetailsPageSharedProps) {
  const post = await postsService.getPublishedPostBySlug(slug);
  if (!post) {
    notFound();
  }

  // Sanitize: convert all Firestore Timestamps / non-plain values to plain JSON
  const plainPost = JSON.parse(JSON.stringify(post));

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0e] transition-colors duration-300 flex flex-col justify-between">
      <div>
        <Header />
        <div className="pt-20">
          <BlogDetails blog={plainPost} />
        </div>
      </div>
      <Footer />
    </div>
  );
}


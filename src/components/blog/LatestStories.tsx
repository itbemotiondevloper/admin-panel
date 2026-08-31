'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface Article {
  id: string;
  slug: string;
  title: string;
  date: string;
  image: string;
  category: string;
}
import { postsService } from '../../services/posts.service';

// Formatting helper
const formatDate = (dateString: any) => {
  if (!dateString) return '';
  const dateObj = typeof dateString.toDate === 'function' ? dateString.toDate() : new Date(dateString);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
interface LatestStoriesProps {
  selectedCategory?: string;
  searchQuery?: string;
}

export default function LatestStories({
  selectedCategory = 'All Blogs',
  searchQuery = '',
}: LatestStoriesProps) {
  const [visibleCount, setVisibleCount] = React.useState(12);
  const [allStories, setAllStories] = React.useState<Article[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadPosts() {
      try {
        const posts = await postsService.getPosts({ status: 'Published' });
        
        const mapped: Article[] = posts.map((p: any) => ({
          id: p._id,
          slug: p.slug,
          title: p.title,
          date: formatDate(p.createdAt || p.publishedAt),
          image: p.featuredImage || '/Kitchen Automation.jpg',
          category: p.category?.name || 'Articles',
        }));
        setAllStories(mapped);
      } catch (err) {
        console.error('Failed to fetch posts from backend:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPosts();
  }, []);

  const matchesFilter = (article: Article) => {
    const matchesCategory =
      selectedCategory === 'All Blogs' ||
      article.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  };

  const isFiltering = searchQuery.trim() !== '' || selectedCategory !== 'All Blogs';
  const filteredStories = allStories.filter(matchesFilter);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Section Header: Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-12">
        <div>
          <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-widest text-[#FF4F18] block mb-2">
            Blog & Articles
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15]">
            Latest <span className="text-[#FF4F18]">Stories</span>
          </h2>
        </div>
      </div>

      {/* Article Grid */}
      {isLoading ? (
        <div className="text-center py-20 text-zinc-500 font-semibold animate-pulse">Loading stories...</div>
      ) : (() => {
        const storiesToRender = isFiltering ? filteredStories : allStories;
        if (storiesToRender.length === 0) {
          return (
            <div className="text-center py-16 text-zinc-500 dark:text-zinc-400 font-semibold">
              No stories found matching your criteria.
            </div>
          );
        }
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {storiesToRender.slice(0, visibleCount).map((article) => (
              <Link
                key={article.id}
                href={`/blogs/${article.slug}`}
                className="flex flex-col h-full bg-transparent group"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-[24px] bg-zinc-100 dark:bg-zinc-900 mb-4 border border-zinc-200/60 dark:border-zinc-800/60 shadow-2xs shrink-0">
                  <Image
                    src={encodeURI(article.image)}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-base font-extrabold leading-snug text-[#111111] dark:text-white group-hover:text-[#FF4F18] transition-colors mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mt-auto">
                  {article.date}
                </p>
              </Link>
            ))}
          </div>
        );
      })()}

      {/* Load More Button */}
      {!isLoading && (() => {
        const storiesToRender = isFiltering ? filteredStories : allStories;
        return visibleCount < storiesToRender.length && (
          <div className="pt-12 md:pt-16 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FF4F18] text-sm font-bold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer"
            >
              <span>Load More Stories</span>
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        );
      })()}
    </section>
  );
}

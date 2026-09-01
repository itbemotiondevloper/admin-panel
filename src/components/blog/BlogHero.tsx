'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { postsService } from '../../services/posts.service';
import { categoriesService } from '../../services/categories.service';

interface BlogHeroProps {
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

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

export default function BlogHero({
  selectedCategory = 'All Blogs',
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
}: BlogHeroProps) {
  const [internalCategory, setInternalCategory] = useState('All Blogs');
  const [featuredPost, setFeaturedPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const activeCategory = onSelectCategory ? selectedCategory : internalCategory;

  useEffect(() => {
    async function loadFeatured() {
      try {
        setIsLoading(true);
        // Fetch the specific featured post by isFeatured flag
        const posts = await postsService.getPosts({ status: 'Published', isFeatured: true, limitCount: 1 });
        if (posts.length > 0) {
          setFeaturedPost(posts[0]);
        } else {
          // If no explicitly featured post is found, fallback to the latest post
          const fallbackPosts = await postsService.getPosts({ status: 'Published', limitCount: 1 });
          if (fallbackPosts.length > 0) {
            setFeaturedPost(fallbackPosts[0]);
          }
        }
      } catch (err) {
        console.warn("Featured post query failed, falling back to latest post.", err);
        try {
          const fallbackPosts = await postsService.getPosts({ status: 'Published', limitCount: 1 });
          if (fallbackPosts.length > 0) {
            setFeaturedPost(fallbackPosts[0]);
          }
        } catch (fallbackErr) {
          console.error("Failed to load fallback post", fallbackErr);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadFeatured();
  }, []);

  const handleCategoryClick = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    } else {
      setInternalCategory(category);
    }
  };

  const [categories, setCategories] = useState<string[]>([
    'All Blogs',
    'Restaurant Operations',
    'Kitchen',
    'Inventory',
    'Analytics',
  ]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await categoriesService.getCategories();
        if (cats.length > 0) {
          setCategories(['All Blogs', ...cats.map((c: any) => c.name)]);
        }
      } catch (err) {
        console.warn('Failed to load categories, using defaults', err);
      }
    }
    loadCategories();
  }, []);

  // Static Fallback values
  const defaultTitle = "Why Restaurants in India Trust Digitory for Smart Operations & Growth";
  const defaultSlug = "why-restaurants-in-india-trust-digitory-for-smart-operations-growth";
  const defaultDate = "July 8, 2026";
  const defaultImage = "/blogpage.jpg";

  // Use dynamic backend post if available, else static default
  const title = featuredPost?.title || defaultTitle;
  const slug = featuredPost?.slug || defaultSlug;
  const date = featuredPost ? formatDate(featuredPost.createdAt || featuredPost.publishedAt) : defaultDate;
  const image = featuredPost?.featuredImage || defaultImage;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 md:pt-10 md:pb-10">
      {/* Top Header Bar: Explore Topics & Categories + Right-aligned Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 md:pb-12 border-b border-zinc-200/60 dark:border-zinc-800/60">

        {/* Left aligned Search Bar */}
        <div className="relative w-full sm:w-72 shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="What are you looking for?"
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all shadow-2xs"
          />
        </div>

        {/* Right aligned Categories */}
        <nav className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 justify-start lg:justify-end">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`text-sm font-medium transition-colors cursor-pointer ${isActive
                  ? 'text-zinc-900 dark:text-white font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
              >
                {category}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Featured Article Section */}
      {(activeCategory === 'All Blogs' && searchQuery.trim() === '') && (
        isLoading ? (
          <div className="pt-8 md:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-pulse">
            {/* Left Content Column Skeleton */}
            <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-4 space-y-4 w-full">
              <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              <div className="h-10 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
              <div className="h-12 w-36 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            </div>

            {/* Right Image Column Skeleton */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
              <div className="w-full max-w-[620px] rounded-[28px] bg-zinc-200 dark:bg-zinc-800 aspect-[16/9]" />
            </div>
          </div>
        ) : (
          <div className="pt-8 md:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-4">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#FFF3EF] dark:bg-[#FF4F18]/10 text-[11px] font-extrabold text-[#FF4F18] tracking-widest uppercase mb-4 border border-orange-100 dark:border-transparent">
                FEATURED ARTICLE
              </span>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-4 text-left">
                {title}
              </h1>

              <p className="text-xs font-bold text-zinc-400 mb-6 uppercase tracking-wide">
                {date}
              </p>

              <Link
                href={`/blogs/${slug}`}
                className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer group"
              >
                <span>Read article</span>
                <svg
                  className="w-4 h-4 text-white ml-2 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-[620px] rounded-[28px] overflow-hidden shadow-2xs border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-100 dark:bg-zinc-900 aspect-[16/9]">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="w-full h-full object-cover block"
                  priority
                />
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
}

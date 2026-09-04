'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { postsService } from "@/services/posts.service";

export interface CaseStudyArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

const formatDate = (dateString: any) => {
  if (!dateString) return '';
  const dateObj = typeof dateString.toDate === 'function' ? dateString.toDate() : new Date(dateString);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function CaseStudiesListingPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudyArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCaseStudies() {
      try {
        const posts = await postsService.getPosts({ status: 'Published', contentType: 'case-study' });
        const mapped: CaseStudyArticle[] = posts.map((p: any) => ({
          id: p._id,
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt || '',
          date: formatDate(p.createdAt || p.publishedAt),
          image: p.featuredImage || '/featured.png',
          category: p.category?.name || 'CASE STUDY',
        }));
        setCaseStudies(mapped);
      } catch (err) {
        console.error('Failed to fetch case studies:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCaseStudies();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0e] transition-colors duration-300 flex flex-col justify-between font-sans">
      <div>
        <Header />
        
        {/* Hero Header */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 md:pt-20 md:pb-12">
          <div className="max-w-3xl">
            <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-widest text-[#FF4F18] block mb-3">
              Case Studies & Client Impact
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15] mb-6">
              We Don't Just Build. <br />
              <span className="text-[#FF4F18]">We Measure What We Build.</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Explore how we combine strategy, creativity, scalable technology, and continuous optimization to deliver measurable business outcomes for our clients.
            </p>
          </div>
        </section>

        {/* Listing Grid */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {isLoading ? (
            <div className="text-center py-20 text-zinc-500 font-semibold animate-pulse">
              Loading Case Studies...
            </div>
          ) : caseStudies.length === 0 ? (
            <div className="rounded-[32px] border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900/30 p-12 text-center my-8">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">New Case Studies Coming Soon</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-6">
                We're currently documenting our latest project results and success metrics. Check back soon or contact us to discuss how we can deliver results for your business.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF4F18] text-sm font-bold text-white transition-all hover:bg-[#E03F0D]"
              >
                Let's Talk About Your Project
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((item) => (
                <Link
                  key={item.id}
                  href={`/case-studies/${item.slug}`}
                  className="flex flex-col h-full bg-white dark:bg-[#121214] rounded-[28px] border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-[#FF4F18] text-white text-[10px] font-extrabold px-3 py-1 rounded-full tracking-wider uppercase">
                      Case Study
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      <p className="text-xs font-semibold text-zinc-400 mb-2">{item.date}</p>
                      <h3 className="text-xl font-extrabold text-[#111111] dark:text-white group-hover:text-[#FF4F18] transition-colors leading-snug mb-3">
                        {item.title}
                      </h3>
                      {item.excerpt && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                    <div className="inline-flex items-center text-xs font-bold text-[#FF4F18] group-hover:translate-x-1 transition-transform">
                      Read Case Study <span className="ml-1">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}

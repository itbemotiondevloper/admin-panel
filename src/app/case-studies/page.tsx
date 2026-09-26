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
    <div className="min-h-screen bg-white text-[#111111] transition-colors duration-300 flex flex-col justify-between font-sans">
      <div>
        <Header />
        
        {/* Hero Header */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 md:pt-28 md:pb-12">
          <div className="max-w-3xl">
            <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-widest text-[#7C3AED] dark:text-[#A78BFA] block mb-3">
              Case Studies & Client Impact
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] leading-[1.15] mb-6" style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}>
              We Don't Just Build. <br />
              <span className="text-[#7C3AED] dark:text-[#A78BFA]">We Measure What We Build.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
              Explore how we combine strategy, creativity, scalable technology, and continuous optimization to deliver measurable business outcomes for our clients.
            </p>
          </div>
        </section>

        {/* Listing Grid */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {isLoading ? (
            <div className="text-center py-20 text-[#666666] font-semibold animate-pulse">
              Loading Case Studies...
            </div>
          ) : caseStudies.length === 0 ? (
            <div className="rounded-[32px] border border-[#111111]/10 bg-[#EBEBE6] p-12 text-center my-8">
              <h3 className="text-xl font-bold text-[#111111] mb-2">New Case Studies Coming Soon</h3>
              <p className="text-sm text-[#666666] max-w-md mx-auto mb-6">
                We're currently documenting our latest project results and success metrics. Check back soon or contact us to discuss how we can deliver results for your business.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] text-sm font-semibold text-white transition-all hover:bg-[#A78BFA] hover:text-black"
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
                  className="flex flex-col h-full bg-[#EBEBE6] rounded-[24px] border border-[#111111]/10 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-[#DFDFDA]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-[#111111] text-white text-[10px] font-extrabold px-3 py-1 rounded-full tracking-wider uppercase">
                      Case Study
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      <p className="text-xs font-semibold text-[#888888] mb-2">{item.date}</p>
                      <h3 className="text-xl font-bold text-[#111111] group-hover:text-[#A78BFA] transition-colors leading-snug mb-3">
                        {item.title}
                      </h3>
                      {item.excerpt && (
                        <p className="text-xs text-[#666666] line-clamp-3 leading-relaxed mb-4">
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                    <div className="inline-flex items-center text-xs font-bold text-[#111111] group-hover:text-[#A78BFA] group-hover:translate-x-1 transition-all">
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

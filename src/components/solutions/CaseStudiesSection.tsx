'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { postsService } from '@/services/posts.service';

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  categoryName: string;
  date: string;
}

const formatDate = (dateString: any) => {
  if (!dateString) return '';
  const dateObj =
    typeof dateString.toDate === 'function' ? dateString.toDate() : new Date(dateString);
  return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// ─── Featured card (first/largest item) ──────────────────────────────────────
function FeaturedCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${cs.slug}`}
      className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[28px] overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: '#0E0E0E',
        border: '1px solid rgba(214,220,220,0.07)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.border = '1px solid rgba(193,182,255,0.2)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 60px rgba(193,182,255,0.06)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.border = '1px solid rgba(214,220,220,0.07)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Image — left on desktop */}
      <div className="relative overflow-hidden min-h-[280px] lg:min-h-[480px] bg-[#161616]">
        <img
          src={cs.featuredImage}
          alt={cs.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 60%)' }}
        />
        {/* Tag */}
        <div
          className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest"
          style={{
            fontFamily: 'Barlow, sans-serif',
            background: 'rgba(193,182,255,0.12)',
            border: '1px solid rgba(193,182,255,0.25)',
            color: '#C1B6FF',
            backdropFilter: 'blur(8px)',
          }}
        >
          Case Study
        </div>
        {/* Featured label */}
        <div
          className="absolute bottom-5 left-5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest"
          style={{
            fontFamily: 'Barlow, sans-serif',
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(214,220,220,0.12)',
            color: 'rgba(214,220,220,0.6)',
            backdropFilter: 'blur(8px)',
          }}
        >
          Featured
        </div>
      </div>

      {/* Text — right on desktop */}
      <div className="flex flex-col justify-center p-8 lg:p-12">
        <div
          className="flex items-center gap-3 mb-6"
          style={{ borderBottom: '1px solid rgba(214,220,220,0.07)', paddingBottom: '1.5rem' }}
        >
          <span
            className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ fontFamily: 'Barlow, sans-serif', color: '#C1B6FF', opacity: 0.7 }}
          >
            Case Study
          </span>
        </div>

        {cs.date && (
          <p
            className="text-xs mb-4"
            style={{
              fontFamily: 'Barlow, sans-serif',
              color: 'rgba(214,220,220,0.3)',
              letterSpacing: '0.05em',
            }}
          >
            {cs.date}
          </p>
        )}

        <h3
          className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#D6DCDC] leading-snug mb-5 transition-all duration-300"
          style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
        >
          {cs.title}
        </h3>

        {cs.excerpt && (
          <p
            className="text-sm sm:text-base leading-relaxed mb-8"
            style={{
              fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif",
              color: 'rgba(214,220,220,0.45)',
            }}
          >
            {cs.excerpt}
          </p>
        )}

        <div
          className="inline-flex items-center gap-2 text-xs font-semibold group-hover:gap-4 transition-all duration-300"
          style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '0.08em', color: '#C1B6FF' }}
        >
          READ CASE STUDY →
        </div>
      </div>
    </Link>
  );
}

// ─── Secondary card ──────────────────────────────────────────────────────────
function SecondaryCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${cs.slug}`}
      className="group flex flex-col rounded-[24px] overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: '#0E0E0E',
        border: '1px solid rgba(214,220,220,0.07)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.border = '1px solid rgba(193,182,255,0.18)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(193,182,255,0.05)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.border = '1px solid rgba(214,220,220,0.07)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-[#161616]">
        <img
          src={cs.featuredImage}
          alt={cs.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)' }}
        />
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest"
          style={{
            fontFamily: 'Barlow, sans-serif',
            background: 'rgba(193,182,255,0.12)',
            border: '1px solid rgba(193,182,255,0.25)',
            color: '#C1B6FF',
            backdropFilter: 'blur(8px)',
          }}
        >
          Case Study
        </div>
      </div>

      {/* Text */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        {cs.date && (
          <p
            className="text-xs mb-3"
            style={{
              fontFamily: 'Barlow, sans-serif',
              color: 'rgba(214,220,220,0.3)',
              letterSpacing: '0.05em',
            }}
          >
            {cs.date}
          </p>
        )}
        <h3
          className="text-xl font-normal text-[#D6DCDC]/85 leading-snug mb-3 line-clamp-2"
          style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
        >
          {cs.title}
        </h3>
        {cs.excerpt && (
          <p
            className="text-sm text-[#D6DCDC]/40 line-clamp-3 leading-relaxed mb-5 flex-grow"
            style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
          >
            {cs.excerpt}
          </p>
        )}
        <div
          className="inline-flex items-center text-xs font-semibold group-hover:gap-3 transition-all duration-300 gap-2"
          style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '0.08em', color: '#C1B6FF' }}
        >
          READ CASE STUDY →
        </div>
      </div>
    </Link>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function CaseStudiesSection() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await postsService.getPosts({ status: 'Published', limitCount: 3 });
        const items: CaseStudy[] = (res || []).map((p: any) => ({
          id: p._id || p.id,
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt || p.seoDescription || '',
          featuredImage: p.featuredImage || '/featured.png',
          categoryName: p.category?.name || p.categoryName || 'Case Study',
          date: formatDate(p.createdAt || p.publishedAt),
        }));
        setCaseStudies(items);
      } catch (err: any) {
        console.warn('Could not load Firestore case studies (permission/auth restricted):', err?.message || err);
        setCaseStudies([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const featured = caseStudies[0];
  const secondary = caseStudies.slice(1);

  return (
    <section className="relative w-full bg-white dark:bg-black overflow-hidden transition-colors duration-300">
      <div
        className="w-full h-px bg-slate-200 dark:bg-transparent"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(214,220,220,0.07), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-5 h-px bg-slate-400 dark:bg-[#D6DCDC]/40" />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-[#D6DCDC]/50"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                PROVEN RESULTS
              </span>
            </div>

            <h2
              className="text-4xl sm:text-5xl font-normal leading-[1.1] tracking-tight text-slate-900 dark:text-[#D6DCDC] mb-6"
              style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
            >
              Real World Case Studies
            </h2>

            <p
              className="text-base sm:text-lg text-slate-600 dark:text-[#D6DCDC]/50 leading-relaxed"
              style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
            >
              Every project starts with a different challenge. Our case studies show how we use
              strategy, creativity, technology, and continuous optimisation to create measurable
              outcomes.
            </p>
          </div>

          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-200 bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200 dark:bg-transparent dark:border-[#D6DCDC]/18 dark:text-[#D6DCDC] dark:hover:bg-white/10 cursor-pointer shrink-0"
            style={{
              fontFamily: 'Barlow, sans-serif',
              letterSpacing: '0.1em',
            }}
          >
            EXPLORE ALL →
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div
            className="py-20 text-center text-sm animate-pulse text-slate-400 dark:text-[#D6DCDC]/25"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            Loading case studies...
          </div>
        ) : caseStudies.length > 0 ? (
          <div className="space-y-6">
            {/* Featured */}
            {featured && <FeaturedCard cs={featured} />}

            {/* Secondary row */}
            {secondary.length > 0 && (
              <div className={`grid gap-6 ${secondary.length === 1 ? 'grid-cols-1 max-w-xl' : 'grid-cols-1 md:grid-cols-2'}`}>
                {secondary.map((cs) => (
                  <SecondaryCard key={cs.id} cs={cs} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div
            className="rounded-[24px] p-10 md:p-14 text-center max-w-2xl mx-auto bg-slate-50 dark:bg-[#0E0E0E] border border-slate-200 dark:border-[#D6DCDC]/10"
          >
            <h3
              className="text-xl font-normal text-slate-900 dark:text-[#D6DCDC] mb-2"
              style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
            >
              Featured Project Results
            </h3>
            <p
              className="text-sm leading-relaxed mb-6 text-slate-600 dark:text-[#D6DCDC]/40"
              style={{
                fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif",
              }}
            >
              We work closely with client leadership to structure data-backed marketing and
              technology initiatives. Explore our case studies directory to see how we deliver
              results.
            </p>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-200 bg-slate-900 text-white hover:bg-slate-800 dark:bg-[#D6DCDC] dark:text-black dark:hover:bg-white cursor-pointer"
              style={{
                fontFamily: 'Barlow, sans-serif',
                letterSpacing: '0.1em',
              }}
            >
              BROWSE CASE STUDIES →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

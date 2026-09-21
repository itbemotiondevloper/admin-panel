'use client';

import React from 'react';
import Link from 'next/link';
import { SolutionDetailData, AnatomyItem } from './solutionData';

const DEFAULT_ANATOMY_ITEMS: AnatomyItem[] = [
  {
    number: '01',
    tag: 'STRATEGY',
    title: 'Strategic Architecture',
    description: 'Conversion pathways, content hierarchy, and information architecture engineered around user intent and business objectives.',
    icon: 'strategy',
  },
  {
    number: '02',
    tag: 'DESIGN',
    title: 'UI & Visual Craft',
    description: 'Bespoke design systems, typography hierarchy, and micro-interactions that elevate brand trust and turn visitors into buyers.',
    icon: 'design',
  },
  {
    number: '03',
    tag: 'ENGINEERING',
    title: 'UX-Focused Code',
    description: 'Modern Next.js and React architecture, modular components, flawless responsiveness, and frictionless user flows.',
    icon: 'engineering',
  },
  {
    number: '04',
    tag: 'GROWTH',
    title: 'Performance & SEO',
    description: 'Sub-second page speeds, Core Web Vitals optimization, and semantic structured data for long-term search engine dominance.',
    icon: 'growth',
  },
];

function getIcon(iconType?: string, index: number = 0) {
  switch (iconType) {
    case 'search':
    case 'strategy':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      );
    case 'design':
    case 'code':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case 'engineering':
    case 'check':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'growth':
    case 'performance':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    default:
      if (index === 0) {
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      } else if (index === 1) {
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      } else if (index === 2) {
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      } else {
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      }
  }
}

export default function DetailWebsiteAnatomy({ data }: { data: SolutionDetailData }) {
  // Guaranteed items with robust fallback
  const items: AnatomyItem[] = (data?.anatomyItems && data.anatomyItems.length > 0)
    ? data.anatomyItems
    : (data?.anatomyList && data.anatomyList.length > 0)
      ? data.anatomyList.map((title, idx) => ({
          number: `0${idx + 1}`,
          tag: idx === 0 ? 'STRATEGY' : idx === 1 ? 'DESIGN' : idx === 2 ? 'ENGINEERING' : 'GROWTH',
          title,
          description: DEFAULT_ANATOMY_ITEMS[idx % DEFAULT_ANATOMY_ITEMS.length].description,
          icon: idx === 0 ? 'strategy' : idx === 1 ? 'design' : idx === 2 ? 'engineering' : 'growth',
        }))
      : DEFAULT_ANATOMY_ITEMS;

  // Format title lines with brand accent on the last line
  const titleLines = data?.anatomyTitleLines && data.anatomyTitleLines.length > 0
    ? data.anatomyTitleLines
    : ['Strategy, Design & Technology,', 'in sync.'];
  const mainLines = titleLines.slice(0, -1);
  const accentLine = titleLines[titleLines.length - 1];

  return (
    <section
      id="anatomy"
      className="w-full bg-[#F8F8F5] dark:bg-[#0d0d0e] py-16 md:py-24 border-b border-[rgba(17,17,17,0.06)] dark:border-zinc-800/60 transition-colors duration-300 relative overflow-hidden"
      aria-label="Strategy, Design & Technology In Sync"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
        
        {/* Eyebrow index with Quest For Tech brand styling */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] font-bold text-[#111111] dark:text-white uppercase tracking-[0.2em]">05</span>
          <span className="w-5 h-px bg-[#111111]/20 dark:bg-white/20" />
          <span className="text-[11px] font-bold text-[#777777] dark:text-zinc-400 uppercase tracking-[0.2em]">
            WHAT GOES INTO IT
          </span>
        </div>

        {/* ── HEADER BLOCK (Title on Left, Description on Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 sm:mb-16 items-start">
          <div className="lg:col-span-7">
            <h2
              className="text-[28px] sm:text-[34px] md:text-[38px] lg:text-[42px] xl:text-[46px] font-[850] tracking-tight leading-[1.15]"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
            >
              <span className="block text-[#111111] dark:text-white whitespace-normal sm:whitespace-nowrap">
                {titleLines[0] || 'Strategy, Design & Technology,'}
              </span>
              <span className="block text-[#A78BFA]">
                {titleLines[1] || 'in sync.'}
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 text-zinc-600 dark:text-zinc-400 space-y-4 text-sm md:text-base leading-relaxed lg:pt-2">
            <p>
              {data?.anatomySubhead ||
                'How we combine strategic thinking, bespoke design, and modern engineering to build websites that accelerate business growth.'}
            </p>
          </div>
        </div>

        {/* ── CARD GRID CONTAINER (Guaranteed 4-column connected structure) ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch border border-zinc-200/90 dark:border-zinc-800 rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-sm bg-white dark:bg-zinc-950/40"
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`group flex flex-col h-full items-start text-left relative p-8 sm:p-9 transition-all duration-300 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 border-zinc-200/90 dark:border-zinc-800
                ${idx !== items.length - 1 ? 'border-b' : ''}
                ${idx >= 2 ? 'md:border-b-0' : ''}
                lg:border-b-0
                ${idx % 2 === 0 ? 'md:border-r' : 'md:border-r-0'}
                ${idx !== items.length - 1 ? 'lg:border-r' : 'lg:border-r-0'}
              `}
            >
              {/* Circle Icon Badge & Step/Tag */}
              <div className="flex items-center gap-4 mb-6 shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F2EE] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-[#111111] dark:text-white group-hover:bg-[#A78BFA] group-hover:text-black group-hover:border-[#A78BFA] transition-all duration-300 shadow-xs">
                  {getIcon(item.icon, idx)}
                </div>
                <span className="text-[13px] font-extrabold tracking-widest text-[#777777] dark:text-zinc-400 group-hover:text-[#A78BFA] uppercase transition-colors">
                  {item.tag || item.number || `0${idx + 1}`}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2.5 flex-1">
                <h3 className="text-[17px] sm:text-[18px] font-bold text-zinc-900 dark:text-white leading-snug group-hover:text-[#A78BFA] transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-[13.5px] sm:text-[14px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM LINK ── */}
        <div className="mt-8 sm:mt-10 flex items-center justify-end">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[13.5px] font-bold text-zinc-900 dark:text-white hover:text-[#A78BFA] dark:hover:text-[#A78BFA] transition-colors duration-200 group"
          >
            <span>See how our process delivers results</span>
            <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">&rarr;</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

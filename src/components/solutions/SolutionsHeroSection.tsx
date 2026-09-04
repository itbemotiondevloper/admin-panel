'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface SolutionTab {
  id: string;
  label: string;
  shortName: string;
  headline: string;
  tagline: string;
  metricLabel: string;
  metricVal: string;
  features: string[];
  href: string;
}

const SOLUTION_TABS: SolutionTab[] = [
  {
    id: 'website-development',
    label: 'Website Dev',
    shortName: 'Website Development',
    headline: 'Digital Foundations Built to Perform',
    tagline: 'Fast, responsive, user-focused web experiences designed to build trust & convert visitors.',
    metricLabel: 'Lighthouse Speed',
    metricVal: '99/100',
    features: ['Custom Next.js Stack', 'Mobile First UX', 'CMS Integration'],
    href: '/solutions/website-development',
  },
  {
    id: 'seo',
    label: 'SEO',
    shortName: 'Search Engine Optimisation',
    headline: 'Capture High-Intent Organic Demand',
    tagline: 'Ethical, data-backed SEO strategies to dominate competitive search queries.',
    metricLabel: 'Organic Traffic',
    metricVal: '+142%',
    features: ['Technical Audit', 'Keyword Dominance', 'Authority Content'],
    href: '/solutions/seo',
  },
  {
    id: 'content',
    label: 'Content',
    shortName: 'Content Strategy',
    headline: 'Give Your Brand Something Worth Saying',
    tagline: 'Purposeful storytelling that positions your business as the category authority.',
    metricLabel: 'Engagement Rate',
    metricVal: '3.4×',
    features: ['Copywriting', 'Brand Narrative', 'Lead Magnets'],
    href: '/solutions/content',
  },
  {
    id: 'performance-marketing',
    label: 'Performance',
    shortName: 'Performance Marketing',
    headline: 'Turn Paid Spend into Measurable Revenue',
    tagline: 'Targeted ad distribution across Search, Social, and Display with clear ROI goals.',
    metricLabel: 'Average ROAS',
    metricVal: '4.8×',
    features: ['Meta & Google Ads', 'Funnel Tracking', 'CRO Testing'],
    href: '/solutions/performance-marketing',
  },
  {
    id: 'custom-development',
    label: 'Custom Dev',
    shortName: 'Custom Tech & AI',
    headline: 'Technology Tailored to Your Business Model',
    tagline: 'Scalable web applications, API integrations, and workflow automation.',
    metricLabel: 'Uptime SLA',
    metricVal: '99.99%',
    features: ['Custom APIs', 'Workflow Automation', 'Cloud Security'],
    href: '/solutions/custom-development',
  },
];

/** Interactive Solution Tab Explorer */
function HeroSolutionTabExplorer() {
  const [activeId, setActiveId] = useState('website-development');
  const activeTab = SOLUTION_TABS.find((t) => t.id === activeId) || SOLUTION_TABS[0];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Main Glass Card Container */}
      <div className="relative z-10 rounded-3xl p-6 sm:p-7 bg-slate-50 dark:bg-[#090909] border border-slate-200 dark:border-[#D6DCDC]/15 shadow-xl transition-all duration-300">
        {/* Top Interactive Tabs Header */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 scrollbar-none border-b border-slate-200 dark:border-[#D6DCDC]/10">
          {SOLUTION_TABS.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveId(tab.id)}
                type="button"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-[#D6DCDC] dark:text-black border border-slate-900 dark:border-[#D6DCDC]'
                    : 'bg-transparent text-slate-500 hover:text-slate-900 dark:text-[#D6DCDC]/40 dark:hover:text-white border border-transparent'
                }`}
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display Area */}
        <div className="pt-6 pb-2 space-y-5">
          {/* Eyebrow badge + Metric tag */}
          <div className="flex items-center justify-between">
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-[#D6DCDC]/70"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              {activeTab.shortName}
            </span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-slate-200/70 text-slate-800 dark:bg-[#D6DCDC]/10 dark:text-[#D6DCDC] border border-slate-300 dark:border-[#D6DCDC]/20">
              <span className="text-slate-500 dark:text-[#D6DCDC]/50 font-sans text-[9px] uppercase">{activeTab.metricLabel}:</span>
              {activeTab.metricVal}
            </div>
          </div>

          {/* Dynamic Headline & Description */}
          <div>
            <h3
              className="text-xl sm:text-2xl font-normal text-slate-900 dark:text-[#D6DCDC] leading-tight mb-2.5 transition-all duration-300"
              style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
            >
              {activeTab.headline}
            </h3>
            <p
              className="text-xs sm:text-sm text-slate-600 dark:text-[#D6DCDC]/55 leading-relaxed min-h-[44px]"
              style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
            >
              {activeTab.tagline}
            </p>
          </div>

          {/* Key Feature Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {activeTab.features.map((feat, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg text-xs font-normal bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-[#D6DCDC]/80"
                style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
              >
                ✓ {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Explorer CTA Link */}
        <div className="pt-4 mt-2 flex items-center justify-between border-t border-slate-200 dark:border-[#D6DCDC]/10">
          <span
            className="text-[11px] text-slate-400 dark:text-[#D6DCDC]/35"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            Click tabs above to explore
          </span>
          <Link
            href={activeTab.href}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-[#D6DCDC] transition-all duration-200 hover:gap-3"
            style={{
              fontFamily: 'Barlow, sans-serif',
              letterSpacing: '0.08em',
            }}
          >
            LEARN MORE →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SolutionsHeroSection() {
  return (
    <section className="relative w-full bg-white dark:bg-black overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-24 transition-colors duration-300">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">

          {/* ── Left Content (7 Cols) ── */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-5 h-px bg-slate-400 dark:bg-[#D6DCDC]/40" />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-[#D6DCDC]/60"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                Digital Solutions & Services
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-normal leading-[1.08] tracking-tight text-slate-900 dark:text-[#D6DCDC] mb-6"
              style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
            >
              The Right Strategy.{' '}
              <br className="hidden sm:inline" />
              The Right Technology.{' '}
              <br className="hidden sm:inline" />
              <span className="text-slate-900 dark:text-white">
                The Right Execution.
              </span>
            </h1>

            {/* Description */}
            <p
              className="text-base sm:text-lg lg:text-xl font-normal text-slate-600 dark:text-[#D6DCDC]/60 leading-relaxed mb-10 max-w-2xl"
              style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
            >
              From building your digital foundation to improving search visibility, generating qualified leads,
              and engineering custom technology — Quest For Tech brings strategy, creativity, marketing, and data
              together to create compounding growth.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white dark:bg-[#D6DCDC] dark:text-black px-8 py-4 text-xs font-semibold uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '0.1em' }}
              >
                LET'S TALK →
              </Link>
              <Link
                href="#our-solutions"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 text-slate-800 dark:border-[#D6DCDC]/20 dark:text-[#D6DCDC] bg-transparent px-8 py-4 text-xs font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '0.1em' }}
              >
                EXPLORE SOLUTIONS ↓
              </Link>
            </div>
          </div>

          {/* ── Right Panel (5 Cols) — Interactive Solution Tab Explorer ── */}
          <div className="lg:col-span-5">
            <HeroSolutionTabExplorer />
          </div>

        </div>
      </div>
    </section>
  );
}




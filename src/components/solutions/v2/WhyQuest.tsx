'use client';

import React, { useEffect, useRef } from 'react';
import { FadeReveal } from './RevealText';

// ── Meaningful SVG Graphic Components for Content ──

// Graphic 1: Commercial Revenue Outcomes (Business-First Thinking)
function GraphicCommercial() {
  return (
    <div className="relative w-full h-36 sm:h-44 rounded-xl bg-zinc-950 dark:bg-zinc-900/90 p-4 flex flex-col justify-between overflow-hidden border border-zinc-800/80 shadow-inner">
      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-white border border-white/10">
          <span className="text-[#A78BFA] font-bold">$</span> Commercial Revenue
        </div>
        <span className="text-[10px] font-mono text-[#A78BFA] bg-[#A78BFA]/15 px-2 py-0.5 rounded-full font-bold">
          Target +140%
        </span>
      </div>

      {/* Revenue Growth Bars */}
      <div className="w-full h-16 flex items-end gap-2 pt-2 px-1 z-10">
        {[
          { label: 'Q1', val: 35, active: false },
          { label: 'Q2', val: 50, active: false },
          { label: 'Q3', val: 75, active: false },
          { label: 'Q4', val: 100, active: true },
        ].map((bar, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
            <div 
              className={`w-full rounded-t-sm transition-all duration-500 ${
                bar.active 
                  ? 'bg-gradient-to-t from-[#7C3AED] to-[#A78BFA] shadow-[0_0_12px_rgba(167,139,250,0.4)]' 
                  : 'bg-zinc-800'
              }`}
              style={{ height: `${bar.val}%` }}
            />
            <span className="text-[9px] font-mono text-zinc-400">{bar.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom Summary Pill */}
      <div className="flex items-center justify-between text-[10px] text-zinc-300 font-medium z-10 pt-1 border-t border-zinc-800/60">
        <span className="text-zinc-400">Outcome-Driven</span>
        <span className="text-[#A78BFA] font-bold flex items-center gap-1">
          Revenue &gt; Vanity Traffic
        </span>
      </div>

      {/* Background glow */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#A78BFA]/10 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
}

// Graphic 2: AI & Tech Architecture Workflow (Technology & AI Know-How)
function GraphicTechStack() {
  return (
    <div className="relative w-full h-36 sm:h-44 rounded-xl bg-zinc-950 dark:bg-zinc-900/90 p-4 flex flex-col items-center justify-center overflow-hidden border border-zinc-800/80 shadow-inner">
      {/* Connected Architecture Workflow Nodes */}
      <div className="relative w-full max-w-[240px] flex items-center justify-between z-10">
        {/* Node 1: AI Workflow */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-[#A78BFA]/40 text-[#A78BFA] flex items-center justify-center text-xs font-bold shadow-md">
            AI
          </div>
          <span className="text-[9px] font-mono text-zinc-400">Workflows</span>
        </div>

        {/* Connecting Animated Arrow Line 1 */}
        <div className="flex-1 h-px bg-gradient-to-r from-[#A78BFA] to-zinc-700 mx-2 relative">
          <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] absolute -top-0.5 right-0 animate-pulse" />
        </div>

        {/* Node 2: Custom Engine */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA] text-white flex items-center justify-center shadow-[0_0_15px_rgba(167,139,250,0.4)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="6" height="6" rx="1" />
              <rect x="2" y="2" width="20" height="20" rx="3" />
            </svg>
          </div>
          <span className="text-[9.5px] font-mono text-white font-bold">Tech Stack</span>
        </div>

        {/* Connecting Arrow Line 2 */}
        <div className="flex-1 h-px bg-gradient-to-r from-zinc-700 to-[#A78BFA] mx-2 relative">
          <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] absolute -top-0.5 right-0 animate-pulse" />
        </div>

        {/* Node 3: Scalable Web */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 flex items-center justify-center text-xs font-bold shadow-md">
            &lt;/&gt;
          </div>
          <span className="text-[9px] font-mono text-zinc-400">Scale</span>
        </div>
      </div>

      {/* Floating Tech Chips */}
      <div className="mt-3 flex items-center gap-2 z-10">
        {['Next.js', 'AI Agents', 'Scalable'].map((tag) => (
          <span key={tag} className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-zinc-300">
            {tag}
          </span>
        ))}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#7C3AED]/10 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
}

// Graphic 3: Search & Empirical Data Validation (Data-Backed Decisions)
function GraphicDataSearch() {
  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl bg-zinc-950 dark:bg-zinc-900/90 p-2.5 flex flex-col justify-between overflow-hidden border border-zinc-800/80 shadow-inner">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-mono font-bold text-[#A78BFA] bg-[#A78BFA]/15 px-1.5 py-0.5 rounded">
          SEO #1
        </span>
        <span className="text-[9px] font-mono text-zinc-400">+84%</span>
      </div>

      {/* Smooth Empirical Search Data Curve */}
      <svg className="w-full h-10 text-[#A78BFA]" viewBox="0 0 100 40" fill="none">
        <path d="M0 32 Q 25 35, 50 15 T 100 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="15" r="3" fill="#A78BFA" />
        <circle cx="100" cy="4" r="3" fill="#FFFFFF" />
      </svg>

      <span className="text-[8.5px] font-mono text-zinc-400 tracking-tight truncate">
        Empirical Analytics
      </span>
    </div>
  );
}

// Graphic 4: ROI & Acquisition Metrics (ROI-Driven Approach)
function GraphicROIMetrics() {
  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl bg-zinc-950 dark:bg-zinc-900/90 p-2.5 flex flex-col justify-between overflow-hidden border border-zinc-800/80 shadow-inner">
      <div className="flex items-center justify-between text-white">
        <span className="text-[9px] font-bold text-zinc-300">Metrics</span>
        <span className="text-[8.5px] font-mono text-[#A78BFA] font-bold">ROI 3.8x</span>
      </div>

      {/* Metrics Stack */}
      <div className="space-y-1 my-0.5">
        <div className="bg-white/10 rounded px-1.5 py-0.5 flex items-center justify-between text-[8.5px]">
          <span className="text-zinc-400">CAC</span>
          <span className="text-emerald-400 font-bold">↓ 35%</span>
        </div>
        <div className="bg-white/10 rounded px-1.5 py-0.5 flex items-center justify-between text-[8.5px]">
          <span className="text-zinc-400">LTV</span>
          <span className="text-[#A78BFA] font-bold">↑ 2.4x</span>
        </div>
      </div>

      <span className="text-[8.5px] font-mono text-zinc-400 truncate">
        Rapid Acquisition
      </span>
    </div>
  );
}

export default function WhyQuest() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current) return;
      const items = containerRef.current.querySelectorAll('.reveal-card');

      ctx = gsap.context(() => {
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
            },
          }
        );
      }, containerRef);
    };

    run();
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="why"
      className="w-full bg-[#F8F8F5] dark:bg-[#0D0D0E] py-8 lg:py-12 border-b border-zinc-200 dark:border-zinc-800/80 overflow-hidden flex flex-col justify-center"
      aria-label="Why Quest For Tech"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 w-full">
        
        {/* Editorial Section Header */}
        <FadeReveal className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6 lg:mb-8">
          <div className="lg:col-span-7">

            <h2
              className="font-bold text-zinc-900 dark:text-white leading-[0.95] tracking-[-0.04em]"
              style={{
                fontSize: 'clamp(28px, 3.2vw, 48px)',
                fontFamily: 'var(--font-plus-jakarta-sans)',
              }}
            >
              More Than a<br />
              Service Provider.
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p
              className="text-[13.5px] lg:text-[14.5px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
            >
              Different capabilities. One business objective.
              We bring strategy, design, and code together into an integrated growth engine designed to scale with you.
            </p>
          </div>
        </FadeReveal>

        {/* ── Main Layout Box (3-Column Single-Screen Box Matching Reference Screenshot 2) ── */}
        <div 
          ref={containerRef}
          className="w-full rounded-2xl lg:rounded-3xl bg-white dark:bg-[#141416] border border-zinc-200/90 dark:border-zinc-800 shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200/80 dark:divide-zinc-800">
            
            {/* ── COLUMN 1: Business-First Thinking (Graphic Top, Content Bottom) ── */}
            <div className="reveal-card p-5 sm:p-6 lg:p-7 flex flex-col justify-between gap-6 group">
              {/* Meaningful Graphic Box: Commercial Revenue Outcomes */}
              <GraphicCommercial />

              {/* Content Bottom */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9.5px] font-bold text-[#7C3AED] dark:text-[#A78BFA] bg-[#A78BFA]/15 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    COMMERCIAL IMPACT
                  </span>
                  <span className="text-[10.5px] font-mono font-bold text-zinc-400">01</span>
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-1.5 group-hover:text-[#7C3AED] dark:group-hover:text-[#A78BFA] transition-colors"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  Business-First Thinking
                </h3>
                <p
                  className="text-[13px] sm:text-[13.5px] text-zinc-600 dark:text-zinc-400 leading-relaxed"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  Strategy designed around commercial revenue outcomes rather than vanity traffic metrics.
                </p>
              </div>
            </div>

            {/* ── COLUMN 2: Technology & AI Know-How (Content Top, Graphic Bottom) ── */}
            <div className="reveal-card p-5 sm:p-6 lg:p-7 flex flex-col justify-between gap-6 group">
              {/* Content Top */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9.5px] font-bold text-[#7C3AED] dark:text-[#A78BFA] bg-[#A78BFA]/15 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    SCALABLE ARCHITECTURE
                  </span>
                  <span className="text-[10.5px] font-mono font-bold text-zinc-400">02</span>
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-1.5 group-hover:text-[#7C3AED] dark:group-hover:text-[#A78BFA] transition-colors"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  Technology & AI Know-How
                </h3>
                <p
                  className="text-[13px] sm:text-[13.5px] text-zinc-600 dark:text-zinc-400 leading-relaxed"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  Modern tech stack, AI workflows and scalable custom web engineering for future-proof growth.
                </p>
              </div>

              {/* Meaningful Graphic Box: AI & Tech Architecture Workflow */}
              <GraphicTechStack />
            </div>

            {/* ── COLUMN 3: Split Row (Data-Backed & ROI-Driven) ── */}
            <div className="reveal-card flex flex-col divide-y divide-zinc-200/80 dark:divide-zinc-800">
              
              {/* ── TOP ROW: Data-Backed Decisions ── */}
              <div className="p-5 sm:p-6 flex items-center gap-5 group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors flex-1">
                {/* Meaningful Graphic: Empirical Search & Data Analytics */}
                <GraphicDataSearch />

                {/* Right Text Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold text-[#7C3AED] dark:text-[#A78BFA] bg-[#A78BFA]/15 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      EMPIRICAL VALIDATION
                    </span>
                    <span className="text-[10px] font-mono font-bold text-zinc-400">03</span>
                  </div>
                  <h3
                    className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight mb-1 group-hover:text-[#7C3AED] dark:group-hover:text-[#A78BFA] transition-colors"
                    style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                  >
                    Data-Backed Decisions
                  </h3>
                  <p
                    className="text-[12.5px] text-zinc-600 dark:text-zinc-400 leading-snug"
                    style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                  >
                    Every choice is validated by empirical search, analytics, and user data.
                  </p>
                </div>
              </div>

              {/* ── BOTTOM ROW: ROI-Driven Approach ── */}
              <div className="p-5 sm:p-6 flex items-center gap-5 group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors flex-1">
                {/* Meaningful Graphic: ROI & Acquisition Metrics */}
                <GraphicROIMetrics />

                {/* Right Text Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold text-[#7C3AED] dark:text-[#A78BFA] bg-[#A78BFA]/15 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      MEASURABLE GROWTH
                    </span>
                    <span className="text-[10px] font-mono font-bold text-zinc-400">04</span>
                  </div>
                  <h3
                    className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight mb-1 group-hover:text-[#7C3AED] dark:group-hover:text-[#A78BFA] transition-colors"
                    style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                  >
                    ROI-Driven Approach
                  </h3>
                  <p
                    className="text-[12.5px] text-zinc-600 dark:text-zinc-400 leading-snug"
                    style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                  >
                    Transparent metrics focused on customer LTV, lower CAC, and rapid acquisition.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}


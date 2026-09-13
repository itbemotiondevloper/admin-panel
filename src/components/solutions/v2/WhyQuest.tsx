'use client';

import React, { useState } from 'react';
import { FadeReveal } from './RevealText';

// Line icons ─────────────────────────────────────────────────────────────
function IcoTarget() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function IcoCpu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  );
}
function IcoChart() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}
function IcoTrend() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function IcoRefresh() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

const PRINCIPLES = [
  {
    Icon: IcoTarget,
    title: 'Business-First Thinking',
    size: 'text-[32px] md:text-[38px]',
    layoutClass: 'lg:col-span-7 lg:pl-0',
    desc: 'Strategy designed around commercial revenue outcomes rather than vanity traffic metrics.',
  },
  {
    Icon: IcoCpu,
    title: 'Technology & AI Know-How',
    size: 'text-[24px] md:text-[28px]',
    layoutClass: 'lg:col-span-5 lg:pt-8 lg:pl-8',
    desc: 'Modern tech stack, AI workflows and scalable custom web engineering.',
  },
  {
    Icon: IcoChart,
    title: 'Data-Backed Decisions',
    size: 'text-[24px] md:text-[28px]',
    layoutClass: 'lg:col-span-5 lg:pr-8',
    desc: 'Every creative and strategic choice is validated by empirical search and user data.',
  },
  {
    Icon: IcoTrend,
    title: 'ROI-Driven Approach',
    size: 'text-[32px] md:text-[38px]',
    layoutClass: 'lg:col-span-7 lg:pl-4',
    desc: 'Transparent measurable metrics focused on customer lifetime value and acquisition.',
  },
  {
    Icon: IcoRefresh,
    title: 'Continuous Improvement',
    size: 'text-[22px] md:text-[25px]',
    layoutClass: 'lg:col-span-12 lg:text-center lg:mx-auto lg:max-w-xl lg:pt-6',
    desc: 'Post-launch optimisation cycles to ensure long-term market leadership.',
  },
];

export default function WhyQuest() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="why"
      className="w-full bg-[#F8F8F5] py-24 md:py-32 border-b border-[rgba(17,17,17,0.06)]"
      aria-label="Why Quest For Tech"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        
        {/* Editorial Section Header */}
        <FadeReveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-semibold text-[#999] uppercase tracking-[0.18em]">04</span>
              <span className="w-4 h-px bg-[#ccc]" />
              <span className="text-[10px] font-semibold text-[#999] uppercase tracking-[0.18em]">BUILT AROUND BUSINESS OUTCOMES</span>
            </div>
            <h2
              className="font-bold text-[#111] leading-[0.93] tracking-[-0.04em]"
              style={{
                fontSize: 'clamp(40px, 5vw, 84px)',
                fontFamily: 'var(--font-plus-jakarta-sans)',
              }}
            >
              More Than a<br />
              Service Provider.
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p
              className="text-[16px] text-[#676767] leading-relaxed max-w-md"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
            >
              Different capabilities. One business objective.
              We bring strategy, design and code together into an integrated growth engine.
            </p>
          </div>
        </FadeReveal>

        {/* Staggered Typographic Editorial Layout (Directive #6) */}
        <FadeReveal delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 gap-x-12 items-start">
            {PRINCIPLES.map((p, i) => {
              const Icon = p.Icon;
              const isHov = hoveredIdx === i;

              return (
                <div
                  key={p.title}
                  className={`flex flex-col gap-3 group cursor-default transition-all duration-300 ${p.layoutClass}`}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`transition-transform duration-300 ${isHov ? 'translate-x-1 text-[#4F6BFF]' : 'text-[#111]'}`}>
                      <Icon />
                    </div>
                    {/* Extending line micro-interaction */}
                    <div
                      className={`h-px bg-[#111] transition-all duration-500 ${
                        isHov ? 'w-12 bg-[#4F6BFF]' : 'w-4 bg-[rgba(17,17,17,0.15)]'
                      }`}
                    />
                  </div>

                  <h3
                    className={`font-bold leading-tight tracking-tight transition-all duration-300 ${p.size} ${
                      isHov ? 'text-[#111] translate-x-1' : 'text-[#222]'
                    }`}
                    style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                  >
                    {p.title}
                  </h3>

                  <p
                    className={`text-[14px] text-[#676767] leading-relaxed max-w-sm transition-opacity duration-300 ${
                      isHov ? 'opacity-100' : 'opacity-70'
                    }`}
                    style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                  >
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </FadeReveal>

      </div>
    </section>
  );
}


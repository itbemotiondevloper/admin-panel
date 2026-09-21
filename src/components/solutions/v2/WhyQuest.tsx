'use client';

import React, { useEffect, useRef } from 'react';
import { FadeReveal } from './RevealText';

function IcoTarget() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function IcoCpu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  );
}
function IcoChart() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}
function IcoTrend() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function IcoRefresh() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

const PRINCIPLES = [
  {
    num: '01',
    Icon: IcoTarget,
    title: 'Business-First Thinking',
    badge: 'COMMERCIAL IMPACT',
    desc: 'Strategy designed around commercial revenue outcomes rather than vanity traffic metrics.',
  },
  {
    num: '02',
    Icon: IcoCpu,
    title: 'Technology & AI Know-How',
    badge: 'SCALABLE ARCHITECTURE',
    desc: 'Modern tech stack, AI workflows and scalable custom web engineering for future-proof growth.',
  },
  {
    num: '03',
    Icon: IcoChart,
    title: 'Data-Backed Decisions',
    badge: 'EMPIRICAL VALIDATION',
    desc: 'Every creative and strategic choice is validated by empirical search, performance analytics, and user data.',
  },
  {
    num: '04',
    Icon: IcoTrend,
    title: 'ROI-Driven Approach',
    badge: 'MEASURABLE GROWTH',
    desc: 'Transparent measurable metrics focused on customer lifetime value, lower CAC, and rapid acquisition.',
  },
];

export default function WhyQuest() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!cardsRef.current) return;
      const items = cardsRef.current.querySelectorAll('.capability-card');
      if (!items || items.length === 0) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          items,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }, cardsRef);
    };

    run();
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="why"
      className="w-full bg-[#F8F8F5] py-10 lg:py-14 min-h-screen flex flex-col justify-center border-b border-[rgba(17,17,17,0.06)] overflow-hidden"
      aria-label="Why Quest For Tech"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 w-full">
        
        {/* Editorial Section Header */}
        <FadeReveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 lg:mb-8">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-semibold text-[#999] uppercase tracking-[0.18em]">04</span>
              <span className="w-4 h-px bg-[#ccc]" />
              <span className="text-[10px] font-semibold text-[#999] uppercase tracking-[0.18em]">BUILT AROUND BUSINESS OUTCOMES</span>
            </div>
            <h2
              className="font-bold text-[#111] leading-[0.95] tracking-[-0.04em]"
              style={{
                fontSize: 'clamp(32px, 3.8vw, 56px)',
                fontFamily: 'var(--font-plus-jakarta-sans)',
              }}
            >
              More Than a<br />
              Service Provider.
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p
              className="text-[14.5px] lg:text-[15.5px] text-[#555] leading-relaxed max-w-md"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
            >
              Different capabilities. One business objective.
              We bring strategy, design, and code together into an integrated growth engine designed to scale with you.
            </p>
          </div>
        </FadeReveal>

        {/* Structured Capability Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
          {PRINCIPLES.map((p) => {
            const Icon = p.Icon;
            return (
              <div
                key={p.title}
                className="capability-card group relative bg-white/90 backdrop-blur-sm border border-[rgba(17,17,17,0.07)] rounded-xl p-5 lg:p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F4F4F0] group-hover:bg-[#A78BFA] text-[#111] group-hover:text-black flex items-center justify-center transition-colors duration-300 shadow-inner">
                      <Icon />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9.5px] font-bold text-[#7C3AED] dark:text-[#A78BFA] bg-[#A78BFA]/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {p.badge}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-[#bbb] group-hover:text-[#111] transition-colors">
                        {p.num}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="text-[20px] lg:text-[22px] font-bold text-[#111] tracking-tight mb-2 group-hover:text-[#7C3AED] dark:group-hover:text-[#A78BFA] transition-colors"
                    style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                  >
                    {p.title}
                  </h3>

                  <p
                    className="text-[13.5px] text-[#666] leading-snug"
                    style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                  >
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Featured Highlight Card 05: Continuous Improvement */}
          <div className="capability-card lg:col-span-2 relative overflow-hidden bg-[#111] text-white rounded-xl p-5 lg:p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 group border border-white/10">
            {/* Background glow */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#A78BFA]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#A78BFA]/35 transition-all duration-700" />

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md text-[#60A5FA] flex items-center justify-center shrink-0 border border-white/15 shadow-inner">
                <IcoRefresh />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[9.5px] font-bold text-[#60A5FA] bg-[#60A5FA]/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    LONG-TERM PARTNERSHIP
                  </span>
                  <span className="text-[10.5px] font-mono font-semibold text-white/40">05</span>
                </div>
                <h3
                  className="text-[20px] lg:text-[22px] font-bold text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  Continuous Improvement & Optimisation
                </h3>
                <p
                  className="text-[13.5px] text-white/70 leading-snug max-w-2xl mt-0.5"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  Post-launch optimization cycles, structured A/B testing, and ongoing search data analysis to ensure your digital presence maintains sustainable market leadership.
                </p>
              </div>
            </div>

            <div className="relative z-10 shrink-0 self-start md:self-center">
              <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#A78BFA] text-white group-hover:text-black flex items-center justify-center transition-all duration-300 border border-white/20 group-hover:border-transparent shadow-md">
                <span className="text-[16px] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


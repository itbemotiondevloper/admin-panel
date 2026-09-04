'use client';

import React, { useEffect, useRef, useState } from 'react';
import SolutionChapter from './SolutionChapter';

const solutions = [
  {
    number: '01',
    id: 'website-development',
    title: 'Website Development',
    headline: 'Build a digital foundation that works for your business.',
    description:
      'We design and develop fast, responsive, user-focused websites built around your brand, audience, and business goals.',
    ctaText: 'Explore Website Development',
    href: '/solutions/website-development',
  },
  {
    number: '02',
    id: 'seo',
    title: 'SEO',
    headline: 'Get found by the right audience.',
    description:
      'We build data-backed and ethical SEO strategies to improve search visibility, attract relevant organic traffic, and create long-term growth.',
    ctaText: 'Explore SEO',
    href: '/solutions/seo',
  },
  {
    number: '03',
    id: 'content',
    title: 'Content',
    headline: 'Give your brand something worth saying.',
    description:
      'From website content and blogs to SEO and marketing content, we create purposeful content that helps your audience understand your business and take action.',
    ctaText: 'Explore Content',
    href: '/solutions/content',
  },
  {
    number: '04',
    id: 'performance-marketing',
    title: 'Performance Marketing',
    headline: 'Turn your marketing budget into measurable growth.',
    description:
      'We create, manage, and optimise paid campaigns around clear goals, meaningful KPIs, and better returns.',
    ctaText: 'Explore Performance Marketing',
    href: '/solutions/performance-marketing',
  },
  {
    number: '05',
    id: 'custom-development',
    title: 'Custom Development',
    headline: 'Build technology around the way your business works.',
    description:
      'From web applications and integrations to custom digital solutions, we build scalable and secure technology around your specific requirements.',
    ctaText: 'Explore Custom Development',
    href: '/solutions/custom-development',
  },
];

export default function SolutionsListSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        chapterRefs.current.forEach((el, index) => {
          if (!el) return;
          ScrollTrigger.create({
            trigger: el,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => setActiveChapterIndex(index),
            onEnterBack: () => setActiveChapterIndex(index),
          });
        });
      }, sectionRef);

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  const activeSol = solutions[activeChapterIndex] || solutions[0];

  return (
    <section ref={sectionRef} id="our-solutions" className="relative w-full bg-white dark:bg-black overflow-x-clip transition-colors duration-300">
      {/* ── Sticky Locked Section Header ── */}
      <div className="sticky top-20 z-30 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-slate-200 dark:border-[#D6DCDC]/10 py-5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="inline-block w-5 h-px bg-slate-400 dark:bg-[#D6DCDC]/40" />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-[#D6DCDC]/60"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                Our Solutions
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-normal text-slate-900 dark:text-[#D6DCDC] leading-tight tracking-tight"
              style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
            >
              Five services. One connected digital strategy.
            </h2>
          </div>

          {/* Active Solution Counter Pill */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full border border-slate-200 dark:border-[#D6DCDC]/15 bg-slate-100/90 dark:bg-[#0E0E0E]/90 backdrop-blur-md shrink-0">
            <span className="w-2 h-2 rounded-full bg-slate-900 dark:bg-[#C1B6FF] qft-pulse-glow" style={{ boxShadow: '0 0 8px rgba(0,0,0,0.2)' }} />
            <span
              className="text-xs font-semibold text-slate-700 dark:text-[#D6DCDC]"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              {activeSol.number} / 05 — <span className="text-slate-900 dark:text-[#C1B6FF]">{activeSol.title}</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Scrolling Solution Chapters ── */}
      <div className="space-y-4 pt-4">
        {solutions.map((sol, i) => (
          <div key={sol.id} ref={(el) => { chapterRefs.current[i] = el; }}>
            <SolutionChapter
              {...sol}
              reversed={i % 2 !== 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}


'use client';

import React from 'react';

const points = [
  {
    title: 'Business-First Thinking',
    description: 'We start with your goals, not a predefined package.',
    accent: '#C1B6FF',
  },
  {
    title: 'Technology & AI Know-How',
    description: 'We use modern technology and AI where they can genuinely improve the work.',
    accent: '#A78BFA',
  },
  {
    title: 'Data-Backed Decisions',
    description: 'We use data to understand performance and make better decisions.',
    accent: '#D6DCDC',
  },
  {
    title: 'ROI-Driven Thinking',
    description: 'We focus on outcomes that create real business value, not vanity metrics.',
    accent: '#818CF8',
  },
  {
    title: 'Continuous Improvement',
    description: 'We keep learning, testing, and looking for better ways forward.',
    accent: '#E2E8F0',
  },
];

export default function WhyQuestForTechSection() {
  return (
    <section className="relative w-full bg-white dark:bg-black overflow-hidden transition-colors duration-300">
      {/* Right side glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[350px] h-[500px] opacity-08"
        style={{
          background: 'radial-gradient(ellipse at 90% 50%, #C1B6FF 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="w-full h-px bg-slate-200 dark:bg-transparent"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(214,220,220,0.07), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 md:mb-28">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-5 h-px bg-slate-400 dark:bg-[#D6DCDC]/40" />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-[#D6DCDC]/50"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                Why Quest For Tech
              </span>
            </div>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.1] tracking-tight text-slate-900 dark:text-[#D6DCDC]"
              style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
            >
              Built around outcomes, not outputs.
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p
              className="text-base sm:text-lg text-slate-600 dark:text-[#D6DCDC]/50 leading-relaxed"
              style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
            >
              We don't measure success by deliverable checklists. We measure success by the impact we create for your business.
            </p>
          </div>
        </div>

        {/* Grid of 5 Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((p, i) => (
            <div
              key={p.title}
              className={`rounded-3xl p-8 sm:p-10 transition-all duration-300 bg-slate-50 dark:bg-[#0B0B0B] border border-slate-200 dark:border-[#D6DCDC]/10 hover:border-slate-300 dark:hover:border-[#D6DCDC]/30 hover:shadow-lg ${
                i === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-8">
                <span
                  className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ fontFamily: 'Barlow, sans-serif', color: p.accent }}
                >
                  0{i + 1}
                </span>
                <span className="w-2 h-2 rounded-full" style={{ background: p.accent, opacity: 0.6 }} />
              </div>

              <h3
                className="text-xl sm:text-2xl font-normal text-slate-900 dark:text-[#D6DCDC] mb-3"
                style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
              >
                {p.title}
              </h3>

              <p
                className="text-sm sm:text-base text-slate-600 dark:text-[#D6DCDC]/50 leading-relaxed"
                style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
              >
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

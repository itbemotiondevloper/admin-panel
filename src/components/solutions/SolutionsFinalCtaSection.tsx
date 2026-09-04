'use client';

import React from 'react';
import Link from 'next/link';

function CtaAbstractVisual() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Primary ambient radial glow — subtle lavender indigo */}
      <div
        className="qft-float-slow absolute -right-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #818CF8 0%, #C1B6FF 40%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />
      {/* Inner sharp orb */}
      <div
        className="qft-float absolute right-10 lg:right-24 top-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full"
        style={{
          background: 'radial-gradient(circle at 38% 38%, #C1B6FF 0%, #312E81 50%, #0F172A 100%)',
          filter: 'blur(20px)',
          opacity: 0.4,
          animationDelay: '1.5s',
        }}
      />

      {/* Glowing ring */}
      <div
        className="qft-rotate-slow absolute right-[15%] lg:right-[22%] top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full"
        style={{ border: '1px solid rgba(193,182,255,0.12)' }}
      />

      {/* Glowing dots */}
      <div
        className="absolute right-[28%] top-[25%] w-2 h-2 rounded-full qft-pulse-glow"
        style={{ background: '#C1B6FF', boxShadow: '0 0 10px #C1B6FF' }}
      />
      <div
        className="absolute right-[18%] bottom-[30%] w-1.5 h-1.5 rounded-full qft-pulse-glow"
        style={{ background: '#818CF8', boxShadow: '0 0 8px #818CF8', animationDelay: '1.2s' }}
      />
    </div>
  );
}

export default function SolutionsFinalCtaSection() {
  return (
    <section className="relative w-full bg-white dark:bg-black overflow-hidden transition-colors duration-300">
      <div
        className="w-full h-px bg-slate-200 dark:bg-transparent"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(214,220,220,0.07), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-20">
        {/* Full-panel gradient container */}
        <div
          className="relative overflow-hidden rounded-[36px] min-h-[70vh] flex items-center bg-slate-900 text-white dark:bg-gradient-to-br dark:from-[#0A0A0A] dark:via-[#111116] dark:to-[#07070A] border border-slate-800 dark:border-[#D6DCDC]/10 shadow-2xl"
        >
          {/* Top hairline gradient */}
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, #C1B6FF, transparent)' }}
          />

          {/* Abstract visual */}
          <CtaAbstractVisual />

          {/* Content */}
          <div className="relative z-10 max-w-xl px-8 sm:px-12 md:px-16 lg:px-20 py-16 lg:py-0">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-block w-5 h-px bg-white/40 dark:bg-[#D6DCDC]/40" />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70 dark:text-[#D6DCDC]/50"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                Ready to Start?
              </span>
            </div>

            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-normal leading-[1.06] tracking-tight text-white dark:text-[#D6DCDC] mb-6"
              style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
            >
              Not Sure What{' '}
              <br className="hidden sm:inline" />
              You Need?
            </h2>

            <p
              className="text-base sm:text-lg md:text-xl font-normal text-white/80 dark:text-[#D6DCDC]/58 leading-relaxed mb-10 max-w-lg"
              style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
            >
              You don't need to have everything figured out before you talk to us. Tell us what
              you're trying to achieve, what's not working, or where you want to go next. We'll
              help you understand the opportunity and identify the right way forward.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-widest transition-all duration-200 bg-white text-slate-900 hover:bg-slate-100 dark:bg-[#D6DCDC] dark:text-black dark:hover:bg-white cursor-pointer hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                style={{
                  fontFamily: 'Barlow, sans-serif',
                  letterSpacing: '0.1em',
                }}
              >
                BOOK A DISCOVERY CALL →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

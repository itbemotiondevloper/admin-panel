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
    <section className="relative w-full bg-white dark:bg-black overflow-hidden py-16 md:py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Modern clean container */}
        <div
          className="relative overflow-hidden rounded-[32px] p-8 sm:p-12 lg:p-16 bg-slate-900 text-white dark:bg-[#0B0B0B] dark:border dark:border-[#D6DCDC]/15 shadow-2xl transition-all duration-300"
        >
          {/* Subtle background glow */}
          <div
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-15"
            style={{
              background: 'radial-gradient(ellipse at 80% 50%, #A78BFA 0%, transparent 65%)',
              filter: 'blur(90px)',
            }}
          />

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-5 h-px bg-[#A78BFA]" />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A78BFA]"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                Ready to Start?
              </span>
            </div>

            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-white dark:text-[#D6DCDC] mb-6"
              style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
            >
              Not Sure What You Need?
            </h2>

            <p
              className="text-base sm:text-lg font-normal text-slate-300 dark:text-[#D6DCDC]/60 leading-relaxed mb-10"
              style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
            >
              You don't need to have everything figured out before you talk to us. Tell us what
              you're trying to achieve, what's not working, or where you want to go next. We'll
              help you understand the opportunity and identify the right way forward.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-widest transition-all duration-200 bg-[#A78BFA] text-black hover:bg-[#B89FFF] cursor-pointer hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#A78BFA]/25"
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

'use client';

import React, { useEffect, useRef } from 'react';

// ── Live Interactive Graphic 1: Commercial Revenue Outcomes ──
function GraphicCommercial() {
  return (
    <div className="relative w-full h-52 sm:h-60 rounded-3xl bg-zinc-950 p-5 sm:p-6 flex flex-col justify-between overflow-hidden border border-zinc-800/80 shadow-2xl group/card">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#7C3AED]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Sweeping Laser Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent animate-scanline" />
      </div>

      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[11.5px] font-bold text-white border border-white/10 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>Commercial Impact</span>
        </div>
        <div className="flex items-center gap-1 bg-[#A78BFA]/15 border border-[#A78BFA]/30 px-3 py-1 rounded-full">
          <span className="text-[11px] font-mono font-bold text-[#A78BFA]">Target +140%</span>
        </div>
      </div>

      {/* Live Animated Revenue Growth Chart & Area Wave */}
      <div className="relative w-full h-24 sm:h-28 flex items-end justify-between px-2 z-10 pt-2">
        {/* Animated SVG Live Curve overlay */}
        <svg className="absolute inset-x-0 bottom-7 w-full h-16 pointer-events-none overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
          <defs>
            <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 50 Q 50 42, 100 28 T 200 8 L 200 60 L 0 60 Z"
            fill="url(#areaGrad)"
            className="animate-wave-pulse"
          />
          <path
            d="M 0 50 Q 50 42, 100 28 T 200 8"
            fill="none"
            stroke="url(#curveGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-draw-line"
          />
          {/* Target Peak Beacon */}
          <circle cx="200" cy="8" r="5" fill="#A78BFA" className="animate-ping origin-center" />
          <circle cx="200" cy="8" r="3.5" fill="#FFFFFF" />
        </svg>

        {/* Dynamic Growth Bars */}
        {[
          { label: 'Q1', val: 32, delay: '0s' },
          { label: 'Q2', val: 52, delay: '0.2s' },
          { label: 'Q3', val: 78, delay: '0.4s' },
          { label: 'Q4', val: 100, delay: '0.6s', active: true },
        ].map((bar, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 z-10">
            <div className="w-full max-w-[42px] h-20 bg-zinc-900/80 rounded-t-lg p-0.5 flex flex-col justify-end overflow-hidden">
              <div
                className={`w-full rounded-t-md transition-all duration-1000 ${
                  bar.active
                    ? 'bg-gradient-to-t from-[#7C3AED] to-[#A78BFA] shadow-[0_0_18px_rgba(167,139,250,0.7)] animate-pulse'
                    : 'bg-zinc-800 group-hover/card:bg-zinc-700'
                }`}
                style={{
                  height: `${bar.val}%`,
                  animationDelay: bar.delay,
                }}
              />
            </div>
            <span className="text-[10.5px] font-mono font-medium text-zinc-400">{bar.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom Live Metric Footer */}
      <div className="flex items-center justify-between text-[11.5px] text-zinc-300 font-medium z-10 pt-2 border-t border-zinc-800/80">
        <span className="text-zinc-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Outcome-Driven
        </span>
        <span className="text-[#A78BFA] font-mono font-bold">
          Revenue &gt; Vanity Traffic
        </span>
      </div>
    </div>
  );
}

// ── Live Interactive Graphic 2: AI & Tech Architecture Workflow ──
function GraphicTechStack() {
  return (
    <div className="relative w-full h-52 sm:h-60 rounded-3xl bg-zinc-950 p-5 sm:p-6 flex flex-col items-center justify-center overflow-hidden border border-zinc-800/80 shadow-2xl group/card">
      {/* Ambient Pulsing Core Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#7C3AED]/18 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Connected Nodes with Live Traveling Energy Particles */}
      <div className="relative w-full max-w-[320px] flex items-center justify-between z-10">
        {/* Node 1: AI Workflow */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-zinc-900 border border-[#A78BFA]/50 text-[#A78BFA] flex items-center justify-center text-sm font-bold shadow-lg relative group-hover/card:border-[#A78BFA] transition-colors">
            <span className="relative z-10">AI</span>
            <div className="absolute inset-0 rounded-2xl bg-[#A78BFA]/10 animate-ping pointer-events-none" />
          </div>
          <span className="text-[10.5px] font-mono text-zinc-400">Workflows</span>
        </div>

        {/* Live Traveling Particle Track 1 */}
        <div className="flex-1 h-0.5 bg-zinc-800 mx-3 relative overflow-visible">
          <div className="absolute inset-0 bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] opacity-50" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#A78BFA] shadow-[0_0_10px_#A78BFA] absolute -top-[4px] animate-packet-flow-1" />
        </div>

        {/* Node 2: Core Tech Stack Hub */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-15 h-15 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA] text-white flex items-center justify-center shadow-[0_0_28px_rgba(167,139,250,0.55)] transform transition-transform group-hover/card:scale-105 duration-300">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin-slow">
              <rect x="9" y="9" width="6" height="6" rx="1" />
              <rect x="2" y="2" width="20" height="20" rx="3" />
            </svg>
          </div>
          <span className="text-[11px] font-mono text-white font-bold tracking-tight">Tech Stack</span>
        </div>

        {/* Live Traveling Particle Track 2 */}
        <div className="flex-1 h-0.5 bg-zinc-800 mx-3 relative overflow-visible">
          <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] opacity-50" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#A78BFA] shadow-[0_0_10px_#A78BFA] absolute -top-[4px] animate-packet-flow-2" />
        </div>

        {/* Node 3: Scalable Web */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-zinc-900 border border-zinc-700 text-zinc-100 flex items-center justify-center text-sm font-bold shadow-lg group-hover/card:border-[#A78BFA]/60 transition-colors">
            &lt;/&gt;
          </div>
          <span className="text-[10.5px] font-mono text-zinc-400">Scale</span>
        </div>
      </div>

      {/* Interactive Tech Badge Pills */}
      <div className="mt-5 flex items-center gap-2.5 z-10">
        {[
          { name: 'Next.js', live: true },
          { name: 'AI Agents', live: true },
          { name: 'Scalable', live: false },
        ].map((tag) => (
          <span
            key={tag.name}
            className="text-[10px] sm:text-[10.5px] font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-full text-zinc-300 flex items-center gap-1.5 hover:border-[#A78BFA]/50 transition-colors"
          >
            {tag.live && <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-pulse" />}
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Live Interactive Graphic 3: Search & Empirical Data Validation ──
function GraphicDataSearch() {
  return (
    <div className="relative w-36 h-36 sm:w-40 sm:h-40 shrink-0 rounded-3xl bg-zinc-950 p-4 flex flex-col justify-between overflow-hidden border border-zinc-800/80 shadow-2xl group/card">
      {/* Background Radar Grid Sweep */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(167,139,250,0.14)_1px,transparent_1px)] [background-size:14px_14px] opacity-40" />

      <div className="flex items-center justify-between z-10">
        <span className="text-[10.5px] font-mono font-bold text-[#A78BFA] bg-[#A78BFA]/15 px-2.5 py-0.5 rounded-full border border-[#A78BFA]/30">
          SEO #1
        </span>
        <span className="text-[10.5px] font-mono text-emerald-400 font-bold flex items-center gap-0.5">
          ↑ +84%
        </span>
      </div>

      {/* Live Oscillating Waveform */}
      <div className="relative w-full h-14 z-10 flex items-center">
        <svg className="w-full h-full text-[#A78BFA]" viewBox="0 0 100 40" fill="none">
          <defs>
            <linearGradient id="waveLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
          <path
            d="M 0 32 Q 25 35, 50 15 T 100 6"
            stroke="url(#waveLine)"
            strokeWidth="2.8"
            strokeLinecap="round"
            className="animate-wave-flow"
          />
          <circle cx="50" cy="15" r="4" fill="#A78BFA" className="animate-ping origin-center" />
          <circle cx="50" cy="15" r="2.5" fill="#FFFFFF" />
          <circle cx="100" cy="6" r="4" fill="#A78BFA" />
        </svg>
      </div>

      <span className="text-[10px] font-mono text-zinc-400 tracking-tight z-10 truncate flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Empirical Analytics
      </span>
    </div>
  );
}

// ── Live Interactive Graphic 4: ROI & Acquisition Metrics ──
function GraphicROIMetrics() {
  return (
    <div className="relative w-36 h-36 sm:w-40 sm:h-40 shrink-0 rounded-3xl bg-zinc-950 p-4 flex flex-col justify-between overflow-hidden border border-zinc-800/80 shadow-2xl group/card">
      <div className="flex items-center justify-between text-white z-10">
        <span className="text-[10.5px] font-bold text-zinc-300">Metrics</span>
        <span className="text-[10px] font-mono text-[#A78BFA] font-bold bg-[#A78BFA]/15 px-2.5 py-0.5 rounded-full border border-[#A78BFA]/20">
          ROI 3.8x
        </span>
      </div>

      {/* Live Animated Metric Bars */}
      <div className="space-y-2 my-0.5 z-10">
        <div className="bg-white/10 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[10px] border border-white/5">
          <span className="text-zinc-400 font-mono">CAC</span>
          <span className="text-emerald-400 font-bold font-mono">↓ 35%</span>
        </div>
        <div className="bg-white/10 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[10px] border border-white/5">
          <span className="text-zinc-400 font-mono">LTV</span>
          <span className="text-[#A78BFA] font-bold font-mono">↑ 2.4x</span>
        </div>
      </div>

      <span className="text-[10px] font-mono text-zinc-400 truncate z-10 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-pulse" />
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
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
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
      className="w-full bg-white dark:bg-[#0D0D0E] py-24 md:py-32 lg:py-36 border-b border-zinc-200/70 dark:border-zinc-800/80 overflow-hidden"
      aria-label="Why Quest For Tech"
    >
      {/* Keyframe Animations for Live Superconscious-style interactive motion */}
      <style>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(4000%);
          }
        }
        @keyframes packetFlow1 {
          0% {
            left: 0%;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
        @keyframes packetFlow2 {
          0% {
            left: 0%;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
        @keyframes spinSlow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes wavePulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.95;
          }
        }
        .animate-scanline {
          animation: scanline 4s linear infinite;
        }
        .animate-packet-flow-1 {
          animation: packetFlow1 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-packet-flow-2 {
          animation: packetFlow2 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite 1.1s;
        }
        .animate-spin-slow {
          animation: spinSlow 18s linear infinite;
        }
        .animate-wave-pulse {
          animation: wavePulse 3s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 w-full">
        {/* ── Seamless 3-Column Layout without Outer Box ── */}
        <div
          ref={containerRef}
          className="w-full grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-start"
        >
          {/* ── COLUMN 1: Business-First Thinking (Graphic Top, Content Bottom) ── */}
          <div className="reveal-card flex flex-col justify-between gap-7 group">
            <GraphicCommercial />
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="text-[10px] font-bold text-[#7C3AED] dark:text-[#A78BFA] bg-[#A78BFA]/15 px-3 py-1 rounded-full uppercase tracking-wider">
                  COMMERCIAL IMPACT
                </span>
                <span className="text-[11px] font-mono font-bold text-zinc-400">01</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight mb-2.5 group-hover:text-[#7C3AED] dark:group-hover:text-[#A78BFA] transition-colors"
                style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
              >
                Business-First Thinking
              </h3>
              <p
                className="text-[15px] sm:text-[15.5px] text-zinc-600 dark:text-zinc-400 leading-relaxed"
                style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
              >
                Strategy designed around commercial revenue outcomes rather than vanity traffic metrics.
              </p>
            </div>
          </div>

          {/* ── COLUMN 2: Technology & AI Know-How (Content Top, Graphic Bottom) ── */}
          <div className="reveal-card flex flex-col justify-between gap-7 group">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="text-[10px] font-bold text-[#7C3AED] dark:text-[#A78BFA] bg-[#A78BFA]/15 px-3 py-1 rounded-full uppercase tracking-wider">
                  SCALABLE ARCHITECTURE
                </span>
                <span className="text-[11px] font-mono font-bold text-zinc-400">02</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight mb-2.5 group-hover:text-[#7C3AED] dark:group-hover:text-[#A78BFA] transition-colors"
                style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
              >
                Technology & AI Know-How
              </h3>
              <p
                className="text-[15px] sm:text-[15.5px] text-zinc-600 dark:text-zinc-400 leading-relaxed"
                style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
              >
                Modern tech stack, AI workflows and scalable custom web engineering for future-proof growth.
              </p>
            </div>
            <GraphicTechStack />
          </div>

          {/* ── COLUMN 3: Split Rows (Data-Backed & ROI-Driven) ── */}
          <div className="reveal-card flex flex-col gap-8 lg:gap-10">
            {/* Top Row: Data-Backed Decisions */}
            <div className="flex items-center gap-6 group">
              <GraphicDataSearch />
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-[9.5px] font-bold text-[#7C3AED] dark:text-[#A78BFA] bg-[#A78BFA]/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    EMPIRICAL VALIDATION
                  </span>
                  <span className="text-[10.5px] font-mono font-bold text-zinc-400">03</span>
                </div>
                <h3
                  className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight mb-1.5 group-hover:text-[#7C3AED] dark:group-hover:text-[#A78BFA] transition-colors"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  Data-Backed Decisions
                </h3>
                <p
                  className="text-[14px] text-zinc-600 dark:text-zinc-400 leading-snug"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  Every choice is validated by empirical search, analytics, and user data.
                </p>
              </div>
            </div>

            {/* Bottom Row: ROI-Driven Approach */}
            <div className="flex items-center gap-6 group pt-8 border-t border-zinc-200/70 dark:border-zinc-800/80">
              <GraphicROIMetrics />
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-[9.5px] font-bold text-[#7C3AED] dark:text-[#A78BFA] bg-[#A78BFA]/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    MEASURABLE GROWTH
                  </span>
                  <span className="text-[10.5px] font-mono font-bold text-zinc-400">04</span>
                </div>
                <h3
                  className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight mb-1.5 group-hover:text-[#7C3AED] dark:group-hover:text-[#A78BFA] transition-colors"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  ROI-Driven Approach
                </h3>
                <p
                  className="text-[14px] text-zinc-600 dark:text-zinc-400 leading-snug"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  Transparent metrics focused on customer LTV, lower CAC, and rapid acquisition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


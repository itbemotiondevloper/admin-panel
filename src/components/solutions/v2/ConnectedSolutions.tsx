'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FadeReveal } from './RevealText';

// ── Node icons ─────────────────────────────────────────────────────────────
function IconWeb() {
  return (
    <div className="w-10 h-10 rounded-xl bg-[#FFF8E1] flex items-center justify-center shadow-xs border border-[#F59E0B]/20">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    </div>
  );
}
function IconSeo() {
  return (
    <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center shadow-xs border border-[#A78BFA]/30">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </div>
  );
}
function IconContent() {
  return (
    <div className="w-10 h-10 rounded-xl bg-[#FFF0F0] flex items-center justify-center shadow-xs border border-[#EF4444]/20">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    </div>
  );
}
function IconPerf() {
  return (
    <div className="w-10 h-10 rounded-xl bg-[#FFF0F9] flex items-center justify-center shadow-xs border border-[#EC4899]/20">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10M18 20V4M6 20v-4" />
      </svg>
    </div>
  );
}
function IconDev() {
  return (
    <div className="w-10 h-10 rounded-xl bg-[#F0FFF4] flex items-center justify-center shadow-xs border border-[#10B981]/20">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    </div>
  );
}

// Capabilities list with capability label & 1-line description
const NODES = [
  {
    id: 'website',
    label: 'Website\nDevelopment',
    capability: 'Experience',
    desc: 'High-conversion responsive web platforms.',
    Icon: IconWeb,
    cx: 50,
    cy: 10,
    orbit: 1,
  },
  {
    id: 'seo',
    label: 'SEO',
    capability: 'Visibility',
    desc: 'Organic search dominance and domain authority.',
    Icon: IconSeo,
    cx: 12,
    cy: 42,
    orbit: 2,
  },
  {
    id: 'content',
    label: 'Content',
    capability: 'Communication',
    desc: 'Editorial copy that engages and converts.',
    Icon: IconContent,
    cx: 88,
    cy: 42,
    orbit: 1,
  },
  {
    id: 'performance',
    label: 'Performance\nMarketing',
    capability: 'Acquisition',
    desc: 'Data-driven paid campaign acceleration.',
    Icon: IconPerf,
    cx: 22,
    cy: 82,
    orbit: 3,
  },
  {
    id: 'custom',
    label: 'Custom\nDevelopment',
    capability: 'Systems',
    desc: 'Bespoke web apps, AI integrations and backends.',
    Icon: IconDev,
    cx: 78,
    cy: 82,
    orbit: 2,
  },
];

// Interactive Goal Modes mapping
const GOAL_MODES = [
  {
    id: 'visibility',
    label: 'Need More Visibility',
    activeNodes: ['website', 'seo', 'content'],
  },
  {
    id: 'leads',
    label: 'Need More Qualified Leads',
    activeNodes: ['website', 'seo', 'content', 'performance'],
  },
  {
    id: 'launch',
    label: 'Launching Something New',
    activeNodes: ['website', 'seo', 'content', 'performance'],
  },
  {
    id: 'custom',
    label: 'Need a Custom Solution',
    activeNodes: ['custom'],
  },
];

export default function ConnectedSolutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitGroupRef = useRef<SVGGElement>(null);
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  // Scroll entry animation for orbit paths & rotation
  useEffect(() => {
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !orbitGroupRef.current) return;

      // Rotate orbit group subtly on scroll
      gsap.to(orbitGroupRef.current, {
        rotate: 6,
        transformOrigin: '200px 200px',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom top',
          scrub: 1,
        },
      });
    };

    run();
  }, []);

  // Determine highlighted nodes based on hover OR selected goal mode
  const getIsNodeHighlighted = (id: string) => {
    if (activeHoverId) return activeHoverId === id;
    if (selectedGoalId) {
      const mode = GOAL_MODES.find((g) => g.id === selectedGoalId);
      return mode ? mode.activeNodes.includes(id) : true;
    }
    return true; // Default state: all active
  };

  const activeNodeObj = NODES.find((n) => n.id === activeHoverId);

  return (
    <section
      ref={sectionRef}
      id="connected"
      className="w-full bg-[#F8F8F5] py-24 md:py-32 border-b border-[rgba(17,17,17,0.06)]"
      aria-label="Solutions That Work Together"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* LEFT: Text & Goal Modes */}
          <div className="lg:col-span-6 flex flex-col">
            <FadeReveal>

              <h2
                className="font-bold text-[#111] leading-[0.93] tracking-[-0.04em] mb-6"
                style={{
                  fontSize: 'clamp(40px, 4.8vw, 76px)',
                  fontFamily: 'var(--font-plus-jakarta-sans)',
                }}
              >
                A More Connected<br />
                Way to Grow.
              </h2>
              <p
                className="text-[15.5px] text-[#676767] leading-relaxed mb-8 max-w-md"
                style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
              >
                Your website, content, SEO, advertising and custom systems work best when they're aligned.
                We combine the right capabilities to solve real business outcomes.
              </p>
            </FadeReveal>

            {/* Interactive Goal Mode Selectors */}
            <FadeReveal delay={0.15}>
              <div className="mb-8 pt-4 border-t border-[rgba(17,17,17,0.08)]">
                <span className="text-[10px] font-semibold text-[#999] uppercase tracking-[0.18em] block mb-4">
                  WHAT IS YOUR IMMEDIATE BUSINESS GOAL?
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {GOAL_MODES.map((g) => {
                    const isSel = selectedGoalId === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setSelectedGoalId(isSel ? null : g.id)}
                        className={`text-[12px] font-semibold px-4 py-2 rounded-full border transition-all duration-300 ${
                          isSel
                            ? 'bg-[#111] text-white border-[#111] shadow-xs'
                            : 'bg-white/80 text-[#555] border-[rgba(17,17,17,0.12)] hover:border-[#111] hover:text-[#111]'
                        }`}
                        style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                      >
                        {g.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </FadeReveal>

            <FadeReveal delay={0.25}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#111] text-white text-[13px] font-semibold rounded-full px-7 py-3.5 hover:bg-[#222] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
              >
                Let&apos;s Build Your Custom Stack →
              </Link>
            </FadeReveal>
          </div>

          {/* RIGHT: Multi-Orbit Layered System Diagram */}
          <FadeReveal delay={0.15} className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square">
              <svg
                viewBox="0 0 400 400"
                className="absolute inset-0 w-full h-full"
                fill="none"
                aria-hidden
              >
                <g ref={orbitGroupRef}>
                  {/* Layered Orbit Ellipse 1 (Horizontal main) */}
                  <ellipse
                    cx="200" cy="200" rx="160" ry="110"
                    stroke="rgba(17,17,17,0.09)"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                  />
                  {/* Layered Orbit Ellipse 2 (Angled -20deg) */}
                  <ellipse
                    cx="200" cy="200" rx="150" ry="120"
                    transform="rotate(-20 200 200)"
                    stroke="rgba(17,17,17,0.07)"
                    strokeWidth="1"
                    strokeDasharray="3 7"
                  />
                  {/* Layered Orbit Ellipse 3 (Angled +25deg) */}
                  <ellipse
                    cx="200" cy="200" rx="165" ry="95"
                    transform="rotate(25 200 200)"
                    stroke="rgba(17,17,17,0.06)"
                    strokeWidth="1"
                  />
                </g>

                {/* Connecting lines from centre Q to each node */}
                {NODES.map((n) => {
                  const x = (n.cx / 100) * 400;
                  const y = (n.cy / 100) * 400;
                  const isHighlighted = getIsNodeHighlighted(n.id);
                  return (
                    <line
                      key={`line-${n.id}`}
                      x1="200" y1="200"
                      x2={x} y2={y}
                      stroke={isHighlighted ? '#111' : 'rgba(17,17,17,0.06)'}
                      strokeWidth={isHighlighted ? 1.5 : 0.8}
                      strokeDasharray={isHighlighted ? 'none' : '2 4'}
                      className="transition-all duration-400"
                    />
                  );
                })}
              </svg>

              {/* Central Core "Q" with Dynamic Micro-Label */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#111] text-white flex items-center justify-center shadow-xl border-2 border-white transition-transform duration-300 hover:scale-105">
                  <span
                    className="text-[20px] font-bold"
                    style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                  >
                    Q
                  </span>
                </div>
                {/* Dynamic capability label badge under Q */}
                <div className="mt-2 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-[rgba(17,17,17,0.10)] transition-all duration-300">
                  <span className="text-[10px] font-bold text-[#111] uppercase tracking-wider">
                    {activeNodeObj ? activeNodeObj.capability : 'SYSTEM INTEGRATION'}
                  </span>
                </div>
              </div>

              {/* Node Icons & Interactive Hotspots */}
              {NODES.map((n) => {
                const Icon = n.Icon;
                const isHighlighted = getIsNodeHighlighted(n.id);
                const style: React.CSSProperties = {
                  position: 'absolute',
                  left: `${n.cx}%`,
                  top: `${n.cy}%`,
                  transform: 'translate(-50%, -50%)',
                };

                return (
                  <div
                    key={n.id}
                    style={style}
                    className={`flex flex-col items-center gap-1.5 cursor-pointer z-30 transition-all duration-300 ${
                      isHighlighted ? 'opacity-100 scale-105' : 'opacity-30 scale-95'
                    }`}
                    onMouseEnter={() => setActiveHoverId(n.id)}
                    onMouseLeave={() => setActiveHoverId(null)}
                  >
                    <Icon />
                    <span
                      className="text-[10.5px] font-bold text-[#111] text-center whitespace-pre-line leading-tight"
                      style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                    >
                      {n.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Micro-description output under ecosystem (Directive #4) */}
            <div className="h-10 mt-6 text-center max-w-xs">
              {activeNodeObj ? (
                <p
                  className="text-[12px] font-medium text-[#7C3AED] dark:text-[#A78BFA] transition-opacity duration-300"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  {activeNodeObj.desc}
                </p>
              ) : (
                <p className="text-[11px] text-[#999] italic" style={{ fontFamily: 'Georgia, serif' }}>
                  Hover any capability to see its role in the ecosystem.
                </p>
              )}
            </div>
          </FadeReveal>

        </div>
      </div>
    </section>
  );
}


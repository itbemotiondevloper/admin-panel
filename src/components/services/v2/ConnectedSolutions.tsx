'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FadeReveal } from './RevealText';

// ── Node icons (Clean minimal, no background box) ───────────────────────────
function IconWeb() {
  return (
    <div className="w-9 h-9 flex items-center justify-center">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    </div>
  );
}
function IconSeo() {
  return (
    <div className="w-9 h-9 flex items-center justify-center">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </div>
  );
}
function IconContent() {
  return (
    <div className="w-9 h-9 flex items-center justify-center">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
    <div className="w-9 h-9 flex items-center justify-center">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10M18 20V4M6 20v-4" />
      </svg>
    </div>
  );
}
function IconDev() {
  return (
    <div className="w-9 h-9 flex items-center justify-center">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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

export default function ConnectedSolutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  // Determine highlighted nodes based on hover
  const getIsNodeHighlighted = (id: string) => {
    if (activeHoverId) return activeHoverId === id;
    return true; // Default state: all active
  };

  const activeNodeObj = NODES.find((n) => n.id === activeHoverId);

  return (
    <section
      ref={sectionRef}
      id="connected"
      className="w-full bg-white py-24 md:py-32 border-b border-[rgba(17,17,17,0.06)] overflow-hidden"
      aria-label="Solutions That Work Together"
    >
      {/* Pure CSS Continuous Orbit Rotation Keyframes */}
      <style>{`
        @keyframes orbitRevolveCw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes orbitRevolveCcw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        .orbit-spin-cw-1 {
          transform-origin: 200px 200px;
          animation: orbitRevolveCw 40s linear infinite;
        }
        .orbit-spin-ccw-2 {
          transform-origin: 200px 200px;
          animation: orbitRevolveCcw 55s linear infinite;
        }
        .orbit-spin-cw-3 {
          transform-origin: 200px 200px;
          animation: orbitRevolveCw 75s linear infinite;
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* LEFT: Text & CTA */}
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
                Your website, content, SEO, advertising and custom systems work best when they&apos;re aligned.
                We combine the right capabilities to solve real business outcomes.
              </p>
            </FadeReveal>

            <FadeReveal delay={0.15}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#111] text-white text-[13px] font-semibold rounded-full px-7 py-3.5 hover:bg-[#222] transition-colors duration-200 w-fit"
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
                className="absolute inset-0 w-full h-full pointer-events-none"
                fill="none"
                aria-hidden
              >
                {/* Smooth Concentric Revolving Orbits with Micro-Planets */}
                <g className="orbit-spin-cw-1">
                  <circle
                    cx="200"
                    cy="200"
                    r="85"
                    stroke="rgba(17,17,17,0.11)"
                    strokeWidth="1.2"
                    strokeDasharray="4 6"
                  />
                  <circle cx="200" cy="115" r="2.5" fill="rgba(17,17,17,0.35)" />
                </g>

                <g className="orbit-spin-ccw-2">
                  <circle
                    cx="200"
                    cy="200"
                    r="135"
                    stroke="rgba(17,17,17,0.08)"
                    strokeWidth="1.2"
                    strokeDasharray="5 8"
                  />
                  <circle cx="335" cy="200" r="3" fill="rgba(17,17,17,0.25)" />
                </g>

                <g className="orbit-spin-cw-3">
                  <circle
                    cx="200"
                    cy="200"
                    r="175"
                    stroke="rgba(17,17,17,0.06)"
                    strokeWidth="1.2"
                    strokeDasharray="3 7"
                  />
                  <circle cx="200" cy="375" r="2.5" fill="rgba(17,17,17,0.2)" />
                </g>

                {/* Connecting lines from outer perimeter of center Q to each node icon */}
                {NODES.map((n) => {
                  const nx = (n.cx / 100) * 400;
                  const ny = (n.cy / 100) * 400;
                  const dx = nx - 200;
                  const dy = ny - 200;
                  const dist = Math.hypot(dx, dy) || 1;
                  const ux = dx / dist;
                  const uy = dy / dist;

                  // Offset start from center Q (r=22) and end before node icon (r=22)
                  const x1 = 200 + ux * 22;
                  const y1 = 200 + uy * 22;
                  const x2 = nx - ux * 22;
                  const y2 = ny - uy * 22;

                  const isHighlighted = getIsNodeHighlighted(n.id);

                  return (
                    <line
                      key={`line-${n.id}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isHighlighted ? '#111' : 'rgba(17,17,17,0.09)'}
                      strokeWidth={isHighlighted ? 1.6 : 0.9}
                      strokeDasharray={isHighlighted ? 'none' : '3 4'}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>

              {/* Central Core Favicon / Logo Q with Dynamic Micro-Label */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none">
                <div className="w-12 h-12 flex items-center justify-center pointer-events-auto transition-transform duration-300 hover:scale-110">
                  <img
                    src="/favicon2.png"
                    alt="Quest For Tech"
                    className="w-9 h-9 object-contain pointer-events-none select-none"
                  />
                </div>
                {/* Dynamic capability label badge under Q */}
                <div className="mt-1 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-xs border border-[rgba(17,17,17,0.12)] pointer-events-auto transition-all duration-300">
                  <span className="text-[10px] font-bold text-[#111] uppercase tracking-wider whitespace-nowrap">
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


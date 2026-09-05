'use client';

import React from 'react';
import Link from 'next/link';

// ─── Visual components for each service ──────────────────────────────────────

function VisualWebsite() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none" aria-hidden>
      {/* Ambient background glow */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #818CF8 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      {/* Structured modular grid — UI wireframe geometry */}
      <div className="relative z-10 w-full max-w-xs space-y-3 qft-float-slow" style={{ animationDelay: '0s' }}>
        {/* Browser chrome bar */}
        <div className="rounded-xl p-3 flex items-center gap-2 bg-slate-900 text-white dark:bg-[#0E0E0E] border border-slate-800 dark:border-[#D6DCDC]/15 shadow-md">
          <div className="flex gap-1.5">
            {['#C1B6FF', '#818CF8', '#D6DCDC'].map((c, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
            ))}
          </div>
          <div className="flex-1 h-2 rounded-full bg-slate-700 dark:bg-[#D6DCDC]/10" />
          <div className="w-6 h-2 rounded-full bg-slate-700 dark:bg-[#D6DCDC]/20" />
        </div>

        {/* Hero block */}
        <div className="rounded-xl p-5 space-y-3 bg-slate-900 dark:bg-[#0C0C0C] border border-slate-800 dark:border-[#D6DCDC]/10 shadow-lg">
          <div className="h-3 w-2/3 rounded-full bg-gradient-to-r from-[#C1B6FF] to-[#818CF8] opacity-90" />
          <div className="h-2 w-full rounded-full bg-slate-700 dark:bg-[#D6DCDC]/10" />
          <div className="h-2 w-3/4 rounded-full bg-slate-700 dark:bg-[#D6DCDC]/10" />
          <div className="flex gap-2 pt-1">
            <div className="h-7 w-20 rounded-full bg-slate-200 text-slate-900 dark:bg-[#D6DCDC]" />
            <div className="h-7 w-20 rounded-full border border-slate-600 dark:border-[#D6DCDC]/30" />
          </div>
        </div>

        {/* Content grid row */}
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`rounded-lg aspect-square border ${i === 1 ? 'bg-slate-800 border-slate-700 dark:bg-[#D6DCDC]/10 dark:border-[#D6DCDC]/20' : 'bg-slate-900 border-slate-800 dark:bg-[#0C0C0C] dark:border-[#D6DCDC]/10'}`} />
          ))}
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-2 gap-2">
          {[0, 1].map((i) => (
            <div key={i} className="rounded-lg p-3 space-y-2 bg-slate-900 dark:bg-[#0C0C0C] border border-slate-800 dark:border-[#D6DCDC]/10">
              <div className="h-2 w-full rounded-full bg-slate-700 dark:bg-[#D6DCDC]/10" />
              <div className="h-2 w-2/3 rounded-full bg-slate-700 dark:bg-[#D6DCDC]/10" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating accent node */}
      <div className="absolute top-8 right-8 w-3 h-3 rounded-full qft-pulse-glow"
        style={{ background: '#C1B6FF', boxShadow: '0 0 12px #C1B6FF' }} />
      <div className="absolute bottom-12 left-10 w-2 h-2 rounded-full qft-blink"
        style={{ background: '#818CF8', boxShadow: '0 0 8px #818CF8', animationDelay: '1s' }} />
    </div>
  );
}

function VisualSEO() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none" aria-hidden>
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-48 opacity-15"
          style={{ background: 'radial-gradient(ellipse at center bottom, #A78BFA 0%, transparent 70%)', filter: 'blur(30px)' }} />
      </div>

      {/* Search/data pathways — upward directional growth */}
      <svg viewBox="0 0 280 320" className="relative z-10 w-64 h-72" fill="none">
        {/* Central search ring */}
        <circle cx="140" cy="180" r="48" stroke="rgba(167,139,250,0.15)" strokeWidth="1" />
        <circle cx="140" cy="180" r="36" stroke="rgba(167,139,250,0.25)" strokeWidth="1" />
        <circle cx="140" cy="180" r="24" fill="rgba(167,139,250,0.05)" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5" />
        {/* Magnifier handle */}
        <line x1="160" y1="200" x2="180" y2="220" stroke="rgba(167,139,250,0.6)" strokeWidth="2.5" strokeLinecap="round" />

        {/* Upward data flow paths */}
        {[
          { x1: 140, y1: 156, x2: 140, y2: 40 },
          { x1: 130, y1: 150, x2: 90, y2: 60 },
          { x1: 150, y1: 150, x2: 190, y2: 60 },
        ].map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={`rgba(167,139,250,${0.15 + i * 0.05})`} strokeWidth="1"
            strokeDasharray="4 4" />
        ))}

        {/* Data nodes along paths */}
        {[
          { cx: 140, cy: 40, r: 5, fill: '#A78BFA', glow: true },
          { cx: 90, cy: 60, r: 4, fill: '#C1B6FF', glow: false },
          { cx: 190, cy: 60, r: 4, fill: '#C1B6FF', glow: false },
          { cx: 140, cy: 90, r: 3, fill: 'rgba(167,139,250,0.5)', glow: false },
          { cx: 115, cy: 100, r: 3, fill: 'rgba(167,139,250,0.3)', glow: false },
          { cx: 165, cy: 100, r: 3, fill: 'rgba(167,139,250,0.3)', glow: false },
        ].map((n, i) => (
          <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill={n.fill}
            style={n.glow ? { filter: 'drop-shadow(0 0 6px #A78BFA)' } : undefined} />
        ))}

        {/* Rising bar chart at bottom */}
        {[
          { x: 60, h: 30, color: 'rgba(167,139,250,0.2)' },
          { x: 85, h: 50, color: 'rgba(167,139,250,0.35)' },
          { x: 110, h: 70, color: 'rgba(167,139,250,0.5)' },
          { x: 135, h: 90, color: '#A78BFA' },
          { x: 160, h: 75, color: 'rgba(167,139,250,0.55)' },
          { x: 185, h: 55, color: 'rgba(167,139,250,0.4)' },
        ].map((b, i) => (
          <rect key={i} x={b.x} y={290 - b.h} width="16" height={b.h} rx="3" fill={b.color}
            style={{ filter: i === 3 ? 'drop-shadow(0 0 4px #A78BFA)' : undefined }} />
        ))}
        <line x1="50" y1="290" x2="210" y2="290" stroke="rgba(214,220,220,0.1)" strokeWidth="1" />
      </svg>

      <div className="absolute top-6 right-6 w-2 h-2 rounded-full qft-pulse-glow"
        style={{ background: '#A78BFA', boxShadow: '0 0 10px #A78BFA' }} />
    </div>
  );
}

function VisualContent() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none" aria-hidden>
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 opacity-12"
          style={{ background: 'radial-gradient(circle, #E2E8F0 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      {/* Flowing editorial ribbon layers */}
      <div className="relative z-10 w-full max-w-xs">
        {/* Editorial layout blocks */}
        <div className="space-y-3">
          {/* Large headline block */}
          <div className="rounded-xl p-5 bg-slate-900 dark:bg-[#0C0C0C] border border-slate-800 dark:border-[#D6DCDC]/10 shadow-lg">
            <div className="h-4 w-3/4 rounded-full mb-2 bg-gradient-to-r from-[#E2E8F0] to-[#C1B6FF] opacity-90" />
            <div className="h-3 w-1/2 rounded-full mb-4 bg-slate-700 dark:bg-[#D6DCDC]/20" />
            <div className="space-y-1.5">
              {[1, 0.7, 0.85, 0.6].map((w, i) => (
                <div key={i} className="h-2 rounded-full bg-slate-700/60 dark:bg-[#D6DCDC]/10" style={{ width: `${w * 100}%` }} />
              ))}
            </div>
          </div>

          {/* Ribbon flow strips */}
          {[
            { w: '100%', color: 'rgba(214,220,220,0.1)', border: 'rgba(214,220,220,0.18)', h: 'h-12' },
            { w: '85%', color: 'rgba(193,182,255,0.08)', border: 'rgba(193,182,255,0.15)', h: 'h-10' },
            { w: '70%', color: 'rgba(214,220,220,0.06)', border: 'rgba(214,220,220,0.12)', h: 'h-8' },
          ].map((r, i) => (
            <div key={i} className={`${r.h} rounded-lg qft-float`}
              style={{ width: r.w, background: r.color, border: `1px solid ${r.border}`, animationDelay: `${i * 0.5}s` }} />
          ))}

          {/* Footer meta row */}
          <div className="flex items-center gap-3 pt-1">
            <div className="w-8 h-8 rounded-full" style={{ background: 'rgba(214,220,220,0.15)', border: '1px solid rgba(214,220,220,0.25)' }} />
            <div className="flex-1 space-y-1">
              <div className="h-2 w-1/2 rounded-full" style={{ background: 'rgba(214,220,220,0.15)' }} />
              <div className="h-1.5 w-1/3 rounded-full" style={{ background: 'rgba(214,220,220,0.08)' }} />
            </div>
            <div className="h-6 w-12 rounded-full" style={{ background: 'rgba(214,220,220,0.15)', border: '1px solid rgba(214,220,220,0.25)' }} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 w-3 h-3 rounded-full qft-pulse-glow"
        style={{ background: '#E2E8F0', boxShadow: '0 0 10px #E2E8F0', animationDelay: '0.5s' }} />
    </div>
  );
}

function VisualPerformanceMarketing() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none" aria-hidden>
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-48 h-48 opacity-15"
          style={{ background: 'radial-gradient(circle, #818CF8 0%, transparent 70%)', filter: 'blur(35px)' }} />
      </div>

      {/* Dynamic trajectory / pulse / performance energy */}
      <svg viewBox="0 0 300 280" className="relative z-10 w-72 h-64" fill="none">
        {/* Performance curve — upward trajectory */}
        <path d="M 30 240 C 80 240, 100 200, 130 160 C 160 120, 180 80, 270 40"
          stroke="url(#perfGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="perfGrad" x1="30" y1="240" x2="270" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#C1B6FF" />
          </linearGradient>
        </defs>

        {/* Pulse rings at peak */}
        <circle cx="270" cy="40" r="8" stroke="rgba(193,182,255,0.5)" strokeWidth="1.5" fill="rgba(193,182,255,0.1)" />
        <circle cx="270" cy="40" r="16" stroke="rgba(193,182,255,0.2)" strokeWidth="1" />
        <circle cx="270" cy="40" r="5" fill="#C1B6FF" style={{ filter: 'drop-shadow(0 0 6px #C1B6FF)' }} />

        {/* Trajectory dots */}
        {[
          { cx: 100, cy: 210, r: 4, color: '#818CF8', op: 0.5 },
          { cx: 150, cy: 155, r: 4, color: '#A050FF', op: 0.65 },
          { cx: 200, cy: 100, r: 4, color: '#C1B6FF', op: 0.8 },
          { cx: 240, cy: 65, r: 4, color: '#E2E8F0', op: 0.9 },
        ].map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={d.color} opacity={d.op} />
        ))}

        {/* KPI metric cards */}
        {[
          { x: 20, y: 20, label: 'CTR', value: '+142%', color: '#818CF8' },
          { x: 20, y: 100, label: 'ROAS', value: '4.8×', color: '#C1B6FF' },
          { x: 20, y: 180, label: 'CPA', value: '-38%', color: '#E2E8F0' },
        ].map((m, i) => (
          <g key={i}>
            <rect x={m.x} y={m.y} width="70" height="36" rx="8"
              fill="#0C0C0C" stroke={m.color} strokeOpacity="0.25" strokeWidth="1" />
            <text x={m.x + 8} y={m.y + 13} fontSize="7" fill="rgba(214,220,220,0.5)"
              fontFamily="Barlow, sans-serif" letterSpacing="1">{m.label}</text>
            <text x={m.x + 8} y={m.y + 27} fontSize="11" fontWeight="600" fill={m.color}
              fontFamily="Barlow, sans-serif">{m.value}</text>
          </g>
        ))}

        {/* Grid lines */}
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="110" y1={60 + i * 60} x2="290" y2={60 + i * 60}
            stroke="rgba(214,220,220,0.04)" strokeWidth="1" />
        ))}
      </svg>

      <div className="absolute top-6 right-10 w-2 h-2 rounded-full qft-blink"
        style={{ background: '#818CF8', boxShadow: '0 0 8px #818CF8', animationDelay: '0.8s' }} />
    </div>
  );
}

function VisualCustomDev() {
  // Node positions for architecture diagram
  const nodes = [
    { id: 'core',   x: 150, y: 140, r: 18, color: '#C1B6FF', label: 'Core' },
    { id: 'api',    x: 260, y: 80,  r: 12, color: '#818CF8', label: 'API' },
    { id: 'db',     x: 260, y: 200, r: 12, color: '#818CF8', label: 'DB' },
    { id: 'ai',     x: 40,  y: 80,  r: 12, color: '#D6DCDC', label: 'AI' },
    { id: 'auth',   x: 40,  y: 200, r: 12, color: '#D6DCDC', label: 'Auth' },
    { id: 'cdn',    x: 150, y: 30,  r: 9,  color: '#A78BFA', label: 'CDN' },
    { id: 'cache',  x: 150, y: 250, r: 9,  color: '#A78BFA', label: 'Cache' },
  ];
  const edges = [
    ['core','api'], ['core','db'], ['core','ai'], ['core','auth'],
    ['core','cdn'], ['core','cache'], ['api','db'], ['ai','api'],
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none" aria-hidden>
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 opacity-15"
          style={{ background: 'radial-gradient(circle, #C1B6FF 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <svg viewBox="0 0 300 280" className="relative z-10 w-64 h-60" fill="none">
        {/* Edge lines */}
        {edges.map(([a, b], i) => {
          const na = nodes.find(n => n.id === a)!;
          const nb = nodes.find(n => n.id === b)!;
          return (
            <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke="rgba(193,182,255,0.15)" strokeWidth="1"
              strokeDasharray="4 3" />
          );
        })}

        {/* Nodes */}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={n.r + 4} fill={n.color} opacity="0.05" />
            <circle cx={n.x} cy={n.y} r={n.r} fill="#0C0C0C"
              stroke={n.color} strokeWidth="1.5" strokeOpacity="0.5" />
            {n.id === 'core' && (
              <circle cx={n.x} cy={n.y} r={n.r - 5} fill={n.color} opacity="0.15" />
            )}
            <text x={n.x} y={n.y + 3.5} textAnchor="middle" fontSize={n.id === 'core' ? 8 : 7}
              fill={n.color} fillOpacity="0.9" fontFamily="Barlow, sans-serif"
              letterSpacing="0.5">{n.label}</text>
          </g>
        ))}

        {/* Pulsing outer ring on core */}
        <circle cx={nodes[0].x} cy={nodes[0].y} r="26" stroke="#C1B6FF" strokeOpacity="0.2"
          strokeWidth="1" strokeDasharray="3 4" className="qft-rotate-slow" />
      </svg>

      <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full qft-pulse-glow"
        style={{ background: '#C1B6FF', boxShadow: '0 0 8px #C1B6FF', animationDelay: '1.2s' }} />
    </div>
  );
}

// ─── Visual map ───────────────────────────────────────────────────────────────

const VISUALS: Record<string, React.FC> = {
  'website-development': VisualWebsite,
  'seo': VisualSEO,
  'content': VisualContent,
  'performance-marketing': VisualPerformanceMarketing,
  'custom-development': VisualCustomDev,
};

// ─── Chapter accent colours per service ──────────────────────────────────────

const ACCENTS: Record<string, string> = {
  'website-development':   '#D6DCDC',
  'seo':                   '#A78BFA',
  'content':               '#E2E8F0',
  'performance-marketing': '#818CF8',
  'custom-development':    '#C1B6FF',
};

// ─── SolutionChapter ─────────────────────────────────────────────────────────

export interface SolutionChapterProps {
  number: string;
  id: string;
  title: string;
  headline: string;
  description: string;
  ctaText: string;
  href: string;
  /** true = text left, visual right (odd). false = visual left, text right (even). */
  reversed: boolean;
}

export default function SolutionChapter({
  number, id, title, headline, description, ctaText, href, reversed,
}: SolutionChapterProps) {
  const VisualComponent = VISUALS[id] || VisualWebsite;
  const accent = ACCENTS[id] || '#C1B6FF';
  const chapterRef = React.useRef<HTMLDivElement>(null);
  const visualContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let ctx: any;
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (chapterRef.current) {
          gsap.fromTo(
            chapterRef.current,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: chapterRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }, chapterRef);
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  const textBlock = (
    <div className="relative flex flex-col justify-center py-6 lg:py-10">
      {/* Chapter number — elegant background watermark */}
      <div
        className="absolute -top-10 left-0 text-[130px] sm:text-[170px] lg:text-[200px] font-normal leading-none select-none pointer-events-none"
        style={{
          fontFamily: 'Barlow, sans-serif',
          color: accent,
          opacity: 0.04,
          zIndex: 0,
        }}
      >
        {number}
      </div>

      <div className="relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ fontFamily: 'Barlow, sans-serif', color: accent, opacity: 0.9 }}
          >
            0{number} — SOLUTION
          </span>
          <span className="h-px w-8" style={{ background: accent, opacity: 0.4 }} />
        </div>

        {/* Service title */}
        <h3
          className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.1] tracking-tight text-slate-900 dark:text-[#D6DCDC] mb-4"
          style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
        >
          {title}
        </h3>

        {/* Supporting headline */}
        <p
          className="text-base sm:text-lg font-normal mb-4 text-slate-700 dark:text-[#D6DCDC]/85"
          style={{
            fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif",
          }}
        >
          {headline}
        </p>

        {/* Body */}
        <p
          className="text-sm sm:text-base leading-relaxed mb-8 max-w-xl text-slate-600 dark:text-[#D6DCDC]/50"
          style={{
            fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif",
          }}
        >
          {description}
        </p>

        {/* CTA */}
        <div>
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all duration-200 cursor-pointer bg-[#A78BFA] text-black hover:bg-[#B89FFF] hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[#A78BFA]/20"
            style={{
              fontFamily: 'Barlow, sans-serif',
              letterSpacing: '0.1em',
            }}
          >
            {ctaText} →
          </Link>
        </div>
      </div>
    </div>
  );

  const visualBlock = (
    <div
      ref={visualContainerRef}
      className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[480px] rounded-3xl overflow-hidden shadow-xl transition-all duration-500 bg-slate-50 dark:bg-[#080808] border border-slate-200/80 dark:border-[#D6DCDC]/10 hover:border-slate-300 dark:hover:border-white/20"
    >
      {/* Accent glow behind visual */}
      <div
        className="absolute inset-0 opacity-15 dark:opacity-25 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accent} 0%, transparent 65%)`,
          filter: 'blur(50px)',
        }}
      />
      <VisualComponent />
    </div>
  );

  return (
    <div ref={chapterRef} className="relative w-full">
      {/* Top section hairline */}
      <div
        className="w-full h-px bg-slate-200 dark:bg-transparent"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(214,220,220,0.1), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reversed ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}>
          {reversed ? (
            <>
              {visualBlock}
              {textBlock}
            </>
          ) : (
            <>
              {textBlock}
              {visualBlock}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

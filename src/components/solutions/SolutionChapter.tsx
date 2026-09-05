'use client';

import React from 'react';
import Link from 'next/link';

// ─── Visual components for each service ──────────────────────────────────────

function VisualWebsite() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center select-none" aria-hidden>
      {/* Ambient background glow */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-20 dark:opacity-15"
          style={{ background: 'radial-gradient(circle, #818CF8 0%, transparent 70%)', filter: 'blur(45px)' }} />
      </div>

      {/* Browser mockup — theme adaptive (clean white in Light Mode, dark slate in Dark Mode) */}
      <div className="relative z-10 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E0E0E] shadow-xl overflow-hidden transition-all duration-300">
        {/* Browser chrome header */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#141414]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400 opacity-80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 opacity-80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 opacity-80" />
            </div>
            <div className="ml-3 h-5 px-3 rounded-full bg-slate-200 dark:bg-white/10 flex items-center text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              https://yourcompany.com
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className="w-4 h-1.5 rounded-full bg-slate-300 dark:bg-white/20" />
            <div className="w-4 h-1.5 rounded-full bg-slate-300 dark:bg-white/20" />
          </div>
        </div>

        {/* Hero section inside mockup */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-28 rounded-md bg-slate-800 dark:bg-white/90" />
            <div className="flex gap-2">
              <div className="h-3 w-12 rounded bg-slate-300 dark:bg-white/20" />
              <div className="h-3 w-12 rounded bg-slate-300 dark:bg-white/20" />
              <div className="h-3 w-12 rounded bg-slate-300 dark:bg-white/20" />
            </div>
          </div>

          <div className="pt-3 space-y-2">
            <div className="h-5 w-3/4 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#6366F1] dark:from-[#A78BFA] dark:to-[#818CF8]" />
            <div className="h-3 w-full rounded bg-slate-200 dark:bg-white/15" />
            <div className="h-3 w-4/5 rounded bg-slate-200 dark:bg-white/15" />
          </div>

          <div className="flex gap-3 pt-2">
            <div className="h-8 px-4 rounded-full bg-[#7C3AED] text-white dark:bg-[#A78BFA] dark:text-slate-950 text-[10px] font-bold flex items-center justify-center tracking-wider shadow-sm">
              EXPLORE SITE →
            </div>
            <div className="h-8 px-4 rounded-full border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-300 text-[10px] font-medium flex items-center justify-center">
              LEARN MORE
            </div>
          </div>

          {/* Grid feature cards */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { title: 'Fast Load', accent: 'bg-emerald-500' },
              { title: 'Responsive', accent: 'bg-[#7C3AED]' },
              { title: 'SEO Ready', accent: 'bg-indigo-500' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-2">
                <div className={`w-2 h-2 rounded-full ${item.accent}`} />
                <div className="h-2 w-3/4 rounded bg-slate-300 dark:bg-white/20" />
                <div className="h-1.5 w-full rounded bg-slate-200 dark:bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualSEO() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center select-none" aria-hidden>
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-48 opacity-25 dark:opacity-20"
          style={{ background: 'radial-gradient(ellipse at center bottom, #A78BFA 0%, transparent 70%)', filter: 'blur(35px)' }} />
      </div>

      {/* SEO Analytics Dashboard Mockup */}
      <div className="relative z-10 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E0E0E] shadow-xl p-5 sm:p-6 space-y-4">
        {/* Search header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200" style={{ fontFamily: 'Barlow, sans-serif' }}>
              Search Performance
            </span>
            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 text-[10px] font-bold">
              #1 RANKED
            </span>
          </div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            ↑ +84.2% Growth
          </span>
        </div>

        {/* Growth Curve Chart */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Organic Keyword Visibility</span>
            <span className="font-bold text-slate-900 dark:text-white">1,420 Keywords Ranked</span>
          </div>
          
          <svg viewBox="0 0 400 160" className="w-full h-36" fill="none">
            {/* Grid lines */}
            {[40, 80, 120].map((y, i) => (
              <line key={i} x1="0" y1={y} x2="400" y2={y} className="stroke-slate-200 dark:stroke-slate-800" strokeDasharray="3 3" />
            ))}
            
            {/* Gradient area */}
            <path d="M 0 140 Q 100 130, 180 80 T 360 20 L 400 15 L 400 160 L 0 160 Z"
              fill="url(#seoAreaGrad)" opacity={0.3} />
            
            {/* Main trajectory stroke */}
            <path d="M 0 140 Q 100 130, 180 80 T 360 20 L 400 15"
              stroke="url(#seoStrokeGrad)" strokeWidth="3.5" strokeLinecap="round" />

            <defs>
              <linearGradient id="seoAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="seoStrokeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>

            {/* Peak node */}
            <circle cx="360" cy="20" r="6" fill="#7C3AED" className="dark:fill-[#A78BFA]" />
            <circle cx="360" cy="20" r="12" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.4" />
          </svg>
        </div>

        {/* Keyword rankings table row preview */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Domain Authority</span>
            <span className="text-sm font-bold text-[#7C3AED] dark:text-[#A78BFA]">78 / 100</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Organic Clicks</span>
            <span className="text-sm font-bold text-[#6366F1] dark:text-[#818CF8]">42.8k / mo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualContent() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center select-none" aria-hidden>
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 opacity-20 dark:opacity-15"
          style={{ background: 'radial-gradient(circle, #818CF8 0%, transparent 70%)', filter: 'blur(45px)' }} />
      </div>

      {/* Editorial Content CMS Studio Mockup (Theme Adaptive) */}
      <div className="relative z-10 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E0E0E] shadow-xl overflow-hidden">
        {/* CMS Header bar */}
        <div className="px-4 py-3 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#141414] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Content Studio
            </span>
            <span className="text-[10px] text-slate-400">| Published</span>
          </div>
          <div className="h-6 px-3 rounded-full bg-[#7C3AED] text-white dark:bg-[#A78BFA] dark:text-slate-950 text-[10px] font-bold flex items-center justify-center tracking-wider">
            SEO SCORE: 98
          </div>
        </div>

        {/* CMS Content layout */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Article banner placeholder */}
          <div className="h-20 w-full rounded-xl bg-gradient-to-r from-purple-100 via-indigo-100 to-slate-100 dark:from-purple-950/40 dark:via-indigo-950/40 dark:to-slate-900 border border-slate-200/80 dark:border-white/10 p-4 flex flex-col justify-end">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] dark:text-[#C1B6FF]">
              STRATEGY & INSIGHTS
            </span>
            <div className="h-4 w-2/3 rounded bg-slate-800 dark:bg-white/90 mt-1" />
          </div>

          {/* Editorial body paragraph skeletons */}
          <div className="space-y-2">
            <div className="h-2.5 w-full rounded bg-slate-200 dark:bg-white/15" />
            <div className="h-2.5 w-11/12 rounded bg-slate-200 dark:bg-white/15" />
            <div className="h-2.5 w-4/5 rounded bg-slate-200 dark:bg-white/15" />
          </div>

          {/* Distribution channel pill tags */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-white/10">
            <div className="flex gap-2">
              {['Blog', 'SEO Article', 'LinkedIn', 'Newsletter'].map((tag, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-[10px] font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">
              1,420 Words
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualPerformanceMarketing() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none" aria-hidden>
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 opacity-25 dark:opacity-20"
          style={{ background: 'radial-gradient(circle, #818CF8 0%, transparent 70%)', filter: 'blur(45px)' }} />
      </div>

      {/* FULL SECTION DESIGN: Campaign Performance Command Center */}
      <div className="relative z-10 w-full h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E0E0E] shadow-xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
        {/* Top Campaign Control Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold" style={{ fontFamily: 'Barlow, sans-serif' }}>
              Performance Command Center
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              Q3 Paid Acquisition Campaign
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            ACTIVE
          </span>
        </div>

        {/* 3 Metric Grid Cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'CTR Growth', val: '+142%', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
            { label: 'ROAS Return', val: '4.8×', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/30' },
            { label: 'CPA Reduction', val: '-38%', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
          ].map((m, i) => (
            <div key={i} className={`p-3 rounded-xl border border-slate-200 dark:border-white/10 ${m.bg}`}>
              <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{m.label}</div>
              <div className={`text-lg sm:text-xl font-extrabold ${m.color} mt-0.5`}>{m.val}</div>
            </div>
          ))}
        </div>

        {/* Full Section Growth Trajectory Chart */}
        <div className="relative pt-2">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-slate-500 dark:text-slate-400">Conversion Rate Trajectory</span>
            <span className="text-xs font-bold text-[#7C3AED] dark:text-[#A78BFA]">+284% Conversion Gain</span>
          </div>

          <svg viewBox="0 0 500 180" className="w-full h-44" fill="none">
            {/* Background grid */}
            {[40, 90, 140].map((y, i) => (
              <line key={i} x1="0" y1={y} x2="500" y2={y} className="stroke-slate-200 dark:stroke-slate-800" strokeDasharray="4 4" />
            ))}

            {/* Gradient Under Curve */}
            <path d="M 0 160 C 120 160, 180 120, 260 80 C 340 40, 420 20, 490 15 L 490 180 L 0 180 Z"
              fill="url(#perfFullGradArea)" opacity={0.25} />

            {/* Curve Stroke */}
            <path d="M 0 160 C 120 160, 180 120, 260 80 C 340 40, 420 20, 490 15"
              stroke="url(#perfFullStroke)" strokeWidth="4" strokeLinecap="round" />

            <defs>
              <linearGradient id="perfFullGradArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="perfFullStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>

            {/* Pulsing Peak Target Node */}
            <circle cx="490" cy="15" r="7" fill="#7C3AED" className="dark:fill-[#A78BFA]" />
            <circle cx="490" cy="15" r="14" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.4" />
          </svg>
        </div>

        {/* Channel Allocation Bar */}
        <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">Channel Mix:</span>
          <div className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500" /> Search 45%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> Social 35%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Retargeting 20%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualCustomDev() {
  // Node positions for architecture topology
  const nodes = [
    { id: 'core',   x: 250, y: 110, r: 22, color: '#7C3AED', label: 'Core API Engine' },
    { id: 'api',    x: 410, y: 55,  r: 15, color: '#2563EB', label: 'GraphQL Gateway' },
    { id: 'db',     x: 410, y: 165, r: 15, color: '#2563EB', label: 'PostgreSQL Master' },
    { id: 'ai',     x: 90,  y: 55,  r: 15, color: '#4F46E5', label: 'AI Inference' },
    { id: 'auth',   x: 90,  y: 165, r: 15, color: '#4F46E5', label: 'Auth Service' },
    { id: 'cdn',    x: 250, y: 25,  r: 12, color: '#7C3AED', label: 'Edge CDN' },
    { id: 'cache',  x: 250, y: 195, r: 12, color: '#7C3AED', label: 'Redis Cache' },
  ];
  const edges = [
    ['core','api'], ['core','db'], ['core','ai'], ['core','auth'],
    ['core','cdn'], ['core','cache'], ['api','db'], ['ai','api'],
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none" aria-hidden>
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 opacity-25 dark:opacity-20"
          style={{ background: 'radial-gradient(circle, #A78BFA 0%, transparent 70%)', filter: 'blur(45px)' }} />
      </div>

      {/* FULL SECTION DESIGN: Custom Software System Architecture Topology */}
      <div className="relative z-10 w-full h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E0E0E] shadow-xl p-5 sm:p-6 flex flex-col justify-between space-y-3">
        {/* Console Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200" style={{ fontFamily: 'Barlow, sans-serif' }}>
              System Architecture Topology
            </span>
          </div>
          <div className="flex gap-2 text-[10px]">
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-mono">
              LATENCY: 12ms
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono font-bold">
              UPTIME: 99.99%
            </span>
          </div>
        </div>

        {/* Interconnected Node SVG Topology Graph */}
        <div className="relative flex-1 flex items-center justify-center py-2">
          <svg viewBox="0 0 500 220" className="w-full h-56" fill="none">
            {/* Edge lines */}
            {edges.map(([a, b], i) => {
              const na = nodes.find(n => n.id === a)!;
              const nb = nodes.find(n => n.id === b)!;
              return (
                <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  className="stroke-purple-400 dark:stroke-purple-500/40" strokeWidth="1.8"
                  strokeDasharray="4 3" />
              );
            })}

            {/* Architecture Nodes */}
            {nodes.map((n) => (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r={n.r + 4} fill={n.color} opacity="0.15" />
                <circle cx={n.x} cy={n.y} r={n.r} className="fill-white stroke-purple-600 dark:fill-[#0C0C0C] dark:stroke-purple-400"
                  strokeWidth="2" />
                {n.id === 'core' && (
                  <circle cx={n.x} cy={n.y} r={n.r - 6} fill={n.color} opacity="0.35" />
                )}
                <text x={n.x} y={n.y + 3.5} textAnchor="middle" fontSize={n.id === 'core' ? 9.5 : 8}
                  className="fill-slate-900 dark:fill-[#C1B6FF] font-bold" fontFamily="Barlow, sans-serif"
                  letterSpacing="0.5">{n.label}</text>
              </g>
            ))}

            {/* Pulsing outer ring on core */}
            <circle cx={nodes[0].x} cy={nodes[0].y} r="32" stroke="#7C3AED" strokeOpacity="0.5"
              strokeWidth="1.5" strokeDasharray="3 4" className="dark:stroke-[#A78BFA] qft-rotate-slow" />
          </svg>
        </div>

        {/* Live API Console Stream Bar */}
        <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-[11px] flex items-center justify-between border border-slate-800 shadow-inner">
          <span className="text-emerald-400 font-semibold">
            POST /v1/ai/inference → 200 OK
          </span>
          <span className="text-slate-400 text-[10px]">
            12.4k req/sec
          </span>
        </div>
      </div>
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
        className="absolute -top-10 left-0 text-[130px] sm:text-[170px] lg:text-[200px] font-normal leading-none select-none pointer-events-none text-slate-900/10 dark:text-[#D6DCDC]/[0.05]"
        style={{
          fontFamily: 'Barlow, sans-serif',
          zIndex: 0,
        }}
      >
        {number}
      </div>

      <div className="relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7C3AED] dark:text-[#A78BFA]"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            0{number} — SOLUTION
          </span>
          <span className="h-px w-8 bg-[#7C3AED]/40 dark:bg-[#A78BFA]/40" />
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
      className="relative min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] w-full rounded-3xl overflow-hidden shadow-xl transition-all duration-500 bg-slate-100/70 dark:bg-[#080808] border border-slate-200 dark:border-[#D6DCDC]/10 hover:border-slate-300 dark:hover:border-white/20 p-5 sm:p-7 flex items-center justify-center"
    >
      {/* Accent glow behind visual */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-25 pointer-events-none"
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

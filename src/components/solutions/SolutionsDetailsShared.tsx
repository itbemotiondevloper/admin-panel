"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import FooterPage from '@/components/Footer';
import InsightsPage from '@/components/home/Insights';
import SolutionsDetailsCta from '@/components/solutions/SolutionsDetailsCta';
import { solutionsService } from '@/services/solutions.service';

interface SolutionsDetailsSharedProps {
  defaultModule?: string;
}

/** 
 * Unique UI Visual Components per Section 
 * (Ensures NO two sections have repeating card grid layouts!)
 */

// 1. Philosophy Highlight Hero Card (Minimalist split preview)
function PhilosophyVisual() {
  return (
    <div className="relative w-full h-full min-h-[320px] rounded-3xl border border-slate-200 dark:border-[#D6DCDC]/15 bg-slate-100/80 dark:bg-[#0E0E0E] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
        <span className="text-xs font-mono font-bold tracking-widest text-[#7C3AED] dark:text-[#A78BFA]" style={{ fontFamily: 'Barlow, sans-serif' }}>
          STRATEGY & ASSET BLUEPRINT
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      <div className="py-6 space-y-3">
        <div className="text-2xl font-normal text-slate-900 dark:text-[#D6DCDC] leading-tight" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
          Digital Asset Architecture
        </div>
        <p className="text-xs text-slate-600 dark:text-[#D6DCDC]/55 leading-relaxed font-normal">
          Designed around business goals, user intent, audience psychology, and compounding marketing ROI.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Conversion Engine</div>
          <div className="text-sm font-bold text-[#7C3AED] dark:text-[#A78BFA] mt-0.5">High Intent UX</div>
        </div>
        <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Brand Perception</div>
          <div className="text-sm font-bold text-[#6366F1] dark:text-[#818CF8]">Category Leader</div>
        </div>
      </div>
    </div>
  );
}

// 2. Interactive Feature Explorer Tab Component for "What We Build"
function WhatWeBuildInteractive({ items }: { items: any[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const activeItem = items[activeIdx] || items[0] || {};

  const handleSelectTab = (idx: number) => {
    if (idx === activeIdx) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setIsAnimating(false);
    }, 220);
  };

  return (
    <div className="w-full rounded-3xl border border-slate-200 dark:border-[#D6DCDC]/15 bg-slate-50 dark:bg-[#090909] p-6 sm:p-10 shadow-2xl transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left selector menu */}
        <div className="lg:col-span-5 space-y-2">
          {items.map((item, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectTab(idx)}
                className={`w-full text-left px-5 py-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#7C3AED] text-white dark:bg-[#A78BFA] dark:text-black border-transparent shadow-lg shadow-[#7C3AED]/20'
                    : 'bg-white dark:bg-[#121212] border-slate-200 dark:border-white/10 text-slate-700 dark:text-[#D6DCDC]/70 hover:border-[#A78BFA]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-bold ${isSelected ? 'opacity-90' : 'text-slate-400 dark:text-slate-500'}`}>
                    0{idx + 1}
                  </span>
                  <span className="text-sm font-normal" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                    {item.title}
                  </span>
                </div>
                <span className="text-xs font-mono">→</span>
              </button>
            );
          })}
        </div>

        {/* Right Active Preview Spotlight Box - Slow Rise & Form from Bottom Animation */}
        <div className="lg:col-span-7 overflow-hidden p-1">
          <div 
            className={`bg-white dark:bg-[#141414] p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-white/10 space-y-6 shadow-inner min-h-[300px] flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] transform origin-bottom ${
              isAnimating 
                ? 'opacity-0 translate-y-20 scale-y-90 blur-sm' 
                : 'opacity-100 translate-y-0 scale-y-100 blur-0'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold tracking-widest text-[#7C3AED] dark:text-[#A78BFA]" style={{ fontFamily: 'Barlow, sans-serif' }}>
                CAPABILITY 0{activeIdx + 1}
              </span>
              <span className="h-px w-8 bg-[#A78BFA]/40" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-normal text-slate-900 dark:text-[#D6DCDC]" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
              {activeItem.title}
            </h3>

            <p className="text-base text-slate-600 dark:text-[#D6DCDC]/60 leading-relaxed font-normal" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
              {activeItem.desc}
            </p>

            <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-white/10">
              <span className="text-xs text-slate-400 font-mono">Custom Engineered Solution</span>
              <a href="/contact" className="text-xs font-bold text-[#7C3AED] dark:text-[#A78BFA] hover:underline uppercase tracking-wider">
                DISCUSS CAPABILITY →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Process Interactive Horizontal Stepper & Spotlight Component
function ProcessHorizontalTimeline({ steps }: { steps: any[] }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-full space-y-10">
      {/* Connected Top Stepper Bar with Progress Line */}
      <div className="relative w-full">
        {/* Background track line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-white/10 -translate-y-1/2 z-0" />
        
        {/* Active filled progress line */}
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] -translate-y-1/2 z-0 transition-all duration-500 ease-out" 
          style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
        />

        {/* Stepper nodes grid */}
        <div className="grid grid-cols-6 gap-2 relative z-10">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const isCompleted = activeStep > idx;

            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                className="group flex flex-col items-center gap-3 cursor-pointer focus:outline-none"
              >
                {/* Node Pill Circle */}
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#7C3AED] text-white dark:bg-[#A78BFA] dark:text-black border-transparent shadow-[0_0_20px_rgba(167,139,250,0.6)] scale-110'
                      : isCompleted
                      ? 'bg-[#7C3AED]/20 text-[#7C3AED] dark:bg-[#A78BFA]/20 dark:text-[#A78BFA] border-[#A78BFA]/40'
                      : 'bg-white dark:bg-[#121215] text-slate-400 dark:text-[#D6DCDC]/40 border-slate-200 dark:border-white/10 group-hover:border-[#A78BFA]/50 group-hover:scale-105'
                  }`}
                >
                  {isCompleted ? '✓' : step.number || `0${idx + 1}`}
                </div>

                {/* Step Title Label under node */}
                <span 
                  className={`text-xs font-normal text-center hidden sm:block transition-colors duration-300 ${
                    isActive 
                      ? 'text-[#7C3AED] dark:text-[#A78BFA] font-medium' 
                      : 'text-slate-500 dark:text-[#D6DCDC]/50 group-hover:text-slate-900 dark:group-hover:text-[#D6DCDC]'
                  }`}
                  style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
                >
                  {step.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Spotlight Card */}
      <div className="relative w-full rounded-3xl border border-slate-200 dark:border-[#D6DCDC]/15 bg-white dark:bg-[#121215] p-8 sm:p-12 shadow-2xl transition-all duration-500 overflow-hidden">
        {/* Subtle Ambient Accent Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#7C3AED]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          {/* Left Step Indicator & Title */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#7C3AED]/10 dark:bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-xs font-mono text-[#7C3AED] dark:text-[#A78BFA]">
              PHASE 0{activeStep + 1} OF 0{steps.length}
            </div>

            <h3 className="text-2xl sm:text-3xl font-normal text-slate-900 dark:text-[#D6DCDC]" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
              {steps[activeStep]?.name}
            </h3>
          </div>

          {/* Right Description & Details */}
          <div className="lg:col-span-7 space-y-4 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-white/10 pt-6 lg:pt-0 lg:pl-8">
            <p className="text-base sm:text-lg text-slate-600 dark:text-[#D6DCDC]/70 leading-relaxed font-normal" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
              {steps[activeStep]?.desc}
            </p>

            <div className="pt-2 flex items-center gap-6">
              <button 
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
                className="text-xs font-mono text-slate-400 dark:text-[#D6DCDC]/40 hover:text-[#A78BFA] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                ← PREVIOUS PHASE
              </button>
              <span className="text-slate-300 dark:text-white/10">|</span>
              <button 
                onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                disabled={activeStep === steps.length - 1}
                className="text-xs font-mono text-[#7C3AED] dark:text-[#A78BFA] hover:underline disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                NEXT PHASE →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Marketing Ecosystem Split Accordion / List Panel
function EcosystemSplitList({ items }: { items: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((eco, idx) => (
        <div 
          key={idx}
          className="p-8 rounded-3xl bg-slate-50 dark:bg-[#090909] border border-slate-200 dark:border-[#D6DCDC]/15 hover:border-[#A78BFA]/40 transition-all flex items-start gap-6"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 dark:text-[#C1B6FF] font-mono text-sm font-bold flex items-center justify-center shrink-0 border border-indigo-500/20">
            +{idx + 1}
          </div>
          <div className="space-y-2 text-left">
            <h3 className="text-xl font-normal text-slate-900 dark:text-[#D6DCDC]" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
              {eco.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-[#D6DCDC]/55 leading-relaxed font-normal" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
              {eco.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// 5. Capability Accordion Section with Scroll-Active Expand/Shrink Effect
function CapabilityAccordionSection({ solution }: { solution: any }) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    const initScrollTrigger = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current) return;
      const items = containerRef.current.querySelectorAll('.capability-accordion-item');

      items.forEach((item, idx) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveIdx(idx),
          onEnterBack: () => setActiveIdx(idx),
        });
      });
    };

    initScrollTrigger();
  }, [solution]);

  return (
    <section className="gsap-reveal max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28 text-left">
      <div className="max-w-3xl space-y-4 mb-16">
        <div className="flex items-center gap-3">
          <span className="inline-block w-5 h-px bg-[#A78BFA]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A78BFA]" style={{ fontFamily: 'Barlow, sans-serif' }}>
            INTEGRATED CAPABILITIES
          </span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 dark:text-[#D6DCDC] tracking-tight" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
          {solution.featuresTitle || "What Goes Into a QFT Website"}
        </h2>
      </div>

      {/* Accordion List - Active Item Expands & Inactive Items Moderately Shrink with Soft Blur */}
      <div ref={containerRef} className="divide-y divide-slate-200 dark:divide-[#D6DCDC]/10 border-t border-b border-slate-200 dark:border-[#D6DCDC]/10 py-2">
        {solution.features.map((feat: any, idx: number) => {
          const isActive = activeIdx === idx;
          return (
            <div 
              key={idx} 
              onClick={() => setActiveIdx(idx)}
              onMouseEnter={() => setActiveIdx(idx)}
              className={`capability-scroll-item capability-accordion-item group rounded-2xl border transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 origin-left ${
                isActive
                  ? 'py-7 sm:py-8 px-6 sm:px-8 bg-white dark:bg-[#141417] border-[#7C3AED]/40 dark:border-[#A78BFA]/50 shadow-[0_20px_40px_rgba(124,58,237,0.12)] scale-100 opacity-100 my-2.5 z-10 blur-none'
                  : 'py-4 sm:py-4.5 px-5 sm:px-6 bg-transparent border-transparent opacity-45 hover:opacity-85 scale-[0.97] blur-[1px] hover:blur-none my-0.5'
              }`}
            >
              <div className="flex items-center gap-4 md:w-5/12">
                <span 
                  className={`font-mono text-xs font-bold transition-all duration-500 ${
                    isActive 
                      ? 'px-3 py-1.5 rounded-lg bg-[#7C3AED] text-white dark:bg-[#A78BFA] dark:text-black border-transparent shadow-md scale-105' 
                      : 'px-2 py-0.5 rounded text-[#7C3AED] dark:text-[#A78BFA] bg-[#7C3AED]/10 dark:bg-[#A78BFA]/10 border border-[#A78BFA]/20 scale-95'
                  }`}
                >
                  0{idx + 1}
                </span>
                <h3 
                  className={`font-normal transition-all duration-500 ${
                    isActive 
                      ? 'text-xl sm:text-2xl text-[#7C3AED] dark:text-[#A78BFA] font-medium tracking-tight' 
                      : 'text-base sm:text-lg text-slate-700 dark:text-[#D6DCDC]/70 font-normal'
                  }`} 
                  style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
                >
                  {feat.title}
                </h3>
              </div>

              <p 
                className={`md:w-7/12 leading-relaxed font-normal transition-all duration-500 ${
                  isActive 
                    ? 'text-base sm:text-lg text-slate-800 dark:text-[#D6DCDC]/90' 
                    : 'text-xs sm:text-sm text-slate-500 dark:text-[#D6DCDC]/50'
                }`} 
                style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
              >
                {feat.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}


export function SolutionsDetailsSharedContent({ defaultModule }: SolutionsDetailsSharedProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const moduleParam = defaultModule || searchParams?.get('module');
  const [activeKey, setActiveKey] = useState<string>("website-development");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [solutionsList, setSolutionsList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSolutionsData = async () => {
      try {
        const loaded = await solutionsService.getSolutions();
        if (loaded && loaded.length > 0) {
          setSolutionsList(loaded);
        }
      } catch (err) {
        console.warn('Failed to fetch solutions from Firestore:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSolutionsData();
  }, []);

  useEffect(() => {
    if (moduleParam) {
      setActiveKey(moduleParam);
    } else if (solutionsList.length > 0) {
      setActiveKey(solutionsList[0].slug || 'website-development');
    }
  }, [moduleParam, solutionsList]);

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    if (loading) return;

    let ctx: any;
    const initAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const sections = mainRef.current?.querySelectorAll('.gsap-reveal');
        sections?.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // Staggered pop-up scroll animation for individual capabilities items
        const capabilityItems = mainRef.current?.querySelectorAll('.capability-scroll-item');
        if (capabilityItems && capabilityItems.length > 0) {
          gsap.fromTo(
            capabilityItems,
            { opacity: 0, y: 50, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: capabilityItems[0],
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }, mainRef);

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    };

    initAnimations();

    return () => {
      ctx?.revert();
    };
  }, [loading, activeKey]);

  const solution = solutionsList.find(s => s.slug === activeKey || s.id === activeKey) || solutionsList[0] || {};

  const handleSelectSolution = (slug: string) => {
    router.push(`/solutions/${slug}`);
    setIsDropdownOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-sans">
        <div className="w-10 h-10 border-4 border-[#D6DCDC]/20 border-t-[#A78BFA] rounded-full animate-spin mb-4"></div>
        <p className="text-[#D6DCDC]/60 text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: 'Barlow, sans-serif' }}>
          Loading Quest For Tech Solution...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-[#D6DCDC] transition-colors duration-300 flex flex-col font-sans selection:bg-[#A78BFA] selection:text-black">
      <Header />

      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40 bg-transparent cursor-default" 
          onClick={() => setIsDropdownOpen(false)} 
        />
      )}

      <main ref={mainRef} className="flex-grow space-y-0 overflow-x-hidden">

        {/* ── SECTION 1: HERO (High-Impact Split Graphic Layout) ── */}
        <section className="relative w-full pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
          {/* Ambient Background Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7C3AED]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#A78BFA]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
              
              {/* Left Column: Heading & Information */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Eyebrow Pill */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/30 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-pulse" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A78BFA]" style={{ fontFamily: 'Barlow, sans-serif' }}>
                    {solution.badge || 'DIGITAL SOLUTIONS'}
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal leading-[1.06] tracking-tight text-slate-900 dark:text-[#D6DCDC]" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                  {solution.title}
                </h1>

                {/* Tagline / Sub-headline */}
                {solution.headline && (
                  <p className="text-lg sm:text-xl font-medium text-[#7C3AED] dark:text-[#C1B6FF] leading-relaxed" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                    {solution.headline}
                  </p>
                )}

                {/* Main Body Description */}
                <p className="text-base sm:text-lg font-normal text-slate-600 dark:text-[#D6DCDC]/65 leading-relaxed max-w-2xl pt-1" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                  {solution.description}
                </p>

                {/* Key Benefits Pill Badges */}
                <div className="pt-2 flex flex-wrap gap-2.5">
                  {['High Intent UX', 'Compounding Growth', 'Custom Next.js Tech'].map((pill, pIdx) => (
                    <span key={pIdx} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#D6DCDC]/80">
                      <span className="text-[#A78BFA]">✓</span> {pill}
                    </span>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <a 
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A78BFA] text-black hover:bg-[#B89FFF] px-8 py-4 text-xs font-semibold uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg shadow-[#A78BFA]/25"
                    style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '0.1em' }}
                  >
                    {solution.ctaText || "START YOUR WEBSITE PROJECT"} →
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Orbital Flow with Floating Glassmorphic Satellite Pills */}
              <div className="lg:col-span-5 relative flex items-center justify-center py-8">
                <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                  
                  {/* Radial Ambient Background Glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#7C3AED]/25 via-[#A78BFA]/15 to-transparent blur-3xl pointer-events-none" />
                  
                  {/* Outer Orbit Ring */}
                  <div className="absolute inset-6 rounded-full border border-[#A78BFA]/25 qft-rotate-slow pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#A78BFA] shadow-[0_0_15px_#A78BFA]" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#7C3AED] shadow-[0_0_12px_#7C3AED]" />
                  </div>

                  {/* Inner Concentric Orbit Ring */}
                  <div className="absolute inset-20 rounded-full border border-dashed border-[#D6DCDC]/20 pointer-events-none" />

                  {/* Central Core Sphere */}
                  <div className="relative z-20 w-32 h-32 rounded-full bg-[#0D0D11]/90 backdrop-blur-xl border border-[#A78BFA]/40 shadow-[0_0_45px_rgba(167,139,250,0.3)] flex flex-col items-center justify-center text-center p-3 transition-transform duration-500 hover:scale-105">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-[#A78BFA] uppercase">QFT ENGINE</span>
                    <span className="text-lg font-normal text-white mt-0.5" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>Growth</span>
                    <span className="text-[10px] text-[#D6DCDC]/50 font-mono">Architecture</span>
                  </div>

                  {/* Floating Glassmorphic Satellite Pill 1: Top Center (-90° / 270°) */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 bg-white/10 dark:bg-black/70 backdrop-blur-xl border border-white/20 dark:border-[#A78BFA]/40 rounded-full px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:border-[#A78BFA]">
                    <span className="w-2 h-2 rounded-full bg-[#A78BFA] shadow-[0_0_8px_#A78BFA] animate-ping" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold text-white tracking-wide">Custom UX</span>
                      <span className="text-[10px] text-[#D6DCDC]/60 font-mono">High Intent Funnels</span>
                    </div>
                  </div>

                  {/* Floating Glassmorphic Satellite Pill 2: Top Right (-18° / 72° offset from top) */}
                  <div className="absolute top-[22%] -right-14 -translate-y-1/2 z-30 bg-white/10 dark:bg-black/70 backdrop-blur-xl border border-white/20 dark:border-[#F472B6]/40 rounded-full px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:border-[#F472B6]">
                    <span className="w-2 h-2 rounded-full bg-[#F472B6] shadow-[0_0_8px_#F472B6]" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold text-white tracking-wide">CMS Integration</span>
                      <span className="text-[10px] text-[#D6DCDC]/60 font-mono">Dynamic Content</span>
                    </div>
                  </div>

                  {/* Floating Glassmorphic Satellite Pill 3: Bottom Right (+54° / 144° offset from top) */}
                  <div className="absolute bottom-[10%] -right-10 z-30 bg-white/10 dark:bg-black/70 backdrop-blur-xl border border-white/20 dark:border-emerald-500/40 rounded-full px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:border-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold text-white tracking-wide">SEO Dominance</span>
                      <span className="text-[10px] text-[#D6DCDC]/60 font-mono">Organic Lead Generation</span>
                    </div>
                  </div>

                  {/* Floating Glassmorphic Satellite Pill 4: Bottom Left (+126° / 216° offset from top) */}
                  <div className="absolute bottom-[10%] -left-10 z-30 bg-white/10 dark:bg-black/70 backdrop-blur-xl border border-white/20 dark:border-[#818CF8]/40 rounded-full px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:border-[#818CF8]">
                    <span className="w-2 h-2 rounded-full bg-[#818CF8] shadow-[0_0_8px_#818CF8]" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold text-white tracking-wide">Next.js Speed</span>
                      <span className="text-[10px] text-[#D6DCDC]/60 font-mono">&lt; 1.1s Load Time</span>
                    </div>
                  </div>

                  {/* Floating Glassmorphic Satellite Pill 5: Top Left (+198° / 288° offset from top) */}
                  <div className="absolute top-[22%] -left-14 -translate-y-1/2 z-30 bg-white/10 dark:bg-black/70 backdrop-blur-xl border border-white/20 dark:border-[#C1B6FF]/40 rounded-full px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:border-[#C1B6FF]">
                    <span className="w-2 h-2 rounded-full bg-[#C1B6FF] shadow-[0_0_8px_#C1B6FF]" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold text-white tracking-wide">Mobile First</span>
                      <span className="text-[10px] text-[#D6DCDC]/60 font-mono">Responsive Micro UX</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 2: PHILOSOPHY (Split Hero Section with Unique Graphic Blueprint) ── */}
        {solution.heroOverviewTitle && (
          <section className="gsap-reveal border-t border-b border-slate-200 dark:border-[#D6DCDC]/10 py-20 lg:py-28 text-left">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-block w-5 h-px bg-[#A78BFA]" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A78BFA]" style={{ fontFamily: 'Barlow, sans-serif' }}>
                      BUSINESS ASSET PHILOSOPHY
                    </span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 dark:text-[#D6DCDC] tracking-tight leading-[1.12]" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                    {solution.heroOverviewTitle}
                  </h2>
                  
                  <p className="text-base sm:text-lg text-slate-600 dark:text-[#D6DCDC]/60 leading-relaxed font-normal pt-2 whitespace-pre-line" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                    {solution.heroOverviewDesc}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <PhilosophyVisual />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── SECTION 3: WHAT WE BUILD (Interactive Tab Explorer Component) ── */}
        {solution.whyChoose && solution.whyChoose.length > 0 && (
          <section className="gsap-reveal max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28 text-left">
            <div className="max-w-3xl space-y-4 mb-14">
              <div className="flex items-center gap-3">
                <span className="inline-block w-5 h-px bg-[#A78BFA]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A78BFA]" style={{ fontFamily: 'Barlow, sans-serif' }}>
                  WHAT WE BUILD
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 dark:text-[#D6DCDC] tracking-tight" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                {solution.whyChooseTitle || "Websites Built Around Different Business Needs"}
              </h2>
              
              {solution.whyChooseDesc && (
                <p className="text-slate-600 dark:text-[#D6DCDC]/60 text-base sm:text-lg leading-relaxed pt-1" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                  {solution.whyChooseDesc}
                </p>
              )}
            </div>

            {/* Unique Interactive Explorer Design */}
            <WhatWeBuildInteractive items={solution.whyChoose} />
          </section>
        )}

        {/* ── SECTION 4: STRATEGIC GOALS (Minimal Pill Badges Grid - ONLY ONE CARD SECTION) ── */}
        {solution.userGoalsItems && solution.userGoalsItems.length > 0 && (
          <section className="gsap-reveal border-t border-b border-slate-200 dark:border-[#D6DCDC]/10 py-20 lg:py-28 text-left">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="max-w-3xl space-y-4 mb-16">
                <div className="flex items-center gap-3">
                  <span className="inline-block w-5 h-px bg-[#A78BFA]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A78BFA]" style={{ fontFamily: 'Barlow, sans-serif' }}>
                    STRATEGIC ALIGNMENT
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 dark:text-[#D6DCDC] tracking-tight" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                  {solution.userGoalsTitle || "Built Around Users. Designed Around Goals."}
                </h2>
                
                <p className="text-slate-600 dark:text-[#D6DCDC]/60 text-base sm:text-lg leading-relaxed" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                  {solution.userGoalsDesc}
                </p>
              </div>

              {/* Minimal Card Grid Design */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solution.userGoalsItems.map((item: any, idx: number) => (
                  <div 
                    key={idx} 
                    className="bg-[#090909] p-7 rounded-2xl border border-[#D6DCDC]/15 space-y-3 hover:border-[#A78BFA]/50 transition-colors"
                  >
                    <h3 className="text-lg font-normal text-[#D6DCDC] flex items-center gap-3" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                      <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#D6DCDC]/55 leading-relaxed pl-5 font-normal" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── SECTION 5: CAPABILITIES (Interactive Expandable Accordion List on Scroll/Click) ── */}
        {solution.features && solution.features.length > 0 && (
          <CapabilityAccordionSection solution={solution} />
        )}

        {/* ── SECTION 6: PROCESS (Horizontal Flow Timeline) ── */}
        {solution.processSteps && solution.processSteps.length > 0 && (
          <section className="gsap-reveal border-t border-b border-slate-200 dark:border-[#D6DCDC]/10 py-20 lg:py-28 text-left">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="max-w-3xl space-y-4 mb-16">
                <div className="flex items-center gap-3">
                  <span className="inline-block w-5 h-px bg-[#A78BFA]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A78BFA]" style={{ fontFamily: 'Barlow, sans-serif' }}>
                    METHODOLOGY
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 dark:text-[#D6DCDC] tracking-tight" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                  {solution.processTitle || "Our Website Development Process"}
                </h2>
              </div>

              {/* Horizontal Timeline Component */}
              <ProcessHorizontalTimeline steps={solution.processSteps} />
            </div>
          </section>
        )}

        {/* ── SECTION 7: ECOSYSTEM (Split List View) ── */}
        {solution.ecosystemItems && solution.ecosystemItems.length > 0 && (
          <section className="gsap-reveal max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28 text-left">
            <div className="max-w-3xl space-y-4 mb-16">
              <div className="flex items-center gap-3">
                <span className="inline-block w-5 h-px bg-[#A78BFA]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A78BFA]" style={{ fontFamily: 'Barlow, sans-serif' }}>
                  DIGITAL ECOSYSTEM
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 dark:text-[#D6DCDC] tracking-tight" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                {solution.ecosystemTitle || "Your Website Should Work With Your Marketing"}
              </h2>
            </div>

            <EcosystemSplitList items={solution.ecosystemItems} />
          </section>
        )}

        {/* ── SECTION 8: TRACK RECORD HERO (Banner Style) ── */}
        {solution.trackRecord && (
          <section className="gsap-reveal max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28 text-left">
            <div className="bg-[#0B0B0B] p-10 sm:p-14 md:p-16 rounded-[36px] border border-[#D6DCDC]/15 flex flex-col lg:flex-row lg:items-center justify-between gap-10 shadow-2xl">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="inline-block w-5 h-px bg-[#A78BFA]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A78BFA]" style={{ fontFamily: 'Barlow, sans-serif' }}>
                    PROVEN TRACK RECORD
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-normal text-white dark:text-[#D6DCDC] tracking-tight" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                  {solution.trackRecord.title}
                </h2>
                
                <p className="text-[#D6DCDC]/60 text-base sm:text-lg leading-relaxed font-normal" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                  {solution.trackRecord.desc}
                </p>
              </div>

              <div className="shrink-0">
                <a 
                  href="/contact"
                  className="inline-flex justify-center items-center rounded-full bg-[#A78BFA] text-black hover:bg-[#B89FFF] px-8 py-4 text-xs font-semibold uppercase tracking-widest transition-all shadow-lg shadow-[#A78BFA]/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '0.1em' }}
                >
                  {solution.trackRecord.ctaText || "VIEW OUR WORK"} →
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ── SECTION 9: ACCORDION FAQ ── */}
        {solution.faqs && solution.faqs.length > 0 && (
          <section className="gsap-reveal border-t border-slate-200 dark:border-[#D6DCDC]/10 py-20 lg:py-28 text-left">
            <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block w-5 h-px bg-[#A78BFA]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A78BFA]" style={{ fontFamily: 'Barlow, sans-serif' }}>
                    FAQ
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 dark:text-[#D6DCDC] tracking-tight" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                  {solution.faqsTitle || "Frequently Asked Questions"}
                </h2>
              </div>

              <div className="border-t border-[#D6DCDC]/10">
                {solution.faqs.map((faq: any, idx: number) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div key={idx} className="border-b border-[#D6DCDC]/10">
                      <button
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
                      >
                        <span className="text-lg md:text-xl font-normal text-[#D6DCDC] pr-6 transition-colors group-hover:text-[#A78BFA]" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                          {faq.question}
                        </span>
                        <span className="text-[#A78BFA] font-mono text-2xl shrink-0" style={{ fontFamily: 'Barlow, sans-serif' }}>
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="pb-6 text-base text-[#D6DCDC]/60 leading-relaxed max-w-3xl font-normal" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── SECTION 10: FINAL DISCOVERY CTA ── */}
        <SolutionsDetailsCta 
          title={solution.ctaBlock?.title || "Build a Website That Moves Your Business Forward"} 
          desc={solution.ctaBlock?.desc || "Your website is an investment in how your business is discovered, understood, trusted, and chosen. Let's build one that makes that investment count."} 
        />

      </main>

      <FooterPage />
    </div>
  );
}

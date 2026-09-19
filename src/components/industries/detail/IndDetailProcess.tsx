'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { IndustryDetailContent } from './industryDetailData';

export default function IndDetailProcess({ data }: { data: IndustryDetailContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (window.innerWidth < 1024) return; // Desktop pin scroll lock only

      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!triggerRef.current) return;

      ctx = gsap.context(() => {
        if (!triggerRef.current) return;
        ScrollTrigger.create({
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              Math.floor(self.progress * data.processSteps.length),
              data.processSteps.length - 1
            );
            setActiveStepIndex(idx);
          },
        });
      }, triggerRef);
    };

    run();
    return () => {
      if (ctx) ctx.revert();
    };
  }, [data.processSteps.length]);

  return (
    <section
      ref={sectionRef}
      id="industry-detail-process"
      className="w-full bg-[#111111] text-white relative overflow-hidden"
      aria-label="Our Process"
    >
      {/* ── DESKTOP PINNED SCROLL-LOCK CONTAINER ── */}
      <div ref={triggerRef} className="hidden lg:flex w-full min-h-screen items-center pt-24 pb-16 box-border">
        <div className="max-w-[1440px] mx-auto w-full px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: Headlines & CTA (~45%) */}
            <div className="lg:col-span-5 space-y-8 z-10">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/70 font-semibold">
                  {data.processEyebrow}
                </span>
              </div>

              <h2 className="text-[40px] sm:text-[56px] lg:text-[66px] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
                {data.processHeadingLines.map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < data.processHeadingLines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h2>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal max-w-[460px]">
                {data.processBody}
              </p>

              <div className="pt-2">
                <Link
                  href={data.processCtaHref}
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-[#111111] hover:bg-white/90 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md"
                >
                  <span>{data.processCtaText}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: Spatial Staircase with Active Highlight */}
            <div className="lg:col-span-7 relative flex flex-col justify-center">
              <div className="space-y-3 sm:space-y-4">
                {data.processSteps.map((step, idx) => {
                  const isActive = idx === activeStepIndex;
                  const isPast = idx < activeStepIndex;

                  return (
                    <div
                      key={idx}
                      className={`group relative p-5 sm:p-6 rounded-xl transition-all duration-500 flex items-center justify-between cursor-pointer border ${
                        isActive
                          ? 'bg-[#222222] border-white/50 text-white shadow-2xl scale-[1.02] z-20'
                          : isPast
                          ? 'bg-[#181818] border-white/15 text-white/90 opacity-80'
                          : 'bg-[#141414] border-white/10 text-white/60 opacity-60 hover:opacity-90'
                      }`}
                      style={{
                        marginLeft: `${idx * 4.5}%`
                      }}
                      onClick={() => setActiveStepIndex(idx)}
                      onMouseEnter={() => setActiveStepIndex(idx)}
                    >
                      <div className="flex items-center gap-4 sm:gap-6">
                        <span className={`text-xs font-mono font-bold transition-colors ${
                          isActive ? 'text-white' : 'text-white/60'
                        }`}>
                          {step.number}
                        </span>
                        <div>
                          <h4 className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                            isActive ? 'text-white' : 'text-white/90'
                          }`}>
                            {step.title}
                          </h4>
                          {step.subtitle && (
                            <p className={`text-xs font-normal mt-0.5 transition-colors ${
                              isActive ? 'text-white/80' : 'text-white/60'
                            }`}>
                              {step.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <span className={`text-xs font-mono uppercase tracking-widest transition-colors ${
                        isActive ? 'text-white/90' : 'text-white/50'
                      }`}>
                        Step 0{idx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Handwritten Cursive Annotation Overlay */}
              {data.processAnnotation && (
                <div className="mt-8 text-right pointer-events-none">
                  <p className="font-serif italic text-white/80 text-lg sm:text-xl lg:text-2xl leading-snug">
                    {data.processAnnotation}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── MOBILE UNPINNED FALLBACK ── */}
      <div className="block lg:hidden px-6 sm:px-10 py-20">
        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/70 font-semibold">
              {data.processEyebrow}
            </span>
          </div>

          <h2 className="text-[36px] sm:text-[48px] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
            {data.processHeadingLines.map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < data.processHeadingLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>

          <p className="text-base text-white/80 leading-relaxed font-normal">
            {data.processBody}
          </p>

          <div>
            <Link
              href={data.processCtaHref}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-[#111111] text-xs font-semibold tracking-wide"
            >
              <span>{data.processCtaText}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {data.processSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#1D1D1D] border border-white/15 flex items-center justify-between text-white"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-white/70 font-bold">{step.number}</span>
                <div>
                  <h4 className="text-base font-bold text-white">{step.title}</h4>
                  {step.subtitle && <p className="text-xs text-white/70 mt-0.5">{step.subtitle}</p>}
                </div>
              </div>
              <span className="text-xs font-mono text-white/50 uppercase">Step 0{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

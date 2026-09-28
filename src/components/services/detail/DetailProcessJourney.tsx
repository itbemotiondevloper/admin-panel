'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SolutionDetailData } from './solutionData';

export default function DetailProcessJourney({ data }: { data: SolutionDetailData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (window.innerWidth < 1024) return; // Desktop pin only

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
  }, [data]);

  return (
    <section
      ref={sectionRef}
      id="process-journey"
      className="w-full bg-[#111111] text-white relative overflow-hidden"
      aria-label="Our Approach"
    >
      {/* ── DESKTOP PINNED CONTAINER ── */}
      <div ref={triggerRef} className="w-full min-h-screen flex items-center pt-24 pb-16 box-border">
        <div className="max-w-[1440px] mx-auto w-full px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* ── LEFT COLUMN ── */}
            <div className="lg:col-span-5 flex flex-col z-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] font-bold text-[#888] uppercase tracking-[0.2em]">04</span>
                <span className="w-4 h-px bg-[#444]" />
                <span className="text-[10px] font-bold text-[#888] uppercase tracking-[0.2em]">OUR APPROACH</span>
              </div>

              <h2
                className="font-bold text-white leading-[0.92] tracking-[-0.04em] mb-6"
                style={{
                  fontSize: 'clamp(38px, 4.5vw, 72px)',
                  fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif',
                }}
              >
                {data.processTitleLines.map((line, idx) => (
                  <span key={idx} className="block">
                    {line}
                  </span>
                ))}
              </h2>

              <p
                className="text-[15px] text-[#aaa] leading-relaxed mb-8 max-w-sm"
                style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
              >
                {data.processSubhead}
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#111] text-[13px] font-semibold rounded-full px-7 py-3 hover:bg-[#eee] transition-colors duration-200 w-fit"
                style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
              >
                Explore Our Process &rarr;
              </Link>
            </div>

            {/* ── RIGHT COLUMN — Spatial Staircase ── */}
            <div className="lg:col-span-7 relative flex flex-col justify-center">
              
              <div className="relative w-full flex flex-col gap-3 py-4">
                {data.processSteps.map((step, idx) => {
                  const isActive = idx === activeStepIndex;
                  const isPast = idx < activeStepIndex;
                  const stepIndent = `${idx * 6}%`;

                  return (
                    <div
                      key={step.number}
                      style={{ marginLeft: stepIndent }}
                      className={`relative rounded-xl px-6 py-4 transition-all duration-500 cursor-pointer border ${
                        isActive
                          ? 'bg-[#222222] border-white/40 text-white shadow-2xl scale-[1.02] z-20'
                          : isPast
                          ? 'bg-[#181818] border-white/10 text-white/80 opacity-70'
                          : 'bg-[#141414] border-white/5 text-white/40 opacity-40 hover:opacity-75'
                      }`}
                      onClick={() => setActiveStepIndex(idx)}
                      onMouseEnter={() => setActiveStepIndex(idx)}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[11px] font-bold text-[#888]">
                          {step.number}
                        </span>

                        <h3
                          className="text-[17px] sm:text-[20px] font-bold tracking-tight"
                          style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
                        >
                          {step.title}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="absolute top-0 right-4 max-w-[160px] hidden sm:block">
                <p
                  className="text-white/70 text-[13px] leading-tight text-right italic font-medium"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  A clear path to<br />a stronger<br />tomorrow.
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

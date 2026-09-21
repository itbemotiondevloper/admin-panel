'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { SolutionDetailData } from './solutionData';

export default function DetailWhyMatters({ data }: { data: SolutionDetailData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftVisualRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any = null;
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        if (leftVisualRef.current) {
          gsap.from(leftVisualRef.current, {
            opacity: 0,
            x: -24,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          });
        }

        if (rightTextRef.current) {
          gsap.from(rightTextRef.current, {
            opacity: 0,
            y: 28,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          });
        }
      }, sectionRef);
    };

    run();
    return () => {
      if (ctx) ctx.revert();
    };
  }, [data]);

  return (
    <section
      ref={sectionRef}
      id="why-it-matters"
      className="w-full bg-[#F8F8F5] py-20 md:py-28 border-b border-[rgba(17,17,17,0.06)] overflow-hidden"
      aria-label="Why It Matters"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* ── LEFT: Architectural Photographic Visual with Overlay Text (Matches Approved Image) ── */}
          <div ref={leftVisualRef} className="lg:col-span-6 relative">
            <div className="relative rounded-xl overflow-hidden aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] w-full bg-[#E5E5E0] border border-[rgba(17,17,17,0.08)] shadow-md">
              <Image
                src="/abouthero.jpeg"
                alt="Architectural modern concrete building & clean geometry"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-black/35" />

              {/* Text Overlay — matches approved "GOOD WEBSITES CREATE OPPORTUNITIES" */}
              <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-center z-10">
                <h3
                  className="text-white font-bold tracking-tight uppercase leading-[0.93] text-[34px] sm:text-[44px] lg:text-[50px] max-w-xs drop-shadow-md"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
                >
                  {data.whyOverlayText.map((line, idx) => (
                    <span key={idx} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Text & Minimal 3 Key Points (Matches Approved Image) ── */}
          <div ref={rightTextRef} className="lg:col-span-6 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-bold text-[#777] uppercase tracking-[0.2em]">02</span>
              <span className="w-4 h-px bg-[#ccc]" />
              <span className="text-[10px] font-bold text-[#777] uppercase tracking-[0.2em]">WHY IT MATTERS</span>
            </div>

            <h2
              className="font-bold text-[#111] leading-[0.92] tracking-[-0.04em] mb-6"
              style={{
                fontSize: 'clamp(36px, 4.2vw, 72px)',
                fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif',
              }}
            >
              {data.whyTitleLines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p
              className="text-[15.5px] text-[#676767] leading-relaxed mb-10 max-w-lg"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
            >
              {data.whyBody}
            </p>

            {/* 3 Simple Value Points (Minimal, No long marketing paragraphs) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[rgba(17,17,17,0.10)]">
              {data.whyPoints.map((pt, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <h4
                    className="text-[14px] font-bold text-[#111] leading-snug"
                    style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
                  >
                    {pt}
                  </h4>
                  <span className="text-[11px] text-[#888] font-medium">Core Value 0{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

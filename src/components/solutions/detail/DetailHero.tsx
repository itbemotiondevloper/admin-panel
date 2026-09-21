'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SolutionDetailData } from './solutionData';

export default function DetailHero({ data }: { data: SolutionDetailData }) {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const sideTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { gsap } = await import('gsap');

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.2)
        .fromTo(h1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, 0.35)
        .fromTo(bodyRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.7)
        .fromTo(ctaRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, 0.9)
        .fromTo(visualRef.current, { opacity: 0, scale: 0.97, y: 24 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power4.out' }, 0.4)
        .fromTo(sideTextRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.1);
    };

    run();
  }, [data]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full bg-[#F8F8F5] py-20 lg:py-28 min-h-[90vh] flex flex-col justify-center border-b border-[rgba(17,17,17,0.06)] overflow-hidden"
      aria-label={data.badge}
    >
      {/* Right Edge Vertical Annotation — Matches Approved Design Header Right */}
      <div
        ref={sideTextRef}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col items-center gap-6 opacity-0"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-1 text-right">
          <span
            className="text-[9.5px] tracking-[0.22em] text-[#999] uppercase font-medium"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif',
            }}
          >
            STRATEGY &bull; DESIGN &bull; DEVELOPMENT &bull; GROWTH
          </span>
          <span
            className="text-[11px] text-[#777] italic font-serif mt-2"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontFamily: 'Georgia, serif',
            }}
          >
            A Website That Works Harder.
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5 pt-4">
          <div className="w-px h-8 bg-[rgba(17,17,17,0.15)] relative overflow-hidden">
            <div className="animate-scroll-line absolute inset-x-0 top-0 h-4 bg-[#111]" />
          </div>
          <span className="text-[9px] tracking-[0.18em] text-[#aaa] uppercase font-mono">Scroll</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">

          {/* ── LEFT COLUMN (~45% Width) — Matches Approved Typography Layout ── */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col z-10">
            {/* Eyebrow */}
            <div ref={badgeRef} className="flex items-center gap-3 mb-6 opacity-0">
              <span className="w-4 h-px bg-[#111]" />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#777]"
                style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
              >
                {data.badge}
              </span>
            </div>

            {/* Headline with 4 lines matching approved reference image */}
            <h1
              ref={h1Ref}
              className="opacity-0 font-bold text-[#111] leading-[0.93] tracking-[-0.04em] mb-6"
              style={{
                fontSize: 'clamp(52px, 6vw, 104px)',
                fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif',
              }}
            >
              {data.heroTitleLines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Supporting Copy */}
            <div ref={bodyRef} className="opacity-0 mb-8 max-w-[420px]">
              <p
                className="text-[15.5px] leading-relaxed text-[#676767]"
                style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
              >
                {data.intro}
              </p>
            </div>

            {/* CTAs */}
            <div ref={ctaRef} className="opacity-0 flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-[#111] text-white text-[13px] font-semibold rounded-full px-7 py-3.5 hover:bg-[#222] transition-colors duration-200 shadow-xs group"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
                >
                  {data.primaryCtaText}
                  <span className="text-[14px] group-hover:translate-x-1 transition-transform">→</span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 text-[13px] font-semibold text-[#111] hover:text-[#A78BFA] transition-colors duration-200 px-3 py-3 group"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
                >
                  <span className="w-7 h-7 rounded-full border border-[#111] flex items-center justify-center text-[10px] group-hover:bg-[#111] group-hover:text-white transition-all">
                    ▶
                  </span>
                  {data.secondaryCtaText}
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex -space-x-1.5">
                  {['#111111', '#555555', '#D4C5A9', '#999999'].map((color, idx) => (
                    <div
                      key={idx}
                      className="w-5 h-5 rounded-full border-2 border-[#F8F8F5]"
                      style={{ background: color }}
                    />
                  ))}
                </div>
                <span
                  className="text-[11.5px] text-[#888] font-medium"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
                >
                  {data.trustText}
                </span>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN — Physical Concrete Plinth & Laptop/Phone Device Mockup ── */}
          <div ref={visualRef} className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center opacity-0 mt-6 lg:mt-0">
            <div className="relative w-full max-w-[620px] aspect-[4/3] flex items-center justify-center">
              
              {/* Studio Concrete / Stone Plinth Base (Matches Approved Photography) */}
              <div className="absolute inset-x-2 bottom-2 h-[45%] bg-[#E5E5E0] rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-[rgba(17,17,17,0.08)] transform rotate-[-1deg]" />

              {/* Physical Silver Laptop Frame Mockup */}
              <div className="relative z-10 w-[88%] aspect-[16/10] bg-[#0A0A0A] rounded-xl p-2 shadow-2xl border border-white/20 transform rotate-[1deg] transition-transform duration-500 hover:scale-[1.01]">
                {/* Screen bezel */}
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#F8F8F5]">
                  <Image
                    src="/hero-device.jpg"
                    alt="Quest For Tech — Websites That Work for Your Business"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Overlapping Mobile Smartphone Device (Right) */}
              <div className="absolute -bottom-1 right-2 sm:right-6 w-[150px] sm:w-[175px] aspect-[9/18] rounded-[22px] bg-[#0A0A0A] p-2 shadow-2xl border border-white/20 z-20 transform rotate-[-2deg] transition-transform duration-500 hover:rotate-[0deg]">
                <div className="relative w-full h-full rounded-[16px] overflow-hidden bg-[#F8F8F5]">
                  <Image
                    src="/svc-web.jpg"
                    alt="Responsive Mobile Web UX"
                    fill
                    priority
                    sizes="200px"
                    className="object-cover"
                  />
                  {/* Floating overlay text on mobile screen matching reference */}
                  <div className="absolute inset-0 bg-black/20 p-3 flex flex-col justify-end">
                    <div className="bg-white/90 backdrop-blur-md p-2 rounded-lg text-left">
                      <span className="text-[8px] font-bold text-[#111] uppercase tracking-wider block">MOBILE UX</span>
                      <span className="text-[10px] font-bold text-[#111] block leading-tight">Ideas into Impact.</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

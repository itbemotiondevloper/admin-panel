'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TAGS = [
  { text: '01 Website Dev', color: 'bg-[#111] text-white' },
  { text: '02 SEO & Visibility', color: 'bg-white text-[#111] border border-[rgba(17,17,17,0.12)]' },
  { text: '03 Content Strategy', color: 'bg-white text-[#111] border border-[rgba(17,17,17,0.12)]' },
  { text: '04 Performance', color: 'bg-white text-[#111] border border-[rgba(17,17,17,0.12)]' },
  { text: '05 Custom Systems', color: 'bg-[#4F6BFF] text-white' },
];

export default function SolutionsHero() {
  const heroRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const primaryImgRef = useRef<HTMLDivElement>(null);
  const layerAnalyticsRef = useRef<HTMLDivElement>(null);
  const layerSeoRef = useRef<HTMLDivElement>(null);
  const layerCodeRef = useRef<HTMLDivElement>(null);
  const sideTextRef = useRef<HTMLDivElement>(null);

  // Mount intro animation + Scroll Choreography
  useEffect(() => {
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Intro Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo(line1Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power4.out' }, 0.5)
        .fromTo(line2Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power4.out' }, 0.65)
        .fromTo(bodyRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.95)
        .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 1.1)
        .fromTo(visualWrapperRef.current, { opacity: 0, scale: 0.94, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 1.3, ease: 'power4.out' }, 0.6)
        .fromTo(sideTextRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.3);

      // Hero Scroll Choreography (Desktop only)
      if (window.innerWidth >= 1024 && heroRef.current) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
            pin: stickyRef.current,
            pinSpacing: false,
          },
        });

        // "Ideas to" moves up and fades faster
        scrollTl.to(line1Ref.current, { y: -80, opacity: 0.2, ease: 'none' }, 0);

        // "Impact." remains visible slightly longer
        scrollTl.to(line2Ref.current, { y: -30, opacity: 0.8, ease: 'none' }, 0);

        // Paragraph fades earlier
        scrollTl.to(bodyRef.current, { y: -40, opacity: 0, ease: 'none' }, 0);

        // CTA moves downward & fades
        scrollTl.to(ctaRef.current, { y: 40, opacity: 0, ease: 'none' }, 0);

        // Visual surfaces separate in depth (parallax differential)
        if (primaryImgRef.current) {
          scrollTl.to(primaryImgRef.current, { scale: 1.04, y: -20, ease: 'none' }, 0);
        }
        if (layerAnalyticsRef.current) {
          scrollTl.to(layerAnalyticsRef.current, { y: -70, x: -20, opacity: 0.95, ease: 'none' }, 0);
        }
        if (layerSeoRef.current) {
          scrollTl.to(layerSeoRef.current, { y: 50, x: 20, ease: 'none' }, 0);
        }
        if (layerCodeRef.current) {
          scrollTl.to(layerCodeRef.current, { y: -100, x: 30, opacity: 0.85, ease: 'none' }, 0);
        }
      }
    };

    run();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full bg-[#F8F8F5] min-h-[140vh] border-b border-[rgba(17,17,17,0.06)]"
      aria-label="Ideas to Impact"
    >
      <div ref={stickyRef} className="sticky top-0 w-full min-h-[100vh] flex flex-col justify-center overflow-hidden">

        {/* Right-edge vertical text */}
        <div
          ref={sideTextRef}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-6 opacity-0"
          aria-hidden
        >
          <span
            className="text-[10px] tracking-[0.22em] text-[#999] uppercase"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontFamily: 'var(--font-plus-jakarta-sans)',
            }}
          >
            Digital Solutions — Ideas to Impact.
          </span>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-px h-8 bg-[rgba(17,17,17,0.12)] relative overflow-hidden">
              <div className="animate-scroll-line absolute inset-x-0 top-0 h-4 bg-[#111]" />
            </div>
            <span className="text-[9px] tracking-[0.18em] text-[#bbb] uppercase">Scroll</span>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto w-full px-8 lg:px-16 pt-24 pb-16">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* ── LEFT COLUMN (Typography) ── */}
            <div className="lg:col-span-6 flex flex-col z-20">
              {/* Eyebrow */}
              <div ref={eyebrowRef} className="flex items-center gap-3 mb-6 opacity-0">
                <span className="w-5 h-px bg-[#111]" />
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#676767]"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  DIGITAL SOLUTIONS
                </span>
              </div>

              {/* Headline — clamp(84px, 9vw, 165px) per directive #9 */}
              <h1
                className="font-bold text-[#111] leading-[0.90] tracking-[-0.04em] mb-8"
                style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
              >
                <span className="block overflow-hidden pb-1">
                  <span
                    ref={line1Ref}
                    className="block opacity-0"
                    style={{ fontSize: 'clamp(64px, 8.5vw, 150px)' }}
                  >
                    Ideas to
                  </span>
                </span>
                <span className="block overflow-hidden pb-2">
                  <span
                    ref={line2Ref}
                    className="block opacity-0 text-[#111]"
                    style={{ fontSize: 'clamp(68px, 9vw, 160px)' }}
                  >
                    Impact.
                  </span>
                </span>
              </h1>

              {/* Body */}
              <div ref={bodyRef} className="opacity-0 mb-8 max-w-[420px]">
                <p
                  className="text-[15.5px] leading-relaxed text-[#676767]"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  Strategy, creativity, technology and data —<br />
                  brought together to help your business grow.
                </p>
              </div>

              {/* CTA + Social Proof */}
              <div ref={ctaRef} className="opacity-0 flex flex-wrap items-center gap-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-[#111] text-white text-[13px] font-semibold rounded-full px-7 py-3.5 hover:bg-[#222] transition-all duration-200 shadow-xs group"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  Let&apos;s Talk
                  <span className="text-[15px] group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['#111111', '#4F6BFF', '#D4C5A9', '#888888'].map((bg, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-[#F8F8F5]"
                        style={{ background: bg }}
                      />
                    ))}
                  </div>
                  <span
                    className="text-[11.5px] text-[#888] font-medium"
                    style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                  >
                    Integrated Digital Capabilities
                  </span>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN — Layered Spatial Visual Ecosystem ── */}
            <div
              ref={visualWrapperRef}
              className="lg:col-span-6 relative flex items-center justify-center opacity-0 mt-8 lg:mt-0"
            >
              <div className="relative w-full max-w-[620px] aspect-[4/3] perspective-1000">

                {/* Background technical code fragment layer */}
                <div
                  ref={layerCodeRef}
                  className="absolute -top-4 -right-4 w-[55%] p-4 bg-[#111] text-[#E0E0E0] rounded-xl shadow-xl z-0 transform rotate-[-2deg] border border-white/10 hidden sm:block"
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    <span className="text-[9px] text-[#888] ml-2 font-mono">architecture.ts</span>
                  </div>
                  <pre className="text-[10px] font-mono leading-tight text-[#888]">
                    <code>
                      <span className="text-[#4F6BFF]">export const</span> system = &#123;<br />
                      &nbsp;&nbsp;strategy: <span className="text-[#27C93F]">&apos;outcomes&apos;</span>,<br />
                      &nbsp;&nbsp;stack: [<span className="text-[#27C93F]">&apos;web&apos;</span>, <span className="text-[#27C93F]">&apos;seo&apos;</span>, <span className="text-[#27C93F]">&apos;ai&apos;</span>]<br />
                      &#125;;
                    </code>
                  </pre>
                </div>

                {/* Secondary Analytics Panel layer (behind, left offset) */}
                <div
                  ref={layerAnalyticsRef}
                  className="absolute bottom-4 -left-4 w-[60%] p-4 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-[rgba(17,17,17,0.08)] z-10 hidden sm:block transform rotate-[1deg]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-[#111] uppercase tracking-wider">Organic Growth</span>
                    <span className="text-[10px] font-semibold text-[#10B981] bg-[#F0FFF4] px-2 py-0.5 rounded">+142% YoY</span>
                  </div>
                  <div className="h-14 w-full flex items-end gap-1.5 pt-2">
                    {[35, 45, 40, 65, 55, 80, 75, 95, 90, 110].map((val, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-[#111] rounded-t-xs transition-all duration-300"
                        style={{ height: `${val}%`, opacity: 0.3 + (idx / 10) * 0.7 }}
                      />
                    ))}
                  </div>
                </div>

                {/* Primary Browser Surface (Front layer) */}
                <div
                  ref={primaryImgRef}
                  className="relative z-20 w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[rgba(17,17,17,0.10)] bg-white transform transition-transform duration-500"
                >
                  {/* Browser top header */}
                  <div className="w-full bg-[#F3F3EF] px-4 py-2.5 flex items-center justify-between border-b border-[rgba(17,17,17,0.06)]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#E5E5E0]" />
                      <span className="w-3 h-3 rounded-full bg-[#E5E5E0]" />
                      <span className="w-3 h-3 rounded-full bg-[#E5E5E0]" />
                    </div>
                    <div className="bg-white/80 px-4 py-1 rounded-md text-[10px] font-medium text-[#676767] tracking-wide border border-[rgba(17,17,17,0.06)]">
                      questfortech.com / solutions
                    </div>
                    <div className="w-12" />
                  </div>

                  {/* Visual container */}
                  <div className="relative w-full h-[calc(100%-37px)] bg-[#F8F8F5]">
                    <Image
                      src="/hero-digital-ecosystem.jpg"
                      alt="Quest For Tech Layered Digital Ecosystem — Strategy, Web, SEO, Performance and Custom Systems"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center"
                    />
                  </div>
                </div>

                {/* Floating SEO pill (front right overlay) */}
                <div
                  ref={layerSeoRef}
                  className="absolute -bottom-3 right-6 z-30 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-[rgba(17,17,17,0.10)] flex items-center gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-[#4F6BFF] animate-pulse" />
                  <span className="text-[11px] font-semibold text-[#111]" style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}>
                    Search Visibility: <span className="text-[#4F6BFF]">Top 1% Rank</span>
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}


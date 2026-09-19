'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { INDUSTRIES_PAGE_DATA } from './industriesData';

const SECTOR_TAGS = [
  'Hospitality & Dining',
  'E-Commerce & Retail',
  'SaaS & Enterprise',
  'Healthcare & MedTech',
  'Professional Services',
  'Real Estate & Build',
];

export default function IndustryHero() {
  const { hero } = INDUSTRIES_PAGE_DATA;
  const heroRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { gsap } = await import('gsap');

      if (!heroRef.current) return;

      ctx = gsap.context(() => {
        const elements = heroRef.current?.querySelectorAll('[data-hero-reveal]');
        if (elements?.length) {
          gsap.fromTo(
            elements,
            { opacity: 0, y: 35, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.1,
              ease: 'power3.out',
            }
          );
        }

        if (cardRef.current) {
          gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 45, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              delay: 0.25,
              ease: 'power4.out',
            }
          );
        }
      }, heroRef);
    };

    run();
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 bg-[#F8F8F5] text-[#111111] overflow-hidden border-b border-[#111111]/10"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-6 space-y-7 z-10">
            {/* Eyebrow badge */}
            <div data-hero-reveal className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#111111]/10 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#4F6BFF] animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#555] font-bold">
                {hero.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1 
              data-hero-reveal
              className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[62px] font-bold leading-[0.96] tracking-[-0.04em] text-[#111111]"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
            >
              Different Industries.<br />
              <span className="text-[#4F6BFF]">One Growth Engine.</span>
            </h1>

            {/* Supporting Copy */}
            <p
              data-hero-reveal
              className="text-base sm:text-[17px] text-[#555555] leading-relaxed max-w-[520px] font-normal"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
            >
              {hero.body}
            </p>

            {/* Sector Tags Pills */}
            <div data-hero-reveal className="flex flex-wrap gap-2 pt-1 max-w-lg">
              {SECTOR_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="text-[11.5px] font-semibold text-[#333] bg-white/90 border border-[#111111]/08 px-3 py-1 rounded-full shadow-2xs hover:border-[#4F6BFF] hover:text-[#4F6BFF] transition-colors duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div data-hero-reveal className="flex items-center gap-4 pt-3">
              <Link
                href={hero.ctaHref}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#111111] hover:bg-[#4F6BFF] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
              >
                <span>{hero.ctaText}</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Layered Visual & Glassmorphism Badges */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            <div ref={cardRef} className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#EBEBE6] border border-[#111111]/12 group">
              <div className="aspect-[16/11] sm:aspect-[16/10] w-full relative">
                <img
                  src={hero.image}
                  alt="Quest For Tech Industries Architecture"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                />
                
                {/* Soft daylight gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />

                {/* Top Left Floating Badge */}
                <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/30 shadow-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="text-[11px] font-mono font-bold text-[#111] uppercase tracking-wider">
                    6 Sector Hubs
                  </span>
                </div>

                {/* Bottom Left Floating Stats Card */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/40 shadow-xl max-w-[240px] hidden sm:block">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-[#4F6BFF] uppercase tracking-wider">PROVEN IMPACT</span>
                  </div>
                  <p className="text-[20px] font-bold text-[#111] tracking-tight leading-none mb-1">
                    +240% Growth
                  </p>
                  <p className="text-[11px] text-[#666] leading-tight">
                    Average revenue expansion across enterprise industry clients.
                  </p>
                </div>

                {/* Top Right Cursive Editorial Overlay */}
                <div className="absolute top-6 right-6 text-right pointer-events-none">
                  <p className="font-serif italic text-white/95 text-xl sm:text-2xl leading-snug drop-shadow-md">
                    Targeted.<br />
                    Scalable.<br />
                    <span className="underline decoration-white/50 underline-offset-4">Proven.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

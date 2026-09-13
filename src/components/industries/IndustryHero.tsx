'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { INDUSTRIES_PAGE_DATA } from './industriesData';

export default function IndustryHero() {
  const { hero } = INDUSTRIES_PAGE_DATA;

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 lg:pt-44 lg:pb-28 bg-[#F8F8F5] text-[#111111] overflow-hidden border-b border-[#111111]/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: ~42% (5 cols on lg) */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-7 z-10">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#111111]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#666666] font-semibold">
                {hero.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1 
              className="text-[44px] sm:text-[60px] md:text-[72px] lg:text-[78px] font-semibold leading-[0.95] tracking-[-0.04em] text-[#111111]"
            >
              Different<br />
              Industries.<br />
              Different Challenges.<br />
              One Digital Partner.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#666666] leading-relaxed max-w-[500px] font-normal">
              {hero.body}
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href={hero.ctaHref}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#111111] hover:bg-[#333333] text-white text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span>{hero.ctaText}</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Architectural Visual & Overlay Annotation (~58%) */}
          <div className="lg:col-span-7 xl:col-span-7 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#EBEBE6] border border-[#111111]/10 group">
              <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full relative">
                <img
                  src={hero.image}
                  alt="Quest For Tech Industries Architecture"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                
                {/* Soft daylight gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent pointer-events-none" />

                {/* Building Wall Typography (Simulated architectural branding) */}
                <div className="absolute top-1/3 right-12 text-right pointer-events-none hidden md:block opacity-75">
                  <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-white/90 leading-relaxed font-bold drop-shadow-md">
                    INDUSTRIES<br />
                    IDEAS<br />
                    PEOPLE<br />
                    GROWTH
                  </p>
                </div>
                
                {/* Top Right Cursive Editorial Annotation Overlay */}
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-right pointer-events-none">
                  <p className="font-serif italic text-white/95 text-xl sm:text-2xl lg:text-3xl leading-snug drop-shadow-md">
                    More<br />
                    Possibilities<br />
                    <span className="underline decoration-white/50 underline-offset-4">Together.</span>
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

'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { INDUSTRIES_PAGE_DATA } from './industriesData';

export default function IndustryCaseStudies() {
  const { caseStudies } = INDUSTRIES_PAGE_DATA;
  const primaryItem = caseStudies.items.find(i => i.isPrimary) || caseStudies.items[0];
  const secondaryItem = caseStudies.items.find(i => !i.isPrimary) || caseStudies.items[1];

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-[#F8F8F5] text-[#111111] border-b border-[#111111]/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#111111]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#666666] font-semibold">
                {caseStudies.eyebrow}
              </span>
            </div>
            <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-semibold leading-[1.05] tracking-[-0.03em] text-[#111111]">
              Featured Work
            </h2>
          </div>

          <Link
            href={caseStudies.ctaHref}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#111111] hover:text-[#333333] transition-colors"
          >
            <span>{caseStudies.ctaText}</span>
          </Link>
        </div>

        {/* ASYMMETRICAL CASE STUDY GRID (65% Primary, 35% Secondary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* PRIMARY CASE STUDY (~65% / 8 cols) */}
          {primaryItem && (
            <Link
              href={primaryItem.link}
              className="lg:col-span-8 group block relative rounded-xl overflow-hidden bg-[#EBEBE6] border border-[#111111]/10 p-6 sm:p-10 flex flex-col justify-between min-h-[400px] sm:min-h-[460px]"
            >
              <img
                src={primaryItem.image}
                alt={primaryItem.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

              {/* TOP TAG */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-mono uppercase tracking-wider">
                  {primaryItem.industryTag}
                </span>

                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#111111] transition-all duration-300">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              {/* BOTTOM CONTENT */}
              <div className="relative z-10 space-y-2.5 max-w-xl text-white">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
                  {primaryItem.title}
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                  {primaryItem.summary}
                </p>
              </div>
            </Link>
          )}

          {/* SECONDARY CASE STUDY (~35% / 4 cols) */}
          {secondaryItem && (
            <Link
              href={secondaryItem.link}
              className="lg:col-span-4 group block relative rounded-xl overflow-hidden bg-[#EBEBE6] border border-[#111111]/10 p-6 sm:p-8 flex flex-col justify-between min-h-[340px] sm:min-h-[460px]"
            >
              <img
                src={secondaryItem.image}
                alt={secondaryItem.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

              {/* TOP TAG */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-mono uppercase tracking-wider">
                  {secondaryItem.industryTag}
                </span>

                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#111111] transition-all duration-300">
                  <ArrowUpRight size={15} />
                </div>
              </div>

              {/* BOTTOM CONTENT */}
              <div className="relative z-10 space-y-2 text-white">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight leading-tight">
                  {secondaryItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light line-clamp-3">
                  {secondaryItem.summary}
                </p>
              </div>
            </Link>
          )}

        </div>

      </div>
    </section>
  );
}

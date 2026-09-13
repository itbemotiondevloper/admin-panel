'use client';

import React from 'react';
import { INDUSTRIES_PAGE_DATA } from './industriesData';

export default function IndustryStats() {
  const { stats } = INDUSTRIES_PAGE_DATA;

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-[#F8F8F5] text-[#111111] border-b border-[#111111]/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* SECTION HEADER WITH RIGHT SUPPORTING PARAGRAPH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 lg:mb-16 items-end">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#111111]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#666666] font-semibold">
                {stats.eyebrow}
              </span>
            </div>
            <h2 className="text-[36px] sm:text-[48px] lg:text-[54px] font-semibold leading-[0.98] tracking-[-0.04em] text-[#111111]">
              Real Businesses.<br />
              Real Growth.
            </h2>
          </div>

          <div className="lg:col-span-6 lg:pl-12">
            <p className="text-base sm:text-lg text-[#666666] leading-relaxed max-w-[500px]">
              {stats.subhead}
            </p>
          </div>
        </div>

        {/* HORIZONTAL STATS ROW WITH THIN DIVIDERS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-[#111111]/10">
          {stats.items.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-[40px] sm:text-[52px] lg:text-[64px] font-semibold tracking-[-0.04em] leading-none text-[#111111]">
                {stat.number}
              </p>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#666666]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

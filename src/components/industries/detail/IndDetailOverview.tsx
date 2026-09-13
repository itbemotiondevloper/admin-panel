'use client';

import React from 'react';
import { IndustryDetailContent } from './industryDetailData';

export default function IndDetailOverview({ data }: { data: IndustryDetailContent }) {
  return (
    <section className="py-24 sm:py-28 lg:py-32 bg-[#F8F8F5] text-[#111111] border-b border-[#111111]/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Large Editorial Image (~50%) */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-[#EBEBE6] border border-[#111111]/10 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
            <img
              src={data.overviewImage}
              alt={data.industryName}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Embedded Text Overlay */}
            {data.overviewImageOverlayText && (
              <div className="absolute bottom-8 left-8 text-white max-w-[280px] pointer-events-none">
                <h4 className="text-lg sm:text-xl font-bold tracking-tight leading-snug">
                  {data.overviewImageOverlayText.join(" ")}
                </h4>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Content (~50%) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#111111]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#666666] font-semibold">
                {data.overviewEyebrow}
              </span>
            </div>

            <h2 className="text-[36px] sm:text-[48px] lg:text-[54px] font-semibold leading-[0.98] tracking-[-0.04em] text-[#111111]">
              {data.overviewHeadingLines.map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < data.overviewHeadingLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>

            <p className="text-base sm:text-lg text-[#666666] leading-relaxed font-normal max-w-[540px]">
              {data.overviewBody}
            </p>

            {/* 3 Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#111111]/10">
              {data.overviewPoints.map((point, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#111111] mb-2" />
                  <p className="text-sm font-semibold text-[#111111] tracking-tight">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

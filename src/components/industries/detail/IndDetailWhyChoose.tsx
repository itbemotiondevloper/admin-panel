'use client';

import React from 'react';
import { IndustryDetailContent } from './industryDetailData';

export default function IndDetailWhyChoose({ data }: { data: IndustryDetailContent }) {
  return (
    <section className="py-24 sm:py-28 lg:py-32 bg-white text-[#111111] border-b border-[#111111]/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Headlines (~45%) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#111111]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#666666] font-semibold">
                {data.whyChooseEyebrow}
              </span>
            </div>

            <h2 className="text-[36px] sm:text-[48px] lg:text-[54px] font-semibold leading-[0.98] tracking-[-0.04em] text-[#111111]">
              {data.whyChooseHeadingLines.map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < data.whyChooseHeadingLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>

            <p className="text-base sm:text-lg text-[#666666] leading-relaxed max-w-[480px]">
              {data.whyChooseBody}
            </p>
          </div>

          {/* RIGHT COLUMN: Feature Items with Thin Dividers (~55%) */}
          <div className="lg:col-span-7 divide-y divide-[#111111]/10 border-t border-b border-[#111111]/10">
            {data.whyChooseItems.map((item, idx) => (
              <div key={idx} className="py-6 sm:py-8 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#888888] font-semibold">
                    {item.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111111]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#666666] leading-relaxed font-light pl-7">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

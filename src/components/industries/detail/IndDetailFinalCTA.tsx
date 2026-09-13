'use client';

import React from 'react';
import Link from 'next/link';
import { IndustryDetailContent } from './industryDetailData';

export default function IndDetailFinalCTA({ data }: { data: IndustryDetailContent }) {
  return (
    <section className="relative py-24 sm:py-28 lg:py-36 bg-[#F8F8F5] text-[#111111] overflow-hidden border-b border-[#111111]/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN (~50%) */}
          <div className="lg:col-span-6 space-y-7">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#111111]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#666666] font-semibold">
                {data.finalCtaEyebrow}
              </span>
            </div>

            <h2 className="text-[44px] sm:text-[56px] lg:text-[68px] font-semibold leading-[0.95] tracking-[-0.04em] text-[#111111]">
              {data.finalCtaHeadingLines.map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < data.finalCtaHeadingLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>

            <p className="text-base sm:text-lg text-[#666666] leading-relaxed max-w-[480px] font-normal">
              {data.finalCtaBody}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={data.finalCtaPrimaryHref}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#111111] hover:bg-[#333333] text-white text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span>{data.finalCtaPrimaryText}</span>
              </Link>

              <Link
                href={data.finalCtaSecondaryHref}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#111111]/25 hover:border-[#111111] text-[#111111] text-xs sm:text-sm font-medium tracking-wide transition-all duration-300"
              >
                <span>{data.finalCtaSecondaryText}</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN (~50%) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden bg-[#EBEBE6] border border-[#111111]/10 group">
              <img
                src={data.finalCtaImage}
                alt={data.industryName}
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
              />
              
              {/* Soft light overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent pointer-events-none" />

              {/* Handwritten Cursive Annotation Overlay */}
              {data.finalCtaAnnotationLines && (
                <div className="absolute bottom-8 right-8 text-right pointer-events-none hidden sm:block">
                  <p className="font-serif italic text-[#111111]/85 text-xl sm:text-2xl lg:text-3xl leading-snug drop-shadow-sm">
                    {data.finalCtaAnnotationLines.map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx < data.finalCtaAnnotationLines.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

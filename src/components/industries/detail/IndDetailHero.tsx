'use client';

import React from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { IndustryDetailContent } from './industryDetailData';

export default function IndDetailHero({ data }: { data: IndustryDetailContent }) {
  return (
    <section className="relative pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 bg-[#F8F8F5] text-[#111111] overflow-hidden border-b border-[#111111]/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* LEFT COLUMN (~42% / 5 cols on lg) */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-7 z-10">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#111111]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#666666] font-semibold">
                {data.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[44px] sm:text-[60px] md:text-[72px] lg:text-[78px] font-semibold leading-[0.95] tracking-[-0.04em] text-[#111111]">
              {data.heroHeadlineLines.map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < data.heroHeadlineLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>

            {/* Body */}
            <p className="text-base sm:text-lg text-[#666666] leading-relaxed max-w-[500px] font-normal">
              {data.heroBody}
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={data.primaryCtaHref}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#111111] hover:bg-[#333333] text-white text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span>{data.primaryCtaText}</span>
              </Link>

              {data.secondaryCtaText && (
                <button
                  type="button"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[#111111]/20 hover:border-[#111111] text-[#111111] text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-[#111111]/10 flex items-center justify-center text-[#111111]">
                    <Play size={10} className="fill-[#111111] translate-x-0.5" />
                  </div>
                  <span>{data.secondaryCtaText}</span>
                </button>
              )}
            </div>

            {/* Trust Line */}
            {data.trustText && (
              <p className="text-xs font-mono uppercase tracking-wider text-[#888888] pt-2">
                {data.trustText}
              </p>
            )}
          </div>

          {/* RIGHT COLUMN (~58% / 7 cols on lg) */}
          <div className="lg:col-span-7 xl:col-span-7 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#EBEBE6] border border-[#111111]/10 group">
              <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full relative">
                <img
                  src={data.heroImage}
                  alt={data.industryName}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                
                {/* Soft daylight gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-transparent pointer-events-none" />

                {/* Top Right Cursive Editorial Annotation */}
                {data.heroAnnotationLines && (
                  <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-right pointer-events-none">
                    <p className="font-serif italic text-white/95 text-xl sm:text-2xl lg:text-3xl leading-snug drop-shadow-md">
                      {data.heroAnnotationLines.map((line, idx) => (
                        <React.Fragment key={idx}>
                          {line}
                          {idx < data.heroAnnotationLines.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

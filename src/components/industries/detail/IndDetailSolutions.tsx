'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { IndustryDetailContent } from './industryDetailData';

export default function IndDetailSolutions({ data }: { data: IndustryDetailContent }) {
  return (
    <section className="py-24 sm:py-28 lg:py-32 bg-white text-[#111111] border-b border-[#111111]/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* SECTION HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#111111]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#666666] font-semibold">
                {data.solutionsEyebrow}
              </span>
            </div>
            <h2 className="text-[36px] sm:text-[48px] lg:text-[54px] font-semibold leading-[0.98] tracking-[-0.04em] text-[#111111]">
              {data.solutionsHeadingLines.map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < data.solutionsHeadingLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>
          </div>

          <div className="lg:col-span-6 lg:pl-12">
            <p className="text-base sm:text-lg text-[#666666] leading-relaxed max-w-[500px]">
              {data.solutionsSubhead}
            </p>
          </div>
        </div>

        {/* 4 VISUAL SOLUTION TILES (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {data.solutionsItems.map((item, idx) => (
            <div
              key={idx}
              className="group block space-y-4 cursor-pointer"
            >
              {/* IMAGE TILE */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EBEBE6] border border-[#111111]/10">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* TILE CONTENT */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono text-[#888888] font-medium">
                      {item.number}
                    </span>
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#111111] transition-transform duration-300 group-hover:translate-x-[2px]">
                      {item.title}
                    </h3>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="w-8 h-8 rounded-full border border-[#111111]/25 flex items-center justify-center text-[#111111] group-hover:border-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-all duration-300">
                    <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed line-clamp-3 pr-2 font-normal">
                  {item.shortDesc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

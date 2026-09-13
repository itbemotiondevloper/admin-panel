'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { IndustryDetailContent } from './industryDetailData';

export default function IndDetailCaseStudy({ data }: { data: IndustryDetailContent }) {
  return (
    <section className="py-24 sm:py-28 lg:py-32 bg-[#F8F8F5] text-[#111111] border-b border-[#111111]/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#111111]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#666666] font-semibold">
                {data.caseStudyEyebrow}
              </span>
            </div>
            <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-semibold leading-[1.05] tracking-[-0.03em] text-[#111111]">
              Featured Work
            </h2>
          </div>

          <Link
            href={data.caseStudyCtaText ? "/case-studies" : "/case-studies"}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#111111] hover:text-[#333333] transition-colors"
          >
            <span>{data.caseStudyCtaText}</span>
          </Link>
        </div>

        {/* FEATURED CASE STUDY CARD SYSTEM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 bg-[#EBEBE6] border border-[#111111]/10 rounded-2xl p-6 sm:p-10 lg:p-12 items-center">
          
          {/* LEFT: Large Image (~45%) */}
          <div className="lg:col-span-6 relative rounded-xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] bg-[#DFDFDA]">
            <img
              src={data.caseStudyImage}
              alt={data.caseStudyTag}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#111111] text-[11px] font-mono uppercase tracking-wider font-semibold">
                {data.caseStudyTag}
              </span>
            </div>
          </div>

          {/* RIGHT: Content & Metrics (~55%) */}
          <div className="lg:col-span-6 space-y-8 lg:pl-4">
            <div className="space-y-4">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#111111] leading-tight">
                {data.caseStudyHeadingLines.map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < data.caseStudyHeadingLines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h3>

              <p className="text-base sm:text-lg text-[#666666] leading-relaxed font-normal">
                {data.caseStudyBody}
              </p>
            </div>

            {/* Metrics Column */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#111111]/15">
              {data.caseStudyMetrics.map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#111111]">
                    {metric.value}
                  </p>
                  <p className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#666666] line-clamp-2">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Case Study Link CTA */}
            <div className="pt-2">
              <Link
                href={data.caseStudyLink}
                className="inline-flex items-center gap-3 text-sm font-medium text-[#111111] group"
              >
                <span>Read Full Case Study</span>
                <div className="w-8 h-8 rounded-full border border-[#111111]/30 flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-all">
                  <ArrowUpRight size={15} />
                </div>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { IndustryDetailContent } from './industryDetailData';

export default function IndDetailProcess({ data }: { data: IndustryDetailContent }) {
  return (
    <section className="py-28 sm:py-32 lg:py-40 bg-[#111111] text-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Headlines & CTA (~45%) */}
          <div className="lg:col-span-5 space-y-8 z-10">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/60 font-semibold">
                {data.processEyebrow}
              </span>
            </div>

            <h2 className="text-[40px] sm:text-[56px] lg:text-[66px] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
              {data.processHeadingLines.map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < data.processHeadingLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>

            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light max-w-[460px]">
              {data.processBody}
            </p>

            <div className="pt-2">
              <Link
                href={data.processCtaHref}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-[#111111] hover:bg-white/90 text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 shadow-md"
              >
                <span>{data.processCtaText}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Spatial Architectural Staircase Path (~55%) */}
          <div className="lg:col-span-7 relative">
            <div className="space-y-3 sm:space-y-4">
              {data.processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="group relative p-5 sm:p-6 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all duration-300 flex items-center justify-between"
                  style={{
                    marginLeft: `${idx * 4}%`
                  }}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-xs font-mono text-white/40 group-hover:text-white/80 transition-colors font-semibold">
                      {step.number}
                    </span>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-white group-hover:text-white">
                        {step.title}
                      </h4>
                      {step.subtitle && (
                        <p className="text-xs text-white/50 font-light mt-0.5">
                          {step.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="text-xs font-mono text-white/30 uppercase tracking-widest group-hover:text-white/70 transition-colors">
                    Step 0{idx + 1}
                  </span>
                </div>
              ))}
            </div>

            {/* Handwritten Cursive Annotation Overlay */}
            {data.processAnnotation && (
              <div className="mt-8 text-right pointer-events-none">
                <p className="font-serif italic text-white/70 text-lg sm:text-xl lg:text-2xl leading-snug">
                  {data.processAnnotation}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

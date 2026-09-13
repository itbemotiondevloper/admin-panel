'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SolutionDetailData } from './solutionData';

export default function DetailProofResults({ data }: { data: SolutionDetailData }) {
  const primaryProof = data.proofCards[0];
  const secondaryProof = data.proofCards[1];

  return (
    <section
      id="proof-results"
      className="w-full bg-[#F8F8F5] py-20 md:py-28 border-b border-[rgba(17,17,17,0.06)] overflow-hidden"
      aria-label="Real Results"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-bold text-[#777] uppercase tracking-[0.2em]">06</span>
              <span className="w-4 h-px bg-[#ccc]" />
              <span className="text-[10px] font-bold text-[#777] uppercase tracking-[0.2em]">REAL RESULTS</span>
            </div>
            <h2
              className="font-bold text-[#111] leading-[0.92] tracking-[-0.04em]"
              style={{
                fontSize: 'clamp(36px, 4.2vw, 72px)',
                fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif',
              }}
            >
              {data.proofTitleLines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <div className="max-w-xs flex flex-col items-start gap-3">
            <p
              className="text-[14px] text-[#676767] leading-relaxed"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
            >
              {data.proofSubhead}
            </p>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#111] hover:text-[#4F6BFF] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
            >
              View Our Work &rarr;
            </Link>
          </div>
        </div>

        {/* ── Asymmetrical Featured Case Studies (Matches Approved Reference Image) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* PRIMARY FEATURED CASE STUDY (Laptop mockup on concrete pedestal card — ~65% width) */}
          {primaryProof && (
            <div className="lg:col-span-8 flex">
              <div className="relative w-full rounded-xl overflow-hidden bg-[#E5E5E0] border border-[rgba(17,17,17,0.08)] p-8 sm:p-10 flex flex-col justify-between shadow-sm group">
                {/* Photo mockup background */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={primaryProof.image}
                    alt={primaryProof.headline}
                    fill
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 grayscale contrast-125"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#E5E5E0] via-[#E5E5E0]/60 to-transparent" />

                {/* Top Label */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#666] uppercase tracking-widest">
                    {primaryProof.client}
                  </span>
                  <span className="text-[10px] font-mono text-[#888]">01 / 02</span>
                </div>

                {/* Bottom Title & Circular Arrow */}
                <div className="relative z-10 pt-28 max-w-md">
                  <h3
                    className="text-[26px] sm:text-[32px] font-bold text-[#111] leading-tight tracking-tight mb-4 whitespace-pre-line"
                    style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
                  >
                    {primaryProof.headline}
                  </h3>

                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#111] shadow-sm group-hover:bg-[#111] group-hover:text-white transition-all duration-300">
                    <span className="text-[14px]">&rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECONDARY VISUALLY REAL CASE STUDY (~35% width) */}
          {secondaryProof && (
            <div className="lg:col-span-4 flex flex-col justify-between gap-4">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-white border border-[rgba(17,17,17,0.08)] p-7 flex flex-col justify-between shadow-sm group">
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#666] uppercase tracking-widest">
                    {secondaryProof.client}
                  </span>
                  <span className="text-[10px] font-mono text-[#888]">02 / 02</span>
                </div>

                <div className="relative z-10 pt-14">
                  <h3
                    className="text-[20px] sm:text-[24px] font-bold text-[#111] leading-snug tracking-tight mb-5 whitespace-pre-line"
                    style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
                  >
                    {secondaryProof.headline}
                  </h3>

                  <div className="w-8 h-8 rounded-full border border-[rgba(17,17,17,0.2)] flex items-center justify-center text-[#111] group-hover:bg-[#111] group-hover:text-white transition-colors duration-300">
                    <span className="text-[13px]">&rarr;</span>
                  </div>
                </div>
              </div>

              {/* Slider Arrows (Matches Approved Reference Bottom Right) */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  aria-label="Previous project"
                  className="w-8 h-8 rounded-full border border-[rgba(17,17,17,0.15)] flex items-center justify-center text-[#777] hover:text-[#111] hover:border-[#111] transition-colors"
                >
                  &larr;
                </button>
                <button
                  type="button"
                  aria-label="Next project"
                  className="w-8 h-8 rounded-full border border-[rgba(17,17,17,0.15)] flex items-center justify-center text-[#777] hover:text-[#111] hover:border-[#111] transition-colors"
                >
                  &rarr;
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

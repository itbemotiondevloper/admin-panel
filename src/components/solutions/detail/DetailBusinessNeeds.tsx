'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SolutionDetailData } from './solutionData';

export default function DetailBusinessNeeds({ data }: { data: SolutionDetailData }) {
  return (
    <section
      id="business-needs"
      className="w-full bg-[#F8F8F5] py-20 md:py-28 border-b border-[rgba(17,17,17,0.06)] overflow-hidden"
      aria-label="Websites for Every Business Need"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        
        {/* Header Row — Matches Approved Reference */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-bold text-[#777] uppercase tracking-[0.2em]">03</span>
              <span className="w-4 h-px bg-[#ccc]" />
              <span className="text-[10px] font-bold text-[#777] uppercase tracking-[0.2em]">WHAT WE BUILD</span>
            </div>
            <h2
              className="font-bold text-[#111] leading-[0.92] tracking-[-0.04em]"
              style={{
                fontSize: 'clamp(36px, 4.2vw, 72px)',
                fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif',
              }}
            >
              {data.needsTitleLines.map((line, idx) => (
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
              {data.needsSubhead}
            </p>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#111] hover:text-[#4F6BFF] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
            >
              Explore all website solutions &rarr;
            </Link>
          </div>
        </div>

        {/* ── Horizontal Row of 6 Website Types (Matches Approved Image Exactly) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {data.needsItems.map((item) => (
            <Link
              key={item.number}
              href="/contact"
              className="group flex flex-col cursor-pointer"
            >
              {/* Image thumbnail (aspect 4/3 or square, close spacing) */}
              <div className="relative overflow-hidden aspect-[4/3] w-full bg-[#E5E5E0] rounded-sm mb-3 border border-[rgba(17,17,17,0.06)]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 18vw"
                  className="object-cover grayscale transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>

              {/* Label row: small number + title + circular arrow */}
              <div className="flex items-start justify-between gap-2 pt-1">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#888] block mb-0.5">
                    {item.number}
                  </span>
                  <h3
                    className="text-[13px] font-bold text-[#111] leading-snug group-hover:text-[#4F6BFF] transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
                  >
                    {item.title}
                  </h3>
                </div>

                <div className="w-6 h-6 rounded-full border border-[rgba(17,17,17,0.2)] flex items-center justify-center text-[#111] text-[10px] shrink-0 group-hover:bg-[#111] group-hover:text-white transition-all duration-300">
                  &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

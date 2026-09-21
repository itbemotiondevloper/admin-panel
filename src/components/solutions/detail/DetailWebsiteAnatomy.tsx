'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SolutionDetailData } from './solutionData';

export default function DetailWebsiteAnatomy({ data }: { data: SolutionDetailData }) {
  return (
    <section
      id="anatomy"
      className="w-full bg-[#F8F8F5] py-20 md:py-28 border-b border-[rgba(17,17,17,0.06)] overflow-hidden"
      aria-label="Strategy, Design & Technology"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* ── LEFT COLUMN (~52% Width) — Layered Digital/Device Composition ── */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center">
            <div className="relative w-full max-w-[620px] aspect-[4/3] flex items-center justify-center">
              
              {/* Secondary background layer card */}
              <div className="absolute top-2 -left-3 w-[65%] h-[85%] bg-white rounded-xl shadow-lg border border-[rgba(17,17,17,0.08)] transform rotate-[-2deg] p-5 hidden sm:block">
                <div className="w-12 h-1 bg-[#111] rounded-full mb-3" />
                <div className="space-y-2">
                  <div className="w-full h-3 bg-[#E5E5E0] rounded" />
                  <div className="w-3/4 h-3 bg-[#E5E5E0] rounded" />
                  <div className="w-1/2 h-3 bg-[#E5E5E0] rounded" />
                </div>
              </div>

              {/* Primary Browser Frame Mockup */}
              <div className="relative z-10 w-full rounded-xl overflow-hidden bg-white shadow-2xl border border-[rgba(17,17,17,0.12)]">
                {/* Browser bar */}
                <div className="w-full bg-[#F2F2EE] px-4 py-2.5 flex items-center justify-between border-b border-[rgba(17,17,17,0.08)]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="bg-white px-4 py-0.5 rounded text-[9.5px] text-[#666] font-mono border border-[rgba(17,17,17,0.06)]">
                    questfortech.com
                  </div>
                  <div className="w-8" />
                </div>

                {/* Inner preview image */}
                <div className="relative w-full aspect-[16/10] bg-[#F8F8F5]">
                  <Image
                    src="/svc-web.jpg"
                    alt="Strategy, Design & Technology In Sync"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent p-6 flex flex-col justify-end">
                    <div className="max-w-xs">
                      <span className="text-[9px] font-bold text-[#111] uppercase tracking-wider block mb-1">DIGITAL ASSET</span>
                      <h4 className="text-[20px] font-bold text-[#111] leading-tight">
                        A Digital Presence That Performs.
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── RIGHT COLUMN (~40% Width) — Clean Vertical Capability List (Matches Approved Image) ── */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-bold text-[#777] uppercase tracking-[0.2em]">05</span>
              <span className="w-4 h-px bg-[#ccc]" />
              <span className="text-[10px] font-bold text-[#777] uppercase tracking-[0.2em]">WHAT GOES INTO IT</span>
            </div>

            <h2
              className="font-bold text-[#111] leading-[0.92] tracking-[-0.04em] mb-6"
              style={{
                fontSize: 'clamp(36px, 4.2vw, 72px)',
                fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif',
              }}
            >
              {data.anatomyTitleLines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p
              className="text-[15.5px] text-[#676767] leading-relaxed mb-8 max-w-md"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
            >
              {data.anatomySubhead}
            </p>

            {/* Simple Vertical List — NO pill backgrounds, NO chips, NO floating clutter */}
            <div className="flex flex-col gap-3 py-4 border-t border-[rgba(17,17,17,0.10)] mb-8">
              {data.anatomyList.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-[14px] text-[#111] font-bold">&rarr;</span>
                  <span
                    className="text-[15px] font-semibold text-[#222]"
                    style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#111] hover:text-[#A78BFA] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
            >
              See how we work &rarr;
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

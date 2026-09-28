'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SolutionDetailData } from './solutionData';

export default function DetailFinalCTA({ data }: { data: SolutionDetailData }) {
  return (
    <section
      id="final-cta"
      className="w-full bg-white py-20 md:py-28 overflow-hidden border-t border-[rgba(17,17,17,0.06)]"
      aria-label="Let's Build"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-6 z-10 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-bold text-[#777] uppercase tracking-[0.2em]">08</span>
              <span className="w-4 h-px bg-[#ccc]" />
              <span className="text-[10px] font-bold text-[#777] uppercase tracking-[0.2em]">LET&apos;S BUILD</span>
            </div>

            <h2
              className="font-bold text-[#111] leading-[0.92] tracking-[-0.04em] mb-6"
              style={{
                fontSize: 'clamp(42px, 5.2vw, 88px)',
                fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif',
              }}
            >
              {data.ctaTitleLines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p
              className="text-[15.5px] text-[#676767] leading-relaxed mb-9 max-w-md"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
            >
              {data.ctaBody}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-[#111] text-white text-[13px] font-semibold rounded-full px-7 py-3.5 hover:bg-[#222] transition-all duration-200 shadow-xs group"
                style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
              >
                {data.ctaPrimaryText}
                <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#111] hover:text-[#A78BFA] transition-colors duration-200 px-3 py-3"
                style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
              >
                {data.ctaSecondaryText}
              </Link>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Sculptural Flowing Architectural Pathway Visual (Matches Approved Image) ── */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative rounded-xl overflow-hidden aspect-[16/10] w-full bg-white shadow-xl border border-[rgba(17,17,17,0.08)]">
              <Image
                src="/cta-digital-flow.jpg"
                alt="Sculptural architectural curved path"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent" />

              {/* Handwritten-style Annotation top-right — matches approved "Ideas today. Opportunities tomorrow." */}
              <div className="absolute top-6 right-6 max-w-[170px] z-10">
                <p
                  className="text-[#111] text-[13.5px] leading-snug text-right font-medium italic drop-shadow-sm"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Ideas today.<br />
                  Opportunities<br />
                  tomorrow.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

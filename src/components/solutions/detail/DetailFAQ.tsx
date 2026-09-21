'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SolutionDetailData } from './solutionData';

export default function DetailFAQ({ data }: { data: SolutionDetailData }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleIdx = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="w-full bg-[#F8F8F5] py-20 md:py-28 border-b border-[rgba(17,17,17,0.06)] overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-bold text-[#777] uppercase tracking-[0.2em]">07</span>
              <span className="w-4 h-px bg-[#ccc]" />
              <span className="text-[10px] font-bold text-[#777] uppercase tracking-[0.2em]">FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h2
              className="font-bold text-[#111] leading-[0.92] tracking-[-0.04em] mb-6"
              style={{
                fontSize: 'clamp(36px, 4.2vw, 72px)',
                fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif',
              }}
            >
              Got Questions?<br />
              We&apos;ve Got Answers.
            </h2>

            <p
              className="text-[15px] text-[#676767] leading-relaxed mb-8 max-w-sm"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
            >
              Quick answers to help you get started.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#111] hover:text-[#A78BFA] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
            >
              View All FAQs &rarr;
            </Link>
          </div>

          {/* ── RIGHT COLUMN — 4 Questions Visible with Thin Dividers (NO Boxes, NO Card Backgrounds) ── */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[rgba(17,17,17,0.12)] border-t border-b border-[rgba(17,17,17,0.12)]">
            {data.faqs.slice(0, 4).map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="py-5 transition-all duration-300">
                  <button
                    type="button"
                    onClick={() => toggleIdx(idx)}
                    className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer focus:outline-none"
                  >
                    <h3
                      className={`text-[16px] sm:text-[19px] font-bold transition-colors duration-200 ${
                        isOpen ? 'text-[#111]' : 'text-[#333] group-hover:text-[#111]'
                      }`}
                      style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
                    >
                      {faq.question}
                    </h3>
                    <span
                      className={`text-[16px] font-medium transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#111]' : 'text-[#888] group-hover:text-[#111]'
                      }`}
                    >
                      &#9662;
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-2.5 pr-6 animate-fadeIn">
                      <p
                        className="text-[14px] text-[#676767] leading-relaxed"
                        style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

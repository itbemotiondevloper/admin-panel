'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus } from 'lucide-react';
import { INDUSTRIES_PAGE_DATA } from './industriesData';

export default function IndustryFAQSection() {
  const { faq } = INDUSTRIES_PAGE_DATA;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 sm:py-28 lg:py-32 bg-[#F8F8F5] text-[#111111] border-b border-[#111111]/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Heading & Intro */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#111111]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#666666] font-semibold">
                {faq.eyebrow}
              </span>
            </div>

            <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] font-normal leading-[0.98] tracking-[-0.03em] text-[#111111]">
              {faq.titleLines.map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < faq.titleLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>

            <p className="text-base sm:text-lg text-[#666666] leading-relaxed max-w-[440px]">
              {faq.subhead}
            </p>

            <div className="pt-2">
              <Link
                href={faq.ctaHref}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#111111] hover:text-[#4F6BFF] transition-colors"
              >
                <span>{faq.ctaText}</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Minimal Accordion (Thin dividers, no cards) */}
          <div className="lg:col-span-7 divide-y divide-[#111111]/10 border-t border-b border-[#111111]/10">
            {faq.items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-6 sm:py-8 transition-colors">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between gap-6 text-left group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-[#111111] group-hover:text-[#4F6BFF] transition-colors">
                      {item.question}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-[#111111]/20 flex items-center justify-center text-[#111111] shrink-0 group-hover:border-[#111111] transition-colors">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-4 pr-12 text-sm sm:text-base text-[#666666] leading-relaxed font-light animate-fadeIn">
                      {item.answer}
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

'use client';

import React from 'react';
import { Quote } from 'lucide-react';
import { INDUSTRIES_PAGE_DATA } from './industriesData';

export default function IndustryTestimonial() {
  const { testimonial } = INDUSTRIES_PAGE_DATA;
  const { item } = testimonial;

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-white text-[#111111] border-b border-[#111111]/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* EYEBROW */}
        <div className="flex items-center gap-3 mb-12 lg:mb-16">
          <span className="w-2 h-2 rounded-full bg-[#111111]" />
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#666666] font-semibold">
            {testimonial.eyebrow}
          </span>
        </div>

        {/* SPLIT LAYOUT: Image Left (~40%) + Large Quote Right (~60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT: Photographic Workspace Visual */}
          <div className="lg:col-span-5 xl:col-span-5 relative rounded-xl overflow-hidden bg-[#EBEBE6] border border-[#111111]/10 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
            <img
              src={item.image}
              alt={item.company}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            {/* Embedded Editorial Text Overlay */}
            <div className="absolute bottom-6 left-6 text-white max-w-[260px] pointer-events-none">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/70 mb-1">
                {item.company}
              </p>
              <h4 className="text-base sm:text-lg font-bold tracking-tight leading-snug">
                GREAT<br />
                BUSINESSES<br />
                GROW WITH<br />
                GREAT<br />
                PARTNERS.
              </h4>
            </div>
          </div>

          {/* RIGHT: Quote & Attribution */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 lg:pl-4">
            <Quote size={36} className="text-[#111111]/20" />
            
            <blockquote className="text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight text-[#111111] leading-[1.2]">
              “Quest For Tech understood our industry, our audience and our goals. The entire process was smooth, professional and result-driven.”
            </blockquote>

            <div className="flex items-center gap-4 pt-4 border-t border-[#111111]/10">
              <img
                src={item.avatar}
                alt="Rahul Mehta"
                className="w-11 h-11 rounded-full object-cover border border-[#111111]/20"
              />
              <div>
                <p className="text-base font-semibold text-[#111111]">
                  Rahul Mehta
                </p>
                <p className="text-xs font-mono uppercase tracking-wider text-[#666666]">
                  Director, Skyline Group
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

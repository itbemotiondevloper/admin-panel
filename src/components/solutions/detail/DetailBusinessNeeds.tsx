'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SolutionDetailData } from './solutionData';

export default function DetailBusinessNeeds({ data }: { data: SolutionDetailData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (window.innerWidth < 1024) return; // Desktop pin only

      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!trackRef.current || !triggerRef.current) return;

      const track = trackRef.current;
      const getScrollAmount = () => -Math.max(0, track.scrollWidth - window.innerWidth + 120);

      ctx = gsap.context(() => {
        if (!triggerRef.current) return;
        gsap.to(track, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                Math.floor(self.progress * data.needsItems.length),
                data.needsItems.length - 1
              );
              setActiveIndex(idx);
            },
          },
        });
      }, triggerRef);
    };

    run();
    return () => {
      if (ctx) ctx.revert();
    };
  }, [data]);

  return (
    <section
      ref={sectionRef}
      id="business-needs"
      className="w-full bg-white relative overflow-hidden border-b border-[rgba(17,17,17,0.06)]"
      aria-label="Websites for Every Business Need"
    >
      {/* ── DESKTOP PINNED HORIZONTAL RAIL CONTAINER ── */}
      <div ref={triggerRef} className="hidden lg:flex flex-col justify-between w-full h-screen max-h-screen pt-24 pb-10 box-border">
        {/* Header Row */}
        <div className="max-w-[1440px] w-full mx-auto px-16 flex items-end justify-between shrink-0 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-bold text-[#777] uppercase tracking-[0.2em]">03</span>
              <span className="w-4 h-px bg-[#ccc]" />
              <span className="text-[10px] font-bold text-[#777] uppercase tracking-[0.2em]">WHAT WE BUILD</span>
            </div>
            <h2
              className="font-bold text-[#111] leading-[0.95] tracking-[-0.04em]"
              style={{
                fontSize: 'clamp(36px, 4.2vw, 68px)',
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

          <div className="max-w-xs flex flex-col items-start gap-3 pb-1">
            <p
              className="text-[14px] text-[#676767] leading-relaxed"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
            >
              {data.needsSubhead}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/solutions"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#111] hover:text-[#A78BFA] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
              >
                Explore all website solutions &rarr;
              </Link>
              <span className="text-[11px] font-mono font-bold text-[#999]">
                0{activeIndex + 1} / 0{data.needsItems.length}
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Track of Solution Cards */}
        <div className="w-full overflow-hidden flex-1 flex items-center">
          <div
            ref={trackRef}
            className="flex items-start gap-8 px-16 will-change-transform"
          >
            {data.needsItems.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <Link
                  key={item.number}
                  href="/contact"
                  className={`group relative shrink-0 w-[360px] flex flex-col cursor-pointer transition-all duration-500 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-50 hover:opacity-90 scale-[0.97]'
                  }`}
                >
                  <div className="relative overflow-hidden aspect-[16/11] w-full bg-[#E5E5E0] rounded-xl mb-4 border border-[rgba(17,17,17,0.06)] shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="400px"
                      className="object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  </div>

                  <div className="flex items-start justify-between gap-3 pt-1">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#888] block mb-0.5">
                        {item.number}
                      </span>
                      <h3
                        className={`font-bold transition-all duration-300 ${
                          isActive ? 'text-[20px] text-[#111]' : 'text-[18px] text-[#333] group-hover:text-[#A78BFA]'
                        }`}
                        style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div className="w-8 h-8 rounded-full border border-[rgba(17,17,17,0.2)] flex items-center justify-center text-[#111] text-[12px] shrink-0 group-hover:bg-[#111] group-hover:text-white transition-all duration-300 shadow-sm">
                      &rarr;
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MOBILE FALLBACK GRID (No scroll-jacking) ── */}
      <div className="block lg:hidden px-8 py-16">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold text-[#777] uppercase tracking-[0.2em]">03</span>
            <span className="w-4 h-px bg-[#ccc]" />
            <span className="text-[10px] font-bold text-[#777] uppercase tracking-[0.2em]">WHAT WE BUILD</span>
          </div>
          <h2
            className="font-bold text-[#111] leading-[0.95] tracking-[-0.04em] mb-4"
            style={{
              fontSize: 'clamp(32px, 6vw, 48px)',
              fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif',
            }}
          >
            {data.needsTitleLines.join(' ')}
          </h2>
          <p className="text-[14px] text-[#676767] leading-relaxed mb-4">
            {data.needsSubhead}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.needsItems.map((item) => (
            <Link key={item.number} href="/contact" className="group flex flex-col cursor-pointer">
              <div className="relative overflow-hidden aspect-[16/11] w-full bg-[#E5E5E0] rounded-xl mb-3 border border-[rgba(17,17,17,0.06)] shadow-sm">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover grayscale" />
              </div>
              <div className="flex items-start justify-between gap-2 pt-1">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#888] block mb-0.5">{item.number}</span>
                  <h3 className="text-[16px] font-bold text-[#111]" style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}>{item.title}</h3>
                </div>
                <div className="w-7 h-7 rounded-full border border-[rgba(17,17,17,0.2)] flex items-center justify-center text-[#111] text-[11px] shrink-0">&rarr;</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

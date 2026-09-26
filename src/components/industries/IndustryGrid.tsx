'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { INDUSTRIES_PAGE_DATA } from './industriesData';

export default function IndustryGrid() {
  const { grid } = INDUSTRIES_PAGE_DATA;
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
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 160);

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
                Math.floor(self.progress * grid.items.length),
                grid.items.length - 1
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
  }, [grid.items.length]);

  return (
    <section
      ref={sectionRef}
      id="industries-grid"
      className="w-full bg-white text-[#111111] border-b border-[#111111]/10 overflow-hidden relative"
      aria-label="Built Around Your Industry"
    >
      {/* ── DESKTOP PINNED HORIZONTAL RAIL CONTAINER ── */}
      <div ref={triggerRef} className="hidden lg:flex flex-col justify-between w-full h-screen max-h-screen pt-20 pb-10 box-border">
        {/* Header Row */}
        <div className="max-w-[1440px] w-full mx-auto px-16 flex items-end justify-between shrink-0 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#111111]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#666666] font-semibold">
                {grid.eyebrow}
              </span>
            </div>
            <h2
              className="text-[36px] sm:text-[48px] lg:text-[56px] font-semibold leading-[0.95] tracking-[-0.04em] text-[#111111]"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
            >
              Built Around<br />
              Your Industry.
            </h2>
          </div>

          <div className="max-w-md flex flex-col items-end gap-3 pb-1">
            <p className="text-sm text-[#666666] leading-relaxed text-right font-normal">
              {grid.subhead}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-mono font-bold text-[#111111]">
                0{activeIndex + 1}
              </span>
              <span className="text-[11px] text-[#999] uppercase tracking-wider font-semibold">
                / 0{grid.items.length} &mdash; {grid.items[activeIndex]?.title}
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Track of Industry Cards */}
        <div className="w-full overflow-hidden flex-1 flex items-center">
          <div
            ref={trackRef}
            className="flex items-start gap-10 px-16 will-change-transform"
          >
            {grid.items.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <Link
                  key={item.id}
                  href={`/industries/${item.slug}`}
                  className={`group relative shrink-0 w-[360px] flex flex-col cursor-pointer transition-all duration-500 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-45 hover:opacity-85 scale-[0.97]'
                  }`}
                >
                  {/* Image Tile with Next.js Image */}
                  <div className="relative overflow-hidden aspect-[16/11] w-full bg-[#EBEBE6] rounded-xl mb-3 border border-[#111111]/10 shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="400px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

                    {/* Arrow Button Overlay */}
                    <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-all duration-300 shadow-sm">
                      <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Tile Info */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-mono font-bold text-[#888888]">
                      {item.number}
                    </span>
                    <h3
                      className={`font-bold tracking-tight text-[#111111] transition-all duration-300 ${
                        isActive ? 'text-[22px]' : 'text-[20px] group-hover:text-[#A78BFA]'
                      }`}
                      style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#666666] leading-snug line-clamp-2 font-normal">
                      {item.shortDesc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MOBILE FALLBACK GRID (No scroll-jacking) ── */}
      <div className="block lg:hidden px-6 sm:px-10 py-16">
        <div className="mb-10 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#111111]" />
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#666666] font-semibold">
              {grid.eyebrow}
            </span>
          </div>
          <h2 className="text-[36px] sm:text-[48px] font-semibold leading-[0.98] tracking-[-0.04em] text-[#111111]">
            Built Around{' '}
            Your Industry.
          </h2>
          <p className="text-base text-[#666666] leading-relaxed">
            {grid.subhead}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {grid.items.map((item) => (
            <Link
              key={item.id}
              href={`/industries/${item.slug}`}
              className="group block space-y-4 cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EBEBE6] border border-[#111111]/10">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono text-[#888888] font-medium">{item.number}</span>
                    <h3 className="text-xl font-semibold tracking-tight text-[#111111]">{item.title}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-[#111111]/25 flex items-center justify-center text-[#111111]">
                    <ArrowUpRight size={15} />
                  </div>
                </div>
                <p className="text-xs text-[#666666] leading-relaxed line-clamp-2">{item.shortDesc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

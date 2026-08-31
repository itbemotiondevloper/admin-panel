'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function MissionCta() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const line1 = ["We", "envision.", "We", "deliver."];
  const line2 = ["We", "execute.", "We", "evolve."];
  const totalWords = line1.length + line2.length;

  useEffect(() => {
    const handleScroll = () => {
      const track = sectionRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // The scroll range is when the top of the track hits the top of the viewport
      // until the bottom of the track hits the bottom of the viewport
      const totalDist = rect.height - viewportHeight;
      const scrolledDist = -rect.top;

      const progress = scrolledDist / totalDist;
      const clamped = Math.max(0, Math.min(1, progress));
      setScrollProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section className="bg-white dark:bg-[#0d0d0e] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8 space-y-16 py-8 md:py-12">

        {/* Mission Statement Block */}
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight leading-[1.15]">
                Our <span className="text-[#FF4F18]">vision.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed lg:pt-2">
              <p>
                We&apos;re building the technology that will help Indian restaurants run better, grow faster, and focus on hospitality.
              </p>
            </div>
          </div>

          {/* 3-Card Grid for Vision Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-stretch border border-zinc-200/60 dark:border-[#2a2a2e]/60 rounded-[32px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.01)] bg-white dark:bg-zinc-950/20">
            {/* Pillar 1 */}
            <div className="flex flex-col h-full p-8 transition-all duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 border-zinc-200/60 dark:border-[#2a2a2e]/60 border-b md:border-b-0 md:border-r">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-[#FF4F18] mb-6 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <h3 className="text-[17px] font-bold text-zinc-900 dark:text-white mb-2 leading-snug">Make every restaurant run better</h3>
              <p className="text-[13px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                We envision to make every restaurant in India, big or small, to run smoothly, make better profits, and spend less time dealing with everyday problems.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col h-full p-8 transition-all duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 border-zinc-200/60 dark:border-[#2a2a2e]/60 border-b md:border-b-0 md:border-r">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-[#FF4F18] mb-6 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="text-[17px] font-bold text-zinc-900 dark:text-white mb-2 leading-snug">Bring everything together</h3>
              <p className="text-[13px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Billing, inventory, kitchen operations, and reports should not live in different systems. We bring them together in one simple platform, so restaurants can manage everything in one place.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col h-full p-8 transition-all duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 border-zinc-200/60 dark:border-[#2a2a2e]/60 md:border-b-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-[#FF4F18] mb-6 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="text-[17px] font-bold text-zinc-900 dark:text-white mb-2 leading-snug">Let restaurants focus on what matters</h3>
              <p className="text-[13px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Restaurant owners should spend less time fixing software issues and more time doing what they do best: serving great food, taking care of their teams, and making guests happy.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll-locked Word Reveal — 130vh native sticky track */}
        <div
          ref={sectionRef}
          className="h-[130vh] relative"
        >
          {/* Sticky container pins text in viewport during track scroll */}
          <div className="sticky top-[25vh] h-[50vh] flex flex-col justify-center gap-2 select-none text-center overflow-hidden">
          {/* Line 1 */}
          <h3 className="text-[48px] sm:text-[62px] md:text-[82px] font-[900] tracking-tight leading-[1.05]">
            {line1.map((word, idx) => {
              const wordStart = idx / totalWords;
              const wordEnd = (idx + 0.9) / totalWords;
              let clamped = (scrollProgress - wordStart) / (wordEnd - wordStart);
              clamped = Math.max(0, Math.min(1, clamped));
              const isOrange = idx % 2 === 1;
              return (
                <span
                  key={idx}
                  className="relative inline-block mr-[0.25em] text-[#E5E7EB] dark:text-[#2a2a2e]"
                >
                  {word}
                  <span
                    className={`absolute inset-0 ${isOrange ? 'text-[#FF4F18]' : 'text-[#111111] dark:text-white'}`}
                    style={{ opacity: clamped }}
                  >
                    {word}
                  </span>
                </span>
              );
            })}
          </h3>

          {/* Line 2 */}
          <h3 className="text-[48px] sm:text-[62px] md:text-[82px] font-[900] tracking-tight leading-[1.05]">
            {line2.map((word, idx) => {
              const globalIdx = line1.length + idx;
              const wordStart = globalIdx / totalWords;
              const wordEnd = (globalIdx + 0.9) / totalWords;
              let clamped = (scrollProgress - wordStart) / (wordEnd - wordStart);
              clamped = Math.max(0, Math.min(1, clamped));
              const isOrange = idx % 2 === 1;
              return (
                <span
                  key={idx}
                  className="relative inline-block mr-[0.25em] text-[#E5E7EB] dark:text-[#2a2a2e]"
                >
                  {word}
                  <span
                    className={`absolute inset-0 ${isOrange ? 'text-[#FF4F18]' : 'text-[#111111] dark:text-white'}`}
                    style={{ opacity: clamped }}
                  >
                    {word}
                  </span>
                </span>
              );
            })}
          </h3>
        </div>
      </div>

      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";

export default function SolutionsCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 py-6 md:py-10">
      <div className="bg-white dark:bg-zinc-900 rounded-[32px] p-8 md:p-16 text-zinc-900 dark:text-white shadow-xl border border-zinc-200 dark:border-zinc-800/80 flex flex-col items-center text-center gap-8 relative overflow-hidden select-none">

        {/* Content Wrapper */}
        <div className="flex flex-col items-center space-y-4 max-w-3xl">
          <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-widest text-[#FF4F18]">
            Ready to transform?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight leading-[1.15] text-zinc-900 dark:text-white">
            Elevate your restaurant <span className="text-[#FF4F18]">operations today.</span>
          </h2>
          <p className="text-base md:text-lg text-zinc-650 dark:text-zinc-400 leading-relaxed max-w-2xl">
            Schedule a personalized 15-minute demo with our F&B solution architect.
          </p>
        </div>

        {/* CTA Button at the bottom */}
        <div className="w-full sm:w-auto">
          <Link
            href="/request-demo"
            className="w-full sm:w-auto inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-8 py-4 text-[15px] font-bold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer"
          >
            Book Free Live Demo <span className="text-white font-normal ml-1.5">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

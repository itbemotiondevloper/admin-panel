'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 pt-4 pb-10 md:pt-6 md:pb-14 lg:pt-8 lg:pb-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 items-center">

        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col justify-start lg:-mt-6 space-y-6 md:space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1] transition-colors duration-300">
            Software for <span className="text-[#FF4F18]">real</span>
            <br />
            <span className="text-[#FF4F18]">restaurant problems</span>
          </h1>

          <p className="text-[17px] text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed transition-colors duration-300">
            Digitory was built after spending time inside real restaurants, not in a meeting room. We know how difficult it is to manage orders, billing, inventory, and staff every day. That's why we created one simple system that helps restaurants run smoothly.
          </p>

          <div className="flex flex-wrap gap-4 items-center pt-2">
            <Link
              href="/request-demo"
              className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer"
            >
              Book a demo
            </Link>
            <Link
              href="/solutions"
              className="inline-flex justify-center items-center text-center rounded-full border border-zinc-300 dark:border-zinc-700 px-6 py-3 text-[15px] font-semibold text-zinc-700 dark:text-zinc-300 transition-all duration-200 hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-white active:scale-[0.98] cursor-pointer"
            >
              See how it works
            </Link>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900/60 transition-colors duration-300">
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-450 font-medium">
              Made in India. Made for Indian restaurants.
            </p>
          </div>
        </div>

        {/* Right Image Column */}
        <div className="lg:col-span-5 flex justify-center w-full relative">
          <div className="relative w-full max-w-[500px] lg:max-w-[560px] aspect-[4/5] flex items-center justify-center select-none">
            <Image
              src="/mascot_neww.png"
              alt="About Digitory Mascot"
              width={540}
              height={675}
              priority
              className="
        w-full
        h-full
        object-contain
        scale-[1.02]
        hover:scale-[1.05]
        transition-transform
        duration-500
        ease-out
      "
            />
          </div>
        </div>

      </div>
    </section>
  );
}

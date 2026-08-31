'use client';

import React from 'react';

export default function Stats() {
  const stats = [
    {
      value: '30%',
      label: 'Less Wastage',
      desc: 'Keep better track of your inventory and reduce food waste',
    },
    {
      value: '2x',
      label: 'Faster Decision Making',
      desc: 'View live reports from all your outlets in one place',
    },
    {
      value: '100%',
      label: 'Operational Visibility',
      desc: 'Track orders, inventory, sales, and customer data in real time',
    },
    {
      value: '1',
      label: 'Connected System',
      desc: ' Manage everything from one system instead of using multiple apps',
    },
  ];

  return (
    <div className="w-full">
      <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16">
        {/* Section Heading */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-16 md:mb-20">
          Stay ready for your busiest hours, <span className="text-[#FF4F18]">always</span>
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-y-12 gap-x-4 md:grid-cols-4 md:gap-0 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center px-4 md:border-r md:border-zinc-200 dark:md:border-zinc-800 last:border-r-0"
            >
              <h3 className="text-2xl md:text-3xl font-bold leading-tight max-w-[260px]">
                <span className="text-[#FF4F18]">{stat.value}</span>{" "}

              </h3>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight max-w-[260px]">
                <span className="text-zinc-900 dark:text-white">{stat.label}</span>
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3 max-w-[260px] leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

'use client';

import React from 'react';

interface BeliefsSectionProps {
  showBeliefs?: boolean;
  showHeading?: boolean;
}

export default function BeliefsSection({ showBeliefs = true, showHeading = true }: BeliefsSectionProps) {
  const stats = [
    { value: '100+', label: 'restaurant outlets', sublabel: 'using Digitory' },
    { value: '2M+', label: 'orders', sublabel: 'handled every month' },
    { value: '10+', label: 'years of experience', sublabel: 'solving restaurant challenges' },
    { value: '150+', label: 'cities', sublabel: 'across India' },
  ];

  const beliefs = [
    {
      num: '01',
      title: 'Good systems make restaurants stronger.',
      description: 'A restaurant should run smoothly even when your best manager is on leave.',
    },
    {
      num: '02',
      title: 'Clear information leads to better decisions.',
      description: "You don't need to work longer hours. You simply need to know what's happening in your restaurant at the right time.",
    },
    {
      num: '03',
      title: 'Growing your business should feel exciting.',
      description: 'Opening a new outlet should help your business grow, not create more confusion.',
    },
    {
      num: '04',
      title: 'We stay with our customers.',
      description: 'Our work doesn\'t end after installation. We help you set up the system, solve problems, and keep improving as your business grows.',
    },
  ];

  return (
    <>
      {/* Stats Section */}
      <section className="bg-white dark:bg-[#0d0d0e] py-10 md:py-16 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          {/* Section Heading */}
          {showHeading && (
            <h2 className="text-center text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-16 md:mb-20">
              Trusted by the best <span className="text-[#FF4F18]">in the business</span>
            </h2>
          )}

          <div className="grid grid-cols-2 gap-y-12 gap-x-4 md:grid-cols-4 md:gap-0 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center px-4 md:border-r md:border-zinc-200 dark:md:border-zinc-800 last:border-r-0">
                <h3 className="text-2xl md:text-3xl font-bold leading-tight max-w-[260px]">
                  <span className="text-[#FF4F18]">{stat.value}</span>
                </h3>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight max-w-[260px]">
                  <span className="text-zinc-900 dark:text-white">{stat.label}</span>
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3 max-w-[260px] leading-relaxed">
                  {stat.sublabel}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beliefs Section */}
      {showBeliefs && (
        <section className="bg-white dark:bg-[#0d0d0e] py-10 md:py-16 transition-colors duration-300">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="space-y-12">
              {/* Header */}
              <div className="max-w-3xl">
                <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15]">
                  What <span className="text-[#FF4F18]">we believe</span>
                </h2>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 items-stretch border border-zinc-200/60 dark:border-[#2a2a2e]/60 rounded-[32px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.01)] bg-white dark:bg-zinc-950/20">
                {beliefs.map((belief, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col h-full p-6 transition-all duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 border-zinc-200/60 dark:border-[#2a2a2e]/60 border-b md:border-b-0 md:border-r last:border-b-0 last:border-r-0"
                  >
                    <span className="text-[11px] font-bold text-[#FF4F18] uppercase tracking-wider mb-3 block">
                      {belief.num}
                    </span>
                    <h3 className="text-[16px] font-bold text-zinc-900 dark:text-white mb-2 leading-snug">
                      {belief.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                      {belief.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

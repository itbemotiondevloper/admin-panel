'use client';

import React from 'react';

export default function ProblemsSection() {
  const problems = [
    {
      title: 'You find out about problems too late',
      description: 'Stock runs out. Orders get delayed. A customer complains. Most of the time, you only find out after the problem has already happened.',
      icon: (
        <svg className="w-6 h-6 text-[#FF4F18]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'More outlets should mean more growth, not more stress',
      description: 'Running one outlet is challenging. Running multiple outlets without one connected system can quickly become confusing. Every outlet should work together, not separately.',
      icon: (
        <svg className="w-6 h-6 text-[#FF4F18]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: 'Too many tools. Too much confusion.',
      description: 'Billing is on one app. Inventory is somewhere else. Staff updates come on WhatsApp. Reports are stored in another place. Switching between different tools wastes time and increases mistakes.',
      icon: (
        <svg className="w-6 h-6 text-[#FF4F18]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
  ];

  const scenarios = [
    {
      text: 'Paneer finishes during dinner service',
      subtext: 'Customers have already ordered it',
      status: 'Stock',
      badgeClass: 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-650 dark:text-zinc-350 border border-zinc-200 dark:border-zinc-700/60',
    },
    {
      text: 'A Zomato order gets missed',
      subtext: 'The printout is lost during the rush',
      status: 'Lost',
      badgeClass: 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-650 dark:text-zinc-350 border border-zinc-200 dark:border-zinc-700/60',
    },
    {
      text: 'The cash doesn\'t match at closing',
      subtext: 'The team spends another hour checking every bill',
      status: 'Delay',
      badgeClass: 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-650 dark:text-zinc-350 border border-zinc-200 dark:border-zinc-700/60',
    },
    {
      text: 'That\'s exactly why we built Digitory',
      subtext: 'One system. Less confusion. Better control.',
      status: 'Fixed',
      badgeClass: 'bg-[#EAF9F0] dark:bg-[#13B257]/15 text-[#13B257] border border-[#13B257]/25',
    },
  ];

  return (
    <section className="bg-white dark:bg-[#121214] py-10 md:py-16 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8">

        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-16 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight leading-[1.15]">
              <span className="text-[#111111] dark:text-white">Running a restaurant isn't easy.</span>
              <br />
              <span className="text-[#FF4F18]">We understand why.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 text-zinc-600 dark:text-zinc-400 space-y-4 text-sm md:text-base leading-relaxed lg:pt-2">
            <p>
              Managing dine-in, delivery platforms, kitchens, and staff simultaneously is incredibly complex. Digitory simplifies everything by unifying your restaurant's entire operation into one smart, real-time system.
            </p>
          </div>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* Left Column - Problems */}
          <div className="lg:col-span-6 flex flex-col gap-6 h-full">
            <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 mb-2 shrink-0">
              The everyday challenges restaurants face
            </h3>
            <div className="flex flex-col bg-white dark:bg-[#17171a] border border-zinc-200/60 dark:border-[#2a2a2e]/60 rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.01)] overflow-hidden flex-1">
              {problems.map((prob, idx) => (
                <div
                  key={idx}
                  className={`flex-1 flex items-center gap-4 px-6 py-4 sm:py-5 transition-all duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 ${idx !== problems.length - 1 ? 'border-b border-zinc-200/60 dark:border-[#2a2a2e]/60' : ''}`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-850 shrink-0">
                    {prob.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-zinc-900 dark:text-white transition-colors duration-300">
                      {prob.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
                      {prob.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Friday Night Scenarios */}
          <div className="lg:col-span-6 flex flex-col gap-6 h-full">
            <div className="w-full max-w-[500px] mx-auto lg:mr-0 lg:ml-auto flex flex-col gap-6 h-full">
              <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 mb-2 shrink-0">
                A busy Friday night
              </h3>
              
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.015)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[24px] p-5 md:p-6 space-y-4 w-full flex flex-col justify-between flex-1">
                <div className="flex flex-col h-full justify-between gap-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-zinc-900 dark:text-white text-[16px]">
                      Friday Night Rush
                    </h4>
                    <span className="inline-flex items-center gap-1.5 bg-[#FFF0EA] dark:bg-[#FF4F18]/15 text-[#FF4F18] px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4F18] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF4F18]"></span>
                      </span>
                      <span>4 alerts active</span>
                    </span>
                  </div>

                  {/* Scenarios list */}
                  <div className="space-y-2.5">
                    {scenarios.map((scene, idx) => {
                      const isFixed = scene.status === 'Fixed';
                      return (
                        <div
                          key={idx}
                          className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 cursor-pointer select-none border transform hover:-translate-y-0.5 ${
                            isFixed
                              ? 'bg-[#EAF9F0]/30 dark:bg-[#13B257]/10 border-[#13B257]/30 hover:border-[#13B257]/50'
                              : 'bg-[#F8F9FA] dark:bg-zinc-800/50 hover:bg-[#F1F3F5] dark:hover:bg-zinc-800/80 border-transparent hover:border-zinc-200/20 dark:hover:border-zinc-700/50'
                          }`}
                        >
                          <div className="flex items-start min-w-0 pr-4">
                            <span
                              className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${
                                scene.status === 'Stock' ? 'bg-[#FF4F18]' :
                                scene.status === 'Lost' ? 'bg-[#FF3B30]' :
                                scene.status === 'Delay' ? 'bg-[#FFCC00]' :
                                'bg-[#13B257]'
                              }`}
                            />
                            <div className="ml-3.5 space-y-0.5">
                              <p className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                                {scene.text}
                              </p>
                              <p className="text-[12px] text-zinc-500 dark:text-zinc-400">
                                {scene.subtext}
                              </p>
                            </div>
                          </div>

                          <div className="flex-shrink-0 flex items-center">
                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${scene.badgeClass}`}>
                              {scene.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-center pt-3 border-t border-zinc-100 dark:border-zinc-800/50 mt-2">
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                    Real-time restaurant operations simulated.
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

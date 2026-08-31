'use client';

import React, { useEffect, useState } from 'react';

interface QueueItem {
  id: string;
  source: string;
  detail: string;
  time: string;
  status: 'active' | 'served' | 'warning';
  timeInSecs: number;
}

export default function LiveQueueSection() {
  const [tickets, setTickets] = useState<QueueItem[]>([
    { id: '1', source: 'Table 5', detail: 'Masala Dosa × 2', time: '6 min', status: 'active', timeInSecs: 360 },
    { id: '2', source: 'Swiggy #1284', detail: 'Chicken Tikka Roll', time: '9 min', status: 'active', timeInSecs: 540 },
    { id: '3', source: 'Table 2', detail: 'Mango Lassi × 3', time: 'Served', status: 'served', timeInSecs: 0 },
    { id: '4', source: 'Table 9', detail: 'Garlic Naan × 4', time: '4 min', status: 'active', timeInSecs: 240 },
    { id: '5', source: 'Zomato #4821', detail: 'Paneer Butter Masala', time: '2 min', status: 'warning', timeInSecs: 120 },
  ]);

  // Tick down the times on active tickets to show it's alive!
  useEffect(() => {
    const interval = setInterval(() => {
      setTickets((prev) =>
        prev.map((t) => {
          if (t.status === 'served') return t;
          const nextSecs = t.timeInSecs > 10 ? t.timeInSecs - 10 : 0;
          const mins = Math.ceil(nextSecs / 60);
          
          let nextStatus = t.status;
          if (nextSecs <= 180 && nextSecs > 0) {
            nextStatus = 'warning';
          }
          
          return {
            ...t,
            timeInSecs: nextSecs,
            time: nextSecs === 0 ? 'Served' : `${mins} min`,
            status: nextSecs === 0 ? 'served' : nextStatus,
          };
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Toggle order status to showcase high-fidelity interactivity
  const handleToggleStatus = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          if (t.status === 'served') {
            return {
              ...t,
              status: 'active',
              time: '6 min',
              timeInSecs: 360,
            };
          } else {
            return {
              ...t,
              status: 'served',
              time: 'Served',
              timeInSecs: 0,
            };
          }
        }
        return t;
      })
    );
  };

  const bullets = [
    'Restaurant outlets using Digitory',
    'Orders handled every month',
    'Years working with restaurants',
    'Cities we work in across India',
  ];

  return (
    <section className="bg-white dark:bg-[#121214] py-8 md:py-12 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15]">
              Built with restaurants,{' '}
              <span className="text-[#FF4F18]">not just for them</span>
            </h2>
            
            <p className="text-[17px] text-zinc-650 dark:text-zinc-400 leading-relaxed">
              We don't build software and expect restaurants to adjust. Instead, we work closely with restaurant owners, managers, chefs, and staff to understand how restaurants actually operate. Their feedback helps us improve Digitory every day, making it useful even during the busiest shifts. Whether it's a café, brewery, cloud kitchen, or multi-outlet restaurant, we build features that solve real problems.
            </p>
 
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#FF4F18] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[15px] font-medium text-zinc-650 dark:text-zinc-400 transition-colors duration-300">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Right Column - Live Queue Mockup */}
          <div className="lg:col-span-6 flex justify-center w-full h-full">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.015)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[24px] p-6 md:p-8 w-full max-w-[500px] mx-auto lg:mx-0 flex flex-col justify-between h-full">
              
              <div className="space-y-6">
                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-zinc-900 dark:text-white text-[16px]">
                    Live Order Queue
                  </h3>
                  <span className="inline-flex items-center gap-1.5 bg-[#EAF9F0] dark:bg-[#13B257]/15 text-[#13B257] px-3 py-1 rounded-full text-xs font-bold">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#13B257] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#13B257]"></span>
                    </span>
                    <span>14 active</span>
                  </span>
                </div>
 
                {/* Tickets list */}
                <div className="space-y-3">
                  {tickets.map((t) => {
                    const isWarning = t.status === 'warning';
                    const isServed = t.status === 'served';
 
                    return (
                      <div
                        key={t.id}
                        onClick={() => handleToggleStatus(t.id)}
                        className="flex items-center justify-between p-4 rounded-xl transition-all duration-200 cursor-pointer select-none bg-[#F8F9FA] dark:bg-zinc-800/50 hover:bg-[#F1F3F5] dark:hover:bg-zinc-800/80 border border-transparent hover:border-zinc-200/20 dark:hover:border-zinc-700/50 transform hover:-translate-y-0.5"
                      >
                        <div className="flex items-center min-w-0 pr-4">
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${isWarning ? 'bg-[#FF4F18]' : isServed ? 'bg-[#13B257]' : 'bg-[#4285F4]'}`}
                          />
                          <span className="ml-3.5 text-[14px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                            {t.source} — {t.detail}
                          </span>
                        </div>

                        <div className="flex-shrink-0 flex items-center">
                          {isServed ? (
                            <span className="text-[#13B257] font-bold text-[13px]">
                              Served
                            </span>
                          ) : isWarning ? (
                            <span className="text-[#FF3B30] font-bold text-[13px] flex items-center gap-1">
                              {t.time}
                              <svg
                                className="w-4 h-4 text-amber-500 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          ) : (
                            <span className="text-[#888888] font-semibold text-[13px]">
                              {t.time}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800/50 mt-4">
                <span className="text-xs text-zinc-450 dark:text-zinc-500 font-medium">
                  Auto-refreshing live queue connection.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

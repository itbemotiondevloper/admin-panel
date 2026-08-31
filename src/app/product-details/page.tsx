'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import FooterPage from '../../components/Footer';

export default function ProductDetailsPage() {
  const productFeatures = [
    {
      badge: "FRONT OF HOUSE",
      title: "Smart Point of Sale (POS)",
      metadata: "Lightning fast billing",
      desc: "Process orders in seconds. Works flawlessly on any device, ensuring your staff can manage dine-in, takeaway, and delivery without skipping a beat.",
      icon: (
        <svg className="w-8 h-8 text-[#FF4F18]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      badge: "BACK OF HOUSE",
      title: "Kitchen Display System",
      metadata: "No more lost tickets",
      desc: "Send orders directly to the kitchen instantly. Track prep times, prioritize tickets, and drastically reduce human error during peak hours.",
      icon: (
        <svg className="w-8 h-8 text-[#FF4F18]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      )
    },
    {
      badge: "MANAGEMENT",
      title: "Inventory & Recipes",
      metadata: "Automated stock tracking",
      desc: "Know exactly what's in your pantry. Set low-stock alerts and automatically calculate recipe costs to maintain healthy profit margins.",
      icon: (
        <svg className="w-8 h-8 text-[#FF4F18]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      badge: "GROWTH",
      title: "Live Analytics Dashboard",
      metadata: "Real-time insights",
      desc: "Access live sales data, staff performance, and top-selling items from anywhere on your phone. Make business decisions based on real data.",
      icon: (
        <svg className="w-8 h-8 text-[#FF4F18]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#09090b] transition-colors duration-300 flex flex-col font-sans">
      <Header />

      <main className="flex-1 w-full pt-20">
        
        {/* Hero Section */}
        <section className="relative px-6 md:px-8 pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FF4F18]/10 dark:bg-[#FF4F18]/15 blur-[100px] rounded-full pointer-events-none z-0" />
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFF3EF] dark:bg-[#FF4F18]/10 text-xs sm:text-[13px] font-extrabold text-[#FF4F18] uppercase tracking-widest border border-orange-100 dark:border-transparent">
              Product Overview
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-[850] tracking-tight text-zinc-900 dark:text-white leading-[1.05]">
              The engine behind <br className="hidden md:block" />
              <span className="text-[#FF4F18]">successful restaurants.</span>
            </h1>
            <p className="text-lg md:text-[19px] text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl mx-auto">
              Digitory is a complete restaurant operating system designed to handle the chaos. From table management to advanced inventory tracking, we build tools that actually work for you.
            </p>
          </div>
        </section>

        {/* Feature Grid (Inspired by Insights Component) */}
        <section className="py-16 bg-white dark:bg-[#121214] border-y border-zinc-200/50 dark:border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="mb-12 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15]">
                Built for <span className="text-[#FF4F18]">every aspect</span> of your business
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {productFeatures.map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col h-full bg-white dark:bg-zinc-900/60 rounded-[28px] border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 group p-8 md:p-10"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#FFF3EF] dark:bg-[#FF4F18]/10 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[11px] font-extrabold px-3 py-1.5 rounded-full tracking-wider">
                      {feature.badge}
                    </span>
                  </div>

                  <div className="space-y-4 mt-auto">
                    <div>
                      <p className="text-[13px] text-[#FF4F18] font-bold tracking-wide uppercase mb-2">
                        {feature.metadata}
                      </p>
                      <h3 className="text-2xl font-extrabold text-[#111111] dark:text-white leading-snug">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-[15px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wide Highlight Section (Inspired by Home/TestSection or Home/Orders layout) */}
        <section className="py-20 md:py-32 bg-[#FAFAFA] dark:bg-[#09090b]">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="bg-white dark:bg-zinc-900 rounded-[32px] md:rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-zinc-200/60 dark:border-zinc-800/60 relative overflow-hidden">
              
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF4F18]/10 dark:bg-[#FF4F18]/20 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

              <div className="lg:w-1/2 relative z-10 text-center lg:text-left">
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-white/10 text-xs sm:text-[13px] font-extrabold text-zinc-500 dark:text-white uppercase tracking-widest mb-6 border border-zinc-200 dark:border-transparent">
                  OMNICHANNEL SYNC
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-[850] tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-6">
                  Stop juggling tablets.
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-[17px] font-medium leading-relaxed mb-8">
                  Digitory integrates directly with Swiggy, Zomato, and your own QR ordering system. All orders flow directly into a single screen and print straight to your kitchen.
                </p>
                <ul className="space-y-4 text-left max-w-sm mx-auto lg:mx-0">
                  {['Auto-accept incoming orders', 'Sync menus instantly across platforms', 'Unified daily sales reporting'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#FF4F18]/10 dark:bg-[#FF4F18]/20 flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-[#FF4F18]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[15px] font-medium text-zinc-700 dark:text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:w-1/2 relative z-10 w-full">
                {/* Abstract UI representation */}
                <div className="bg-zinc-50 dark:bg-[#1C1C1E] rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xl relative">
                  <div className="flex gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-transparent shadow-sm dark:shadow-none">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${i === 1 ? 'bg-orange-500/10 dark:bg-orange-500/20 text-orange-500' : i === 2 ? 'bg-red-500/10 dark:bg-red-500/20 text-red-500' : 'bg-[#FF4F18]/10 dark:bg-[#FF4F18]/20 text-[#FF4F18]'}`}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                          </div>
                          <div>
                            <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />
                            <div className="h-3 w-16 bg-zinc-100 dark:bg-zinc-800 rounded" />
                          </div>
                        </div>
                        <div className="h-6 w-16 bg-[#FF4F18]/10 dark:bg-[#FF4F18]/20 text-[#FF4F18] text-[10px] font-bold flex items-center justify-center rounded-full">
                          NEW
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white dark:bg-[#121214] border-t border-zinc-200/50 dark:border-zinc-800/50">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[850] tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
              Ready to upgrade your <br />
              <span className="text-[#FF4F18]">restaurant operations?</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/request-demo"
                className="w-full sm:w-auto inline-flex justify-center items-center rounded-full bg-[#FF4F18] px-8 py-3.5 text-[15px] font-bold text-white transition-all hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.3)] active:scale-[0.98]"
              >
                Request a Demo
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex justify-center items-center rounded-full bg-zinc-100 dark:bg-zinc-900 px-8 py-3.5 text-[15px] font-bold text-zinc-900 dark:text-white transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 active:scale-[0.98]"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>

      </main>

      <FooterPage />
    </div>
  );
}

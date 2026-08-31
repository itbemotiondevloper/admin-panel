'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();
  const [simFlow, setSimFlow] = useState<'dinein' | 'inventory' | 'sync'>('dinein');
  const [activeTab, setActiveTab] = useState<'what' | 'does' | 'how'>('what');

  // Reset tab to Step 1 when flow changes
  React.useEffect(() => {
    setActiveTab('what');
  }, [simFlow]);

  const trustCircles = [
    { text: 'R', bg: 'bg-[#ECECEC]', textCol: 'text-zinc-600' },
    { text: 'C', bg: 'bg-[#D2E9E9]', textCol: 'text-teal-600' },
    { text: 'B', bg: 'bg-[#FFE5D9]', textCol: 'text-orange-600' },
    { text: 'K', bg: 'bg-[#E8EAFF]', textCol: 'text-indigo-600' },
  ];

  const chatMessages = [
    {
      role: 'Chef',
      text: 'Orders reaching kitchen on time. 🍳',
      time: '7:42 PM',
      avatarColor: 'bg-emerald-100 text-emerald-700',
      avatarLabel: '👨‍🍳',
    },
    {
      role: 'Inventory',
      text: 'Stock updated. No low stock. 📦',
      time: '7:45 PM',
      avatarColor: 'bg-orange-100 text-orange-700',
      avatarLabel: '📦',
    },
    {
      role: 'Cashier',
      text: 'Billing running smoothly. 🧾',
      time: '7:48 PM',
      avatarColor: 'bg-blue-100 text-blue-700',
      avatarLabel: '💵',
    },
    {
      role: 'Captain',
      text: 'All tables served on time. 🍽️',
      time: '7:52 PM',
      avatarColor: 'bg-indigo-100 text-indigo-700',
      avatarLabel: '🤵',
    },
    {
      role: 'Manager',
      text: 'Sales looking great today! 🚀',
      time: '7:53 PM',
      avatarColor: 'bg-amber-100 text-amber-700',
      avatarLabel: '👔',
    },
  ];


  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 pt-4 pb-10 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center -mt-3 md:-mt-6 lg:-mt-8">

        {/* Left Copy Column */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 md:space-y-8">
          {/* Tagline */}
          <div className="flex items-center gap-2">
            {/* <span className="h-1.5 w-1.5 rounded-full bg-[#FF4F18]"></span> */}
            {/* <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#FF4F18]">
              Built for restaurants, cafés & cloud kitchens
            </span> */}
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Manage busy hours <span className="text-[#FF4F18]">with<br />ease</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-xl leading-relaxed">
            From billing and inventory to customer loyalty and reports, Digitory helps you run your restaurant smoothly and grow your business.          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/request-demo"
              className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer"
            >
              Book a demo
            </Link>
            {/* <Link
              href="#"
              className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer"
            >
              See how it works
            </Link> */}
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-4 pt-4 border-t border-zinc-100">
            <div className="flex -space-x-3">
              {trustCircles.map((circle, idx) => (
                <div
                  key={idx}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${circle.bg} ${circle.textCol} font-extrabold text-xs border-2 border-white`}
                >
                  {circle.text}
                </div>
              ))}
            </div>
            <p className="text-xs md:text-sm text-zinc-500 max-w-xs leading-normal">
              Trusted by restaurants, cafés, bars, breweries and cloud kitchens across India.
            </p>
          </div>
        </div>

        {/* Right Column - Restaurant Kitchen Image (Commented out) */}
        {/*
        <div className="lg:col-span-6 flex justify-center w-full">
          <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden border border-zinc-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.015)] group">
            <img
              src="/kitchen.png"
              alt="Restaurant Kitchen"
              className="w-full h-full object-cover transition-transform duration-555 group-hover:scale-[1.02]"
            />
          </div>
        </div>
        */}

        {/* Right Column - Hero Image (Commented out) */}
        {/*
        <div className="lg:col-span-6 flex justify-center lg:justify-end w-full relative perspective-[1000px]">
          <div 
            className="relative w-full max-w-[400px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(255,79,24,0.15)] z-10 transition-transform duration-500 hover:-translate-y-1"
          >
            <Image
              src="/home-hero.png"
              alt="Digitory Restaurant OS"
              fill
              className="object-cover transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 border border-black/5 dark:border-white/10 rounded-[24px] pointer-events-none" />
              {/* Right Column - Custom Interactive Platform Diagram (Commented out previous version) */}
        {/*
        <div className="lg:col-span-6 flex flex-col items-center lg:items-end w-full">
          <div className="w-full max-w-[480px] bg-white dark:bg-[#121214] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_15px_40px_rgba(255,79,24,0.03)] border border-zinc-150 dark:border-zinc-800 transition-all duration-300">
            <div className="bg-[#18181b] dark:bg-black px-4 py-2 flex items-center justify-between text-white">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[9.5px] font-mono tracking-wider text-zinc-400">The Digitory platform</span>
              <span className="text-[7.5px] font-mono tracking-widest text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30 uppercase font-bold">&#9679; ONE RECORD</span>
            </div>
            <div className="relative p-3.5 space-y-2.5 text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">
              <div className="absolute left-2.5 top-12 bottom-16 w-[1px] bg-orange-200/40 dark:bg-orange-950/15" />
              <div className="absolute right-2.5 top-12 bottom-16 w-[1px] bg-orange-200/40 dark:bg-orange-950/15" />
              <div className="absolute left-2.5 top-12 w-6 h-[1px] bg-orange-200/40 dark:bg-orange-950/15" />
              <div className="absolute right-2.5 top-12 w-6 h-[1px] bg-orange-200/40 dark:bg-orange-950/15" />
              <div className="absolute left-2.5 bottom-16 w-6 h-[1px] bg-orange-200/40 dark:bg-orange-950/15" />
              <div className="absolute right-2.5 bottom-16 w-6 h-[1px] bg-orange-200/40 dark:bg-orange-950/15" />
              <div className="space-y-1">
                <div className="text-[7.5px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1">1 · THE ORDER COMES IN</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { title: 'POS · Billing', sub: 'COUNTER' },
                    { title: 'QR Ordering', sub: 'TABLE' },
                    { title: 'Order Taking App', sub: 'CAPTAIN' }
                  ].map((box, i) => (
                    <div key={i} className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-150 dark:border-zinc-800/60 rounded-lg p-1.5 text-center">
                      <div className="font-bold text-zinc-900 dark:text-white text-[9.5px]">{box.title}</div>
                      <div className="text-[7px] font-mono text-zinc-400 mt-0.5">{box.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-around items-center h-3">
                {[1, 2, 3].map((n) => (
                  <svg key={n} className="w-2.5 h-3 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 10 20">
                    <path d="M5 0 L5 20 M2 14 L5 20 L8 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ))}
              </div>
              <div className="text-center relative">
                <div className="inline-block w-[85%] bg-orange-50/50 dark:bg-orange-950/10 border border-[#FF4F18] rounded-xl px-4 py-1.5 shadow-sm z-10 max-w-sm mx-auto">
                  <div className="font-extrabold text-[#FF4F18] text-[10.5px] tracking-wide">One live record</div>
                  <div className="text-[6.5px] font-mono text-zinc-500 dark:text-zinc-400 mt-0.5 uppercase tracking-wider">The bill and the stock movement are the same write</div>
                </div>
              </div>
              <div className="flex justify-around items-center h-3">
                {[1, 2, 3].map((n) => (
                  <svg key={n} className="w-2.5 h-3 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 10 20">
                    <path d="M5 0 L5 20 M2 14 L5 20 L8 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ))}
              </div>
              <div className="space-y-1">
                <div className="text-[7.5px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1">2 · EVERYTHING RUNS OFF IT</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { title: 'Kitchen Display', sub: 'STATIONS' },
                    { title: 'Stock', sub: 'LIVE, AS YOU SELL', highlight: true },
                    { title: 'Inventory', sub: 'GRN · PO · VENDORS' }
                  ].map((box, i) => (
                    <div key={i} className={`rounded-lg p-1.5 text-center transition-all ${
                      box.highlight 
                        ? 'border border-[#FF4F18] bg-orange-50/20 dark:bg-orange-950/5 shadow-sm' 
                        : 'bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-150 dark:border-zinc-800/60'
                    }`}>
                      <div className={`font-bold text-[9.5px] ${box.highlight ? 'text-[#FF4F18]' : 'text-zinc-900 dark:text-white'}`}>{box.title}</div>
                      <div className="text-[7px] font-mono text-zinc-400 mt-0.5">{box.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-around items-center h-3">
                {[1, 2, 3].map((n) => (
                  <svg key={n} className="w-2.5 h-3 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 10 20">
                    <path d="M5 0 L5 20 M2 14 L5 20 L8 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ))}
              </div>
              <div className="space-y-1">
                <div className="text-[7.5px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1">3 · WHAT IT COST YOU</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { title: 'Recipe', sub: 'COST PER DISH' },
                    { title: 'Party Management', sub: 'EVENT COSTING' },
                    { title: 'Cost of Issue', sub: 'VS REVENUE, REAL TIME', highlight: true }
                  ].map((box, i) => (
                    <div key={i} className={`rounded-lg p-1.5 text-center transition-all ${
                      box.highlight 
                        ? 'border border-[#FF4F18] bg-orange-50/20 dark:bg-orange-950/5 shadow-sm' 
                        : 'bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-150 dark:border-zinc-800/60'
                    }`}>
                      <div className={`font-bold text-[9.5px] ${box.highlight ? 'text-[#FF4F18]' : 'text-zinc-900 dark:text-white'}`}>{box.title}</div>
                      <div className="text-[7px] font-mono text-zinc-400 mt-0.5">{box.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center h-3">
                <svg className="w-2.5 h-3 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 10 20">
                  <path d="M5 0 L5 20 M2 14 L5 20 L8 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="bg-[#121824] dark:bg-black border border-zinc-850 rounded-xl p-2 text-center text-white shadow-md">
                <div className="font-extrabold text-[10.5px] text-zinc-100 tracking-wide">Analytics & AI layer</div>
                <div className="text-[6.5px] font-mono text-zinc-400 mt-0.5 uppercase tracking-widest">Reads and acts across every module above</div>
              </div>
              <div className="text-center text-[7.5px] font-mono text-zinc-4        {/* Right Column - Interactive Workflow Simulator Widget */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-end w-full lg:pt-8 select-none">

          {/* Premium Interactive Simulator Card */}
          <div className="w-full max-w-[500px] bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-[24px] p-6 md:p-8 flex flex-col gap-4 relative text-zinc-900 dark:text-white shadow-[0_8px_30px_rgb(0,0,0,0.015)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
            
            {/* Widget Title */}
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span className="text-[11px] font-extrabold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                  POS TELEMETRY SYSTEM • MULTI-FLOW
                </span>
              </div>
            </div>

            {/* Simulation Flow Selection Dropdown */}
            <div className="space-y-1">
              <label htmlFor="sim-flow-select" className="text-[9px] font-black text-zinc-400 dark:text-zinc-550 tracking-wider block uppercase">
                Select Simulation Flow:
              </label>
              <div className="relative">
                <select
                  id="sim-flow-select"
                  value={simFlow}
                  onChange={(e) => setSimFlow(e.target.value as any)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-200 py-2 px-3 rounded-xl text-[10px] font-bold tracking-wide appearance-none focus:outline-hidden focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] transition-all duration-200 cursor-pointer"
                >
                  <option value="dinein">🍴 Dine-In Billing Flow</option>
                  <option value="inventory">📦 Smart Inventory Audit Flow</option>
                  <option value="sync">⚡ Aggregator Menu Price Sync</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
                  <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Clickable Workflow Progress Tabs */}
            <div>
              <span className="text-[10px] font-extrabold text-zinc-500 dark:text-zinc-400 tracking-widest block mb-2 uppercase">
                Select Active State:
              </span>
              <div className="grid grid-cols-3 gap-3">
                {(['what', 'does', 'how'] as const).map((t) => {
                  const isActive = activeTab === t;
                  
                  // Custom tab headings depending on flow
                  let label = '';
                  let status = '';
                  if (simFlow === 'dinein') {
                    label = t === 'what' ? '1. Punch' : t === 'does' ? '2. KOT' : '3. Settle';
                    status = t === 'what' ? 'Order' : t === 'does' ? 'Print KOT' : 'Bill Reconciled';
                  } else if (simFlow === 'inventory') {
                    label = t === 'what' ? '1. Receive' : t === 'does' ? '2. Audit' : '3. Reorder';
                    status = t === 'what' ? 'GRN Entry' : t === 'does' ? 'Variance Check' : 'Auto Stock PO';
                  } else {
                    label = t === 'what' ? '1. Change' : t === 'does' ? '2. Toggle' : '3. Broadcast';
                    status = t === 'what' ? 'Update Price' : t === 'does' ? 'Mark Out' : 'Zomato/Swiggy';
                  }

                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setActiveTab(t)}
                      className={`flex flex-col items-center justify-center py-2 px-2.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#FF4F18] border-[#FF4F18] text-white shadow-[0_4px_14px_rgba(255,79,24,0.3)]"
                          : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <span className="text-xs font-black">{label}</span>
                      <span className={`text-[8.5px] font-bold mt-1 ${isActive ? "text-white/90" : "text-zinc-500 dark:text-zinc-400"}`}>
                        {status}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Display Content Box */}
            <div className="bg-[#F8F9FA] dark:bg-zinc-800/50 rounded-2xl p-5 border border-transparent h-[175px] flex flex-col justify-between transition-all duration-300 animate-[fadeIn_0.3s_ease]">
              {(() => {
                // Dine-In Flow Content
                if (simFlow === 'dinein') {
                  if (activeTab === 'what') {
                    return (
                      <div className="space-y-3 animate-[fadeIn_0.2s_ease] text-left">
                        <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-zinc-450 dark:text-zinc-500 font-extrabold">
                          <span>Dine-In Billing • Step 1</span>
                          <span className="text-[#FF4F18] font-bold">Punching Order</span>
                        </div>
                        <h5 className="text-[13px] font-black text-zinc-900 dark:text-white">
                          Punched Dine-in Order
                        </h5>
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-3 flex justify-between items-center shadow-xs">
                          <div>
                            <span className="block text-[10px] font-black text-zinc-850 dark:text-zinc-200">Paneer Tikka Double</span>
                            <span className="text-[8px] font-bold text-zinc-450">Qty: 2 • Table 05</span>
                          </div>
                          <span className="text-[12px] font-black text-[#FF4F18]">₹480</span>
                        </div>
                        <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                          Table order punched on screen. Click below to print the Kitchen Order Ticket.
                        </p>
                      </div>
                    );
                  }
                  if (activeTab === 'does') {
                    return (
                      <div className="space-y-3 animate-[fadeIn_0.2s_ease] text-left">
                        <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-[#10B981] font-extrabold animate-pulse">
                          <span>Dine-In Billing • Step 2</span>
                          <span>Printing KOT</span>
                        </div>
                        <h5 className="text-[13px] font-black text-zinc-900 dark:text-white">
                          KOT Ticket Dispatched
                        </h5>
                        <div className="bg-[#FFFDF9] dark:bg-amber-950/10 border border-amber-250 dark:border-amber-900/30 rounded-xl p-3 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                            <div>
                              <span className="block text-[10px] font-black text-amber-800 dark:text-amber-400">Tandoor Printer Status</span>
                              <span className="text-[8px] font-bold text-amber-600">Table 05 • KOT #118 Sent</span>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono font-black text-amber-700 bg-amber-100 dark:bg-amber-950/40 px-2 py-0.5 rounded">Active</span>
                        </div>
                        <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                          Kitchen ticket printed instantly. Preparation started. Click below to settle billing.
                        </p>
                      </div>
                    );
                  }
                  if (activeTab === 'how') {
                    return (
                      <div className="space-y-3 animate-[fadeIn_0.2s_ease] text-left">
                        <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-emerald-600 font-extrabold">
                          <span>Dine-In Billing • Step 3</span>
                          <span>Bill Settled</span>
                        </div>
                        <h5 className="text-[13px] font-black text-zinc-900 dark:text-white">
                          Reconciled Settle State
                        </h5>
                        <div className="grid grid-cols-2 gap-2 text-[9px] font-bold text-zinc-650 dark:text-zinc-300">
                          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl p-2 text-center">
                            <span className="block text-[7px] text-zinc-400 uppercase">Settled Amount</span>
                            <span className="text-emerald-600 font-black">₹480 (UPI)</span>
                          </div>
                          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl p-2 text-center">
                            <span className="block text-[7px] text-zinc-400 uppercase">Stock Deduct</span>
                            <span className="text-[#E11D48]">-400g Paneer</span>
                          </div>
                        </div>
                        <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                          Reconciliation complete! Ledger settled and stock updated. Zero entry discrepancies.
                        </p>
                      </div>
                    );
                  }
                }

                // Inventory Flow Content
                if (simFlow === 'inventory') {
                  if (activeTab === 'what') {
                    return (
                      <div className="space-y-3 animate-[fadeIn_0.2s_ease] text-left">
                        <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-zinc-450 dark:text-zinc-500 font-extrabold">
                          <span>Inventory Audit • Step 1</span>
                          <span className="text-[#FF4F18] font-bold">GRN Entry</span>
                        </div>
                        <h5 className="text-[13px] font-black text-zinc-900 dark:text-white">
                          Smart Stock Intake (GRN)
                        </h5>
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-3 flex justify-between items-center shadow-xs">
                          <div>
                            <span className="block text-[10px] font-black text-zinc-850 dark:text-zinc-200">Premium Dairy Butter</span>
                            <span className="text-[8px] font-bold text-zinc-450">Vendor: Mother Dairy • Batch #08</span>
                          </div>
                          <span className="text-[12px] font-black text-zinc-800 dark:text-zinc-250">50 Kg</span>
                        </div>
                        <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                          Vendor shipment received. Click below to scale-check variance and audit discrepancies.
                        </p>
                      </div>
                    );
                  }
                  if (activeTab === 'does') {
                    return (
                      <div className="space-y-3 animate-[fadeIn_0.2s_ease] text-left">
                        <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-[#10B981] font-extrabold animate-pulse">
                          <span>Inventory Audit • Step 2</span>
                          <span>Variance Audit</span>
                        </div>
                        <h5 className="text-[13px] font-black text-zinc-900 dark:text-white">
                          Wastage & Variance Checked
                        </h5>
                        <div className="bg-[#FFFDF9] dark:bg-amber-950/10 border border-amber-250 dark:border-amber-900/30 rounded-xl p-3 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <div>
                              <span className="block text-[10px] font-black text-emerald-800 dark:text-emerald-400">Scale Reading vs Invoice</span>
                              <span className="text-[8px] font-bold text-emerald-600">Expected: 50.00kg | Actual: 50.00kg</span>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono font-black text-emerald-700 bg-emerald-100 dark:bg-emerald-950/40 px-2 py-0.5 rounded">0.00% Var</span>
                        </div>
                        <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                          Scale telemetry matches invoice weights. Zero wastage variance. Click to run auto-reorders.
                        </p>
                      </div>
                    );
                  }
                  if (activeTab === 'how') {
                    return (
                      <div className="space-y-3 animate-[fadeIn_0.2s_ease] text-left">
                        <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-emerald-600 font-extrabold">
                          <span>Inventory Audit • Step 3</span>
                          <span>Auto Reordered</span>
                        </div>
                        <h5 className="text-[13px] font-black text-zinc-900 dark:text-white">
                          Automated Vendor Purchase
                        </h5>
                        <div className="grid grid-cols-2 gap-2 text-[9px] font-bold text-zinc-650 dark:text-zinc-300">
                          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl p-2 text-center">
                            <span className="block text-[7px] text-zinc-400 uppercase">Trigger Threshold</span>
                            <span className="text-zinc-900 dark:text-white font-black">&lt; 10 Kg</span>
                          </div>
                          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl p-2 text-center">
                            <span className="block text-[7px] text-zinc-400 uppercase">Auto PO Generated</span>
                            <span className="text-emerald-600 font-black">PO #992 (Sent)</span>
                          </div>
                        </div>
                        <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                          Ingredients fell below thresholds. Auto-purchase order generated and sent to vendor.
                        </p>
                      </div>
                    );
                  }
                }

                // Sync Flow Content
                if (simFlow === 'sync') {
                  if (activeTab === 'what') {
                    return (
                      <div className="space-y-3 animate-[fadeIn_0.2s_ease] text-left">
                        <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-zinc-450 dark:text-zinc-500 font-extrabold">
                          <span>Aggregator Sync • Step 1</span>
                          <span className="text-[#FF4F18] font-bold">Update Price</span>
                        </div>
                        <h5 className="text-[13px] font-black text-zinc-900 dark:text-white">
                          POS Menu Price Revision
                        </h5>
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-3 flex justify-between items-center shadow-xs">
                          <div>
                            <span className="block text-[10px] font-black text-zinc-850 dark:text-zinc-200">Butter Chicken Full</span>
                            <span className="text-[8px] font-bold text-zinc-400">POS Pricing Revision</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[9px] line-through text-zinc-400">₹350</span>
                            <span className="text-[12px] font-black text-emerald-600">₹380</span>
                          </div>
                        </div>
                        <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                          Revised dish price on the central terminal dashboard. Click below to toggle item stocks.
                        </p>
                      </div>
                    );
                  }
                  if (activeTab === 'does') {
                    return (
                      <div className="space-y-3 animate-[fadeIn_0.2s_ease] text-left">
                        <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-[#10B981] font-extrabold">
                          <span>Aggregator Sync • Step 2</span>
                          <span>Toggle Stock Status</span>
                        </div>
                        <h5 className="text-[13px] font-black text-zinc-900 dark:text-white">
                          Mark Dish Out-Of-Stock
                        </h5>
                        <div className="bg-[#FFFDF9] dark:bg-amber-950/10 border border-amber-250 dark:border-amber-900/30 rounded-xl p-3 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
                            <div>
                              <span className="block text-[10px] font-black text-zinc-800 dark:text-zinc-300">Mango Thickshake</span>
                              <span className="text-[8px] font-bold text-zinc-450">Stock level critical</span>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono font-black text-red-700 bg-red-100 dark:bg-red-950/40 px-2 py-0.5 rounded">Toggled Off</span>
                        </div>
                        <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                          Marked shake out-of-stock globally. Click below to broadcast price and status online.
                        </p>
                      </div>
                    );
                  }
                  if (activeTab === 'how') {
                    return (
                      <div className="space-y-3 animate-[fadeIn_0.2s_ease] text-left">
                        <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-emerald-600 font-extrabold">
                          <span>Aggregator Sync • Step 3</span>
                          <span>Zomato/Swiggy Broadcasted</span>
                        </div>
                        <h5 className="text-[13px] font-black text-zinc-900 dark:text-white">
                          Global Delivery Synchronized
                        </h5>
                        <div className="grid grid-cols-2 gap-2 text-[9px] font-bold text-zinc-650 dark:text-zinc-300">
                          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl p-2 text-center">
                            <span className="block text-[7px] text-zinc-400 uppercase">Swiggy Menu API</span>
                            <span className="text-emerald-600 font-black">Sync (Success)</span>
                          </div>
                          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl p-2 text-center">
                            <span className="block text-[7px] text-zinc-400 uppercase">Zomato Menu API</span>
                            <span className="text-emerald-600 font-black">Sync (Success)</span>
                          </div>
                        </div>
                        <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                          Revised price and status pushed globally. Swiggy & Zomato updated instantly without manual portal management.
                        </p>
                      </div>
                    );
                  }
                }
              })()}
            </div>

            {/* Simulation Trigger / Control Button */}
            <div>
              {activeTab === 'what' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('does')}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#FF4F18] py-3.5 text-xs font-black text-white transition-all hover:bg-[#E03F0D] active:scale-[0.98] cursor-pointer"
                >
                  {simFlow === 'dinein' && "Print Kitchen Order Ticket (KOT) ➔"}
                  {simFlow === 'inventory' && "Check Variance Audit ➔"}
                  {simFlow === 'sync' && "Toggle Item Availability ➔"}
                </button>
              )}
              {activeTab === 'does' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('how')}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#FF4F18] py-3.5 text-xs font-black text-white transition-all hover:bg-[#E03F0D] active:scale-[0.98] cursor-pointer"
                >
                  {simFlow === 'dinein' && "Guest Requests Bill ➔"}
                  {simFlow === 'inventory' && "Process Auto Reorder ➔"}
                  {simFlow === 'sync' && "Sync to Zomato & Swiggy ➔"}
                </button>
              )}
              {activeTab === 'how' && (
                <button
                  type="button"
                  onClick={() => router.push("/request-demo")}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-emerald-600 py-3.5 text-xs font-black text-white transition-all hover:bg-emerald-750 shadow-[0_4px_12px_rgba(16,185,129,0.2)] active:scale-[0.98] cursor-pointer animate-[fadeIn_0.3s_ease]"
                >
                  Book a Live Demo
                </button>
              )}
            </div>

          </div>

          {/* Under Caption */}
          <p className="mt-4 text-xs md:text-sm text-zinc-650 dark:text-zinc-400 text-center lg:text-left font-medium max-w-[500px] w-full">
            One record underneath, AI across the top — <span className="font-extrabold text-[#FF4F18]">nothing re-entered, nothing reconciled.</span>
          </p>
        </div>

      </div>
    </section>
  );
}

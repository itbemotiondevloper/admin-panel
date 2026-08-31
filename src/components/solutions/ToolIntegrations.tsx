"use client";

import React from "react";
import Image from "next/image";

interface IntegrationItem {
  id: string;
  name: string;
  subtext: string;
  iconSvg: React.ReactNode;
}

interface IntegrationsProps {
  data?: {
    title: string;
    desc: string;
    items: {
      id: string;
      name: string;
      subtext: string;
    }[];
  };
}

export default function ToolIntegrations({ data }: IntegrationsProps) {
  const title = data?.title || "Connects with *your favorite apps.*";
  const desc = data?.desc || "1-click setup with Swiggy, Zomato, Razorpay, Paytm, Tally, WhatsApp, and POS hardware.";

  const svgMap: Record<string, React.ReactNode> = {
    swiggy: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    razorpay: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    zomato: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 01-2 2m-6 9l2 2 4-4" />
      </svg>
    ),
    tally: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    paytm: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    whatsapp: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  };

  const defaultItems = [
    { id: "swiggy", name: "Swiggy Direct", subtext: "2-way menu & order sync." },
    { id: "razorpay", name: "Razorpay", subtext: "UPI & Card reconciliation." },
    { id: "zomato", name: "Zomato Connect", subtext: "Auto-accept & instant toggles." },
    { id: "tally", name: "Tally Prime", subtext: "Automated daily sales entries." },
    { id: "paytm", name: "Paytm", subtext: "Instant QR payments." },
    { id: "whatsapp", name: "WhatsApp", subtext: "Automated billing alerts." }
  ];

  const rawItems = data?.items || defaultItems;
  const integrations: IntegrationItem[] = rawItems.map(item => ({
    id: item.id,
    name: item.name,
    subtext: item.subtext,
    iconSvg: svgMap[item.id] || svgMap.swiggy
  }));

  function renderHighlightedText(text: string) {
    if (!text) return "";
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <span key={i} className="text-[#FF4F18]">
            {part.slice(1, -1)}
          </span>
        );
      }
      return part;
    });
  }

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24 overflow-hidden">
      
      {/* Header Block: Left Heading, Right Subtitle */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-16 md:mb-24">
        <div className="lg:col-span-7 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight leading-[1.15]">
            {renderHighlightedText(title)}
          </h2>
        </div>
        <div className="lg:col-span-5 text-zinc-650 dark:text-zinc-400 text-sm md:text-base leading-relaxed lg:pt-2 text-left">
          <p>{desc}</p>
        </div>
      </div>

      {/* Professional Circuit-Board Architecture */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0">
        
        {/* Mobile View: Simple Grid (Hidden on Desktop) */}
        <div className="md:hidden grid grid-cols-1 gap-4 w-full text-left">
          {integrations.map((item) => (
            <div key={item.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm w-full">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300">
                {item.iconSvg}
              </div>
              <div className="text-left">
                <h4 className="text-[14px] font-bold text-zinc-900 dark:text-white mb-0.5">{item.name}</h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">{item.subtext}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Network Diagram */}
        <div className="hidden md:flex items-center justify-center w-full">
          
          {/* Left Column (Integrations 1, 2, 5) */}
          <div className="relative flex flex-col gap-10 w-[220px]">
            {/* Vertical Circuit Line */}
            <div className="absolute -right-10 top-[3rem] bottom-[3rem] w-[2px] bg-gradient-to-b from-zinc-200/20 via-zinc-200 dark:via-zinc-700 to-zinc-200/20" />
            {/* Horizontal Connection to Center Node */}
            <div className="absolute -right-20 top-1/2 w-10 h-[2px] bg-gradient-to-r from-zinc-200 dark:from-zinc-700 to-[#FF4F18]/40" />
            
            {[integrations[0], integrations[1], integrations[4]].filter(Boolean).map((item) => (
              <div key={item.id} className="relative z-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[16px] p-3 flex items-center gap-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:border-[#FF4F18]/40 transition-colors duration-300">
                {/* Horizontal line to vertical track */}
                <div className="absolute -right-10 top-1/2 w-10 h-[2px] bg-zinc-200 dark:bg-zinc-700" />
                
                <div className="w-8.5 h-8.5 rounded-lg flex items-center justify-center shrink-0 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-750 dark:text-zinc-350 border border-zinc-200/40 dark:border-zinc-800/40">
                  {item.iconSvg}
                </div>
                <div className="text-left min-w-0">
                  <h4 className="text-[13px] font-extrabold text-zinc-900 dark:text-white mb-0.5 tracking-tight truncate">{item.name}</h4>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium leading-tight truncate">{item.subtext}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Central Digitory Node */}
          <div className="mx-20 relative z-20 flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 bg-white dark:bg-zinc-900 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center z-10 overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_12px_40px_rgb(0,0,0,0.3)] cursor-default">
              <div className="relative w-20 h-20 z-10">
                <Image
                  src="/demologo.png"
                  alt="Digitory Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Column (Integrations 3, 4, 6) */}
          <div className="relative flex flex-col gap-10 w-[220px]">
            {/* Vertical Circuit Line */}
            <div className="absolute -left-10 top-[3rem] bottom-[3rem] w-[2px] bg-gradient-to-b from-zinc-200/20 via-zinc-200 dark:via-zinc-700 to-zinc-200/20" />
            {/* Horizontal Connection to Center Node */}
            <div className="absolute -left-20 top-1/2 w-10 h-[2px] bg-gradient-to-l from-zinc-200 dark:from-zinc-700 to-[#FF4F18]/40" />
            
            {[integrations[2], integrations[3], integrations[5]].filter(Boolean).map((item) => (
              <div key={item.id} className="relative z-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[16px] p-3 flex items-center gap-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:border-[#FF4F18]/40 transition-colors duration-300">
                {/* Horizontal line to vertical track */}
                <div className="absolute -left-10 top-1/2 w-10 h-[2px] bg-zinc-200 dark:bg-zinc-700" />
                
                <div className="w-8.5 h-8.5 rounded-lg flex items-center justify-center shrink-0 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-750 dark:text-zinc-355 border border-zinc-200/40 dark:border-zinc-800/40">
                  {item.iconSvg}
                </div>
                <div className="text-left min-w-0">
                  <h4 className="text-[13px] font-extrabold text-zinc-900 dark:text-white mb-0.5 tracking-tight truncate">{item.name}</h4>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium leading-tight truncate">{item.subtext}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}

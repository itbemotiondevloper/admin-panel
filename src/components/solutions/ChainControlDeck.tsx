"use client";

import React, { useState } from "react";

interface OutletData {
  title: string;
  statusBadge: string;
  statusColor: string;
  badgeBg: string;
  revenue: string;
  metricLabel: string;
  metricColor: string;
}

interface ControlDeckProps {
  data?: {
    title: string;
    desc: string;
    outlets: {
      key: string;
      title: string;
      statusBadge: string;
      revenue: string;
      metricLabel: string;
    }[];
  };
}

export default function ChainControlDeck({ data }: ControlDeckProps) {
  const title = data?.title || "One Dashboard. *Every location in sync.*";
  const desc = data?.desc || "Monitor revenue, stock transfers, and store health across cities directly from your smartphone.";

  const defaultOutlets = [
    {
      key: "Chain Overview",
      title: "Chain Overview (4 Outlets)",
      statusBadge: "4 / 4 Outlets Online",
      revenue: "₹ 14,85,200",
      metricLabel: "↑ Consolidated Real-Time Sync"
    },
    {
      key: "Mumbai Flagship",
      title: "Mumbai Flagship Outlet",
      statusBadge: "Online",
      revenue: "₹ 5,42,800",
      metricLabel: "↑ 12% increase from yesterday"
    },
    {
      key: "Delhi QSR",
      title: "Delhi QSR Outlet",
      statusBadge: "Online",
      revenue: "₹ 4,12,400",
      metricLabel: "↑ Peak hour sales active"
    },
    {
      key: "Bangalore Cloud",
      title: "Bangalore Cloud Kitchen",
      statusBadge: "Online",
      revenue: "₹ 5,30,000",
      metricLabel: "↑ High order volume"
    }
  ];

  const rawOutlets = data?.outlets || defaultOutlets;
  const outlets: Record<string, OutletData> = {};
  
  rawOutlets.forEach(o => {
    outlets[o.key] = {
      title: o.title,
      statusBadge: o.statusBadge,
      statusColor: "text-[#FF4F18] border-orange-100 bg-white",
      badgeBg: "bg-white",
      revenue: o.revenue,
      metricLabel: o.metricLabel,
      metricColor: "text-[#13B257]"
    };
  });

  const keys = Object.keys(outlets);
  const [activeTab, setActiveTab] = useState<string>(keys[0] || "Chain Overview");
  const activeData = outlets[activeTab] || outlets[keys[0]];

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
    <section className="mx-auto max-w-7xl px-6 md:px-8 py-6 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Title, Description, and Tab Switcher */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 md:space-y-8 text-left">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15]">
            {renderHighlightedText(title)}
          </h2>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-zinc-650 dark:text-zinc-400 leading-relaxed max-w-xl">
            {desc}
          </p>

          {/* Tab Switcher Row */}
          <div className="flex flex-wrap gap-2.5">
            {keys.map((tabName) => {
              const isActive = activeTab === tabName;
              return (
                <button
                  key={tabName}
                  onClick={() => setActiveTab(tabName)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#FF4F18] text-white shadow-[0_4px_12px_rgba(255,79,24,0.25)]"
                      : "bg-[#F8F9FA] text-zinc-700 hover:bg-[#F1F3F5] border border-zinc-200/60"
                  }`}
                >
                  {tabName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dynamic Location Details Panel */}
        <div className="lg:col-span-6 flex justify-center w-full">
          {activeData && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.015)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[24px] p-6 md:p-8 space-y-6 w-full max-w-[500px] mx-auto lg:mx-0 select-none text-left">
              
              {/* Header: Title and Status badge */}
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-zinc-900 dark:text-white text-[16px]">
                  {activeData.title}
                </h3>
                <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${activeData.statusColor}`}>
                  {activeData.statusBadge}
                </span>
              </div>

              {/* Inner Revenue Display Card */}
              <div className="bg-transparent rounded-xl p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-center">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Location Revenue
                </span>
                <span className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white leading-none mb-3">
                  {activeData.revenue}
                </span>
                <span className={`text-xs font-extrabold flex items-center gap-1.5 ${activeData.metricColor}`}>
                  {activeData.metricLabel}
                </span>
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
}

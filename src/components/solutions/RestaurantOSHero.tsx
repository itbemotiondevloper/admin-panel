"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TABLES = [
  { id: 1, label: "Table 01", status: "Ready" },
  { id: 4, label: "Table 04", status: "Busy (3 items)" },
  { id: 9, label: "Table 09", status: "Billing" },
];

interface HeroProps {
  data?: {
    title: string;
    desc: string;
    trustText: string;
  };
}

export default function RestaurantOSHero({ data }: HeroProps) {
  const router = useRouter();
  const [dispatchState, setDispatchState] = useState<"idle" | "loading" | "success">("idle");
  const [activeTable, setActiveTable] = useState(4);

  const title = data?.title || "Spend more time *serving customers.*";
  const desc = data?.desc || "Running a restaurant is busy enough. Digitory brings billing, orders, inventory, kitchen management, and reports into one simple system, so your team can work faster and with fewer mistakes.";
  const trustText = data?.trustText || "Trusted by 500+ restaurants, cafés, bars, and cloud kitchens across India.";

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
  
  const [tablesData, setTablesData] = useState<Record<number, {
    menu: { id: number; name: string; price: number }[];
    orders: { id: number; name: string; price: number; qty: number }[];
    kdsStation: string;
  }>>({
    1: {
      menu: [
        { id: 101, name: "Margherita Pizza", price: 290 },
        { id: 102, name: "Garlic Breadsticks", price: 120 },
        { id: 103, name: "Coke Zero", price: 60 },
        { id: 104, name: "Tiramisu", price: 180 },
      ],
      orders: [],
      kdsStation: "KDS Station #1 (Pizza Oven)",
    },
    4: {
      menu: [
        { id: 1, name: "Paneer Masala", price: 280 },
        { id: 2, name: "Butter Naan", price: 70 },
        { id: 3, name: "Chicken Biryani", price: 320 },
        { id: 4, name: "Mango Lassi", price: 110 },
      ],
      orders: [
        { id: 1, name: "Paneer Butter Masala", price: 280, qty: 1 },
        { id: 2, name: "Butter Naan", price: 70, qty: 2 },
      ],
      kdsStation: "KDS Station #2 (Tandoor)",
    },
    9: {
      menu: [
        { id: 201, name: "Dahi Ke Kebab", price: 240 },
        { id: 202, name: "Dal Makhani", price: 260 },
        { id: 203, name: "Laccha Paratha", price: 80 },
        { id: 204, name: "Gulab Jamun", price: 100 },
      ],
      orders: [
        { id: 201, name: "Dahi Ke Kebab", price: 240, qty: 1 },
        { id: 202, name: "Dal Makhani", price: 260, qty: 1 },
        { id: 203, name: "Laccha Paratha", price: 80, qty: 2 },
      ],
      kdsStation: "KDS Station #2 (Tandoor)",
    }
  });

  const currentData = tablesData[activeTable] || { menu: [], orders: [], kdsStation: "KDS Station" };
  const menuItems = currentData.menu;
  const orderItems = currentData.orders;
  const total = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleAddItem = (item: { id: number; name: string; price: number }) => {
    if (dispatchState === "success") {
      setDispatchState("idle");
    }
    setTablesData((prev) => {
      const table = prev[activeTable];
      const existing = table.orders.find((o) => o.id === item.id);
      let newOrders;
      if (existing) {
        newOrders = table.orders.map((o) =>
          o.id === item.id ? { ...o, qty: o.qty + 1 } : o
        );
      } else {
        newOrders = [...table.orders, { ...item, qty: 1 }];
      }
      return {
        ...prev,
        [activeTable]: {
          ...table,
          orders: newOrders
        }
      };
    });
  };

  const handleRemoveItem = (id: number) => {
    if (dispatchState === "success") {
      setDispatchState("idle");
    }
    setTablesData((prev) => {
      const table = prev[activeTable];
      const newOrders = table.orders
        .map((o) => (o.id === id ? { ...o, qty: o.qty - 1 } : o))
        .filter((o) => o.qty > 0);
      return {
        ...prev,
        [activeTable]: {
          ...table,
          orders: newOrders
        }
      };
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 py-6 md:py-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">

        {/* Left Column: Product Information */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 md:space-y-8">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            {renderHighlightedText(title)}
          </h2>

          {/* Subtitle */}
          <p className="text-[17px] text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
            {desc}
          </p>

          {/* Action CTAs — Book a Demo turns Green on success */}
          <div className="flex flex-wrap gap-4 items-center">
            <button 
              onClick={() => router.push("/request-demo")}
              className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#E03F0D] active:scale-[0.98] cursor-pointer"
            >
              Book a Live Demo
            </button>
          </div>

          {/* Trust and Social Proof */}
          <div className="flex items-center gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex -space-x-3 select-none">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ECECEC] text-zinc-600 font-extrabold text-[11px] border-2 border-white shadow-2xs">
                R
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF3EF] text-[#FF4F18] font-extrabold text-[11px] border-2 border-white shadow-2xs">
                C
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFE5D9] text-[#FF4F18] font-extrabold text-[11px] border-2 border-white shadow-2xs">
                B
              </div>
            </div>
            <p className="text-[13px] text-zinc-500 font-medium leading-relaxed max-w-sm">
              {trustText}
            </p>
          </div>
        </div>

        {/* Right Column: Interactive POS Terminal */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.015)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[24px] p-6 md:p-8 w-full max-w-[500px] ml-auto mr-auto lg:mr-0 flex flex-col gap-4 md:gap-5 relative select-none text-zinc-900 dark:text-white">

            {/* 1. Terminal Topbar */}
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span className="text-[11px] font-extrabold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                  POS Terminal #01 • Main Floor
                </span>
              </div>
            </div>

            {/* 2. Active Table Selection — clickable */}
            <div>
              <span className="text-[10px] font-extrabold text-zinc-500 dark:text-zinc-400 tracking-widest block mb-2 uppercase">
                Select Active Table:
              </span>
              <div className="grid grid-cols-3 gap-3">
                {TABLES.map((table) => {
                  const isActive = activeTable === table.id;
                  return (
                    <button
                      key={table.id}
                      onClick={() => {
                        if (dispatchState === "success") {
                          setDispatchState("idle");
                        }
                        setActiveTable(table.id);
                      }}
                      className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#FF4F18] border-[#FF4F18] text-white shadow-[0_4px_14px_rgba(255,79,24,0.3)]"
                          : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <span className="text-sm font-extrabold">{table.label}</span>
                      <span className={`text-[10px] font-bold mt-1 ${isActive ? "text-white/90" : "text-zinc-500 dark:text-zinc-400"}`}>
                        {table.status}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Fast Billing Shortcuts — clickable, adds to order */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold text-zinc-500 dark:text-zinc-400 tracking-widest uppercase">
                  Fast Billing Shortcuts:
                </span>
                <span className="text-xs font-black text-[#FF4F18] uppercase tracking-wide">
                  Total: ₹ {total}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleAddItem(item)}
                    className="flex justify-between items-center py-2.5 px-3 bg-[#F8F9FA] dark:bg-zinc-800/50 border border-transparent hover:border-zinc-200/20 dark:hover:border-zinc-700/50 hover:bg-[#F1F3F5] dark:hover:bg-zinc-800 rounded-xl transition-all duration-200 cursor-pointer text-left active:scale-[0.97]"
                  >
                    <span className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100">+ {item.name}</span>
                    <span className="text-[11px] font-black text-zinc-500 dark:text-zinc-400">₹{item.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Order List / Success Area */}
            {dispatchState === "success" ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-5 border border-emerald-250 dark:border-emerald-800/30 flex flex-col items-center justify-center text-center gap-2 min-h-[80px] animate-[fadeIn_0.3s_ease]">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-400">Order Placed Successfully!</p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-550">Sent to KDS Station & Ticket Printed.</p>
              </div>
            ) : (
              <div className="bg-[#F8F9FA] dark:bg-zinc-800/50 rounded-2xl p-4 border border-transparent flex flex-col gap-2 min-h-[80px]">
                {orderItems.length === 0 ? (
                  <p className="text-[12px] text-zinc-400 text-center py-2">No items added yet. Tap a shortcut above.</p>
                ) : (
                  orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-[13px]">
                      <div className="flex items-center gap-2 min-w-0">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center text-[11px] font-bold hover:bg-red-100 hover:text-red-500 transition-colors flex-shrink-0 cursor-pointer"
                        >
                          −
                        </button>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                          {item.qty}x {item.name}
                        </span>
                      </div>
                      <span className="font-extrabold text-zinc-500 dark:text-zinc-400 flex-shrink-0 ml-2">
                        ₹{item.price * item.qty}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 5. KDS Status Bar */}
            <div className="flex items-center bg-zinc-50 dark:bg-zinc-900/50 px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400">
                  {currentData.kdsStation}
                </span>
              </div>
            </div>

            {/* 6. Dispatch Button — no glow */}
            <button
              onClick={() => {
                if (dispatchState === "idle") {
                  setDispatchState("loading");
                  setTimeout(() => {
                    setDispatchState("success");
                  }, 1500);
                } else if (dispatchState === "success") {
                  router.push("/request-demo");
                }
              }}
              disabled={dispatchState === "loading"}
              className={`w-full inline-flex justify-center items-center gap-2 text-center rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 active:scale-[0.98] cursor-pointer ${
                dispatchState === "loading"
                  ? "bg-zinc-400 cursor-not-allowed"
                  : dispatchState === "success"
                  ? "bg-emerald-600 hover:bg-emerald-750 shadow-[0_4px_14px_rgba(16,185,129,0.2)]"
                  : "bg-[#FF4F18] hover:bg-[#E03F0D]"
              }`}
            >
              {dispatchState === "loading" && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {dispatchState === "idle" && (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              )}
              {dispatchState === "success" && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {dispatchState === "idle" && "Dispatch Order to KDS & Print Ticket"}
              {dispatchState === "loading" && "Printing Ticket..."}
              {dispatchState === "success" && "Book a Demo"}
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}

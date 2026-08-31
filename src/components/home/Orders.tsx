"use client";

import { useState } from "react";

const TABS = [
  { id: "orders", label: "Orders" },
  { id: "kitchen", label: "Kitchen" },
  { id: "inventory", label: "Inventory" },
  { id: "owner-view", label: "Insights" },
  { id: "multi-outlet", label: "Multi-Outlet" },
];

const INITIAL_ORDERS = [
  {
    id: 1,
    text: "Table 4 — Butter Chicken x2",
    time: "8 min",
    status: "cooking",
    dotColor: "bg-[#FF4C22]",
  },
  {
    id: 2,
    text: "Zomato #9042 — Biryani x3",
    time: "12 min",
    status: "cooking",
    dotColor: "bg-[#3B82F6]",
  },
  {
    id: 3,
    text: "Table 11 — Tandoori Platter",
    time: "Served",
    status: "served",
    dotColor: "bg-[#10B981]",
  },
  {
    id: 4,
    text: "Table 8 — Dal Makhani x2",
    time: "5 min",
    status: "cooking",
    dotColor: "bg-[#EF4444]",
  },
  {
    id: 5,
    text: "Swiggy #7831 — Paneer Set",
    time: "3 min",
    status: "warning",
    dotColor: "bg-[#EF4444]",
    hasWarning: true,
  },
];

const TAB_DATA = {
  orders: {
    heading: "Every order. One smooth process.",
    description:
      "Whether it's dine-in, QR, or delivery, every order reaches the kitchen instantly.",
    bullets: [
      "One system for every order",
      "Online delivery, QR, and dine-in connected",
      "Faster billing and shorter queues.",
      "No switching between apps",
      "Real-time kitchen ticket printing",
    ],
  },
  kitchen: {
    heading: "The kitchen stays in sync. Even when it's packed.",
    description:
      "Orders reach the right station instantly, helping your team cook faster, communicate better and serve without confusion.",
    bullets: [
      "Instant KDS updates",
      "No missed or duplicate orders",
      "Faster table turnaround",
      "Less shouting. More serving.",
      "Clear color-coded prep timers",
    ],
  },
  inventory: {
    heading: "Know what's running low. Before your chef does.",
    description:
      "Every order updates inventory automatically, giving you complete control over stock, wastage and margins.",
    bullets: [
      "Live inventory tracking",
      "Automatic ingredient deduction",
      "Reduce wastage and stock-outs",
      "Protect every margin",
      "Automated low-stock alerts",
    ],
  },
  "owner-view": {
    heading: "Stop asking, start knowing.",
    description:
      "Live insights across sales, orders and performance help you make smarter decisions without waiting for end-of-day reports.",
    bullets: [
      "Live sales dashboard",
      "Best-selling items",
      "Peak hour insights",
      "Real-time business health",
      "Instant mobile revenue reports",
    ],
  },
  "multi-outlet": {
    heading: "One dashboard, every outlet.",
    description:
      "Whether you have one restaurant or twenty, manage every location from one place with complete visibility.",
    bullets: [
      "Compare outlet performance",
      "Track sales in real time",
      "Spot operational issues early",
      "Scale with confidence",
      "Centralized menu & pricing sync",
    ],
  },
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Toggle order status to showcase high-fidelity interactivity
  const handleToggleStatus = (id: number) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === id) {
          if (order.status === "served") {
            return {
              ...order,
              status: "cooking",
              time: "1 min",
              dotColor: "bg-[#EF4444]",
              hasWarning: false,
            };
          } else {
            return {
              ...order,
              status: "served",
              time: "Served",
              dotColor: "bg-[#10B981]",
              hasWarning: false,
            };
          }
        }
        return order;
      }),
    );
  };

  const activeTabContent =
    TAB_DATA[activeTab as keyof typeof TAB_DATA] || TAB_DATA.orders;

  return (
    <div className="bg-white dark:bg-[#0f1015] font-sans antialiased">
      {/* 1. Header Section */}
      <header className="w-full pt-10 md:pt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Main Title Banner */}
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight leading-[1.15] text-[#111111]">
              Built for restaurants that <br />
              <span className="text-[#FF4F18]">never slow down</span>
            </h2>
          </div>

          {/* Tab Navigation - Aligned within container, border-b spans full width */}
          <div className="relative">
            <nav className="flex gap-8 pb-0.5 overflow-x-auto scrollbar-none">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      py-4 text-[15px] font-semibold transition-all duration-200 outline-none whitespace-nowrap cursor-pointer
                      ${
                        isActive
                          ? "text-black border-b-[2.5px] border-black"
                          : "text-[#999999] hover:text-zinc-600 border-b-[2.5px] border-transparent"
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
            {/* Absolute bottom border to span full width below tabs */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-zinc-200/80 -z-10" />
          </div>
        </div>
      </header>

      {/* 2. Main Content Section */}
      <main className="w-full py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column - Headline & Key Benefits */}
            <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-[40px] font-[850] tracking-tight leading-[1.15] text-[#111111]">
                  {activeTabContent.heading}
                </h2>
                <p className="text-[17px] text-[#666666] leading-relaxed max-w-lg">
                  {activeTabContent.description}
                </p>
              </div>

              {/* Bulleted checklist */}
              <ul className="space-y-4 pt-4">
                {activeTabContent.bullets.map((item, index) => (
                  <li key={index} className="flex items-center gap-4 group">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                      <svg
                        className="w-3 h-3 stroke-[3] stroke-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </span>
                    <span className="text-black font-medium text-[15px] group-hover:text-zinc-800 transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Live Order Queue Card (static across all tabs) */}
            <div className="lg:col-span-5 w-full lg:-mt-24">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.015)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[24px] p-6 md:p-8 space-y-6 w-full max-w-[500px] mx-auto lg:mx-0">
                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-zinc-900 dark:text-white text-[16px]">
                    Live Order Queue
                  </h3>
                  <div className="inline-flex items-center gap-1.5 bg-[#EAF9F0] dark:bg-[#13B257]/15 text-[#13B257] px-3 py-1 rounded-full text-xs font-bold">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#13B257] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#13B257]"></span>
                    </span>
                    <span>14 active</span>
                  </div>
                </div>

                {/* Orders List */}
                <div className="space-y-3">
                  {orders.map((order) => {
                    const isServed = order.status === "served";
                    const isWarning = order.status === "warning";

                    return (
                      <div
                        key={order.id}
                        onClick={() => handleToggleStatus(order.id)}
                        className={`
                          flex items-center justify-between p-4 rounded-xl transition-all duration-200 cursor-pointer select-none
                          bg-[#F8F9FA] dark:bg-zinc-800/50 hover:bg-[#F1F3F5] dark:hover:bg-zinc-800/80 border border-transparent hover:border-zinc-200/20 dark:hover:border-zinc-700/50
                          transform hover:-translate-y-0.5
                        `}
                      >
                        <div className="flex items-center min-w-0 pr-4">
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${order.dotColor}`}
                          />
                          <span className="ml-3.5 text-[14px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                            {order.text}
                          </span>
                        </div>

                        <div className="flex-shrink-0 flex items-center">
                          {isServed ? (
                            <span className="text-[#13B257] font-bold text-[13px]">
                              Served
                            </span>
                          ) : isWarning ? (
                            <span className="text-[#FF3B30] font-bold text-[13px] flex items-center gap-1">
                              {order.time}
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
                              {order.time}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center pt-2">
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                    Click on any card in the queue to toggle its status.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

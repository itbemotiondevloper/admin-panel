"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    id: 1,
    question: "How does Digitory manage orders from different platforms?",
    answer: "Whether it's dine-in, online orders, QR or direct orders, everything flows into one connected system, so you never have to switch between multiple apps."
  },
  {
    id: 2,
    question: "How does the kitchen stay in sync during rush hours?",
    answer: "Orders are sent to the right kitchen station instantly, reducing communication gaps, delays and missed tickets when every second counts."
  },
  {
    id: 3,
    question: "Can Digitory help reduce inventory wastage?",
    answer: "Yes. Inventory updates automatically with every sale, helping you track stock movement, reduce wastage and protect your margins."
  },
  {
    id: 4,
    question: "Can I manage customer loyalty and repeat business?",
    answer: "Absolutely. Build customer profiles, run loyalty programs and targeted campaigns that keep guests coming back."
  },
  {
    id: 5,
    question: "Will I get real-time reports and insights?",
    answer: "Yes. Monitor sales, inventory, outlet performance and business trends in real time, so you can make faster, data-backed decisions."
  },
  {
    id: 6,
    question: "Can I manage multiple outlets from one dashboard?",
    answer: "Yes. Compare outlet performance, monitor operations, and track key metrics across all your locations without chasing managers for updates."
  },
  {
    id: 7,
    question: "Will billing slow us down during peak hours?",
    answer: "Not at all. Digitory is built for handling chaos better, helping your team bill faster, reducing queues, and keeping operations moving smoothly during rush hours."
  }


];

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(1); // First item open by default

  const handleToggle = (id: number) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="bg-white font-sans antialiased text-[#111111] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Title */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight leading-[1.15] text-[#111111]">
            Questions before you <span className="text-[#FF4F18]">commit?</span>
          </h2>
        </div>

        {/* Accordions Container */}
        <div className="max-w-4xl mx-auto border-t border-zinc-100">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="border-b border-zinc-100"
              >
                {/* Question Trigger */}
                <button
                  onClick={() => handleToggle(item.id)}
                  className="w-full flex items-center justify-between py-6 text-left outline-none cursor-pointer group"
                >
                  <span className="text-[16px] sm:text-[18px] font-bold text-[#111111] pr-6 transition-colors duration-200 group-hover:text-zinc-600">
                    {item.question}
                  </span>

                  {/* Plus/Minus Indicator */}
                  <span className="text-[#FF4F18] font-[400] text-[26px] leading-none select-none flex-shrink-0 w-6 text-right transition-transform duration-200">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Answer Panel with smooth transition heights */}
                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-[250px] pb-6 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <p className="text-[15px] sm:text-[16px] text-[#666666] leading-relaxed max-w-[90%]">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

export default function RestaurantOSPage() {
  const testimonials = [
    {
      theme: "light",
      quote:
        "Before Digitory, our busiest hours were stressful. Now every team gets live updates, and everything runs much more smoothly",
      stat: (
        <>
          <span className="text-[16px] font-bold">↑</span> 22% faster service
        </>
      ),
      initials: "RK",
      author: "Rajesh Kumar",
      role: "Owner, BygBrewski Bangalore",
    },
    {
      theme: "light",
      quote:
        "We spend less time managing operations and more time serving customers. Digitory helps us run every outlet with confidence.",
      stat: "3 Hours Saved Every Day",
      initials: "PM",
      author: "Priya Mehta",
      role: "Ops Head, Toit Brewpub",
    },
    {
      theme: "light",
      quote:
        "We reduced food waste and improved inventory tracking. Within the first three months, we recovered nearly ₹2 lakh every month",
      stat: "₹2 Lakh Saved Every Month",
      initials: "AS",
      author: "Amit Shah",
      role: "F&B Director, Bier Library",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Detect initial theme
    const timer = setTimeout(() => {
      setIsDarkTheme(document.documentElement.classList.contains("dark"));
    }, 0);

    // Set up MutationObserver to sync dark mode changes
    const observer = new MutationObserver(() => {
      setIsDarkTheme(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    } else if (isRightSwipe) {
      setActiveIndex(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length,
      );
    }
  };

  const renderCard = (
    item: (typeof testimonials)[0],
    isSlider: boolean = false,
  ) => {
    const isDark = isDarkTheme;
    return (
      <div
        className={`flex flex-col h-full rounded-[32px] p-8 md:p-10 justify-between gap-8 transition-transform duration-300 ${
          isSlider ? "" : "hover:-translate-y-1"
        } ${
          isDark
            ? "bg-[#0B0C0E] border border-transparent"
            : "bg-[#F8F9FA] border border-zinc-200/40"
        }`}
      >
        <div className="space-y-6 flex-grow">
          {/* Slanted Quotes */}
          <div className="flex gap-1.5">
            <span className="w-1.5 h-4.5 bg-[#FF4F18] rounded-full" />
            <span className="w-1.5 h-4.5 bg-[#FF4F18] rounded-full" />
          </div>

          <p
            className={`text-[16px] leading-relaxed font-semibold ${isDark ? "text-[#A3A3A3]" : "text-[#4A4A4A]"}`}
          >
            {item.quote}
          </p>
        </div>

        <div className="space-y-6">
          {/* Stat Pill */}
          <div>
            <div className="text-[#13B257] dark:text-[#10B981] py-1 text-[14px] font-extrabold inline-flex items-center gap-1.5">
              {item.stat}
            </div>
          </div>

          {/* Bio */}
          <div className="flex items-center">
            <div className="w-11 h-11 rounded-full bg-[#FF4F18] flex items-center justify-center text-white text-[14px] font-bold flex-shrink-0">
              {item.initials}
            </div>
            <div className="ml-4">
              <h4
                className={`font-extrabold text-[15px] ${isDark ? "text-white" : "text-[#111111]"}`}
              >
                {item.author}
              </h4>
              <p
                className={`${isDark ? "text-[#666666]" : "text-[#888888]"} text-[13px] font-medium`}
              >
                {item.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white font-sans antialiased text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16">
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight leading-[1.15] text-[#111111] dark:text-white">
            What our <span className="text-[#FF4F18]">customers say</span>
          </h2>
        </div>

        {/* Desktop grid layout (hidden on mobile) */}
        <div className="hidden md:grid grid-cols-3 gap-8 items-stretch">
          {testimonials.map((item, idx) => (
            <div key={idx} className="h-full">
              {renderCard(item)}
            </div>
          ))}
        </div>

        {/* Mobile slider layout (hidden on desktop) */}
        <div className="block md:hidden">
          <div
            className="relative w-full overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((item, idx) => (
                <div key={idx} className="w-full shrink-0 px-1">
                  {renderCard(item, true)}
                </div>
              ))}
            </div>
          </div>

          {/* Slider controls: Prev, Dots, Next */}
          <div className="flex justify-center items-center gap-4 mt-8 select-none">
            <button
              onClick={() =>
                setActiveIndex(
                  (prev) =>
                    (prev - 1 + testimonials.length) % testimonials.length,
                )
              }
              className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-[#111111] hover:bg-zinc-50 active:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? "w-6 bg-[#FF4F18]"
                      : "w-2.5 bg-zinc-300"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setActiveIndex((prev) => (prev + 1) % testimonials.length)
              }
              className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-[#111111] hover:bg-zinc-50 active:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
              aria-label="Next testimonial"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

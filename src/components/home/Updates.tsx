"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { announcementsService } from "@/services/announcements.service";

type UpdateItem = {
  id: string;
  slug: string;
  date: string;
  month: string;
  category: string;
  title: string;
  desc: string;
  content?: string;
  image?: string;
};

export default function Updates() {
  const [updatesList, setUpdatesList] = useState<UpdateItem[]>([]);

  const [selectedUpdate, setSelectedUpdate] = useState<UpdateItem | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isFeaturedOpen, setIsFeaturedOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleItemClick = (item: UpdateItem) => {
    setSelectedUpdate(item);
    if (window.innerWidth < 1024) {
      setShowDetailModal(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);

    async function loadUpdates() {
      try {
        const updates = await announcementsService.getAnnouncements();

        if (updates && updates.length > 0) {
          const mapped = updates.map((p: any) => {
            // Treat YYYY-MM-DD as local date only to prevent timezone shifts
            const parts = p.publishedAt ? p.publishedAt.split('-') : [];
            let d;
            if (parts.length === 3) {
              d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
            } else {
              d = new Date(p.createdAt);
            }

            return {
              id: p._id,
              slug: p._id, // use id as slug for modal lookups
              date: d.getDate().toString().padStart(2, '0'),
              month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
              category: (typeof p.category === 'object' && p.category ? p.category.name : (p.category || "UPDATE")).toUpperCase(),
              title: p.title,
              desc: p.excerpt || p.title,
              content: p.content,
              image: p.featuredImage && p.featuredImage.trim() !== "" ? p.featuredImage : '/Background+HorizontalBorder.png'
            };
          });
          setUpdatesList(mapped);
          return;
        }
      } catch (err) {
        // Silently catch fetch errors when backend is down
      }

      // Fallback data when backend is not available
      setUpdatesList([
        {
          id: '1',
          slug: 'ai-demand-forecasting',
          date: '15',
          month: 'AUG',
          category: 'PRODUCT UPDATE',
          title: 'Introducing AI-driven demand forecasting',
          desc: 'Predict your daily inventory needs with 95% accuracy using our new machine learning engine.',
          content: 'Full details on our AI forecasting engine...',
          image: '/featured.png'
        },
        {
          id: '2',
          slug: 'pos-integration-update',
          date: '02',
          month: 'AUG',
          category: 'INTEGRATION',
          title: 'Seamless integration with Square and Toast POS',
          desc: 'Connect your POS systems in one click to sync sales data automatically.',
          content: 'Full details on POS integrations...',
          image: '/featured.png'
        },
        {
          id: '3',
          slug: 'multi-location-dashboard',
          date: '28',
          month: 'JUL',
          category: 'NEW FEATURE',
          title: 'New multi-location performance dashboard',
          desc: 'Compare metrics across all your restaurant branches from a single unified view.',
          content: 'Full details on the dashboard...',
          image: '/featured.png'
        },
        {
          id: '4',
          slug: 'summer-menu-engineering',
          date: '10',
          month: 'JUL',
          category: 'GUIDE',
          title: 'Summer 2026: Menu engineering best practices',
          desc: 'Optimize your menu profitability with these proven placement strategies.',
          content: 'Full details on menu engineering...',
          image: '/featured.png'
        }
      ]);
    }
    loadUpdates();

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if ((selectedUpdate && (isMobile || showDetailModal)) || isFeaturedOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedUpdate, isFeaturedOpen, isMobile, showDetailModal]);

  const displayUpdate = selectedUpdate || updatesList[0];

  return (
    <div className="w-full pointer-events-auto">

      <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] mb-10 leading-[1.15]">
          Latest <span className="text-[#FF4F18]">updates</span>
        </h2>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Updates List */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            {/* Mobile-Only Featured Update Trigger Row */}
            <div
              onClick={() => setIsFeaturedOpen(true)}
              className="flex lg:hidden gap-6 py-6 pt-0 items-start border-b border-zinc-200/60 cursor-pointer hover:bg-zinc-50/40 dark:hover:bg-zinc-900/40 rounded-xl px-2 -mx-2 transition-all duration-250 pointer-events-auto"
            >
              {/* Star Badge */}
              <div className="flex flex-col items-center justify-center h-16 w-16 md:h-20 md:w-20 rounded-2xl border border-[#FF4F18]/10 bg-[#FF4F18] shrink-0 shadow-2xs select-none">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-white animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-[8px] md:text-[9px] font-extrabold text-white uppercase tracking-wider mt-1.5">
                  FEATURED
                </span>
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs font-bold tracking-wider text-[#FF4F18] uppercase mb-1">
                  FEATURED UPDATE
                </span>
                <h3 className="text-base md:text-lg font-bold text-zinc-950 leading-snug">
                  Restaurant operations made simple.
                </h3>
                <p className="text-zinc-600 text-xs md:text-sm mt-1.5 leading-relaxed line-clamp-2">
                  Digitory brings together POS, kitchen management, inventory,
                  reports, and delivery apps into one platform. Save time,
                  reduce waste, and make better business decisions with
                  real-time information.
                </p>
              </div>
            </div>

            {/* List of regular updates with scroll container */}
            <div className="max-h-[480px] lg:max-h-[580px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#FF4F18]/40 pr-3">
              {updatesList.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleItemClick(item)}
                  className={`flex gap-6 py-6 lg:py-[32px] items-start border-b border-zinc-200/60 last:border-b-0 cursor-pointer hover:bg-zinc-50/40 dark:hover:bg-zinc-900/40 rounded-xl px-2 -mx-2 transition-all duration-250 pointer-events-auto`}
                >
                  {/* Date Badge */}
                  <div className="flex flex-col items-center justify-center h-16 w-16 md:h-20 md:w-20 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 shrink-0 shadow-2xs select-none">
                    <span className="text-2xl md:text-3xl font-extrabold text-[#FF4F18] leading-none">
                      {item.date}
                    </span>
                    <span className="text-[10px] md:text-xs font-bold text-[#FF4F18]/80 mt-1 uppercase tracking-wider">
                      {item.month}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col">
                    <span className="text-[10px] md:text-xs font-bold tracking-wider text-[#FF4F18] uppercase mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-zinc-950 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-zinc-600 text-xs md:text-sm mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Featured Update Card (Desktop only) */}
          <div className="hidden lg:block lg:col-span-6">
            <div className="rounded-[28px] overflow-hidden border border-zinc-200/80 bg-[#FFF] p-4 flex flex-col shadow-xs">
              {/* Featured Image */}
              <div className="relative w-full aspect-16/10 rounded-[20px] overflow-hidden bg-zinc-100">
                {displayUpdate && (
                  <Image
                    src={displayUpdate.image || "/Background+HorizontalBorder.png"}
                    alt={displayUpdate.title || "Featured Update"}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>

              {/* Card Body */}
              <div className="px-2 py-6">
                <span className="text-[10px] md:text-xs font-bold tracking-wider text-[#FF4F18] uppercase mb-2 block">
                  {displayUpdate ? displayUpdate.category : "FEATURED UPDATE"}
                </span>

                <h3 className="text-xl md:text-2xl font-bold text-zinc-950 leading-snug mb-3">
                  {displayUpdate ? displayUpdate.title : "Loading..."}
                </h3>

                <p className="text-zinc-600 text-xs md:text-sm leading-relaxed mb-6 line-clamp-4">
                  {displayUpdate ? displayUpdate.desc : ""}
                </p>

                {/* Read Full Story Button */}
                {displayUpdate && (
                  <button
                    onClick={() => {
                      setSelectedUpdate(displayUpdate);
                      setShowDetailModal(true);
                    }}
                    className="inline-flex justify-center items-center text-center border border-[#FF4F18] bg-transparent px-5 py-2.5 text-[12.6px] font-bold text-[#FF4F18] rounded-full uppercase tracking-wider transition-all duration-200 hover:bg-[#FF4F18]/5 active:scale-[0.98] cursor-pointer w-max"
                  >
                    READ FULL STORY →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styles for Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        `,
        }}
      />

      {/* Bottom Sheet Drawer / Modal */}
      {mounted &&
        selectedUpdate && (isMobile || showDetailModal) &&
        createPortal(
          <div className="fixed inset-0 z-[999] flex flex-col justify-end lg:justify-center lg:items-center p-0 lg:p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-[fadeIn_0.2s_ease-out]"
              onClick={() => {
                setSelectedUpdate(null);
                setShowDetailModal(false);
              }}
            />

            {/* Drawer Sheet / Modal Content */}
            <div className="relative w-full lg:max-w-xl max-h-[85vh] lg:max-h-[90vh] bg-white dark:bg-zinc-900 rounded-t-[32px] lg:rounded-[32px] p-6 lg:p-8 shadow-2xl flex flex-col animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)] lg:animate-[scaleUp_0.25s_cubic-bezier(0.16,1,0.3,1)] overflow-y-auto z-10">
              {/* Drag Handle Indicator */}
              <div className="mx-auto w-12 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-6 shrink-0 lg:hidden" />

              {/* Header Area */}
              <div className="relative flex justify-between items-start mb-6 pr-10">
                <div className="flex flex-col">
                  <span className="text-[11px] font-extrabold tracking-wider text-[#FF4F18] uppercase">
                    {selectedUpdate.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white mt-3 leading-snug">
                    {selectedUpdate.title}
                  </h3>

                  {/* Meta details line (matching design style) */}
                  <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400 dark:text-zinc-500 mt-4 select-none">
                    <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                      <span className="text-[9px]">◆</span>{" "}
                      {selectedUpdate.date} {selectedUpdate.month}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-[9px]">◇</span> DIGITORY PRODUCT
                      TEAM
                    </span>
                  </div>
                </div>

                {/* Close Button (Matching square 'X' box in screenshot) */}
                <button
                  onClick={() => {
                    setSelectedUpdate(null);
                    setShowDetailModal(false);
                  }}
                  className="absolute top-0 right-0 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 cursor-pointer"
                  aria-label="Close details"
                >
                  <svg
                    className="h-4 w-4 stroke-[2.5]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Divider Line */}
              <hr className="border-t border-zinc-100 dark:border-zinc-800/80 w-full mb-6 shrink-0" />

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto pb-4">
                <p className="text-zinc-600 dark:text-zinc-400 text-[14px] sm:text-base leading-relaxed mb-6 font-medium">
                  {selectedUpdate.desc}
                </p>

                {/* Extra Details (matching orange bullet in screenshot) */}
                <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
                  <span className="text-[#FF4F18] text-xs mt-0.5">◆</span>
                  <span className="leading-snug">
                    Status: Released and live in production for all outlets.
                  </span>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* Featured Update Drawer / Modal */}
      {mounted &&
        isFeaturedOpen && isMobile &&
        createPortal(
          <div className="fixed inset-0 z-[999] flex flex-col justify-end lg:justify-center lg:items-center p-0 lg:p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-[fadeIn_0.2s_ease-out]"
              onClick={() => setIsFeaturedOpen(false)}
            />

            {/* Drawer Sheet / Modal Content */}
            <div className="relative w-full lg:max-w-2xl max-h-[90vh] lg:max-h-[90vh] bg-white dark:bg-zinc-900 rounded-t-[32px] lg:rounded-[32px] p-6 lg:p-8 shadow-2xl flex flex-col animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)] lg:animate-[scaleUp_0.25s_cubic-bezier(0.16,1,0.3,1)] overflow-y-auto z-10">
              {/* Drag Handle Indicator */}
              <div className="mx-auto w-12 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-6 shrink-0 lg:hidden" />

              {/* Close Button */}
              <button
                onClick={() => setIsFeaturedOpen(false)}
                className="absolute top-6 right-6 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 cursor-pointer z-20"
                aria-label="Close details"
              >
                <svg
                  className="h-4 w-4 stroke-[2.5]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto pt-2">
                {/* Featured Image */}
                <div className="relative w-full aspect-16/10 rounded-[20px] overflow-hidden mb-6">
                  <Image
                    src="/Background+HorizontalBorder.png"
                    alt="Featured Update Mockup"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <span className="text-[11px] font-extrabold tracking-wider text-[#FF4F18] uppercase">
                  FEATURED UPDATE
                </span>

                <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white mt-3 mb-4 leading-snug">
                  Restaurant operations made simple .
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 text-[14px] sm:text-base leading-relaxed mb-6 font-medium">
                  Digitary brings together POS, Kitchen Display System,
                  Inventory Management, Analytics, and Delivery Integrations
                  into one intelligent platform. Automate daily operations,
                  reduce manual work, minimize food waste, and make faster
                  business decisions with real-time insights.
                </p>

                {/* Read Full Story Button */}
                <div className="mb-6">
                  <Link
                    href="#"
                    className="inline-flex justify-center items-center text-center border border-[#FF4F18] bg-transparent px-5 py-2.5 text-[12.6px] font-bold text-[#FF4F18] rounded-full uppercase tracking-wider transition-all duration-200 hover:bg-[#FF4F18]/5 active:scale-[0.98] cursor-pointer"
                  >
                    READ FULL STORY →
                  </Link>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

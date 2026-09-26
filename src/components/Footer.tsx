'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-[#111111] py-12 sm:py-16 border-t border-[#111111]/10 font-sans">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* LEFT: Quest For Tech Wordmark */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl sm:text-2xl tracking-tight text-[#111111]">
              Quest For Tech
            </span>
          </div>

          {/* CENTER: Clean Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium text-[#666666]">
            <Link href="/solutions" className="hover:text-[#111111] transition-colors">
              Solutions
            </Link>
            <Link href="/case-studies" className="hover:text-[#111111] transition-colors">
              Work
            </Link>
            <Link href="/about" className="hover:text-[#111111] transition-colors">
              About
            </Link>
            <Link href="/blogs" className="hover:text-[#111111] transition-colors">
              Insights
            </Link>
            <Link href="/contact" className="hover:text-[#111111] transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-[#111111] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#111111] transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* RIGHT: Copyright & Back-to-top Button */}
          <div className="flex items-center gap-6 text-xs text-[#888888]">
            <div className="text-right hidden sm:block">
              <p>© 2026 Quest For Tech</p>
              <p className="text-[11px] text-[#AAAAAA]">Built for a brighter digital tomorrow.</p>
            </div>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-[#111111]/20 flex items-center justify-center text-[#111111] hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}

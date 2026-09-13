'use client';

import React from 'react';
import Link from 'next/link';

const NAV = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'Work', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

export default function SolutionsFooter() {
  return (
    <footer
      className="w-full bg-[#F8F8F5] border-t border-[rgba(17,17,17,0.08)] py-6"
      role="contentinfo"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-6">
            <span
              className="text-[13px] font-semibold text-[#111]"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
            >
              Quest For Tech
            </span>
            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-5" aria-label="Footer nav">
              {NAV.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[12px] text-[#999] hover:text-[#111] transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Copyright + back to top */}
          <div className="flex items-center gap-4">
            <p
              className="text-[11px] text-[#bbb]"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
            >
              © {new Date().getFullYear()} Quest For Tech · Built for a brighter digital tomorrow.
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center justify-center w-7 h-7 rounded-full border border-[rgba(17,17,17,0.15)] text-[#676767] hover:border-[#111] hover:text-[#111] transition-all duration-200"
              aria-label="Back to top"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

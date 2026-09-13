'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MagneticButton from './MagneticButton';

const NAV_LINKS = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'Work', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/resources' },
];

export default function SolutionsNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 80);

      // Hide navbar when scrolling down quickly after 200px
      if (currentScrollY > 200 && currentScrollY - lastScrollY.current > 12) {
        setHidden(true);
      } else if (lastScrollY.current - currentScrollY > 8 || currentScrollY < 100) {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animate nav in on mount
  useEffect(() => {
    const init = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { gsap } = await import('gsap');
      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          { y: -24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.3 }
        );
      }
    };
    init();
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        role="navigation"
        aria-label="Main navigation"
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform',
          hidden ? '-translate-y-full' : 'translate-y-0',
          scrolled
            ? 'py-3.5 bg-[#F8F8F5]/85 backdrop-blur-md border-b border-[rgba(17,17,17,0.06)] shadow-xs'
            : 'py-6 bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-tight text-[#111] hover:opacity-70 transition-opacity duration-200"
            style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
            aria-label="Quest For Tech — home"
          >
            Quest For Tech
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href || (l.href !== '/' && pathname?.startsWith(l.href));
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  className={[
                    'text-[13px] tracking-wide transition-colors duration-200 relative group',
                    active ? 'text-[#111] font-medium' : 'text-[#676767] hover:text-[#111]',
                  ].join(' ')}
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
                >
                  {l.label}
                  <span
                    className={[
                      'absolute -bottom-0.5 left-0 h-px bg-[#111] transition-all duration-300',
                      active ? 'w-full' : 'w-0 group-hover:w-full',
                    ].join(' ')}
                  />
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <MagneticButton
              href="/contact"
              className="hidden md:inline-flex text-[12.5px] font-semibold tracking-wide text-white bg-[#111] hover:bg-[#222] rounded-full px-6 py-2.5 shadow-xs"
            >
              Let's Talk
              <span className="ml-1 translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200">→</span>
            </MagneticButton>

            {/* Mobile burger */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden flex flex-col gap-1.5 p-1.5 text-[#111]"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span
                className={`block h-px w-5 bg-current transition-transform duration-300 ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span
                className={`block h-px w-5 bg-current transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-px w-5 bg-current transition-transform duration-300 ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={[
          'fixed inset-0 z-40 bg-[#F8F8F5] flex flex-col px-8 pt-24 pb-12 md:hidden transition-all duration-500',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col gap-6">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-[2rem] font-semibold text-[#111] hover:text-[#4F6BFF] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-plus-jakarta-sans), Inter, sans-serif' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-white bg-[#111] rounded-full px-8 py-4"
          >
            Let's Talk →
          </Link>
        </div>
      </div>
    </>
  );
}

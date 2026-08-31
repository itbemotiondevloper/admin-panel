'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const activeTheme = savedTheme || 'light';
    if (activeTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const timer = setTimeout(() => {
      setMounted(true);
      setTheme(activeTheme);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const renderThemeToggle = () => {
    if (!mounted) {
      return (
        <div className="h-10 w-10 rounded-full bg-zinc-205/30 dark:bg-zinc-800/30 animate-pulse shrink-0" />
      );
    }

    return (
      <button
        onClick={toggleTheme}
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <svg className="h-5 w-5 stroke-[2] fill-none stroke-current" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        ) : (
          <svg className="h-5 w-5 stroke-[2] fill-none stroke-current text-amber-500" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.59 1.59m12.38 12.38l1.59 1.59M3 12h2.25m13.5 0H21M4.22 19.78l1.59-1.59m12.38-12.38l1.59-1.59M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
          </svg>
        )}
      </button>
    );
  };

  const navLinks = [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Resources', href: '/blogs' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div className="sticky top-0 z-50 w-full px-4 pt-3 pb-1 md:px-8 md:pt-4 md:pb-2 bg-transparent">
      <header className="mx-auto max-w-7xl rounded-full bg-[#EAEAEA]/80 backdrop-blur-md pl-8 pr-4 py-3 flex items-center justify-between shadow-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/digitory-black.png"
            alt="Digitory Logo"
            width={140}
            height={36}
            className="object-contain h-7 md:h-8 w-auto block dark:hidden"
            priority
          />
          <Image
            src="/digitory-white.png"
            alt="Digitory Logo"
            width={140}
            height={36}
            className="object-contain h-7 md:h-8 w-auto hidden dark:block"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[15px] font-medium text-zinc-650 hover:text-black transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button & Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          {renderThemeToggle()}
          <Link
            href="/request-demo"
            className="rounded-full bg-[#FF4F18] px-6 py-2.5 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_6px_16px_rgba(255,79,24,0.35)] hover:shadow-[0_8px_20px_rgba(255,79,24,0.45)] active:scale-[0.98]"
          >
            Book a demo
          </Link>
        </div>

        {/* Mobile Action Container */}
        <div className="flex items-center gap-2 md:hidden">
          {renderThemeToggle()}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 hover:bg-black/5"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden transition-all duration-200 ease-in-out ${isMenuOpen
          ? 'max-h-96 opacity-100 mt-3 border border-zinc-100 rounded-3xl bg-[#EAEAEA]/90 backdrop-blur-md p-6 shadow-lg'
          : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
          }`}
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-[15px] font-medium text-zinc-700 hover:text-black transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Link
              href="/request-demo"
              onClick={() => setIsMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-[#FF4F18] py-3 text-[15px] font-semibold text-white transition-all hover:bg-[#E03F0D] shadow-[0_6px_16px_rgba(255,79,24,0.35)]"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

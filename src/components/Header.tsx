'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { settingsService } from '@/services/settings.service';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);
  const [logoBlack, setLogoBlack] = useState('/logo2.png');
  const [logoWhite, setLogoWhite] = useState('/logo1.png');
  const [companyName, setCompanyName] = useState('Quest For Tech');
  const pathname = usePathname();

  useEffect(() => {
    // Force dark theme as default for the new sleek look if not set
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const activeTheme = savedTheme || 'dark';
    if (activeTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const timer = setTimeout(() => {
      setMounted(true);
      setTheme(activeTheme);
    }, 0);

    const handleBrandingSync = () => {
      const savedBlack = localStorage.getItem('branding_logo_black');
      const savedWhite = localStorage.getItem('branding_logo_white');
      if (savedBlack) setLogoBlack(savedBlack);
      if (savedWhite) setLogoWhite(savedWhite);
    };

    handleBrandingSync();

    const fetchSettings = async () => {
      try {
        const s = await settingsService.getSettings();
        if (s.branding) {
          if (s.branding.logo) {
            setLogoBlack(s.branding.logo);
            localStorage.setItem('branding_logo_black', s.branding.logo);
          }
          if (s.branding.logoWhite) {
            setLogoWhite(s.branding.logoWhite);
            localStorage.setItem('branding_logo_white', s.branding.logoWhite);
          }
          if (s.branding.companyName) {
            setCompanyName(s.branding.companyName);
          }
        }
      } catch (err) {
        console.warn('Failed to load header branding settings:', err);
      }
    };
    fetchSettings();

    window.addEventListener('branding_logo_update', handleBrandingSync);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('branding_logo_update', handleBrandingSync);
    };
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
        <div className="h-9 w-9 rounded-full bg-zinc-800 animate-pulse shrink-0" />
      );
    }

    return (
      <button
        onClick={toggleTheme}
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <svg className="h-4 w-4 stroke-[2.5] fill-none stroke-current" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        ) : (
          <svg className="h-4 w-4 stroke-[2.5] fill-none stroke-current text-zinc-300" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.59 1.59m12.38 12.38l1.59 1.59M3 12h2.25m13.5 0H21M4.22 19.78l1.59-1.59m12.38-12.38l1.59-1.59M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
          </svg>
        )}
      </button>
    );
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/solutions' },
    { label: 'Industries', href: '/industries' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Resources', href: '/resources' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Normal navigation
  };

  return (
    <div className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="mx-auto max-w-5xl w-full bg-slate-900/90 dark:bg-[#141416]/95 backdrop-blur-xl border border-slate-700/50 dark:border-[#D6DCDC]/15 rounded-full px-5 sm:px-7 py-2.5 shadow-2xl transition-all duration-300 pointer-events-auto flex items-center justify-between">
        
        {/* Left: Logo & Navigation */}
        <div className="flex items-center gap-8 sm:gap-10">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src={logoBlack}
              alt={`${companyName} Logo`}
              className="object-contain h-5.5 w-auto block dark:hidden"
              onError={(e) => { e.currentTarget.src = '/logo2.png'; }}
            />
            <img
              src={logoWhite}
              alt={`${companyName} Logo`}
              className="object-contain h-5.5 w-auto hidden dark:block"
              onError={(e) => { e.currentTarget.src = '/logo1.png'; }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[13.5px] transition-colors duration-200 ${
                    isActive
                      ? 'font-bold text-white'
                      : 'font-medium text-slate-300 hover:text-white dark:text-[#A0A0A0] dark:hover:text-white'
                  }`}
                  style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Action Button & Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          {renderThemeToggle()}
          <Link
            href="/request-demo"
            className="rounded-full bg-[#A78BFA] text-black hover:bg-[#B89FFF] px-4.5 py-1.5 text-[12.5px] font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm"
            style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Action Container */}
        <div className="flex items-center gap-3 md:hidden">
          {renderThemeToggle()}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="flex h-8.5 w-8.5 items-center justify-center rounded-full text-slate-200 hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out mx-auto max-w-5xl mt-2 rounded-3xl bg-slate-900/95 dark:bg-[#141416]/95 border border-slate-700/50 dark:border-[#D6DCDC]/15 overflow-hidden shadow-2xl pointer-events-auto ${
          isMenuOpen ? 'max-h-96 opacity-100 p-6' : 'max-h-0 opacity-0 p-0'
        }`}
      >
        <div className="flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href);
                  if (link.href !== '#') setIsMenuOpen(false);
                }}
                className={`py-2.5 text-[14px] transition-colors ${
                  isActive ? 'font-bold text-white' : 'font-medium text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-3 pt-3 border-t border-white/10">
            <Link
              href="/request-demo"
              onClick={() => setIsMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-[#A78BFA] text-black hover:bg-[#B89FFF] py-2.5 text-[13px] font-semibold transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


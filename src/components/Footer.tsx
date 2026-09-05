"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { settingsService } from "@/services/settings.service";

const EXPLORE_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/solutions" },
  { name: "Industries", href: "/industries" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];

const SERVICES_LINKS = [
  { name: "Website Development", href: "/solutions/website-development" },
  { name: "SEO", href: "/solutions/seo" },
  { name: "Content", href: "/solutions/content" },
  { name: "Performance Marketing", href: "/solutions/performance-marketing" },
  { name: "Custom Development", href: "/solutions/custom-development" },
];

export default function FooterPage() {
  const [footerLogo, setFooterLogo] = useState<string>('/logo1.png');
  const [companyName, setCompanyName] = useState<string>('Quest For Tech');

  useEffect(() => {
    const handleBrandingSync = () => {
      const savedFooter = localStorage.getItem('branding_footer_logo') || localStorage.getItem('branding_logo_white');
      if (savedFooter && savedFooter !== '/logo2.png') setFooterLogo(savedFooter);
    };

    handleBrandingSync();

    const fetchBranding = async () => {
      try {
        const s = await settingsService.getSettings();
        if (s.branding) {
          const logoToUse = s.branding.footerLogo || s.branding.logoWhite || '/logo1.png';
          setFooterLogo(logoToUse);
          localStorage.setItem('branding_footer_logo', logoToUse);
          if (s.branding.companyName) {
            setCompanyName(s.branding.companyName);
          }
        }
      } catch (err) {
        console.warn('Failed to load dynamic footer branding:', err);
      }
    };
    fetchBranding();

    window.addEventListener('branding_logo_update', handleBrandingSync);
    return () => {
      window.removeEventListener('branding_logo_update', handleBrandingSync);
    };
  }, []);

  return (
    <footer className="bg-[#090A0C] text-white pt-16 pb-8 font-sans antialiased border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start pb-12">

          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center">
              <img
                src={footerLogo}
                alt={`${companyName} Logo`}
                className="object-contain h-9 md:h-10 w-auto max-w-[220px]"
                onError={(e) => { e.currentTarget.src = '/logo1.png'; }}
              />
            </div>

            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA] mb-2"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                Your New Age Marketing Partner
              </p>
              <p
                className="text-sm text-slate-400 leading-relaxed max-w-sm"
                style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
              >
                Digital marketing, technology, and creative solutions built around your business goals.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.linkedin.com/company/questfortech"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/questfortech"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/questfortech"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="lg:col-span-3 space-y-4">
            <h4
              className="text-xs font-bold tracking-[0.2em] text-white uppercase"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              Explore
            </h4>
            <ul className="space-y-2.5">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors block py-0.5"
                    style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4
              className="text-xs font-bold tracking-[0.2em] text-white uppercase"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICES_LINKS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors block py-0.5"
                    style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch */}
          <div className="lg:col-span-2 space-y-4">
            <h4
              className="text-xs font-bold tracking-[0.2em] text-white uppercase"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              Get In Touch
            </h4>
            <div className="space-y-3.5 text-sm text-slate-400" style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
              <p className="leading-relaxed">
                4th Floor, Kalp Business Centre,<br />
                City Light Road, Surat, Gujarat
              </p>
              <div>
                <a
                  href="tel:+919898618862"
                  className="hover:text-white transition-colors block"
                >
                  +91 98986 18862
                </a>
              </div>
              <div>
                <a
                  href="mailto:hello@questfortech.in"
                  className="hover:text-white transition-colors block text-[#A78BFA]"
                >
                  hello@questfortech.in
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Footer Line / Copyright */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}>
            © {companyName}. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}


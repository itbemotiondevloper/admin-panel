'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SeoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { name: 'Dashboard', path: '/admin/seo' },
    { name: 'Pages List', path: '/admin/seo/pages' },
    { name: 'Speed & Performance Audit', path: '/admin/seo/audit' },
    { name: 'Tools (Sitemap & Robots)', path: '/admin/seo/tools' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2">SEO Management</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Manage your website's search engine presence, metadata, schemas, and redirects.</p>
      </div>

      <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-800/80 pb-4 overflow-x-auto custom-scrollbar">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path || (tab.path !== '/admin/seo' && pathname.startsWith(tab.path));
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                isActive 
                  ? 'bg-[#FF4F18] text-white shadow-[0_4px_12px_rgba(255,79,24,0.3)]' 
                  : 'bg-zinc-100 dark:bg-[#1A1A1D] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-[#252528] hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>

      <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 shadow-sm rounded-3xl min-h-[500px] overflow-hidden">
        {children}
      </div>
    </div>
  );
}

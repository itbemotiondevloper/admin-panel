'use client';

import React, { useEffect, useState } from 'react';
import { seoService } from '@/services/seo.service';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function SeoPagesList() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const loaded = await seoService.getSeoEntries();
        setPages(loaded);
      } catch (error) {
        console.error('Failed to fetch pages for SEO', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, []);

  const filteredPages = pages.filter(p => 
    p.name?.toLowerCase().includes(search.toLowerCase()) || 
    p.url?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Website Pages</h2>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#FF4F18] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search pages..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-11 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] w-full sm:w-72 transition-all duration-200 text-sm font-medium dark:text-white"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800/80 uppercase text-[11px] tracking-wider font-extrabold">
            <tr>
              <th className="px-6 py-4">Page Name</th>
              <th className="px-6 py-4">URL</th>
              <th className="px-6 py-4">SEO Title</th>
              <th className="px-6 py-4">Index Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-16 text-center text-zinc-400 font-semibold animate-pulse">Loading pages...</td></tr>
            ) : filteredPages.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-16 text-center text-zinc-500">No pages found.</td></tr>
            ) : (
              filteredPages.map(page => (
                <tr key={page._id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition-colors group">
                  <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
                    {page.name}
                    <span className="ml-3 text-[10px] font-extrabold uppercase tracking-widest px-2 py-1 rounded-md bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">{page.pageType}</span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400">{page.url}</td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300 truncate max-w-[200px]">
                    {page.seo?.title || <span className="text-[#FF4F18] italic text-xs font-bold">Missing</span>}
                  </td>
                  <td className="px-6 py-4">
                    {page.seo?.robotsIndex === 'noindex' ? (
                      <span className="text-red-600 bg-[#FFF3EF] dark:text-red-400 dark:bg-red-500/10 px-2.5 py-1 rounded-full font-bold text-xs">No Index</span>
                    ) : (
                      <span className="text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-500/10 px-2.5 py-1 rounded-full font-bold text-xs">Index</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/admin/seo/editor/${page.pageType}?id=${page._id}&url=${encodeURIComponent(page.url)}&name=${encodeURIComponent(page.name)}`}
                      className="inline-block whitespace-nowrap text-[#FF4F18] hover:text-white font-bold border border-[#FF4F18] hover:bg-[#FF4F18] px-4 py-2 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
                    >
                      Edit SEO
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

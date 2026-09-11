'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { industriesService, IndustryItem } from '@/services/industries.service';
import { Plus, Edit2, Trash2, Copy, ExternalLink, Search, Loader2 } from 'lucide-react';

export default function AdminIndustriesPage() {
  const [industries, setIndustries] = useState<IndustryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await industriesService.getIndustries({ useCache: false });
      setIndustries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await industriesService.deleteIndustry(id);
      setIndustries(prev => prev.filter(i => i.id !== id && i._id !== id));
      showToast(`Deleted industry "${title}" successfully.`);
    } catch (err: any) {
      alert(err.message || 'Failed to delete industry');
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      showToast('Duplicating industry...');
      const duplicated = await industriesService.duplicateIndustry(id);
      setIndustries(prev => [...prev, duplicated]);
      showToast(`Duplicated industry! Created slug "${duplicated.slug}"`);
    } catch (err: any) {
      alert(err.message || 'Failed to duplicate industry');
    }
  };

  const filtered = industries.filter(ind =>
    ind.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ind.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (ind.description && ind.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fade-in font-sans p-2 sm:p-4 text-left">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold z-50 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Industries Cards
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
            Manage industry verticals (Manufacturing, Healthcare, E-commerce, B2B, etc.) and their custom detail pages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/industries-page"
            className="px-5 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs font-bold transition-all"
          >
            Edit Landing Page Text
          </Link>
          <Link
            href="/admin/industries/new"
            className="inline-flex items-center gap-2 bg-[#FF4F18] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#E03F0D] transition-colors shadow-md"
          >
            <Plus size={16} />
            Create Industry Card
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-4 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search industries by title, slug, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#FF4F18]"
          />
        </div>
        <div className="text-xs text-zinc-400 font-semibold px-2">
          Total: {filtered.length} Industry Cards
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-zinc-400 font-semibold flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#FF4F18] mb-3" />
            Loading Industry Cards...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800/80 uppercase text-[11px] tracking-wider font-extrabold">
                <tr>
                  <th className="px-6 py-4">Icon</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
                {filtered.map((item) => (
                  <tr key={item.id || item._id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition-colors">
                    <td className="px-6 py-4 text-2xl">{item.icon || '🏢'}</td>
                    <td className="px-6 py-4 font-bold text-zinc-900 dark:text-white">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-zinc-500">
                      /industries/{item.slug}
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-600 dark:text-zinc-400 max-w-sm truncate">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 font-semibold text-xs text-zinc-700 dark:text-zinc-300">
                      {item.order || 0}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/industries/${item.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg text-zinc-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all"
                          title="Preview Public Detail Page"
                        >
                          <ExternalLink size={16} />
                        </Link>

                        <button
                          onClick={() => handleDuplicate(item.id || item._id!)}
                          className="p-2 rounded-lg text-zinc-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all cursor-pointer"
                          title="Duplicate Industry"
                        >
                          <Copy size={16} />
                        </button>

                        <Link
                          href={`/admin/industries/${item.id || item._id}`}
                          className="p-2 rounded-lg text-zinc-500 hover:text-[#FF4F18] hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all"
                          title="Edit Industry"
                        >
                          <Edit2 size={16} />
                        </Link>

                        <button
                          onClick={() => handleDelete(item.id || item._id!, item.title)}
                          className="p-2 rounded-lg text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all cursor-pointer"
                          title="Delete Industry"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-400 font-medium">
                      No industry cards found matching your query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

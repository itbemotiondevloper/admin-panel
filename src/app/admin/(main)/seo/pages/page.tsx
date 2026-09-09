'use client';

import React, { useEffect, useState } from 'react';
import { seoService, SeoForm } from '@/services/seo.service';
import Link from 'next/link';
import { Search, Filter, Edit3, X, Check, Globe, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

const EMPTY_SEO: SeoForm = {
  title: '',
  description: '',
  keywords: [],
  canonicalUrl: '',
  robotsIndex: 'index',
  robotsFollow: 'follow',
  openGraph: { title: '', description: '', image: '' },
  twitterCard: { title: '', description: '', image: '' },
};

export default function SeoPagesList() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'website' | 'blogs' | 'solutions'>('all');

  // Inline Modal State
  const [editingPage, setEditingPage] = useState<any | null>(null);
  const [form, setForm] = useState<SeoForm>({ ...EMPTY_SEO });
  const [keywordsInput, setKeywordsInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'basic' | 'social' | 'robots'>('basic');

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const loaded = await seoService.getSeoEntries();
      setPages(loaded);
    } catch (error) {
      console.error('Failed to fetch pages for SEO', error);
    } finally {
      setLoading(false);
    }
  };

  // Counts
  const websiteCount = pages.filter(p => p.pageType === 'Page').length;
  const blogsCount = pages.filter(p => p.pageType === 'Post').length;
  const solutionsCount = pages.filter(p => p.pageType === 'Solution').length;

  // Filtered pages
  const filteredPages = pages.filter(p => {
    // Type Filter
    if (activeFilter === 'website' && p.pageType !== 'Page') return false;
    if (activeFilter === 'blogs' && p.pageType !== 'Post') return false;
    if (activeFilter === 'solutions' && p.pageType !== 'Solution') return false;

    // Search Filter
    const q = search.toLowerCase().trim();
    if (!q) return true;

    return (
      p.name?.toLowerCase().includes(q) ||
      p.url?.toLowerCase().includes(q) ||
      p.seo?.title?.toLowerCase().includes(q) ||
      p.seo?.description?.toLowerCase().includes(q)
    );
  });

  const openModal = (page: any) => {
    setEditingPage(page);
    setSaveMessage('');
    setActiveTab('basic');
    const s = page.seo;
    setForm({
      title: s?.title || '',
      description: s?.description || '',
      keywords: s?.keywords || [],
      canonicalUrl: s?.canonicalUrl || '',
      robotsIndex: (s?.robotsIndex as 'index' | 'noindex') || 'index',
      robotsFollow: (s?.robotsFollow as 'follow' | 'nofollow') || 'follow',
      openGraph: { title: s?.openGraph?.title || '', description: s?.openGraph?.description || '', image: s?.openGraph?.image || '' },
      twitterCard: { title: s?.twitterCard?.title || '', description: s?.twitterCard?.description || '', image: s?.twitterCard?.image || '' },
    });
    setKeywordsInput((s?.keywords || []).join(', '));
  };

  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;
    setSaving(true);
    setSaveMessage('');
    try {
      const keywords = keywordsInput.split(',').map(k => k.trim()).filter(Boolean);
      await seoService.saveSeo({
        ...form,
        keywords,
        pageId: editingPage._id,
        pageType: editingPage.pageType,
        name: editingPage.name,
        url: editingPage.url,
      });
      setSaveMessage('✅ SEO settings saved successfully!');
      await fetchPages();
      setTimeout(() => {
        setEditingPage(null);
      }, 800);
    } catch (err: any) {
      setSaveMessage('❌ Failed to save: ' + (err.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 md:p-10 animate-fade-in space-y-6">
      {/* Top Header & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Website Pages & Meta List</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Audit and update SEO metadata, titles, and descriptions across all site pages and blog posts.
          </p>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#FF4F18] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search title, description, URL..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-11 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] w-full lg:w-80 transition-all duration-200 text-sm font-medium dark:text-white"
          />
        </div>
      </div>

      {/* Filter Tabs for Blogs, Website Pages, Solutions & All */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-150 dark:border-zinc-800 custom-scrollbar">
        {[
          { id: 'all', label: 'All Pages', count: pages.length, Icon: Globe },
          { id: 'website', label: 'Website Pages', count: websiteCount, Icon: FileText },
          { id: 'blogs', label: 'Blogs & Articles', count: blogsCount, Icon: Edit3 },
          { id: 'solutions', label: 'Solutions Cards', count: solutionsCount, Icon: CheckCircle2 },
        ].map(tab => {
          const isActive = activeFilter === tab.id;
          const TabIcon = tab.Icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive 
                  ? 'bg-[#FF4F18] text-white shadow-[0_3px_10px_rgba(255,79,24,0.3)]' 
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <TabIcon size={14} className={isActive ? 'text-white' : 'text-zinc-400'} />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                isActive ? 'bg-white/20 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Pages Table */}
      <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800/80 rounded-2xl bg-white dark:bg-zinc-900/40">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 uppercase text-[11px] tracking-wider font-extrabold">
            <tr>
              <th className="px-6 py-4">Page Name</th>
              <th className="px-6 py-4">URL</th>
              <th className="px-6 py-4 min-w-[280px]">SEO Title & Description</th>
              <th className="px-6 py-4">Index Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-16 text-center text-zinc-400 font-semibold animate-pulse">Loading pages...</td></tr>
            ) : filteredPages.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-zinc-500">
                  No pages found matching your search and filter criteria.
                </td>
              </tr>
            ) : (
              filteredPages.map(page => {
                const hasTitle = Boolean(page.seo?.title);
                const hasDesc = Boolean(page.seo?.description);

                return (
                  <tr key={page._id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50 transition-colors">
                    {/* Page Name */}
                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{page.name}</span>
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          page.pageType === 'Post'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            : page.pageType === 'Solution'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                            : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                        }`}>
                          {page.pageType === 'Post' ? 'Blog' : page.pageType === 'Solution' ? 'Solution' : 'Page'}
                        </span>
                      </div>
                    </td>

                    {/* URL */}
                    <td className="px-6 py-4 text-xs font-mono text-zinc-500 dark:text-zinc-400 truncate max-w-[180px]">
                      {page.url}
                    </td>

                    {/* SEO Title & Description */}
                    <td className="px-6 py-4 max-w-[320px]">
                      {/* Title */}
                      <div className="font-bold text-xs text-zinc-900 dark:text-zinc-100 truncate">
                        {hasTitle ? (
                          page.seo.title
                        ) : (
                          <span className="text-[#FF4F18] italic font-semibold flex items-center gap-1">
                            <AlertCircle size={12} /> Missing SEO Title
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1 leading-snug">
                        {hasDesc ? (
                          page.seo.description
                        ) : (
                          <span className="text-amber-600 dark:text-amber-400 italic text-[11px]">
                            No meta description provided
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Index Status */}
                    <td className="px-6 py-4">
                      {page.seo?.robotsIndex === 'noindex' ? (
                        <span className="text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/30 px-2.5 py-1 rounded-full font-bold text-xs inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> No Index
                        </span>
                      ) : (
                        <span className="text-green-700 bg-green-50 dark:text-green-400 dark:bg-green-950/30 px-2.5 py-1 rounded-full font-bold text-xs inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Index
                        </span>
                      )}
                    </td>

                    {/* Action Button - ALWAYS VISIBLE */}
                    <td className="px-6 py-4 text-right">
                      <button 
                        type="button"
                        onClick={() => openModal(page)}
                        className="inline-flex items-center gap-1.5 whitespace-nowrap text-[#FF4F18] hover:text-white font-extrabold border border-[#FF4F18] hover:bg-[#FF4F18] px-3.5 py-1.5 rounded-xl transition-all duration-200 text-xs cursor-pointer shadow-xs"
                      >
                        <Edit3 size={13} />
                        <span>Edit SEO</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Inline SEO Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-scale-in">
            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-150 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
              <div>
                <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white">Edit SEO Metadata</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">{editingPage.name} ({editingPage.url})</p>
              </div>
              <button 
                onClick={() => setEditingPage(null)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-zinc-150 dark:border-zinc-800 px-6 pt-2 bg-zinc-50/30 dark:bg-zinc-900/30 text-xs font-bold">
              {[
                { id: 'basic', label: 'Meta Content' },
                { id: 'social', label: 'Social & Cards (OG)' },
                { id: 'robots', label: 'Robots & Indexing' },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 transition-colors border-b-2 cursor-pointer ${
                    activeTab === tab.id 
                      ? 'border-[#FF4F18] text-[#FF4F18]' 
                      : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveSeo} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {saveMessage && (
                <div className={`p-3 rounded-xl text-xs font-bold ${saveMessage.includes('✅') ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400'}`}>
                  {saveMessage}
                </div>
              )}

              {activeTab === 'basic' && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                      Meta Title <span className="text-[#FF4F18]">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      placeholder="Page Title | Brand Name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF4F18] dark:text-white"
                      required
                    />
                    <div className={`text-[11px] mt-1 font-semibold ${form.title.length < 30 || form.title.length > 60 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                      {form.title.length}/60 characters (recommended: 30-60)
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                      Meta Description <span className="text-[#FF4F18]">*</span>
                    </label>
                    <textarea
                      value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      rows={3}
                      placeholder="A clear, compelling summary of this page for search engine snippet results..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF4F18] dark:text-white resize-none"
                      required
                    />
                    <div className={`text-[11px] mt-1 font-semibold ${form.description.length < 80 || form.description.length > 160 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                      {form.description.length}/160 characters (recommended: 80-160)
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                      Keywords (comma separated)
                    </label>
                    <input
                      type="text"
                      value={keywordsInput}
                      onChange={e => setKeywordsInput(e.target.value)}
                      placeholder="custom software, nextjs agency, web development"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF4F18] dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                      Canonical URL
                    </label>
                    <input
                      type="url"
                      value={form.canonicalUrl}
                      onChange={e => setForm({ ...form, canonicalUrl: e.target.value })}
                      placeholder="https://digitory.io/your-page"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF4F18] dark:text-white"
                    />
                  </div>
                </>
              )}

              {activeTab === 'social' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">OpenGraph (Facebook / LinkedIn)</h4>
                  <div>
                    <input
                      type="text"
                      value={form.openGraph.title}
                      onChange={e => setForm({ ...form, openGraph: { ...form.openGraph, title: e.target.value } })}
                      placeholder="OG Title"
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm dark:text-white"
                    />
                  </div>
                  <div>
                    <textarea
                      value={form.openGraph.description}
                      onChange={e => setForm({ ...form, openGraph: { ...form.openGraph, description: e.target.value } })}
                      rows={2}
                      placeholder="OG Description"
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm dark:text-white resize-none"
                    />
                  </div>
                  <div>
                    <input
                      type="url"
                      value={form.openGraph.image}
                      onChange={e => setForm({ ...form, openGraph: { ...form.openGraph, image: e.target.value } })}
                      placeholder="OG Image URL (https://...)"
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm dark:text-white"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'robots' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Robots Index Status</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                        <input
                          type="radio"
                          name="robotsIndex"
                          value="index"
                          checked={form.robotsIndex === 'index'}
                          onChange={() => setForm({ ...form, robotsIndex: 'index' })}
                          className="accent-[#FF4F18]"
                        />
                        Index (Allow Google to index this page)
                      </label>
                      <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                        <input
                          type="radio"
                          name="robotsIndex"
                          value="noindex"
                          checked={form.robotsIndex === 'noindex'}
                          onChange={() => setForm({ ...form, robotsIndex: 'noindex' })}
                          className="accent-[#FF4F18]"
                        />
                        No Index (Hide from search engines)
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-150 dark:border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#FF4F18] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#e03f0d] transition-all shadow-md disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {saving ? 'Saving Changes...' : 'Save SEO'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

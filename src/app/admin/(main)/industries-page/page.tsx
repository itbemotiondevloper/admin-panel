'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { industriesPageService, IndustriesPageData, DEFAULT_INDUSTRIES_PAGE_DATA } from '@/services/industriesPage.service';
import { Save, Loader2, Plus, Trash2, ArrowLeft } from 'lucide-react';

export default function AdminIndustriesPageEditor() {
  const [pageData, setPageData] = useState<IndustriesPageData>(DEFAULT_INDUSTRIES_PAGE_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    async function loadData() {
      try {
        const data = await industriesPageService.getPageData(true);
        if (data) setPageData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await industriesPageService.savePageData(pageData);
      showToast('Industries Page content updated successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to save page settings');
    } finally {
      setSaving(false);
    }
  };

  // Helper dynamic list handlers
  const handleAddFaq = () => {
    setPageData(prev => ({
      ...prev,
      faqs: {
        ...prev.faqs,
        list: [...(prev.faqs.list || []), { question: '', answer: '' }]
      }
    }));
  };

  const handleRemoveFaq = (idx: number) => {
    setPageData(prev => ({
      ...prev,
      faqs: {
        ...prev.faqs,
        list: prev.faqs.list.filter((_, i) => i !== idx)
      }
    }));
  };

  const handleUpdateFaq = (idx: number, field: 'question' | 'answer', val: string) => {
    setPageData(prev => {
      const list = [...prev.faqs.list];
      list[idx] = { ...list[idx], [field]: val };
      return {
        ...prev,
        faqs: { ...prev.faqs, list }
      };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center font-sans">
        <Loader2 className="w-10 h-10 animate-spin text-[#FF4F18] mb-4" />
        <p className="text-zinc-500 font-semibold uppercase tracking-wider text-xs">Loading Page Content Editor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in font-sans p-4 max-w-5xl mx-auto text-left">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold z-50">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/industries" className="p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              Industries Landing Page Editor
            </h1>
            <p className="text-xs text-zinc-500 mt-1">Edit content for all sections on the main Industries overview page (/industries)</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF4F18] hover:bg-[#E03F0D] text-white text-sm font-bold rounded-full transition-all shadow-md disabled:opacity-60 cursor-pointer"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Page Content
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* 1. Hero Section */}
        <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            1. Hero Section
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">Eyebrow Tagline</label>
              <input
                type="text"
                value={pageData.hero.eyebrow}
                onChange={(e) => setPageData({ ...pageData, hero: { ...pageData.hero, eyebrow: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">Main Title</label>
              <input
                type="text"
                value={pageData.hero.title}
                onChange={(e) => setPageData({ ...pageData, hero: { ...pageData.hero, title: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">Description</label>
            <textarea
              rows={3}
              value={pageData.hero.desc}
              onChange={(e) => setPageData({ ...pageData, hero: { ...pageData.hero, desc: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">CTA Button Text</label>
              <input
                type="text"
                value={pageData.hero.ctaText}
                onChange={(e) => setPageData({ ...pageData, hero: { ...pageData.hero, ctaText: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">CTA Target Anchor / Link</label>
              <input
                type="text"
                value={pageData.hero.ctaHref}
                onChange={(e) => setPageData({ ...pageData, hero: { ...pageData.hero, ctaHref: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* 2. Industries Header */}
        <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            2. Industries Grid Header
          </h3>

          <div>
            <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">Section Title</label>
            <input
              type="text"
              value={pageData.header.title}
              onChange={(e) => setPageData({ ...pageData, header: { ...pageData.header, title: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">Section Subtitle</label>
            <textarea
              rows={2}
              value={pageData.header.desc}
              onChange={(e) => setPageData({ ...pageData, header: { ...pageData.header, desc: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
            />
          </div>
        </div>

        {/* 3. Strategy Comparison Section */}
        <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            3. Strategy Philosophy ("One Digital Strategy Doesn't Fit Every Business")
          </h3>

          <div>
            <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">Section Title</label>
            <input
              type="text"
              value={pageData.strategy.title}
              onChange={(e) => setPageData({ ...pageData, strategy: { ...pageData.strategy, title: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-500">Key Paragraphs</label>
            {pageData.strategy.paragraphs.map((p, idx) => (
              <textarea
                key={idx}
                rows={2}
                value={p}
                onChange={(e) => {
                  const list = [...pageData.strategy.paragraphs];
                  list[idx] = e.target.value;
                  setPageData({ ...pageData, strategy: { ...pageData.strategy, paragraphs: list } });
                }}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
              />
            ))}
          </div>
        </div>

        {/* 4. 5-Step Process Section */}
        <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            4. Process Steps ("Different Industry. Different Digital Approach.")
          </h3>

          <div>
            <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">Section Title</label>
            <input
              type="text"
              value={pageData.process.title}
              onChange={(e) => setPageData({ ...pageData, process: { ...pageData.process, title: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-4 pt-2">
            {pageData.process.steps.map((step, idx) => (
              <div key={idx} className="p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="text-xs font-extrabold text-[#FF4F18]">Step 0{idx + 1}</span>
                <input
                  type="text"
                  value={step.name}
                  onChange={(e) => {
                    const steps = [...pageData.process.steps];
                    steps[idx].name = e.target.value;
                    setPageData({ ...pageData, process: { ...pageData.process, steps } });
                  }}
                  className="w-full px-3.5 py-2 text-xs font-bold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                />
                <textarea
                  rows={2}
                  value={step.description}
                  onChange={(e) => {
                    const steps = [...pageData.process.steps];
                    steps[idx].description = e.target.value;
                    setPageData({ ...pageData, process: { ...pageData.process, steps } });
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 5. Case Studies Banner */}
        <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            5. Case Studies Highlight Banner
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">Badge Text</label>
              <input
                type="text"
                value={pageData.caseStudy.badge}
                onChange={(e) => setPageData({ ...pageData, caseStudy: { ...pageData.caseStudy, badge: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">Title</label>
              <input
                type="text"
                value={pageData.caseStudy.title}
                onChange={(e) => setPageData({ ...pageData, caseStudy: { ...pageData.caseStudy, title: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">Description</label>
            <textarea
              rows={2}
              value={pageData.caseStudy.desc}
              onChange={(e) => setPageData({ ...pageData, caseStudy: { ...pageData.caseStudy, desc: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
            />
          </div>
        </div>

        {/* 6. Frequently Asked Questions */}
        <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400">
              6. Frequently Asked Questions
            </h3>
            <button
              type="button"
              onClick={handleAddFaq}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-[#FF4F18] bg-orange-50 dark:bg-orange-950/20 rounded-full hover:bg-orange-100 transition-colors"
            >
              <Plus size={14} /> Add FAQ
            </button>
          </div>

          <div className="space-y-4">
            {pageData.faqs.list.map((faq, idx) => (
              <div key={idx} className="p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3 relative">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-zinc-400">FAQ #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(idx)}
                    className="text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Question..."
                  value={faq.question}
                  onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-bold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                />
                <textarea
                  rows={2}
                  placeholder="Answer..."
                  value={faq.answer}
                  onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 7. Bottom CTA Banner */}
        <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            7. Bottom CTA Banner ("Your Industry Has Its Own Digital Challenges")
          </h3>

          <div>
            <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">Banner Title</label>
            <input
              type="text"
              value={pageData.ctaBanner.title}
              onChange={(e) => setPageData({ ...pageData, ctaBanner: { ...pageData.ctaBanner, title: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">Description</label>
            <textarea
              rows={2}
              value={pageData.ctaBanner.desc}
              onChange={(e) => setPageData({ ...pageData, ctaBanner: { ...pageData.ctaBanner, desc: e.target.value } })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">Button CTA Text</label>
              <input
                type="text"
                value={pageData.ctaBanner.ctaText}
                onChange={(e) => setPageData({ ...pageData, ctaBanner: { ...pageData.ctaBanner, ctaText: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">Button Href</label>
              <input
                type="text"
                value={pageData.ctaBanner.ctaHref}
                onChange={(e) => setPageData({ ...pageData, ctaBanner: { ...pageData.ctaBanner, ctaHref: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}

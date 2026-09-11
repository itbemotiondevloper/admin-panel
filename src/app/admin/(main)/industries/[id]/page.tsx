'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { industriesService, IndustryItem } from '@/services/industries.service';
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from 'lucide-react';

export default function AdminIndustryEditorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const isNew = id === 'new';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<IndustryItem>>({
    title: '',
    slug: '',
    icon: '🏭',
    description: '',
    ctaText: '',
    ctaHref: '',
    order: 1,
    heroTitle: '',
    heroSubtitle: '',
    content: '',
    challenges: []
  });

  useEffect(() => {
    async function loadItem() {
      if (isNew) {
        setLoading(false);
        return;
      }
      try {
        const item = await industriesService.getIndustryById(id);
        if (item) {
          setFormData(item);
        } else {
          setError('Industry item not found.');
        }
      } catch (err: any) {
        console.error(err);
        setError('Failed to load industry data.');
      } finally {
        setLoading(false);
      }
    }
    loadItem();
  }, [id, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddChallenge = () => {
    setFormData(prev => ({
      ...prev,
      challenges: [...(prev.challenges || []), '']
    }));
  };

  const handleUpdateChallenge = (index: number, val: string) => {
    setFormData(prev => {
      const list = [...(prev.challenges || [])];
      list[index] = val;
      return { ...prev, challenges: list };
    });
  };

  const handleRemoveChallenge = (index: number) => {
    setFormData(prev => ({
      ...prev,
      challenges: (prev.challenges || []).filter((_, idx) => idx !== index)
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      alert('Industry Title is required!');
      return;
    }

    setSaving(true);
    try {
      if (isNew) {
        await industriesService.createIndustry(formData);
      } else {
        await industriesService.updateIndustry(id, formData);
      }
      router.push('/admin/industries');
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to save industry document');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center font-sans">
        <Loader2 className="w-10 h-10 animate-spin text-[#FF4F18] mb-4" />
        <p className="text-zinc-500 font-semibold uppercase tracking-wider text-xs">Loading Industry Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center font-sans">
        <div className="bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 p-6 rounded-3xl border border-red-200 dark:border-red-900/50 max-w-sm text-center">
          <p className="font-bold mb-2">Error</p>
          <p className="text-sm mb-4">{error}</p>
          <Link href="/admin/industries" className="text-xs font-black uppercase text-[#FF4F18] hover:underline">
            Back to Industries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in font-sans p-4 max-w-5xl mx-auto text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              {isNew ? 'Create New Industry Card' : `Edit Industry: ${formData.title}`}
            </h1>
            <p className="text-xs text-zinc-500 mt-1">Configure industry title, slug, icon, short overview, and detail page contents</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF4F18] hover:bg-[#E03F0D] text-white text-sm font-bold rounded-full transition-all shadow-md disabled:opacity-60 cursor-pointer"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Industry
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Main Settings Card */}
        <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            Card Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                placeholder="e.g. Manufacturing"
                className="w-full px-3.5 py-2.5 text-sm font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#FF4F18] text-zinc-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Slug *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug || ''}
                onChange={handleChange}
                placeholder="e.g. manufacturing"
                className="w-full px-3.5 py-2.5 text-sm font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#FF4F18] text-zinc-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Icon / Emoji</label>
              <input
                type="text"
                name="icon"
                value={formData.icon || ''}
                onChange={handleChange}
                placeholder="e.g. 🏭 or 🩺 or 🛒"
                className="w-full px-3.5 py-2.5 text-sm font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#FF4F18] text-zinc-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Display Order Priority</label>
              <input
                type="number"
                name="order"
                value={formData.order ?? 1}
                onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
                className="w-full px-3.5 py-2.5 text-sm font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#FF4F18] text-zinc-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Grid Card Short Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Build a stronger digital presence for your manufacturing business..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#FF4F18] text-zinc-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">CTA Button Text</label>
              <input
                type="text"
                name="ctaText"
                value={formData.ctaText || ''}
                onChange={handleChange}
                placeholder="e.g. Explore Manufacturing"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#FF4F18] text-zinc-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">CTA Href / Link URL</label>
              <input
                type="text"
                name="ctaHref"
                value={formData.ctaHref || ''}
                onChange={handleChange}
                placeholder="e.g. /industries/manufacturing"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#FF4F18] text-zinc-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Industry Detail Page Custom Content */}
        <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            Detail Page Header & Content
          </h3>

          <div>
            <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Detail Page Hero Title</label>
            <input
              type="text"
              name="heroTitle"
              value={formData.heroTitle || ''}
              onChange={handleChange}
              placeholder="e.g. Digital Growth Strategies for Manufacturing Leaders"
              className="w-full px-3.5 py-2.5 text-sm font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#FF4F18] text-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Detail Page Hero Subtitle</label>
            <textarea
              name="heroSubtitle"
              rows={2}
              value={formData.heroSubtitle || ''}
              onChange={handleChange}
              placeholder="Transform complex industrial capabilities into clear, high-converting digital experiences..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#FF4F18] text-zinc-900 dark:text-white"
            />
          </div>

          {/* Key Challenges Section */}
          <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-500">Key Industry Challenges Solved</label>
              <button
                type="button"
                onClick={handleAddChallenge}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-[#FF4F18] bg-orange-50 dark:bg-orange-950/20 rounded-full hover:bg-orange-100 transition-colors"
              >
                <Plus size={14} /> Add Challenge
              </button>
            </div>

            <div className="space-y-3">
              {(formData.challenges || []).map((ch, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={ch}
                    onChange={(e) => handleUpdateChallenge(idx, e.target.value)}
                    placeholder={`Challenge ${idx + 1}...`}
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveChallenge(idx)}
                    className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}

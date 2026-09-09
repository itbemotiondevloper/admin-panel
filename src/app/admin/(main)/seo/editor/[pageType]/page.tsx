'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { seoService, SeoForm } from '@/services/seo.service';
import Link from 'next/link';
import { ArrowLeft, Save, CheckCircle2, AlertCircle } from 'lucide-react';

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

export default function SeoEditorPage({ params }: { params: { pageType: string } }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get('id') || '';
  const url = searchParams.get('url') || '';
  const name = searchParams.get('name') || '';

  const pageType = (params?.pageType || 'Page') as 'Post' | 'Page' | 'Solution';

  const [form, setForm] = useState<SeoForm>({ ...EMPTY_SEO });
  const [keywordsInput, setKeywordsInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadEntry = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const entries = await seoService.getSeoEntries();
        const found = entries.find(e => e._id === id || e.id === id);
        if (found && found.seo) {
          const s = found.seo;
          setForm({
            title: s.title || '',
            description: s.description || '',
            keywords: s.keywords || [],
            canonicalUrl: s.canonicalUrl || '',
            robotsIndex: s.robotsIndex || 'index',
            robotsFollow: s.robotsFollow || 'follow',
            openGraph: s.openGraph || { title: '', description: '', image: '' },
            twitterCard: s.twitterCard || { title: '', description: '', image: '' },
          });
          setKeywordsInput((s.keywords || []).join(', '));
        }
      } catch (err) {
        console.error('Failed to load SEO entry:', err);
      } finally {
        setLoading(false);
      }
    };
    loadEntry();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const keywords = keywordsInput.split(',').map(k => k.trim()).filter(Boolean);
      await seoService.saveSeo({
        ...form,
        keywords,
        pageId: id,
        pageType,
        name,
        url,
      });
      setMessage('✅ SEO saved successfully!');
      setTimeout(() => {
        router.push('/admin/seo/pages');
      }, 1000);
    } catch (err: any) {
      setMessage('❌ Failed to save SEO: ' + (err.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-zinc-400 font-bold animate-pulse">
        Loading SEO configuration...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/seo/pages"
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Back to Pages List
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Edit SEO for {name || 'Page'}
        </h1>
        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-1">{url}</p>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-xs font-bold ${message.includes('✅') ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
            Meta Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Page Title | Brand Name"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF4F18] dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
            Meta Description
          </label>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={4}
            placeholder="A compelling description for search engine snippet results..."
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF4F18] dark:text-white resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
            Keywords
          </label>
          <input
            type="text"
            value={keywordsInput}
            onChange={e => setKeywordsInput(e.target.value)}
            placeholder="keyword 1, keyword 2"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF4F18] dark:text-white"
          />
        </div>

        <div className="pt-4 border-t border-zinc-150 dark:border-zinc-800 flex justify-end gap-3">
          <Link
            href="/admin/seo/pages"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="bg-[#FF4F18] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#e03f0d] transition-all shadow-md disabled:opacity-50 cursor-pointer flex items-center gap-2"
          >
            <Save size={14} />
            {saving ? 'Saving...' : 'Save SEO'}
          </button>
        </div>
      </form>
    </div>
  );
}

'use client';

import React, { useEffect, useState, use } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { seoService } from '@/services/seo.service';
import { ArrowLeft, Save, RefreshCw, FileJson } from 'lucide-react';
import Link from 'next/link';

export default function SeoEditorPage({ params }: { params: Promise<{ pageType: string }> }) {
  const resolvedParams = use(params);
  const pageType = (resolvedParams?.pageType || 'Page') as 'Post' | 'Page' | 'Solution';

  const router = useRouter();
  const searchParams = useSearchParams();
  const pageId = searchParams.get('id') || '';
  const pageUrl = searchParams.get('url') || '';
  const pageName = searchParams.get('name') || '';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveToast, setSaveToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [seo, setSeo] = useState<{
    title: string;
    description: string;
    keywords: string;
    canonicalUrl: string;
    slug: string;
    robotsIndex: 'index' | 'noindex';
    robotsFollow: 'follow' | 'nofollow';
    openGraph: { title: string; description: string; image: string };
    twitterCard: { title: string; description: string; image: string };
    schemaType: string;
    schemaData: string;
  }>({
    title: '',
    description: '',
    keywords: '',
    canonicalUrl: '',
    slug: '',
    robotsIndex: 'index',
    robotsFollow: 'follow',
    openGraph: { title: '', description: '', image: '' },
    twitterCard: { title: '', description: '', image: '' },
    schemaType: 'None',
    schemaData: ''
  });

  const [jsonInput, setJsonInput] = useState('');
  const [showJsonInput, setShowJsonInput] = useState(false);

  // Speed Audit Simulator state
  const [auditMode, setAuditMode] = useState<'desktop' | 'mobile'>('desktop');
  const [auditRunning, setAuditRunning] = useState(false);
  const [scores, setScores] = useState({
    performance: 94,
    accessibility: 96,
    bestPractices: 100,
    seo: 80,
    lcp: '1.1s',
    cls: '0.01',
    inp: '42ms'
  });

  const runSpeedAudit = () => {
    setAuditRunning(true);
    setTimeout(() => {
      const isDesktop = auditMode === 'desktop';
      const performanceScore = isDesktop ? Math.floor(Math.random() * 6) + 94 : Math.floor(Math.random() * 12) + 78;
      
      // Calculate SEO score based on actual checks
      let seoCalculated = 10;
      if (seo.title) seoCalculated += 30;
      if (seo.description) seoCalculated += 30;
      if (seo.keywords) seoCalculated += 15;
      if (seo.canonicalUrl) seoCalculated += 15;

      setScores({
        performance: performanceScore,
        accessibility: Math.floor(Math.random() * 4) + 96,
        bestPractices: 100,
        seo: Math.min(100, seoCalculated),
        lcp: isDesktop ? '1.0s' : '2.3s',
        cls: isDesktop ? '0.01' : '0.06',
        inp: isDesktop ? '35ms' : '78ms'
      });
      setAuditRunning(false);
    }, 1000);
  };

  useEffect(() => {
    // Sync SEO simulator score initially
    let seoCalculated = 10;
    if (seo.title) seoCalculated += 30;
    if (seo.description) seoCalculated += 30;
    if (seo.keywords) seoCalculated += 15;
    if (seo.canonicalUrl) seoCalculated += 15;
    setScores(prev => ({ ...prev, seo: Math.min(100, seoCalculated) }));
  }, [seo.title, seo.description, seo.keywords, seo.canonicalUrl]);

  const handleInjectJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setSeo((prev) => ({
        ...prev,
        title: parsed.title ?? prev.title,
        description: parsed.description ?? prev.description,
        keywords: Array.isArray(parsed.keywords) ? parsed.keywords.join(', ') : parsed.keywords ?? prev.keywords,
        canonicalUrl: parsed.canonicalUrl ?? prev.canonicalUrl,
        slug: parsed.slug ?? prev.slug,
        robotsIndex: (parsed.robotsIndex as 'index' | 'noindex') ?? prev.robotsIndex,
        robotsFollow: (parsed.robotsFollow as 'follow' | 'nofollow') ?? prev.robotsFollow,
        openGraph: {
          title: parsed.openGraph?.title ?? prev.openGraph.title,
          description: parsed.openGraph?.description ?? prev.openGraph.description,
          image: parsed.openGraph?.image ?? prev.openGraph.image,
        },
        twitterCard: {
          title: parsed.twitterCard?.title ?? prev.twitterCard.title,
          description: parsed.twitterCard?.description ?? prev.twitterCard.description,
          image: parsed.twitterCard?.image ?? prev.twitterCard.image,
        },
        schemaType: parsed.schemaType ?? prev.schemaType,
        schemaData: parsed.schemaData ? (typeof parsed.schemaData === 'object' ? JSON.stringify(parsed.schemaData, null, 2) : parsed.schemaData) : prev.schemaData
      }));
      setShowJsonInput(false);
      setSaveToast({ message: 'JSON injected successfully! Click Save Changes to commit.', type: 'success' });
      setTimeout(() => setSaveToast(null), 4000);
    } catch (e) {
      alert('Failed to parse JSON. Please verify syntax.');
    }
  };

  useEffect(() => {
    if (!pageId) {
      setLoading(false);
      return;
    }

    const fetchSeo = async () => {
      try {
        const entries = await seoService.getSeoEntries();
        const found = entries.find(e => e._id === pageId || e.id === pageId);
        if (found) {
          const s = found.seo || {};
          setSeo({
            title: s.title || s.metaTitle || '',
            description: s.description || s.metaDescription || '',
            keywords: Array.isArray(s.keywords) ? s.keywords.join(', ') : s.keywords || '',
            canonicalUrl: s.canonicalUrl || '',
            slug: found.slug || '',
            robotsIndex: (s.robotsIndex as 'index' | 'noindex') || 'index',
            robotsFollow: (s.robotsFollow as 'follow' | 'nofollow') || 'follow',
            openGraph: s.openGraph || { title: '', description: '', image: '' },
            twitterCard: s.twitterCard || { title: '', description: '', image: '' },
            schemaType: s.schemaType || 'None',
            schemaData: s.schemaData ? (typeof s.schemaData === 'object' ? JSON.stringify(s.schemaData, null, 2) : s.schemaData) : ''
          });
        }
      } catch (error) {
        console.error('Failed to fetch SEO', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeo();
  }, [pageId, pageType]);

  const handleSave = async () => {
    setSaving(true);
    setSaveToast(null);
    try {
      let parsedSchema: any = null;
      if (seo.schemaType !== 'None' && seo.schemaData.trim()) {
        try {
          parsedSchema = JSON.parse(seo.schemaData);
        } catch (e) {
          alert('Invalid JSON in Schema Data. Please fix JSON syntax.');
          setSaving(false);
          return;
        }
      }

      const keywordsArray = seo.keywords
        .split(',')
        .map(k => k.trim())
        .filter(Boolean);

      const payload = {
        pageId,
        pageType,
        name: pageName,
        url: pageUrl,
        title: seo.title,
        description: seo.description,
        keywords: keywordsArray,
        canonicalUrl: seo.canonicalUrl,
        slug: seo.slug,
        robotsIndex: seo.robotsIndex,
        robotsFollow: seo.robotsFollow,
        openGraph: seo.openGraph,
        twitterCard: seo.twitterCard,
        schemaType: seo.schemaType,
        schemaData: parsedSchema || seo.schemaData
      };

      await seoService.saveSeo(payload);
      setSaveToast({ message: 'SEO metadata saved successfully!', type: 'success' });
      setTimeout(() => {
        setSaveToast(null);
      }, 3500);
    } catch (error: any) {
      console.error(error);
      setSaveToast({ message: 'Failed to save SEO: ' + (error.message || 'Unknown error'), type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleAutoGenerate = () => {
    setSeo((prev) => ({
      ...prev,
      title: prev.title || `${pageName || 'Page'} | Digitory`,
      slug: prev.slug || pageName?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || ''
    }));
  };

  if (loading) {
    return (
      <div className="p-16 text-center animate-pulse text-zinc-400 font-semibold flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-zinc-900 dark:border-white border-t-transparent rounded-full animate-spin mb-3" />
        Loading SEO Editor...
      </div>
    );
  }

  const titleLength = seo.title.length;
  const descLength = seo.description.length;

  // Compute live issues list
  const getAuditIssues = () => {
    const issues = [];
    if (!seo.title) {
      issues.push({ text: 'Meta title is missing', type: 'error' });
    } else {
      if (seo.title.length < 30) issues.push({ text: 'Title is short (ideal: 30-60 chars)', type: 'warning' });
      if (seo.title.length > 60) issues.push({ text: 'Title is too long (Google will truncate)', type: 'warning' });
    }

    if (!seo.description) {
      issues.push({ text: 'Meta description is missing', type: 'error' });
    } else {
      if (seo.description.length < 80) issues.push({ text: 'Description is short (ideal: 80-160 chars)', type: 'warning' });
      if (seo.description.length > 160) issues.push({ text: 'Description is too long (will truncate)', type: 'warning' });
    }

    if (!seo.keywords) {
      issues.push({ text: 'Keywords meta tag is missing', type: 'warning' });
    }

    if (!seo.canonicalUrl) {
      issues.push({ text: 'Canonical URL link tag is missing', type: 'warning' });
    }

    if (seo.robotsIndex === 'noindex') {
      issues.push({ text: 'Blocked from index (noindex active)', type: 'warning' });
    }

    return issues;
  };

  const auditIssues = getAuditIssues();

  return (
    <div className="bg-zinc-50 dark:bg-[#0d0d0e] min-h-screen pb-16">
      {/* Toast Notification */}
      {saveToast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl shadow-xl border text-xs font-bold transition-all duration-300 ${
          saveToast.type === 'success' 
            ? 'bg-green-50 text-green-800 dark:bg-green-950/80 dark:text-green-300 border-green-200 dark:border-green-800' 
            : 'bg-red-50 text-red-800 dark:bg-red-950/80 dark:text-red-300 border-red-200 dark:border-red-800'
        }`}>
          {saveToast.message}
        </div>
      )}

      {/* Sticky Top Navigation Bar */}
      <div className="sticky top-0 bg-white/85 dark:bg-[#121214]/85 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/80 p-4 flex items-center justify-between z-10 shadow-xs transition-colors">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/seo/pages" 
            className="p-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-full transition-colors group"
          >
            <ArrowLeft size={18} className="text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white" />
          </Link>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Editing SEO: {pageName || 'Page'}
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono font-medium">{pageUrl}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => setShowJsonInput(true)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-bold text-xs sm:text-sm rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer border border-zinc-200 dark:border-zinc-800"
          >
            <FileJson size={14} /> Inject JSON
          </button>
          <button 
            type="button"
            onClick={handleAutoGenerate}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-bold text-xs sm:text-sm rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer border border-zinc-200 dark:border-zinc-800"
          >
            <RefreshCw size={14} /> Auto-Generate
          </button>
          <button 
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs sm:text-sm rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-200 shadow-md disabled:opacity-50 cursor-pointer"
          >
            <Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Editor Form (Left 2 Columns) */}
        <div className="lg:col-span-2 space-y-8 animate-fade-in">
          {/* General SEO */}
          <section className="bg-white dark:bg-[#121214] p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 shadow-xs">
            <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">General SEO</h2>
            
            <div className="space-y-5">
              <div>
                <label className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  <span>SEO Title</span>
                  <span className={`${titleLength > 60 ? 'text-red-500' : titleLength >= 30 ? 'text-green-500' : 'text-zinc-400 font-semibold'}`}>
                    {titleLength} / 60
                  </span>
                </label>
                <input 
                  type="text"
                  value={seo.title}
                  onChange={e => setSeo({...seo, title: e.target.value})}
                  className="w-full bg-zinc-50 dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all text-zinc-900 dark:text-white text-sm"
                  placeholder="E.g. Best Digital Services | Digitory"
                />
              </div>

              <div>
                <label className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  <span>Meta Description</span>
                  <span className={`${descLength > 160 ? 'text-red-500' : descLength >= 80 ? 'text-green-500' : 'text-zinc-400 font-semibold'}`}>
                    {descLength} / 160
                  </span>
                </label>
                <textarea 
                  value={seo.description}
                  onChange={e => setSeo({...seo, description: e.target.value})}
                  rows={3}
                  className="w-full bg-zinc-50 dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all text-zinc-900 dark:text-white text-sm resize-none custom-scrollbar"
                  placeholder="Brief summary of the page for search engine results..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Keywords (comma separated)
                </label>
                <input 
                  type="text"
                  value={seo.keywords}
                  onChange={e => setSeo({...seo, keywords: e.target.value})}
                  className="w-full bg-zinc-50 dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all text-zinc-900 dark:text-white text-sm"
                  placeholder="marketing, engineering, solutions, cloud"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Canonical URL
                  </label>
                  <input 
                    type="text"
                    value={seo.canonicalUrl}
                    onChange={e => setSeo({...seo, canonicalUrl: e.target.value})}
                    className="w-full bg-zinc-50 dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all text-zinc-900 dark:text-white text-sm"
                    placeholder="https://digitory.io/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Slug
                  </label>
                  <input 
                    type="text"
                    value={seo.slug}
                    onChange={e => setSeo({...seo, slug: e.target.value})}
                    className="w-full bg-zinc-50 dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 focus:outline-none text-zinc-900 dark:text-white text-sm opacity-70 font-mono"
                    disabled
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Robots Index
                  </label>
                  <select 
                    value={seo.robotsIndex}
                    onChange={e => setSeo({...seo, robotsIndex: e.target.value as 'index' | 'noindex'})}
                    className="w-full bg-zinc-50 dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all text-zinc-900 dark:text-white text-sm font-semibold"
                  >
                    <option value="index">Index (Allow Search Engines)</option>
                    <option value="noindex">No Index (Block Search Engines)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Robots Follow
                  </label>
                  <select 
                    value={seo.robotsFollow}
                    onChange={e => setSeo({...seo, robotsFollow: e.target.value as 'follow' | 'nofollow'})}
                    className="w-full bg-zinc-50 dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all text-zinc-900 dark:text-white text-sm font-semibold"
                  >
                    <option value="follow">Follow (Follow Page Links)</option>
                    <option value="nofollow">No Follow (Do Not Follow Links)</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Speed Audit Simulator panel */}
          <section className="bg-white dark:bg-[#121214] p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Page Performance & Speed Review
              </h2>
              <div className="flex gap-1.5 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
                {(['desktop', 'mobile'] as const).map(mode => (
                  <button
                    type="button"
                    key={mode}
                    onClick={() => setAuditMode(mode)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      auditMode === mode 
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-xs' 
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {mode === 'desktop' ? 'Desktop' : 'Mobile'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { label: 'Performance', score: scores.performance },
                { label: 'Accessibility', score: scores.accessibility },
                { label: 'Best Practices', score: scores.bestPractices },
                { label: 'SEO Validation', score: scores.seo },
              ].map((m, i) => {
                const color = m.score >= 90 ? 'text-green-500' : m.score >= 50 ? 'text-yellow-500' : 'text-red-500';
                return (
                  <div key={i} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-150 dark:border-zinc-800">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1">{m.label}</p>
                    <p className={`text-3xl font-black ${color}`}>{m.score}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/30 p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Core Web Vitals Indicators</span>
                <button
                  type="button"
                  onClick={runSpeedAudit}
                  disabled={auditRunning}
                  className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-[10px] font-extrabold px-3 py-1 rounded-full cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 transition-all"
                >
                  {auditRunning ? 'Simulating Audit...' : 'Re-Run Speed Test'}
                </button>
              </div>

              {[
                { label: 'Largest Contentful Paint (LCP)', value: scores.lcp, rating: parseFloat(scores.lcp) <= 2.0 ? 'Good' : 'Needs Optimization' },
                { label: 'Interaction to Next Paint (INP)', value: scores.inp, rating: parseInt(scores.inp) <= 100 ? 'Good' : 'Needs Optimization' },
                { label: 'Cumulative Layout Shift (CLS)', value: scores.cls, rating: parseFloat(scores.cls) <= 0.05 ? 'Good' : 'Needs Optimization' }
              ].map((cw, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 dark:text-zinc-400 font-semibold">{cw.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold font-mono text-zinc-900 dark:text-white">{cw.value}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold ${cw.rating === 'Good' ? 'bg-green-100 text-green-700 dark:bg-green-500/15' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/15'}`}>
                      {cw.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* SEO Warnings Tracker */}
            <div className="space-y-3.5">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wide">SEO Checks & Recommendations</h3>
              {auditIssues.length === 0 ? (
                <div className="p-3 bg-green-50 dark:bg-green-950/15 border border-green-200 dark:border-green-800/20 text-green-600 dark:text-green-400 text-xs font-semibold rounded-xl">
                  🎉 Fantastic! On-page title, description, keywords, and indexing are optimal.
                </div>
              ) : (
                <div className="space-y-2">
                  {auditIssues.map((issue, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2.5 ${issue.type === 'error' ? 'bg-red-50 dark:bg-red-950/15 border-red-200/50 dark:border-red-900/30 text-red-600 dark:text-red-400' : 'bg-amber-50 dark:bg-amber-950/15 border-amber-200/50 dark:border-amber-900/30 text-amber-600 dark:text-amber-400'}`}
                    >
                      <span>{issue.type === 'error' ? '🔴' : '⚠️'}</span>
                      <span>{issue.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Open Graph & Twitter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white dark:bg-[#121214] p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 shadow-xs">
              <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">Open Graph</h2>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="OG Title" 
                  value={seo.openGraph.title}
                  onChange={e => setSeo({...seo, openGraph: {...seo.openGraph, title: e.target.value}})}
                  className="w-full bg-zinc-50 dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all text-zinc-900 dark:text-white text-sm"
                />
                <textarea 
                  placeholder="OG Description" 
                  value={seo.openGraph.description} 
                  rows={2}
                  onChange={e => setSeo({...seo, openGraph: {...seo.openGraph, description: e.target.value}})}
                  className="w-full bg-zinc-50 dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all text-zinc-900 dark:text-white text-sm resize-none custom-scrollbar"
                />
                <input 
                  type="text" 
                  placeholder="OG Image URL" 
                  value={seo.openGraph.image}
                  onChange={e => setSeo({...seo, openGraph: {...seo.openGraph, image: e.target.value}})}
                  className="w-full bg-zinc-50 dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all text-zinc-900 dark:text-white text-sm"
                />
              </div>
            </section>

            <section className="bg-white dark:bg-[#121214] p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 shadow-xs">
              <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">Twitter Card</h2>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Twitter Title" 
                  value={seo.twitterCard.title}
                  onChange={e => setSeo({...seo, twitterCard: {...seo.twitterCard, title: e.target.value}})}
                  className="w-full bg-zinc-50 dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all text-zinc-900 dark:text-white text-sm"
                />
                <textarea 
                  placeholder="Twitter Description" 
                  value={seo.twitterCard.description} 
                  rows={2}
                  onChange={e => setSeo({...seo, twitterCard: {...seo.twitterCard, description: e.target.value}})}
                  className="w-full bg-zinc-50 dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all text-zinc-900 dark:text-white text-sm resize-none custom-scrollbar"
                />
                <input 
                  type="text" 
                  placeholder="Twitter Image URL" 
                  value={seo.twitterCard.image}
                  onChange={e => setSeo({...seo, twitterCard: {...seo.twitterCard, image: e.target.value}})}
                  className="w-full bg-zinc-50 dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all text-zinc-900 dark:text-white text-sm"
                />
              </div>
            </section>
          </div>

          {/* Schema Builder */}
          <section className="bg-white dark:bg-[#121214] p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 shadow-xs">
            <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">Schema Markup (JSON-LD)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Schema Type</label>
                <select 
                  value={seo.schemaType}
                  onChange={e => setSeo({...seo, schemaType: e.target.value})}
                  className="w-full bg-zinc-50 dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all text-zinc-900 dark:text-white text-sm font-semibold"
                >
                  {['None', 'Organization', 'Product', 'Article', 'FAQ', 'Breadcrumb', 'LocalBusiness', 'Custom'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              {seo.schemaType !== 'None' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">JSON-LD Code</label>
                  <textarea 
                    value={seo.schemaData}
                    onChange={e => setSeo({...seo, schemaData: e.target.value})}
                    rows={8}
                    className="w-full bg-zinc-900 dark:bg-black text-green-400 border border-zinc-800 rounded-xl p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all resize-none custom-scrollbar"
                    placeholder='{"@context": "https://schema.org", "@type": "Article", ...}'
                  />
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Live Previews (Right Column) */}
        <div className="space-y-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <section className="bg-white dark:bg-[#121214] p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 shadow-xs sticky top-24 space-y-8">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">Google Snippet Preview</h2>
              <div className="bg-white dark:bg-zinc-900/90 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs hover:shadow-md transition-shadow text-left">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full overflow-hidden flex items-center justify-center">
                    <span className="text-xs font-black text-zinc-700 dark:text-zinc-200">DG</span>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-900 dark:text-white font-medium">Digitory</div>
                    <div className="text-[12px] text-zinc-500 dark:text-zinc-400 font-mono">https://digitory.io{pageUrl}</div>
                  </div>
                </div>
                <h3 className="text-blue-700 dark:text-blue-400 text-base font-semibold hover:underline cursor-pointer truncate">
                  {seo.title || 'Page Title Example | Brand Name'}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                  {seo.description || 'Provide a meta description to preview how this page will appear in search results.'}
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">Social Card (Twitter / OG)</h2>
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-[#1A1A1D] text-left shadow-xs">
                <div className="h-40 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border-b border-zinc-200 dark:border-zinc-800 overflow-hidden">
                  {seo.twitterCard.image || seo.openGraph.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={seo.twitterCard.image || seo.openGraph.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-zinc-400 dark:text-zinc-600 text-xs font-bold uppercase tracking-wider">1200 x 630 Preview</span>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-zinc-400 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-1 font-mono">digitory.io</div>
                  <div className="font-extrabold text-zinc-900 dark:text-white leading-snug truncate text-base">
                    {seo.twitterCard.title || seo.openGraph.title || seo.title || 'Social Title Example'}
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-xs mt-1 line-clamp-2 font-medium leading-relaxed">
                    {seo.twitterCard.description || seo.openGraph.description || seo.description || 'Social description preview...'}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>

      {/* Inject Raw JSON Modal */}
      {showJsonInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs animate-fade-in" onClick={() => setShowJsonInput(false)} />
          <div className="relative bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl z-10 animate-scale-in">
            <h2 className="text-xl font-extrabold text-zinc-950 dark:text-white mb-2">Inject Raw SEO JSON</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed font-medium">
              Paste a raw JSON object containing SEO configurations (e.g. title, description, keywords, canonicalUrl, robotsIndex, robotsFollow, openGraph, twitterCard, schemaType, schemaData).
            </p>
            <textarea 
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              rows={12}
              placeholder={`{\n  "title": "My Page Title",\n  "description": "Meta description content",\n  "keywords": ["tag1", "tag2"],\n  "robotsIndex": "index",\n  "openGraph": {\n    "title": "OG Title",\n    "image": "https://..."\n  }\n}`}
              className="w-full bg-zinc-900 dark:bg-black text-green-400 border border-zinc-800 rounded-xl p-4 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all resize-none custom-scrollbar"
            />
            <div className="pt-4 flex gap-3">
              <button 
                type="button" 
                onClick={() => setShowJsonInput(false)}
                className="flex-1 px-4 py-2.5 font-bold text-sm text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={handleInjectJson}
                className="flex-1 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-200"
              >
                Apply & Inject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

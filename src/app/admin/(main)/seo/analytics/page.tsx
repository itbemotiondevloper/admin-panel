'use client';

import React, { useEffect, useState } from 'react';
import { settingsService } from '@/services/settings.service';
import { Save, Activity, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export default function SeoAnalyticsPage() {
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('');
  const [facebookPixelId, setFacebookPixelId] = useState('');
  const [customHeadScripts, setCustomHeadScripts] = useState('');
  const [customBodyScripts, setCustomBodyScripts] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const s = await settingsService.getSettings(true);
        if (s.analytics) {
          if (s.analytics.googleAnalyticsId) setGoogleAnalyticsId(s.analytics.googleAnalyticsId);
          if (s.analytics.facebookPixelId) setFacebookPixelId(s.analytics.facebookPixelId);
          if (s.analytics.customHeadScripts) setCustomHeadScripts(s.analytics.customHeadScripts);
          if (s.analytics.customBodyScripts) setCustomBodyScripts(s.analytics.customBodyScripts);
        }
      } catch (err) {
        console.error('Failed to load analytics settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await settingsService.saveSettings({
        analytics: {
          googleAnalyticsId,
          facebookPixelId,
          customHeadScripts,
          customBodyScripts
        }
      });
      setMessage('✅ Analytics & Tracking Pixels updated successfully!');
    } catch (err: any) {
      console.error(err);
      setMessage('❌ ' + (err.message || 'Failed to save tracking settings'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-zinc-400">
        <div className="w-6 h-6 border-2 border-[#FF4F18] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading analytics settings...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl space-y-8 animate-fade-in text-left">
      <form onSubmit={handleSave} className="bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-8 shadow-sm space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white dark:bg-[#1A1A1D] shadow-sm text-[#FF4F18] rounded-xl flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
            <Activity size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Analytics & Tracking Pixels</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
              Configure Google Analytics 4, Meta / Facebook Pixel, and global tracking scripts across all pages.
            </p>
          </div>
        </div>

        {/* Live Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${googleAnalyticsId.trim() ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-zinc-400'}`} />
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Google Analytics (GA4)</h4>
                <p className="text-xs text-zinc-500 font-mono">{googleAnalyticsId.trim() || 'Not Configured'}</p>
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${googleAnalyticsId.trim() ? 'bg-green-500/10 text-green-500' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}>
              {googleAnalyticsId.trim() ? 'Active' : 'Disabled'}
            </span>
          </div>

          <div className="bg-white dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${facebookPixelId.trim() ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-zinc-400'}`} />
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Meta / Facebook Pixel</h4>
                <p className="text-xs text-zinc-500 font-mono">{facebookPixelId.trim() || 'Not Configured'}</p>
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${facebookPixelId.trim() ? 'bg-blue-500/10 text-blue-500' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}>
              {facebookPixelId.trim() ? 'Active' : 'Disabled'}
            </span>
          </div>
        </div>

        {/* Inputs section */}
        <div className="space-y-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Google Analytics Measurement ID (GA4)
              </label>
              <input
                type="text"
                value={googleAnalyticsId}
                onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-sm font-mono text-zinc-900 dark:text-white focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
                placeholder="G-XXXXXXXXXX"
              />
              <p className="text-xs text-zinc-400">Find this in Google Analytics &gt; Admin &gt; Data Streams.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Meta / Facebook Pixel ID
              </label>
              <input
                type="text"
                value={facebookPixelId}
                onChange={(e) => setFacebookPixelId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-sm font-mono text-zinc-900 dark:text-white focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
                placeholder="123456789012345"
              />
              <p className="text-xs text-zinc-400">Find this in Meta Events Manager &gt; Data Sources.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Custom Head Scripts (&lt;head&gt;)
              </label>
              <textarea
                rows={4}
                value={customHeadScripts}
                onChange={(e) => setCustomHeadScripts(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-xs font-mono text-zinc-900 dark:text-white focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] resize-none custom-scrollbar"
                placeholder="<!-- Code injected into site <head> tag -->"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Custom Body Scripts (&lt;body&gt;)
              </label>
              <textarea
                rows={4}
                value={customBodyScripts}
                onChange={(e) => setCustomBodyScripts(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-xs font-mono text-zinc-900 dark:text-white focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] resize-none custom-scrollbar"
                placeholder="<!-- Code injected into site <body> tag -->"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
          {message ? (
            <p className={`text-xs font-bold flex items-center gap-1.5 ${message.startsWith('✅') ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
              {message.startsWith('✅') ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              <span>{message}</span>
            </p>
          ) : (
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <ShieldCheck size={14} className="text-green-500" />
              <span>Scripts automatically load across all public pages on save.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 bg-[#FF4F18] text-white font-extrabold px-8 py-3.5 rounded-xl hover:bg-[#E03F0D] transition-all duration-200 shadow-[0_4px_14px_rgba(255,79,24,0.35)] hover:shadow-[0_6px_20px_rgba(255,79,24,0.4)] disabled:opacity-50 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Save size={18} /> {saving ? 'Saving...' : 'Save Tracking Settings'}
          </button>
        </div>

      </form>
    </div>
  );
}

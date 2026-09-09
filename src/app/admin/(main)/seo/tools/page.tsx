'use client';

import React, { useEffect, useState } from 'react';
import { seoService } from '@/services/seo.service';
import { FileText, Save, RefreshCw, Bot, Sparkles, ExternalLink } from 'lucide-react';

export default function SeoTools() {
  const [sitemapInfo, setSitemapInfo] = useState<any>(null);
  const [generating, setGenerating] = useState(false);

  const [robotsTxt, setRobotsTxt] = useState('');
  const [savingRobots, setSavingRobots] = useState(false);

  const [llmTxt, setLlmTxt] = useState('');
  const [savingLlm, setSavingLlm] = useState(false);
  const [generatingLlm, setGeneratingLlm] = useState(false);

  useEffect(() => {
    fetchSitemapInfo();
    fetchRobots();
    fetchLlmTxt();
  }, []);

  const fetchSitemapInfo = async () => {
    try {
      const data = await seoService.getSitemapInfo();
      if (data) setSitemapInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRobots = async () => {
    try {
      const text = await seoService.getRobots();
      setRobotsTxt(text);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLlmTxt = async () => {
    try {
      const text = await seoService.getLlmTxt();
      setLlmTxt(text);
    } catch (error) {
      console.error(error);
    }
  };

  const generateSitemap = async () => {
    setGenerating(true);
    try {
      const data = await seoService.generateSitemap();
      if (data) setSitemapInfo(data);
      alert('Sitemap generated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to generate sitemap');
    } finally {
      setGenerating(false);
    }
  };

  const saveRobots = async () => {
    setSavingRobots(true);
    try {
      await seoService.saveRobots(robotsTxt);
      alert('robots.txt saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to save robots.txt');
    } finally {
      setSavingRobots(false);
    }
  };

  const saveLlm = async () => {
    setSavingLlm(true);
    try {
      await seoService.saveLlmTxt(llmTxt);
      alert('llm.txt saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to save llm.txt');
    } finally {
      setSavingLlm(false);
    }
  };

  const autoGenerateLlm = async () => {
    setGeneratingLlm(true);
    try {
      const generated = await seoService.generateDefaultLlmTxt();
      setLlmTxt(generated);
      alert('Generated llm.txt from current Solutions & Posts!');
    } catch (error) {
      console.error(error);
      alert('Failed to generate llm.txt');
    } finally {
      setGeneratingLlm(false);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sitemap Section */}
        <section className="bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white dark:bg-[#1A1A1D] shadow-sm text-[#FF4F18] rounded-xl flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
              <RefreshCw size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">XML Sitemap</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">sitemap.xml for search engines.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 mb-8 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-zinc-600 dark:text-zinc-400 font-bold text-sm uppercase tracking-wider">Status</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${sitemapInfo ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'}`}>
                {sitemapInfo ? 'Available' : 'Not Generated'}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-zinc-600 dark:text-zinc-400 font-bold text-sm uppercase tracking-wider">URLs Indexed</span>
              <span className="font-black text-xl text-zinc-900 dark:text-white">{sitemapInfo?.urlsCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600 dark:text-zinc-400 font-bold text-sm uppercase tracking-wider">Last Generated</span>
              <span className="font-bold text-zinc-900 dark:text-white text-sm">
                {sitemapInfo?.lastGenerated ? new Date(sitemapInfo.lastGenerated).toLocaleString() : 'Never'}
              </span>
            </div>
          </div>

          <button 
            onClick={generateSitemap}
            disabled={generating}
            className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold py-3.5 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-200 shadow-sm disabled:opacity-50"
          >
            {generating ? 'Generating...' : 'Regenerate Sitemap'}
          </button>
        </section>

        {/* Robots.txt Section */}
        <section className="bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white dark:bg-[#1A1A1D] shadow-sm text-zinc-900 dark:text-white rounded-xl flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Robots.txt Editor</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Control search engine crawlers.</p>
            </div>
          </div>

          <textarea 
            value={robotsTxt}
            onChange={e => setRobotsTxt(e.target.value)}
            className="w-full h-72 bg-zinc-900 dark:bg-black border border-zinc-800 rounded-2xl p-5 font-mono text-sm text-green-400 outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] resize-none mb-8 custom-scrollbar shadow-inner"
            placeholder="User-agent: *"
          />

          <button 
            onClick={saveRobots}
            disabled={savingRobots}
            className="w-full flex items-center justify-center gap-2 bg-[#FF4F18] text-white font-bold py-3.5 rounded-xl hover:bg-[#E03F0D] transition-all duration-200 shadow-[0_4px_14px_rgba(255,79,24,0.35)] hover:shadow-[0_6px_20px_rgba(255,79,24,0.4)] disabled:opacity-50 transform hover:-translate-y-0.5"
          >
            <Save size={18} /> {savingRobots ? 'Saving...' : 'Save robots.txt'}
          </button>
        </section>
      </div>

      {/* LLM.txt Section */}
      <section className="bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#7C3AED]/10 text-[#7C3AED] dark:bg-[#A78BFA]/10 dark:text-[#A78BFA] shadow-sm rounded-xl flex items-center justify-center border border-[#A78BFA]/30">
              <Bot size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">LLM.txt Editor</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#7C3AED]/10 text-[#7C3AED] dark:bg-[#A78BFA]/20 dark:text-[#A78BFA]">
                  AI Discovery
                </span>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                Configure `/llm.txt` for AI crawlers like ChatGPT, Claude, Perplexity, and Gemini.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="/llm.txt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
            >
              View Public /llm.txt <ExternalLink size={14} />
            </a>
            <button
              onClick={autoGenerateLlm}
              disabled={generatingLlm}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7C3AED]/10 dark:bg-[#A78BFA]/15 text-[#7C3AED] dark:text-[#A78BFA] border border-[#A78BFA]/30 text-xs font-bold hover:bg-[#7C3AED]/20 transition-colors disabled:opacity-50"
            >
              <Sparkles size={14} /> {generatingLlm ? 'Generating...' : 'Auto-Generate Content'}
            </button>
          </div>
        </div>

        <textarea 
          value={llmTxt}
          onChange={e => setLlmTxt(e.target.value)}
          className="w-full h-96 bg-zinc-900 dark:bg-black border border-zinc-800 rounded-2xl p-5 font-mono text-sm text-[#A78BFA] outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] resize-none mb-6 custom-scrollbar shadow-inner"
          placeholder="# Quest For Tech / Digitory.io - LLM Information File"
        />

        <div className="flex items-center justify-between">
          <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
            Markdown format. Accessible at <code className="text-[#A78BFA]">/llm.txt</code>.
          </p>

          <button 
            onClick={saveLlm}
            disabled={savingLlm}
            className="flex items-center justify-center gap-2 bg-[#7C3AED] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#6D28D9] transition-all duration-200 shadow-[0_4px_14px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.4)] disabled:opacity-50 transform hover:-translate-y-0.5"
          >
            <Save size={18} /> {savingLlm ? 'Saving...' : 'Save llm.txt'}
          </button>
        </div>
      </section>
    </div>
  );
}

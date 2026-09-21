'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FooterPage from '@/components/Footer';
import { pagesService } from '@/services/pages.service';

export default function PrivacyPage() {
  const [title, setTitle] = useState('Privacy Policy');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pagesService.getPageBySlug('privacy')
      .then((page) => {
        if (page?.content) {
          if (page.title) setTitle(page.title);
          setContent(page.content);
        }
      })
      .catch((err) => {
        console.error('Failed to load privacy page:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0e] transition-colors duration-300">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-[850] tracking-tight text-[#111111] dark:text-white mb-6">
          Privacy <span className="text-[#FF4F18]">Policy</span>
        </h1>
        <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mb-10">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {loading ? (
          <div className="py-20 text-center text-zinc-400">
            <div className="w-8 h-8 border-2 border-[#FF4F18] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading privacy policy...
          </div>
        ) : (
          <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal text-sm md:text-base whitespace-pre-line">
            {content}
          </div>
        )}
      </main>
      <FooterPage />
    </div>
  );
}

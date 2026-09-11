'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { industriesService, IndustryItem } from '@/services/industries.service';
import { industriesPageService, IndustriesPageData, DEFAULT_INDUSTRIES_PAGE_DATA } from '@/services/industriesPage.service';
import { ChevronDown, ArrowRight, CheckCircle2, Building2, Stethoscope, ShoppingBag, Briefcase, Factory, Hotel } from 'lucide-react';

const ICON_MAP: Record<string, string> = {
  manufacturing: '🏭',
  healthcare: '🩺',
  'e-commerce': '🛒',
  'professional-services': '💼',
  b2b: '🏢',
  hospitality: '🏨'
};

export default function IndustriesPage() {
  const [pageData, setPageData] = useState<IndustriesPageData>(DEFAULT_INDUSTRIES_PAGE_DATA);
  const [industries, setIndustries] = useState<IndustryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [pData, indList] = await Promise.all([
          industriesPageService.getPageData(),
          industriesService.getIndustries()
        ]);
        if (pData) setPageData(pData);
        if (indList && indList.length > 0) setIndustries(indList);
      } catch (err) {
        console.error('Failed to load industries page data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#08080A] text-slate-900 dark:text-[#E2E8F0] flex flex-col justify-between transition-colors duration-300 font-sans selection:bg-[#7C3AED] selection:text-white">
      <div>
        <Header />
        
        {/* 1. HERO SECTION */}
        <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-28 overflow-hidden border-b border-slate-100 dark:border-white/5">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-500/10 dark:bg-purple-900/15 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block w-6 h-[2px] bg-[#7C3AED]" />
                <span
                  className="text-xs font-bold uppercase tracking-[0.3em] text-[#7C3AED] dark:text-[#C1B6FF]"
                  style={{ fontFamily: 'Barlow, sans-serif' }}
                >
                  {pageData.hero.eyebrow}
                </span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight text-slate-950 dark:text-white mb-6"
                style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
              >
                {pageData.hero.title}
              </h1>

              <div className="space-y-4 mb-10 text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {pageData.hero.desc.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <a
                href={pageData.hero.ctaHref || "#industries-grid"}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                <span>{pageData.hero.ctaText}</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* 2. INDUSTRIES GRID SECTION */}
        <section id="industries-grid" className="py-20 lg:py-28 bg-slate-50/70 dark:bg-[#0C0C0F] border-b border-slate-100 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl mb-16">
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 dark:text-white mb-4"
                style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
              >
                {pageData.header.title}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {pageData.header.desc}
              </p>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((ind, i) => (
                <div
                  key={ind.id || i}
                  className="group relative p-8 rounded-3xl bg-white dark:bg-[#121216] border border-slate-200/80 dark:border-white/10 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {ind.icon || ICON_MAP[ind.slug] || '🏢'}
                    </div>

                    <h3
                      className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#7C3AED] dark:group-hover:text-purple-400 transition-colors"
                      style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
                    >
                      {ind.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                      {ind.description}
                    </p>
                  </div>

                  <Link
                    href={ind.ctaHref || `/industries/${ind.slug}`}
                    className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#7C3AED] dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors pt-4 border-t border-slate-100 dark:border-white/5"
                    style={{ fontFamily: 'Barlow, sans-serif' }}
                  >
                    <span>{ind.ctaText || `Explore ${ind.title}`}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. STRATEGY COMPARISON & 5-STEP APPROACH */}
        <section className="py-20 lg:py-28 bg-white dark:bg-[#08080A] border-b border-slate-100 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            
            {/* Strategy Philosophy */}
            <div className="max-w-4xl mb-24">
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 dark:text-white mb-8"
                style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
              >
                {pageData.strategy.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {pageData.strategy.paragraphs.map((para, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-[#121216] border border-slate-200/60 dark:border-white/5">
                    <p>{para}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5-Step Process */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block w-6 h-[2px] bg-[#7C3AED]" />
                <span
                  className="text-xs font-bold uppercase tracking-[0.3em] text-[#7C3AED] dark:text-[#C1B6FF]"
                  style={{ fontFamily: 'Barlow, sans-serif' }}
                >
                  {pageData.process.badge}
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 dark:text-white mb-12"
                style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
              >
                {pageData.process.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
                {pageData.process.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-50 dark:bg-[#121216] border border-slate-200/80 dark:border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-extrabold text-[#7C3AED] dark:text-purple-400 mb-3 tracking-wider">
                        0{idx + 1}
                      </div>
                      <h3
                        className="text-xl font-bold text-slate-900 dark:text-white mb-3"
                        style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
                      >
                        {step.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 4. SOLUTIONS OVERVIEW */}
        <section className="py-20 lg:py-28 bg-slate-50/70 dark:bg-[#0C0C0F] border-b border-slate-100 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
              <div className="max-w-3xl">
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 dark:text-white mb-4"
                  style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
                >
                  {pageData.solutions.title}
                </h2>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pageData.solutions.desc}
                </p>
              </div>

              <Link
                href={pageData.solutions.ctaHref}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-purple-950 dark:hover:bg-purple-100 transition-all shrink-0 self-start lg:self-auto"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                <span>{pageData.solutions.ctaText}</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageData.solutions.items.map((sol, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white dark:bg-[#121216] border border-slate-200/80 dark:border-white/10 hover:border-purple-500/50 transition-all duration-300 space-y-3"
                >
                  <h3
                    className="text-xl font-bold text-slate-900 dark:text-white"
                    style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
                  >
                    {sol.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {sol.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CASE STUDIES / STATS */}
        <section className="py-20 lg:py-28 bg-white dark:bg-[#08080A] border-b border-slate-100 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="p-10 lg:p-16 rounded-3xl bg-gradient-to-br from-purple-900/90 via-indigo-950 to-slate-950 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl space-y-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider">
                  {pageData.caseStudy.badge}
                </span>

                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-white"
                  style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
                >
                  {pageData.caseStudy.title}
                </h2>

                <p className="text-lg text-purple-100/90 leading-relaxed">
                  {pageData.caseStudy.desc}
                </p>

                <div className="pt-4">
                  <Link
                    href={pageData.caseStudy.ctaHref}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-slate-950 hover:bg-purple-100 font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl"
                    style={{ fontFamily: 'Barlow, sans-serif' }}
                  >
                    <span>{pageData.caseStudy.ctaText}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FREQUENTLY ASKED QUESTIONS */}
        <section className="py-20 lg:py-28 bg-slate-50/70 dark:bg-[#0C0C0F] border-b border-slate-100 dark:border-white/5">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 dark:text-white"
                style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
              >
                {pageData.faqs.title}
              </h2>
            </div>

            <div className="space-y-4">
              {pageData.faqs.list.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white dark:bg-[#121216] border border-slate-200/80 dark:border-white/10 overflow-hidden transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                    >
                      <h3
                        className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white"
                        style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
                      >
                        {faq.question}
                      </h3>
                      <div className={`w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400' : 'text-slate-500'}`}>
                        <ChevronDown size={18} />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-7 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. BOTTOM CTA BANNER */}
        <section className="py-20 lg:py-28 bg-white dark:bg-[#08080A]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="p-10 sm:p-14 lg:p-16 rounded-3xl bg-slate-900 dark:bg-[#121216] border border-slate-800 dark:border-white/10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
              <div className="max-w-2xl">
                <h2
                  className="text-3xl sm:text-4xl font-normal leading-tight tracking-tight text-white mb-3"
                  style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
                >
                  {pageData.ctaBanner.title}
                </h2>
                <p className="text-base sm:text-lg text-slate-300">
                  {pageData.ctaBanner.desc}
                </p>
              </div>

              <Link
                href={pageData.ctaBanner.ctaHref}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shrink-0 shadow-lg shadow-purple-500/30"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                <span>{pageData.ctaBanner.ctaText}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}

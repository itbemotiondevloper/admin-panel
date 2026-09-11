'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { industriesService, IndustryItem } from '@/services/industries.service';
import { ArrowRight, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

export default function IndustryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [industry, setIndustry] = useState<IndustryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    async function loadIndustry() {
      try {
        const data = await industriesService.getIndustryBySlug(slug);
        setIndustry(data);
      } catch (err) {
        console.error('Failed to load industry detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadIndustry();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#08080A] text-slate-900 dark:text-[#E2E8F0] flex flex-col justify-between">
        <Header />
        <div className="py-36 text-center text-slate-400 font-semibold animate-pulse">
          Loading Industry Details...
        </div>
        <Footer />
      </div>
    );
  }

  if (!industry) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#08080A] text-slate-900 dark:text-[#E2E8F0] flex flex-col justify-between">
        <Header />
        <div className="py-36 text-center max-w-xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-4">Industry Not Found</h1>
          <p className="text-slate-500 mb-8">The industry page you are looking for does not exist or may have been removed.</p>
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7C3AED] text-white font-bold text-xs uppercase"
          >
            ← Back to Industries
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#08080A] text-slate-900 dark:text-[#E2E8F0] flex flex-col justify-between transition-colors duration-300 font-sans selection:bg-[#7C3AED] selection:text-white">
      <div>
        <Header />

        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-purple-600">Home</Link>
            <ChevronRight size={12} />
            <Link href="/industries" className="hover:text-purple-600">Industries</Link>
            <ChevronRight size={12} />
            <span className="text-purple-600 dark:text-purple-400">{industry.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-8 pb-20 lg:pb-28 border-b border-slate-100 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center text-4xl mb-6 shadow-lg shadow-purple-500/10">
                {industry.icon || '🏢'}
              </div>

              <span className="inline-block px-3 py-1 rounded-md bg-purple-100 dark:bg-purple-950/60 text-[#7C3AED] dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
                {industry.title} Solutions
              </span>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-slate-950 dark:text-white mb-6"
                style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
              >
                {industry.heroTitle || `${industry.title} Digital Solutions`}
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                {industry.heroSubtitle || industry.description}
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-500/25"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                <span>Discuss Your {industry.title} Strategy</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Industry Challenges & Overview */}
        <section className="py-20 lg:py-28 bg-slate-50/70 dark:bg-[#0C0C0F] border-b border-slate-100 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              <div className="lg:col-span-7 space-y-6">
                <h2
                  className="text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 dark:text-white"
                  style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
                >
                  Tailored Digital Strategy for {industry.title}
                </h2>
                
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  {industry.description}
                </p>

                {industry.content && (
                  <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                    <p>{industry.content}</p>
                  </div>
                )}
              </div>

              {/* Challenges Card */}
              {industry.challenges && industry.challenges.length > 0 && (
                <div className="lg:col-span-5 p-8 rounded-3xl bg-white dark:bg-[#121216] border border-slate-200/80 dark:border-white/10 shadow-xl space-y-6">
                  <h3
                    className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-4"
                    style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
                  >
                    Key Industry Challenges We Solve
                  </h3>

                  <ul className="space-y-4">
                    {industry.challenges.map((challenge, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 size={18} className="text-[#7C3AED] dark:text-purple-400 shrink-0 mt-0.5" />
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 lg:py-28 bg-white dark:bg-[#08080A]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="p-10 sm:p-14 lg:p-16 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
              <div>
                <h2
                  className="text-3xl sm:text-4xl font-normal leading-tight tracking-tight text-white mb-3"
                  style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
                >
                  Ready to Elevate Your {industry.title} Digital Presence?
                </h2>
                <p className="text-base sm:text-lg text-purple-200">
                  Connect with our industry specialists to design a customized digital growth strategy.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-slate-950 hover:bg-purple-100 font-bold text-xs uppercase tracking-wider transition-all shrink-0"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                <span>Talk to Our Team</span>
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

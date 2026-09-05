'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const INDUSTRIES = [
  {
    title: 'B2B & Enterprise Technology',
    description: 'Scalable digital marketing, technical SEO, and conversion architectures for SaaS and B2B tech platforms.',
    icon: '⚡',
  },
  {
    title: 'E-Commerce & D2C Brands',
    description: 'High-ROAS performance marketing campaigns, store optimisation, and retention strategies that scale revenue.',
    icon: '🛍️',
  },
  {
    title: 'Professional & Financial Services',
    description: 'Authority-building content strategy, organic search dominance, and trust-focused digital platforms.',
    icon: '🏛️',
  },
  {
    title: 'Healthcare & Wellness',
    description: 'HIPAA-compliant, high-intent local and national SEO, patient acquisition, and digital brand experiences.',
    icon: '🩺',
  },
  {
    title: 'Real Estate & Infrastructure',
    description: 'Targeted lead generation, interactive web experiences, and multi-channel ad campaigns for modern developments.',
    icon: '🏢',
  },
  {
    title: 'Consumer Products & Retail',
    description: 'Omnichannel brand positioning, social distribution, and performance marketing built for rapid market adoption.',
    icon: '📦',
  },
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-[#D6DCDC] flex flex-col justify-between transition-colors duration-300">
      <div>
        <Header />
        <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-5 h-px bg-[#7C3AED] dark:bg-[#D6DCDC]/40" />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7C3AED] dark:text-[#D6DCDC]/60"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                Industries We Serve
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-slate-900 dark:text-white mb-6"
              style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
            >
              Tailored Strategies for High-Growth Sectors.
            </h1>
            <p
              className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
              style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
            >
              We combine deep vertical domain expertise with modern technology and performance marketing to solve specific industry challenges.
            </p>
          </div>

          {/* Industry Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRIES.map((ind, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-slate-50 dark:bg-[#0B0B0B] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-xl space-y-4"
              >
                <div className="text-3xl mb-2">{ind.icon}</div>
                <h3
                  className="text-xl font-semibold text-slate-900 dark:text-white"
                  style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
                >
                  {ind.title}
                </h3>
                <p
                  className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
                  style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
                >
                  {ind.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 p-10 rounded-3xl bg-gradient-to-r from-purple-900 to-indigo-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <h3 className="text-2xl font-bold mb-2">Don't See Your Industry Listed?</h3>
              <p className="text-sm text-purple-200">Our core methodology adapts to any high-intent market. Let's discuss your custom strategy.</p>
            </div>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-white text-slate-950 hover:bg-purple-100 font-bold text-xs uppercase tracking-wider transition-all shrink-0"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              SCHEDULE A CALL →
            </Link>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

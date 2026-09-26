'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScrollProvider from '@/components/solutions/v2/SmoothScrollProvider';
import CustomCursor from '@/components/solutions/v2/CustomCursor';
import IndustryHero from '@/components/industries/IndustryHero';
import IndustryGrid from '@/components/industries/IndustryGrid';
import IndustryStats from '@/components/industries/IndustryStats';
import IndustryCaseStudies from '@/components/industries/IndustryCaseStudies';
import IndustryFAQSection from '@/components/industries/IndustryFAQSection';
import IndustryTestimonial from '@/components/industries/IndustryTestimonial';
import IndustryFinalCTA from '@/components/industries/IndustryFinalCTA';

export default function IndustriesPage() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />

      <Header />

      <main id="main-content" className="qft-editorial-light min-h-screen bg-white text-[#111111] font-sans antialiased selection:bg-[#111111] selection:text-white">
        {/* 1. HERO */}
        <IndustryHero />

        {/* 2. INDUSTRY HORIZONTAL RAIL */}
        <IndustryGrid />

        {/* 3. STATS */}
        <IndustryStats />

        {/* 4. CASE STUDIES */}
        <IndustryCaseStudies />

        {/* 5. FAQ */}
        <IndustryFAQSection />

        {/* 6. TESTIMONIAL */}
        <IndustryTestimonial />

        {/* 7. FINAL CTA */}
        <IndustryFinalCTA />
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}

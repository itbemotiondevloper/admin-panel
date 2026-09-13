'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IndustryHero from '@/components/industries/IndustryHero';
import IndustryGrid from '@/components/industries/IndustryGrid';
import IndustryStats from '@/components/industries/IndustryStats';
import IndustryCaseStudies from '@/components/industries/IndustryCaseStudies';
import IndustryFAQSection from '@/components/industries/IndustryFAQSection';
import IndustryTestimonial from '@/components/industries/IndustryTestimonial';
import IndustryFinalCTA from '@/components/industries/IndustryFinalCTA';

export default function IndustriesPage() {
  return (
    <main className="qft-editorial-light min-h-screen bg-[#F8F8F5] text-[#111111] font-sans antialiased selection:bg-[#111111] selection:text-white">
      {/* 1. NAVBAR */}
      <Header />

      {/* 2. HERO */}
      <IndustryHero />

      {/* 3. INDUSTRY GRID */}
      <IndustryGrid />

      {/* 4. STATS */}
      <IndustryStats />

      {/* 5. CASE STUDIES */}
      <IndustryCaseStudies />

      {/* 6. FAQ */}
      <IndustryFAQSection />

      {/* 7. TESTIMONIAL */}
      <IndustryTestimonial />

      {/* 8. FINAL CTA */}
      <IndustryFinalCTA />

      {/* 9. FOOTER */}
      <Footer />
    </main>
  );
}

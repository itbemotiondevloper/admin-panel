import React from 'react';
import type { Metadata } from 'next';
import SmoothScrollProvider from '@/components/solutions/v2/SmoothScrollProvider';
import SolutionsNav from '@/components/solutions/v2/SolutionsNav';
import SolutionsHero from '@/components/solutions/v2/SolutionsHero';
import SolutionsRail from '@/components/solutions/v2/SolutionsRail';
import ConnectedSolutions from '@/components/solutions/v2/ConnectedSolutions';
import ApproachTimeline from '@/components/solutions/v2/ApproachTimeline';
import WhyQuest from '@/components/solutions/v2/WhyQuest';
import CaseStudiesShowcase from '@/components/solutions/v2/CaseStudiesShowcase';
import FinalCTA from '@/components/solutions/v2/FinalCTA';
import SolutionsFooter from '@/components/solutions/v2/SolutionsFooter';
import CustomCursor from '@/components/solutions/v2/CustomCursor';

export const metadata: Metadata = {
  title: 'Digital Solutions | Quest For Tech',
  description:
    'Strategy, creativity, technology and data — brought together to help your business grow. Explore Website Development, SEO, Content, Performance Marketing, and Custom Development.',
  openGraph: {
    title: 'Digital Solutions | Quest For Tech',
    description: 'Ideas to Impact. Strategy-led solutions that work together to create real business impact.',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

export default function SolutionsPage() {
  return (
    <SmoothScrollProvider>
      {/* Custom cursor — desktop only, disabled on reduced motion */}
      <CustomCursor />

      {/* Skip to main for accessibility */}
      <a
        href="#solutions"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-[#111] focus:px-4 focus:py-2 focus:rounded focus:outline focus:outline-2 focus:outline-[#4F6BFF]"
      >
        Skip to main content
      </a>

      {/* Minimal navigation */}
      <SolutionsNav />

      <main id="main-content" className="bg-[#F8F8F5]">
        {/* 00 — Hero */}
        <SolutionsHero />

        {/* 01 — Services horizontal rail */}
        <SolutionsRail />

        {/* 02 — Connected ecosystem */}
        <ConnectedSolutions />

        {/* 03 — Our approach */}
        <ApproachTimeline />

        {/* 04 — Why Quest For Tech */}
        <WhyQuest />

        {/* 05 — Case studies */}
        <CaseStudiesShowcase />

        {/* 06 — Final CTA */}
        <FinalCTA />
      </main>

      <SolutionsFooter />
    </SmoothScrollProvider>
  );
}

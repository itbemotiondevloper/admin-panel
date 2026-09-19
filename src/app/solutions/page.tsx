import React from 'react';
import type { Metadata } from 'next';
import SmoothScrollProvider from '@/components/solutions/v2/SmoothScrollProvider';
import Header from '@/components/Header';
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

      {/* Navigation */}
      <Header />

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

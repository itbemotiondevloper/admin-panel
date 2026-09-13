'use client';

import React from 'react';
import SmoothScrollProvider from '@/components/solutions/v2/SmoothScrollProvider';
import SolutionsNav from '@/components/solutions/v2/SolutionsNav';
import CustomCursor from '@/components/solutions/v2/CustomCursor';
import SolutionsFooter from '@/components/solutions/v2/SolutionsFooter';

import { getSolutionDetailData, SolutionDetailData } from './solutionData';
import DetailHero from './DetailHero';
import DetailWhyMatters from './DetailWhyMatters';
import DetailBusinessNeeds from './DetailBusinessNeeds';
import DetailProcessJourney from './DetailProcessJourney';
import DetailWebsiteAnatomy from './DetailWebsiteAnatomy';
import DetailProofResults from './DetailProofResults';
import DetailFAQ from './DetailFAQ';
import DetailFinalCTA from './DetailFinalCTA';

interface SolutionDetailTemplateProps {
  slug?: string;
  overrideData?: Partial<SolutionDetailData>;
}

export default function SolutionDetailTemplate({
  slug = 'website-development',
  overrideData,
}: SolutionDetailTemplateProps) {
  // Load structured data for this solution slug
  const baseData = getSolutionDetailData(slug);
  const data: SolutionDetailData = overrideData
    ? { ...baseData, ...overrideData }
    : baseData;

  return (
    <SmoothScrollProvider>
      {/* Custom Cursor — Desktop only */}
      <CustomCursor />

      {/* Accessibility skip link */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-[#111] focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>

      {/* Solutions Navigation */}
      <SolutionsNav />

      <main id="main-content" className="bg-[#F8F8F5]">
        {/* 01 — HERO SECTION */}
        <DetailHero data={data} />

        {/* 02 — WHY IT MATTERS */}
        <DetailWhyMatters data={data} />

        {/* 03 — BUILT FOR DIFFERENT BUSINESS NEEDS (Interactive Showcase Stage) */}
        <DetailBusinessNeeds data={data} />

        {/* 04 — PROCESS / BUILD JOURNEY (Spatial Staircase Pathway) */}
        <DetailProcessJourney data={data} />

        {/* 05 — WHAT GOES INTO A QFT WEBSITE (Website Anatomy Breakdown) */}
        <DetailWebsiteAnatomy data={data} />

        {/* 06 — PROOF & RESULTS (Asymmetrical Showcase) */}
        <DetailProofResults data={data} />

        {/* 07 — FAQ (Minimal Accordion) */}
        <DetailFAQ data={data} />

        {/* 08 — FINAL CTA */}
        <DetailFinalCTA data={data} />
      </main>

      {/* Solutions Footer */}
      <SolutionsFooter />
    </SmoothScrollProvider>
  );
}

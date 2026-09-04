import React from 'react';
import Header from '@/components/Header';
import FooterPage from '@/components/Footer';
import ScrollFocusWrapper from '@/components/ScrollFocusWrapper';
import { generateSeoMetadata } from "@/lib/seo";

import SolutionsHeroSection from '@/components/solutions/SolutionsHeroSection';
import SolutionsListSection from '@/components/solutions/SolutionsListSection';
import ConnectedEcosystemSection from '@/components/solutions/ConnectedEcosystemSection';
import OurApproachSection from '@/components/solutions/OurApproachSection';
import WhyQuestForTechSection from '@/components/solutions/WhyQuestForTechSection';
import CaseStudiesSection from '@/components/solutions/CaseStudiesSection';
import SolutionsFinalCtaSection from '@/components/solutions/SolutionsFinalCtaSection';

export async function generateMetadata() {
  return await generateSeoMetadata('Page', 'solutions', {
    title: 'Digital Solutions | Quest For Tech',
    description: 'Explore digital solutions built around your business: Website Development, SEO, Content, Performance Marketing, and Custom Development.',
  });
}

export const dynamic = 'force-dynamic';

export default async function SolutionsPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col font-sans">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col">
        {/* 01. Hero */}
        <SolutionsHeroSection />

        {/* 02. Our Solutions */}
        <SolutionsListSection />

        {/* 03. Solutions That Work Together */}
        <ConnectedEcosystemSection />

        {/* 04. Our Approach */}
        <OurApproachSection />

        {/* 05. Why Quest For Tech */}
        <WhyQuestForTechSection />

        {/* 06. Case Studies */}
        <CaseStudiesSection />

        {/* 07. Final CTA */}
        <SolutionsFinalCtaSection />
      </main>

      {/* Footer */}
      <FooterPage />
    </div>
  );
}

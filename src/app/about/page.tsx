import React from 'react';
import Header from '../../components/Header';
import FooterPage from '../../components/Footer';
import ScrollFocusWrapper from '../../components/ScrollFocusWrapper';
import { generateSeoMetadata } from "@/lib/seo";

import AboutHero from '../../components/about/AboutHero';
import ProblemsSection from '../../components/about/ProblemsSection';
import StorySection from '../../components/about/StorySection';
import LiveQueueSection from '../../components/about/LiveQueueSection';
import BeliefsSection from '../../components/about/BeliefsSection';
import TeamSection from '../../components/about/TeamSection';
import MissionCta from '../../components/about/MissionCta';

export async function generateMetadata() {
  return await generateSeoMetadata('Page', 'about', {
    title: 'About Us | Digitory',
    description: 'Learn about our journey, beliefs, and our mission.',
  });
}

export default function AboutPage() {

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0e] transition-colors duration-300 flex flex-col font-sans">
      {/* Navigation Header */}
      <Header />

      {/* Page Content */}
      <main className="flex flex-col flex-1">
        <ScrollFocusWrapper>
          <AboutHero />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <ProblemsSection />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <StorySection />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <LiveQueueSection />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <BeliefsSection />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <TeamSection />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <MissionCta />
        </ScrollFocusWrapper>
      </main>

      {/* Page Footer */}
      <FooterPage />
    </div>
  );
}

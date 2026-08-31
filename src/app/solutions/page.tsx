import React from 'react';
import Header from '../../components/Header';
import FooterPage from '../../components/Footer';
import ScrollFocusWrapper from '../../components/ScrollFocusWrapper';
import { generateSeoMetadata } from "@/lib/seo";
import { solutionsPageService } from "@/services/solutionsPage.service";

export async function generateMetadata() {
  return await generateSeoMetadata('Page', 'solutions', {
    title: 'Solutions | Digitory',
    description: 'Explore our restaurant operating system solutions.',
  });
}

import RestaurantOSHero from '../../components/solutions/RestaurantOSHero';
import RadialCommandCenter from '../../components/solutions/RadialCommandCenter';
import SolutionsStats from '../../components/solutions/SolutionsStats';
import Capabilities from '../../components/solutions/Capabilities';
import ChainControlDeck from '../../components/solutions/ChainControlDeck';
import RestaurantTypes from '../../components/solutions/RestaurantTypes';
import RoiCalculator from '../../components/solutions/RoiCalculator';
import ToolIntegrations from '../../components/solutions/ToolIntegrations';
import SolutionsCta from '../../components/solutions/SolutionsCta';
import InsightsPage from '../../components/home/Insights';

export const dynamic = 'force-dynamic';

export default async function SolutionsPage() {
  const pageData = await solutionsPageService.getPageData(true);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0e] transition-colors duration-300 flex flex-col font-sans">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col">
        {/* 1. Hero */}
        <ScrollFocusWrapper>
          <RestaurantOSHero data={pageData.hero} />
        </ScrollFocusWrapper>

        {/* 2. Everything your restro needs in one place */}
        <ScrollFocusWrapper>
          <RadialCommandCenter data={pageData.commandCenter} />
        </ScrollFocusWrapper>

        {/* 3. Counter */}
        <ScrollFocusWrapper>
          <SolutionsStats stats={pageData.stats} />
        </ScrollFocusWrapper>

        {/* 4. Service list (solution detail link section) */}
        <ScrollFocusWrapper>
          <Capabilities />
        </ScrollFocusWrapper>

        {/* 5. One dashboard, every location in sync */}
        <ScrollFocusWrapper>
          <ChainControlDeck data={pageData.controlDeck} />
        </ScrollFocusWrapper>

        {/* 6. Connects with your fav app */}
        <ScrollFocusWrapper>
          <ToolIntegrations data={pageData.integrations} />
        </ScrollFocusWrapper>

        {/* 7. See how much you can save */}
        <ScrollFocusWrapper>
          <RoiCalculator data={pageData.calculator} />
        </ScrollFocusWrapper>

        {/* 8. Latest insights */}
        <ScrollFocusWrapper>
          <InsightsPage />
        </ScrollFocusWrapper>
      </main>

      {/* Footer */}
      <FooterPage />
    </div>
  );
}

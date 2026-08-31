import React from 'react';
import Header from '../../components/Header';
import DemoHero from '../../components/request-demo/DemoHero';
import DemoForm from '../../components/request-demo/DemoForm';
import RestaurantOSPage from '../../components/home/RestaurantOS';
import FAQPage from '../../components/home/FAQ';
import FooterPage from '../../components/Footer';
import ScrollFocusWrapper from '../../components/ScrollFocusWrapper';
import SolutionsStats from '../../components/solutions/SolutionsStats';
import ToolIntegrations from '../../components/solutions/ToolIntegrations';
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return await generateSeoMetadata('Page', 'request-demo', {
    title: 'Book a Demo | Digitory',
    description: 'Schedule a customized walkthrough of the Digitory Restaurant Operating System.',
  });
}

export default function RequestDemoPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#08080a] transition-colors duration-300 flex flex-col font-sans relative">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <main className="flex-1 w-full bg-white dark:bg-[#08080a] text-[#111111] dark:text-zinc-100 transition-colors duration-300">
        {/* Hero, Intro Video & Trustship */}
        <DemoHero />

        {/* Demo Booking Form */}
        <DemoForm />

        {/* Counter Section */}
        <ScrollFocusWrapper>
          <SolutionsStats />
        </ScrollFocusWrapper>

        {/* Favorite Apps Section */}
        <ScrollFocusWrapper>
          <ToolIntegrations />
        </ScrollFocusWrapper>

        {/* FAQs */}
        <FAQPage />

        {/* Testimonials (Chaos Stories) */}
        <RestaurantOSPage />

        {/* Footer */}
        <FooterPage />
      </main>
    </div>
  );
}

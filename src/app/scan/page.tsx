import React from 'react';
import Header from '../../components/Header';
import DemoHero from '../../components/request-demo/DemoHero';
import ScanForm from '../../components/scan/ScanForm';
import RestaurantOSPage from '../../components/home/RestaurantOS';
import FAQPage from '../../components/home/FAQ';
import FooterPage from '../../components/Footer';
import ScrollFocusWrapper from '../../components/ScrollFocusWrapper';
import SolutionsStats from '../../components/solutions/SolutionsStats';
import ToolIntegrations from '../../components/solutions/ToolIntegrations';
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return await generateSeoMetadata('Page', 'scan', {
    title: 'Digital Scan & Growth Audit | Quest For Tech',
    description: 'Get a comprehensive audit of your website, performance marketing, SEO, content, and software technology stack.',
  });
}

export default function ScanPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F5] dark:bg-[#08080a] transition-colors duration-300 flex flex-col font-sans relative">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <main className="flex-1 w-full bg-[#F8F8F5] dark:bg-[#08080a] text-[#111111] dark:text-zinc-100 transition-colors duration-300">
        {/* Cinematic Video Hero */}
        <DemoHero />

        {/* Scan Booking Form & Contact Cards */}
        <ScanForm />

        {/* Counter Section */}


        {/* Favorite Apps Section */}




        {/* Footer */}
        <FooterPage />
      </main>
    </div>
  );
}

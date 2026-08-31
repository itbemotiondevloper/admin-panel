import Header from '@/components/Header';
import FooterPage from '@/components/Footer';
import ScrollFocusWrapper from '@/components/ScrollFocusWrapper';

import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Features from '@/components/home/Features';
import RestaurantOS from '@/components/home/RestaurantOS';
import Orders from '@/components/home/Orders';
import TestSection from '@/components/home/TestSection';
import FAQPage from '@/components/home/FAQ';
import Updates from '@/components/home/Updates';
import InsightsPage from '@/components/home/Insights';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0e] transition-colors duration-300 flex flex-col font-sans">
      <Header />
      <main className="flex flex-col flex-grow">
        <ScrollFocusWrapper>
          <Hero />
        </ScrollFocusWrapper>
        <ScrollFocusWrapper>
          <Stats />
        </ScrollFocusWrapper>
        <ScrollFocusWrapper>
          <Features />
        </ScrollFocusWrapper>
        <ScrollFocusWrapper>
          <RestaurantOS />
        </ScrollFocusWrapper>
        <ScrollFocusWrapper>
          <Orders />
        </ScrollFocusWrapper>
        <ScrollFocusWrapper>
          <TestSection />
        </ScrollFocusWrapper>
        <ScrollFocusWrapper>
          <FAQPage />
        </ScrollFocusWrapper>
        <ScrollFocusWrapper>
          <Updates />
        </ScrollFocusWrapper>
        <ScrollFocusWrapper>
          <InsightsPage />
        </ScrollFocusWrapper>
      </main>
      <FooterPage />
    </div>
  );
}


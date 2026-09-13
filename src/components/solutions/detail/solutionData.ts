export interface BusinessTypeItem {
  number: string;
  title: string;
  image: string;
}

export interface ProcessStep {
  number: string;
  title: string;
}

export interface ProofCard {
  client: string;
  headline: string;
  metric: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SolutionDetailData {
  slug: string;
  badge: string;
  heroTitleLines: string[];
  intro: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  trustText: string;
  
  // Section 2: Why It Matters
  whyTitleLines: string[];
  whyBody: string;
  whyOverlayText: string[];
  whyPoints: string[];
  
  // Section 3: Business Needs
  needsTitleLines: string[];
  needsSubhead: string;
  needsItems: BusinessTypeItem[];
  
  // Section 4: Process / Journey
  processTitleLines: string[];
  processSubhead: string;
  processSteps: ProcessStep[];
  
  // Section 5: Anatomy / Breakdown
  anatomyTitleLines: string[];
  anatomySubhead: string;
  anatomyList: string[];
  
  // Section 6: Proof & Results
  proofTitleLines: string[];
  proofSubhead: string;
  proofCards: ProofCard[];
  
  // Section 7: FAQs
  faqs: FAQItem[];
  
  // Section 8: Final CTA
  ctaTitleLines: string[];
  ctaBody: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
}

export const SOLUTIONS_DETAIL_DATA: Record<string, SolutionDetailData> = {
  'website-development': {
    slug: 'website-development',
    badge: '01 — WEBSITE DEVELOPMENT',
    heroTitleLines: ['Websites', 'That Work', 'for Your', 'Business.'],
    intro: 'More than just design and code — we build fast, responsive, user-focused websites that help you attract, engage and grow.',
    primaryCtaText: 'Start Your Website Project',
    secondaryCtaText: 'Watch Video',
    trustText: 'Trusted by growing businesses',
    
    // Why It Matters
    whyTitleLines: ['Your Website Is', 'More Than a', 'Digital Brochure.'],
    whyBody: 'Your website shapes perception, builds trust and creates opportunities. We design and develop websites around your business goals — not just for an online presence, but for real results.',
    whyOverlayText: ['GOOD', 'WEBSITES', 'CREATE', 'OPPORTUNITIES'],
    whyPoints: [
      'Better First Impressions',
      'Higher Engagement',
      'More Business Opportunities',
    ],

    // Business Needs (6 horizontal items matching approved design)
    needsTitleLines: ['Websites for', 'Every Business Need.'],
    needsSubhead: 'Different businesses. Different goals. We build digital experiences tailored to what you need.',
    needsItems: [
      { number: '01', title: 'Corporate Websites', image: '/svc-web.jpg' },
      { number: '02', title: 'B2B Websites', image: '/hero-workspace.jpg' },
      { number: '03', title: 'E-commerce Websites', image: '/cs-photo.jpg' },
      { number: '04', title: 'Service-Based Websites', image: '/svc-content.jpg' },
      { number: '05', title: 'Product & Brand Websites', image: '/hero-digital-ecosystem.jpg' },
      { number: '06', title: 'Custom Experiences', image: '/svc-dev.jpg' },
    ],

    // Process / Journey
    processTitleLines: ['From Insight', 'to Impact.'],
    processSubhead: 'A clear, collaborative process to turn your goals into a website that performs.',
    processSteps: [
      { number: '01', title: 'Understand' },
      { number: '02', title: 'Research' },
      { number: '03', title: 'Structure' },
      { number: '04', title: 'Design' },
      { number: '05', title: 'Develop' },
      { number: '06', title: 'Launch & Improve' },
    ],

    // Strategy, Design & Technology (Section 05)
    anatomyTitleLines: ['Strategy, Design', '& Technology.', 'In Sync.'],
    anatomySubhead: 'A strong website is the result of strategy, creative design and reliable technology working together.',
    anatomyList: [
      'Strategic Structure',
      'UI & Visual Design',
      'UX-Focused Development',
      'Performance & SEO',
      'Scalable Foundation',
    ],

    // Proof & Results
    proofTitleLines: ['Websites', 'That Create', 'Real Growth.'],
    proofSubhead: 'From growing visibility to generating enquiries, our websites help businesses move forward.',
    proofCards: [
      {
        client: 'E-commerce Brand',
        headline: 'From Vision to 3.5x Revenue Growth',
        metric: '3.5x Revenue Growth',
        image: '/cs-photo.jpg',
      },
      {
        client: 'B2B Business',
        headline: 'More Enquiries. Better Conversations.',
        metric: '3.8x Qualified Leads',
        image: '/svc-web.jpg',
      },
    ],

    // FAQs (Exactly 4 questions)
    faqs: [
      {
        question: 'What types of websites does Quest For Tech develop?',
        answer: 'We develop custom corporate websites, B2B lead generation portals, e-commerce storefronts, service business sites, and bespoke web applications built on modern frameworks like Next.js.',
      },
      {
        question: 'Can you redesign an existing website?',
        answer: 'Yes. We frequently audit and rebuild existing legacy websites to modernize brand perception, improve Core Web Vitals, and significantly boost conversion rates.',
      },
      {
        question: 'Will my website be SEO-ready?',
        answer: 'Every website we build is engineered with a technical SEO foundation including structured data, clean markup, fast loading speeds, and search-friendly page architecture.',
      },
      {
        question: 'Do you develop e-commerce websites?',
        answer: 'Yes. We engineer fast, scalable e-commerce platforms with custom storefronts, headless checkout integrations, and automated inventory management.',
      },
    ],

    // Final CTA
    ctaTitleLines: ['Build a Website', 'That Moves You', 'Forward.'],
    ctaBody: 'Your website is an investment in how your business is discovered, understood, trusted, and chosen.',
    ctaPrimaryText: 'Start Your Website Project',
    ctaSecondaryText: 'Talk to Our Team',
  },
};

export function getSolutionDetailData(slug?: string): SolutionDetailData {
  if (slug && SOLUTIONS_DETAIL_DATA[slug]) {
    return SOLUTIONS_DETAIL_DATA[slug];
  }
  return SOLUTIONS_DETAIL_DATA['website-development'];
}

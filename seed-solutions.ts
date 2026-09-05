import * as fs from "fs";
import * as path from "path";

// Parse .env.local manually BEFORE initializing Firebase
try {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach((line) => {
      const parts = line.split("=");
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join("=").trim().replace(/^['"]|['"]$/g, "");
        if (key) {
          process.env[key] = val;
        }
      }
    });
  }
} catch (err) {
  console.warn("Could not load .env.local manually", err);
}

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy-key-for-build",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

const DEFAULT_SOLUTIONS_PAGE_DATA = {
  hero: {
    eyebrow: "Digital Solutions & Services",
    title: "The Right Strategy. The Right Technology. The Right Execution.",
    desc: "From building your digital foundation to improving search visibility, generating qualified leads, and engineering custom technology — Quest For Tech brings strategy, creativity, marketing, and data together to create compounding growth.",
    ctaPrimaryText: "LET'S TALK →",
    ctaPrimaryHref: "/contact",
    ctaSecondaryText: "EXPLORE SOLUTIONS ↓",
    ctaSecondaryHref: "#our-solutions"
  },
  connected: {
    badge: "Connected Solutions",
    title: "Digital Services Designed to Work Better Together",
    desc: "Single-service tactics create fragmented results. We build connected digital ecosystems where each solution reinforces the others.",
    ctaText: "LET'S BUILD YOUR STRATEGY →",
    ctaHref: "/contact",
    scenarios: [
      {
        id: "visibility",
        title: "Need More Visibility?",
        capabilities: ["SEO", "Content", "Website Development"],
        description: "Align your website design, content authority, and search engine optimization to establish search dominance and capture high-intent organic traffic."
      },
      {
        id: "leads",
        title: "Need More Qualified Leads?",
        capabilities: ["SEO", "Content", "Performance Marketing", "Website Development"],
        description: "Combine strategic search positioning, targeted paid campaigns, conversion-focused landing pages, and compelling messaging to drive qualified leads."
      },
      {
        id: "launch",
        title: "Launching Something New?",
        capabilities: ["Website Development", "Content", "SEO", "Performance Marketing"],
        description: "Build market presence rapidly with a high-performance web experience, launch content strategy, organic search groundwork, and targeted ad distribution."
      },
      {
        id: "custom",
        title: "Need a Custom Digital Solution?",
        capabilities: ["Custom Development", "AI & Technology Solutions"],
        description: "Engineer bespoke software applications, API integrations, workflow automation, and intelligent AI models built around your exact business requirements."
      }
    ]
  },
  approach: {
    badge: "Our Approach",
    title: "We Don't Start With a Package. We Start With a Problem.",
    desc: "Every business has different goals, audiences, challenges, and opportunities. That's why we first understand what you need, then determine the right solution.",
    steps: [
      {
        number: "01",
        name: "Understand",
        description: "We start by deeply understanding your business, your audience, your goals, and the challenges standing between where you are and where you want to be.",
        accent: "#7C3AED"
      },
      {
        number: "02",
        name: "Research",
        description: "We research your market, your competitors, your customers, and your data — looking for the insights and opportunities that will inform a smarter strategy.",
        accent: "#6366F1"
      },
      {
        number: "03",
        name: "Strategise",
        description: "We build a clear direction built around your priorities — not a generic template. Strategy is the foundation everything else is built on.",
        accent: "#8B5CF6"
      },
      {
        number: "04",
        name: "Execute",
        description: "We apply the right combination of marketing, creativity, content, and technology — working with precision and purpose to turn strategy into reality.",
        accent: "#4F46E5"
      },
      {
        number: "05",
        name: "Measure",
        description: "We track the metrics that matter to your business, not just vanity numbers. Good measurement makes everything downstream more accountable.",
        accent: "#7C3AED"
      },
      {
        number: "06",
        name: "Improve",
        description: "We learn from the results and look for better ways forward. Continuous improvement is how we create compounding value over time.",
        accent: "#6366F1"
      }
    ]
  },
  whyUs: {
    badge: "Why Quest For Tech",
    title: "Built around outcomes, not outputs.",
    desc: "We don't measure success by deliverable checklists. We measure success by the impact we create for your business.",
    pillars: [
      {
        title: "Business-First Thinking",
        description: "We start with your goals, not a predefined package.",
        accent: "#7C3AED"
      },
      {
        title: "Technology & AI Know-How",
        description: "We use modern technology and AI where they can genuinely improve the work.",
        accent: "#6366F1"
      },
      {
        title: "Data-Backed Decisions",
        description: "We use data to understand performance and make better decisions.",
        accent: "#8B5CF6"
      },
      {
        title: "ROI-Driven Thinking",
        description: "We focus on outcomes that create real business value, not vanity metrics.",
        accent: "#4F46E5"
      },
      {
        title: "Continuous Improvement",
        description: "We keep learning, testing, and looking for better ways forward.",
        accent: "#7C3AED"
      }
    ]
  }
};

// Simple representation of Solutions static data corresponding to Quest For Tech digital marketing solutions
const solutionsToSeed = [
  {
    id: "website-development",
    slug: "website-development",
    number: "01",
    shortLabel: "Website Dev",
    category: "Digital Solutions",
    title: "Website Development",
    headline: "Build a digital foundation that works for your business.",
    subtitle: "Digital Foundations Built to Perform",
    description: "We design and develop fast, responsive, user-focused websites built around your brand, audience, and business goals.",
    ctaText: "Explore Website Development",
    href: "/solutions/website-development",
    badge: "FOUNDATION & UX",
    accent: "#D6DCDC",
    order: 0,
    metricLabel: "Lighthouse Speed",
    metricVal: "99/100",
    whyChoose: [
      { title: "Custom Next.js Stack", desc: "Built with modern Next.js for blazing fast performance and SEO." },
      { title: "Mobile First UX", desc: "Designed to provide flawless user experience on mobile devices." },
      { title: "CMS Integration", desc: "Easy content management for your marketing team." }
    ],
    featuresTitle: "Capabilities",
    features: [
      { title: "Performance Engineering", desc: "Optimized for Core Web Vitals and lightning load times." },
      { title: "Conversion Architecture", desc: "Strategic layout and UX to convert visitors into leads." }
    ],
    businessTypesTitle: "Suitable Industries",
    businessTypesDesc: "Tailored web solutions across sectors.",
    businessTypes: [
      { name: "B2B SaaS & Tech", desc: "High-converting corporate web platforms." },
      { name: "E-Commerce", desc: "Fast, custom storefronts optimized for checkout conversions." }
    ],
    opsTitle: "Digital Foundation",
    opsParagraph: "Full control over your digital web platform.",
    opsHighlights: "99/100 Speed · Zero Lag UX",
    ctaBlock: { title: "Ready to build your digital foundation?", desc: "Talk to our web development team today." },
    layerTitle: "Performance Web Stack Architecture",
    layerDesc: "Modern Jamstack architecture for ultimate speed.",
    metricsTitle: "Web Development Impact",
    metricsItems: [
      { value: "99/100", label: "PageSpeed Score", desc: "Lightning fast page load across desktop & mobile." }
    ],
    faqs: [
      { question: "Will my website be mobile-responsive?", answer: "Yes, all our websites are engineered mobile-first and tested on all device sizes." }
    ]
  },
  {
    id: "seo",
    slug: "seo",
    number: "02",
    shortLabel: "SEO",
    category: "Digital Solutions",
    title: "SEO",
    headline: "Get found by the right audience.",
    subtitle: "Capture High-Intent Organic Demand",
    description: "We build data-backed and ethical SEO strategies to improve search visibility, attract relevant organic traffic, and create long-term growth.",
    ctaText: "Explore SEO",
    href: "/solutions/seo",
    badge: "ORGANIC GROWTH",
    accent: "#A78BFA",
    order: 1,
    metricLabel: "Organic Traffic",
    metricVal: "+142%",
    whyChoose: [
      { title: "Technical Audit", desc: "Deep technical analysis to fix indexing and crawl issues." },
      { title: "Keyword Dominance", desc: "Targeting high-intent search queries that drive sales." },
      { title: "Authority Content", desc: "E-E-A-T content strategy to build search dominance." }
    ],
    featuresTitle: "Capabilities",
    features: [
      { title: "On-Page & Off-Page SEO", desc: "Comprehensive optimization across all search dimensions." },
      { title: "Rank Tracking & Analytics", desc: "Real-time performance dashboards and keyword insights." }
    ],
    businessTypesTitle: "Suitable Industries",
    businessTypesDesc: "Search dominance for high-intent brands.",
    businessTypes: [
      { name: "Professional Services", desc: "Top organic placement for competitive keywords." },
      { name: "Healthcare & Tech", desc: "E-E-A-T compliance and national search visibility." }
    ],
    opsTitle: "Search Dominance",
    opsParagraph: "Turn organic search into your highest-converting growth channel.",
    opsHighlights: "+142% Traffic · #1 Rankings",
    ctaBlock: { title: "Ready to dominate search engine results?", desc: "Schedule an SEO strategy session." },
    layerTitle: "Organic Search Engine Strategy",
    layerDesc: "Multi-layered technical and authority SEO.",
    metricsTitle: "SEO Impact & Visibility",
    metricsItems: [
      { value: "+142%", label: "Organic Traffic Increase", desc: "Compounding organic traffic growth year over year." }
    ],
    faqs: [
      { question: "How long does SEO take to show results?", answer: "Initial technical improvements take effect in 4-6 weeks, with compounding rank growth in 3-6 months." }
    ]
  },
  {
    id: "content",
    slug: "content",
    number: "03",
    shortLabel: "Content",
    category: "Digital Solutions",
    title: "Content",
    headline: "Give your brand something worth saying.",
    subtitle: "Give Your Brand Something Worth Saying",
    description: "From website content and blogs to SEO and marketing content, we create purposeful content that helps your audience understand your business and take action.",
    ctaText: "Explore Content",
    href: "/solutions/content",
    badge: "BRAND STORYTELLING",
    accent: "#E2E8F0",
    order: 2,
    metricLabel: "Engagement Rate",
    metricVal: "3.4×",
    whyChoose: [
      { title: "Copywriting", desc: "High-converting copy crafted for your target audience." },
      { title: "Brand Narrative", desc: "Consistent tone of voice across all customer touchpoints." },
      { title: "Lead Magnets", desc: "Engaging content assets designed to capture leads." }
    ],
    featuresTitle: "Capabilities",
    features: [
      { title: "Editorial Strategy", desc: "Structured content calendars aligned with business goals." },
      { title: "SEO Content Creation", desc: "Articles and guides optimized for search and readers." }
    ],
    businessTypesTitle: "Suitable Formats",
    businessTypesDesc: "Tailored content for all acquisition channels.",
    businessTypes: [
      { name: "Corporate Blogs", desc: "In-depth thought leadership and category authority." },
      { name: "Landing Pages", desc: "Persuasive sales copywriting engineered for conversion." }
    ],
    opsTitle: "Content Studio",
    opsParagraph: "Position your brand as the leading authority in your industry.",
    opsHighlights: "3.4× Engagement · Premium Quality",
    ctaBlock: { title: "Ready for content that converts?", desc: "Connect with our content strategy team." },
    layerTitle: "Editorial Distribution Funnel",
    layerDesc: "Multi-channel content publishing framework.",
    metricsTitle: "Content Engagement Metrics",
    metricsItems: [
      { value: "3.4×", label: "Higher Engagement Rate", desc: "Engaging content that captures reader attention." }
    ],
    faqs: [
      { question: "Do you write industry-specific technical content?", answer: "Yes, our subject matter writers create expert content tailored to your industry." }
    ]
  },
  {
    id: "performance-marketing",
    slug: "performance-marketing",
    number: "04",
    shortLabel: "Performance Marketing",
    category: "Digital Solutions",
    title: "Performance Marketing",
    headline: "Turn your marketing budget into measurable growth.",
    subtitle: "Turn Paid Spend into Measurable Revenue",
    description: "We create, manage, and optimise paid campaigns around clear goals, meaningful KPIs, and better returns.",
    ctaText: "Explore Performance Marketing",
    href: "/solutions/performance-marketing",
    badge: "PAID ACQUISITION",
    accent: "#818CF8",
    order: 3,
    metricLabel: "Average ROAS",
    metricVal: "4.8×",
    whyChoose: [
      { title: "Meta & Google Ads", desc: "Precision targeting across Search, Social, and Display." },
      { title: "Funnel Tracking", desc: "Complete attribution tracking from click to conversion." },
      { title: "CRO Testing", desc: "A/B testing landing pages to maximize conversion rates." }
    ],
    featuresTitle: "Capabilities",
    features: [
      { title: "Multi-Channel Campaigns", desc: "Unified paid ad strategy across all major networks." },
      { title: "ROI Dashboard", desc: "Transparent reporting on spend, CAC, and revenue returns." }
    ],
    businessTypesTitle: "Ad Channels",
    businessTypesDesc: "Paid advertising networks we optimize.",
    businessTypes: [
      { name: "Google Search & Shopping", desc: "Capture high-intent buyers searching for your services." },
      { name: "Meta & LinkedIn Ads", desc: "Targeted audience discovery and lead generation." }
    ],
    opsTitle: "Paid Growth Engine",
    opsParagraph: "Maximize return on ad spend with data-driven paid campaigns.",
    opsHighlights: "4.8× ROAS · -38% CPA",
    ctaBlock: { title: "Ready to scale your paid acquisition?", desc: "Launch your performance campaign." },
    layerTitle: "Paid Attribution Funnel",
    layerDesc: "Full funnel tracking from impression to sale.",
    metricsTitle: "Performance Marketing ROAS",
    metricsItems: [
      { value: "4.8×", label: "Average Return on Ad Spend", desc: "Profitable paid customer acquisition campaigns." }
    ],
    faqs: [
      { question: "What ad budget do we need to start?", answer: "We tailor campaign structures to your scale, with ongoing daily optimization." }
    ]
  },
  {
    id: "custom-development",
    slug: "custom-development",
    number: "05",
    shortLabel: "Custom Dev",
    category: "Digital Solutions",
    title: "Custom Development",
    headline: "Build technology around the way your business works.",
    subtitle: "Technology Tailored to Your Business Model",
    description: "From web applications and integrations to custom digital solutions, we build scalable and secure technology around your specific requirements.",
    ctaText: "Explore Custom Development",
    href: "/solutions/custom-development",
    badge: "ENGINEERING & AI",
    accent: "#C1B6FF",
    order: 4,
    metricLabel: "Uptime SLA",
    metricVal: "99.99%",
    whyChoose: [
      { title: "Custom APIs", desc: "Bespoke backend APIs and third-party integrations." },
      { title: "Workflow Automation", desc: "Streamline operations with custom software tools." },
      { title: "Cloud Security", desc: "Enterprise-grade infrastructure built for scalability." }
    ],
    featuresTitle: "Capabilities",
    features: [
      { title: "Web Applications", desc: "Full-stack custom web app development." },
      { title: "AI & ML Integration", desc: "Intelligent automation models for business workflows." }
    ],
    businessTypesTitle: "Technical Solutions",
    businessTypesDesc: "Custom software tailored to your requirements.",
    businessTypes: [
      { name: "Web Portals & Dashboards", desc: "Bespoke internal tools and customer portals." },
      { name: "API & Data Connectors", desc: "Seamless integration between your core business tools." }
    ],
    opsTitle: "Custom Engineering",
    opsParagraph: "Bespoke technology engineered for your specific workflows.",
    opsHighlights: "99.99% Uptime · Enterprise Security",
    ctaBlock: { title: "Ready for custom technology?", desc: "Schedule a technical consultation with our lead architect." },
    layerTitle: "Microservices & Cloud Topology",
    layerDesc: "Scalable cloud architecture with automated deployments.",
    metricsTitle: "Engineering SLA & Performance",
    metricsItems: [
      { value: "99.99%", label: "System Uptime SLA", desc: "High-availability cloud hosting and fault tolerance." }
    ],
    faqs: [
      { question: "Do you provide ongoing maintenance for custom software?", answer: "Yes, we offer ongoing SLA maintenance, security updates, and feature enhancements." }
    ]
  }
];

async function seed() {
  console.log("Starting Solutions bootstrap seeding...");
  
  const auth = getAuth(app);
  await signInWithEmailAndPassword(auth, "admin@digitory.io", "adminPassword123");
  console.log("Authenticated as Super Administrator successfully.");

  // Clean up old non-Quest-For-Tech solutions in Firestore
  const validIds = new Set(solutionsToSeed.map((s) => s.id));
  const snap = await getDocs(collection(db, "solutions"));
  for (const docSnap of snap.docs) {
    if (!validIds.has(docSnap.id)) {
      console.log(`Deleting legacy test solution document: ${docSnap.id}`);
      await deleteDoc(doc(db, "solutions", docSnap.id));
    }
  }

  for (let idx = 0; idx < solutionsToSeed.length; idx++) {
    const item = solutionsToSeed[idx];
    const docRef = doc(db, "solutions", item.id);
    
    const rawPayload = {
      ...item,
      order: idx,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Strip undefined properties
    const payload = JSON.parse(JSON.stringify(rawPayload));
    
    await setDoc(docRef, payload);
    console.log(`Successfully seeded Solution: ${item.id} (Order: ${idx})`);
  }

  // Seed Solutions Landing Page content in settings/solutionsPage
  const solutionsPageRef = doc(db, "settings", "solutionsPage");
  await setDoc(solutionsPageRef, JSON.parse(JSON.stringify(DEFAULT_SOLUTIONS_PAGE_DATA)), { merge: true });
  console.log("Successfully seeded Solutions Landing Page contents into settings/solutionsPage!");
  
  console.log("Bootstrap seeding completed successfully!");
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});

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

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

const DEFAULT_INDUSTRIES_PAGE_DATA = {
  hero: {
    eyebrow: "INDUSTRIES",
    title: "Digital Solutions Built Around Your Industry",
    desc: "Every business operates differently. Your customers, buying journey, challenges, and opportunities are unique to your industry.\nAt Quest For Tech, we understand the context behind your business before building the digital strategy, experiences, and technology around it.",
    ctaText: "Explore Our Industries",
    ctaHref: "#industries-grid"
  },
  header: {
    title: "Industries We Work With",
    desc: "We work with businesses across industries to build stronger digital presence, improve visibility, create better customer experiences, and drive measurable business outcomes."
  },
  strategy: {
    title: "One Digital Strategy Doesn't Fit Every Business",
    paragraphs: [
      "The way a manufacturer reaches a buyer isn't the same as how a patient finds a healthcare provider or how a customer discovers a product online.",
      "Your industry influences how people search, what they need to know, what builds trust, and what ultimately drives them to take action.",
      "That's why we don't start with a template.",
      "We start by understanding your industry, your audience, your business goals, and the digital challenges that matter to you."
    ]
  },
  process: {
    badge: "OUR APPROACH",
    title: "Different Industry. Different Digital Approach.",
    steps: [
      {
        name: "Understand",
        description: "We learn how your business works, who you serve, and what makes your industry different."
      },
      {
        name: "Identify",
        description: "We uncover the digital challenges, gaps, and opportunities that can have the greatest impact on your business."
      },
      {
        name: "Strategise",
        description: "We determine the right combination of website, SEO, content, performance marketing, and technology for your requirements."
      },
      {
        name: "Execute",
        description: "We turn the strategy into digital experiences and solutions designed around your business and audience."
      },
      {
        name: "Measure & Improve",
        description: "We use data, feedback, and performance insights to understand what is working and identify opportunities to improve."
      }
    ]
  },
  solutions: {
    title: "From Industry Challenges to Digital Solutions",
    desc: "Whatever your industry, our solutions can work independently or come together to address different stages of your digital journey.",
    ctaText: "Explore Our Solutions",
    ctaHref: "/solutions",
    items: [
      {
        title: "Website Development",
        description: "Build a digital foundation that communicates your business clearly and creates better experiences for your audience."
      },
      {
        title: "SEO",
        description: "Improve your visibility and help the right people discover your business when they are actively searching."
      },
      {
        title: "Content",
        description: "Communicate your expertise, products, services, and value through content built around your audience and their intent."
      },
      {
        title: "Performance Marketing",
        description: "Reach relevant audiences through measurable campaigns designed around clear business objectives."
      },
      {
        title: "Custom Development",
        description: "Build technology around the way your business works — from custom web applications to integrations and workflow solutions."
      }
    ]
  },
  caseStudy: {
    badge: "100+ Websites Created",
    title: "Digital Experiences Built for Different Business Needs",
    desc: "Different industries come with different challenges. Our work reflects how digital strategy, technology, and execution can be adapted to the business behind the project.",
    ctaText: "View Our Case Studies",
    ctaHref: "/case-studies"
  },
  faqs: {
    title: "Frequently Asked Questions",
    list: [
      {
        question: "Which industries does Quest For Tech work with?",
        answer: "We work with businesses across multiple industries, including manufacturing, healthcare, e-commerce, professional services, B2B businesses, hospitality, and other business categories."
      },
      {
        question: "Do you work with B2B and manufacturing businesses?",
        answer: "Yes. We work with B2B and manufacturing businesses to strengthen their digital presence, improve discoverability, communicate their offerings, and support business development."
      },
      {
        question: "Do you only work with the industries listed here?",
        answer: "No. These are some of the industries and business contexts we work with. Our approach can be adapted to businesses with different requirements and industry-specific challenges."
      },
      {
        question: "Can you create an industry-specific digital strategy?",
        answer: "Yes. We begin by understanding your business, audience, industry, and goals before determining the right digital solutions and strategy."
      },
      {
        question: "Can I combine multiple QFT solutions for my business?",
        answer: "Yes. Website development, SEO, content, performance marketing, and custom development can work together depending on your business objectives and digital requirements."
      }
    ]
  },
  ctaBanner: {
    title: "Your Industry Has Its Own Digital Challenges",
    desc: "Let's understand your business first — and build the right digital approach around it.",
    ctaText: "Talk to Our Team",
    ctaHref: "/contact"
  }
};

const industriesToSeed = [
  {
    id: "manufacturing",
    title: "Manufacturing",
    slug: "manufacturing",
    icon: "🏭",
    description: "Build a stronger digital presence for your manufacturing business, communicate complex products and capabilities clearly, and connect with the right B2B audiences.",
    ctaText: "Explore Manufacturing",
    ctaHref: "/industries/manufacturing",
    order: 1,
    heroTitle: "Digital Growth Strategies for Manufacturing Leaders",
    heroSubtitle: "Transform complex industrial capabilities into clear, high-converting digital experiences that attract qualified B2B buyers and decision-makers.",
    challenges: [
      "Communicating technical product specifications to complex decision-making units",
      "Modernizing legacy sales pipelines and supplier portals",
      "Generating high-intent B2B inquiries in a relationship-driven market"
    ]
  },
  {
    id: "healthcare",
    title: "Healthcare",
    slug: "healthcare",
    icon: "🩺",
    description: "Create trustworthy digital experiences that make it easier for patients to discover your services, understand what you offer, and take the next step.",
    ctaText: "Explore Healthcare",
    ctaHref: "/industries/healthcare",
    order: 2,
    heroTitle: "Patient-Centric Digital Solutions for Healthcare Providers",
    heroSubtitle: "Build secure, compliant, and accessible web experiences that inspire patient trust and streamline appointment discovery.",
    challenges: [
      "Establishing search authority in high-intent local and national medical queries",
      "Maintaining HIPAA/regulatory compliance while delivering modern UI/UX",
      "Simplifying complex care pathway navigation for prospective patients"
    ]
  },
  {
    id: "e-commerce",
    title: "E-commerce",
    slug: "e-commerce",
    icon: "🛒",
    description: "Build digital experiences and marketing strategies designed to attract the right customers, improve engagement, and drive online sales.",
    ctaText: "Explore E-commerce",
    ctaHref: "/industries/e-commerce",
    order: 3,
    heroTitle: "High-Performance E-commerce Architectures & Marketing",
    heroSubtitle: "Optimize customer acquisition, increase average order value, and scale store revenue with data-driven performance strategies.",
    challenges: [
      "Reducing cart abandonment and optimizing checkout conversion funnels",
      "Scaling paid acquisition channels profitably in a competitive landscape",
      "Delivering personalized, lightning-fast product discovery experiences"
    ]
  },
  {
    id: "professional-services",
    title: "Professional Services",
    slug: "professional-services",
    icon: "💼",
    description: "Turn your expertise and experience into a digital presence that builds credibility, communicates your value, and generates relevant business enquiries.",
    ctaText: "Explore Professional Services",
    ctaHref: "/industries/professional-services",
    order: 4,
    heroTitle: "Authority-Building Platforms for Professional Service Firms",
    heroSubtitle: "Position your firm as an industry thought leader and turn high-value domain expertise into predictable inbound client lead channels.",
    challenges: [
      "Differentiating service offerings from low-cost market competitors",
      "Demonstrating proof and ROI through interactive case studies and insight hubs",
      "Shortening extended sales cycles for high-ticket consulting & advisory services"
    ]
  },
  {
    id: "b2b",
    title: "B2B Businesses",
    slug: "b2b",
    icon: "🏢",
    description: "Reach decision-makers with digital experiences, content, SEO, and marketing strategies built around longer buying journeys and business-specific requirements.",
    ctaText: "Explore B2B",
    ctaHref: "/industries/b2b",
    order: 5,
    heroTitle: "Strategic Digital Engines for B2B Growth",
    heroSubtitle: "Engage buying committees, nurture long-term leads, and align organic search & performance marketing with high-value deal pipelines.",
    challenges: [
      "Navigating multi-stakeholder approval cycles and enterprise procurement",
      "Structuring technical SEO strategies around commercial intent",
      "Creating account-based marketing collateral that resonates with C-suite targets"
    ]
  },
  {
    id: "hospitality",
    title: "Hospitality & Other Businesses",
    slug: "hospitality",
    icon: "🏨",
    description: "Create digital experiences that help people discover your business, understand what you offer, build confidence, and take action.",
    ctaText: "Explore Hospitality & Other Businesses",
    ctaHref: "/industries/hospitality",
    order: 6,
    heroTitle: "Immersive Digital Experiences for Hospitality & Service Brands",
    heroSubtitle: "Captivate prospective guests and customers with visual storytelling, effortless booking pathways, and brand-first digital presence.",
    challenges: [
      "Standing out against third-party aggregators and booking platforms",
      "Driving direct website bookings and inquiries",
      "Building memorable brand equity across web and mobile touchpoints"
    ]
  }
];

async function seed() {
  console.log("Starting Industries bootstrap seeding...");
  
  const auth = getAuth(app);
  try {
    await signInWithEmailAndPassword(auth, "admin@digitory.io", "adminPassword123");
    console.log("Authenticated as Super Administrator successfully.");
  } catch (err) {
    console.warn("Auth sign-in warning:", err);
  }

  for (let idx = 0; idx < industriesToSeed.length; idx++) {
    const item = industriesToSeed[idx];
    const docRef = doc(db, "industries", item.id);
    const rawPayload = {
      ...item,
      order: idx + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await setDoc(docRef, JSON.parse(JSON.stringify(rawPayload)));
    console.log(`Seeded Industry: ${item.id}`);
  }

  const pageRef = doc(db, "settings", "industriesPage");
  await setDoc(pageRef, JSON.parse(JSON.stringify(DEFAULT_INDUSTRIES_PAGE_DATA)), { merge: true });
  console.log("Seeded Industries Page settings!");
  console.log("Industries seeding complete!");
}

seed().catch(err => {
  console.error("Industries seeding failed:", err);
  process.exit(1);
});

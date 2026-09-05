import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export interface SolutionsPageData {
  hero: {
    eyebrow: string;
    title: string;
    desc: string;
    ctaPrimaryText: string;
    ctaPrimaryHref: string;
    ctaSecondaryText: string;
    ctaSecondaryHref: string;
  };
  connected: {
    badge: string;
    title: string;
    desc: string;
    ctaText: string;
    ctaHref: string;
    scenarios: {
      id: string;
      title: string;
      capabilities: string[];
      description: string;
    }[];
  };
  approach: {
    badge: string;
    title: string;
    desc: string;
    steps: {
      number: string;
      name: string;
      description: string;
      accent: string;
    }[];
  };
  whyUs: {
    badge: string;
    title: string;
    desc: string;
    pillars: {
      title: string;
      description: string;
      accent: string;
    }[];
  };
}

export const DEFAULT_SOLUTIONS_PAGE_DATA: SolutionsPageData = {
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

let pageDataCache: SolutionsPageData | null = null;

export const solutionsPageService = {
  async getPageData(bypassCache = false): Promise<SolutionsPageData> {
    if (pageDataCache && !bypassCache) return pageDataCache;
    try {
      const docRef = doc(db, 'settings', 'solutionsPage');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as Partial<SolutionsPageData>;
        pageDataCache = {
          hero: {
            eyebrow: data.hero?.eyebrow || DEFAULT_SOLUTIONS_PAGE_DATA.hero.eyebrow,
            title: data.hero?.title || DEFAULT_SOLUTIONS_PAGE_DATA.hero.title,
            desc: data.hero?.desc || DEFAULT_SOLUTIONS_PAGE_DATA.hero.desc,
            ctaPrimaryText: data.hero?.ctaPrimaryText || DEFAULT_SOLUTIONS_PAGE_DATA.hero.ctaPrimaryText,
            ctaPrimaryHref: data.hero?.ctaPrimaryHref || DEFAULT_SOLUTIONS_PAGE_DATA.hero.ctaPrimaryHref,
            ctaSecondaryText: data.hero?.ctaSecondaryText || DEFAULT_SOLUTIONS_PAGE_DATA.hero.ctaSecondaryText,
            ctaSecondaryHref: data.hero?.ctaSecondaryHref || DEFAULT_SOLUTIONS_PAGE_DATA.hero.ctaSecondaryHref
          },
          connected: {
            badge: data.connected?.badge || DEFAULT_SOLUTIONS_PAGE_DATA.connected.badge,
            title: data.connected?.title || DEFAULT_SOLUTIONS_PAGE_DATA.connected.title,
            desc: data.connected?.desc || DEFAULT_SOLUTIONS_PAGE_DATA.connected.desc,
            ctaText: data.connected?.ctaText || DEFAULT_SOLUTIONS_PAGE_DATA.connected.ctaText,
            ctaHref: data.connected?.ctaHref || DEFAULT_SOLUTIONS_PAGE_DATA.connected.ctaHref,
            scenarios: data.connected?.scenarios || DEFAULT_SOLUTIONS_PAGE_DATA.connected.scenarios
          },
          approach: {
            badge: data.approach?.badge || DEFAULT_SOLUTIONS_PAGE_DATA.approach.badge,
            title: data.approach?.title || DEFAULT_SOLUTIONS_PAGE_DATA.approach.title,
            desc: data.approach?.desc || DEFAULT_SOLUTIONS_PAGE_DATA.approach.desc,
            steps: data.approach?.steps || DEFAULT_SOLUTIONS_PAGE_DATA.approach.steps
          },
          whyUs: {
            badge: data.whyUs?.badge || DEFAULT_SOLUTIONS_PAGE_DATA.whyUs.badge,
            title: data.whyUs?.title || DEFAULT_SOLUTIONS_PAGE_DATA.whyUs.title,
            desc: data.whyUs?.desc || DEFAULT_SOLUTIONS_PAGE_DATA.whyUs.desc,
            pillars: data.whyUs?.pillars || DEFAULT_SOLUTIONS_PAGE_DATA.whyUs.pillars
          }
        };
        return pageDataCache;
      }
    } catch (e) {
      console.error('Failed to get solutions landing page data:', e);
    }
    return DEFAULT_SOLUTIONS_PAGE_DATA;
  },

  async savePageData(payload: SolutionsPageData) {
    const docRef = doc(db, 'settings', 'solutionsPage');
    await setDoc(docRef, payload, { merge: true });
    pageDataCache = payload;
    return payload;
  }
};

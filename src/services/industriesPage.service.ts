import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export interface IndustriesPageData {
  hero: {
    eyebrow: string;
    title: string;
    desc: string;
    ctaText: string;
    ctaHref: string;
  };
  header: {
    title: string;
    desc: string;
  };
  strategy: {
    title: string;
    paragraphs: string[];
  };
  process: {
    badge: string;
    title: string;
    steps: {
      name: string;
      description: string;
    }[];
  };
  solutions: {
    title: string;
    desc: string;
    ctaText: string;
    ctaHref: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  caseStudy: {
    badge: string;
    title: string;
    desc: string;
    ctaText: string;
    ctaHref: string;
  };
  faqs: {
    title: string;
    list: {
      question: string;
      answer: string;
    }[];
  };
  ctaBanner: {
    title: string;
    desc: string;
    ctaText: string;
    ctaHref: string;
  };
}

export const DEFAULT_INDUSTRIES_PAGE_DATA: IndustriesPageData = {
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

let pageDataCache: IndustriesPageData | null = null;

export const industriesPageService = {
  async getPageData(bypassCache = false): Promise<IndustriesPageData> {
    if (pageDataCache && !bypassCache) return pageDataCache;
    try {
      const docRef = doc(db, 'settings', 'industriesPage');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as Partial<IndustriesPageData>;
        pageDataCache = {
          hero: {
            eyebrow: data.hero?.eyebrow || DEFAULT_INDUSTRIES_PAGE_DATA.hero.eyebrow,
            title: data.hero?.title || DEFAULT_INDUSTRIES_PAGE_DATA.hero.title,
            desc: data.hero?.desc || DEFAULT_INDUSTRIES_PAGE_DATA.hero.desc,
            ctaText: data.hero?.ctaText || DEFAULT_INDUSTRIES_PAGE_DATA.hero.ctaText,
            ctaHref: data.hero?.ctaHref || DEFAULT_INDUSTRIES_PAGE_DATA.hero.ctaHref
          },
          header: {
            title: data.header?.title || DEFAULT_INDUSTRIES_PAGE_DATA.header.title,
            desc: data.header?.desc || DEFAULT_INDUSTRIES_PAGE_DATA.header.desc
          },
          strategy: {
            title: data.strategy?.title || DEFAULT_INDUSTRIES_PAGE_DATA.strategy.title,
            paragraphs: data.strategy?.paragraphs || DEFAULT_INDUSTRIES_PAGE_DATA.strategy.paragraphs
          },
          process: {
            badge: data.process?.badge || DEFAULT_INDUSTRIES_PAGE_DATA.process.badge,
            title: data.process?.title || DEFAULT_INDUSTRIES_PAGE_DATA.process.title,
            steps: data.process?.steps || DEFAULT_INDUSTRIES_PAGE_DATA.process.steps
          },
          solutions: {
            title: data.solutions?.title || DEFAULT_INDUSTRIES_PAGE_DATA.solutions.title,
            desc: data.solutions?.desc || DEFAULT_INDUSTRIES_PAGE_DATA.solutions.desc,
            ctaText: data.solutions?.ctaText || DEFAULT_INDUSTRIES_PAGE_DATA.solutions.ctaText,
            ctaHref: data.solutions?.ctaHref || DEFAULT_INDUSTRIES_PAGE_DATA.solutions.ctaHref,
            items: data.solutions?.items || DEFAULT_INDUSTRIES_PAGE_DATA.solutions.items
          },
          caseStudy: {
            badge: data.caseStudy?.badge || DEFAULT_INDUSTRIES_PAGE_DATA.caseStudy.badge,
            title: data.caseStudy?.title || DEFAULT_INDUSTRIES_PAGE_DATA.caseStudy.title,
            desc: data.caseStudy?.desc || DEFAULT_INDUSTRIES_PAGE_DATA.caseStudy.desc,
            ctaText: data.caseStudy?.ctaText || DEFAULT_INDUSTRIES_PAGE_DATA.caseStudy.ctaText,
            ctaHref: data.caseStudy?.ctaHref || DEFAULT_INDUSTRIES_PAGE_DATA.caseStudy.ctaHref
          },
          faqs: {
            title: data.faqs?.title || DEFAULT_INDUSTRIES_PAGE_DATA.faqs.title,
            list: data.faqs?.list || DEFAULT_INDUSTRIES_PAGE_DATA.faqs.list
          },
          ctaBanner: {
            title: data.ctaBanner?.title || DEFAULT_INDUSTRIES_PAGE_DATA.ctaBanner.title,
            desc: data.ctaBanner?.desc || DEFAULT_INDUSTRIES_PAGE_DATA.ctaBanner.desc,
            ctaText: data.ctaBanner?.ctaText || DEFAULT_INDUSTRIES_PAGE_DATA.ctaBanner.ctaText,
            ctaHref: data.ctaBanner?.ctaHref || DEFAULT_INDUSTRIES_PAGE_DATA.ctaBanner.ctaHref
          }
        };
        return pageDataCache;
      }
    } catch (e) {
      console.error('Failed to get industries page settings:', e);
    }
    return DEFAULT_INDUSTRIES_PAGE_DATA;
  },

  async savePageData(payload: IndustriesPageData) {
    const docRef = doc(db, 'settings', 'industriesPage');
    await setDoc(docRef, payload, { merge: true });
    pageDataCache = payload;
    return payload;
  }
};

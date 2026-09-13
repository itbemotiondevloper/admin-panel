export interface IndustryGridItem {
  id: string;
  number: string;
  title: string;
  slug: string;
  shortDesc: string;
  image: string;
  ctaText?: string;
}

export interface IndustryStatItem {
  number: string;
  label: string;
}

export interface IndustryCaseStudy {
  id: string;
  industryTag: string;
  title: string;
  summary: string;
  resultMetric?: string;
  image: string;
  link: string;
  isPrimary?: boolean;
}

export interface IndustryFAQ {
  question: string;
  answer: string;
}

export interface IndustryTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  imageOverlayTitle: string[];
  image: string;
}

export interface IndustriesPageContent {
  hero: {
    eyebrow: string;
    headlineLines: string[];
    body: string;
    ctaText: string;
    ctaHref: string;
    annotationLines: string[];
    image: string;
  };
  grid: {
    eyebrow: string;
    titleLines: string[];
    subhead: string;
    items: IndustryGridItem[];
  };
  stats: {
    eyebrow: string;
    titleLines: string[];
    subhead: string;
    items: IndustryStatItem[];
  };
  caseStudies: {
    eyebrow: string;
    title: string;
    ctaText: string;
    ctaHref: string;
    items: IndustryCaseStudy[];
  };
  faq: {
    eyebrow: string;
    titleLines: string[];
    subhead: string;
    ctaText: string;
    ctaHref: string;
    items: IndustryFAQ[];
  };
  testimonial: {
    eyebrow: string;
    item: IndustryTestimonial;
  };
  finalCta: {
    eyebrow: string;
    titleLines: string[];
    body: string;
    primaryCtaText: string;
    primaryCtaHref: string;
    secondaryCtaText: string;
    secondaryCtaHref: string;
    annotationLines: string[];
    image: string;
  };
}

export const INDUSTRIES_PAGE_DATA: IndustriesPageContent = {
  hero: {
    eyebrow: "01 — INDUSTRIES",
    headlineLines: [
      "Different",
      "Industries.",
      "Different Challenges.",
      "One Digital Partner."
    ],
    body: "We work across industries, combining strategy, creativity, marketing and technology to build digital solutions around how each business actually works.",
    ctaText: "Let's Build for Your Industry →",
    ctaHref: "#industries-grid",
    annotationLines: ["More", "Possibilities", "Together."],
    image: "/cta-digital-flow.jpg"
  },
  grid: {
    eyebrow: "02 — OUR INDUSTRIES",
    titleLines: [
      "Built Around",
      "Your Industry."
    ],
    subhead: "Different markets need different thinking. We adapt the strategy, experience and technology to fit the business behind it.",
    items: [
      {
        id: "manufacturing",
        number: "01",
        title: "Manufacturing",
        slug: "manufacturing",
        shortDesc: "Digital experiences for complex products, capabilities and B2B buying journeys.",
        image: "/svc-dev.jpg"
      },
      {
        id: "healthcare",
        number: "02",
        title: "Healthcare",
        slug: "healthcare",
        shortDesc: "Clear, trustworthy digital experiences designed around accessibility and confidence.",
        image: "/svc-seo.jpg"
      },
      {
        id: "e-commerce",
        number: "03",
        title: "E-commerce",
        slug: "e-commerce",
        shortDesc: "Conversion-focused digital experiences built around products, customers and growth.",
        image: "/hero-device.jpg"
      },
      {
        id: "professional-services",
        number: "04",
        title: "Professional Services",
        slug: "professional-services",
        shortDesc: "Credibility-led websites and marketing systems that turn expertise into opportunities.",
        image: "/hero-workspace.jpg"
      },
      {
        id: "b2b",
        number: "05",
        title: "B2B Businesses",
        slug: "b2b",
        shortDesc: "Digital platforms designed to explain complex offerings and generate qualified enquiries.",
        image: "/svc-web.jpg"
      },
      {
        id: "hospitality",
        number: "06",
        title: "Hospitality & Other Businesses",
        slug: "hospitality",
        shortDesc: "Flexible digital solutions built around customer experience, visibility and business goals.",
        image: "/cs-photo.jpg"
      }
    ]
  },
  stats: {
    eyebrow: "03 — INDUSTRIES IN NUMBERS",
    titleLines: [
      "Real Businesses.",
      "Real Growth."
    ],
    subhead: "From emerging brands to established businesses, we help companies across industries turn digital opportunities into measurable growth.",
    items: [
      { number: "250+", label: "Projects Delivered" },
      { number: "6+", label: "Industries Served" },
      { number: "3.5×", label: "Average Growth in Leads" },
      { number: "95%", label: "Client Satisfaction" }
    ]
  },
  caseStudies: {
    eyebrow: "04 — FEATURED CASE STUDIES",
    title: "Featured Case Studies",
    ctaText: "View All Case Studies →",
    ctaHref: "/case-studies",
    items: [
      {
        id: "cs-1",
        industryTag: "REAL ESTATE",
        title: "From Vision to 4x Enquiries",
        summary: "A modern digital platform that helped a real estate brand generate higher visibility and qualified leads.",
        resultMetric: "4x Enquiries",
        image: "/svc-web.jpg",
        link: "/case-studies/real-estate-growth",
        isPrimary: true
      },
      {
        id: "cs-2",
        industryTag: "HOSPITALITY",
        title: "A Stronger Digital Presence",
        summary: "How a hospitality brand scaled its online visibility and bookings through a refined digital experience.",
        image: "/cs-photo.jpg",
        link: "/case-studies/hospitality-experience",
        isPrimary: false
      }
    ]
  },
  faq: {
    eyebrow: "05 — FREQUENTLY ASKED QUESTIONS",
    titleLines: [
      "Got Questions?",
      "We've Got Answers."
    ],
    subhead: "Quick answers to help you understand how we work across different industries.",
    ctaText: "View All FAQs →",
    ctaHref: "/contact",
    items: [
      {
        question: "Do you work with businesses in my industry?",
        answer: "Yes, we work across multiple key industries including Manufacturing, Healthcare, E-commerce, Professional Services, B2B, and Hospitality, tailoring our approach to your unique market requirements."
      },
      {
        question: "What types of businesses do you usually work with?",
        answer: "We partner with ambitious mid-market companies, enterprise leaders, and high-growth brands looking to turn their digital presence into a measurable growth engine."
      },
      {
        question: "Can you share examples from my industry?",
        answer: "Absolutely. We have documented case studies and performance metrics across each industry we serve, demonstrating clear ROI and strategic impact."
      },
      {
        question: "Do you offer industry-specific strategies?",
        answer: "Every strategy is custom-crafted around your target audience, buying cycle, regulatory environment, and competitive landscape."
      }
    ]
  },
  testimonial: {
    eyebrow: "06 — WHAT OUR CLIENTS SAY",
    item: {
      quote: "Quest For Tech understood our industry, our audience and our goals. The entire process was smooth, professional and result-driven.",
      author: "Rahul Mehta",
      role: "Director",
      company: "Skyline Group",
      avatar: "/founder.jpg",
      imageOverlayTitle: ["GREAT", "BUSINESSES", "GROW WITH", "GREAT", "PARTNERS."],
      image: "/hero-workspace.jpg"
    }
  },
  finalCta: {
    eyebrow: "07 — LET'S CREATE TOGETHER",
    titleLines: [
      "Your Industry.",
      "Our Expertise."
    ],
    body: "Let's discuss how we can create digital growth opportunities for your business.",
    primaryCtaText: "Let's Talk →",
    primaryCtaHref: "/contact",
    secondaryCtaText: "Explore Our Work →",
    secondaryCtaHref: "/case-studies",
    annotationLines: ["Ideas today.", "Growth", "tomorrow."],
    image: "/cta-digital-flow.jpg"
  }
};

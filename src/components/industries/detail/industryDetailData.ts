export interface SolutionTile {
  number: string;
  title: string;
  shortDesc: string;
  image: string;
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface WhyChooseItem {
  number: string;
  title: string;
  desc: string;
}

export interface IndustryDetailFAQ {
  question: string;
  answer: string;
}

export interface IndustryDetailContent {
  slug: string;
  industryName: string;
  eyebrow: string;
  
  // Section 2: Hero
  heroHeadlineLines: string[];
  heroBody: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  trustText: string;
  heroImage: string;
  heroAnnotationLines: string[];

  // Section 3: Industry Overview
  overviewEyebrow: string;
  overviewHeadingLines: string[];
  overviewBody: string;
  overviewPoints: string[];
  overviewImage: string;
  overviewImageOverlayText: string[];

  // Section 4: Solutions for this Industry
  solutionsEyebrow: string;
  solutionsHeadingLines: string[];
  solutionsSubhead: string;
  solutionsItems: SolutionTile[];

  // Section 5: Process Story
  processEyebrow: string;
  processHeadingLines: string[];
  processBody: string;
  processCtaText: string;
  processCtaHref: string;
  processSteps: { number: string; title: string; subtitle?: string }[];
  processAnnotation: string;

  // Section 6: Featured Case Study
  caseStudyEyebrow: string;
  caseStudyTag: string;
  caseStudyHeadingLines: string[];
  caseStudyBody: string;
  caseStudyImage: string;
  caseStudyLink: string;
  caseStudyCtaText: string;
  caseStudyMetrics: MetricItem[];

  // Section 7: Why Choose Us
  whyChooseEyebrow: string;
  whyChooseHeadingLines: string[];
  whyChooseBody: string;
  whyChooseItems: WhyChooseItem[];

  // Section 8: FAQ
  faqEyebrow: string;
  faqHeadingLines: string[];
  faqSubhead: string;
  faqItems: IndustryDetailFAQ[];

  // Section 9: Final CTA
  finalCtaEyebrow: string;
  finalCtaHeadingLines: string[];
  finalCtaBody: string;
  finalCtaPrimaryText: string;
  finalCtaPrimaryHref: string;
  finalCtaSecondaryText: string;
  finalCtaSecondaryHref: string;
  finalCtaImage: string;
  finalCtaAnnotationLines: string[];
}

export const INDUSTRY_DETAILS_MAP: Record<string, IndustryDetailContent> = {
  manufacturing: {
    slug: "manufacturing",
    industryName: "Manufacturing",
    eyebrow: "01 — MANUFACTURING",
    
    heroHeadlineLines: [
      "Engineering Digital Growth",
      "for Manufacturing."
    ],
    heroBody: "We build websites and digital solutions for manufacturing businesses that showcase your capabilities, build trust and generate real business opportunities.",
    primaryCtaText: "Start Your Project →",
    primaryCtaHref: "/contact",
    secondaryCtaText: "Watch Video",
    trustText: "Trusted by growing manufacturers",
    heroImage: "/svc-dev.jpg",
    heroAnnotationLines: ["Machines Build Today.", "Digital Builds Tomorrow."],

    overviewEyebrow: "02 — INDUSTRY OVERVIEW",
    overviewHeadingLines: [
      "A Stronger",
      "Digital Presence",
      "for a Stronger Future."
    ],
    overviewBody: "Today's manufacturing buyers research, compare and evaluate online before they get in touch. A well-crafted digital presence helps you communicate your strengths, capabilities and quality — and attract the right clients.",
    overviewPoints: [
      "Showcase Capabilities",
      "Build Global Trust",
      "Generate Qualified Enquiries"
    ],
    overviewImage: "/svc-web.jpg",
    overviewImageOverlayText: ["MORE VISIBILITY", "STRONGER", "OPPORTUNITIES"],

    solutionsEyebrow: "03 — SOLUTIONS FOR MANUFACTURING",
    solutionsHeadingLines: [
      "Everything You Need",
      "to Grow Online."
    ],
    solutionsSubhead: "From corporate websites to lead generation systems, we provide end-to-end digital solutions tailored for manufacturing businesses.",
    solutionsItems: [
      {
        number: "01",
        title: "Corporate Website",
        shortDesc: "A powerful digital identity that showcases your products, facilities and certifications.",
        image: "/svc-web.jpg"
      },
      {
        number: "02",
        title: "Lead Generation",
        shortDesc: "Turn visitors into enquiries with strategic content and conversion-focused design.",
        image: "/svc-performance.jpg"
      },
      {
        number: "03",
        title: "Product Showcase",
        shortDesc: "Present your product range with clarity, specifications and real-world applications.",
        image: "/hero-device.jpg"
      },
      {
        number: "04",
        title: "Custom Web Solutions",
        shortDesc: "Tailored web applications for dealers, distributors and internal systems.",
        image: "/svc-dev.jpg"
      }
    ],

    processEyebrow: "04 — OUR PROCESS",
    processHeadingLines: [
      "From Strategy",
      "to Measurable",
      "Results."
    ],
    processBody: "A clear, collaborative process to build a website that supports your manufacturing goals.",
    processCtaText: "Explore Our Process →",
    processCtaHref: "/about",
    processSteps: [
      { number: "01", title: "Understand", subtitle: "Business & goals" },
      { number: "02", title: "Research", subtitle: "Market & competitors" },
      { number: "03", title: "Plan", subtitle: "Strategy & structure" },
      { number: "04", title: "Design", subtitle: "UI/UX & content" },
      { number: "05", title: "Develop", subtitle: "Build & integrate" },
      { number: "06", title: "Launch & Improve", subtitle: "Test, refine, grow" }
    ],
    processAnnotation: "A clear path to a stronger tomorrow.",

    caseStudyEyebrow: "05 — FEATURED CASE STUDY",
    caseStudyTag: "INDUSTRIAL EQUIPMENT",
    caseStudyHeadingLines: [
      "From Machines",
      "to More Enquiries"
    ],
    caseStudyBody: "A modern digital platform that helped a manufacturing brand showcase its product range globally and generate high-quality enquiries.",
    caseStudyImage: "/svc-dev.jpg",
    caseStudyLink: "/case-studies/industrial-growth",
    caseStudyCtaText: "View All Case Studies →",
    caseStudyMetrics: [
      { value: "3.4×", label: "Increase in Enquiries" },
      { value: "60%", label: "More International Visitors" },
      { value: "45%", label: "Growth in Quote Requests" }
    ],

    whyChooseEyebrow: "06 — WHY CHOOSE US",
    whyChooseHeadingLines: [
      "A Partner Who",
      "Understands",
      "Manufacturing."
    ],
    whyChooseBody: "We combine industry understanding with digital expertise to deliver websites and solutions that work for your business.",
    whyChooseItems: [
      { number: "01", title: "Industry-Focused Approach", desc: "We design around manufacturing buying journeys, technical specifications, and B2B decision-makers." },
      { number: "02", title: "Clear & Technical Communication", desc: "We translate complex engineering and technical capabilities into clear, compelling digital storytelling." },
      { number: "03", title: "Built for Growth", desc: "Scalable digital foundations engineered for search visibility, performance, and international expansion." },
      { number: "04", title: "Reliable & Collaborative", desc: "Dedicated team support with transparent project milestones and measurable performance outcomes." }
    ],

    faqEyebrow: "07 — FREQUENTLY ASKED QUESTIONS",
    faqHeadingLines: [
      "Got Questions?",
      "We've Got Answers."
    ],
    faqSubhead: "Quick answers about our website solutions for manufacturing businesses.",
    faqItems: [
      { question: "Do you work with different types of manufacturing companies?", answer: "Yes, we work across precision engineering, industrial equipment, components, consumer manufacturing, and contract manufacturing." },
      { question: "Can you showcase complex product ranges effectively?", answer: "We build structured product catalogs with CAD download support, spec sheets, filterable categories, and application guides." },
      { question: "Do you offer lead generation support?", answer: "Our platforms are designed around conversion pathways, quote calculators, RFQ forms, and CRM integrations." },
      { question: "Can you help with website redesigns?", answer: "We specialize in modernizing legacy manufacturing websites while protecting existing SEO equity and domain authority." }
    ],

    finalCtaEyebrow: "08 — LET'S BUILD TOGETHER",
    finalCtaHeadingLines: [
      "Let's Create New",
      "Opportunities."
    ],
    finalCtaBody: "Ready to strengthen your digital presence and attract more business?",
    finalCtaPrimaryText: "Let's Talk →",
    finalCtaPrimaryHref: "/contact",
    finalCtaSecondaryText: "Explore Our Work →",
    finalCtaSecondaryHref: "/case-studies",
    finalCtaImage: "/cta-digital-flow.jpg",
    finalCtaAnnotationLines: ["Ideas today.", "Growth tomorrow."]
  }
};

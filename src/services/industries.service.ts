import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  orderBy,
  limit,
  setDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export interface IndustryItem {
  _id?: string;
  id: string;
  title: string;
  slug: string;
  icon: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  order?: number;
  heroTitle?: string;
  heroSubtitle?: string;
  content?: string;
  challenges?: string[];
  faqs?: { question: string; answer: string }[];
  createdAt?: string;
  updatedAt?: string;
}

export const DEFAULT_INDUSTRIES: IndustryItem[] = [
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    slug: 'manufacturing',
    icon: '🏭',
    description: 'Build a stronger digital presence for your manufacturing business, communicate complex products and capabilities clearly, and connect with the right B2B audiences.',
    ctaText: 'Explore Manufacturing',
    ctaHref: '/industries/manufacturing',
    order: 1,
    heroTitle: 'Digital Growth Strategies for Manufacturing Leaders',
    heroSubtitle: 'Transform complex industrial capabilities into clear, high-converting digital experiences that attract qualified B2B buyers and decision-makers.',
    challenges: [
      'Communicating technical product specifications to complex decision-making units',
      'Modernizing legacy sales pipelines and supplier portals',
      'Generating high-intent B2B inquiries in a relationship-driven market'
    ]
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    slug: 'healthcare',
    icon: '🩺',
    description: 'Create trustworthy digital experiences that make it easier for patients to discover your services, understand what you offer, and take the next step.',
    ctaText: 'Explore Healthcare',
    ctaHref: '/industries/healthcare',
    order: 2,
    heroTitle: 'Patient-Centric Digital Solutions for Healthcare Providers',
    heroSubtitle: 'Build secure, compliant, and accessible web experiences that inspire patient trust and streamline appointment discovery.',
    challenges: [
      'Establishing search authority in high-intent local and national medical queries',
      'Maintaining HIPAA/regulatory compliance while delivering modern UI/UX',
      'Simplifying complex care pathway navigation for prospective patients'
    ]
  },
  {
    id: 'e-commerce',
    title: 'E-commerce',
    slug: 'e-commerce',
    icon: '🛒',
    description: 'Build digital experiences and marketing strategies designed to attract the right customers, improve engagement, and drive online sales.',
    ctaText: 'Explore E-commerce',
    ctaHref: '/industries/e-commerce',
    order: 3,
    heroTitle: 'High-Performance E-commerce Architectures & Marketing',
    heroSubtitle: 'Optimize customer acquisition, increase average order value, and scale store revenue with data-driven performance strategies.',
    challenges: [
      'Reducing cart abandonment and optimizing checkout conversion funnels',
      'Scaling paid acquisition channels profitably in a competitive landscape',
      'Delivering personalized, lightning-fast product discovery experiences'
    ]
  },
  {
    id: 'professional-services',
    title: 'Professional Services',
    slug: 'professional-services',
    icon: '💼',
    description: 'Turn your expertise and experience into a digital presence that builds credibility, communicates your value, and generates relevant business enquiries.',
    ctaText: 'Explore Professional Services',
    ctaHref: '/industries/professional-services',
    order: 4,
    heroTitle: 'Authority-Building Platforms for Professional Service Firms',
    heroSubtitle: 'Position your firm as an industry thought leader and turn high-value domain expertise into predictable inbound client lead channels.',
    challenges: [
      'Differentiating service offerings from low-cost market competitors',
      'Demonstrating proof and ROI through interactive case studies and insight hubs',
      'Shortening extended sales cycles for high-ticket consulting & advisory services'
    ]
  },
  {
    id: 'b2b',
    title: 'B2B Businesses',
    slug: 'b2b',
    icon: '🏢',
    description: 'Reach decision-makers with digital experiences, content, SEO, and marketing strategies built around longer buying journeys and business-specific requirements.',
    ctaText: 'Explore B2B',
    ctaHref: '/industries/b2b',
    order: 5,
    heroTitle: 'Strategic Digital Engines for B2B Growth',
    heroSubtitle: 'Engage buying committees, nurture long-term leads, and align organic search & performance marketing with high-value deal pipelines.',
    challenges: [
      'Navigating multi-stakeholder approval cycles and enterprise procurement',
      'Structuring technical SEO strategies around commercial intent',
      'Creating account-based marketing collateral that resonates with C-suite targets'
    ]
  },
  {
    id: 'hospitality',
    title: 'Hospitality & Other Businesses',
    slug: 'hospitality',
    icon: '🏨',
    description: 'Create digital experiences that help people discover your business, understand what you offer, build confidence, and take action.',
    ctaText: 'Explore Hospitality & Other Businesses',
    ctaHref: '/industries/hospitality',
    order: 6,
    heroTitle: 'Immersive Digital Experiences for Hospitality & Service Brands',
    heroSubtitle: 'Captivate prospective guests and customers with visual storytelling, effortless booking pathways, and brand-first digital presence.',
    challenges: [
      'Standing out against third-party aggregators and booking platforms',
      'Driving direct website bookings and inquiries',
      'Building memorable brand equity across web and mobile touchpoints'
    ]
  }
];

let cachedIndustries: IndustryItem[] | null = null;
let fetchPromise: Promise<IndustryItem[]> | null = null;

export const industriesService = {
  async getIndustries(options?: { useCache?: boolean }): Promise<IndustryItem[]> {
    if (options?.useCache !== false && cachedIndustries) {
      return cachedIndustries;
    }
    if (options?.useCache !== false && fetchPromise) {
      return fetchPromise;
    }

    const ref = collection(db, 'industries');
    const q = query(ref, orderBy('order', 'asc'));

    fetchPromise = getDocs(q).then((snapshot) => {
      if (snapshot.empty) {
        cachedIndustries = DEFAULT_INDUSTRIES;
      } else {
        cachedIndustries = snapshot.docs.map(docSnap => ({
          _id: docSnap.id,
          id: docSnap.id,
          ...docSnap.data()
        })) as IndustryItem[];
      }
      fetchPromise = null;
      return cachedIndustries;
    }).catch(err => {
      console.warn('Fallback to default industries on fetch error:', err);
      return DEFAULT_INDUSTRIES;
    });

    return fetchPromise;
  },

  async getIndustryBySlug(slug: string): Promise<IndustryItem | null> {
    const list = await this.getIndustries();
    const found = list.find(s => s.slug === slug);
    if (found) return found;

    try {
      const ref = collection(db, 'industries');
      const q = query(ref, where('slug', '==', slug), limit(1));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      const docSnap = snapshot.docs[0];
      return {
        _id: docSnap.id,
        id: docSnap.id,
        ...docSnap.data()
      } as IndustryItem;
    } catch {
      return null;
    }
  },

  async getIndustryById(id: string): Promise<IndustryItem | null> {
    const list = await this.getIndustries();
    const found = list.find(s => s.id === id || s._id === id);
    if (found) return found;

    try {
      const docRef = doc(db, 'industries', id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return null;
      return {
        _id: docSnap.id,
        id: docSnap.id,
        ...docSnap.data()
      } as IndustryItem;
    } catch {
      return null;
    }
  },

  async createIndustry(payload: Partial<IndustryItem>) {
    const slug = payload.slug || payload.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || 'industry';
    const docId = slug;
    const docRef = doc(db, 'industries', docId);
    
    const fullPayload: IndustryItem = {
      id: docId,
      title: payload.title || 'New Industry',
      slug,
      icon: payload.icon || '🏢',
      description: payload.description || '',
      ctaText: payload.ctaText || `Explore ${payload.title || 'Industry'}`,
      ctaHref: payload.ctaHref || `/industries/${slug}`,
      order: payload.order || 99,
      heroTitle: payload.heroTitle || '',
      heroSubtitle: payload.heroSubtitle || '',
      content: payload.content || '',
      challenges: payload.challenges || [],
      faqs: payload.faqs || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await setDoc(docRef, fullPayload);
    this.clearCache();
    return fullPayload;
  },

  async updateIndustry(id: string, payload: Partial<IndustryItem>) {
    const docRef = doc(db, 'industries', id);
    const updates = {
      ...payload,
      updatedAt: new Date().toISOString()
    };
    await updateDoc(docRef, updates);
    this.clearCache();
    return updates;
  },

  async deleteIndustry(id: string) {
    const docRef = doc(db, 'industries', id);
    await deleteDoc(docRef);
    this.clearCache();
  },

  async duplicateIndustry(id: string) {
    const original = await this.getIndustryById(id);
    if (!original) throw new Error("Industry to duplicate was not found");

    const baseSlug = original.slug ? original.slug.replace(/-\d+$/, '') : 'industry';
    let count = 2;
    let newSlug = `${baseSlug}-${count}`;

    while (await this.getIndustryBySlug(newSlug)) {
      count++;
      newSlug = `${baseSlug}-${count}`;
    }

    const newTitle = original.title ? `${original.title} (Copy)` : `Copy of ${id}`;
    const { _id, id: origId, ...copyData } = original;

    const payload = {
      ...copyData,
      title: newTitle,
      slug: newSlug,
      ctaHref: `/industries/${newSlug}`
    };

    return await this.createIndustry(payload);
  },

  clearCache() {
    cachedIndustries = null;
    fetchPromise = null;
  }
};

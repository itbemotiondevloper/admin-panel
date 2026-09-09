import { 
  collection, 
  getDocs, 
  getDoc,
  doc, 
  setDoc,
  updateDoc,
  query, 
  where,
  orderBy,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export type SeoForm = {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  robotsIndex: 'index' | 'noindex';
  robotsFollow: 'follow' | 'nofollow';
  openGraph: { title: string; description: string; image: string };
  twitterCard: { title: string; description: string; image: string };
};

const DEFAULT_WEBSITE_PAGES: Array<{ id: string; name: string; url: string; pageType: 'Page' | 'Post' | 'Solution'; slug: string }> = [
  { id: 'home', name: 'Home Page', url: '/', pageType: 'Page', slug: '' },
  { id: 'about', name: 'About Us', url: '/about', pageType: 'Page', slug: 'about' },
  { id: 'solutions-main', name: 'Solutions & Services', url: '/solutions', pageType: 'Page', slug: 'solutions' },
  { id: 'blogs-main', name: 'Blogs & Insights', url: '/blogs', pageType: 'Page', slug: 'blogs' },
  { id: 'case-studies', name: 'Case Studies', url: '/case-studies', pageType: 'Page', slug: 'case-studies' },
  { id: 'contact', name: 'Contact Us', url: '/contact', pageType: 'Page', slug: 'contact' },
  { id: 'request-demo', name: 'Request Demo', url: '/request-demo', pageType: 'Page', slug: 'request-demo' },
  { id: 'privacy', name: 'Privacy Policy', url: '/privacy', pageType: 'Page', slug: 'privacy' },
  { id: 'terms', name: 'Terms of Service', url: '/terms', pageType: 'Page', slug: 'terms' },
];

export const seoService = {
  // Aggregate all SEO entries from /seo, /solutions, and /posts
  async getSeoEntries() {
    // 1. Fetch static Pages and Solutions from /seo collection
    const seoRef = collection(db, 'seo');
    const seoSnap = await getDocs(seoRef);
    const seoList = seoSnap.docs.map(d => ({
      _id: d.id,
      id: d.id,
      ...d.data()
    })) as any[];

    // Build static website pages, merging saved SEO records with defaults
    const staticPages = DEFAULT_WEBSITE_PAGES.map(defPage => {
      const existing = seoList.find(s => s._id === defPage.id || s.url === defPage.url);
      return {
        _id: defPage.id,
        id: defPage.id,
        pageType: 'Page' as const,
        name: (existing?.name as string) || defPage.name,
        url: (existing?.url as string) || defPage.url,
        slug: defPage.slug,
        status: 'Published',
        seo: existing?.seo || null,
        updatedAt: existing?.updatedAt || new Date().toISOString()
      };
    });

    // Also include any additional custom static pages from Firestore /seo collection that are not in defaults or solutions
    const additionalPages = seoList
      .filter(s => s.pageType === 'Page' && !DEFAULT_WEBSITE_PAGES.some(def => def.id === s._id || def.url === s.url))
      .map(s => ({
        _id: s._id as string,
        id: s._id as string,
        pageType: 'Page' as const,
        name: (s.name as string) || 'Custom Page',
        url: (s.url as string) || '',
        slug: (s.slug as string) || '',
        status: (s.status as string) || 'Published',
        seo: s.seo || null,
        updatedAt: (s.updatedAt as string) || new Date().toISOString()
      }));

    const allWebsitePages = [...staticPages, ...additionalPages];

    // 2. Fetch solutions from /solutions
    const solRef = collection(db, 'solutions');
    const solSnap = await getDocs(solRef);
    const solList = solSnap.docs.map(d => {
      const data = d.data();
      // Look up if there's an existing SEO record in /seo with the same ID, or create a default one
      const existingSeo = seoList.find(s => s._id === d.id);
      return {
        _id: d.id,
        id: d.id,
        pageType: 'Solution' as const,
        name: data.title || data.name || 'Solution',
        url: `/solutions/${data.slug}`,
        slug: data.slug || '',
        status: 'Published',
        seo: existingSeo ? existingSeo.seo : null,
        updatedAt: data.updatedAt || new Date().toISOString()
      };
    });

    // 3. Fetch blogs from /posts
    const postsRef = collection(db, 'posts');
    const postsSnap = await getDocs(postsRef);
    const postsList = postsSnap.docs.map(d => {
      const data = d.data();
      // Map post.seo to normalized fields
      const pSeo = data.seo || {};
      const seo = {
        title: pSeo.metaTitle || pSeo.title || '',
        description: pSeo.metaDescription || pSeo.description || '',
        keywords: pSeo.keywords || [],
        canonicalUrl: pSeo.canonicalUrl || '',
        robotsIndex: pSeo.robotsIndex || 'index',
        robotsFollow: pSeo.robotsFollow || 'follow',
        openGraph: pSeo.openGraph || { title: '', description: '', image: '' },
        twitterCard: pSeo.twitterCard || { title: '', description: '', image: '' }
      };
      return {
        _id: d.id,
        id: d.id,
        pageType: 'Post' as const,
        name: data.title || 'Blog Post',
        url: `/blog/${data.slug}`,
        slug: data.slug || '',
        status: data.status || 'Draft',
        seo: (seo.title || seo.description) ? seo : null,
        updatedAt: data.updatedAt || new Date().toISOString()
      };
    });

    return [...allWebsitePages, ...solList, ...postsList] as any[];
  },

  // Save/Update SEO entries
  async saveSeo(payload: SeoForm & { pageId: string; pageType: 'Post' | 'Page' | 'Solution'; name?: string; url?: string }) {
    const { pageId, pageType, name, url, ...seoForm } = payload;

    if (pageType === 'Post') {
      const docRef = doc(db, 'posts', pageId);
      // Read original post content first to preserve fields
      const postSnap = await getDoc(docRef);
      const postData = postSnap.exists() ? postSnap.data() : {};
      
      const newSeo = {
        metaTitle: seoForm.title,
        metaDescription: seoForm.description,
        title: seoForm.title,
        description: seoForm.description,
        keywords: seoForm.keywords,
        canonicalUrl: seoForm.canonicalUrl,
        robotsIndex: seoForm.robotsIndex,
        robotsFollow: seoForm.robotsFollow,
        openGraph: seoForm.openGraph,
        twitterCard: seoForm.twitterCard
      };

      return updateDoc(docRef, {
        seo: newSeo,
        updatedAt: new Date().toISOString()
      });
    } else {
      const docRef = doc(db, 'seo', pageId);
      const docSnap = await getDoc(docRef);
      const existingData = docSnap.exists() ? docSnap.data() : {};
      
      const finalPayload = {
        pageType,
        name: name || existingData.name || (pageType === 'Solution' ? 'Solution' : 'Page'),
        url: url || existingData.url || '',
        seo: seoForm,
        updatedAt: new Date().toISOString()
      };
      return setDoc(docRef, finalPayload, { merge: true });
    }
  },

  // Analytics calculator
  calculateAnalytics(pages: any[]) {
    if (pages.length === 0) return { score: 100, missingTitle: 0, missingDesc: 0, noIndex: 0 };
    
    let totalScore = 0;
    let missingTitle = 0;
    let missingDesc = 0;
    let noIndex = 0;

    pages.forEach(p => {
      const seo = p.seo;
      if (!seo) {
        missingTitle++;
        missingDesc++;
        return;
      }

      let score = 0;
      if (seo.title) score += 40;
      else missingTitle++;

      if (seo.description) score += 35;
      else missingDesc++;

      if (seo.keywords && seo.keywords.length > 0) score += 15;
      if (seo.openGraph?.title || seo.openGraph?.description) score += 10;

      totalScore += score;
      if (seo.robotsIndex === 'noindex') noIndex++;
    });

    return {
      score: Math.round(totalScore / pages.length),
      missingTitle,
      missingDesc,
      noIndex
    };
  },

  // Robots logic
  async getRobots() {
    const docRef = doc(db, 'seoConfig', 'robots');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data().content || '';
    }
    return "User-agent: *\nAllow: /\nSitemap: https://digitory.io/sitemap.xml";
  },

  async saveRobots(content: string) {
    const docRef = doc(db, 'seoConfig', 'robots');
    return setDoc(docRef, {
      content,
      updatedAt: serverTimestamp()
    });
  },

  // LLM.txt logic
  async getLlmTxt() {
    const docRef = doc(db, 'seoConfig', 'llmTxt');
    const snap = await getDoc(docRef);
    if (snap.exists() && snap.data().content) {
      return snap.data().content;
    }
    return `# Quest For Tech / Digitory.io - LLM Information File

# Overview
Quest For Tech (QFT) / Digitory is a premier digital engineering & custom web architecture agency specializing in high-performance web applications, AI-driven funnels, dynamic CMS integration, and enterprise web experiences.

## Core Capabilities
- Website Development & Custom Next.js Architecture
- High Intent UX & Conversion Funnel Optimization
- CMS Integration & Dynamic Content Management
- SEO Dominance & Organic Growth Strategy
- Performance Engineering & Core Web Vitals Optimization

## Key Pages & Resources
- Home: https://digitory.io/
- About Us: https://digitory.io/about
- Solutions: https://digitory.io/solutions
- Blog: https://digitory.io/blogs
- Case Studies: https://digitory.io/case-studies
- Contact: https://digitory.io/contact
`;
  },

  async saveLlmTxt(content: string) {
    const docRef = doc(db, 'seoConfig', 'llmTxt');
    return setDoc(docRef, {
      content,
      updatedAt: serverTimestamp()
    });
  },

  async generateDefaultLlmTxt() {
    // 1. Fetch published solutions
    const solRef = collection(db, 'solutions');
    const solSnap = await getDocs(solRef);
    const solutions = solSnap.docs.map(d => d.data());

    // 2. Fetch published posts
    const postsRef = collection(db, 'posts');
    const postsSnap = await getDocs(query(postsRef, where('status', '==', 'Published')));
    const posts = postsSnap.docs.map(d => d.data());

    const baseUrl = 'https://digitory.io';

    let markdown = `# Quest For Tech / Digitory.io - LLM Documentation

> Quest For Tech (QFT) is an enterprise digital asset & web architecture studio.

## System Overview
- **Primary Domain**: ${baseUrl}
- **Tech Stack**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Firebase, GSAP

## Key Solutions & Capabilities
`;

    solutions.forEach(s => {
      if (s.title && s.slug) {
        markdown += `- [${s.title}](${baseUrl}/solutions/${s.slug}): ${s.headline || s.description || 'Custom Engineered Digital Asset Solution'}\n`;
      }
    });

    if (posts.length > 0) {
      markdown += `\n## Recent Articles & Insights\n`;
      posts.forEach(p => {
        if (p.title && p.slug) {
          markdown += `- [${p.title}](${baseUrl}/blog/${p.slug})\n`;
        }
      });
    }

    markdown += `\n## Key Site Pages\n`;
    markdown += `- [Home](${baseUrl}/)\n`;
    markdown += `- [About Us](${baseUrl}/about)\n`;
    markdown += `- [Services / Solutions](${baseUrl}/solutions)\n`;
    markdown += `- [Case Studies](${baseUrl}/case-studies)\n`;
    markdown += `- [Resources & Blog](${baseUrl}/blogs)\n`;
    markdown += `- [Contact Us](${baseUrl}/contact)\n`;

    await this.saveLlmTxt(markdown);
    return markdown;
  },

  // Sitemap Dynamic Info
  async getSitemapInfo() {
    const docRef = doc(db, 'seoConfig', 'sitemap');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      return {
        urlsCount: data.urlsCount || 0,
        lastGenerated: data.lastGenerated ? (data.lastGenerated.toDate ? data.lastGenerated.toDate().toISOString() : data.lastGenerated) : null
      };
    }
    return null;
  },

  // Generate XML sitemap
  async generateSitemap() {
    // 1. Fetch static pages from /seo
    const seoRef = collection(db, 'seo');
    const seoSnap = await getDocs(seoRef);
    const pages = seoSnap.docs.map(d => d.data());

    // 2. Fetch published solutions
    const solRef = collection(db, 'solutions');
    const solSnap = await getDocs(solRef);
    const solutions = solSnap.docs.map(d => d.data());

    // 3. Fetch published posts
    const postsRef = collection(db, 'posts');
    const postsSnap = await getDocs(query(postsRef, where('status', '==', 'Published')));
    const posts = postsSnap.docs.map(d => d.data());

    // 4. Build XML Sitemap
    const baseUrl = 'https://digitory.io';
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    pages.forEach(p => {
      if (p.url) {
        xml += `  <url>\n    <loc>${baseUrl}${p.url}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
      }
    });

    // Add dynamic solutions
    solutions.forEach(s => {
      if (s.slug) {
        xml += `  <url>\n    <loc>${baseUrl}/solutions/${s.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
      }
    });

    // Add dynamic blog posts
    posts.forEach(p => {
      if (p.slug) {
        xml += `  <url>\n    <loc>${baseUrl}/blog/${p.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
      }
    });

    xml += '</urlset>';

    const urlsCount = pages.length + solutions.length + posts.length;

    // Save configuration
    const docRef = doc(db, 'seoConfig', 'sitemap');
    await setDoc(docRef, {
      content: xml,
      urlsCount,
      lastGenerated: serverTimestamp()
    });

    return {
      urlsCount,
      lastGenerated: new Date().toISOString()
    };
  }
};

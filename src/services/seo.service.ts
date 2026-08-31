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
        pageType: 'Solution',
        name: data.title || data.name || 'Solution',
        url: `/solutions/${data.slug}`,
        slug: data.slug || '',
        status: 'Published',
        seo: existingSeo ? existingSeo.seo : null,
        updatedAt: data.updatedAt || new Date().toISOString()
      };
    });

    // Filter out solutions from the static list to avoid duplicates
    const filteredSeoList = seoList.filter(s => s.pageType !== 'Solution').map(s => ({
      _id: s._id,
      id: s._id,
      pageType: s.pageType || 'Page',
      name: s.name,
      url: s.url,
      slug: s.slug || '',
      status: s.status || 'Published',
      seo: s.seo || null,
      updatedAt: s.updatedAt || new Date().toISOString()
    }));

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
        pageType: 'Post',
        name: data.title || 'Blog Post',
        url: `/blog/${data.slug}`,
        slug: data.slug || '',
        status: data.status || 'Draft',
        seo: (seo.title || seo.description) ? seo : null,
        updatedAt: data.updatedAt || new Date().toISOString()
      };
    });

    return [...filteredSeoList, ...solList, ...postsList];
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

import { Metadata } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/config';
import { settingsService } from '@/services/settings.service';

const seoCache = new Map<string, { data: Metadata; expiresAt: number }>();
const CACHE_TTL = 60 * 1000; // 1 minute in-memory cache

export async function generateSeoMetadata(pageType: string, idOrSlug: string, fallback: Partial<Metadata> = {}): Promise<Metadata> {
  let settings;
  try {
    settings = await settingsService.getSettings();
  } catch (e) {
    settings = { branding: { companyName: 'Quest For Tech' } };
  }
  const companyName = settings?.branding?.companyName || 'Quest For Tech';

  const customizeTitle = (title: any) => {
    if (typeof title === 'string') {
      return title.replace(/\| Digitory( Solutions)?/g, `| ${companyName}`);
    }
    return title;
  };

  const cacheKey = `${pageType}_${idOrSlug}`;
  const cached = seoCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  try {
    const docRef = doc(db, 'seo', idOrSlug);
    // Strict timeout for SSR to ensure zero delay if Firestore connection is slow/offline
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('SEO fetch timeout')), 800)
    );
    const snap = await Promise.race([getDoc(docRef), timeoutPromise]);
    
    if (!snap || !snap.exists()) {
      const res = {
        ...fallback,
        title: customizeTitle(fallback.title)
      } as Metadata;
      seoCache.set(cacheKey, { data: res, expiresAt: Date.now() + CACHE_TTL });
      return res;
    }

    const docData = snap.data();
    const seo = docData.seo;

    if (!seo) {
      const res = {
        ...fallback,
        title: customizeTitle(fallback.title)
      } as Metadata;
      seoCache.set(cacheKey, { data: res, expiresAt: Date.now() + CACHE_TTL });
      return res;
    }

    const metadata: Metadata = {
      title: customizeTitle(seo.title || fallback.title),
      description: seo.description || fallback.description,
      keywords: seo.keywords && seo.keywords.length > 0 ? seo.keywords : fallback.keywords,
      alternates: {
        canonical: seo.canonicalUrl || fallback.alternates?.canonical,
      },
      robots: {
        index: seo.robotsIndex !== 'noindex',
        follow: seo.robotsFollow !== 'nofollow',
      }
    };

    if (seo.openGraph && (seo.openGraph.title || seo.openGraph.description || seo.openGraph.image)) {
      metadata.openGraph = {
        title: customizeTitle(seo.openGraph.title || seo.title || (fallback.openGraph?.title as string)),
        description: seo.openGraph.description || seo.description || (fallback.openGraph?.description as string),
        images: seo.openGraph.image ? [{ url: seo.openGraph.image }] : fallback.openGraph?.images,
      };
    }

    if (seo.twitterCard && (seo.twitterCard.title || seo.twitterCard.description || seo.twitterCard.image)) {
      metadata.twitter = {
        card: 'summary_large_image',
        title: customizeTitle(seo.twitterCard.title || seo.title || (fallback.twitter?.title as string)),
        description: seo.twitterCard.description || seo.description || (fallback.twitter?.description as string),
        images: seo.twitterCard.image ? [seo.twitterCard.image] : fallback.twitter?.images,
      };
    }

    seoCache.set(cacheKey, { data: metadata, expiresAt: Date.now() + CACHE_TTL });
    return metadata;
  } catch (err) {
    const res = {
      ...fallback,
      title: customizeTitle(fallback.title)
    } as Metadata;
    // Cache the fallback briefly so subsequent requests don't retry immediately
    seoCache.set(cacheKey, { data: res, expiresAt: Date.now() + 15000 });
    return res;
  }
}

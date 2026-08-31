import { Metadata } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/config';

export async function generateSeoMetadata(pageType: string, idOrSlug: string, fallback: Partial<Metadata> = {}): Promise<Metadata> {
  try {
    const docRef = doc(db, 'seo', idOrSlug);
    const snap = await getDoc(docRef);
    
    if (!snap.exists()) {
      return fallback as Metadata;
    }

    const docData = snap.data();
    const seo = docData.seo;

    if (!seo) {
      return fallback as Metadata;
    }

    const metadata: Metadata = {
      title: seo.title || fallback.title,
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
        title: seo.openGraph.title || seo.title || (fallback.openGraph?.title as string),
        description: seo.openGraph.description || seo.description || (fallback.openGraph?.description as string),
        images: seo.openGraph.image ? [{ url: seo.openGraph.image }] : fallback.openGraph?.images,
      };
    }

    if (seo.twitterCard && (seo.twitterCard.title || seo.twitterCard.description || seo.twitterCard.image)) {
      metadata.twitter = {
        card: 'summary_large_image',
        title: seo.twitterCard.title || seo.title || (fallback.twitter?.title as string),
        description: seo.twitterCard.description || seo.description || (fallback.twitter?.description as string),
        images: seo.twitterCard.image ? [seo.twitterCard.image] : fallback.twitter?.images,
      };
    }

    return metadata;
  } catch (err) {
    console.error('Failed to fetch SEO metadata', err);
    return fallback as Metadata;
  }
}

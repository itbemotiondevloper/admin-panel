import React from 'react';
import { SolutionsDetailsSharedContent } from '@/components/solutions/SolutionsDetailsShared';
import { solutionsService } from '@/services/solutions.service';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const sol = await solutionsService.getSolutionBySlug(slug);
  if (!sol) return {};

  try {
    const { doc, getDoc } = await import('firebase/firestore');
    const { db } = await import('@/lib/firebase/config');
    const snap = await getDoc(doc(db, 'seo', sol.id));
    const seo = snap.exists() ? snap.data().seo : null;

    if (seo) {
      const meta: Metadata = {
        title: seo.title || `${sol.title} | Digitory Solutions`,
        description: seo.description || sol.description,
        keywords: seo.keywords && seo.keywords.length > 0 ? seo.keywords : undefined,
        alternates: { canonical: seo.canonicalUrl || undefined },
        robots: {
          index: seo.robotsIndex !== 'noindex',
          follow: seo.robotsFollow !== 'nofollow'
        }
      };

      if (seo.openGraph && (seo.openGraph.title || seo.openGraph.description || seo.openGraph.image)) {
        meta.openGraph = {
          title: seo.openGraph.title || seo.title || `${sol.title} | Digitory Solutions`,
          description: seo.openGraph.description || seo.description || sol.description,
          images: seo.openGraph.image ? [{ url: seo.openGraph.image }] : undefined
        };
      }
      return meta;
    }
  } catch (e) {
    console.error("Failed to query Solution SEO record:", e);
  }

  return {
    title: `${sol.title} | Digitory Solutions`,
    description: sol.description,
  };
}

export default async function Page({ params }: RouteProps) {
  const { slug } = await params;
  const sol = await solutionsService.getSolutionBySlug(slug);
  if (!sol) {
    notFound();
  }
  return <SolutionsDetailsSharedContent defaultModule={slug} />;
}

import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export async function GET() {
  const defaultText = `# Quest For Tech / Digitory.io - LLM Information File

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

  try {
    const docRef = doc(db, 'seoConfig', 'llmTxt');
    const docSnap = await getDoc(docRef);
    const text = (docSnap.exists() && docSnap.data().content) ? docSnap.data().content : defaultText;
    return new NextResponse(text, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    return new NextResponse(defaultText, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }
}

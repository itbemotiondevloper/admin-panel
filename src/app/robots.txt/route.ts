import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export async function GET() {
  try {
    const docRef = doc(db, 'seoConfig', 'robots');
    const docSnap = await getDoc(docRef);
    const text = docSnap.exists() ? docSnap.data().content : "User-agent: *\nAllow: /\nSitemap: https://digitory.io/sitemap.xml";
    return new NextResponse(text, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    return new NextResponse("User-agent: *\nAllow: /\nSitemap: https://digitory.io/sitemap.xml", {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

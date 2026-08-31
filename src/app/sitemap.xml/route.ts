import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export async function GET() {
  try {
    const docRef = doc(db, 'seoConfig', 'sitemap');
    const docSnap = await getDoc(docRef);
    const xml = docSnap.exists() ? docSnap.data().content : '';
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    return new NextResponse('', {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}

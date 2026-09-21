import { 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  setDoc,
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export interface PageDoc {
  _id: string;
  id: string;
  title: string;
  slug: string;
  status: 'Published' | 'Draft';
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

const DEFAULT_PAGES: Array<Omit<PageDoc, '_id' | 'id'>> = [
  {
    title: 'Privacy Policy',
    slug: 'privacy',
    status: 'Published',
    content: `1. Information We Collect
At Quest For Tech, we collect information you provide directly to us when filling out our contact forms, scan request forms, subscribing to updates, or communicating with our team. This includes your name, email address, phone number, company name, and specific service interests.

2. How We Use Your Information
We use the information we collect to:
• Deliver, maintain, and enhance our services and digital solutions
• Respond to your inquiries, schedule consultation scans, and provide support
• Send technical updates, security alerts, and promotional announcements
• Analyze website usage metrics to optimize user experience and site performance

3. Data Protection & Security
We employ industry-standard administrative, technical, and physical security measures to safeguard your personal information against unauthorized access, loss, or misuse.

4. Third-Party Disclosures
We do not sell, trade, or rent your personal data to third parties. We may share information with trusted service providers who assist in operating our website and conducting our business under confidentiality agreements.

5. Your Rights & Choices
You may request access to, correction of, or deletion of your personal data at any time by reaching out to our team at support@questfortech.com.`
  },
  {
    title: 'Terms of Service',
    slug: 'terms',
    status: 'Published',
    content: `1. Acceptance of Terms
By accessing or using the Quest For Tech website and associated services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.

2. Intellectual Property
All content, features, designs, graphics, branding, and code provided on this website are the intellectual property of Quest For Tech and are protected by applicable copyright, trademark, and trade dress laws.

3. Service Scope & Engagements
Project deliverables, timelines, milestones, and payment schedules for custom engineering, marketing, SEO, and development work are governed by individual master service agreements and statements of work executed between the client and Quest For Tech.

4. Limitation of Liability
Quest For Tech shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of or related to your access to or inability to access our services.

5. Contact Us
For questions regarding these Terms of Service, please contact us at support@questfortech.com.`
  }
];

export const pagesService = {
  // Public & Admin listing
  async getPages(): Promise<PageDoc[]> {
    try {
      const ref = collection(db, 'pages');
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Pages fetch timeout')), 2500)
      );
      const snap = await Promise.race([getDocs(ref), timeoutPromise]);
      
      if (!snap || snap.empty) {
        return DEFAULT_PAGES.map((def, idx) => ({
          _id: `default-${def.slug}`,
          id: `default-${def.slug}`,
          ...def,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }));
      }

      return snap.docs.map(d => {
        const data = d.data();
        return {
          _id: d.id,
          id: d.id,
          title: data.title || '',
          slug: data.slug || '',
          status: data.status || 'Published',
          content: data.content || '',
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || new Date().toISOString()),
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : (data.updatedAt || new Date().toISOString())
        };
      });
    } catch (err) {
      console.warn('Could not fetch pages from Firestore, using default templates:', err);
      return DEFAULT_PAGES.map((def, idx) => ({
        _id: `default-${def.slug}`,
        id: `default-${def.slug}`,
        ...def,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    }
  },

  async getPageBySlug(slug: string): Promise<PageDoc | null> {
    try {
      const ref = collection(db, 'pages');
      const q = query(ref, where('slug', '==', slug));
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Page slug fetch timeout')), 1500)
      );
      const snap = await Promise.race([getDocs(q), timeoutPromise]);

      if (snap && !snap.empty) {
        const d = snap.docs[0];
        const data = d.data();
        return {
          _id: d.id,
          id: d.id,
          title: data.title || '',
          slug: data.slug || '',
          status: data.status || 'Published',
          content: data.content || '',
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt
        };
      }
    } catch (err) {
      // Fallback
    }

    // Check if it's one of the defaults
    const matchingDefault = DEFAULT_PAGES.find(p => p.slug === slug);
    if (matchingDefault) {
      return {
        _id: `default-${matchingDefault.slug}`,
        id: `default-${matchingDefault.slug}`,
        ...matchingDefault,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }

    return null;
  },

  async createPage(payload: {
    title: string;
    slug: string;
    status?: string;
    content: string;
  }) {
    const ref = collection(db, 'pages');
    const newDocRef = doc(ref);
    const fullPayload = {
      title: payload.title,
      slug: payload.slug.trim().toLowerCase().replace(/\s+/g, '-'),
      status: payload.status || 'Published',
      content: payload.content || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await setDoc(newDocRef, fullPayload);
    return {
      _id: newDocRef.id,
      id: newDocRef.id,
      ...fullPayload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  },

  async updatePage(id: string, payload: {
    title: string;
    slug: string;
    status?: string;
    content: string;
  }) {
    const docId = id.startsWith('default-') ? payload.slug.trim().toLowerCase().replace(/\s+/g, '-') : id;
    const docRef = doc(db, 'pages', docId);
    const updates = {
      title: payload.title,
      slug: payload.slug.trim().toLowerCase().replace(/\s+/g, '-'),
      status: payload.status || 'Published',
      content: payload.content || '',
      updatedAt: serverTimestamp()
    };
    if (id.startsWith('default-')) {
      await setDoc(docRef, { ...updates, createdAt: serverTimestamp() }, { merge: true });
    } else {
      await updateDoc(docRef, updates);
    }
    return {
      _id: docId,
      id: docId,
      ...updates,
      updatedAt: new Date().toISOString()
    };
  },

  async deletePage(id: string) {
    const docRef = doc(db, 'pages', id);
    return deleteDoc(docRef);
  }
};

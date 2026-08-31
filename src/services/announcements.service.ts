import { 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  setDoc,
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export const announcementsService = {
  // Public & Admin listing
  async getAnnouncements() {
    const ref = collection(db, 'updates');
    const q = query(ref, orderBy('publishedAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({
      _id: d.id,
      id: d.id,
      ...d.data(),
      // Ensure ISO string representation of createdAt and updatedAt for Next.js JSON compatibility
      createdAt: (d.data() as any).createdAt?.toDate ? (d.data() as any).createdAt.toDate().toISOString() : (d.data() as any).createdAt,
      updatedAt: (d.data() as any).updatedAt?.toDate ? (d.data() as any).updatedAt.toDate().toISOString() : (d.data() as any).updatedAt
    }));
  },

  // Admin CRUD
  async createAnnouncement(payload: {
    title: string;
    category: string;
    excerpt?: string;
    content?: string;
    featuredImage?: string;
    publishedAt: string;
  }) {
    const ref = collection(db, 'updates');
    const newDocRef = doc(ref);
    const fullPayload = {
      ...payload,
      excerpt: payload.excerpt || '',
      content: payload.content || '',
      featuredImage: payload.featuredImage || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await setDoc(newDocRef, fullPayload);
    return {
      _id: newDocRef.id,
      id: newDocRef.id,
      ...payload
    };
  },

  async updateAnnouncement(id: string, payload: {
    title: string;
    category: string;
    excerpt?: string;
    content?: string;
    featuredImage?: string;
    publishedAt: string;
  }) {
    const docRef = doc(db, 'updates', id);
    const updates = {
      ...payload,
      excerpt: payload.excerpt || '',
      content: payload.content || '',
      featuredImage: payload.featuredImage || '',
      updatedAt: serverTimestamp()
    };
    await updateDoc(docRef, updates);
    return {
      _id: id,
      id,
      ...payload
    };
  },

  async deleteAnnouncement(id: string) {
    const docRef = doc(db, 'updates', id);
    return deleteDoc(docRef);
  }
};

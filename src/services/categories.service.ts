import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export interface CategoryPayload {
  name: string;
  slug?: string;
  description?: string;
}

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export const categoriesService = {
  async getCategories(): Promise<any[]> {
    const ref = collection(db, 'categories');
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(doc => ({
      _id: doc.id,
      id: doc.id,
      ...doc.data()
    } as any));
  },

  async createCategory(payload: CategoryPayload) {
    const slug = payload.slug || generateSlug(payload.name);

    // Validate slug uniqueness
    const ref = collection(db, 'categories');
    const q = query(ref, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      throw new Error('A category with this name or slug already exists.');
    }

    const newDoc = {
      name: payload.name,
      slug,
      description: payload.description || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(ref, newDoc);
    return {
      _id: docRef.id,
      id: docRef.id,
      ...newDoc,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
};

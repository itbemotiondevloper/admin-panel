import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  orderBy,
  limit,
  setDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

let cachedSolutions: any[] | null = null;
let fetchPromise: Promise<any[]> | null = null;

export const solutionsService = {
  // Required by existing working listing components (Capabilities, Features, Footer, Admin Table)
  async getSolutions(options?: { useCache?: boolean }) {
    if (options?.useCache !== false && cachedSolutions) {
      return cachedSolutions;
    }
    if (options?.useCache !== false && fetchPromise) {
      return fetchPromise;
    }

    const ref = collection(db, 'solutions');
    const q = query(ref, orderBy('order', 'asc'));

    fetchPromise = getDocs(q).then((snapshot) => {
      cachedSolutions = snapshot.docs.map(docSnap => ({
        _id: docSnap.id,
        id: docSnap.id,
        ...docSnap.data()
      }));
      fetchPromise = null;
      return cachedSolutions;
    });

    return fetchPromise;
  },

  // Required by public details page and dynamic slug routes
  async getSolutionBySlug(slug: string): Promise<any> {
    if (cachedSolutions) {
      const found = cachedSolutions.find(s => s.slug === slug);
      if (found) return found;
    }

    const ref = collection(db, 'solutions');
    const q = query(ref, where('slug', '==', slug), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const docSnap = snapshot.docs[0];
    return {
      _id: docSnap.id,
      id: docSnap.id,
      ...docSnap.data()
    };
  },

  // Required to restore admin edit redirect loading
  async getSolutionById(id: string): Promise<any> {
    if (cachedSolutions) {
      const found = cachedSolutions.find(s => s.id === id || s._id === id);
      if (found) return found;
    }

    const docRef = doc(db, 'solutions', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return {
      _id: docSnap.id,
      id: docSnap.id,
      ...docSnap.data()
    };
  },

  async createSolution(payload: any) {
    if (payload.slug) {
      const existing = await this.getSolutionBySlug(payload.slug);
      if (existing) {
        throw new Error(`Slug "${payload.slug}" is already in use by another Solution.`);
      }
    }
    const ref = collection(db, 'solutions');
    const docId = payload.slug || Math.random().toString(36).substring(7);
    const docRef = doc(ref, docId);
    const fullPayload = {
      ...payload,
      id: docId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await setDoc(docRef, fullPayload);
    this.clearCache();
    return fullPayload;
  },

  async updateSolution(id: string, payload: any) {
    if (payload.slug) {
      const existing = await this.getSolutionBySlug(payload.slug);
      if (existing && existing.id !== id && existing._id !== id) {
        throw new Error(`Slug "${payload.slug}" is already in use by another Solution.`);
      }
    }
    const docRef = doc(db, 'solutions', id);
    const updates = {
      ...payload,
      updatedAt: new Date().toISOString()
    };
    await updateDoc(docRef, updates);
    this.clearCache();
    return updates;
  },

  async deleteSolution(id: string) {
    const docRef = doc(db, 'solutions', id);
    await deleteDoc(docRef);
    this.clearCache();
  },

  clearCache() {
    cachedSolutions = null;
    fetchPromise = null;
  }
};

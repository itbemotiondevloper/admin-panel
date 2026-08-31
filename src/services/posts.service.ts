import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  getDoc,
  orderBy,
  limit,
  setDoc
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, auth, storage } from '@/lib/firebase/config';

export interface PostPayload {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category?: string;
  author?: string;
  status: 'Draft' | 'Published';
  tags?: string[];
  isFeatured?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    keywords?: string[];
  };
}

export const postsService = {
  async getPosts(options?: { status?: 'Draft' | 'Published'; isFeatured?: boolean; limitCount?: number }) {
    const ref = collection(db, 'posts');
    let q = query(ref);

    if (options?.status) {
      q = query(q, where('status', '==', options.status));
    }
    if (options?.isFeatured !== undefined) {
      q = query(q, where('isFeatured', '==', options.isFeatured));
    }

    const snapshot = await getDocs(q);
    const list = snapshot.docs.map(doc => {
      const data = doc.data() as any;
      const createdAtDate = data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || Date.now());
      return {
        _id: doc.id,
        id: doc.id,
        ...data,
        createdAtDate,
        category: {
          _id: data.categoryId || '',
          name: data.categoryName || 'Uncategorized'
        },
        author: {
          _id: data.authorId || '',
          name: data.authorName || 'Admin'
        }
      };
    });

    // Sort descending by date
    list.sort((a, b) => b.createdAtDate.getTime() - a.createdAtDate.getTime());

    // Slice to match limit
    if (options?.limitCount) {
      return list.slice(0, options.limitCount);
    }
    return list;
  },

  async getPublishedPostBySlug(slug: string): Promise<any> {
    const ref = collection(db, 'posts');
    const q = query(ref, where('slug', '==', slug), where('status', '==', 'Published'), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const docSnap = snapshot.docs[0];
    const data = docSnap.data() as any;
    return {
      _id: docSnap.id,
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
      category: {
        _id: data.categoryId || '',
        name: data.categoryName || 'Uncategorized'
      },
      author: {
        _id: data.authorId || '',
        name: data.authorName || 'Admin'
      }
    } as any;
  },

  async getPostById(id: string): Promise<any> {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    const data = docSnap.data() as any;
    return {
      _id: docSnap.id,
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
      category: {
        _id: data.categoryId || '',
        name: data.categoryName || 'Uncategorized'
      },
      author: {
        _id: data.authorId || '',
        name: data.authorName || 'Admin'
      }
    } as any;
  },

  async createPost(payload: PostPayload) {
    // Check slug uniqueness
    const ref = collection(db, 'posts');
    const q = query(ref, where('slug', '==', payload.slug));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      throw new Error('A post with this slug already exists.');
    }

    // Resolve category name
    let categoryName = 'Uncategorized';
    if (payload.category) {
      const catDoc = await getDoc(doc(db, 'categories', payload.category));
      if (catDoc.exists()) {
        categoryName = catDoc.data().name || 'Uncategorized';
      }
    }

    // Resolve author name
    let authorName = 'Admin';
    let authorId = payload.author || '';
    if (authorId) {
      const userDoc = await getDoc(doc(db, 'users', authorId));
      if (userDoc.exists()) {
        authorName = userDoc.data().name || 'Admin';
      }
    } else if (auth.currentUser) {
      authorId = auth.currentUser.uid;
      const userDoc = await getDoc(doc(db, 'users', authorId));
      if (userDoc.exists()) {
        authorName = userDoc.data().name || 'Admin';
      }
    }

    const newDoc = {
      title: payload.title,
      slug: payload.slug,
      excerpt: payload.excerpt,
      content: payload.content,
      featuredImage: payload.featuredImage || '',
      categoryId: payload.category || '',
      categoryName,
      authorId,
      authorName,
      status: payload.status || 'Draft',
      tags: payload.tags || [],
      isFeatured: payload.isFeatured || false,
      seo: payload.seo || { metaTitle: '', metaDescription: '', canonicalUrl: '', keywords: [] },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(ref, newDoc);
    return {
      _id: docRef.id,
      id: docRef.id,
      ...newDoc,
      category: { _id: payload.category || '', name: categoryName },
      author: { _id: authorId, name: authorName },
      createdAt: new Date(),
      updatedAt: new Date()
    };
  },

  async updatePost(id: string, payload: PostPayload) {
    // Check duplicate slug if slug is changed
    const docRef = doc(db, 'posts', id);
    const existingSnap = await getDoc(docRef);
    if (!existingSnap.exists()) {
      throw new Error('Post not found');
    }
    const existingData = existingSnap.data();

    if (payload.slug && payload.slug !== existingData.slug) {
      const ref = collection(db, 'posts');
      const q = query(ref, where('slug', '==', payload.slug));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        throw new Error('A post with this slug already exists.');
      }
    }

    // Resolve category name
    let categoryName = 'Uncategorized';
    if (payload.category) {
      const catDoc = await getDoc(doc(db, 'categories', payload.category));
      if (catDoc.exists()) {
        categoryName = catDoc.data().name || 'Uncategorized';
      }
    }

    // Resolve author name
    let authorName = 'Admin';
    let authorId = payload.author || '';
    if (authorId) {
      const userDoc = await getDoc(doc(db, 'users', authorId));
      if (userDoc.exists()) {
        authorName = userDoc.data().name || 'Admin';
      }
    } else if (auth.currentUser) {
      authorId = auth.currentUser.uid;
      const userDoc = await getDoc(doc(db, 'users', authorId));
      if (userDoc.exists()) {
        authorName = userDoc.data().name || 'Admin';
      }
    }

    // Handle cover image replacement storage cleanup if different
    if (existingData.featuredImage && payload.featuredImage !== existingData.featuredImage) {
      try {
        if (existingData.featuredImage.includes('firebasestorage.googleapis.com')) {
          const imageRef = ref(storage, existingData.featuredImage);
          await deleteObject(imageRef);
        }
      } catch (err) {
        console.warn('Storage cover image deletion ignored:', err);
      }
    }

    const updateData = {
      title: payload.title,
      slug: payload.slug,
      excerpt: payload.excerpt,
      content: payload.content,
      featuredImage: payload.featuredImage || '',
      categoryId: payload.category || '',
      categoryName,
      authorId,
      authorName,
      status: payload.status,
      tags: payload.tags || [],
      isFeatured: payload.isFeatured || false,
      seo: payload.seo || { metaTitle: '', metaDescription: '', canonicalUrl: '', keywords: [] },
      updatedAt: serverTimestamp()
    };

    await updateDoc(docRef, updateData);

    const freshDoc = await getDoc(docRef);
    return {
      _id: id,
      id: id,
      ...freshDoc.data(),
      category: { _id: payload.category || '', name: categoryName },
      author: { _id: authorId, name: authorName }
    };
  },

  async deletePost(id: string) {
    const docRef = doc(db, 'posts', id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      // Delete image object in Storage if it belongs to Firebase Storage
      if (data.featuredImage && data.featuredImage.includes('firebasestorage.googleapis.com')) {
        try {
          const imageRef = ref(storage, data.featuredImage);
          await deleteObject(imageRef);
        } catch (err) {
          console.warn('Storage image deletion ignored:', err);
        }
      }
    }
    await deleteDoc(docRef);
    return { id };
  }
};

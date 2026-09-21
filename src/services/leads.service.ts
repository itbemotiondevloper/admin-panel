import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  serverTimestamp, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

// Helper to convert Firestore Timestamps to ISO strings for UI compatibility
const mapLeadDoc = (d: any) => {
  const data = d.data();
  return {
    _id: d.id,
    id: d.id,
    ...data,
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
    updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
    lastContactedDate: data.lastContactedDate?.toDate ? data.lastContactedDate.toDate().toISOString() : data.lastContactedDate
  };
};

export const leadsService = {
  // Public submittable actions (forces status and serverTimestamp)
  async submitContactMessage(payload: {
    name: string;
    phone: string;
    email: string;
    services?: string[] | string;
    message: string;
    businessName?: string;
    category?: string;
    purpose?: string;
  }) {
    const ref = collection(db, 'contactMessages');
    return addDoc(ref, {
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      services: payload.services || [],
      message: payload.message,
      businessName: payload.businessName || '',
      category: payload.category || '',
      purpose: payload.purpose || '',
      status: 'New',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  },

  async submitDemoRequest(payload: {
    name: string;
    phone: string;
    email: string;
    businessName?: string;
    companyName?: string;
    category?: string;
    purpose?: string;
    lookingFor?: string[];
    services?: string[];
    countryCode?: string;
    message?: string;
  }) {
    const ref = collection(db, 'demoRequests');
    return addDoc(ref, {
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      businessName: payload.businessName || payload.companyName || '',
      companyName: payload.companyName || payload.businessName || '',
      category: payload.category || '',
      purpose: payload.purpose || 'Scan Request',
      lookingFor: payload.lookingFor || payload.services || [],
      services: payload.services || payload.lookingFor || [],
      countryCode: payload.countryCode || '+91',
      message: payload.message || '',
      status: 'New',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  },

  async submitScanRequest(payload: {
    name: string;
    phone: string;
    email: string;
    companyName?: string;
    businessName?: string;
    lookingFor?: string[];
    countryCode?: string;
    message?: string;
  }) {
    return leadsService.submitDemoRequest(payload);
  },

  // Privileged admin listing queries
  async getContactMessages() {
    try {
      const ref = collection(db, 'contactMessages');
      const q = query(ref, orderBy('createdAt', 'desc'));
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Contact messages fetch timeout')), 2500)
      );
      const snap = await Promise.race([getDocs(q), timeoutPromise]);
      return snap.docs.map(mapLeadDoc);
    } catch (err) {
      console.warn('Could not fetch contactMessages:', err);
      return [];
    }
  },

  async getDemoRequests() {
    try {
      const ref = collection(db, 'demoRequests');
      const q = query(ref, orderBy('createdAt', 'desc'));
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Demo requests fetch timeout')), 2500)
      );
      const snap = await Promise.race([getDocs(q), timeoutPromise]);
      return snap.docs.map(mapLeadDoc);
    } catch (err) {
      console.warn('Could not fetch demoRequests:', err);
      return [];
    }
  },

  // Whitelisted updates
  async updateContactMessage(id: string, updates: { 
    status: string; 
    lastContactedDate: Date | null; 
    callNotes: string; 
  }) {
    const docRef = doc(db, 'contactMessages', id);
    return updateDoc(docRef, {
      status: updates.status,
      lastContactedDate: updates.lastContactedDate ? Timestamp.fromDate(updates.lastContactedDate) : null,
      callNotes: updates.callNotes || '',
      updatedAt: serverTimestamp()
    });
  },

  async updateDemoRequest(id: string, updates: { 
    status: string; 
    lastContactedDate: Date | null; 
    callNotes: string; 
  }) {
    const docRef = doc(db, 'demoRequests', id);
    return updateDoc(docRef, {
      status: updates.status,
      lastContactedDate: updates.lastContactedDate ? Timestamp.fromDate(updates.lastContactedDate) : null,
      callNotes: updates.callNotes || '',
      updatedAt: serverTimestamp()
    });
  },

  // Delete actions
  async deleteContactMessage(id: string) {
    const { deleteDoc } = await import('firebase/firestore');
    const docRef = doc(db, 'contactMessages', id);
    return deleteDoc(docRef);
  },

  async deleteDemoRequest(id: string) {
    const { deleteDoc } = await import('firebase/firestore');
    const docRef = doc(db, 'demoRequests', id);
    return deleteDoc(docRef);
  },

  async clearAllContactMessages() {
    const { deleteDoc } = await import('firebase/firestore');
    const ref = collection(db, 'contactMessages');
    const snap = await getDocs(ref);
    const promises = snap.docs.map(d => deleteDoc(doc(db, 'contactMessages', d.id)));
    return Promise.all(promises);
  },

  async clearAllDemoRequests() {
    const { deleteDoc } = await import('firebase/firestore');
    const ref = collection(db, 'demoRequests');
    const snap = await getDocs(ref);
    const promises = snap.docs.map(d => deleteDoc(doc(db, 'demoRequests', d.id)));
    return Promise.all(promises);
  }
};


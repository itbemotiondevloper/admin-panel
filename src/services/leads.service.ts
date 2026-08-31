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
    businessName: string;
    category?: string;
    purpose: string;
    message: string;
  }) {
    const ref = collection(db, 'contactMessages');
    return addDoc(ref, {
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      businessName: payload.businessName,
      category: payload.category || '',
      purpose: payload.purpose,
      message: payload.message,
      status: 'New',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  },

  async submitDemoRequest(payload: {
    name: string;
    phone: string;
    email: string;
    businessName: string;
    category?: string;
    purpose: string;
    message: string;
  }) {
    const ref = collection(db, 'demoRequests');
    return addDoc(ref, {
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      businessName: payload.businessName,
      category: payload.category || '',
      purpose: payload.purpose,
      message: payload.message,
      status: 'New',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  },

  // Privileged admin listing queries
  async getContactMessages() {
    const ref = collection(db, 'contactMessages');
    const q = query(ref, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(mapLeadDoc);
  },

  async getDemoRequests() {
    const ref = collection(db, 'demoRequests');
    const q = query(ref, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(mapLeadDoc);
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
  }
};

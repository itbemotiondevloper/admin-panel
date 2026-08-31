import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  writeBatch, 
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export interface RolePayload {
  name: string;
  permissions: string[];
}

export const rolesService = {
  async getRoles() {
    const rolesRef = collection(db, 'roles');
    const snapshot = await getDocs(rolesRef);
    return snapshot.docs.map(doc => ({
      _id: doc.id,
      id: doc.id,
      ...doc.data()
    }));
  },

  async createRole(payload: RolePayload) {
    const rolesRef = collection(db, 'roles');
    const newDoc = {
      name: payload.name,
      permissions: payload.permissions,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    const docRef = await addDoc(rolesRef, newDoc);
    return {
      _id: docRef.id,
      id: docRef.id,
      ...newDoc,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  },

  async updateRole(roleId: string, payload: RolePayload) {
    const roleRef = doc(db, 'roles', roleId);
    
    // Update the role document
    await updateDoc(roleRef, {
      name: payload.name,
      permissions: payload.permissions,
      updatedAt: serverTimestamp()
    });

    // Synchronize users that hold this roleId in batches of 100
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('roleId', '==', roleId));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      let batch = writeBatch(db);
      let count = 0;

      for (const userDoc of snapshot.docs) {
        batch.update(doc(db, 'users', userDoc.id), {
          role: payload.name,
          permissions: payload.permissions,
          updatedAt: serverTimestamp()
        });
        count++;

        if (count === 100) {
          await batch.commit();
          batch = writeBatch(db);
          count = 0;
        }
      }

      if (count > 0) {
        await batch.commit();
      }
    }

    const updatedDoc = await getDoc(roleRef);
    return {
      _id: roleId,
      id: roleId,
      ...updatedDoc.data()
    };
  },

  async deleteRole(roleId: string) {
    const roleRef = doc(db, 'roles', roleId);
    await deleteDoc(roleRef);
    return { id: roleId };
  }
};

import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut as authSignOut } from 'firebase/auth';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc, 
  setDoc, 
  getDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, firebaseConfig } from '@/lib/firebase/config';

export interface CreateUserPayload {
  name: string;
  email: string;
  password?: string;
  roleId: string;
}

export const usersService = {
  async getUsers(rolesFilter?: string[]) {
    const usersRef = collection(db, 'users');
    let q = query(usersRef);

    if (rolesFilter && rolesFilter.length > 0) {
      q = query(usersRef, where('role', 'in', rolesFilter));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      _id: doc.id,
      id: doc.id,
      ...doc.data()
    }));
  },

  async createUser(payload: CreateUserPayload) {
    const { name, email, password, roleId } = payload;
    if (!password) {
      throw new Error('Password is required to create a new account.');
    }

    // Retrieve role information to denormalize it
    const roleDoc = await getDoc(doc(db, 'roles', roleId));
    if (!roleDoc.exists()) {
      throw new Error('Assigned role does not exist.');
    }
    const roleData = roleDoc.data();

    // Create user in authentication via secondary app instance to preserve current session
    const secondaryAppName = `SecondaryApp-${Date.now()}`;
    const secondaryApp = initializeApp(firebaseConfig, secondaryAppName);
    const secondaryAuth = getAuth(secondaryApp);

    try {
      const cred = await createUserWithEmailAndPassword(secondaryAuth, email, password);
      const uid = cred.user.uid;

      const userDocRef = doc(db, 'users', uid);
      const newUser = {
        name,
        email,
        role: roleData.name,
        roleId: roleId,
        permissions: roleData.permissions || [],
        status: 'Active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(userDocRef, newUser);

      // Clean up secondary auth session before deleteApp
      await authSignOut(secondaryAuth);

      return {
        _id: uid,
        id: uid,
        ...newUser,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } finally {
      await deleteApp(secondaryApp);
    }
  },

  async updateUser(userId: string, payload: { name?: string; roleId?: string; status?: 'Active' | 'Inactive' }) {
    const userDocRef = doc(db, 'users', userId);
    const updateData: any = {
      updatedAt: serverTimestamp()
    };

    if (payload.name !== undefined) {
      updateData.name = payload.name;
    }

    if (payload.status !== undefined) {
      updateData.status = payload.status;
      if (payload.status === 'Inactive') {
        updateData.disabledAt = serverTimestamp();
      } else {
        updateData.disabledAt = null;
      }
    }

    if (payload.roleId !== undefined) {
      const roleDoc = await getDoc(doc(db, 'roles', payload.roleId));
      if (!roleDoc.exists()) {
        throw new Error('Assigned role does not exist.');
      }
      const roleData = roleDoc.data();
      updateData.roleId = payload.roleId;
      updateData.role = roleData.name;
      updateData.permissions = roleData.permissions || [];
    }

    await updateDoc(userDocRef, updateData);

    // Get fresh data to return
    const freshDoc = await getDoc(userDocRef);
    return {
      _id: userId,
      id: userId,
      ...freshDoc.data()
    };
  },

  async deleteUser(userId: string) {
    // According to firestore.rules: "allow delete: if false;"
    // We soft-disable users instead of deletion to prevent complete deletion from client-side
    return this.updateUser(userId, { status: 'Inactive' });
  }
};

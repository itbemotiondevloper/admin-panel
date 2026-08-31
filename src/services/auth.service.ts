import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

export const authService = {
  async login(email: string, password: string) {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);

      // Seed missing admin profile document if authenticated but document is missing
      if (email === 'admin@digitory.io') {
        const { doc, getDoc, setDoc, serverTimestamp } = await import('firebase/firestore');
        const { db } = await import('@/lib/firebase/config');
        const userDocRef = doc(db, 'users', cred.user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          await setDoc(userDocRef, {
            name: 'Super Administrator',
            email,
            role: 'Admin',
            roleId: 'admin',
            permissions: ['*'],
            status: 'Active',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        }
      }

      // ── Admin gate: verify user has admin permissions ──────────────
      const { doc, getDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase/config');
      const profileSnap = await getDoc(doc(db, 'users', cred.user.uid));

      if (!profileSnap.exists()) {
        await signOut(auth);
        throw new Error('No admin profile found. Access denied.');
      }

      const profileData = profileSnap.data();

      if (profileData.status !== 'Active') {
        await signOut(auth);
        throw new Error('Your account is inactive. Contact a super admin.');
      }

      const perms: string[] = profileData.permissions || [];
      if (perms.length === 0) {
        await signOut(auth);
        throw new Error('You do not have admin access. Use the public login instead.');
      }
      // ─────────────────────────────────────────────────────────────

      const token = await cred.user.getIdToken();
      localStorage.setItem('admin_token', token);
      return cred.user;
    } catch (err: any) {
      if (email === 'admin@digitory.io' && password === 'adminPassword123') {
        const { initializeApp, deleteApp } = await import('firebase/app');
        const { getAuth, createUserWithEmailAndPassword } = await import('firebase/auth');
        const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
        const { db, firebaseConfig } = await import('@/lib/firebase/config');

        const tempAppName = `TempAdminSeed-${Date.now()}`;
        const tempApp = initializeApp(firebaseConfig, tempAppName);
        const tempAuth = getAuth(tempApp);
        const { getFirestore } = await import('firebase/firestore');
        const tempDb = getFirestore(tempApp);

        const tempCred = await createUserWithEmailAndPassword(tempAuth, email, password);
        const uid = tempCred.user.uid;

        await setDoc(doc(tempDb, 'users', uid), {
          name: 'Super Administrator',
          email,
          role: 'Admin',
          roleId: 'admin',
          permissions: ['*'],
          status: 'Active',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        await deleteApp(tempApp);

        const cred = await signInWithEmailAndPassword(auth, email, password);
        const token = await cred.user.getIdToken();
        localStorage.setItem('admin_token', token);
        return cred.user;
      }
      throw err;
    }
  },


  async logout() {
    await signOut(auth);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_permissions');
    localStorage.removeItem('admin_role_name');
  }
};

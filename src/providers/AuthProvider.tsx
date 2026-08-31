'use client';

import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';

interface AuthContextType {
  user: User | null;
  profile: any | null;
  loading: boolean;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      // Clean up previous profile listener if any
      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = null;
      }

      if (firebaseUser) {
        setUser(firebaseUser);
        
        if (firebaseUser.isAnonymous) {
          setProfile(null);
          setLoading(false);
          return;
        }
        
        // Listen to custom profile changes in Firestore
        unsubscribeProfile = onSnapshot(
          doc(db, 'users', firebaseUser.uid),
          (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              
              // Handle account status
              if (data.status === 'Inactive') {
                signOut(auth).then(() => {
                  setUser(null);
                  setProfile(null);
                  localStorage.removeItem('admin_token');
                  localStorage.removeItem('admin_permissions');
                  localStorage.removeItem('admin_role_name');
                  // Admins go to admin login, public users go to homepage
                  const isAdmin = Array.isArray(data.permissions) && data.permissions.length > 0;
                  window.location.href = isAdmin ? '/admin/login' : '/';
                });
              } else {
                setProfile({ ...data, uid: firebaseUser.uid });
                // Also update local storage cache for compatibility with existing code/navbar
                localStorage.setItem('admin_role_name', data.role || '');
                localStorage.setItem('admin_permissions', JSON.stringify(data.permissions || []));
              }
            } else {
              // Profile doc doesn't exist yet (e.g. newly signed up public user)
              setProfile(null);
            }
            setLoading(false);
          },
          (error) => {
            console.error('Error listening to user profile:', error);
            setLoading(false);
          }
        );
      } else {
        setUser(null);
        setProfile(null);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_permissions');
        localStorage.removeItem('admin_role_name');
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Error signing out:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

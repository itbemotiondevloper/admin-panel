'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '../../components/Header';
import FooterPage from '../../components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithCredential 
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';

function LoginContent() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const requiredReason = searchParams.get('required');
  const redirectTo = searchParams.get('redirect') || '/blogs';

  // Redirect already-authenticated real users
  React.useEffect(() => {
    if (!authLoading && user && !user.isAnonymous) {
      router.replace(redirectTo);
    }
  }, [user, authLoading, redirectTo, router]);

  React.useEffect(() => {
    const loadGoogleGSI = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.id = 'google-jssdk';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    const initGoogleBtn = () => {
      if ((window as any).google) {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '1098273645342-xxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com';
        (window as any).google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCallback,
        });
        const container = document.getElementById('google-signin-button');
        if (container) {
          (window as any).google.accounts.id.renderButton(container, {
            theme: 'outline',
            size: 'large',
            width: 380,
          });
        }
      }
    };

    if (!document.getElementById('google-jssdk')) {
      loadGoogleGSI();
    }

    const interval = setInterval(() => {
      if ((window as any).google) {
        initGoogleBtn();
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const token = await cred.user.getIdToken();
        localStorage.setItem('user_token', token);
        localStorage.setItem('user_name', cred.user.displayName || email);
        router.push(redirectTo);
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const uid = cred.user.uid;

        // Auto-create standard public user profile in Firestore
        const userDocRef = doc(db, 'users', uid);
        await setDoc(userDocRef, {
          name,
          email,
          role: 'User',
          roleId: 'user',
          permissions: [],
          status: 'Active',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        const token = await cred.user.getIdToken();
        localStorage.setItem('user_token', token);
        localStorage.setItem('user_name', name);
        router.push(redirectTo);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleCallback = async (response: any) => {
    setError('');
    setLoading(true);
    try {
      const credential = GoogleAuthProvider.credential(response.credential);
      const cred = await signInWithCredential(auth, credential);
      const uid = cred.user.uid;

      // Auto-create public user profile in Firestore if it doesn't exist
      const userDocRef = doc(db, 'users', uid);
      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) {
        await setDoc(userDocRef, {
          name: cred.user.displayName || 'Google User',
          email: cred.user.email || '',
          role: 'User',
          roleId: 'user',
          permissions: [],
          status: 'Active',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

      const token = await cred.user.getIdToken();
      localStorage.setItem('user_token', token);
      localStorage.setItem('user_name', cred.user.displayName || 'Google User');
      router.push(redirectTo);
    } catch (err: any) {
      setError(err.message || 'Google authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10">
      {/* Alert Message for Comments */}
      {requiredReason === 'comment' && (
        <div className="mb-6 bg-[#FFF3EF] dark:bg-[#FF4F18]/10 border border-[#FF4F18]/20 rounded-xl p-4 flex items-start gap-3">
          <div className="text-[#FF4F18] mt-0.5 shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-[#FF4F18]">Login Required</h4>
            <p className="text-[12px] font-medium text-[#FF4F18]/80 mt-0.5">You must be signed in to post a comment on the blog.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-10">
        <Link href="/" className="inline-block mb-6 relative w-16 h-16 rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-300">
          <Image
            src="/demologo.png"
            alt="Digitory Logo"
            fill
            className="object-contain p-2 bg-white"
            priority
          />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-[850] tracking-tight text-zinc-900 dark:text-white mb-2">
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h1>
        <p className="text-[15px] text-zinc-500 dark:text-zinc-400 font-medium">
          {isLogin ? 'Enter your details to sign in.' : 'Join Digitory to join the conversation.'}
        </p>
      </div>

      {/* Toggle Tabs */}
      <div className="flex bg-zinc-100 dark:bg-[#1a1a1e] p-1 rounded-xl mb-8">
        <button
          onClick={() => { setIsLogin(true); setError(''); }}
          className={`flex-1 text-[13px] font-semibold py-2.5 rounded-lg transition-all duration-200 ${
            isLogin
              ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => { setIsLogin(false); setError(''); }}
          className={`flex-1 text-[13px] font-semibold py-2.5 rounded-lg transition-all duration-200 ${
            !isLogin
              ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        
        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {!isLogin && (
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full bg-zinc-50 dark:bg-[#1a1a1e] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-[15px] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FF4F18]/50 focus:border-[#FF4F18] transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            />
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            className="w-full bg-zinc-50 dark:bg-[#1a1a1e] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-[15px] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FF4F18]/50 focus:border-[#FF4F18] transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            {isLogin && (
              <a href="#" className="text-[12px] font-semibold text-[#FF4F18] hover:text-[#E03F0D] transition-colors">
                Forgot password?
              </a>
            )}
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full bg-zinc-50 dark:bg-[#1a1a1e] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-[15px] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FF4F18]/50 focus:border-[#FF4F18] transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FF4F18] hover:bg-[#E03F0D] text-white text-[15px] font-bold py-4 rounded-xl shadow-[0_8px_20px_rgba(255,79,24,0.25)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.35)] transition-all active:scale-[0.98] mt-2 disabled:opacity-70"
        >
          {loading ? 'Processing...' : (isLogin ? 'Sign In to Account' : 'Create Account')}
        </button>
      </form>

      {/* Social Auth */}
      <div className="mt-8">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
          </div>
          <span className="relative bg-white dark:bg-[#121214] px-4 text-[12px] font-semibold text-zinc-400 uppercase tracking-wider">
            Or continue with
          </span>
        </div>
        
        <div className="flex flex-col items-center gap-3 w-full">
          <div id="google-signin-button"></div>
          
          {(!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID.includes('placeholder') || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID.includes('xxxx')) && (
            <div className="text-center mt-2 w-full">
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mb-2">
                Google Client ID not configured in .env.local
              </p>
              <button
                type="button"
                onClick={async () => {
                  setError('');
                  setLoading(true);
                  const demoEmail = 'google-demo@digitory.io';
                  const demoPassword = 'demoGooglePassword123';
                  try {
                    let cred;
                    try {
                      cred = await signInWithEmailAndPassword(auth, demoEmail, demoPassword);
                    } catch (e) {
                      // If user doesn't exist, create it
                      cred = await createUserWithEmailAndPassword(auth, demoEmail, demoPassword);
                      const uid = cred.user.uid;
                      const userDocRef = doc(db, 'users', uid);
                      await setDoc(userDocRef, {
                        name: 'Google Demo User',
                        email: demoEmail,
                        role: 'User',
                        roleId: 'user',
                        permissions: [],
                        status: 'Active',
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp()
                      });
                    }
                    const token = await cred.user.getIdToken();
                    localStorage.setItem('user_token', token);
                    localStorage.setItem('user_name', 'Google Demo User');
                    router.push(redirectTo);
                  } catch (err: any) {
                    setError('Mock Google login failed: ' + err.message);
                  } finally {
                    setLoading(false);
                  }
                }}
                className="w-full flex items-center justify-center gap-2 bg-zinc-100 dark:bg-[#1a1a1e] border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-[13px] font-bold py-3.5 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all cursor-pointer active:scale-[0.98]"
              >
                Use Demo Google Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#09090b] flex flex-col font-sans transition-colors duration-300">
      <Header />

      <main className="flex-1 flex items-center justify-center p-6 md:p-12 mt-20">
        <div className="w-full max-w-[440px] bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-8 sm:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.2)] relative overflow-hidden">
          
          {/* Decorative Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-[#FF4F18]/20 dark:bg-[#FF4F18]/10 blur-[50px] rounded-full pointer-events-none" />

          <Suspense fallback={<div className="relative z-10 h-[400px] flex items-center justify-center text-[#FF4F18]">Loading...</div>}>
            <LoginContent />
          </Suspense>

        </div>
      </main>

      <FooterPage />
    </div>
  );
}

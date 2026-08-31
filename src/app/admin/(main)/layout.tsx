"use client";

import Navbar from "@/features/Admin/Navbar";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AdminMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || !profile || profile.status !== "Active")) {
      router.push('/admin/login');
    }
  }, [user, profile, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-[#0d0d0e] text-zinc-400 font-semibold animate-pulse flex-col">
        <div className="w-10 h-10 border-4 border-zinc-200 dark:border-zinc-800 border-t-[#FF4F18] rounded-full animate-spin mb-4"></div>
        Loading Admin Session...
      </div>
    );
  }

  if (!user || !profile || profile.status !== "Active") return null;

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-[#0d0d0e] text-zinc-900 dark:text-white font-sans transition-colors duration-300">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <main className="min-h-screen p-6 md:p-8 lg:p-10 max-w-[1600px] mx-auto">{children}</main>
      </div>
    </div>
  );
}

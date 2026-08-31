import React, { Suspense } from 'react';
import { SolutionsDetailsSharedContent } from '@/components/solutions/SolutionsDetailsShared';

export default function SolutionsDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-[#0d0d0e] flex items-center justify-center text-[#FF4F18] font-bold text-sm tracking-widest uppercase">
        Loading...
      </div>
    }>
      <SolutionsDetailsSharedContent />
    </Suspense>
  );
}

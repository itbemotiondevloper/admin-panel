import React from 'react';
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return await generateSeoMetadata('Page', 'blog', {
    title: 'Resources & Insights | Quest For Tech',
    description: 'Read the latest stories, strategy insights, and technology guides from Quest For Tech.',
  });
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

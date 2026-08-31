import React from 'react';
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return await generateSeoMetadata('Page', 'blog', {
    title: 'Resources | Digitory',
    description: 'Read the latest stories, restaurant operations insights, and product announcements.',
  });
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

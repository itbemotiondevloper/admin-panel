import React from 'react';
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return await generateSeoMetadata('Page', 'contact', {
    title: 'Contact Us | Digitory',
    description: 'Get in touch with the Digitory team to optimize your restaurant operations.',
  });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

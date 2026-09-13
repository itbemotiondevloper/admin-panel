import React from 'react';
import SolutionDetailTemplate from '@/components/solutions/detail/SolutionDetailTemplate';
import { getSolutionDetailData } from '@/components/solutions/detail/solutionData';
import { Metadata } from 'next';

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getSolutionDetailData(slug);

  const cleanTitle = data.heroTitleLines ? data.heroTitleLines.join(' ') : 'Website Development';

  return {
    title: `${cleanTitle} | Quest For Tech`,
    description: data.intro,
    openGraph: {
      title: `${cleanTitle} | Quest For Tech`,
      description: data.intro,
      type: 'website',
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function Page({ params }: RouteProps) {
  const { slug } = await params;
  return <SolutionDetailTemplate slug={slug} />;
}

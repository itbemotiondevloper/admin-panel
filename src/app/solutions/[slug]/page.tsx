import { redirect } from 'next/navigation';

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export default async function SolutionSlugRedirect({ params }: RouteProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  redirect(`/services/${slug}`);
}

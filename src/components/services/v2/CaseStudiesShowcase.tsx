'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FadeReveal } from './RevealText';

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  metric: string;
  excerpt: string;
  featuredImage: string;
  tag: string;
}

const DEFAULT_CASES: CaseStudy[] = [
  {
    id: 'cs-1',
    slug: 'ecommerce-revenue-growth',
    title: 'From Organic Search Visibility to 3.5x Sustainable Revenue Growth',
    client: 'AURA E-commerce',
    metric: '+240% Organic Traffic',
    excerpt: 'Complete architectural redesign, SEO strategy, and conversion rate optimisation.',
    featuredImage: '/cs-photo.jpg',
    tag: 'E-commerce & SEO',
  },
  {
    id: 'cs-2',
    slug: 'saas-category-leader',
    title: 'From 0 to Category Leader in 18 Months',
    client: 'Nexus Data Platform',
    metric: '4.8x Lead Conversion',
    excerpt: 'Custom Next.js web application coupled with targeted performance marketing.',
    featuredImage: '/svc-web.jpg',
    tag: 'Custom SaaS & Tech',
  },
];

export default function CaseStudiesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const primaryImgRef = useRef<HTMLDivElement>(null);
  const [studies, setStudies] = useState<CaseStudy[]>(DEFAULT_CASES);

  useEffect(() => {
    const load = async () => {
      try {
        const { postsService } = await import('@/services/posts.service');
        const res = await postsService.getPosts({ status: 'Published', limitCount: 2 });
        if (res && res.length > 0) {
          const parseStr = (val: any, fallback: string): string => {
            if (!val) return fallback;
            if (typeof val === 'string') return val;
            if (typeof val === 'object') return val.name || val.label || val.title || fallback;
            return String(val);
          };

          setStudies(
            res.map((p: any, i: number) => ({
              id: parseStr(p._id || p.id, `cs-${i}`),
              slug: parseStr(p.slug, 'case-study'),
              title: parseStr(p.title, DEFAULT_CASES[i]?.title || ''),
              client: parseStr(p.client, DEFAULT_CASES[i]?.client || ''),
              metric: parseStr(p.metric, DEFAULT_CASES[i]?.metric || ''),
              excerpt: parseStr(p.excerpt || p.seoDescription, DEFAULT_CASES[i]?.excerpt || ''),
              featuredImage: typeof p.featuredImage === 'string' ? p.featuredImage : DEFAULT_CASES[i]?.featuredImage || '/cs-photo.jpg',
              tag: parseStr(p.category || p.tag, DEFAULT_CASES[i]?.tag || ''),
            }))
          );
        }
      } catch {
        setStudies(DEFAULT_CASES);
      }
    };
    load();
  }, []);

  // Image mask reveal on entry (Directive #7)
  useEffect(() => {
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!primaryImgRef.current || !sectionRef.current) return;

      gsap.fromTo(
        primaryImgRef.current,
        { clipPath: 'inset(0 0 100% 0)', scale: 1.06 },
        {
          clipPath: 'inset(0 0 0% 0)',
          scale: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );
    };

    run();
  }, []);

  const primaryCase = studies[0] || DEFAULT_CASES[0];
  const secondaryCase = studies[1] || DEFAULT_CASES[1];

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="w-full bg-white py-24 md:py-32 border-b border-[rgba(17,17,17,0.06)] overflow-hidden"
      aria-label="Case Studies"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        
        {/* Header */}
        <FadeReveal className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">

            <h2
              className="font-bold text-[#111] leading-[0.93] tracking-[-0.04em]"
              style={{
                fontSize: 'clamp(40px, 5vw, 84px)',
                fontFamily: 'var(--font-plus-jakarta-sans)',
              }}
            >
              Real Challenges.<br />
              Measurable Growth.
            </h2>

          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#111] hover:text-[#A78BFA] transition-colors duration-200"
            style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
          >
            Explore All Work →
          </Link>
        </FadeReveal>

        {/* Asymmetrical Horizontal Story Layout: Primary 65-70% width, Secondary 30-35% (Directive #7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* PRIMARY CASE STUDY (Occupies ~70% width) */}
          <FadeReveal delay={0.1} className="lg:col-span-8 flex">
            <Link
              href={`/case-studies/${primaryCase.slug}`}
              data-cursor
              data-cursor-label="VIEW"
              className="group relative w-full rounded-2xl overflow-hidden bg-[#111] min-h-[480px] lg:min-h-[540px] flex flex-col justify-between p-8 md:p-12 shadow-md"
            >
              {/* Image with clip-path mask reveal */}
              <div ref={primaryImgRef} className="absolute inset-0 w-full h-full">
                <Image
                  src={primaryCase.featuredImage}
                  alt={primaryCase.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover object-center opacity-65 group-hover:opacity-75 transition-all duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

              {/* Top metadata badges */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[11px] font-bold text-white/90 uppercase tracking-widest bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                  {primaryCase.tag}
                </span>
                <span className="text-[12px] font-mono font-semibold text-white/60">01 / 02</span>
              </div>

              {/* Bottom details & metric badge */}
              <div className="relative z-10 pt-20">
                {/* Metric pill */}
                <div className="inline-block bg-[#A78BFA] text-black text-[12px] font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm">
                  {primaryCase.metric}
                </div>

                <h3
                  className="text-white font-bold leading-[1.05] tracking-tight mb-4 max-w-xl text-[28px] md:text-[36px]"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  {primaryCase.title}
                </h3>

                <p
                  className="text-white/80 text-[14.5px] leading-relaxed max-w-lg mb-6 line-clamp-2"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  {primaryCase.excerpt}
                </p>

                <div className="inline-flex items-center gap-2 text-white text-[13px] font-semibold group-hover:text-[#A78BFA] transition-colors duration-200">
                  Read Case Study
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          </FadeReveal>

          {/* SECONDARY CASE STUDY (Occupies ~30% width) */}
          <FadeReveal delay={0.25} className="lg:col-span-4 flex">
            <Link
              href={`/case-studies/${secondaryCase.slug}`}
              data-cursor
              data-cursor-label="VIEW"
              className="group relative w-full rounded-2xl overflow-hidden bg-[#1A1A1A] min-h-[480px] lg:min-h-[540px] flex flex-col justify-between p-8 shadow-md border border-[rgba(17,17,17,0.10)]"
            >
              <Image
                src={secondaryCase.featuredImage}
                alt={secondaryCase.title}
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover object-center opacity-55 group-hover:opacity-70 transition-all duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Top metadata */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10.5px] font-bold text-white/80 uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                  {secondaryCase.tag}
                </span>
                <span className="text-[11px] font-mono text-white/50">02 / 02</span>
              </div>

              {/* Bottom content */}
              <div className="relative z-10">
                <div className="inline-block bg-white/15 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full mb-3">
                  {secondaryCase.metric}
                </div>

                <h3
                  className="text-white font-bold leading-snug tracking-tight mb-3 text-[22px] md:text-[25px]"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  {secondaryCase.title}
                </h3>

                <div className="inline-flex items-center gap-1.5 text-white/90 text-[12px] font-semibold group-hover:text-[#A78BFA] transition-colors duration-200">
                  Read Story
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          </FadeReveal>

        </div>

      </div>
    </section>
  );
}


'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Service {
  number: string;
  title: string;
  href: string;
  img: string;
  imgAlt: string;
  width: string; // Tailored desktop card width
  aspect: string; // Tailored visual aspect ratio
  tag: string;
}

const SERVICES: Service[] = [
  {
    number: '01',
    title: 'Website Development',
    href: '/solutions/website-development',
    img: '/svc-web.jpg',
    imgAlt: 'Responsive web experience interface composition',
    width: 'w-[420px]',
    aspect: 'aspect-[3/4]',
    tag: 'Web & UI Architecture',
  },
  {
    number: '02',
    title: 'SEO',
    href: '/solutions/seo',
    img: '/svc-seo.jpg',
    imgAlt: 'Search visibility and keyword data visualization',
    width: 'w-[330px]',
    aspect: 'aspect-[4/5]',
    tag: 'Search Visibility',
  },
  {
    number: '03',
    title: 'Content',
    href: '/solutions/content',
    img: '/svc-content.jpg',
    imgAlt: 'Editorial document and copy planning',
    width: 'w-[360px]',
    aspect: 'aspect-square',
    tag: 'Copy & Editorial',
  },
  {
    number: '04',
    title: 'Performance Marketing',
    href: '/solutions/performance-marketing',
    img: '/svc-performance.jpg',
    imgAlt: 'Campaign performance dashboard and analytics',
    width: 'w-[480px]',
    aspect: 'aspect-[16/10]',
    tag: 'Acquisition & ROI',
  },
  {
    number: '05',
    title: 'Custom Development',
    href: '/solutions/custom-development',
    img: '/svc-dev.jpg',
    imgAlt: 'Custom application code and backend systems interface',
    width: 'w-[400px]',
    aspect: 'aspect-[4/3]',
    tag: 'Custom AI & Systems',
  },
];

export default function SolutionsRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (window.innerWidth < 1024) return; // Desktop pin only

      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!trackRef.current || !triggerRef.current) return;

      const track = trackRef.current;
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

      const ctx = gsap.context(() => {
        gsap.to(track, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                Math.floor(self.progress * SERVICES.length),
                SERVICES.length - 1
              );
              setActiveIndex(idx);
            },
          },
        });
      }, triggerRef);

      return () => ctx.revert();
    };

    run();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="w-full bg-[#F8F8F5] relative overflow-hidden"
      aria-label="Our Solutions"
    >
      {/* ── DESKTOP PINNED HORIZONTAL RAIL CONTAINER ── */}
      <div ref={triggerRef} className="hidden lg:block w-full min-h-[100vh]">
        <div className="max-w-[1440px] mx-auto px-16 pt-20 pb-8 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-semibold text-[#999] uppercase tracking-[0.18em]">01—05</span>
              <span className="w-4 h-px bg-[#ccc]" />
              <span className="text-[10px] font-semibold text-[#999] uppercase tracking-[0.18em]">OUR SOLUTIONS</span>
            </div>
            <h2
              className="text-[#111] font-bold leading-[0.92] tracking-[-0.04em]"
              style={{
                fontSize: 'clamp(52px, 6vw, 96px)',
                fontFamily: 'var(--font-plus-jakarta-sans)',
              }}
            >
              Everything You Need<br />
              to Grow Digitally.
            </h2>
          </div>

          {/* Active Service Counter & Progress indicator */}
          <div className="flex flex-col items-end gap-3 pb-2">
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-mono font-bold text-[#111]">
                0{activeIndex + 1}
              </span>
              <span className="text-[11px] text-[#999] uppercase tracking-wider font-semibold">
                / 05 &mdash; {SERVICES[activeIndex]?.title}
              </span>
            </div>
            {/* Horizontal progress bar */}
            <div className="w-48 h-[2px] bg-[rgba(17,17,17,0.10)] relative overflow-hidden rounded-full">
              <div
                className="absolute left-0 top-0 bottom-0 bg-[#111] transition-all duration-300 rounded-full"
                style={{ width: `${((activeIndex + 1) / SERVICES.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="w-full overflow-hidden pt-6 pb-20">
          <div
            ref={trackRef}
            className="flex items-center gap-12 px-16 will-change-transform"
          >
            {SERVICES.map((svc, i) => {
              const isActive = i === activeIndex;
              return (
                <Link
                  key={svc.number}
                  href={svc.href}
                  data-cursor
                  data-cursor-label="VIEW"
                  className={`group relative shrink-0 flex flex-col cursor-pointer transition-all duration-500 ${svc.width} ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-40 hover:opacity-85 scale-[0.97]'
                  }`}
                >
                  {/* Photo with varied proportion */}
                  <div className={`relative overflow-hidden ${svc.aspect} w-full bg-[#E5E5E2] rounded-xl mb-5 shadow-sm border border-[rgba(17,17,17,0.06)]`}>
                    <Image
                      src={svc.img}
                      alt={svc.imgAlt}
                      fill
                      sizes="500px"
                      className="object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    
                    {/* Floating badge inside image */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      <span className="text-[10px] font-semibold text-[#111] uppercase tracking-wider">
                        {svc.tag}
                      </span>
                    </div>

                    {/* Arrow badge bottom right */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#111] group-hover:bg-[#111] group-hover:text-white transition-all duration-300 shadow-sm">
                      <span className="text-[15px] group-hover:translate-x-0.5 transition-transform">→</span>
                    </div>
                  </div>

                  {/* Meta & Title */}
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-[#888] font-mono mb-1">
                      {svc.number}
                    </span>
                    <h3
                      className={`font-bold tracking-tight text-[#111] transition-all duration-300 ${
                        isActive ? 'text-[24px]' : 'text-[22px] group-hover:text-[#4F6BFF]'
                      }`}
                      style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                    >
                      {svc.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MOBILE VERTICAL FALLBACK (No scroll-jacking) ── */}
      <div className="block lg:hidden px-8 py-16">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-semibold text-[#999] uppercase tracking-[0.18em]">01—05</span>
            <span className="w-4 h-px bg-[#ccc]" />
            <span className="text-[10px] font-semibold text-[#999] uppercase tracking-[0.18em]">OUR SOLUTIONS</span>
          </div>
          <h2
            className="text-[#111] font-bold leading-[0.95] tracking-[-0.04em]"
            style={{
              fontSize: 'clamp(34px, 7vw, 56px)',
              fontFamily: 'var(--font-plus-jakarta-sans)',
            }}
          >
            Everything You Need<br />
            to Grow Digitally.
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          {SERVICES.map((svc) => (
            <Link key={svc.number} href={svc.href} className="flex flex-col group">
              <div className="relative overflow-hidden aspect-[4/3] w-full bg-[#E5E5E2] rounded-xl mb-4 shadow-sm border border-[rgba(17,17,17,0.06)]">
                <Image
                  src={svc.img}
                  alt={svc.imgAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale"
                />
                <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full">
                  <span className="text-[10px] font-semibold text-[#111]">{svc.tag}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#888] font-mono block mb-0.5">{svc.number}</span>
                  <h3 className="text-[20px] font-bold text-[#111]" style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}>
                    {svc.title}
                  </h3>
                </div>
                <span className="text-[18px] text-[#111]">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


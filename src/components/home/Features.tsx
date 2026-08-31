'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { solutionsService } from '@/services/solutions.service';

interface FeatureItem {
  num: string;
  slug: string;
  title: string;
  desc: string;
  imageSrc: string;
}

export default function Features() {
  const router = useRouter();

  const defaultFeatureItems: FeatureItem[] = [
    {
      num: '01',
      slug: 'pos',
      title: 'Reliable and fast billing',
      desc: 'Our POS billing system is designed to handle rush hours without lag or delays.',
      imageSrc: '/image 5.png',
    },
    {
      num: '02',
      slug: 'kds',
      title: 'Kitchen display coordination',
      desc: 'Connect front of house billing with kitchen screens. Speed up food prep tracking.',
      imageSrc: '/image 6.png',
    },
    {
      num: '03',
      slug: 'inventory',
      title: 'Wastage and stock tracker',
      desc: 'Ingredients deduct automatically on checkouts. Get real-time stock alerts.',
      imageSrc: '/image 7.png',
    },
    {
      num: '04',
      slug: 'control-system',
      title: 'Full multi-outlet controls',
      desc: 'Manage multiple restaurant outlets from one dashboard. Set permission levels.',
      imageSrc: '/image 8.png',
    },
    {
      num: '05',
      slug: 'control-system',
      title: 'One order flow',
      desc: 'Manage Swiggy, Zomato, QR, and dine-in orders together without switching between different apps.',
      imageSrc: '/image 9.png',
    },
    {
      num: '06',
      slug: 'event-management',
      title: 'Multi-outlet management',
      desc: 'Manage one outlet or many. View reports and performance from one dashboard.',
      imageSrc: '/image 10.png',
    },
  ];

  const [features, setFeatures] = useState<FeatureItem[]>(defaultFeatureItems);

  useEffect(() => {
    async function loadSolutionsFromBackend() {
      try {
        const loaded = await solutionsService.getSolutions();
        if (loaded && loaded.length > 0) {
          const mapped = defaultFeatureItems.map((defaultItem) => {
            const foundBackend = loaded.find(
              (s: any) =>
                s.slug === defaultItem.slug ||
                s.id === defaultItem.slug ||
                s._id === defaultItem.slug
            );

            return {
              ...defaultItem,
              slug: foundBackend?.slug || defaultItem.slug,
            };
          });

          setFeatures(mapped);
        }
      } catch (err) {
        console.warn('Failed to load solutions from backend in Features component:', err);
      }
    }

    loadSolutionsFromBackend();
  }, []);

  const handleCardClick = (slug: string) => {
    router.push(`/solutions/${slug}`);
  };

  return (
    <div className="w-full">
      <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16">
        {/* Top Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10 md:mb-12">
          {/* Heading */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15]">
              When your restaurant gets busy,
              <br />
              <span className="text-[#FF4F18]"> Digitory keeps everything running smoothly.</span>
            </h2>
          </div>

          {/* Description & Action */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6">
            <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed max-w-md">
              Connect your orders, kitchen, inventory, billing, and reports in one platform so your team can work faster and make fewer mistakes.
            </p>
            <Link
              href="/solutions"
              className="inline-flex justify-center items-center text-center rounded-full bg-[#111111] dark:bg-white px-8 py-3 text-[15px] font-semibold text-white dark:text-zinc-900 transition-all duration-200 hover:bg-black dark:hover:bg-zinc-100 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
            >
              Explore Platform
            </Link>
          </div>
        </div>

        {/* Features Card Container with 3x2 inner grid */}
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-[28px] overflow-hidden bg-white dark:bg-zinc-900 grid grid-cols-1 md:grid-cols-3">
          {features.map((item, idx) => {
            const borderClasses =
              idx === 0 || idx === 1
                ? 'border-b border-zinc-200 dark:border-zinc-800 md:border-r md:border-b'
                : idx === 2
                ? 'border-b border-zinc-200 dark:border-zinc-800 md:border-b'
                : idx === 3 || idx === 4
                ? 'border-b border-zinc-200 dark:border-zinc-800 md:border-b-0 md:border-r'
                : 'border-b-0';

            return (
              <Link
                key={idx}
                href={`/solutions/${item.slug}`}
                className={`p-8 sm:p-10 flex flex-col justify-start transition-all duration-300 hover:bg-zinc-100/60 dark:hover:bg-white/5 cursor-pointer group ${borderClasses}`}
              >
                {/* Feature Index */}
                <span className="text-sm font-bold text-zinc-400 dark:text-zinc-600 mb-2">{item.num}</span>

                {/* Feature Image Mockup */}
                <div className="w-full h-[140px] flex items-center justify-center my-4 select-none relative">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="max-w-[240px] max-h-[140px] object-contain rounded-xl"
                  />
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2 mt-4">{item.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </Link>
            );
          })}
        </div>

      </section>
    </div>
  );
}

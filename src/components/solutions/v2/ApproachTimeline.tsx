'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FadeReveal } from './RevealText';

const STEPS = [
  { id: '01', name: 'Understand', copy: 'Business, audience, goals.' },
  { id: '02', name: 'Research', copy: 'Market, data, opportunities.' },
  { id: '03', name: 'Strategise', copy: 'Clear direction & architecture.' },
  { id: '04', name: 'Execute', copy: 'Build, design & launch.' },
  { id: '05', name: 'Measure', copy: 'Track metrics that matter.' },
  { id: '06', name: 'Improve', copy: 'Iterate forward continuously.' },
];

export default function ApproachTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const loopPathRef = useRef<SVGPathElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!pathRef.current || !sectionRef.current) return;

      const len = pathRef.current.getTotalLength?.() ?? 800;
      gsap.set(pathRef.current, { strokeDasharray: len, strokeDashoffset: len });

      if (loopPathRef.current) {
        const loopLen = loopPathRef.current.getTotalLength?.() ?? 300;
        gsap.set(loopPathRef.current, { strokeDasharray: loopLen, strokeDashoffset: loopLen });
      }

      // ScrollTrigger for path progression
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          // Animate SVG path draw
          gsap.set(pathRef.current, { strokeDashoffset: len * (1 - progress) });

          if (loopPathRef.current) {
            const loopProgress = Math.max(0, (progress - 0.85) / 0.15);
            const loopLen = loopPathRef.current.getTotalLength?.() ?? 300;
            gsap.set(loopPathRef.current, { strokeDashoffset: loopLen * (1 - loopProgress) });
          }

          const currentIdx = Math.min(
            Math.floor(progress * STEPS.length),
            STEPS.length - 1
          );
          setActiveStepIndex(currentIdx);
        },
      });
    };

    run();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative w-full bg-[#FBFBF8] min-h-[190vh] border-b border-[rgba(17,17,17,0.06)]"
      aria-label="Our Approach"
    >
      <div ref={stickyRef} className="sticky top-0 w-full min-h-[100vh] flex items-center py-20">
        <div className="max-w-[1440px] mx-auto w-full px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* LEFT: Sticky Heading */}
            <div className="lg:col-span-5 flex flex-col">
              <FadeReveal>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-semibold text-[#999] uppercase tracking-[0.18em]">03</span>
                  <span className="w-4 h-px bg-[#ccc]" />
                  <span className="text-[10px] font-semibold text-[#999] uppercase tracking-[0.18em]">OUR PROCESS STORY</span>
                </div>
                <h2
                  className="font-bold text-[#111] leading-[0.93] tracking-[-0.04em] mb-6"
                  style={{
                    fontSize: 'clamp(40px, 4.8vw, 76px)',
                    fontFamily: 'var(--font-plus-jakarta-sans)',
                  }}
                >
                  From Understanding<br />
                  to Real Outcomes.
                </h2>
                <p
                  className="text-[15.5px] text-[#676767] leading-relaxed mb-8 max-w-sm"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  We don&apos;t start with a package. We start with a
                  business outcome &mdash; and follow a clear, progressive process to solve it.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#111] hover:text-[#4F6BFF] transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
                >
                  Discuss Your Project →
                </Link>
              </FadeReveal>
            </div>

            {/* RIGHT: Scroll-Driven Progressive Story Path */}
            <div className="lg:col-span-7 relative flex flex-col justify-center pl-0 lg:pl-6">
              
              {/* SVG Vertical Flow Path (Desktop & Tablet) */}
              <div className="relative w-full py-4">
                <svg
                  viewBox="0 0 500 520"
                  className="w-full h-auto overflow-visible"
                  fill="none"
                  aria-hidden
                >
                  {/* Background track line */}
                  <path
                    d="M 60 40 C 180 40, 240 120, 240 190 C 240 260, 100 320, 100 390 C 100 450, 280 450, 360 450"
                    stroke="rgba(17,17,17,0.08)"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Animated stroke path */}
                  <path
                    ref={pathRef}
                    d="M 60 40 C 180 40, 240 120, 240 190 C 240 260, 100 320, 100 390 C 100 450, 280 450, 360 450"
                    stroke="#111"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Final Step Loop Animation Path */}
                  <path
                    ref={loopPathRef}
                    d="M 360 450 C 420 450, 450 410, 420 370 C 390 330, 330 390, 360 450"
                    stroke="#4F6BFF"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    fill="none"
                  />

                  {/* Step Nodes along the path */}
                  {[
                    { x: 60, y: 40 },
                    { x: 210, y: 120 },
                    { x: 240, y: 190 },
                    { x: 170, y: 290 },
                    { x: 100, y: 390 },
                    { x: 360, y: 450 },
                  ].map((pos, idx) => {
                    const step = STEPS[idx];
                    const isActive = idx <= activeStepIndex;
                    const isCurrent = idx === activeStepIndex;

                    return (
                      <g key={step.id} className="transition-all duration-300">
                        {/* Node Outer Halo */}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={isCurrent ? 14 : isActive ? 9 : 6}
                          fill={isCurrent ? '#4F6BFF' : isActive ? '#111' : '#F0F0EC'}
                          stroke={isCurrent ? '#ffffff' : 'none'}
                          strokeWidth="3"
                          className="transition-all duration-300"
                        />

                        {/* Step Number & Label */}
                        <text
                          x={pos.x + 24}
                          y={pos.y - 4}
                          fontSize="11"
                          fontFamily="var(--font-plus-jakarta-sans), sans-serif"
                          fontWeight="700"
                          fill={isActive ? '#111' : '#999'}
                          className="transition-all duration-300"
                        >
                          {step.id} — {step.name}
                        </text>

                        {/* Revealed supporting copy (Directive #5) */}
                        <text
                          x={pos.x + 24}
                          y={pos.y + 14}
                          fontSize="10"
                          fontFamily="var(--font-plus-jakarta-sans), sans-serif"
                          fontWeight="500"
                          fill={isActive ? '#676767' : 'transparent'}
                          className="transition-all duration-300"
                        >
                          {step.copy}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Loop Annotation at Step 06 */}
              <div className="flex justify-end pr-4">
                <div className="border-l-2 border-[#4F6BFF] pl-3 max-w-[200px]">
                  <p
                    className="text-[11.5px] text-[#4F6BFF] font-semibold italic leading-snug"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    A continuous cycle for greater growth.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


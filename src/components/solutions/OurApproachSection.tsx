'use client';

import React, { useEffect, useRef, useState } from 'react';

const processSteps = [
  {
    number: '01',
    name: 'Understand',
    description:
      'We start by deeply understanding your business, your audience, your goals, and the challenges standing between where you are and where you want to be.',
    accent: '#C1B6FF',
  },
  {
    number: '02',
    name: 'Research',
    description:
      'We research your market, your competitors, your customers, and your data — looking for the insights and opportunities that will inform a smarter strategy.',
    accent: '#A78BFA',
  },
  {
    number: '03',
    name: 'Strategise',
    description:
      'We build a clear direction built around your priorities — not a generic template. Strategy is the foundation everything else is built on.',
    accent: '#D6DCDC',
  },
  {
    number: '04',
    name: 'Execute',
    description:
      'We apply the right combination of marketing, creativity, content, and technology — working with precision and purpose to turn strategy into reality.',
    accent: '#818CF8',
  },
  {
    number: '05',
    name: 'Measure',
    description:
      'We track the metrics that matter to your business, not just vanity numbers. Good measurement makes everything downstream more accountable.',
    accent: '#C1B6FF',
  },
  {
    number: '06',
    name: 'Improve',
    description:
      'We learn from the results and look for better ways forward. Continuous improvement is how we create compounding value over time.',
    accent: '#E2E8F0',
  },
];

// ─── Mobile vertical timeline (no sticky, no GSAP) ───────────────────────────
function MobileTimeline() {
  return (
    <div className="relative pl-10">
      {/* Vertical line */}
      <div
        className="absolute left-3 top-0 bottom-0 w-px"
        style={{ background: 'rgba(214,220,220,0.08)' }}
      />
      {processSteps.map((step, i) => (
        <div key={step.number} className="relative mb-12 last:mb-0">
          {/* Timeline node */}
          <div
            className="absolute -left-7 top-1 w-2 h-2 rounded-full"
            style={{ background: step.accent, boxShadow: `0 0 8px ${step.accent}` }}
          />
          {/* Content */}
          <span
            className="text-xs font-normal mb-2 block"
            style={{ fontFamily: 'Barlow, sans-serif', color: step.accent, opacity: 0.8 }}
          >
            {step.number}
          </span>
          <h3
            className="text-2xl font-normal text-[#D6DCDC] mb-3"
            style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
          >
            {step.name}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{
              fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif",
              color: 'rgba(214,220,220,0.5)',
            }}
          >
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Desktop sticky storytelling (GSAP ScrollTrigger) ────────────────────────
function DesktopSticky() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let ctx: any;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add('(min-width: 1024px)', () => {
          stepsRef.current.forEach((stepEl, i) => {
            if (!stepEl) return;

            ScrollTrigger.create({
              trigger: stepEl,
              start: 'top 50%',
              end: 'bottom 50%',
              onEnter: () => setActiveStep(i),
              onEnterBack: () => setActiveStep(i),
            });
          });

          // Animate progress bar based on scroll through entire steps container
          if (sectionRef.current && progressBarRef.current) {
            gsap.to(progressBarRef.current, {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 30%',
                end: 'bottom 70%',
                scrub: true,
              },
            });
          }
        });
      }, sectionRef);

      // Force refresh after DOM render
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  const activeAccent = processSteps[activeStep]?.accent || '#C1B6FF';

  return (
    <div ref={sectionRef} className="grid grid-cols-12 gap-0 relative">

      {/* ── Left sticky panel ── */}
      <div className="col-span-5 relative">
        <div
          className="sticky top-28 h-[calc(100vh-7rem)] flex flex-col justify-center pr-12 lg:pr-16"
        >
          {/* Section label */}
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block w-5 h-px bg-slate-400 dark:bg-[#D6DCDC]/40" />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-[#D6DCDC]/50"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              Our Approach
            </span>
          </div>

          <h2
            className="text-4xl xl:text-5xl font-normal leading-[1.1] tracking-tight text-slate-900 dark:text-[#D6DCDC] mb-6"
            style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
          >
            We Don't Start With a Package.
            <br />
            We Start With a Problem.
          </h2>
          <p
            className="text-base text-slate-600 dark:text-[#D6DCDC]/50 leading-relaxed mb-10 max-w-sm"
            style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
          >
            Every business has different goals, audiences, challenges, and opportunities. That's why
            we first understand what you need, then determine the right solution.
          </p>

          {/* Step counter */}
          <div className="flex items-baseline gap-2 mb-8">
            <span
              className="text-4xl font-normal transition-colors duration-500"
              style={{ fontFamily: 'Barlow, sans-serif', color: activeAccent }}
            >
              {String(activeStep + 1).padStart(2, '0')}
            </span>
            <span
              className="text-sm text-[#D6DCDC]/30"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              / 06
            </span>
          </div>

          {/* Active step name preview */}
          <div
            className="text-xl font-normal transition-colors duration-500"
            style={{
              fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif",
              color: activeAccent,
            }}
          >
            {processSteps[activeStep]?.name}
          </div>

          {/* Vertical progress track */}
          <div className="absolute right-0 top-[15%] bottom-[15%] flex flex-col items-center">
            <div
              className="w-px flex-1 relative overflow-hidden"
              style={{ background: 'rgba(214,220,220,0.07)' }}
            >
              <div
                ref={progressBarRef}
                className="absolute top-0 left-0 w-full origin-top"
                style={{
                  background: `linear-gradient(to bottom, ${activeAccent}, rgba(214,220,220,0.15))`,
                  height: '100%',
                  transform: 'scaleY(0)',
                  transition: 'background 0.5s ease',
                }}
              />
            </div>
            {/* Step dots */}
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full -left-[3px] transition-all duration-400"
                style={{
                  top: `${(i / (processSteps.length - 1)) * 100}%`,
                  transform: 'translateY(-50%)',
                  background: i <= activeStep ? step.accent : 'rgba(214,220,220,0.12)',
                  boxShadow: i === activeStep ? `0 0 8px ${step.accent}` : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Right scrolling steps ── */}
      <div className="col-span-7 pl-12 lg:pl-16">
        {processSteps.map((step, i) => {
          const isActive = activeStep === i;
          return (
            <div
              key={step.number}
              ref={(el) => { stepsRef.current[i] = el; }}
              className="min-h-screen flex items-center"
            >
              <div
                className={`w-full p-8 lg:p-10 rounded-[28px] transition-all duration-500 border ${
                  isActive
                    ? 'bg-slate-100/90 text-slate-900 border-slate-300 shadow-xl dark:bg-[#0E0E0E] dark:text-[#D6DCDC] dark:border-[#C1B6FF]/30'
                    : 'bg-slate-50/60 text-slate-400 border-slate-200/60 dark:bg-[#060606] dark:text-white/20 dark:border-white/5 opacity-50'
                }`}
              >
                {/* Number */}
                <div
                  className="text-[80px] font-normal leading-none mb-6 select-none transition-all duration-500"
                  style={{
                    fontFamily: 'Barlow, sans-serif',
                    color: step.accent,
                    opacity: isActive ? 0.25 : 0.08,
                  }}
                >
                  {step.number}
                </div>

                {/* Accent dot */}
                <div
                  className="w-2 h-2 rounded-full mb-6 transition-all duration-500"
                  style={{
                    background: isActive ? step.accent : 'rgba(150,150,150,0.3)',
                    boxShadow: isActive ? `0 0 10px ${step.accent}` : 'none',
                  }}
                />

                {/* Step name */}
                <h3
                  className={`text-3xl xl:text-4xl font-normal mb-4 transition-colors duration-500 ${
                    isActive
                      ? 'text-slate-900 dark:text-[#D6DCDC]'
                      : 'text-slate-500 dark:text-slate-600'
                  }`}
                  style={{
                    fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif",
                  }}
                >
                  {step.name}
                </h3>

                {/* Description */}
                <p
                  className={`text-base leading-relaxed transition-colors duration-500 ${
                    isActive
                      ? 'text-slate-700 dark:text-[#D6DCDC]/60'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                  style={{
                    fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif",
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function OurApproachSection() {
  return (
    <section className="relative w-full bg-white dark:bg-black overflow-x-clip transition-colors duration-300">
      <div
        className="w-full h-px bg-slate-200 dark:bg-transparent"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(214,220,220,0.07), transparent)' }}
      />
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute bottom-1/4 left-0 w-[400px] h-[400px] opacity-10"
        style={{
          background: 'radial-gradient(circle at 10% 75%, #818CF8 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Desktop (lg+) — sticky storytelling */}
      <div className="hidden lg:block max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <DesktopSticky />
      </div>

      {/* Mobile/tablet — vertical timeline */}
      <div className="lg:hidden max-w-7xl mx-auto px-6 sm:px-8 py-20">
        {/* Mobile header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block w-5 h-px bg-slate-400 dark:bg-[#D6DCDC]/40" />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-[#D6DCDC]/50"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              Our Approach
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-normal leading-[1.1] tracking-tight text-slate-900 dark:text-[#D6DCDC] mb-4"
            style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
          >
            We Don't Start With a Package. We Start With a Problem.
          </h2>
          <p
            className="text-base text-slate-600 dark:text-[#D6DCDC]/50 leading-relaxed"
            style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
          >
            Every business has different goals, audiences, challenges, and opportunities.
          </p>
        </div>
        <MobileTimeline />
      </div>
    </section>
  );
}

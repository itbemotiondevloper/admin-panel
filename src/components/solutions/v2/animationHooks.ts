'use client';

import { useEffect, useRef } from 'react';

// ---------------------------------------------------------------------------
// useRevealLines — animate headline lines from clip (translateY mask reveal)
// ---------------------------------------------------------------------------
export function useRevealLines(
  ref: React.RefObject<HTMLElement | null>,
  options?: { delay?: number; stagger?: number; start?: string }
) {
  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let isMounted = true;
    let ctx: any = null;
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!isMounted || !ref.current) return;

      const lines = ref.current.querySelectorAll('[data-reveal-line]');
      if (!lines.length) return;

      ctx = gsap.context(() => {
        gsap.fromTo(lines, 
          { y: '105%' },
          {
            y: '0%',
            duration: 1.0,
            ease: 'power4.out',
            stagger: options?.stagger ?? 0.08,
            delay: options?.delay ?? 0,
            scrollTrigger: {
              trigger: ref.current,
              start: options?.start ?? 'top 80%',
              once: true,
            },
          }
        );
      }, ref);
    };

    init();
    return () => {
      isMounted = false;
      if (ctx) ctx.revert();
    };
  }, [ref, options?.delay, options?.stagger, options?.start]);
}

// ---------------------------------------------------------------------------
// useScrollReveal — simple fade+translateY for content blocks
// ---------------------------------------------------------------------------
export function useScrollReveal(
  ref: React.RefObject<HTMLElement | null>,
  options?: { y?: number; delay?: number; start?: string; duration?: number }
) {
  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let isMounted = true;
    let ctx: any = null;
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!isMounted || !ref.current) return;

      ctx = gsap.context(() => {
        gsap.from(ref.current, {
          opacity: 0,
          y: options?.y ?? 32,
          duration: options?.duration ?? 0.9,
          ease: 'power3.out',
          delay: options?.delay ?? 0,
          scrollTrigger: {
            trigger: ref.current,
            start: options?.start ?? 'top 82%',
            once: true,
          },
        });
      }, ref);
    };

    init();
    return () => {
      isMounted = false;
      if (ctx) ctx.revert();
    };
  }, [ref]);
}

// ---------------------------------------------------------------------------
// useParallax — vertical parallax movement on scroll
// ---------------------------------------------------------------------------
export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  speed: number = 0.15
) {
  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx: any;
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.to(ref.current, {
          yPercent: speed * -80,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    };

    init();
    return () => ctx?.revert();
  }, [ref, speed]);
}

// ---------------------------------------------------------------------------
// useMagneticButton — magnetic pull on hover
// ---------------------------------------------------------------------------
export function useMagneticButton(
  ref: React.RefObject<HTMLElement | null>,
  strength: number = 0.4
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Skip touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    let gsap: any;

    const init = async () => {
      const mod = await import('gsap');
      gsap = mod.gsap;
    };
    init();

    const handleMouseMove = (e: MouseEvent) => {
      if (!gsap) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      gsap.to(el, { x: dx, y: dy, duration: 0.25, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      if (!gsap) return;
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, strength]);
}

// ---------------------------------------------------------------------------
// useLineDraw — animate an SVG path stroke dashoffset
// ---------------------------------------------------------------------------
export function useLineDraw(
  ref: React.RefObject<SVGPathElement | SVGLineElement | null>,
  options?: { start?: string; duration?: number }
) {
  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx: any;
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const el = ref.current as SVGPathElement;
      const len = el.getTotalLength?.() ?? 300;
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });

      ctx = gsap.context(() => {
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: options?.duration ?? 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: el,
            start: options?.start ?? 'top 75%',
            once: true,
          },
        });
      });
    };

    init();
    return () => ctx?.revert();
  }, [ref]);
}

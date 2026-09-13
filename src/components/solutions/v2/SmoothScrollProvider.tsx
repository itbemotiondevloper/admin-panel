'use client';

import { useEffect, createContext, useContext, useRef } from 'react';

const LenisContext = createContext<any>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({ children }: { children: import('react').ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Skip on mobile / reduced motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    let raf = 0;
    let gsap: any;
    let ScrollTrigger: any;

    const init = async () => {
      const { default: Lenis } = await import('lenis');
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');

      gsap = gsapModule.gsap;
      ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      // Tie Lenis to GSAP ticker for ScrollTrigger compatibility
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      lenis.on('scroll', ScrollTrigger.update);
    };

    init();

    return () => {
      cancelAnimationFrame(raf);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}

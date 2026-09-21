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

    let gsapTickerCb: ((time: number) => void) | null = null;
    let scrollCb: (() => void) | null = null;
    let gsapInstance: any = null;

    const init = async () => {
      const { default: Lenis } = await import('lenis');
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');

      const gsap = gsapModule.gsap;
      gsapInstance = gsap;
      const ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      gsapTickerCb = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(gsapTickerCb);
      gsap.ticker.lagSmoothing(0);

      scrollCb = () => {
        ScrollTrigger.update();
      };
      lenis.on('scroll', scrollCb);
    };

    init();

    return () => {
      if (gsapInstance && gsapTickerCb) {
        gsapInstance.ticker.remove(gsapTickerCb);
      }
      if (lenisRef.current) {
        if (scrollCb) lenisRef.current.off('scroll', scrollCb);
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

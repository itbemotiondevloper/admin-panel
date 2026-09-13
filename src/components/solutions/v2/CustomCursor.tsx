'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    // Only on desktop hover-capable devices
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf: number;
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, [data-cursor]');
      if (clickable) {
        setIsHovering(true);
        const lbl = clickable.getAttribute('data-cursor-label') || '';
        setLabel(lbl);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, [data-cursor]');
      if (clickable) {
        setIsHovering(false);
        setLabel('');
      }
    };

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }

      // Lerp ring toward mouse
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    tick();

    // Hide default cursor on body
    document.body.style.cursor = 'none';

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      {/* Small dot — follows exactly */}
      <div
        ref={dotRef}
        className="fixed z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform hidden lg:block"
        style={{ left: -100, top: -100 }}
        aria-hidden
      >
        <div
          className={`rounded-full bg-[#111] transition-all duration-150 ${isHovering ? 'opacity-0' : 'opacity-100'}`}
          style={{ width: 7, height: 7 }}
        />
      </div>

      {/* Ring — lerp follows */}
      <div
        ref={ringRef}
        className="fixed z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform hidden lg:flex items-center justify-center"
        style={{ left: -100, top: -100 }}
        aria-hidden
      >
        <div
          className={[
            'rounded-full border border-[rgba(17,17,17,0.35)] flex items-center justify-center transition-all duration-300',
            isHovering
              ? 'w-14 h-14 bg-[#111] border-[#111]'
              : 'w-8 h-8 bg-transparent',
          ].join(' ')}
        >
          {isHovering && (
            <span className="text-white text-[10px] font-semibold tracking-wider">
              {label || '→'}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollFocusWrapperProps {
  children: React.ReactNode;
}

export default function ScrollFocusWrapper({ children }: ScrollFocusWrapperProps) {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkActive = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // We consider the section active if it crosses or occupies the center part of the screen.
      // Specifically, between 35% and 65% of the viewport height.
      const centerStart = viewportHeight * 0.35;
      const centerEnd = viewportHeight * 0.65;
      
      const overlap = rect.top < centerEnd && rect.bottom > centerStart;
      setIsActive(overlap);
    };

    window.addEventListener('scroll', checkActive, { passive: true });
    window.addEventListener('resize', checkActive, { passive: true });
    
    // Initial runs
    checkActive();
    const timer = setTimeout(checkActive, 100);

    return () => {
      window.removeEventListener('scroll', checkActive);
      window.removeEventListener('resize', checkActive);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-in-out ${
        isActive 
          ? 'blur-0 opacity-100 scale-100' 
          : 'blur-[1.5px] opacity-50 scale-[0.99]'
      }`}
    >
      {children}
    </div>
  );
}

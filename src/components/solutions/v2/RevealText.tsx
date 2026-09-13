'use client';

import React, { useRef, ReactNode } from 'react';
import { useScrollReveal } from './animationHooks';

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span';
}

/**
 * RevealText — wraps children in overflow:hidden lines that slide in on scroll.
 * Usage: wrap each visual line in <span data-reveal-line>.
 */
export default function RevealText({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref as any, { y: 0, delay });

  return (
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}

/**
 * LineReveal — individual line wrapper for overflow mask effect
 */
export function LineReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <span data-reveal-line className="block">
        {children}
      </span>
    </span>
  );
}

/**
 * FadeReveal — simple fade+translate reveal for content sections
 */
export function FadeReveal({
  children,
  className = '',
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref as any, { y, delay });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

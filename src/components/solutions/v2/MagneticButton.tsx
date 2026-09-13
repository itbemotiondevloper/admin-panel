'use client';

import React, { useRef, ReactNode } from 'react';
import Link from 'next/link';
import { useMagneticButton } from './animationHooks';

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  external?: boolean;
  strength?: number;
}

export default function MagneticButton({
  href,
  onClick,
  children,
  className = '',
  external = false,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  useMagneticButton(ref, strength);

  const base =
    'inline-flex items-center justify-center gap-2 cursor-pointer select-none transition-colors duration-200 ' +
    className;

  if (href) {
    if (external) {
      return (
        <a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={base}
        >
          {children}
        </a>
      );
    }
    return (
      <Link ref={ref as React.RefObject<HTMLAnchorElement>} href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className={base}
    >
      {children}
    </button>
  );
}

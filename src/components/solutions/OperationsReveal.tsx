'use client';

import React, { useState, useEffect, useRef } from 'react';

interface OperationsRevealProps {
  title?: React.ReactNode;
  words?: string[];
  highlights?: string[];
}

const defaultWordsList = [
  "Most", "business", "operators", "rely", "on", "five", "or", "more", "disconnected", "systems",
  "that", "fail", "to", "communicate", "in", "real", "time.", "Vital", "orders", "get",
  "missed,", "inventory", "and", "stock", "records", "fall", "behind,", "manual", "reconciliations", "waste",
  "valuable", "team", "hours,", "and", "management", "feels", "like", "constant", "daily", "chaos.",
  "Without", "a", "single", "cohesive", "operating", "layer,", "scaling", "becomes", "a", "costly",
  "bottleneck,", "customer", "satisfaction", "drops,", "and", "hidden", "revenue", "leaks", "slowly", "drain",
  "your", "hard-earned", "profits."
];

const defaultHighlightsList = [
  "five", "disconnected", "missed", "behind", "waste", "chaos", "bottleneck", "drops", "leaks", "drain", "profits"
];

export default function OperationsReveal({
  title,
  words = defaultWordsList,
  highlights = defaultHighlightsList
}: OperationsRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressRef = useRef(0);
  const doneRef = useRef(false);
  const lockedRef = useRef(false);

  const totalWords = words.length;
  const TOTAL_DELTA = 1100; // scroll effort to reveal all words

  // Randomize the reveal order on mount
  const [revealOrder, setRevealOrder] = useState<number[]>([]);
  useEffect(() => {
    const order = Array.from({ length: totalWords }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    setRevealOrder(order);
  }, [totalWords]);

  useEffect(() => {
    const handleScroll = () => {
      const parent = sectionRef.current;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // The sticky container starts pin when top of parent <= 0,
      // and unpins when bottom of parent reaches bottom of viewport.
      const scrollRange = rect.height - windowHeight;
      if (scrollRange <= 0) return;

      const scrolled = -rect.top;
      const progress = scrolled / scrollRange;
      
      // Complete the reveal animation when scrolled 80% through the track, leaving 20% read buffer.
      const scaledProgress = progress / 0.8;
      const clamped = Math.max(0, Math.min(1, scaledProgress));
      setScrollProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const renderWord = (word: string, globalIdx: number) => {
    const orderIndex = revealOrder.length > 0 ? revealOrder.indexOf(globalIdx) : globalIdx;
    const wordStart = orderIndex / totalWords;
    const isActive = scrollProgress >= wordStart;
    
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
    const isHighlighted = highlights.some(h => cleanWord.includes(h.toLowerCase()));

    return (
      <span
        key={globalIdx}
        className={`transition-colors duration-300 ${
          isHighlighted ? 'font-extrabold' : 'font-normal'
        } ${
          isActive 
            ? (isHighlighted ? 'text-[#FF4F18]' : 'text-zinc-900 dark:text-zinc-100') 
            : 'text-zinc-300 dark:text-zinc-700'
        }`}
      >
        {word}{" "}
      </span>
    );
  };

  return (
    <div 
      ref={sectionRef}
      className="relative bg-white dark:bg-[#0d0d0e] border-t border-b border-zinc-100 dark:border-zinc-900"
      style={{ height: '180vh' }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 md:px-8 text-center w-full">
          {/* Centered Heading */}
          <div className="max-w-3xl mx-auto mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
              {title || (
                <>
                  What happens when operations <span className="text-[#FF4F18]">get fragmented?</span>
                </>
              )}
            </h2>
          </div>

          {/* Centered Scroll Reveal Paragraph */}
          <div className="max-w-4xl mx-auto">
            <p className="text-base sm:text-lg md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
              {words.map((word, idx) => renderWord(word, idx))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';

interface SolutionsDetailsCtaProps {
  title?: string;
  desc?: string;
}

export default function CtaSection({ title, desc }: SolutionsDetailsCtaProps) {
  const renderTitle = () => {
    if (!title) {
      return (
        <>
          Build a Website That <span className="text-[#A78BFA]">Moves Your Business Forward</span>
        </>
      );
    }

    const parts = title.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const cleanText = part.slice(2, -2);
        return (
          <span key={index} className="text-[#A78BFA]">
            {cleanText}
          </span>
        );
      }
      if (part.includes('\n')) {
        return part.split('\n').map((line, lIdx) => (
          <React.Fragment key={`${index}-${lIdx}`}>
            {lIdx > 0 && <br />}
            {line}
          </React.Fragment>
        ));
      }
      return part;
    });
  };

  return (
    <section className="w-full bg-white dark:bg-black pt-16 md:pt-20 pb-20 md:pb-28 transition-colors duration-300 text-center border-t border-slate-200 dark:border-[#D6DCDC]/10">
      <div className="max-w-5xl mx-auto px-6 md:px-8 flex flex-col items-center">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block w-5 h-px bg-[#A78BFA]" />
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A78BFA]"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            GET STARTED TODAY
          </span>
        </div>

        {/* Heading */}
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-tight leading-[1.12] text-slate-900 dark:text-[#D6DCDC] max-w-4xl mb-6"
          style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
        >
          {renderTitle()}
        </h2>

        {desc && (
          <p 
            className="text-slate-600 dark:text-[#D6DCDC]/60 text-base md:text-lg max-w-2xl mb-10 leading-relaxed font-normal"
            style={{ fontFamily: "'Wix Madefor Text', sans-serif" }}
          >
            {desc}
          </p>
        )}

        {/* CTA Button */}
        <Link
          href="/contact"
          className="inline-flex justify-center items-center text-center rounded-full bg-[#A78BFA] hover:bg-[#B89FFF] text-black px-8 py-4 text-xs font-semibold uppercase tracking-widest transition-all duration-200 shadow-lg shadow-[#A78BFA]/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '0.1em' }}
        >
          START YOUR PROJECT →
        </Link>

      </div>
    </section>
  );
}

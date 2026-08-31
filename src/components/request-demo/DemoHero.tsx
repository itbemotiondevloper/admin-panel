'use client';

import React, { useRef, useState } from 'react';

export default function DemoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const trustCircles = [
    { text: 'R', bg: 'bg-[#ECECEC]', textCol: 'text-zinc-600' },
    { text: 'C', bg: 'bg-[#D2E9E9]', textCol: 'text-teal-600' },
    { text: 'B', bg: 'bg-[#FFE5D9]', textCol: 'text-orange-600' },
    { text: 'K', bg: 'bg-[#E8EAFF]', textCol: 'text-indigo-600' },
  ];

  return (
    <>
      {/* 
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 max-w-7xl mx-auto px-6 md:px-8 text-center space-y-12 z-10">
        {/* Badge */}
      {/* <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4F18]/10 text-xs sm:text-sm font-semibold text-[#FF4F18] uppercase tracking-widest">
          Request a Demo
        </span> */}

      {/* Hero Content */}
      {/* <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            See Digitory in action.
            <br />
            <span className="text-[#FF4F18] drop-shadow-[0_4px_12px_rgba(255,79,24,0.1)]">Transform your kitchen operations.</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Discover how our unified restaurant operating system manages chaos hours, optimizes inventory, and boosts margins.
          </p>
        </div> */}

      {/* Trust Circles (Trustship) */}
      {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <div className="flex -space-x-3">
            {trustCircles.map((circle, idx) => (
              <div
                key={idx}
                className={`flex h-8 w-8 items-center justify-center rounded-full ${circle.bg} ${circle.textCol} font-extrabold text-xs border-2 border-white`}
              >
                {circle.text}
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-zinc-505 dark:text-zinc-400 font-medium">
            Trusted by top restaurants, cafés, and breweries across India.
          </p>
        </div> */}

      {/* Short Intro Video */}
      {/* <div className="relative max-w-4xl mx-auto aspect-16/9 rounded-[32px] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl group">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover cursor-pointer"
            onClick={togglePlay}
          >
            <source src="/digitor-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Play/Pause Overlay Button */}
      {/* <button
            onClick={togglePlay}
            className="absolute bottom-6 right-6 p-4 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white backdrop-blur-md shadow-lg border border-zinc-200/50 dark:border-zinc-800/50 hover:scale-105 active:scale-95 transition-all z-10 cursor-pointer"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          {/* Subtle Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </div>
      </section> */}

      {/* Cinematic Video Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[80vh] md:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
          {/* Desktop Version */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="hidden md:block w-full h-full object-cover scale-[1.01]"
          >
            <source src="/Digitory.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Mobile Version */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="block md:hidden w-full h-full object-cover scale-[1.01]"
          >
            <source src="/mobile.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </>
  );
}

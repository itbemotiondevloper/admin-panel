'use client';

import React, { useRef, useState, useEffect } from 'react';

export default function DemoHero() {
  const [desktopVideo, setDesktopVideo] = useState('/Digitory.mp4');
  const [mobileVideo, setMobileVideo] = useState('/mobile.mp4');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { settingsService } = await import('@/services/settings.service');
        const s = await settingsService.getSettings();
        if (s.desktopVideoUrl) setDesktopVideo(s.desktopVideoUrl);
        if (s.mobileVideoUrl) setMobileVideo(s.mobileVideoUrl);
      } catch (err) {
        console.error('Failed to load dynamic videos:', err);
      }
    };
    fetchSettings();
  }, []);

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
      {/* Cinematic Video Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[80vh] md:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
          {/* Desktop Version */}
          {desktopVideo && (
            <video
              key={desktopVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="hidden md:block w-full h-full object-cover scale-[1.01]"
            >
              <source src={desktopVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {/* Mobile Version */}
          {mobileVideo && (
            <video
              key={mobileVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="block md:hidden w-full h-full object-cover scale-[1.01]"
            >
              <source src={mobileVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </section>
    </>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import FooterPage from '@/components/Footer';
import OperationsReveal from '@/components/solutions/OperationsReveal';
import InsightsPage from '@/components/home/Insights';
import { solutionsDb } from '@/app/data/solutionsDb';
import SolutionsDetailsCta from '@/components/solutions/SolutionsDetailsCta';
import { solutionsService } from '@/services/solutions.service';

interface SolutionsDetailsSharedProps {
  defaultModule?: string;
}

const resolveIcon = (iconKey: string) => {
  const iconsMap: Record<string, React.ReactNode> = {
    pos: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    kds: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
    inventory: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    controlSystem: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
    reports: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0017.75 3.75H6.25A2.25 2.25 0 004 6v12A2.25 2.25 0 006.25 20.25z" />
      </svg>
    ),
    eventManagement: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  };
  return iconsMap[iconKey] || null;
};

function renderHighlightedText(text: string) {
  if (!text) return null;
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <span key={index} className="text-[#FF4F18]">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}

export function SolutionsDetailsSharedContent({ defaultModule }: SolutionsDetailsSharedProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const moduleParam = defaultModule || searchParams?.get('module');
  const [activeKey, setActiveKey] = useState<string>("pos");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [solutionsList, setSolutionsList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSolutionsData = async () => {
      try {
        const loaded = await solutionsService.getSolutions();
        if (loaded && loaded.length > 0) {
          setSolutionsList(loaded);
        } else {
          setSolutionsList(Object.values(solutionsDb));
        }
      } catch (err) {
        console.warn('Failed to fetch solutions from Firestore. Using static fallback database:', err);
        setSolutionsList(Object.values(solutionsDb));
      } finally {
        setLoading(false);
      }
    };

    loadSolutionsData();
  }, []);

  useEffect(() => {
    if (moduleParam) {
      setActiveKey(moduleParam);
    } else if (solutionsList.length > 0) {
      setActiveKey(solutionsList[0].slug || 'pos');
    }
  }, [moduleParam, solutionsList]);

  const solution = solutionsList.find(s => s.slug === activeKey || s.id === activeKey) || solutionsList[0] || Object.values(solutionsDb)[0];

  const handleSelectSolution = (slug: string) => {
    if (defaultModule) {
      router.push(`/solutions/${slug}`);
    } else {
      setActiveKey(slug);
    }
    setIsDropdownOpen(false);
  };

  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);
  const [simState, setSimState] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    setActiveFeatureIdx(0);
    setSimState("idle");
  }, [activeKey]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0d0d0e] flex flex-col items-center justify-center font-sans">
        <div className="w-10 h-10 border-4 border-zinc-200 dark:border-zinc-800 border-t-[#FF4F18] rounded-full animate-spin mb-4"></div>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm font-semibold tracking-wide uppercase">Loading System...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0e] transition-colors duration-300 flex flex-col font-sans">
      <Header />

      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40 bg-transparent cursor-default" 
          onClick={() => setIsDropdownOpen(false)} 
        />
      )}

      <main className="flex-grow space-y-0">
        
        {/* Dropdown navigation selector */}
        <section className="bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-150 dark:border-zinc-800/80 sticky top-20 z-40">
          <div className="mx-auto max-w-7xl px-6 md:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex items-center gap-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full px-5 py-2 text-sm font-bold text-zinc-800 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700/80 transition-all shadow-sm select-none cursor-pointer"
              >
                <span className="text-[#FF4F18] flex items-center shrink-0">
                  {resolveIcon(solution.icon)}
                </span>
                <span>{solution.shortLabel}</span>
                <svg className={`w-4 h-4 opacity-60 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-2.5 w-64 bg-white dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-750 rounded-2xl shadow-xl z-50 py-2.5 overflow-hidden animate-[fadeIn_0.15s_ease-out] select-none text-left">
                  {solutionsList.map((item) => (
                    <button
                      key={item.slug || item.id}
                      onClick={() => handleSelectSolution(item.slug || item.id)}
                      className={`w-full flex items-center gap-3 px-4.5 py-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer ${
                        activeKey === (item.slug || item.id) ? 'bg-[#FF4F18]/5 text-[#FF4F18]' : 'text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <span className={`flex items-center shrink-0 ${activeKey === (item.slug || item.id) ? 'text-[#FF4F18]' : 'text-zinc-400 dark:text-zinc-500'}`}>
                        {resolveIcon(item.icon)}
                      </span>
                      <span className="text-sm font-bold">{item.shortLabel}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-full border border-zinc-200/20">
              {solutionsList.map((item) => {
                const isSelected = activeKey === (item.slug || item.id);
                return (
                  <button
                    key={item.slug || item.id}
                    onClick={() => handleSelectSolution(item.slug || item.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wide transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-white dark:bg-zinc-750 text-zinc-900 dark:text-white shadow-sm' 
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
                    }`}
                  >
                    {item.shortLabel.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8 text-left">
              <div className="max-w-xl space-y-6 md:space-y-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                  {solution.title && solution.title.includes('*') ? (
                    renderHighlightedText(solution.title)
                  ) : (
                    (() => {
                      const words = (solution.title || '').split(' ');
                      if (words.length <= 1) return solution.title;
                      const highlightCount = words.length >= 3 ? 2 : 1;
                      const splitIndex = words.length - highlightCount;
                      const normalText = words.slice(0, splitIndex).join(' ');
                      const orangeText = words.slice(splitIndex).join(' ');
                      return (
                        <>
                          {normalText}{' '}
                          <span className="text-[#FF4F18]">{orangeText}</span>
                        </>
                      );
                    })()
                  )}
                </h1>

                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {solution.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <button className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-8 py-3.5 text-[15px] font-bold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer">
                  {solution.ctaText === 'Request a Demo' ? 'Book a demo' : solution.ctaText}
                </button>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800/80 max-w-sm">
                <div className="flex -space-x-3">
                  {[
                    { text: 'R', bg: 'bg-[#ECECEC]', textCol: 'text-zinc-600' },
                    { text: 'C', bg: 'bg-[#D2E9E9]', textCol: 'text-teal-600' },
                    { text: 'B', bg: 'bg-[#FFE5D9]', textCol: 'text-orange-600' },
                    { text: 'K', bg: 'bg-[#E8EAFF]', textCol: 'text-indigo-600' },
                  ].map((circle, idx) => (
                    <div
                      key={idx}
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${circle.bg} ${circle.textCol} font-extrabold text-xs border-2 border-white dark:border-zinc-900`}
                    >
                      {circle.text}
                    </div>
                  ))}
                </div>
                <p className="text-xs md:text-sm text-zinc-500 max-w-xs leading-normal">
                  {solution.trustText || "Trusted by restaurants, cafés, microbreweries and cloud kitchens across India."}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center w-full">
              {(() => {
                const activeFeature = solution.features[activeFeatureIdx] || solution.features[0] || { title: 'System Core', desc: 'Main operations layer.' };
                return (
                  <div className="w-full max-w-[500px] bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.015)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[24px] p-6 md:p-8 relative overflow-hidden flex flex-col gap-5 select-none text-left">
                    <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/80 pb-4">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF4F18]">
                        Interactive Module Simulator
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#10B981]">Live</span>
                      </span>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-0.5">Select Active Feature:</span>
                      <div className="grid grid-cols-3 gap-3">
                        {solution.features.slice(0, 3).map((feat: any, idx: number) => {
                          const isActive = activeFeatureIdx === idx;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setActiveFeatureIdx(idx);
                                setSimState("idle");
                              }}
                              className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                                isActive
                                  ? "bg-[#FF4F18] border-[#FF4F18] text-white shadow-[0_4px_14px_rgba(255,79,24,0.3)]"
                                  : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200/60 dark:border-zinc-800 text-zinc-650 dark:text-zinc-300 hover:border-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                              }`}
                            >
                              <span className="text-xs font-black truncate max-w-full leading-tight">
                                {feat.title.split(' ').slice(0, 2).join(' ')}
                              </span>
                              <span className={`text-[9px] font-bold mt-0.5 ${isActive ? "text-white/95" : "text-zinc-400 dark:text-zinc-500"}`}>
                                {idx === 0 ? "Ready" : idx === 1 ? "Active" : "Online"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-[#F8F9FA] dark:bg-zinc-800/50 p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 space-y-3 min-h-[150px] flex flex-col justify-between">
                      {simState === "success" ? (
                        <div className="flex flex-col items-center justify-center text-center gap-2 py-4 h-full my-auto animate-[fadeIn_0.3s_ease]">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-[#10B981]">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h5 className="text-[14px] font-bold text-emerald-800 dark:text-emerald-400">
                            Simulation Verified Successfully
                          </h5>
                          <p className="text-[11px] text-zinc-500 leading-normal max-w-xs">
                            Operating stats recorded. 99.9% uptime verified.
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            <h4 className="text-[14px] font-extrabold text-zinc-900 dark:text-white leading-snug">
                              {activeFeature.title}
                            </h4>
                            <p className="text-[11px] sm:text-[12px] text-zinc-650 dark:text-zinc-400 leading-relaxed">
                              {activeFeature.desc}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/60">
                            {activeFeature.speed && (
                              <div className="flex flex-col">
                                <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 tracking-wide uppercase leading-none">Speed</span>
                                <span className="text-xs font-extrabold text-zinc-700 dark:text-zinc-300 mt-1">{activeFeature.speed}</span>
                              </div>
                            )}
                            {activeFeature.accuracy && (
                              <div className="flex flex-col border-l border-zinc-200/60 dark:border-zinc-800/80 pl-3">
                                <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 tracking-wide uppercase leading-none">Accuracy</span>
                                <span className="text-xs font-extrabold text-zinc-700 dark:text-zinc-300 mt-1">{activeFeature.accuracy}</span>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        if (simState === "success") {
                          setSimState("idle");
                          return;
                        }
                        setSimState("loading");
                        setTimeout(() => {
                          setSimState("success");
                        }, 1200);
                      }}
                      disabled={simState === "loading"}
                      className="w-full py-3.5 rounded-2xl bg-zinc-900 dark:bg-zinc-850 hover:bg-zinc-800 dark:hover:bg-zinc-800 border border-zinc-200/10 text-white font-extrabold text-xs tracking-wider uppercase transition-colors shadow-sm select-none cursor-pointer flex items-center justify-center min-h-[46px]"
                    >
                      {simState === "loading" ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : simState === "success" ? (
                        "Reset Simulator"
                      ) : (
                        "Run Simulation Test"
                      )}
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="bg-zinc-50 dark:bg-[#0c0c0d] border-t border-b border-zinc-150/80 dark:border-zinc-800/80 py-16 md:py-24 text-left">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-14">
              <div className="lg:col-span-7 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF4F18] block mb-2">
                  {solution.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-[850] tracking-tight leading-tight text-zinc-900 dark:text-white">
                  {solution.whyChooseTitle || "Why choose Digitory?"}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solution.whyChoose.map((item: any, idx: number) => (
                <div 
                  key={idx}
                  className="bg-white dark:bg-zinc-900/60 p-6 md:p-8 rounded-[24px] border border-zinc-200/50 dark:border-zinc-850 hover:border-zinc-300 dark:hover:border-zinc-800 hover:shadow-[0_8px_30px_rgb(0,0,0,0.01)] transition-all duration-300 flex flex-col justify-between text-left"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#FF4F18]/5 text-[#FF4F18] flex items-center justify-center font-extrabold text-sm border border-[#FF4F18]/10 shrink-0">
                      0{idx + 1}
                    </div>
                    <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Operational Outcomes / Metrics */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16 text-left">
          <div className="mb-16 md:mb-20 text-center">
            <h2 className="text-center text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
              {solution.metricsTitle ? (
                renderHighlightedText(solution.metricsTitle)
              ) : (
                <>Real operational <span className="text-[#FF4F18]">outcomes & metrics</span></>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-y-12 gap-x-4 md:grid-cols-4 md:gap-0 text-center">
            {(solution.metricsItems && solution.metricsItems.length > 0 ? solution.metricsItems : [
              { value: "22%", label: "Faster Table Turnover", desc: "Reduce wait times during peak shifts" },
              { value: "32%", label: "Less Ingredient Waste", desc: "Optimise portions & control recipes" },
              { value: "98%", label: "KDS Accuracy", desc: "Eliminate order errors & lost tickets" },
              { value: "15 hrs", label: "Saved Weekly", desc: "Cut manual inventory check stress" }
            ]).map((stat: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center px-4 md:border-r md:border-zinc-200 dark:md:border-zinc-800 last:border-r-0">
                <h3 className="text-2xl md:text-3xl font-bold leading-tight max-w-[260px]">
                  <span className="text-[#FF4F18]">{stat.value}</span>
                </h3>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight max-w-[260px]">
                  <span className="text-zinc-900 dark:text-white">{stat.label}</span>
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3 max-w-[260px] leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Operations Reveal Panel */}
        {solution.opsTitle && (
          <ScrollFocusWrapper>
            <OperationsReveal 
              title={solution.opsTitle}
              words={solution.opsParagraph ? solution.opsParagraph.split(' ') : undefined}
              highlights={solution.opsHighlights ? solution.opsHighlights.split(/[\s·]+/) : undefined}
            />
          </ScrollFocusWrapper>
        )}

        {/* 4. How Digitory's Layer Works */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-12">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
                {solution.layerTitle ? (
                  renderHighlightedText(solution.layerTitle)
                ) : (
                  <>One unified layer, <span className="text-[#FF4F18]">infinite control</span></>
                )}
              </h2>
            </div>
            <div className="lg:col-span-5 text-zinc-650 dark:text-zinc-350 text-sm md:text-base leading-relaxed lg:pt-2">
              <p>
                {solution.layerDesc || "Digitory works as a smart, real-time operating layer. We interface directly with POS, inventory levels, recipe configurations, and KDS monitors to automate every task seamlessly."}
              </p>
            </div>
          </div>

          <div className="border border-zinc-200 dark:border-zinc-800 rounded-[28px] overflow-hidden bg-white dark:bg-[#0d0d0e] grid grid-cols-1 md:grid-cols-3">
            {solution.whyChoose.slice(0, 3).map((item: any, idx: number) => (
              <div 
                key={idx}
                className={`p-8 sm:p-10 flex flex-col justify-start transition-all duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 text-left ${
                  idx === 0 ? 'border-b border-zinc-200 dark:border-zinc-800 md:border-r md:border-b-0' :
                  idx === 1 ? 'border-b border-zinc-200 dark:border-zinc-800 md:border-r md:border-b-0' :
                  ''
                }`}
              >
                <span className="text-sm font-bold text-zinc-400 mb-2">0{idx + 1}</span>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 mt-4">
                  {item.title}
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Suitability Outlets Grid */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24 text-center">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF4F18]">Suitability</span>
              <h2 className="text-3xl sm:text-4xl font-[850] text-zinc-900 dark:text-white tracking-tight leading-tight">
                {solution.businessTypesTitle || "Suitable for every dining format"}
              </h2>
              {solution.businessTypesDesc && (
                <p className="text-sm sm:text-base text-zinc-500 max-w-xl mx-auto">
                  {solution.businessTypesDesc}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {solution.businessTypes.map((item: any, idx: number) => (
                <div 
                  key={idx}
                  className="bg-white dark:bg-zinc-900/40 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 text-left hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300"
                >
                  <h4 className="text-md font-bold text-zinc-950 dark:text-white mb-2.5 flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F18]" />
                    {item.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-650 dark:text-zinc-350 leading-relaxed font-semibold">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Extra Growth / Support */}
        {(solution.extraGrowth || solution.integrations || solution.supportItems || solution.securityItems || solution.extraOwnersChoice) && (
          <section className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24 text-left border-t border-zinc-100 dark:border-zinc-800/80">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-x-12 lg:gap-x-16 items-start">
              
              {solution.extraGrowth && (
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF4F18]">Scalability</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                    {solution.extraGrowth.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {solution.extraGrowth.desc}
                  </p>
                </div>
              )}

              {solution.extraOwnersChoice && (
                <div className="space-y-4 md:border-l md:border-zinc-200/60 dark:md:border-zinc-800/60 md:pl-8 lg:pl-12">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF4F18]">Business Value</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                    {solution.extraOwnersChoice.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {solution.extraOwnersChoice.desc}
                  </p>
                </div>
              )}

              {solution.supportItems && (
                <div className="space-y-5 md:border-l md:border-zinc-200/60 dark:md:border-zinc-800/60 md:pl-8 lg:pl-12">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF4F18]">Customer Success</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight mt-1">
                      Support you can count on
                    </h3>
                  </div>
                  <ul className="space-y-3.5">
                    {solution.supportItems.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#FF4F18] font-bold text-sm shrink-0">✓</span>
                        <span className="text-sm text-zinc-650 dark:text-zinc-350 font-semibold leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </section>
        )}

        <SolutionsDetailsFaq items={solution.faqs} />
        <InsightsPage />

        <SolutionsDetailsCta 
          title={solution.ctaBlock?.title} 
          desc={solution.ctaBlock?.desc} 
        />

      </main>

      <FooterPage />
    </div>
  );
}

function ScrollFocusWrapper({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}

export function SolutionsDetailsFaq({ items }: { items?: { question: string; answer: string }[] }) {
  const [openId, setOpenId] = useState<number | null>(1);

  const handleToggle = (id: number) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const defaultFaqs = [
    {
      question: "How does Digitory manage orders from different platforms?",
      answer: "Whether it's dine-in, online orders, QR or direct orders, everything flows into one connected system, so you never have to switch between multiple apps."
    },
    {
      question: "How does the kitchen stay in sync during rush hours?",
      answer: "Orders are sent to the right kitchen station instantly, reducing communication gaps, delays and missed tickets when every second counts."
    },
    {
      question: "Can Digitory help reduce inventory wastage?",
      answer: "Yes. Inventory updates automatically with every sale, helping you track stock movement, reduce wastage and protect your margins."
    },
    {
      question: "Can I manage customer loyalty and repeat business?",
      answer: "Absolutely. Build customer profiles, run loyalty programs and targeted campaigns that keep guests coming back."
    },
    {
      question: "Will I get real-time reports and insights?",
      answer: "Yes. Monitor sales, inventory, outlet performance and business trends in real time, so you can make faster, data-backed decisions."
    },
    {
      question: "Can I manage multiple outlets from one dashboard?",
      answer: "Yes. Compare outlet performance, monitor operations, and track key metrics across all your locations without chasing managers for updates."
    },
    {
      question: "Will billing slow us down during peak hours?",
      answer: "Not at all. Digitory is built for handling chaos better, helping your team bill faster, reducing queues, and keeping operations moving smoothly during rush hours."
    }
  ];

  const faqsToRender = items && items.length > 0
    ? items.map((item, index) => ({ id: index + 1, question: item.question, answer: item.answer }))
    : defaultFaqs.map((item, index) => ({ id: index + 1, question: item.question, answer: item.answer }));

  return (
    <div className="bg-white font-sans antialiased text-[#111111] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-14 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight leading-[1.15] text-[#111111] dark:text-white">
            Questions before you <span className="text-[#FF4F18]">commit?</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto border-t border-zinc-100">
          {faqsToRender.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="border-b border-zinc-100"
              >
                <button
                  onClick={() => handleToggle(item.id)}
                  className="w-full flex items-center justify-between py-6 text-left outline-none cursor-pointer group"
                >
                  <span className="text-[16px] sm:text-[18px] font-bold text-[#111111] pr-6 transition-colors duration-200 group-hover:text-zinc-600">
                    {item.question}
                  </span>
                  <span className="text-[#FF4F18] font-[400] text-[26px] leading-none select-none flex-shrink-0 w-6 text-right transition-transform duration-200">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-[250px] pb-6 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <p className="text-[15px] sm:text-[16px] text-[#666666] leading-relaxed max-w-[90%]">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

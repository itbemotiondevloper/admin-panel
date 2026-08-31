import React from 'react';

interface StatsProps {
  stats?: {
    value: string;
    label: string;
  }[];
}

export default function SolutionsStats({ stats }: StatsProps) {
  const defaultStats = [
    { value: "22%", label: "Faster Table Turnover" },
    { value: "32%", label: "Less Raw Wastage" },
    { value: "98%", label: "Order Kitchen Accuracy" },
    { value: "15 hrs", label: "Saved Weekly per Manager" }
  ];

  const items = stats || defaultStats;

  return (
    <div className="w-full select-none">
      <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-2 gap-y-12 gap-x-4 md:grid-cols-4 md:gap-0 text-center w-full">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center px-4 md:border-r md:border-zinc-200 dark:md:border-zinc-800 last:border-r-0"
            >
              <h3 className="text-2xl md:text-3xl font-bold leading-tight max-w-[260px]">
                <span className="text-[#FF4F18]">{item.value}</span>
              </h3>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight max-w-[260px]">
                <span className="text-zinc-900 dark:text-white">{item.label}</span>
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

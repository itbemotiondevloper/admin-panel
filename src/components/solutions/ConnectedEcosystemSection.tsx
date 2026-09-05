'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';

interface Scenario {
  id: string;
  title: string;
  capabilities: string[];
  description: string;
}

const scenarios: Scenario[] = [
  {
    id: 'visibility',
    title: 'Need More Visibility?',
    capabilities: ['SEO', 'Content', 'Website Development'],
    description:
      'Align your website design, content authority, and search engine optimization to establish search dominance and capture high-intent organic traffic.',
  },
  {
    id: 'leads',
    title: 'Need More Qualified Leads?',
    capabilities: ['SEO', 'Content', 'Performance Marketing', 'Website Development'],
    description:
      'Combine strategic search positioning, targeted paid campaigns, conversion-focused landing pages, and compelling messaging to drive qualified leads.',
  },
  {
    id: 'launch',
    title: 'Launching Something New?',
    capabilities: ['Website Development', 'Content', 'SEO', 'Performance Marketing'],
    description:
      'Build market presence rapidly with a high-performance web experience, launch content strategy, organic search groundwork, and targeted ad distribution.',
  },
  {
    id: 'custom',
    title: 'Need a Custom Digital Solution?',
    capabilities: ['Custom Development', 'AI & Technology Solutions'],
    description:
      'Engineer bespoke software applications, API integrations, workflow automation, and intelligent AI models built around your exact business requirements.',
  },
];

// Capability node positions in SVG coordinate space (400×360 viewBox)
const NODES: { id: string; label: string; x: number; y: number; accent: string }[] = [
  { id: 'Website Development',    label: 'Website Dev',         x: 200, y: 50,  accent: '#D6DCDC' },
  { id: 'SEO',                    label: 'SEO',                 x: 340, y: 130, accent: '#A78BFA' },
  { id: 'Content',                label: 'Content',             x: 340, y: 240, accent: '#E2E8F0' },
  { id: 'Performance Marketing',  label: 'Performance',         x: 200, y: 320, accent: '#818CF8' },
  { id: 'Custom Development',     label: 'Custom Dev',          x: 60,  y: 240, accent: '#C1B6FF' },
  { id: 'AI & Technology Solutions', label: 'AI & Tech',        x: 60,  y: 130, accent: '#94A3B8' },
];

// Pre-defined edges between capability nodes
const EDGES: [string, string][] = [
  ['Website Development', 'SEO'],
  ['Website Development', 'Content'],
  ['Website Development', 'Performance Marketing'],
  ['SEO', 'Content'],
  ['Content', 'Performance Marketing'],
  ['SEO', 'Performance Marketing'],
  ['Custom Development', 'AI & Technology Solutions'],
  ['Custom Development', 'Website Development'],
  ['AI & Technology Solutions', 'SEO'],
];

function getNodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

interface EcosystemNetworkProps {
  activeCapabilities: string[];
}

function EcosystemNetwork({ activeCapabilities }: EcosystemNetworkProps) {
  return (
    <svg
      viewBox="0 0 400 380"
      className="w-full h-full"
      aria-hidden
    >
      {/* Edge lines */}
      {EDGES.map(([a, b], i) => {
        const na = getNodeById(a);
        const nb = getNodeById(b);
        const bothActive =
          activeCapabilities.includes(a) && activeCapabilities.includes(b);
        const eitherActive =
          activeCapabilities.includes(a) || activeCapabilities.includes(b);

        return (
          <line
            key={i}
            x1={na.x} y1={na.y}
            x2={nb.x} y2={nb.y}
            stroke={bothActive ? '#C1B6FF' : 'rgba(214,220,220,0.06)'}
            strokeWidth={bothActive ? 1.5 : 0.8}
            strokeDasharray={bothActive ? '0' : '4 3'}
            opacity={bothActive ? 0.7 : eitherActive ? 0.12 : 0.06}
            style={{ transition: 'all 0.4s ease' }}
          />
        );
      })}

      {/* Nodes */}
      {NODES.map((node) => {
        const isActive = activeCapabilities.includes(node.id);
        return (
          <g key={node.id}>
            {/* Outer glow ring when active */}
            {isActive && (
              <circle
                cx={node.x}
                cy={node.y}
                r={32}
                fill={node.accent}
                fillOpacity={0.05}
                style={{ transition: 'all 0.4s ease' }}
              />
            )}

            {/* Node background circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r={24}
              fill={isActive ? node.accent : '#0C0C0C'}
              fillOpacity={isActive ? 0.12 : 1}
              stroke={isActive ? node.accent : 'rgba(214,220,220,0.08)'}
              strokeWidth={isActive ? 1.5 : 1}
              style={{ transition: 'all 0.4s ease' }}
            />

            {/* Inner dot */}
            <circle
              cx={node.x}
              cy={node.y}
              r={5}
              fill={isActive ? node.accent : 'rgba(214,220,220,0.2)'}
              style={{
                filter: isActive ? `drop-shadow(0 0 6px ${node.accent})` : undefined,
                transition: 'all 0.4s ease',
              }}
            />

            {/* Label */}
            <text
              x={node.x}
              y={node.y + 38}
              textAnchor="middle"
              fontSize={10}
              fontFamily="Barlow, sans-serif"
              letterSpacing="0.5"
              fill={isActive ? node.accent : 'rgba(214,220,220,0.3)'}
              fontWeight={isActive ? 600 : 400}
              style={{ transition: 'all 0.4s ease' }}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function ConnectedEcosystemSection() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('leads');
  const activeScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[1];

  return (
    <section className="relative w-full bg-white dark:bg-black overflow-x-clip py-24 md:py-32 transition-colors duration-300">
      <div
        className="w-full h-px absolute top-0 left-0 bg-slate-200 dark:bg-transparent"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(214,220,220,0.07), transparent)' }}
      />
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10"
        style={{
          background: 'radial-gradient(circle, #C1B6FF 0%, transparent 65%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block w-5 h-px bg-slate-400 dark:bg-[#D6DCDC]/40" />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-[#D6DCDC]/50"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              Connected Solutions
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl font-normal leading-[1.1] tracking-tight text-slate-900 dark:text-[#D6DCDC] mb-6"
            style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
          >
            Digital Services Designed to Work Better Together
          </h2>

          <p
            className="text-base sm:text-lg text-slate-600 dark:text-[#D6DCDC]/50 leading-relaxed"
            style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
          >
            Single-service tactics create fragmented results. We build connected digital ecosystems where each solution reinforces the others.
          </p>
        </div>

        {/* ── Interactive layout ── */}
        <div
          className="rounded-[32px] relative overflow-hidden bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-[#D6DCDC]/10 transition-colors duration-300"
        >
          {/* Top hairline gradient */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px opacity-50"
            style={{ background: 'linear-gradient(90deg, transparent, #C1B6FF, #818CF8, transparent)' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">

            {/* ── LEFT: Scenario List ── */}
            <div className="lg:col-span-4 p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-[#D6DCDC]/10">
              <div>
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-[#D6DCDC]/40 block mb-6"
                  style={{ fontFamily: 'Barlow, sans-serif' }}
                >
                  Choose Your Goal
                </span>

                <div className="space-y-2">
                  {scenarios.map((scenario) => {
                    const isActive = scenario.id === activeScenarioId;
                    return (
                      <button
                        key={scenario.id}
                        onClick={() => setActiveScenarioId(scenario.id)}
                        type="button"
                        className={`w-full text-left p-4 rounded-2xl transition-all duration-300 cursor-pointer border ${
                          isActive
                            ? 'bg-slate-200/80 dark:bg-[#C1B6FF]/10 border-slate-300 dark:border-[#C1B6FF]/30'
                            : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h3
                            className={`text-sm sm:text-base font-normal transition-colors ${
                              isActive
                                ? 'text-slate-900 dark:text-[#C1B6FF]'
                                : 'text-slate-600 dark:text-[#D6DCDC]/55'
                            }`}
                            style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
                          >
                            {scenario.title}
                          </h3>
                          <span
                            className={`text-sm transition-all ${
                              isActive
                                ? 'text-slate-900 dark:text-[#C1B6FF] translate-x-1'
                                : 'text-slate-400 dark:text-[#D6DCDC]/20 translate-x-0'
                            }`}
                          >
                            →
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-200 bg-[#A78BFA] text-black hover:bg-[#B89FFF] cursor-pointer shadow-md shadow-[#A78BFA]/20"
                  style={{
                    fontFamily: 'Barlow, sans-serif',
                    letterSpacing: '0.1em',
                  }}
                >
                  LET'S BUILD YOUR STRATEGY →
                </Link>
              </div>
            </div>

            {/* ── CENTER: SVG Network ── */}
            <div
              className="lg:col-span-5 p-6 flex items-center justify-center min-h-[360px] border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-[#D6DCDC]/10"
            >
              <EcosystemNetwork activeCapabilities={activeScenario.capabilities} />
            </div>

            {/* ── RIGHT: Active scenario info ── */}
            <div className="lg:col-span-3 p-8 md:p-10 flex flex-col justify-center">
              {/* Meta */}
              <div
                className="mb-6 pb-4 border-b border-slate-200 dark:border-[#D6DCDC]/10"
              >
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-[#C1B6FF]/70 block mb-1"
                  style={{ fontFamily: 'Barlow, sans-serif' }}
                >
                  Active Capabilities
                </span>
                <span
                  className="text-2xl font-normal text-slate-900 dark:text-[#D6DCDC]"
                  style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
                >
                  {activeScenario.capabilities.length}
                </span>
              </div>

              <h4
                className="text-lg font-normal text-slate-900 dark:text-[#D6DCDC] mb-3"
                style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
              >
                {activeScenario.title}
              </h4>
              <p
                className="text-sm leading-relaxed mb-6 text-slate-600 dark:text-[#D6DCDC]/45"
                style={{
                  fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif",
                }}
              >
                {activeScenario.description}
              </p>

              {/* Active capability list */}
              <div className="space-y-2">
                {activeScenario.capabilities.map((cap) => {
                  const node = NODES.find((n) => n.id === cap);
                  return (
                    <div
                      key={cap}
                      className="flex items-center gap-2 text-xs font-semibold"
                      style={{
                        fontFamily: 'Barlow, sans-serif',
                        color: node?.accent || '#818CF8',
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: node?.accent || '#818CF8' }}
                      />
                      {cap}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* ── Mobile accordion (hidden on large screens) ── */}
        <div className="lg:hidden mt-8 space-y-3">
          {scenarios.map((scenario) => {
            const isActive = scenario.id === activeScenarioId;
            return (
              <div
                key={scenario.id}
                className="rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-[#D6DCDC]/10"
              >
                <button
                  onClick={() => setActiveScenarioId(scenario.id)}
                  type="button"
                  className="w-full flex items-center justify-between p-5 cursor-pointer"
                >
                  <span
                    className={`text-sm font-normal ${
                      isActive ? 'text-slate-900 dark:text-[#C1B6FF]' : 'text-slate-600 dark:text-[#D6DCDC]/65'
                    }`}
                    style={{ fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif" }}
                  >
                    {scenario.title}
                  </span>
                  <span
                    className={`text-lg transition-transform duration-300 ${
                      isActive ? 'text-slate-900 dark:text-[#C1B6FF] rotate-90' : 'text-slate-400 dark:text-[#D6DCDC]/25 rotate-0'
                    }`}
                  >
                    →
                  </span>
                </button>
                {isActive && (
                  <div
                    className="px-5 pb-5 border-t border-slate-200 dark:border-white/5"
                  >
                    <p
                      className="text-sm leading-relaxed mb-4 mt-4 text-slate-600 dark:text-[#D6DCDC]/50"
                      style={{
                        fontFamily: "'Wix Madefor Text', 'Helvetica Neue', Arial, sans-serif",
                      }}
                    >
                      {scenario.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {scenario.capabilities.map((cap) => {
                        const node = NODES.find((n) => n.id === cap);
                        return (
                          <span
                            key={cap}
                            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-200 text-slate-900 dark:bg-[#D6DCDC]/10 dark:text-[#D6DCDC]"
                            style={{
                              fontFamily: 'Barlow, sans-serif',
                            }}
                          >
                            {cap}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

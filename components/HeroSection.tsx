"use client";

import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { StatItem } from '../src/types';

interface HeroSectionProps {
  stats: StatItem[];
  onSearch?: (query: string) => void;
  onOpenSearchModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  stats,
  onSearch,
  onOpenSearchModal,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch?.(searchInput.trim());
    } else {
      onOpenSearchModal?.();
    }
  };

  const sampleKeywords = [
    'Research Methodology',
    'Climate Resilience',
    'Open Access Fellowship',
    'Quantum Systems',
    'Cognitive Science',
  ];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen pt-28 pb-16 sm:pb-24 flex flex-col justify-between overflow-hidden bg-slate-950 text-white"
      aria-label="FEBROS16 Hero Section"
    >
      {/* Cinematic Mountain Sunrise Backdrop */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#091e3a] to-[#030712]" />

        {/* Sunrise radial illumination */}
        <div className="absolute top-[35%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] sm:w-[1100px] sm:h-[600px] bg-gradient-to-tr from-amber-500/25 via-orange-500/15 to-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Stars */}
        <div className="absolute top-10 left-10 w-1 h-1 bg-white/70 rounded-full blur-[0.5px]" />
        <div className="absolute top-24 left-1/4 w-1.5 h-1.5 bg-blue-200/60 rounded-full blur-[0.5px]" />
        <div className="absolute top-16 right-1/4 w-1 h-1 bg-white/80 rounded-full" />
        <div className="absolute top-36 right-16 w-1 h-1 bg-sky-300/60 rounded-full" />
        <div className="absolute top-8 left-2/3 w-1.5 h-1.5 bg-amber-100/70 rounded-full" />

        {/* Layered Mountain Landscape SVG */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[65%] sm:h-[75%] lg:h-[80%] object-cover preserve-3d"
          viewBox="0 0 1440 700"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="sunGlowHero" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#ea580c" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="backMountainsHero" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#0f172a" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="midMountainsHero" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#0f172a" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#020617" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="foregroundCliffHero" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0b1329" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#020617" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Sun */}
          <circle cx="820" cy="300" r="90" fill="url(#sunGlowHero)" />
          <circle cx="820" cy="300" r="28" fill="#fffbeb" opacity="0.95" />

          {/* Mountain Ridges */}
          <path
            d="M0 450 L120 380 L280 430 L450 340 L590 410 L730 330 L850 370 L1010 310 L1180 390 L1320 330 L1440 370 L1440 700 L0 700 Z"
            fill="url(#backMountainsHero)"
            opacity="0.65"
          />
          <path
            d="M0 490 L180 420 L340 480 L520 390 L680 470 L890 410 L1080 480 L1250 430 L1440 500 L1440 700 L0 700 Z"
            fill="url(#midMountainsHero)"
            opacity="0.88"
          />
          <path
            d="M0 580 L220 530 L460 590 L710 520 L960 560 L1150 490 L1310 440 L1440 410 L1440 700 L0 700 Z"
            fill="url(#foregroundCliffHero)"
          />

          {/* Elevated Viewpoint & Seated Explorer Silhouette */}
          <path
            d="M1020 700 L1080 520 L1160 480 L1220 460 L1270 440 L1320 450 L1380 490 L1440 520 L1440 700 Z"
            fill="#030712"
          />
          <g transform="translate(1215, 385) scale(0.65)" fill="#020617">
            <circle cx="50" cy="22" r="9" />
            <path d="M42 31 C36 42, 35 58, 38 68 C45 70, 58 70, 64 68 C66 56, 64 42, 58 31 Z" />
            <path d="M45 42 Q30 52 38 65 Q45 68 50 62 Z" />
            <path d="M38 68 L25 80 L35 94 L50 94 L55 82 L64 68 Z" />
            <rect x="62" y="70" width="14" height="20" rx="2" transform="rotate(-15 62 70)" fill="#1e293b" />
          </g>
        </svg>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-slate-950/80" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-3xl text-left">
          <div className="inline-flex items-center gap-2 mb-4 text-xs sm:text-sm font-semibold tracking-wider text-blue-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>FEBROS16 · Long-Term Knowledge Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] text-balance">
            A platform for knowledge, research and information
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl text-balance">
            Explore articles, educational materials, research resources, opportunities and more in one place.
          </p>

          {/* Search Bar */}
          <div className="mt-8 sm:mt-10">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 hover:border-blue-500/70 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30 rounded-2xl p-2 sm:p-2.5 shadow-2xl shadow-black/60 transition-all"
            >
              <div className="pl-3 pr-2 text-slate-400">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>

              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for topics, articles, research, resources..."
                className="w-full bg-transparent py-2.5 px-2 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
                aria-label="Search topics, articles, research, and resources"
              />

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-600/30 whitespace-nowrap cursor-pointer"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4 hidden sm:inline" />
              </button>
            </form>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-400">Popular:</span>
              {sampleKeywords.map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => onSearch?.(keyword)}
                  className="text-slate-300 hover:text-white hover:underline focus:outline-none transition-colors cursor-pointer"
                >
                  {keyword}
                  <span className="text-slate-600 ml-2" aria-hidden="true">·</span>
                </button>
              ))}
            </div>
          </div>

          {/* Hero Statistics */}
          <div className="mt-10 sm:mt-12 pt-8 border-t border-slate-800/80">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-mono tracking-tight tabular-nums">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-400">
                    {stat.label}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400 line-clamp-1">
                    {stat.description.split(',')[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

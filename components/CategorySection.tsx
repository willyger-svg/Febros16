"use client";

import React from 'react';
import {
  GraduationCap,
  Cpu,
  Trees,
  Microscope,
  Award,
  Users,
  HeartPulse,
  Compass,
  ArrowUpRight,
} from 'lucide-react';
import { CategoryItem } from '../src/types';

interface CategorySectionProps {
  categories: CategoryItem[];
  onSelectCategory?: (category: CategoryItem) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categories,
  onSelectCategory,
}) => {
  const renderCategoryIcon = (iconName: string) => {
    const iconClass = 'w-6 h-6 text-white';
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className={iconClass} />;
      case 'Cpu':
        return <Cpu className={iconClass} />;
      case 'Trees':
        return <Trees className={iconClass} />;
      case 'Microscope':
        return <Microscope className={iconClass} />;
      case 'Award':
        return <Award className={iconClass} />;
      case 'Users':
        return <Users className={iconClass} />;
      case 'HeartPulse':
        return <HeartPulse className={iconClass} />;
      case 'Compass':
        return <Compass className={iconClass} />;
      default:
        return <Compass className={iconClass} />;
    }
  };

  const renderCategoryGraphic = (id: string) => {
    switch (id) {
      case 'education':
        return (
          <svg className="absolute inset-0 w-full h-full opacity-35 object-cover" viewBox="0 0 400 300" fill="none">
            <rect width="400" height="300" fill="#1e3a8a" />
            <path d="M50 180 L200 90 L350 180 L200 240 Z" stroke="#93c5fd" strokeWidth="3" fill="#1e40af" opacity="0.6" />
            <line x1="200" y1="240" x2="200" y2="280" stroke="#93c5fd" strokeWidth="3" />
            <circle cx="340" cy="200" r="14" fill="#60a5fa" opacity="0.7" />
          </svg>
        );
      case 'technology':
        return (
          <svg className="absolute inset-0 w-full h-full opacity-35 object-cover" viewBox="0 0 400 300" fill="none">
            <rect width="400" height="300" fill="#083344" />
            <path d="M50 50 H350 V250 H50 Z" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="200" cy="150" r="45" stroke="#06b6d4" strokeWidth="4" />
            <path d="M120 150 H155 M245 150 H280 M200 70 V105 M200 195 V230" stroke="#38bdf8" strokeWidth="3" />
          </svg>
        );
      case 'environment':
        return (
          <svg className="absolute inset-0 w-full h-full opacity-35 object-cover" viewBox="0 0 400 300" fill="none">
            <rect width="400" height="300" fill="#064e3b" />
            <path d="M0 250 Q100 180 200 220 T400 160 L400 300 L0 300 Z" fill="#047857" opacity="0.8" />
            <path d="M80 230 L130 140 L180 230 Z" fill="#10b981" opacity="0.9" />
            <path d="M220 220 L270 120 L320 220 Z" fill="#34d399" opacity="0.9" />
          </svg>
        );
      case 'research':
        return (
          <svg className="absolute inset-0 w-full h-full opacity-35 object-cover" viewBox="0 0 400 300" fill="none">
            <rect width="400" height="300" fill="#312e81" />
            <circle cx="160" cy="130" r="50" stroke="#818cf8" strokeWidth="4" />
            <line x1="195" y1="165" x2="280" y2="250" stroke="#c7d2fe" strokeWidth="8" strokeLinecap="round" />
            <circle cx="160" cy="130" r="25" stroke="#a5b4fc" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        );
      case 'opportunities':
        return (
          <svg className="absolute inset-0 w-full h-full opacity-35 object-cover" viewBox="0 0 400 300" fill="none">
            <rect width="400" height="300" fill="#78350f" />
            <polygon points="200,60 225,125 295,130 240,175 258,245 200,205 142,245 160,175 105,130 175,125" fill="#f59e0b" opacity="0.5" />
            <circle cx="200" cy="150" r="70" stroke="#fbbf24" strokeWidth="2" strokeDasharray="8 8" />
          </svg>
        );
      case 'society':
        return (
          <svg className="absolute inset-0 w-full h-full opacity-35 object-cover" viewBox="0 0 400 300" fill="none">
            <rect width="400" height="300" fill="#4c1d95" />
            <circle cx="130" cy="130" r="30" fill="#a78bfa" opacity="0.6" />
            <circle cx="270" cy="130" r="30" fill="#a78bfa" opacity="0.6" />
            <circle cx="200" cy="170" r="36" fill="#c4b5fd" opacity="0.8" />
            <path d="M130 130 L200 170 L270 130" stroke="#e9d5ff" strokeWidth="3" />
          </svg>
        );
      case 'health':
        return (
          <svg className="absolute inset-0 w-full h-full opacity-35 object-cover" viewBox="0 0 400 300" fill="none">
            <rect width="400" height="300" fill="#881337" />
            <path d="M200 240 C200 240 100 170 100 110 C100 70 140 50 175 75 L200 100 L225 75 C260 50 300 70 300 110 C300 170 200 240 200 240 Z" fill="#fb7185" opacity="0.5" />
            <path d="M60 160 H140 L160 110 L190 200 L220 130 L240 160 H340" stroke="#fecdd3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'personal-development':
        return (
          <svg className="absolute inset-0 w-full h-full opacity-35 object-cover" viewBox="0 0 400 300" fill="none">
            <rect width="400" height="300" fill="#0c4a6e" />
            <polygon points="200,40 320,240 80,240" stroke="#38bdf8" strokeWidth="3" fill="#0284c7" opacity="0.4" />
            <circle cx="200" cy="150" r="28" fill="#bae6fd" opacity="0.8" />
            <line x1="200" y1="40" x2="200" y2="240" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="categories"
      className="mt-20 py-20 sm:py-28 bg-slate-50 text-slate-900 border-t border-slate-200"
      aria-label="Explore by category"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600">
              Knowledge Domains
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
              Explore by category
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Browse curated collections across core disciplines, research fields and global opportunities.
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-sm font-medium text-slate-500">
            <span>8 Primary Categories</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>290+ Verified Resources</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory?.(cat)}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6 bg-slate-950 cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`Category: ${cat.name}. ${cat.description}`}
            >
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                {renderCategoryGraphic(cat.id)}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />

              <div className="relative z-10 flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors">
                  {renderCategoryIcon(cat.icon)}
                </div>
                <span className="text-xs font-mono font-medium text-slate-300">
                  {cat.itemCount} items
                </span>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {cat.name}
                  </h3>
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/80 group-hover:bg-blue-500 group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400">
                  {cat.featuredTopics.slice(0, 2).map((topic, i) => (
                    <React.Fragment key={topic}>
                      {i > 0 && <span aria-hidden="true">·</span>}
                      <span>{topic}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

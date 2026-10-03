"use client";

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  GraduationCap,
  FolderGit2,
  Boxes,
  Sparkles,
  Flag,
  ArrowRight,
} from 'lucide-react';
import { FeatureCardItem } from '../src/types';

interface FeatureGridProps {
  features: FeatureCardItem[];
  onSelectFeature?: (feature: FeatureCardItem) => void;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  onSelectFeature,
}) => {
  const getIcon = (iconName: FeatureCardItem['iconName']) => {
    const props = { className: 'w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors' };
    switch (iconName) {
      case 'Compass':
        return <Compass {...props} />;
      case 'GraduationCap':
        return <GraduationCap {...props} />;
      case 'FolderGit2':
        return <FolderGit2 {...props} />;
      case 'Boxes':
        return <Boxes {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Flag':
        return <Flag {...props} />;
      default:
        return <Compass {...props} />;
    }
  };

  return (
    <section
      id="features"
      className="relative z-20 -mt-10 sm:-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-label="FEBROS16 Core Modules"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {features.map((feature, idx) => (
          <Link
            key={feature.id}
            href={feature.route}
            className="group relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 hover:border-blue-500/60 rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            aria-label={`${feature.title}: ${feature.description}`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-800/40 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-900/40 transition-all">
                  {getIcon(feature.iconName)}
                </div>
                <span className="text-xs font-mono font-medium text-slate-400">
                  {`0${idx + 1}`}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                {feature.title}
              </h2>

              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                {feature.actionText}
              </span>
              <div className="w-8 h-8 rounded-lg bg-slate-800/80 group-hover:bg-blue-600 flex items-center justify-center text-slate-300 group-hover:text-white transition-all transform group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;

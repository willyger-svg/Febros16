"use client";

import React from 'react';
import Link from 'next/link';
import { Flag, ArrowRight, ShieldCheck } from 'lucide-react';

interface PlatformEcosystemSectionProps {
  onOpenCampaign?: (campaignId: string) => void;
}

export const PlatformEcosystemSection: React.FC<PlatformEcosystemSectionProps> = ({
  onOpenCampaign,
}) => {
  const campaigns = [
    {
      id: 'oo24',
      badge: 'Flagship Initiative',
      title: 'Project OO24: Cognitive Sovereignty',
      desc: 'A global campaign promoting deliberate information consumption, critical evaluation of machine-synthesized text, and intellectual independence.',
      stats: '14 Countries · 3,400+ Researchers Participating',
      route: '/campaigns#oo24',
    },
    {
      id: 'digital-wellness',
      badge: 'Public Welfare',
      title: 'Digital Wellness & Deep Work Standard',
      desc: 'Tools and institutional frameworks designed to protect cognitive bandwidth, reduce continuous partial attention, and support sustained scholarship.',
      stats: 'Open Research Toolkit Available',
      route: '/campaigns#digital-wellness',
    },
    {
      id: 'open-curricula',
      badge: 'Education Access',
      title: 'Global Open Knowledge Commons',
      desc: 'Standardized open access to graduate-level course notes, datasets, and laboratory methodology templates for underfunded institutions.',
      stats: '250+ Datasets Hosted',
      route: '/campaigns#open-commons',
    },
  ];

  return (
    <section
      id="ecosystem"
      className="py-20 sm:py-28 bg-slate-950 text-white border-t border-slate-800"
      aria-label="FEBROS16 Initiatives & Campaigns"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-400 uppercase tracking-wider">
              <Flag className="w-4 h-4" />
              <span>Public Initiatives & Impact</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Campaigns for open & enduring knowledge
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
              Febros16 hosts focused initiatives that address information integrity, cognitive autonomy, and educational accessibility worldwide.
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-sm font-medium text-slate-400">
            <span>Initiative Series 2026–2028</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.map((camp) => (
            <Link
              key={camp.id}
              href={camp.route}
              className="group p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <span className="text-xs font-semibold text-blue-400">
                  {camp.badge}
                </span>

                <h3 className="mt-3 text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {camp.title}
                </h3>

                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {camp.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {camp.stats}
                </span>
                <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-blue-600 flex items-center justify-center text-slate-300 group-hover:text-white transition-all transform group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-slate-950 border border-blue-900/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-900/50 border border-blue-700/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Traceable Source Attribution Standard
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                All data, publications, and findings on Febros16 are auditable and linked to permanent primary sources.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span>Domain: febros16.com</span>
            <span aria-hidden="true">·</span>
            <span>REST API Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformEcosystemSection;

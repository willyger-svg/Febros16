"use client";

import React, { useState } from 'react';
import { Flag, ArrowRight, ShieldCheck, CheckCircle2, X } from 'lucide-react';

interface PlatformEcosystemSectionProps {
  onOpenCampaign?: (campaignId: string) => void;
}

export const PlatformEcosystemSection: React.FC<PlatformEcosystemSectionProps> = ({
  onOpenCampaign,
}) => {
  const [selectedCampaign, setSelectedCampaign] = useState<{
    id: string;
    badge: string;
    title: string;
    desc: string;
    stats: string;
    details: string;
  } | null>(null);

  const campaigns = [
    {
      id: 'oo24',
      badge: 'Flagship Initiative',
      title: 'Project OO24: Cognitive Sovereignty',
      desc: 'A global campaign promoting deliberate information consumption, critical evaluation of machine-synthesized text, and intellectual independence.',
      stats: '14 Countries · 3,400+ Researchers Participating',
      details: 'Project OO24 protects human cognitive focus against algorithmic dilution. We establish research standards, verifiable citations, and attention architecture for researchers.',
    },
    {
      id: 'digital-wellness',
      badge: 'Public Welfare',
      title: 'Digital Wellness & Deep Work Standard',
      desc: 'Tools and institutional frameworks designed to protect cognitive bandwidth, reduce continuous partial attention, and support sustained scholarship.',
      stats: 'Open Research Toolkit Available',
      details: 'University-grade protocols for establishing uninterrupted contemplation blocks, asynchronous collaboration, and mental clarity.',
    },
    {
      id: 'open-curricula',
      badge: 'Education Access',
      title: 'Global Open Knowledge Commons',
      desc: 'Standardized open access to graduate-level course notes, datasets, and laboratory methodology templates for underfunded institutions.',
      stats: '250+ Datasets Hosted',
      details: 'Democratizing peer review, open datasets, and open educational resources without commercial subscription barriers.',
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
            <div
              key={camp.id}
              onClick={() => setSelectedCampaign(camp)}
              className="group p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              role="button"
              tabIndex={0}
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
            </div>
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
            <span>Independent & Open</span>
          </div>
        </div>
      </div>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
            <button
              onClick={() => setSelectedCampaign(null)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white bg-slate-800 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              {selectedCampaign.badge}
            </span>
            <h3 className="mt-2 text-2xl font-bold">{selectedCampaign.title}</h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">{selectedCampaign.details}</p>
            <div className="mt-4 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400">
              <strong>Impact:</strong> {selectedCampaign.stats}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedCampaign(null)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PlatformEcosystemSection;

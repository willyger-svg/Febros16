"use client";

import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, ExternalLink, Bookmark, CheckCircle2 } from 'lucide-react';

interface OpportunityItem {
  id: string;
  title: string;
  type: 'Fellowship' | 'Grant' | 'Scholarship' | 'Competition';
  host: string;
  fundingValue: string;
  location: string;
  deadline: string;
  description: string;
  eligibility: string;
  link: string;
}

export default function OpportunitiesPage() {
  const [activeType, setActiveType] = useState('All');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const opportunities: OpportunityItem[] = [
    {
      id: 'opp-1',
      title: 'Global Postdoctoral Fellowship in Ecological Climate Modeling',
      type: 'Fellowship',
      host: 'Horizon Earth Institute & European Science Foundation',
      fundingValue: '€72,000 / Year + Research Travel Stipend',
      location: 'Geneva, Switzerland & Field Stations',
      deadline: 'December 15, 2026',
      description: 'A 2-year fully funded appointment investigating localized hydrological tipping points, microclimate buffering, and municipal adaptation.',
      eligibility: 'PhD in Environmental Science, Physics, Computational Ecology or related disciplines completed within the last 4 years.',
      link: '#',
    },
    {
      id: 'opp-2',
      title: 'Open Source Decentralized Science (DeSci) Seed Grants',
      type: 'Grant',
      host: 'Febros16 Foundation & Open Science Commons',
      fundingValue: '$30,000 – $75,000 Direct Award',
      location: 'Global (Remote / Distributed)',
      deadline: 'Rolling Submissions (Quarterly Review)',
      description: 'Targeted funding for research teams building cryptographic citation registries, verifiable data pipelines, and open-source laboratory instruments.',
      eligibility: 'Independent research collectives, academic labs, and software engineering contributors.',
      link: '#',
    },
    {
      id: 'opp-3',
      title: 'Dr. Jane Goodall Biodiversity Doctoral Scholarship 2027',
      type: 'Scholarship',
      host: 'Pan-African Conservation Consortium',
      fundingValue: 'Full Tuition + $28,000 Annual Living Stipend',
      location: 'Nairobi, Kenya & Partner Universities',
      deadline: 'January 30, 2027',
      description: 'Four-year doctoral fellowship funding empirical research into indigenous forestry management and wildlife migration corridors.',
      eligibility: 'Admitted doctoral candidates of East, West, or Southern African nationality.',
      link: '#',
    },
    {
      id: 'opp-4',
      title: 'International Clean Grid Algorithmic Optimization Challenge',
      type: 'Competition',
      host: 'Global Energy Transition Alliance',
      fundingValue: '$100,000 Prize Pool ($50k First Prize)',
      location: 'Virtual / Online Submission',
      deadline: 'November 20, 2026',
      description: 'Engineering competition to design the most computationally efficient decentralized load balancing algorithm under simulated intermittency.',
      eligibility: 'Open to teams of up to 4 individuals (students, faculty, or industry researchers).',
      link: '#',
    },
    {
      id: 'opp-5',
      title: 'Systems Epistemology Junior Visiting Fellowship',
      type: 'Fellowship',
      host: 'Cambridge Institute for Advanced Study',
      fundingValue: '£48,000 + College Residence Allowance',
      location: 'Cambridge, United Kingdom',
      deadline: 'February 15, 2027',
      description: 'Ten-month visiting scholar position exploring philosophical and formal verification challenges in generative machine knowledge.',
      eligibility: 'Early-career researchers with demonstrable peer-reviewed publications.',
      link: '#',
    },
  ];

  const types = ['All', 'Fellowship', 'Grant', 'Scholarship', 'Competition'];

  const filtered = activeType === 'All'
    ? opportunities
    : opportunities.filter((o) => o.type === activeType);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="pt-28 pb-24 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Academic & Research Opportunities</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Opportunities
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Discover verified scholarships, doctoral fellowships, research grants, international competitions, and academic programs across global institutions.
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-6 mb-8 border-b border-slate-800">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                activeType === t
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filtered.map((opp) => (
            <div
              key={opp.id}
              className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/90 transition-all flex flex-col justify-between gap-6"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-blue-400 uppercase tracking-wider">{opp.type}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-emerald-400 font-bold">{opp.fundingValue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 font-mono text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{opp.deadline}</span>
                    </span>
                    <button
                      onClick={() => toggleSave(opp.id)}
                      className="p-1 text-slate-400 hover:text-blue-400 cursor-pointer"
                      aria-label="Save opportunity"
                    >
                      <Bookmark className={`w-4 h-4 ${savedIds.includes(opp.id) ? 'fill-blue-400 text-blue-400' : ''}`} />
                    </button>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white leading-snug">
                  {opp.title}
                </h2>

                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span>Host: <strong className="text-slate-300">{opp.host}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{opp.location}</span>
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {opp.description}
                </p>

                <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400">
                  <strong className="text-slate-200">Eligibility:</strong> {opp.eligibility}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Verified by Febros16 Academic Relations</span>
                </span>
                <button
                  onClick={() => alert(`Opening application portal for: ${opp.title}`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

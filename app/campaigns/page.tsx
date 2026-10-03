"use client";

import React, { useState } from 'react';
import { Flag, CheckCircle2 } from 'lucide-react';

export default function CampaignsPage() {
  const [pledged, setPledged] = useState<Record<string, boolean>>({});

  const handlePledge = (campaignId: string) => {
    setPledged((prev) => ({ ...prev, [campaignId]: true }));
  };

  const campaigns = [
    {
      id: 'oo24',
      badge: 'Flagship Initiative',
      title: 'Project OO24: Cognitive Sovereignty',
      lead: 'Defending critical inquiry and mental independence in an age of automated cognitive offloading.',
      description: 'Project OO24 brings together educators, neuroscientists, and policy analysts to establish curricula and digital habits that protect deep thought, verify factual evidence, and counter passive algorithmic consumption.',
      stats: [
        { label: 'Participating Scholars', value: '3,400+' },
        { label: 'Active Countries', value: '14' },
        { label: 'Published Guidelines', value: '12 Papers' },
      ],
      principles: [
        'Always verify conclusions against original empirical datasets',
        'Reject unverified algorithmic summaries in critical decision making',
        'Protect at least 4 hours of uninterrupted daily deep cognitive work',
      ],
    },
    {
      id: 'digital-wellness',
      badge: 'Public Wellness Standard',
      title: 'Digital Wellness & Attention Integrity',
      lead: 'Institutional standards designed to combat continuous partial attention and academic burnout.',
      description: 'We partner with universities and research organizations to design notification-free working environments, asynchronous communication policies, and cognitive health support systems.',
      stats: [
        { label: 'Partner Institutions', value: '28' },
        { label: 'Toolkits Distributed', value: '15,000+' },
        { label: 'Satisfaction Rate', value: '98%' },
      ],
      principles: [
        'Default asynchronous communication for academic research teams',
        'Elimination of real-time presence surveillance in scholarship',
        'Preservation of dedicated contemplation periods without screen intrusion',
      ],
    },
    {
      id: 'open-commons',
      badge: 'Global Educational Access',
      title: 'Open Science & Peer Attribution Commons',
      lead: 'Democratizing peer review and eliminating predatory commercial journal paywalls.',
      description: 'Advocating for cryptographic preprints, direct community peer scrutiny, and open institutional citation registries that remain public goods forever.',
      stats: [
        { label: 'Open Access Papers', value: '100,000+' },
        { label: 'Participating Repositories', value: '45' },
        { label: 'Saved Library Budgets', value: '$4.2M' },
      ],
      principles: [
        'Publicly funded research must remain freely accessible to all humanity',
        'Reviewer contributions must be transparently acknowledged and credited',
        'Metadata and citation networks must never be owned by closed corporations',
      ],
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-400 mb-2">
            <Flag className="w-4 h-4" />
            <span>Public Knowledge Movements</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Campaigns
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Explore collective initiatives focused on information integrity, cognitive autonomy, open science, and educational equity worldwide.
          </p>
        </div>

        <div className="space-y-10">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              id={camp.id}
              className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                <div className="max-w-2xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    {camp.badge}
                  </span>

                  <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                    {camp.title}
                  </h2>

                  <p className="mt-2 text-base font-medium text-slate-200">
                    {camp.lead}
                  </p>

                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    {camp.description}
                  </p>

                  <div className="mt-6 space-y-2">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                      Core Campaign Commitments:
                    </h3>
                    {camp.principles.map((pr, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                        <span>{pr}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:w-80 shrink-0 p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-4">
                      Campaign Impact
                    </h4>
                    <div className="space-y-4">
                      {camp.stats.map((st, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">{st.label}</span>
                          <span className="font-mono font-bold text-sm text-white">{st.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-800">
                    {pledged[camp.id] ? (
                      <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-center text-xs text-emerald-300 font-semibold flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>You pledged support!</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handlePledge(camp.id)}
                        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-900/30 transition-colors cursor-pointer"
                      >
                        Pledge Support to Campaign
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

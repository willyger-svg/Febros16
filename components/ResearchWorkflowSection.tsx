"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FolderGit2,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { SAMPLE_RESEARCH_PROJECTS } from '../src/data/mockData';

export const ResearchWorkflowSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sources' | 'notes' | 'findings'>('overview');
  const project = SAMPLE_RESEARCH_PROJECTS[0];

  const workflowSteps = [
    { step: '01', title: 'Discover', desc: 'Identify research gaps and frame a testable question' },
    { step: '02', title: 'Collect', desc: 'Aggregate peer-reviewed papers, datasets and primary sources' },
    { step: '03', title: 'Organize', desc: 'Structure notes, tag concepts, and verify citations' },
    { step: '04', title: 'Analyze', desc: 'Compare contradictory findings and synthesize insights' },
    { step: '05', title: 'Report', desc: 'Generate publishable whitepapers and traceable reports' },
  ];

  return (
    <section
      id="research-workflow"
      className="py-20 sm:py-28 bg-slate-900/60 border-t border-slate-800 text-white relative overflow-hidden"
      aria-label="Research Workspace & Methodology"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-400 uppercase tracking-wider">
            <FolderGit2 className="w-4 h-4" />
            <span>Core Research Engine</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Built for serious inquiry & verifiable knowledge
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Febros16 replaces fragmented bookmarking and unverified summaries with a unified research workspace where every conclusion is traceable to primary sources.
          </p>
        </div>

        {/* 5-Step Process Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-14">
          {workflowSteps.map((item, idx) => (
            <div
              key={item.step}
              className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono font-bold text-blue-400">
                  {item.step}
                </div>
                <h3 className="mt-2 text-base font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>Phase {idx + 1}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Workspace Preview */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
          <div className="p-5 sm:p-6 border-b border-slate-800/80 bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-blue-400 font-semibold">Active Research Project</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-300">ID: FEB-2026-088</span>
                <span aria-hidden="true">·</span>
                <span>Updated {project.updatedAt}</span>
              </div>
              <h3 className="mt-1 text-lg sm:text-xl font-bold text-white">
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {project.status}
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-semibold cursor-default"
              >
                <span>Verified Protocol</span>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>
          </div>

          <div className="flex border-b border-slate-800 px-4 sm:px-6 bg-slate-900/20 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Project Overview
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'sources'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <span>Verified Sources</span>
              <span className="text-[11px] font-mono text-slate-300 bg-slate-800 px-1.5 py-0.2 rounded">18</span>
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'notes'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <span>Structured Notes</span>
              <span className="text-[11px] font-mono text-slate-300 bg-slate-800 px-1.5 py-0.2 rounded">42</span>
            </button>
            <button
              onClick={() => setActiveTab('findings')}
              className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'findings'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <span>Synthesis & Findings</span>
              <span className="text-[11px] font-mono text-slate-300 bg-slate-800 px-1.5 py-0.2 rounded">7</span>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                    Primary Research Question
                  </h4>
                  <p className="mt-2 text-base sm:text-lg font-medium text-slate-100 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    "{project.researchQuestion}"
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Project Objectives
                  </h4>
                  <ul className="space-y-2.5">
                    {project.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Source verification standard: ISO/IEC 27037 & OpenCitation Protocol</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs text-slate-400 font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sources' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span>Source Title & Reference</span>
                  <span className="hidden sm:inline">Verification Status</span>
                </div>
                {[
                  {
                    title: 'W3C Decentralized Identifiers (DIDs) v1.0 Core Architecture',
                    doi: 'doi:10.1145/w3c.did.2025',
                    type: 'Official Technical Standard',
                  },
                  {
                    title: 'Cryptographic Ledger Verification for Open Access Publishing Registries',
                    doi: 'IEEE Trans. Inf. Forensics 2026',
                    type: 'Peer-Reviewed Journal',
                  },
                  {
                    title: 'Decentralized Research Ecosystem Benchmark Report 2026',
                    doi: 'Open Science Foundation WP-44',
                    type: 'Institutional Whitepaper',
                  },
                ].map((src, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-semibold text-sm text-white">{src.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                        <span className="font-mono">{src.doi}</span>
                        <span aria-hidden="true">·</span>
                        <span>{src.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verified Citation</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-blue-400">Researcher Field Note #14</span>
                    <span>Added yesterday by Scholar Team</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Benchmarking results show sub-200ms latency for verifying public key signatures against academic identity registries. Zero commercial journal intervention required to authenticate preprint originality.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'findings' && (
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-blue-950/30 border border-blue-900/40">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Primary Finding #01 · High Confidence</span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Decentralized Identity reduces academic preprint publication overhead by 82%
                  </h4>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    By removing proprietary submission portal bottlenecks and replacing them with cryptographically signed verifiable credentials, peer verification time dropped from an average of 4.2 months to 11 days without compromising peer scrutiny rigor.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchWorkflowSection;

"use client";

import React, { useState } from 'react';
import {
  FolderGit2,
  Plus,
  CheckCircle2,
  ShieldCheck,
  Download,
  X,
} from 'lucide-react';
import { ResearchProject } from '../../src/types';
import { SAMPLE_RESEARCH_PROJECTS } from '../../src/data/mockData';

export default function ResearchPage() {
  const [projects, setProjects] = useState<ResearchProject[]>(SAMPLE_RESEARCH_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<ResearchProject>(SAMPLE_RESEARCH_PROJECTS[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'sources' | 'notes' | 'findings'>('overview');
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newQuestion.trim()) return;

    const newProj: ResearchProject = {
      id: `proj-${Date.now()}`,
      title: newTitle.trim(),
      researchQuestion: newQuestion.trim(),
      objectives: [
        'Collect initial peer-reviewed baseline literature',
        'Analyze domain datasets and formulate empirical test parameters',
        'Synthesize findings with verifiable primary citations',
      ],
      status: 'In Progress',
      sourcesCount: 0,
      notesCount: 0,
      findingsCount: 0,
      updatedAt: 'Just now',
      tags: newTag ? newTag.split(',').map((t) => t.trim()) : ['Research', 'Exploration'],
    };

    setProjects([newProj, ...projects]);
    setSelectedProject(newProj);
    setIsCreatingProject(false);
    setNewTitle('');
    setNewQuestion('');
    setNewTag('');
  };

  return (
    <div className="pt-28 pb-24 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-400 mb-2">
              <FolderGit2 className="w-4 h-4" />
              <span>FEBROS16 Research Workspace</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Research
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
              Manage research projects, collect verified primary sources, structure critical annotations, and generate traceable research briefs.
            </p>
          </div>

          <button
            onClick={() => setIsCreatingProject(true)}
            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-900/30 transition-colors cursor-pointer self-start md:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>New Research Project</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Projects Selector Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
              Projects Directory ({projects.length})
            </div>

            {projects.map((proj) => {
              const isSelected = selectedProject.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-blue-500 shadow-md shadow-blue-950/50'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                  role="button"
                  tabIndex={0}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                      <span className="text-blue-400 font-semibold">{proj.status}</span>
                      <span className="font-mono text-slate-400">{proj.updatedAt}</span>
                    </div>

                    <h3 className="font-bold text-sm text-white line-clamp-2">
                      {proj.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{proj.sourcesCount} Sources</span>
                    <span aria-hidden="true">·</span>
                    <span>{proj.notesCount} Notes</span>
                    <span aria-hidden="true">·</span>
                    <span>{proj.findingsCount} Findings</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Project Workspace Details */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-slate-800/80 bg-slate-900/40">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-blue-400 font-bold">{selectedProject.id}</span>
                    <span aria-hidden="true">·</span>
                    <span>Updated {selectedProject.updatedAt}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{selectedProject.status}</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {selectedProject.title}
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="text-xs text-slate-400 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 text-xs sm:text-sm overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-3.5 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Project Overview
                </button>
                <button
                  onClick={() => setActiveTab('sources')}
                  className={`py-3.5 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'sources'
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Verified Sources ({selectedProject.sourcesCount})
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`py-3.5 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'notes'
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Notes & Annotations ({selectedProject.notesCount})
                </button>
                <button
                  onClick={() => setActiveTab('findings')}
                  className={`py-3.5 px-4 font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'findings'
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Findings & Synthesis ({selectedProject.findingsCount})
                </button>
              </div>

              <div className="p-6 sm:p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                        Primary Research Question
                      </h4>
                      <div className="mt-2 p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-base leading-relaxed">
                        "{selectedProject.researchQuestion}"
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                        Formal Objectives
                      </h4>
                      <div className="space-y-2.5">
                        {selectedProject.objectives.map((obj, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                            <span>{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Connected to Go Backend Database: PostgreSQL</span>
                      </div>
                      <button
                        onClick={() => alert('Research brief exported as PDF/Markdown package.')}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export Brief</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'sources' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400">
                      <span>Source Title</span>
                      <span>DOI / Registry</span>
                    </div>
                    {[
                      { title: 'W3C Decentralized Identifiers (DIDs) Core Architecture 1.0', ref: 'w3c.org/tr/did-core' },
                      { title: 'Cryptographic Ledger Verification for Open Access Registries', ref: 'doi:10.1109/TIFS.2026' },
                      { title: 'Peer Review Integrity under Distributed Consensus Models', ref: 'Open Science Review 2026' },
                    ].map((s, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 text-xs">
                        <span className="font-semibold text-white">{s.title}</span>
                        <span className="font-mono text-blue-400 shrink-0">{s.ref}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200">
                      <div className="flex items-center justify-between text-slate-400 mb-1 font-mono">
                        <span>#01 · Methodology Annotation</span>
                        <span>Yesterday</span>
                      </div>
                      <p className="leading-relaxed">
                        Evaluated credential issuance response curves. Gas costs are amortized via batch zero-knowledge proofs, yielding sub-10 millisecond verification latencies across public library mirror nodes.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'findings' && (
                  <div className="space-y-3">
                    <div className="p-5 rounded-xl bg-blue-950/30 border border-blue-900/40 text-xs">
                      <div className="font-bold text-blue-400 text-sm mb-1">
                        Finding #1: Elimination of Commercial Submission Gateways
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        Peer verification time was reduced from 4.2 months to 11 days by using cryptographic signatures, while citation auditability improved by 94% across all tested academic disciplines.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Creating New Project */}
        {isCreatingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <button
                onClick={() => setIsCreatingProject(false)}
                className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold text-white mb-2">Create Research Project</h2>
              <p className="text-xs text-slate-400 mb-6">
                Define your research inquiry and establish objectives. This project will be saved to your Febros16 account.
              </p>

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Next-Generation Carbon Capture Catalysts"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Primary Research Question
                  </label>
                  <textarea
                    rows={3}
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="What specific question or hypothesis are you testing?"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Chemistry, Ecology, Materials"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingProject(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

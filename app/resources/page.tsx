"use client";

import React, { useState } from 'react';
import { Boxes, Download, Search } from 'lucide-react';

interface ResourceItem {
  id: string;
  title: string;
  type: 'Dataset' | 'Software' | 'Template' | 'Guide';
  description: string;
  version: string;
  license: string;
  sizeOrFormat: string;
  downloadsCount: number;
}

export default function ResourcesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const resources: ResourceItem[] = [
    {
      id: 'res-1',
      title: 'BiblioTrace: Open Source Citation & Source Verification Toolkit',
      type: 'Software',
      description: 'CLI and API library written in Go for parsing DOI metadata, validating preprint signatures, and verifying citation integrity against CrossRef and OpenAlex.',
      version: 'v1.4.2',
      license: 'MIT License',
      sizeOrFormat: 'Go Package / Binary',
      downloadsCount: 1420,
    },
    {
      id: 'res-2',
      title: 'Global High-Resolution Coastal Microclimate Dataset 2018–2026',
      type: 'Dataset',
      description: 'Ten-minute interval telemetry containing surface water temperatures, atmospheric humidity, and salinity across 140 maritime sensor nodes.',
      version: 'Release 2026.3',
      license: 'CC-BY 4.0',
      sizeOrFormat: '1.8 GB (Parquet & NetCDF)',
      downloadsCount: 3840,
    },
    {
      id: 'res-3',
      title: 'Febros16 Standard LaTeX Academic Thesis & Monograph Suite',
      type: 'Template',
      description: 'Institutional grade LaTeX template featuring automated bibliography formatting, accessible SVG figure embeddings, and reproducible code blocks.',
      version: 'v3.1.0',
      license: 'CC0 Public Domain',
      sizeOrFormat: 'ZIP (TeX Source)',
      downloadsCount: 8900,
    },
    {
      id: 'res-4',
      title: 'Microgrid Economic Dispatch & Storage Cycling Simulator',
      type: 'Software',
      description: 'Python and WebAssembly computational model calculating levelized cost of storage (LCOS) across hybrid chemical battery configurations.',
      version: 'v2.0-beta',
      license: 'Apache 2.0',
      sizeOrFormat: 'Wasm / Python Core',
      downloadsCount: 920,
    },
    {
      id: 'res-5',
      title: 'Institutional Research Ethics & Source Attribution Matrix',
      type: 'Guide',
      description: 'A comprehensive 40-point rubric for research institutions evaluating source integrity, AI-generated co-authorship disclosure, and data privacy.',
      version: 'Edition 2026',
      license: 'Open Access',
      sizeOrFormat: 'PDF & Markdown',
      downloadsCount: 4210,
    },
    {
      id: 'res-6',
      title: 'Decentralized Research Identity Specification (DID-Academic)',
      type: 'Guide',
      description: 'Open technical specification for cryptographically signing peer reviews, preprint revisions, and laboratory raw observations without central monopolies.',
      version: 'v1.1 Draft',
      license: 'Open Standard',
      sizeOrFormat: 'W3C Compatible Spec',
      downloadsCount: 1650,
    },
  ];

  const types = ['All', 'Dataset', 'Software', 'Template', 'Guide'];

  const filtered = resources.filter((res) => {
    const matchesFilter = activeFilter === 'All' || res.type === activeFilter;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-28 pb-24 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-400 mb-2">
            <Boxes className="w-4 h-4" />
            <span>Open Tools & Instruments</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Resources
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Explore open datasets, scientific software packages, documentation standards, and verified toolkits built to support academic and technical inquiry.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setActiveFilter(t)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === t
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources & toolkits..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/90 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-blue-400">{item.type}</span>
                  <span className="font-mono text-slate-400">{item.version}</span>
                </div>

                <h2 className="text-lg font-bold text-white leading-snug">
                  {item.title}
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                  <span>{item.sizeOrFormat}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.license}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  {item.downloadsCount.toLocaleString()} downloads
                </span>
                <button
                  onClick={() => alert(`Starting download for ${item.title}`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

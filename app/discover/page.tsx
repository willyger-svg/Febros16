"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Search, Bookmark, ArrowRight } from 'lucide-react';
import { SearchResult } from '../../src/types';
import SearchModal from '../../components/SearchModal';
import DetailModal from '../../components/DetailModal';

export default function DiscoverPage() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);

  const discoveries: SearchResult[] = [
    {
      id: 'disc-1',
      title: 'The Architecture of Autonomous Knowledge Synthesis Systems',
      description: 'How verifiable metadata and distributed graph databases ensure that synthetic research assistants remain grounded in primary citations.',
      category: 'Technology',
      type: 'article',
      date: 'Oct 2, 2026',
      authorOrSource: 'Febros16 Editorial Board',
      badge: 'Featured Insight',
    },
    {
      id: 'disc-2',
      title: 'Cross-Scale Energy Storage: From Micro-Capacitors to Grid Buffers',
      description: 'Comprehensive comparative analysis of iron-air, sodium-ion, and flow batteries for decentralized municipal grids.',
      category: 'Environment',
      type: 'research',
      date: 'Sep 28, 2026',
      authorOrSource: 'Energy Systems Working Group',
      badge: 'Research Paper',
    },
    {
      id: 'disc-3',
      title: 'Cognitive Sovereignty: Attention Protection in the Age of Synthetic Feeds',
      description: 'Empirical protocols for protecting researcher deep-focus time and critical inquiry against automated algorithmic bias.',
      category: 'Society',
      type: 'campaign',
      date: 'Sep 24, 2026',
      authorOrSource: 'Project OO24 Initiative',
      badge: 'Public Inquiry',
    },
    {
      id: 'disc-4',
      title: 'Decentralized Identifiers for University Libraries and Archives',
      description: 'Replacing proprietary paywalled submission gateways with open cryptographic credential verification for scholars.',
      category: 'Education',
      type: 'resource',
      date: 'Sep 19, 2026',
      authorOrSource: 'Open Science Federation',
      badge: 'Open Standard',
    },
    {
      id: 'disc-5',
      title: 'Global Postdoctoral Fellowship in Ecological Climate Modeling 2027',
      description: 'Fully funded 3-year international appointment spanning European and East African marine research stations.',
      category: 'Opportunities',
      type: 'opportunity',
      date: 'Deadline: Dec 15, 2026',
      authorOrSource: 'Horizon Earth Institute',
      badge: 'Grant & Fellowship',
    },
    {
      id: 'disc-6',
      title: 'First-Principles Epistemology for Engineering Complex Biological Models',
      description: 'Deconstructing synthetic biology paradigms using foundational physical thermodynamics and information theory.',
      category: 'Health',
      type: 'article',
      date: 'Sep 12, 2026',
      authorOrSource: 'BioSystems Laboratory',
      badge: 'Theory Paper',
    },
  ];

  const tags = ['All', 'Technology', 'Environment', 'Society', 'Education', 'Opportunities', 'Health'];

  const filtered = selectedTag === 'All'
    ? discoveries
    : discoveries.filter((d) => d.category === selectedTag);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="pt-28 pb-24 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-400 mb-2">
            <Compass className="w-4 h-4" />
            <span>FEBROS16 Discovery Stream</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Discover
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Find useful content across multidisciplinary fields, emerging scientific models, verified sources, and intellectual explorations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Search className="w-3.5 h-3.5 text-blue-400" />
            <span>Search Discoveries</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/60 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-semibold text-blue-400">{item.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-400">{item.date}</span>
                    <button
                      onClick={(e) => toggleSave(item.id, e)}
                      className="p-1 text-slate-400 hover:text-blue-400 cursor-pointer"
                      aria-label="Save discovery"
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          savedIds.includes(item.id) ? 'fill-blue-400 text-blue-400' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                  {item.title}
                </h2>

                <p className="mt-2.5 text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  By <strong className="text-slate-300">{item.authorOrSource}</strong>
                </span>
                <span className="text-blue-400 group-hover:text-blue-300 flex items-center gap-1 font-semibold">
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectResult={(res) => setSelectedItem(res)}
      />

      <DetailModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        searchResult={selectedItem}
      />
    </div>
  );
}

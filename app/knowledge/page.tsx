"use client";

import React, { useState } from 'react';
import { BookOpen, Search, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { SearchResult } from '../../src/types';
import DetailModal from '../../components/DetailModal';

export default function KnowledgePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<SearchResult | null>(null);

  const articles: (SearchResult & { readTime: string; citationCount: number })[] = [
    {
      id: 'k-1',
      title: 'Epistemic Trust in Automated Scientific Synthesis',
      description: 'An evaluation of why secondary AI summarization frequently loses foundational nuances in empirical papers, and methods to enforce source verification.',
      category: 'Research',
      type: 'article',
      date: 'Oct 2026',
      authorOrSource: 'Dr. Marcus Holloway & Febros16 Working Group',
      badge: 'Peer-Reviewed Paper',
      readTime: '12 min read',
      citationCount: 38,
    },
    {
      id: 'k-2',
      title: 'Decentralized Microgrid Governance and Storage Economics',
      description: 'Mathematical modeling of community battery ownership, dynamic pricing thresholds, and municipal resilience metrics under extreme weather.',
      category: 'Environment',
      type: 'article',
      date: 'Sep 2026',
      authorOrSource: 'Prof. Ananya Sen, Clean Grid Laboratory',
      badge: 'Empirical Study',
      readTime: '16 min read',
      citationCount: 45,
    },
    {
      id: 'k-3',
      title: 'Foundations of Systems Programming in Modern Cryptography',
      description: 'Memory safety guarantees, constant-time arithmetic primitives, and zero-knowledge proof verification pipeline architectures.',
      category: 'Technology',
      type: 'article',
      date: 'Sep 2026',
      authorOrSource: 'Systems Research Collective',
      badge: 'Technical Reference',
      readTime: '20 min read',
      citationCount: 62,
    },
    {
      id: 'k-4',
      title: 'Public Knowledge Infrastructure in Developing Economies',
      description: 'Comparative case studies on bandwidth-efficient digital academic libraries and offline mesh networks across East Africa.',
      category: 'Education',
      type: 'article',
      date: 'Aug 2026',
      authorOrSource: 'Dr. Joseph Ndung\'u, Institute for Open Knowledge',
      badge: 'Field Research',
      readTime: '14 min read',
      citationCount: 29,
    },
    {
      id: 'k-5',
      title: 'Cognitive Science of Deliberate Deep Work vs Fragmentation',
      description: 'Neurological data on context switching costs in scholars and structured protocols for prolonged single-task intellectual focus.',
      category: 'Personal Development',
      type: 'article',
      date: 'Aug 2026',
      authorOrSource: 'Cognitive Systems Laboratory',
      badge: 'Review Article',
      readTime: '9 min read',
      citationCount: 19,
    },
    {
      id: 'k-6',
      title: 'Urban Bioswales as Thermal Buffers: Longitudinal Analysis',
      description: 'Ten-year microclimate dataset quantifying surface temperature reduction and storm run-off filtration in high-density metropolitan zones.',
      category: 'Environment',
      type: 'article',
      date: 'Jul 2026',
      authorOrSource: 'Metropolitan Ecology Collaborative',
      badge: 'Longitudinal Data',
      readTime: '18 min read',
      citationCount: 51,
    },
  ];

  const categories = ['All', 'Research', 'Environment', 'Technology', 'Education', 'Personal Development'];

  const filteredArticles = articles.filter((art) => {
    const matchesCat = activeCategory === 'All' || art.category === activeCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.authorOrSource.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-28 pb-24 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>FEBROS16 Repository</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Knowledge Base
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Access peer-reviewed articles, technical analyses, historical treatises, and foundational texts curated for accuracy and source transparency.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search knowledge repository..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/60 hover:bg-slate-900/80 transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-blue-400">{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{art.readTime}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-slate-400">{art.citationCount} citations</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Source</span>
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {art.title}
                </h2>

                <p className="mt-2 text-sm text-slate-300 line-clamp-2 leading-relaxed">
                  {art.description}
                </p>

                <div className="mt-3 text-xs text-slate-400">
                  Author: <span className="text-slate-300 font-medium">{art.authorOrSource}</span>
                </div>
              </div>

              <div className="shrink-0 flex md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                <span className="text-xs font-mono text-slate-400">{art.date}</span>
                <span className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 rounded-lg text-xs font-semibold transition-colors">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DetailModal
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        searchResult={selectedArticle}
      />
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, BookOpen, FolderGit2, Boxes, Sparkles, Flag, ArrowRight } from 'lucide-react';
import { SearchResult, ContentType } from '../src/types';
import { apiService } from '../src/services/api';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onSelectResult?: (result: SearchResult) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  onSelectResult,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    let isCancelled = false;
    const executeSearch = async () => {
      setIsLoading(true);
      try {
        const searchResults = await apiService.search(query, activeFilter);
        if (!isCancelled) {
          setResults(searchResults);
        }
      } catch {
        if (!isCancelled) setResults([]);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    const timer = setTimeout(executeSearch, 150);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [query, activeFilter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filterTabs = [
    { id: 'all', label: 'All Content' },
    { id: 'article', label: 'Articles' },
    { id: 'research', label: 'Research' },
    { id: 'resource', label: 'Resources' },
    { id: 'opportunity', label: 'Opportunities' },
    { id: 'campaign', label: 'Campaigns' },
  ];

  const getTypeIcon = (type: ContentType) => {
    switch (type) {
      case 'article':
        return <BookOpen className="w-4 h-4 text-blue-400" />;
      case 'research':
        return <FolderGit2 className="w-4 h-4 text-indigo-400" />;
      case 'resource':
        return <Boxes className="w-4 h-4 text-emerald-400" />;
      case 'opportunity':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'campaign':
        return <Flag className="w-4 h-4 text-rose-400" />;
      default:
        return <Search className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, articles, research, resources... (e.g. quantum, energy, fellowship)"
            className="w-full bg-transparent text-base sm:text-lg text-white placeholder-slate-400 focus:outline-none"
            id="search-modal-title"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white rounded-md cursor-pointer"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg ml-2 cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 py-2.5 bg-slate-950/50 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-2 flex-1">
          {isLoading ? (
            <div className="py-12 text-center text-sm text-slate-400">
              <div className="inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
              <div>Querying Febros16 index...</div>
            </div>
          ) : results.length > 0 ? (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectResult?.(item);
                  onClose();
                }}
                className="group p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/60 hover:bg-slate-800/60 transition-all cursor-pointer flex flex-col justify-between"
                role="button"
                tabIndex={0}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      <span className="font-semibold uppercase tracking-wider text-slate-300">
                        {item.type}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.category}</span>
                    </div>
                    <span className="font-mono text-slate-300">{item.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs sm:text-sm text-slate-300 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Source: <strong className="text-slate-300">{item.authorOrSource}</strong>
                  </span>
                  <span className="text-blue-400 group-hover:text-blue-300 flex items-center gap-1 font-medium">
                    <span>View Record</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-sm text-slate-400">
              <Search className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <div>No results matching "{query}" in {activeFilter}</div>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for "fellowship", "energy", "open access", or "research"
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 px-4">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono">ESC</kbd> to close
          </div>
          <div className="flex items-center gap-2">
            <span>Endpoint:</span>
            <span className="font-mono text-blue-400">GET /api/v1/search</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;

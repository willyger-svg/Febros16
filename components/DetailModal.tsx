"use client";

import React from 'react';
import Link from 'next/link';
import { X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { FeatureCardItem, CategoryItem, SearchResult } from '../src/types';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: FeatureCardItem | null;
  category?: CategoryItem | null;
  searchResult?: SearchResult | null;
  onExploreTopic?: (topic: string) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  feature,
  category,
  searchResult,
  onExploreTopic,
}) => {
  if (!isOpen) return null;

  const title = feature?.title || category?.name || searchResult?.title || 'Details';
  const subtitle = feature?.description || category?.description || searchResult?.description || '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[85vh] overflow-y-auto text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>FEBROS16 Verified Knowledge Module</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {feature && (
          <div className="space-y-4 my-6">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Module Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {feature.highlights.map((h, i) => (
                <div key={i} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 text-xs text-slate-300 leading-relaxed">
              <strong className="text-white block mb-1">Architecture Note:</strong>
              This module interfaces with the Go backend API running on Render (`/api/v1/${feature.id}`) with PostgreSQL storage for persistent user research state.
            </div>
          </div>
        )}

        {category && (
          <div className="space-y-4 my-6">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Featured Subtopics in {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.featuredTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => {
                    onExploreTopic?.(topic);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  {topic}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Catalog volume: <strong>{category.itemCount} published resources</strong></span>
              <span className="font-mono text-blue-400">slug: /{category.slug}</span>
            </div>
          </div>
        )}

        {searchResult && (
          <div className="space-y-4 my-6">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Category: <strong className="text-slate-200">{searchResult.category}</strong></span>
              <span className="text-slate-400">Source: <strong className="text-blue-400">{searchResult.authorOrSource}</strong></span>
              <span className="text-slate-400">Date: <strong className="text-slate-200">{searchResult.date}</strong></span>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>

          {feature ? (
            <Link
              href={feature.route}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white rounded-lg transition-colors shadow-md shadow-blue-900/30 cursor-pointer"
            >
              <span>Access {feature.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white rounded-lg transition-colors shadow-md shadow-blue-900/30 cursor-pointer"
            >
              <span>Access Full Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;

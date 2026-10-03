"use client";

import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import FeatureGrid from '../components/FeatureGrid';
import CategorySection from '../components/CategorySection';
import ResearchWorkflowSection from '../components/ResearchWorkflowSection';
import PlatformEcosystemSection from '../components/PlatformEcosystemSection';
import SearchModal from '../components/SearchModal';
import AuthModal from '../components/AuthModal';
import DetailModal from '../components/DetailModal';
import { StatItem, FeatureCardItem, CategoryItem, SearchResult } from '../src/types';
import { HERO_STATS, FEATURE_CARDS, CATEGORIES } from '../src/data/mockData';
import { apiService } from '../src/services/api';

export default function HomePage() {
  const [stats, setStats] = useState<StatItem[]>(HERO_STATS);
  const [categories, setCategories] = useState<CategoryItem[]>(CATEGORIES);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedFeature, setSelectedFeature] = useState<FeatureCardItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [selectedSearchResult, setSelectedSearchResult] = useState<SearchResult | null>(null);

  useEffect(() => {
    let isCancelled = false;
    const loadData = async () => {
      try {
        const [loadedStats, loadedCategories] = await Promise.all([
          apiService.getHeroStats(),
          apiService.getCategories(),
        ]);
        if (!isCancelled) {
          if (loadedStats && loadedStats.length > 0) setStats(loadedStats);
          if (loadedCategories && loadedCategories.length > 0) setCategories(loadedCategories);
        }
      } catch {
        // Fallback maintained
      }
    };
    loadData();
    return () => {
      isCancelled = true;
    };
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchModalOpen(true);
  };

  return (
    <>
      <HeroSection
        stats={stats}
        onSearch={handleSearch}
        onOpenSearchModal={() => setSearchModalOpen(true)}
      />

      <FeatureGrid
        features={FEATURE_CARDS}
        onSelectFeature={(feat) => setSelectedFeature(feat)}
      />

      <CategorySection
        categories={categories}
      />

      <ResearchWorkflowSection />

      <PlatformEcosystemSection />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        initialQuery={searchQuery}
        onSelectResult={(res) => setSelectedSearchResult(res)}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />

      <DetailModal
        isOpen={!!selectedFeature || !!selectedCategory || !!selectedSearchResult}
        onClose={() => {
          setSelectedFeature(null);
          setSelectedCategory(null);
          setSelectedSearchResult(null);
        }}
        feature={selectedFeature}
        category={selectedCategory}
        searchResult={selectedSearchResult}
      />
    </>
  );
}

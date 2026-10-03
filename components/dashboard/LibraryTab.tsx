"use client";

import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  Search,
} from 'lucide-react';
import { DashboardTabId } from './DashboardLayout';

interface LibraryTabProps {
  onNavigateTab: (tab: DashboardTabId) => void;
}

export const LibraryTab: React.FC<LibraryTabProps> = ({ onNavigateTab }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const guides = [
    {
      id: 1,
      title: 'Mwongozo wa Siku 30 wa Kuanza Upya',
      category: 'Mwongozo Mkuu',
      pages: 'Kurasa 24',
      desc: 'Mkakati wa hatua kwa hatua wa kusafisha vifaa vyako, kuweka vizingiti vya nyumbani, na kurejesha furaha ya kawaida ya maisha.',
    },
    {
      id: 2,
      title: 'Daftari la Kurekodi na Kufuatilia Vichochezi',
      category: 'Zana ya Mazoezi',
      pages: 'Kurasa 12',
      desc: 'Kiolezo rasmi cha kuandika muda, hisia, na mazingira yanayochochea hamu ili kutambua mienendo yako kabla haijawa tabia.',
    },
    {
      id: 3,
      title: 'Mwongozo wa Usingizi na Vifaa vya Kidijitali',
      category: 'Afya ya Usingizi',
      pages: 'Kurasa 18',
      desc: 'Sayansi ya Melatonin na kwa nini kuondoa skrini kitandani kunaongeza umakini wa akili na kupunguza msongo wa mawazo.',
    },
    {
      id: 4,
      title: 'Kujenga Mahusiano Halisi na Mawasiliano Imara',
      category: 'Mahusiano',
      pages: 'Kurasa 16',
      desc: 'Jinsi ya kuponya athari za video za ngono katika mahusiano ya kimapenzi na kujenga hisia halisi za upendo.',
    },
  ];

  const filteredGuides = guides.filter((g) =>
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Kichwa cha Maktaba */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono mb-2 border border-blue-400/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>MAKTABA YA MIONGOZO NA NYENZO</span>
          </div>
          <h1 className="text-3xl font-black text-white">Maktaba ya Ustawi</h1>
          <p className="text-sm text-slate-300 mt-1">
            Vitabu, miongozo ya utendaji, na nyenzo za kisayansi za kukusaidia katika kila hatua ya safari yako.
          </p>
        </div>

        {/* Sanduku la Utafutaji */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tafuta mwongozo hapa..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
          />
        </div>
      </div>

      {/* Orodha ya Miongozo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            className="p-6 rounded-3xl backdrop-blur-xl bg-slate-900/70 border border-white/15 space-y-4 hover:border-white/25 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-blue-300 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-400/20">
                  {guide.category}
                </span>
                <span className="text-slate-400 font-mono">{guide.pages}</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">{guide.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{guide.desc}</p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-emerald-400 font-mono">Bila Malipo · Nakala ya PDF</span>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Pakua Mwongozo</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryTab;

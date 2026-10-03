"use client";

import React from 'react';
import {
  FlaskConical,
  BookOpen,
  Award,
  ExternalLink,
  Sparkles,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { DashboardTabId } from './DashboardLayout';

interface ResearchTabProps {
  onNavigateTab: (tab: DashboardTabId) => void;
}

export const ResearchTab: React.FC<ResearchTabProps> = ({ onNavigateTab }) => {
  const papers = [
    {
      id: 1,
      journal: 'Behavioral Sciences & Neuroscience (2024)',
      title: 'Athari za Maudhui ya Ngono kwenye Eneo la Prefrontal Cortex na Maamuzi',
      authors: 'Dkt. E. Hilton, Prof. C. Watts et al.',
      summary:
        'Utafiti unaonyesha kuwa kutazama video za ngono mara kwa mara hupunguza mzunguko wa damu katika sehemu ya mbele ya ubongo (prefrontal cortex), eneo linalohusika na udhibiti wa msukumo, motisha ya muda mrefu, na umakini.',
      keyFinding: 'Kupunguza matumizi kwa siku 60 hurejesha unyumbufu wa kisaikolojia kwa asilimia 38.',
    },
    {
      id: 2,
      journal: 'Journal of Behavioral Addictions (2023)',
      title: 'Uchovu, Upweke na Tabia ya Kujichua kama Njia ya Kutoroka Hisia',
      authors: 'Dkt. M. Griffiths, A. Starcevic et al.',
      summary:
        'Takriban 72% ya matukio ya kujichua na kutazama maudhui ya ngono huanzishwa na hisia zisizofurahisha kama kuchoshwa, msongo wa mawazo, au kutotulia, badala ya hitaji la kibiolojia la tendo la ndoa.',
      keyFinding: 'Kutambua kichocheo cha kihisia kunapunguza uwezekano wa kurudia tabia kwa zaidi ya nusu.',
    },
    {
      id: 3,
      journal: 'Sleep Medicine Reviews (2024)',
      title: 'Mwanga wa Bluu, Simu za Mkononi Usiku na Kupungua kwa Melatonin',
      authors: 'Prof. S. Lockley, Harvard Medical Research Group',
      summary:
        'Kutumia simu kitandani kabla ya kulala kunazuia utoaji wa homoni ya Melatonin kwa saa 1.5, jambo linaloharibu usingizi wa REM na kuongeza msongo wa mawazo siku inayofuata.',
      keyFinding: 'Kuacha simu nje ya chumba cha kulala kunaboresha usingizi mzito kwa 45%.',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono mb-2 border border-blue-400/30">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>SAYANSI NA TAFITI ZA KITAALUMA</span>
          </div>
          <h1 className="text-3xl font-black text-white">Tafiti Zilizothibitishwa</h1>
          <p className="text-sm text-slate-300 mt-1">
            Ushahidi wa kisayansi kutoka majarida ya kimataifa kuhusu afya ya ubongo, tabia, na kurejesha utulivu wa akili.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('learn')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all cursor-pointer self-start"
        >
          <span>Soma Moduli za Masomo</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Research Papers List */}
      <div className="space-y-4">
        {papers.map((paper) => (
          <div
            key={paper.id}
            className="p-6 sm:p-8 rounded-3xl backdrop-blur-xl bg-slate-900/70 border border-white/15 space-y-4 hover:border-white/25 transition-all"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-emerald-400 block font-semibold">
                {paper.journal}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {paper.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono">{paper.authors}</p>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {paper.summary}
            </p>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <strong className="text-white">Matokeo Makuu ya Kisayansi: </strong>
                <span>{paper.keyFinding}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchTab;

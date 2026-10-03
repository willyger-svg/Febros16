"use client";

import React, { useState } from 'react';
import {
  Brain,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { DashboardTabId } from './DashboardLayout';

interface LearnTabProps {
  onNavigateTab: (tab: DashboardTabId) => void;
}

export const LearnTab: React.FC<LearnTabProps> = ({ onNavigateTab }) => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  const modules = [
    {
      id: 1,
      title: 'Mzunguko wa Tabia na Vichochezi (Mzunguko wa Mazoea)',
      subtitle: 'Kuelewa Muundo wa Kichocheo ➔ Kitendo ➔ Zawadi',
      duration: 'Dakika 5 za Kusoma',
      status: 'Inaendelea',
      progress: 60,
      description:
        'Kila tabia ya kidijitali huanza na kichocheo cha hisia (kama vile uchovu, upweke, au msongo wa mawazo). Hapa unajifunza jinsi ya kubadili mwitikio wako punde kichocheo kinapojitokeza bila kurudia tabia ya zamani.',
      points: [
        'Kichocheo: Hisia, mazingira au muda unaoamsha hamu ya haraka.',
        'Mwitikio: Kitendo unachofanya baada ya kuhisi msukumo huo.',
        'Zawadi: Nauli ya haraka ya Dopamine ambayo ubongo wako unaitaka.',
      ],
    },
    {
      id: 2,
      title: 'Sayansi ya Dopamine na Uchovu wa Akili',
      subtitle: 'Kwa nini video za ngono hulemea mfumo wa motisha wa ubongo',
      duration: 'Dakika 7 za Kusoma',
      status: 'Haijaanza',
      progress: 0,
      description:
        'Maudhui ya ngono hutoa viwango visivyo vya asili vya Dopamine. Kadiri unavyotazama mara nyingi, ndivyo vipokezi vya ubongo vinavyopungua, na kusababisha kutojali, uchovu na kupoteza ari ya maisha ya kawaida.',
      points: [
        'Kiwango cha Kawaida cha Dopamine: Furaha halisi ya maisha ya kila siku.',
        'Kupungua kwa Hisia: Hali ya kuhitaji maudhui makali zaidi ili kupata msisimko uleule.',
        'Kurejesha Usawa: Ubongo una uwezo wa kujiponya na kurejesha utulivu ndani ya siku 30 hadi 90.',
      ],
    },
    {
      id: 3,
      title: 'Kujenga Vizingiti vya Kimazingira',
      subtitle: 'Kufanya tabia mbaya iwe ngumu sana kuitekeleza',
      duration: 'Dakika 6 za Kusoma',
      status: 'Haijaanza',
      progress: 0,
      description:
        'Nguvu ya maamuzi pekee hupungua sana mwishoni mwa siku unapokuwa umechoka. Njia ya uhakika ni kuweka vizuizi vya kimazingira kati yako na kifaa chako, hasa wakati wa usiku.',
      points: [
        'Chaji simu nje ya chumba cha kulala kila usiku.',
        'Tumia saa ya kawaida ya mezani kuamka badala ya simu.',
        'Weka vizuizi na vichujio vya tovuti zisizofaa.',
      ],
    },
    {
      id: 4,
      title: 'Mbinu ya Kuogelea Juu ya Wimbi la Hamu',
      subtitle: 'Kutazama hamu ikipita bila kuitekeleza',
      duration: 'Dakika 4 za Kusoma',
      status: 'Haijaanza',
      progress: 0,
      description:
        'Hamu sio amri ya lazima kuitekeleza, bali ni wimbi la hisia linalopanda hadi kileleni kwa takriban dakika 10 kisha linashuka lenyewe ikiwa hutalilisha kwa mawazo au kutafuta picha.',
      points: [
        'Itambue hamu kama hisia ya mpito mwilini (mapigo ya moyo au tumbo).',
        'Pumua polepole na usijilaumu wala kujihukumu.',
        'Tazama wimbi likiondoka lenyewe bila wewe kufanya kosa.',
      ],
    },
  ];

  const currentMod = modules[activeModuleIndex];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono mb-2 border border-blue-400/30">
            <Brain className="w-3.5 h-3.5" />
            <span>MODULI ZA ELIMU NA SAYANSI</span>
          </div>
          <h1 className="text-3xl font-black text-white">Jifunze Sayansi ya Tabia</h1>
          <p className="text-sm text-slate-300 mt-1">
            Uelewa wa kina kuhusu ubongo, homoni ya Dopamine, na namna ya kujenga nidhamu thabiti.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('quick-help')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 text-rose-300 text-xs font-bold transition-all cursor-pointer self-start"
        >
          <span>Unapitia Hamu Sasa Hivi?</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Somo Linaloendelea */}
      <div className="backdrop-blur-xl bg-slate-900/70 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono text-blue-400 font-semibold uppercase">
              Moduli ya {activeModuleIndex + 1} kati ya {modules.length} · {currentMod.duration}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              {currentMod.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">{currentMod.subtitle}</p>
          </div>

          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-mono self-start sm:self-auto">
            {currentMod.status}
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
          {currentMod.description}
        </p>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
            Misingi Muhimu ya Kukumbuka:
          </span>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
            {currentMod.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            disabled={activeModuleIndex === 0}
            onClick={() => setActiveModuleIndex((prev) => prev - 1)}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            ← Somo Lililopita
          </button>

          <button
            type="button"
            disabled={activeModuleIndex === modules.length - 1}
            onClick={() => setActiveModuleIndex((prev) => prev + 1)}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-900/40 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
          >
            <span>Somo Linalofuata</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Orodha ya Masomo Yote */}
      <div className="space-y-3">
        <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-bold">
          Mitaala Yote ya Masomo
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modules.map((mod, idx) => (
            <div
              key={mod.id}
              onClick={() => setActiveModuleIndex(idx)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                activeModuleIndex === idx
                  ? 'bg-blue-600/20 border-blue-400/50 shadow-lg'
                  : 'bg-slate-900/50 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-blue-300">Moduli #{mod.id}</span>
                <span className="text-slate-400">{mod.duration}</span>
              </div>
              <h4 className="text-sm font-bold text-white">{mod.title}</h4>
              <p className="text-xs text-slate-300 line-clamp-2">{mod.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnTab;

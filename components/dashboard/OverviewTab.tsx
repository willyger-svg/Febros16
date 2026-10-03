"use client";

import React, { useState } from 'react';
import {
  CheckCircle2,
  Compass,
  Sparkles,
  ChevronRight,
  X,
} from 'lucide-react';
import { DashboardTabId } from './DashboardLayout';

interface OverviewTabProps {
  user?: any;
  userStats?: any;
  onNavigateTab: (tab: DashboardTabId) => void;
}

type MoodType = 'good' | 'okay' | 'struggling' | 'hard' | null;

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigateTab, user, userStats }) => {
  const getDaysSinceJoined = (dateString?: string) => {
    if (!dateString || dateString.startsWith('0001') || dateString.startsWith('1970')) return 1;
    const days = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 3600 * 24));
    return isNaN(days) || days < 1 ? 1 : days;
  };

  const [selectedMood, setSelectedMood] = useState<MoodType>(null);
  const [focusModalOpen, setFocusModalOpen] = useState(false);

  const moodResponses: Record<string, { title: string; desc: string }> = {
    good: {
      title: 'Nzuri Sana! Endelea na Nidhamu Hii.',
      desc: 'Kujisikia vizuri ni matokeo ya maamuzi yako chanya. Tumia nguvu hii kukamilisha shughuli zako za leo.',
    },
    okay: {
      title: 'Kawaida ni Sehemu ya Safari.',
      desc: 'Siku hazifanani kila mara. Kudumisha utulivu wakati mambo yapo kawaida kunajenga ustahimilivu wa muda mrefu.',
    },
    struggling: {
      title: 'Hauko Peke Yako, Pumua Kwanza.',
      desc: 'Kupitia changamoto hakukufanyi ushindwe. Hii ni hisia ya muda mfupi tu. Punguza matumizi ya skrini sasa hivi.',
    },
    hard: {
      title: 'Tulia, Hali Hii Itapita.',
      desc: 'Usijihukumu. Jaribu kusimama, kunywa glasi ya maji, au piga hatua chache nje. Tumia tab ya Msaada wa Haraka kama unahitaji.',
    },
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Greeting (100% Swahili) */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <span>Karibu tena, {user?.full_name?.split(" ")[0] || "Mtafiti"}</span>
          <span className="inline-block animate-bounce">👋</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-200 font-normal">
          Unajenga maisha bora na yenye utulivu wa kidijitali.
        </p>
      </div>

      {/* 1. MAENDELEO YAKO (YOUR PROGRESS) */}
      <div className="backdrop-blur-xl bg-slate-900/60 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-blue-400/40 before:to-transparent">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
            MAENDELEO YAKO
          </span>
          <button
            type="button"
            onClick={() => onNavigateTab('progress')}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
          >
            Tazama Zaidi →
          </button>
        </div>

        {/* Progress Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Streak Card */}
          <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 text-xl shadow-lg">
              🔥
            </div>
            <div>
              <div className="text-2xl font-black text-white">{getDaysSinceJoined(user?.created_at)} Siku</div>
              <div className="text-xs text-slate-300">Tangu Kujiunga</div>
            </div>
          </div>

          {/* Completed Activities */}
          <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{userStats?.total_articles || 0} Makala</div>
              <div className="text-xs text-slate-300">Zilizochapishwa</div>
            </div>
          </div>

          {/* Triggers Identified */}
          <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-lg">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{userStats?.triggers_identified || 0} Vichochezi</div>
              <div className="text-xs text-slate-300">Vimetambuliwa</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LENGO LA LEO (TODAY'S FOCUS) */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold block">
          LENGO LA LEO
        </span>
        <div className="backdrop-blur-xl bg-slate-900/60 border border-white/15 rounded-3xl p-6 shadow-2xl flex items-center justify-center text-slate-400">
          <p className="text-sm">Hakuna lengo lililowekwa kwa leo.</p>
        </div>
      </div>

      {/* 3. UFAHAMU WAKO WA SASA (YOUR INSIGHT) */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold block">
          UFAHAMU WAKO
        </span>

        <div className="backdrop-blur-xl bg-slate-900/60 border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                Kuchoshwa kunaonekana kuwa moja ya vichochezi vyako vikuu.
              </p>
              <p className="text-xs text-slate-300">
                Uchambuzi unaonyesha kuwa kuchoshwa au kukosa shughuli ndicho kichocheo kikubwa kinachokufanya utafute msisimko wa haraka.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigateTab('research')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer group"
            >
              <span>Chunguza mienendo yako →</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. UNAJISIKIAJE LEO? (HOW ARE YOU TODAY?) */}
      <div className="space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold block">
          UNAJISIKIAJE LEO?
        </span>

        {/* Mood Selection Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'good', emoji: '🙂', label: 'Vizuri' },
            { id: 'okay', emoji: '😐', label: 'Kawaida' },
            { id: 'struggling', emoji: '😔', label: 'Changamoto' },
            { id: 'hard', emoji: '😣', label: 'Vigumu' },
          ].map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                type="button"
                onClick={() => setSelectedMood(mood.id as MoodType)}
                className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600/30 border-blue-400 text-white shadow-xl shadow-blue-900/40 scale-[1.03]'
                    : 'bg-white/[0.05] border-white/10 hover:bg-white/[0.12] hover:border-white/25 text-slate-200'
                }`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className="text-sm font-bold block">{mood.label}</span>
              </button>
            );
          })}
        </div>

        {/* Empathetic Feedback when selected */}
        {selectedMood && (
          <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/40 animate-in fade-in space-y-1">
            <p className="text-xs sm:text-sm font-bold text-white">
              {moodResponses[selectedMood].title}
            </p>
            <p className="text-xs text-slate-300">
              {moodResponses[selectedMood].desc}
            </p>
          </div>
        )}
      </div>

      {/* 5-Min Activity Modal */}
      {focusModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-in fade-in"
          onClick={() => setFocusModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg backdrop-blur-2xl bg-slate-950/90 border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setFocusModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-blue-400">Zoezi la Dakika 5</span>
              <h3 className="text-xl font-bold text-white mt-1">Kuelewa Vichochezi Vyako vya Kuchoshwa</h3>
              <p className="text-xs text-slate-300 mt-1">
                Uchovu si tatizo, bali ni ishara kwamba akili yako inatafuta shughuli ya maana.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs text-slate-200">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 font-bold">1</span>
                <span>Unapohisi kuchoshwa, subiri sekunde 60 kabla ya kushika simu au kufungua tab mpya.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 font-bold">2</span>
                <span>Jiulize: "Je, mwili wangu unahitaji maji, usingizi, au shughuli mbadala?"</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 font-bold">3</span>
                <span>Chagua shughuli moja isiyo na skrini (kutembea, kufungua dirisha, au kupanga meza yako).</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFocusModalOpen(false)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg cursor-pointer"
            >
              Nimekamilisha Zoezi la Leo ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewTab;

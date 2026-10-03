"use client";

import React from 'react';
import {
  BarChart3,
  Flame,
  CheckCircle2,
  Calendar,
  Compass,
  Moon,
  Clock,
} from 'lucide-react';
import { DashboardTabId } from './DashboardLayout';

interface ProgressTabProps {
  onNavigateTab: (tab: DashboardTabId) => void;
}

export const ProgressTab: React.FC<ProgressTabProps> = ({ onNavigateTab }) => {
  const past7Days = [
    { day: 'Jumatatu', date: 'Sept 27', activities: 2 },
    { day: 'Jumanne', date: 'Sept 28', activities: 1 },
    { day: 'Jumatano', date: 'Sept 29', activities: 3 },
    { day: 'Alhamisi', date: 'Sept 30', activities: 2 },
    { day: 'Ijumaa', date: 'Okt 01', activities: 1 },
    { day: 'Jumamosi', date: 'Okt 02', activities: 2 },
    { day: 'Jumapili (Leo)', date: 'Okt 03', activities: 1 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Kichwa cha Ukurasa */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono mb-2 border border-emerald-400/30">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>SIKU 7 ZA NIDHAMU YA KIDIITALI</span>
          </div>
          <h1 className="text-3xl font-black text-white">Takwimu na Maendeleo Yako</h1>
          <p className="text-sm text-slate-300 mt-1">
            Fuatilia safari yako ya kujitawala, saa za usingizi ulizookoa, na vichochezi ulivyodhibiti.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('checkin')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-900/40 cursor-pointer self-start"
        >
          <span>Fanya Tathmini ya Leo</span>
          <CheckCircle2 className="w-4 h-4" />
        </button>
      </div>

      {/* Vipimo Vikuu 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl backdrop-blur-xl bg-slate-900/70 border border-white/15 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Mfululizo wa Sasa</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white">Siku 7 🔥</div>
          <p className="text-xs text-slate-300">Wiki nzima ya nidhamu bila kurudia tabia.</p>
        </div>

        <div className="p-6 rounded-3xl backdrop-blur-xl bg-slate-900/70 border border-white/15 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Vitendo Vilivyokamilika</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-400">12</div>
          <p className="text-xs text-slate-300">Mazoezi ya kupumua na masomo ya kisaikolojia.</p>
        </div>

        <div className="p-6 rounded-3xl backdrop-blur-xl bg-slate-900/70 border border-white/15 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Muda Uliookolewa</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-blue-400">~Masaa 14</div>
          <p className="text-xs text-slate-300">Muda uliotumika kwa kazi, masomo na usingizi mnono.</p>
        </div>
      </div>

      {/* Mwenendo wa Siku 7 Zilizopita */}
      <div className="backdrop-blur-xl bg-slate-900/70 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Mwenendo wa Siku 7 Zilizopita</h3>
            <p className="text-xs text-slate-300">Kila siku yenye rangi ya kijani inamaanisha ushindi kamili wa nidhamu.</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
            100% Imara
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-7 gap-3 pt-2">
          {past7Days.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center space-y-2"
            >
              <span className="text-[11px] font-semibold text-slate-400 block">{item.day}</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center mx-auto text-lg font-bold shadow-md">
                ✓
              </div>
              <span className="text-[10px] text-slate-300 font-mono block">{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Vichochezi & Afya ya Mwili */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl backdrop-blur-xl bg-slate-900/70 border border-white/15 space-y-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            <h4 className="text-base font-bold text-white">Vichochezi 8 Vilivyotambuliwa</h4>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
              <span className="text-slate-200">Kuchoshwa bila shughuli (Uchovu)</span>
              <span className="font-mono text-amber-300 font-bold">Mara 4 (50%)</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
              <span className="text-slate-200">Kuwa kitandani na simu usiku sana</span>
              <span className="font-mono text-indigo-300 font-bold">Mara 2 (25%)</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
              <span className="text-slate-200">Msongo wa mawazo wa kazi au masomo</span>
              <span className="font-mono text-blue-300 font-bold">Mara 2 (25%)</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl backdrop-blur-xl bg-slate-900/70 border border-white/15 space-y-4">
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-blue-400" />
            <h4 className="text-base font-bold text-white">Mabadiliko ya Mwili & Akili</h4>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-white/5 space-y-1">
              <span className="font-bold text-white block">Ubora wa Usingizi (+25%)</span>
              <p>Kuacha skrini kitandani kumekusaidia kulala haraka ndani ya dakika 15 badala ya saa 1.</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 space-y-1">
              <span className="font-bold text-white block">Kutotulia Kupungua</span>
              <p>Hali ya kukereka na kutotulia imepungua sana ikilinganishwa na wiki iliyopita.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTab;

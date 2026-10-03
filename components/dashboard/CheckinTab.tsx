"use client";

import React, { useState } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
} from 'lucide-react';
import { DashboardTabId } from './DashboardLayout';

interface CheckinTabProps {
  onNavigateTab: (tab: DashboardTabId) => void;
}

export const CheckinTab: React.FC<CheckinTabProps> = ({ onNavigateTab }) => {
  const [triggerFaced, setTriggerFaced] = useState<string | null>(null);
  const [sleepQuality, setSleepQuality] = useState<number | null>(null);
  const [victoryNote, setVictoryNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Kichwa cha Ukurasa */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono mb-2 border border-blue-400/30">
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>TATHMINI YA KILA SIKU</span>
          </div>
          <h1 className="text-3xl font-black text-white">Tathmini ya Leo</h1>
          <p className="text-sm text-slate-300 mt-1">
            Dakika 2 za kutafakari mchana wako, kurekodi ushindi, na kuweka nia imara ya usiku wa leo.
          </p>
        </div>

        <span className="text-xs font-mono text-slate-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 self-start">
          Tarehe: 03 Oktoba 2026
        </span>
      </div>

      {submitted ? (
        <div className="p-8 sm:p-12 rounded-3xl backdrop-blur-xl bg-slate-900/80 border border-emerald-500/40 text-center space-y-5 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-300 shadow-2xl">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Tathmini Yako Imerekodiwa Vyema!
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Asante kwa kuwa mkweli na kujitolea kujenga maisha thabiti. Rekodi hii imeongezwa kwenye maendeleo yako ya wiki.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigateTab('dashboard')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg cursor-pointer"
            >
              Rudi kwenye Dashibodi Kuu
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Swali la 1 */}
          <div className="p-6 sm:p-8 rounded-3xl backdrop-blur-xl bg-slate-900/70 border border-white/15 space-y-4">
            <h3 className="text-base font-bold text-white">
              1. Je, umekumbana na kishawishi au hamu yoyote leo?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'none', label: 'Hapana, siku ilikuwa shwari kabisa' },
                { id: 'managed', label: 'Ndiyo, lakini niliidhibiti bila kurudia' },
                { id: 'struggling', label: 'Ndiyo, ilikuwa ngumu lakini nimevumilia' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTriggerFaced(opt.id)}
                  className={`p-4 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                    triggerFaced === opt.id
                      ? 'bg-blue-600/30 border-blue-400 text-white shadow-lg shadow-blue-900/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Swali la 2 */}
          <div className="p-6 sm:p-8 rounded-3xl backdrop-blur-xl bg-slate-900/70 border border-white/15 space-y-4">
            <h3 className="text-base font-bold text-white">
              2. Tathmini ubora wa usingizi wako wa usiku uliopita:
            </h3>

            <div className="grid grid-cols-5 gap-2 text-center">
              {[
                { val: 1, label: 'Mbaya' },
                { val: 2, label: 'Dhaifu' },
                { val: 3, label: 'Wastani' },
                { val: 4, label: 'Mzuri' },
                { val: 5, label: 'Bora Sana' },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setSleepQuality(item.val)}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    sleepQuality === item.val
                      ? 'bg-blue-600/30 border-blue-400 text-white'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <span className="block text-lg font-black">{item.val}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Swali la 3 */}
          <div className="p-6 sm:p-8 rounded-3xl backdrop-blur-xl bg-slate-900/70 border border-white/15 space-y-3">
            <h3 className="text-base font-bold text-white">
              3. Andika neno moja la ushindi au changamoto ya leo (Hiari):
            </h3>
            <textarea
              value={victoryNote}
              onChange={(e) => setVictoryNote(e.target.value)}
              placeholder="Mfano: Leo nilipohisi kuchoshwa saa 10 jioni, nilifanya mazoezi ya dakika 15 badala ya kushika simu..."
              rows={3}
              className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors resize-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-sm transition-all shadow-xl shadow-blue-900/40 cursor-pointer"
            >
              Hifadhi Tathmini ya Leo ✓
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckinTab;

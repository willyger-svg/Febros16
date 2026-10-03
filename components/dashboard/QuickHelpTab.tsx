"use client";

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Heart,
  Droplets,
  Wind,
} from 'lucide-react';
import { DashboardTabId } from './DashboardLayout';

interface QuickHelpTabProps {
  onNavigateTab: (tab: DashboardTabId) => void;
}

export const QuickHelpTab: React.FC<QuickHelpTabProps> = ({ onNavigateTab }) => {
  // 1. Urge Surfing 10-Minute Timer
  const [timerSeconds, setTimerSeconds] = useState(600); // dakika 10
  const [timerActive, setTimerActive] = useState(false);

  // 2. Zoezi la Kupumua la 4-7-8
  const [breathingPhase, setBreathingPhase] = useState<'Vuta Pumzi' | 'Shikilia' | 'Toa Polepole'>('Vuta Pumzi');
  const [breathingCount, setBreathingCount] = useState(4);
  const [breathingActive, setBreathingActive] = useState(false);

  // Athari ya Kipima Muda
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timerSeconds]);

  // Athari ya Kupumua
  useEffect(() => {
    let bInterval: NodeJS.Timeout | null = null;
    if (breathingActive) {
      bInterval = setInterval(() => {
        setBreathingCount((prev) => {
          if (prev > 1) return prev - 1;
          if (breathingPhase === 'Vuta Pumzi') {
            setBreathingPhase('Shikilia');
            return 7;
          } else if (breathingPhase === 'Shikilia') {
            setBreathingPhase('Toa Polepole');
            return 8;
          } else {
            setBreathingPhase('Vuta Pumzi');
            return 4;
          }
        });
      }, 1000);
    }
    return () => {
      if (bInterval) clearInterval(bInterval);
    };
  }, [breathingActive, breathingPhase]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Kichwa cha Msaada wa Papo Hapo */}
      <div className="p-6 sm:p-8 rounded-3xl bg-rose-950/40 border border-rose-500/30 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-400/30">
          <ShieldAlert className="w-4 h-4" />
          <span>MSAADA WA PAPO HAPO</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          Tulia, Hauko Peke Yako. Wimbi Hili Linapita.
        </h1>
        <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
          Hamu kubwa ya video za ngono au kujichua ni kama wimbi la bahari. Linapanda hadi kileleni kwa dakika chache, kisha linafifia lenyewe ukiliacha lipite bila kuliendekeza.
        </p>
      </div>

      {/* Zana 1: Kipima Muda cha Dakika 10 */}
      <div className="backdrop-blur-xl bg-slate-900/70 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
            Kipima Muda cha Wimbi la Hamu
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white">Dakika 10 za Kutuliza Akili</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md">
            Weka ahadi na nafsi yako kusubiri dakika hizi 10 bila kufungua kifaa chochote. Asilimia 90 ya hamu hupotea kabla ya muda huu kuisha.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 shrink-0">
          <div className="text-5xl font-mono font-black text-white bg-slate-950/70 px-6 py-4 rounded-2xl border border-white/10 shadow-inner">
            {formatTime(timerSeconds)}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTimerActive(!timerActive)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
            >
              {timerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{timerActive ? 'Sitisha' : 'Anza Muda'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setTimerActive(false);
                setTimerSeconds(600);
              }}
              className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-slate-300 hover:text-white cursor-pointer"
              title="Rudia Mwanzo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Zana 2: Zoezi la Kupumua la 4-7-8 */}
      <div className="backdrop-blur-xl bg-slate-900/70 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
              <Wind className="w-4 h-4" />
              <span>Zoezi la Kupumua la 4-7-8 (Kutuliza Mfumo wa Neva)</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              Shusha Mapigo ya Moyo na Msongo wa Mawazo
            </h3>
            <p className="text-xs text-slate-300">
              Vuta pumzi (sekunde 4) ➔ Shikilia (sekunde 7) ➔ Toa taratibu (sekunde 8).
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setBreathingActive(!breathingActive);
              if (!breathingActive) {
                setBreathingPhase('Vuta Pumzi');
                setBreathingCount(4);
              }
            }}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs shadow-lg transition-all cursor-pointer self-start sm:self-auto"
          >
            {breathingActive ? 'Simamisha Zoezi' : 'Anza Zoezi la Kupumua'}
          </button>
        </div>

        {/* Duara Linalohuishwa la Kupumua */}
        <div className="py-8 flex flex-col items-center justify-center">
          <div
            className={`w-40 h-40 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 ${
              breathingPhase === 'Vuta Pumzi'
                ? 'border-blue-400 bg-blue-500/20 scale-110 shadow-2xl shadow-blue-500/50'
                : breathingPhase === 'Shikilia'
                ? 'border-amber-400 bg-amber-500/20 scale-110 shadow-2xl shadow-amber-500/50'
                : 'border-emerald-400 bg-emerald-500/20 scale-95 shadow-2xl shadow-emerald-500/50'
            }`}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-slate-300">
              {breathingPhase}
            </span>
            <span className="text-4xl font-black text-white mt-1">{breathingCount}</span>
          </div>
        </div>
      </div>

      {/* Mbinu za Mwili za Dharura */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
            <Droplets className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Nawa Uso na Maji Baridi</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Maji baridi usoni huamsha mfumo wa kutuliza mwili na kushusha msukumo wa damu na hamu mara moja.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Ondoka Eneo Ulilopo Sasa</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Kama uko kitandani au chumbani peke yako, simama mara moja nenda sebuleni au nje kwa hewa safi.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <Heart className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Kumbuka Nia Yako ya Uhuru</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Kumbuka kwa nini uliamua kuacha. Ushindi mdogo wa sasa hivi unakupa heshima na amani ya kudumu kesho asubuhi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickHelpTab;

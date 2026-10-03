"use client";

import React, { useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  HeartHandshake,
  Lock,
} from 'lucide-react';

interface AssessmentPageProps {
  onNavigateHome: () => void;
  userEmail?: string;
}

// 1. Standard options for frequency questions (1-20 & 22-27)
const STANDARD_CHOICES = [
  { key: 'A', label: 'Kamwe', value: 0 },
  { key: 'B', label: 'Mara chache sana', value: 1 },
  { key: 'C', label: 'Mara chache', value: 2 },
  { key: 'D', label: 'Wakati mwingine', value: 3 },
  { key: 'E', label: 'Mara nyingi', value: 4 },
  { key: 'F', label: 'Karibu kila mara', value: 5 },
];

// 2. Custom choices for Question 21 (Marudio ya Kujichua)
const Q21_CHOICES = [
  { key: 'A', label: 'Sijichui', value: 0 },
  { key: 'B', label: 'Mara moja kwa wiki au chini ya hapo', value: 1 },
  { key: 'C', label: 'Mara mbili hadi tatu kwa wiki', value: 2 },
  { key: 'D', label: 'Mara nne hadi sita kwa wiki', value: 3 },
  { key: 'E', label: 'Kila siku', value: 4 },
  { key: 'F', label: 'Zaidi ya mara moja kwa siku', value: 5 },
];

// 3. Custom choices for Question 28 (Athari ya Jumla)
const Q28_CHOICES = [
  { key: 'A', label: 'Haijaniathiri', value: 0 },
  { key: 'B', label: 'Imeniathiri kidogo', value: 1 },
  { key: 'C', label: 'Imeniathiri kwa kiasi', value: 2 },
  { key: 'D', label: 'Imeniathiri sana', value: 3 },
  { key: 'E', label: 'Imeniathiri sana sana', value: 4 },
];

interface QuestionItem {
  id: number;
  sectionCode: string;
  sectionTitle: string;
  text: string;
  choices: { key: string; label: string; value: number }[];
  note?: string;
}

const QUESTIONS: QuestionItem[] = [
  // SEHEMU A — UWEZO WA KUJIDHIBITI
  {
    id: 1,
    sectionCode: 'SEHEMU A',
    sectionTitle: 'UWEZO WA KUJIDHIBITI',
    text: 'Je, umewahi kujikuta ukiangalia video za ngono licha ya kuwa ulikuwa umeamua kutotazama?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 2,
    sectionCode: 'SEHEMU A',
    sectionTitle: 'UWEZO WA KUJIDHIBITI',
    text: 'Je, umewahi kujaribu kupunguza au kuacha kutazama video za ngono, lakini ukashindwa kudumu katika uamuzi huo?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 3,
    sectionCode: 'SEHEMU A',
    sectionTitle: 'UWEZO WA KUJIDHIBITI',
    text: 'Je, wakati mwingine huendelea kutazama video za ngono hata baada ya kutambua kuwa hutaki kuendelea?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 4,
    sectionCode: 'SEHEMU A',
    sectionTitle: 'UWEZO WA KUJIDHIBITI',
    text: 'Je, hutumia muda mwingi zaidi kutazama video za ngono kuliko ulivyokusudia awali?',
    choices: STANDARD_CHOICES,
  },

  // SEHEMU B — HAMU NA MAWAZO
  {
    id: 5,
    sectionCode: 'SEHEMU B',
    sectionTitle: 'HAMU NA MAWAZO',
    text: 'Je, mawazo kuhusu kutazama video za ngono hujitokeza wakati unapokuwa ukifanya shughuli nyingine?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 6,
    sectionCode: 'SEHEMU B',
    sectionTitle: 'HAMU NA MAWAZO',
    text: 'Je, huwa unapata hamu kubwa ya kutazama video za ngono ambayo ni vigumu kuipuuza?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 7,
    sectionCode: 'SEHEMU B',
    sectionTitle: 'HAMU NA MAWAZO',
    text: 'Je, unapokaa muda bila kutazama video za ngono, huwa unajikuta ukifikiria sana kuhusu kuzitazama tena?',
    choices: STANDARD_CHOICES,
  },

  // SEHEMU C — MATUMIZI KAMA NJIA YA KUKABILIANA NA HISIA
  {
    id: 8,
    sectionCode: 'SEHEMU C',
    sectionTitle: 'MATUMIZI KAMA NJIA YA KUKABILIANA NA HISIA',
    text: 'Je, huwa unatafuta video za ngono unapokuwa umechoshwa au huna shughuli ya kufanya?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 9,
    sectionCode: 'SEHEMU C',
    sectionTitle: 'MATUMIZI KAMA NJIA YA KUKABILIANA NA HISIA',
    text: 'Je, huwa unatazama video za ngono unapokuwa na msongo wa mawazo, upweke, huzuni au kukerwa?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 10,
    sectionCode: 'SEHEMU C',
    sectionTitle: 'MATUMIZI KAMA NJIA YA KUKABILIANA NA HISIA',
    text: 'Je, baada ya kutazama video za ngono, huwa unapata nafuu ya muda mfupi kutokana na hisia zisizofurahisha ulizokuwa nazo?',
    choices: STANDARD_CHOICES,
  },

  // SEHEMU D — ATHARI KATIKA MAISHA
  {
    id: 11,
    sectionCode: 'SEHEMU D',
    sectionTitle: 'ATHARI KATIKA MAISHA',
    text: 'Je, kutazama video za ngono kumewahi kukufanya uchelewe au ushindwe kutekeleza jambo muhimu?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 12,
    sectionCode: 'SEHEMU D',
    sectionTitle: 'ATHARI KATIKA MAISHA',
    text: 'Je, matumizi yako ya video za ngono yamewahi kuathiri masomo, kazi, usingizi au uwezo wako wa kufanya shughuli zako kwa ufanisi?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 13,
    sectionCode: 'SEHEMU D',
    sectionTitle: 'ATHARI KATIKA MAISHA',
    text: 'Je, matumizi ya video za ngono yamewahi kuathiri mahusiano yako au namna unavyoshirikiana na watu wengine?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 14,
    sectionCode: 'SEHEMU D',
    sectionTitle: 'ATHARI KATIKA MAISHA',
    text: 'Je, umeendelea kutazama video za ngono licha ya kutambua madhara ambayo tabia hiyo inakusababishia?',
    choices: STANDARD_CHOICES,
  },

  // SEHEMU E — KUONGEZEKA KWA MATUMIZI
  {
    id: 15,
    sectionCode: 'SEHEMU E',
    sectionTitle: 'KUONGEZEKA KWA MATUMIZI',
    text: 'Je, baada ya muda umejikuta ukitazama video za ngono mara nyingi zaidi kuliko ulivyokuwa ukifanya hapo awali?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 16,
    sectionCode: 'SEHEMU E',
    sectionTitle: 'KUONGEZEKA KWA MATUMIZI',
    text: 'Je, umejikuta ukihitaji kutumia muda mrefu zaidi au kutafuta maudhui tofauti ili kupata msisimko uliokuwa ukiupata hapo awali?',
    choices: STANDARD_CHOICES,
  },

  // SEHEMU F — KUACHA NA KURUDIA TABIA
  {
    id: 17,
    sectionCode: 'SEHEMU F',
    sectionTitle: 'KUACHA NA KURUDIA TABIA',
    text: 'Unapojaribu kuacha kutazama video za ngono, je, huwa unapata hali ya kutotulia, kukereka, msongo wa mawazo au usumbufu mwingine?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 18,
    sectionCode: 'SEHEMU F',
    sectionTitle: 'KUACHA NA KURUDIA TABIA',
    text: 'Je, umewahi kujiwekea uamuzi wa kuacha kutazama video za ngono, lakini baadaye ukarudia tena?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 19,
    sectionCode: 'SEHEMU F',
    sectionTitle: 'KUACHA NA KURUDIA TABIA',
    text: 'Je, kuna nyakati ambapo hujirudia kutazama video za ngono baada ya kujiambia kuwa hutazama tena?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 20,
    sectionCode: 'SEHEMU F',
    sectionTitle: 'KUACHA NA KURUDIA TABIA',
    text: 'Je, umewahi kutumia njia mbalimbali za kupunguza au kuacha kutazama video za ngono, lakini tabia hiyo ikaendelea kujirudia?',
    choices: STANDARD_CHOICES,
  },

  // SEHEMU G — TABIA YA KUJICHUA
  {
    id: 21,
    sectionCode: 'SEHEMU G',
    sectionTitle: 'TABIA YA KUJICHUA — MARUDIO',
    text: 'Kwa kawaida, hujichua mara ngapi?',
    choices: Q21_CHOICES,
    note: 'Usichukulie idadi ya kujichua pekee kuwa ushahidi wa tatizo. Marudio yanapaswa kutazamwa pamoja na uwezo wa kujidhibiti, madhara na namna tabia hiyo inavyoathiri maisha ya mtu.',
  },
  {
    id: 22,
    sectionCode: 'SEHEMU G',
    sectionTitle: 'TABIA YA KUJICHUA',
    text: 'Je, umewahi kujaribu kupunguza kujichua, lakini ukashindwa kufikia kiwango ulichojiwekea?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 23,
    sectionCode: 'SEHEMU G',
    sectionTitle: 'TABIA YA KUJICHUA',
    text: 'Je, kujichua kumewahi kukufanya upuuze jambo muhimu ulilopaswa kulifanya?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 24,
    sectionCode: 'SEHEMU G',
    sectionTitle: 'TABIA YA KUJICHUA',
    text: 'Je, huwa unatumia kujichua kama njia ya kukabiliana na kuchoshwa, msongo wa mawazo, upweke au hisia nyingine zisizofurahisha?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 25,
    sectionCode: 'SEHEMU G',
    sectionTitle: 'TABIA YA KUJICHUA',
    text: 'Je, wakati mwingine hujichua bila kuwa na nia ya kufanya hivyo, lakini ukajikuta ukishindwa kuzuia hamu hiyo?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 26,
    sectionCode: 'SEHEMU G',
    sectionTitle: 'TABIA YA KUJICHUA',
    text: 'Je, kujichua kumewahi kuathiri usingizi, masomo, kazi, mahusiano au shughuli zako nyingine za kila siku?',
    choices: STANDARD_CHOICES,
  },
  {
    id: 27,
    sectionCode: 'SEHEMU G',
    sectionTitle: 'TABIA YA KUJICHUA',
    text: 'Je, unahisi kuwa unapoteza uwezo wa kudhibiti muda au mara unazojichua?',
    choices: STANDARD_CHOICES,
  },

  // SEHEMU H — ATHARI YA JUMLA
  {
    id: 28,
    sectionCode: 'SEHEMU H',
    sectionTitle: 'ATHARI YA JUMLA',
    text: 'Katika kipindi cha miezi sita iliyopita, tabia yako ya kutazama video za ngono au kujichua imeathiri maisha yako kwa kiwango gani?',
    choices: Q28_CHOICES,
  },
];

export const AssessmentPage: React.FC<AssessmentPageProps> = ({
  onNavigateHome,
}) => {
  const router = useRouter();
  const [stage, setStage] = useState<'intro' | 'answering' | 'completed_prompt' | 'results'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const currentQ = QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const handleSelectChoice = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: value,
    }));

    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setStage('completed_prompt');
      }
    }, 240);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStage('completed_prompt');
    }
  };

  // Section Score Calculations for Results Dashboard
  const getSectionScores = () => {
    const scoreA = [1, 2, 3, 4].reduce((sum, qId) => sum + (answers[qId] ?? 0), 0);
    const scoreB = [5, 6, 7].reduce((sum, qId) => sum + (answers[qId] ?? 0), 0);
    const scoreC = [8, 9, 10].reduce((sum, qId) => sum + (answers[qId] ?? 0), 0);
    const scoreD = [11, 12, 13, 14].reduce((sum, qId) => sum + (answers[qId] ?? 0), 0);
    const scoreE = [15, 16].reduce((sum, qId) => sum + (answers[qId] ?? 0), 0);
    const scoreF = [17, 18, 19, 20].reduce((sum, qId) => sum + (answers[qId] ?? 0), 0);
    const scoreG = [22, 23, 24, 25, 26, 27].reduce((sum, qId) => sum + (answers[qId] ?? 0), 0);
    const q21Val = answers[21] ?? 0;
    const scoreH = answers[28] ?? 0;

    return {
      scoreA,
      scoreB,
      scoreC,
      scoreD,
      scoreE,
      scoreF,
      scoreG,
      q21Val,
      scoreH,
    };
  };

  const scores = getSectionScores();

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white flex flex-col justify-between selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* 1. Deep Atmospheric Background without harsh box borders */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=90"
          alt="Atmospheric Mountain Horizon"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Soft, rich cinematic gradient glow */}
        <div className="absolute inset-0 bg-slate-950/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/15 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. Top Ultra-Thin Floating Header (No card borders) */}
      <header className="relative z-30 w-full max-w-5xl mx-auto px-6 pt-6">
        <div className="flex items-center justify-between pb-3">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Rudi Nyumbani</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-white drop-shadow">
              FEBROS16
            </span>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-950/50 px-2 py-0.5 rounded-full border border-blue-500/20">
              Personal Reflection
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">100% Faragha</span>
          </div>
        </div>

        {/* Luminous Top Progress Line */}
        {stage === 'answering' && (
          <div className="relative w-full h-[3px] bg-white/10 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 transition-all duration-300 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </header>

      {/* 3. Fluid, Card-Free Main Interaction Zone */}
      <main className="relative z-20 w-full max-w-4xl mx-auto px-6 sm:px-10 py-8 sm:py-14 flex-1 flex flex-col justify-center">

        {/* ================= STAGE 1: INTRO (Clean, Modern, Open Architecture) ================= */}
        {stage === 'intro' && (
          <div className="space-y-10 text-center max-w-2xl mx-auto animate-in fade-in duration-500">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-medium backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Usanidi wa Akaunti & Ustawi wa Kidijitali</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                Tathmini ya Mienendo na Ustawi.
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal text-balance">
                Tafadhali jibu maswali yafuatayo kwa kuzingatia uzoefu wako katika kipindi cha <strong>miezi sita iliyopita</strong>. Hakuna jibu sahihi au lisilo sahihi. Jibu kwa uaminifu ili upate picha iliyo karibu zaidi na hali yako.
              </p>
            </div>

            {/* Seamless, Open Transparency Indicators (No heavy boxes) */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-left">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Faragha Kamili</h4>
                  <p className="text-[11px] text-slate-400">Hakuna kumbukumbu ya umma</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Bila Hukumu</h4>
                  <p className="text-[11px] text-slate-400">Ufahamu halisi wa mienendo</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Maswali 28</h4>
                  <p className="text-[11px] text-slate-400">Dakika 3 hadi 5 pekee</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => setStage('answering')}
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl text-base shadow-2xl shadow-blue-600/40 hover:scale-[1.02] transition-all cursor-pointer inline-flex items-center justify-center gap-3"
              >
                <span>Niko Tayari, Anza Maswali</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STAGE 2: QUESTION SCREEN (Completely Card-Free, Fluid, Breathtaking) ================= */}
        {stage === 'answering' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto w-full">
            {/* Meta indicator: Section and question number */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-300 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                {currentQ.sectionCode} — {currentQ.sectionTitle}
              </span>

              <span className="text-xs font-mono text-slate-400">
                {currentQuestionIndex + 1} <span className="text-slate-600">/</span> {totalQuestions}
              </span>
            </div>

            {/* The Floating Question (Fluid Large Typography) */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug drop-shadow">
                {currentQ.text}
              </h2>

              {currentQ.note && (
                <p className="text-xs sm:text-sm text-amber-300/90 italic leading-relaxed pt-1">
                  * {currentQ.note}
                </p>
              )}
            </div>

            {/* Floating Ergonomic Options (NOT boxy cards, sleek luminous list) */}
            <div className="space-y-2.5 pt-4">
              {currentQ.choices.map((choice) => {
                const isSelected = answers[currentQ.id] === choice.value;
                return (
                  <button
                    key={choice.value}
                    type="button"
                    onClick={() => handleSelectChoice(choice.value)}
                    className={`w-full py-4 px-5 rounded-2xl transition-all duration-200 flex items-center justify-between text-left cursor-pointer group ${
                      isSelected
                        ? 'bg-blue-600/40 border border-blue-400 text-white shadow-lg shadow-blue-500/20 scale-[1.01]'
                        : 'bg-white/[0.06] hover:bg-white/[0.14] border border-white/[0.1] hover:border-white/30 text-slate-200 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-mono font-bold transition-all ${
                          isSelected
                            ? 'bg-blue-500 text-white shadow'
                            : 'bg-white/10 text-slate-400 group-hover:text-white group-hover:bg-white/20'
                        }`}
                      >
                        {choice.key}
                      </span>
                      <span className="text-sm sm:text-base font-semibold">{choice.label}</span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-blue-400 bg-blue-500 text-white'
                          : 'border-white/20 group-hover:border-white/40'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Minimalist Floating Controls */}
            <div className="pt-6 flex items-center justify-between text-xs text-slate-400">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="inline-flex items-center gap-2 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Swali Lililopita</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={answers[currentQ.id] === undefined}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-blue-900/30"
              >
                <span>{currentQuestionIndex === totalQuestions - 1 ? 'Kamilisha' : 'Linalofuata'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STAGE 3: UJUMBE WA MWISHO (Open, Warm, Inspiring) ================= */}
        {stage === 'completed_prompt' && (
          <div className="space-y-8 text-center max-w-2xl mx-auto animate-in zoom-in-95 duration-400">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-300 shadow-2xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow">
                Asante kwa kuwa mkweli.
              </h2>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal text-balance">
                Majibu yako yametusaidia kupata picha ya baadhi ya mienendo yako ya matumizi ya maudhui ya ngono na kujichua. Tathmini hii haikukusudii kukuhukumu wala kukupa utambulisho fulani. Inakusudia kukusaidia kuelewa mienendo yako na maeneo ambayo unaweza kutaka kuyafanyia kazi.
              </p>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={async () => {
                  try {
                    await fetchApi('/api/v1/users/assessment', {
                      method: 'POST',
                      body: JSON.stringify(getSectionScores())
                    });
                  } catch(e) {
                    console.error("Failed to save assessment", e);
                  }
                  setStage('results');
                }}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-2xl text-base shadow-2xl shadow-blue-600/50 hover:scale-[1.02] transition-all cursor-pointer"
              >
                Tazama Matokeo Yangu
              </button>
            </div>
          </div>
        )}

        {/* ================= STAGE 4: RESULTS DASHBOARD (Borderless, Fluid Metrics & Guidance) ================= */}
        {stage === 'results' && (
          <div className="space-y-12 animate-in fade-in duration-500 max-w-4xl mx-auto w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-300">
                  Uchambuzi Binafsi wa Mienendo
                </span>
                <h1 className="mt-1 text-3xl sm:text-4xl font-black text-white">
                  Ripoti Yako ya Ustawi
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-300">
                  Picha halisi ya uwezo wako wa kujidhibiti, athari, na mikakati ya kurejesha utulivu.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStage('answering');
                  setCurrentQuestionIndex(0);
                }}
                className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer self-start"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rudia Maswali</span>
              </button>
            </div>

            {/* Seamless Section Progress Meters (No cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Section A */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Uwezo wa Kujidhibiti (Sehemu A)</span>
                  <span className="font-mono text-blue-300">{scores.scoreA} / 20</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${(scores.scoreA / 20) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {scores.scoreA <= 6
                    ? 'Una uwezo mzuri wa kusimamia maamuzi yako kuhusu kutotazama.'
                    : scores.scoreA <= 12
                    ? 'Kuna nyakati ambapo unajikuta ukishindwa kudumu katika uamuzi ulioweka.'
                    : 'Uwezo wa kudhibiti muda na uamuzi wa kutoangalia unahitaji mikakati ya makusudi.'}
                </p>
              </div>

              {/* Section B */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Hamu na Mawazo (Sehemu B)</span>
                  <span className="font-mono text-indigo-300">{scores.scoreB} / 15</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${(scores.scoreB / 15) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {scores.scoreB <= 4
                    ? 'Hamu na mawazo kuhusu video za ngono hayajitokezi mara kwa mara.'
                    : 'Mawazo au hamu hujitokeza wakati mwingine unapokuwa katika shughuli zako.'}
                </p>
              </div>

              {/* Section C */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Kukabiliana na Hisia (Sehemu C)</span>
                  <span className="font-mono text-emerald-300">{scores.scoreC} / 15</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${(scores.scoreC / 15) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {scores.scoreC <= 4
                    ? 'Hutumii tabia hii kama njia kuu ya kupunguza huzuni au upweke.'
                    : 'Unatumia maudhui ya ngono kama njia ya haraka ya kukabiliana na msongo wa mawazo au kuchoshwa.'}
                </p>
              </div>

              {/* Section D */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Athari Katika Maisha (Sehemu D)</span>
                  <span className="font-mono text-amber-300">{scores.scoreD} / 20</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${(scores.scoreD / 20) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {scores.scoreD <= 5
                    ? 'Haikusababishi kuchelewa majukumu au kuathiri usingizi na masomo.'
                    : 'Imeanza kuwa na athari katika muda wa usingizi, shughuli zako au mahusiano.'}
                </p>
              </div>
            </div>

            {/* Section G: Tabia ya Kujichua & Kujidhibiti */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border-l-2 border-l-blue-400 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Tabia ya Kujichua & Kujidhibiti (Sehemu G)</span>
                <span className="font-mono text-blue-300">
                  Marudio: {Q21_CHOICES[scores.q21Val]?.label || 'Imejibiwa'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {scores.scoreG <= 6
                  ? 'Kiwango cha kujidhibiti na kutokuathiri majukumu yako kiko imara na salama.'
                  : 'Kuna dalili za kutotulia au kupuuza mambo muhimu wakati hamu inapotokea. Kujenga vizingiti vya kimazingira kutasaidia sana.'}
              </p>
            </div>

            {/* Scientific Guidance Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Hatua Zinazopendekezwa za Kuanzia</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] space-y-1">
                  <h4 className="text-xs font-bold text-white">1. Kutambua Vichochezi vya Hisia</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Unapohisi kuchoshwa au msongo wa mawazo, tambua kuwa hiyo ni hisia ya kawaida inayohitaji shughuli mbadala (kama kutembea, mazoezi au kusoma).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] space-y-1">
                  <h4 className="text-xs font-bold text-white">2. Mfumo wa Usingizi na Vifaa</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Epuka kuingia kitandani ukiwa na simu au kompyuta iliyowashwa wakati wa usiku ili kulinda usingizi na utulivu wa akili yako.
                  </p>
                </div>
              </div>
            </div>

            {/* Final Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-sm shadow-xl shadow-blue-900/50 hover:scale-[1.02] transition-all cursor-pointer"
              >
                Endelea kwenye Dashibodi ya FEBROS16
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 4. Minimalist Footer */}
      <footer className="relative z-20 w-full max-w-5xl mx-auto px-6 py-5 text-center text-xs text-slate-500">
        <p>© 2026 FEBROS16 · febros16.com · Tathmini ya Binafsi & Ustawi wa Kidijitali.</p>
      </footer>
    </div>
  );
};

export default AssessmentPage;

"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Award,
  BookOpen,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

interface SignUpPageProps {
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  onNavigateHome,
  onNavigateLogin,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'researcher' | 'student' | 'educator' | 'innovator'>('researcher');
  const [fieldOfInterest, setFieldOfInterest] = useState('Technology & Artificial Intelligence');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [newsletterOptIn, setNewsletterOptIn] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const pwdScore = getPasswordStrength(password);
  const strengthLabels = ['Haifai', 'Dhaifu', 'Wastani', 'Imara', 'Madhabuti Sana'];
  const strengthColors = ['bg-slate-700', 'bg-rose-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-400'];

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Tafadhali weka jina lako kamili.');
      return;
    }
    if (!email || !email.includes('@')) {
      setErrorMsg('Weka barua pepe halali kwa ajili ya kuthibitisha akaunti.');
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Neno la siri linatakiwa kuwa na herufi 8 au zaidi.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Maneno ya siri hayafanani (Password mismatch).');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Lazima ukubaliane na Vigezo na Masharti ya FEBROS16 ili kuendelea.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1400);
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden">
      {/* Dynamic Background Image: Warm Golden Morning Horizon & Ridges */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2560&q=90"
          alt="Golden Morning Mountain Ridges"
          className="w-full h-full object-cover object-center scale-100"
        />
        {/* Warm Amber-Navy Frosted Overlay for distinct vibrant personality */}
        <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/20 to-slate-950/90" />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-semibold text-slate-100 hover:text-white transition-all shadow-md cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Rudi Nyumbani (Home)</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow">
              FEBROS16
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 bg-amber-950/60 border border-amber-500/40 px-2 py-0.5 rounded-full">
              New Scholar
            </span>
          </div>
        </div>
      </header>

      {/* Main SignUp Studio — Panoramic Dual Glass Panel */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex-1 flex items-center justify-center">
        {isSuccess ? (
          <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl backdrop-blur-2xl bg-slate-950/80 border border-white/25 text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 bg-amber-500/20 border border-amber-400/60 rounded-full flex items-center justify-center mx-auto text-amber-300 backdrop-blur-md mb-4 shadow-xl">
              <Sparkles className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-black text-white">Hongera, {fullName}!</h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Akaunti yako ya FEBROS16 imetengenezwa kikamilifu. Tumetuma kiungo cha uthibitisho kwenda <strong>{email}</strong>.
            </p>
            <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-300 text-left space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Nafasi: <strong>{role.toUpperCase()}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Uwanja: <strong>{fieldOfInterest}</strong></span>
              </div>
            </div>
            <button
              type="button"
              onClick={onNavigateHome}
              className="mt-6 w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-sm shadow-xl transition-all cursor-pointer"
            >
              Fungua Ukurasa Mkuu
            </button>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            
            {/* Left Column: Benefits & Community Highlights (Distinct golden glass aesthetic) */}
            <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-8 sm:p-10 rounded-3xl backdrop-blur-2xl bg-slate-950/45 border border-white/20 shadow-2xl shadow-black/60 relative overflow-hidden">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold backdrop-blur-md">
                  <Award className="w-4 h-4" />
                  <span>Kujiunga Bila Malipo · Open Access</span>
                </div>

                <div>
                  <h2 className="text-3xl font-black text-white leading-tight">
                    Jiunge na Jamii ya Watafiti na Wanafunzi 15,000+.
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Fungua mlango wa maktaba ya kimataifa, vyanzo vya msingi vilivyothibitishwa, na nafasi za ufadhili wa miradi ya kisayansi.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300 shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Vyanzo Huria vya Msingi</h4>
                      <p className="text-[11px] text-slate-300">Nukuu kamili na machapisho ya kitaaluma bila vizuizi vya fedha.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Ruzuku na Fursa za Masomo</h4>
                      <p className="text-[11px] text-slate-300">Pata taarifa za kwanza za ufadhili wa kimataifa unaolingana na fani yako.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Daftari la Kidijitali</h4>
                      <p className="text-[11px] text-slate-300">Hifadhi na panga nukuu zako kwa usalama wa kiwango cha juu.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Mtandao: Global Nodes</span>
                <span className="text-amber-300 font-semibold">100% Peer Verified</span>
              </div>
            </div>

            {/* Right Column: Complete High-Fidelity Registration Form */}
            <div className="lg:col-span-7 backdrop-blur-2xl bg-slate-950/70 border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80 flex flex-col justify-center relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-amber-400/40 before:to-transparent">
              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  FEBROS16 Registration
                </span>
                <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
                  Fungua Akaunti Yako
                </h1>
                <p className="mt-1 text-xs text-slate-300">
                  Jaza taarifa zako hapa chini kuanza safari yako ya maarifa na utafiti.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-5 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSignUp} className="space-y-4">
                {/* 1. Name & Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Jina Kamili *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Mfano: Prof. Asha Bakari"
                        className="w-full bg-slate-900/80 border border-white/20 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 backdrop-blur-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Barua Pepe ya Kitaaluma/Kazi *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="asha@chuo.edu au gmail"
                        className="w-full bg-slate-900/80 border border-white/20 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 backdrop-blur-md"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Role Selector (Student, Researcher, Educator, Innovator) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Unajiunga Kama Nani? (Wadhifa)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'researcher', label: 'Mtafiti' },
                      { id: 'student', label: 'Mwanafunzi' },
                      { id: 'educator', label: 'Mwalimu' },
                      { id: 'innovator', label: 'Mbunifu' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setRole(item.id as any)}
                        className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all text-center cursor-pointer ${
                          role === item.id
                            ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-md'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Field of Interest */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Sehemu Unayopenda Zaidi (Field of Interest)
                  </label>
                  <select
                    value={fieldOfInterest}
                    onChange={(e) => setFieldOfInterest(e.target.value)}
                    className="w-full bg-slate-900/80 border border-white/20 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 backdrop-blur-md cursor-pointer"
                  >
                    <option value="Technology & Artificial Intelligence" className="bg-slate-900 text-white">Teknolojia na Akili Mnemba (AI)</option>
                    <option value="Environmental & Climate Science" className="bg-slate-900 text-white">Sayansi ya Mazingira na Tabianchi</option>
                    <option value="Public Education Systems" className="bg-slate-900 text-white">Mifumo ya Elimu na Mitaala</option>
                    <option value="Biomedical & Health Research" className="bg-slate-900 text-white">Utafiti wa Afya na Biolojia</option>
                    <option value="Economics & Public Governance" className="bg-slate-900 text-white">Uchumi, Jamii na Uongozi</option>
                  </select>
                </div>

                {/* 4. Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-200">
                        Neno la Siri (Password) *
                      </label>
                      {password && (
                        <span className="text-[10px] font-mono text-amber-300">
                          {strengthLabels[pwdScore]}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Herufi 8+, namba, alama"
                        className="w-full bg-slate-900/80 border border-white/20 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 backdrop-blur-md"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Dynamic Password Strength Bar */}
                    {password && (
                      <div className="mt-2 flex gap-1 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                        {[1, 2, 3, 4].map((step) => (
                          <div
                            key={step}
                            className={`flex-1 transition-all duration-300 ${
                              pwdScore >= step ? strengthColors[pwdScore] : 'bg-slate-800'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Thibitisha Neno la Siri *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Rudia neno la siri"
                        className="w-full bg-slate-900/80 border border-white/20 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 backdrop-blur-md"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Terms & Dispatch Checkboxes */}
                <div className="space-y-2 pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      required
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-400"
                    />
                    <span>
                      Ninakubali{' '}
                      <span className="text-amber-300 font-semibold underline">
                        Vigezo na Masharti ya FEBROS16
                      </span>{' '}
                      na Sera ya Faragha ya Takwimu za Utafiti.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={newsletterOptIn}
                      onChange={(e) => setNewsletterOptIn(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-400"
                    />
                    <span>
                      Nitumie toleo la kila wiki la <strong>Febros16 Dispatch</strong> (Tafiti mpya na Fursa za Ufadhili).
                    </span>
                  </label>
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 py-3.5 px-4 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-xl text-sm shadow-xl shadow-amber-900/50 border border-amber-300/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                      <span>Inatengeneza Akaunti...</span>
                    </>
                  ) : (
                    <>
                      <span>Kamilisha Usajili (Create Account)</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Switch to Login */}
              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <p className="text-xs text-slate-300">
                  Tayari una akaunti ya FEBROS16?{' '}
                  <button
                    type="button"
                    onClick={onNavigateLogin}
                    className="text-amber-300 hover:text-amber-200 font-bold underline cursor-pointer ml-1"
                  >
                    Ingia Hapa (Log In)
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 py-5 text-center text-xs text-slate-400">
        <p>© 2026 FEBROS16 · febros16.com · Haki zote zimehifadhiwa.</p>
      </footer>
    </div>
  );
};

export default SignUpPage;

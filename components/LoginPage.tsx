"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  KeyRound,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface LoginPageProps {
  onNavigateHome: () => void;
  onNavigateSignup: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigateHome,
  onNavigateSignup,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const router = useRouter();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Tafadhali weka barua pepe (email) iliyo sahihi.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Neno la siri linatakiwa kuwa na herufi zisizopungua 6.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchApi('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (data.data?.token) {
        localStorage.setItem('token', data.data.token);
      }
      
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Kuna tatizo, tafadhali jaribu tena.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail || !resetEmail.includes('@')) {
      setErrorMsg('Weka barua pepe sahihi kwa ajili ya kupokea maelekezo ya kurejesha neno la siri.');
      return;
    }
    setResetSuccess(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white flex flex-col justify-between selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Dynamic Background Image: Atmospheric Night Alpine Mist */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2560&q=90"
          alt="Starry Alpine Night Background"
          className="w-full h-full object-cover object-center scale-100"
        />
        {/* Deep Slate Glass Overlay with subtle blue ambient light */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/90 via-slate-950/40 to-slate-950/80" />
      </div>

      {/* Top Bar with Home Navigation */}
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

          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow">
              FEBROS16
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full">
              Secure Auth
            </span>
          </div>
        </div>
      </header>

      {/* Main Login Workspace — Asymmetric Split Glass Grid */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16 flex-1 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Security Credentials & Quote Card (Distinct Identity) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-8 sm:p-10 rounded-3xl backdrop-blur-2xl bg-slate-950/50 border border-white/15 shadow-2xl shadow-black/60 relative overflow-hidden">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 backdrop-blur-md shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-300">
                  FEBROS16 Security Vault
                </span>
                <h2 className="mt-2 text-2xl font-extrabold text-white leading-snug">
                  Mazingira Salama ya Utafiti na Maarifa.
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Akaunti yako ya FEBROS16 inakulinda kwa usimbuaji thabiti (*end-to-end encrypted session*) kuweka taarifa zako za utafiti, nukuu, na machapisho katika usalama wa asilimia 100.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ufikiaji wa haraka kwenye miradi yako yote</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Uchambuzi wa vyanzo vya msingi vilivyothibitishwa</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Nyenzo za kitaaluma zilizohifadhiwa binafsi</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
              <span>febros16.com · Portal 2026</span>
              <span className="text-emerald-400 font-mono">TLS 1.3 Active</span>
            </div>
          </div>

          {/* Right Column: The Login Form Glass Card */}
          <div className="lg:col-span-7 backdrop-blur-2xl bg-slate-950/65 border border-white/20 rounded-3xl p-7 sm:p-10 shadow-2xl shadow-black/70 flex flex-col justify-center relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent">
            {isSuccess ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-400/50 rounded-full flex items-center justify-center mx-auto text-emerald-300 backdrop-blur-md shadow-xl">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-white">Karibu Tena kwenye FEBROS16!</h3>
                <p className="text-sm text-slate-300 max-w-sm mx-auto">
                  Uthibitishaji umekamilika. Unapelekwa kwenye dashibodi yako ya utafiti sasa hivi...
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={onNavigateHome}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg"
                  >
                    Rudi kwenye Ukurasa Mkuu
                  </button>
                </div>
              </div>
            ) : showForgotPassword ? (
              <div className="space-y-5 animate-in fade-in">
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setResetSuccess(false);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white mb-3"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Rudi kwenye Kuingia</span>
                  </button>
                  <h3 className="text-2xl font-bold text-white">Umesahau Neno la Siri?</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Weka barua pepe yako hapa chini, tutakutumia kiungo maalum cha kurejesha neno lako la siri mara moja.
                  </p>
                </div>

                {resetSuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200 space-y-2">
                    <p className="font-semibold">Barua pepe imetumwa!</p>
                    <p>Fungua kikasha cha barua pepe yako ya <strong>{resetEmail}</strong> na ufuate maelekezo yaliyotumwa.</p>
                  </div>
                ) : (
                  <form onSubmit={handlePasswordReset} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-200 mb-1.5">
                        Barua Pepe (Email)
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          placeholder="wako@chuo.edu au wako@gmail.com"
                          className="w-full bg-slate-900/80 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-900/50 cursor-pointer"
                    >
                      Tuma Kiungo cha Kurejesha
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div>
                {/* Form Title */}
                <div className="mb-6">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Ingia Kwenye Akaunti
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm text-slate-300">
                    Weka taarifa zako za FEBROS16 ili kuendelea na utafiti wako.
                  </p>
                </div>

                {/* Error Banner if any */}
                {errorMsg && (
                  <div className="mb-5 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Fast Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('mtafiti@gmail.com');
                      setPassword('Mfano1234@!');
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer backdrop-blur-md"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.4 0 10.6 0 13s.6 4.6 1.6 6.6l3.7-2.9z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16c1.9 3.8 5.8 7 10.4 7z"
                      />
                    </svg>
                    <span>Google Sign In</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEmail('academic@github.org');
                      setPassword('AcademicGit2026!');
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer backdrop-blur-md"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub / ORCID</span>
                  </button>
                </div>

                <div className="relative flex items-center justify-center mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <span className="relative z-10 px-3 bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                    au endelea na barua pepe
                  </span>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Barua Pepe au Kitambulisho cha Mtafiti
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="mtafiti@chuo.edu au barua@gmail.com"
                        className="w-full bg-slate-900/80 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-md"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-200">
                        Neno la Siri (Password)
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-xs text-blue-300 hover:text-blue-200 hover:underline cursor-pointer"
                      >
                        Umesahau neno la siri?
                      </button>
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-900/80 border border-white/20 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-md"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 cursor-pointer"
                        aria-label={showPassword ? 'Ficha neno la siri' : 'Onyesha neno la siri'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-950"
                      />
                      <span>Nikumbuke kwenye kifaa hiki (kwa siku 30)</span>
                    </label>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-3 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-sm shadow-xl shadow-blue-900/60 border border-blue-400/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Inathibitisha...</span>
                      </>
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4" />
                        <span>Ingia Kwenye Akaunti (Sign In)</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Switch to Signup */}
                <div className="mt-8 pt-5 border-t border-white/10 text-center">
                  <p className="text-xs text-slate-300">
                    Huna akaunti ya FEBROS16 bado?{' '}
                    <button
                      type="button"
                      onClick={onNavigateSignup}
                      className="text-blue-300 hover:text-blue-200 font-bold underline cursor-pointer ml-1"
                    >
                      Fungua Akaunti Mpya (Sign Up)
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 py-5 text-center text-xs text-slate-400">
        <p>© 2026 FEBROS16 · febros16.com · Haki zote zimehifadhiwa.</p>
      </footer>
    </div>
  );
};

export default LoginPage;

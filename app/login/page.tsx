"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://febros16-backend.onrender.com';

    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Nenosiri au email si sahihi.');
      }

      // Hifadhi Token kwenye localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Mpeleke mtumiaji kwenye dashboard au ukurasa wa ndani baada ya kuingia
      router.push('/dashboard'); // Badilisha kama huna '/dashboard' kwa sasa

    } catch (err: any) {
      setError(err.message || 'Kuna tatizo la mtandao, tafadhali jaribu tena.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden text-slate-200 font-sans">
      
      {/* Miale ya mwanga (Glow Effects) kwa nyuma */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl p-8 relative z-10 backdrop-blur-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-extrabold tracking-tighter text-white inline-block mb-2">
            FEBROS<span className="text-blue-500">16</span>
          </Link>
          <h1 className="text-xl font-semibold text-slate-300">Karibu Tena</h1>
          <p className="text-sm text-slate-500 mt-2">Ingia kwenye akaunti yako kuendelea</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-800 text-red-300 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Barua Pepe (Email)</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mfano@email.com"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-slate-600"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-slate-400">Nenosiri (Password)</label>
              <Link href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Umesahau Nenosiri?
              </Link>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-slate-600"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] mt-4"
          >
            {loading ? 'Inaingia...' : 'Ingia'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Huna akaunti?{' '}
          <Link href="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
            Jiunge hapa
          </Link>
        </div>
      </div>
    </main>
  );
}

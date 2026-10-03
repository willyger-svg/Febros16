"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';

export default function PublicResearchFeed() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if logged in for navbar rendering
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const loadProjects = async () => {
      try {
        const data = await fetchApi('/api/v1/research');
        if (data.data?.projects) {
          setProjects(data.data.projects);
        }
      } catch (err: any) {
        setError('Imeshindwa kuvuta miradi ya utafiti. Tafadhali jaribu tena.');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Navbar Mchongo */}
      <nav className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white">
            FEBROS<span className="text-indigo-500">16</span>
          </Link>
          <div className="flex gap-4 items-center">
            <Link 
              href="/articles" 
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Makala
            </Link>
            <Link 
              href="/research" 
              className="text-sm text-white font-semibold transition-colors hidden sm:block"
            >
              Utafiti
            </Link>
            <Link 
              href="/campaigns/oo24" 
              className="text-sm text-slate-300 hover:text-white transition-colors hidden sm:block"
            >
              Kampeni
            </Link>
            <span className="text-slate-700 hidden sm:block">|</span>
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link 
                  href="/dashboard" 
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm px-4 py-2 rounded-lg transition-colors border border-slate-700"
                >
                  Ondoka
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/login" 
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Ingia
                </Link>
                <Link 
                  href="/register" 
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  Tengeneza Akaunti
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Miradi ya Utafiti</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Gundua tafiti mbalimbali zinazofanywa na wanachama wa FEBROS16
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border border-red-800 text-red-300 p-6 rounded-xl max-w-md mx-auto text-center">
            {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <div className="text-6xl mb-4">🔬</div>
            <p className="text-xl">Hakuna miradi ya utafiti iliyochapishwa kwa sasa.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <article key={p.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/50 transition-all hover:border-indigo-500/30 group flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2 py-1 text-xs rounded-full border ${
                    p.status === 'completed' || p.status === 'published'
                      ? 'bg-green-900/20 text-green-400 border-green-800/50' 
                      : 'bg-indigo-900/20 text-indigo-400 border-indigo-800/50'
                  }`}>
                    {p.status}
                  </span>
                  <span className="text-xs text-slate-500">
                    {new Date(p.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {p.title}
                </h2>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-4">
                  {p.abstract || 'Hakuna muhtasari (abstract) uliowekwa kwa mradi huu.'}
                </p>
                
                <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-500">FEBROS16 Research</span>
                  <button className="text-indigo-400 text-sm font-medium hover:text-indigo-300">
                    Soma zaidi →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import Link from 'next/link';

export default function NewResearchProject() {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [rememberChoice, setRememberChoice] = useState(false);
  const router = useRouter();

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const slug = generateSlug(title);
      await fetchApi('/api/v1/research', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          slug: slug,
          abstract: abstract,
          content_body: content,
        }),
      });

      setTitle('');
      setAbstract('');
      setContent('');
      
      const pref = localStorage.getItem('researchPostRedirectPref');
      if (pref === 'redirect') {
        router.push('/research');
      } else if (pref === 'stay') {
        setSuccess('Mradi umesajiliwa kikamilifu!');
      } else {
        setShowModal(true);
      }
      
    } catch (err: any) {
      setError(err.message || 'Kuna tatizo la mtandao. Tafadhali jaribu tena.');
    } finally {
      setLoading(false);
    }
  };

  const handleModalChoice = (choice: 'redirect' | 'stay') => {
    if (rememberChoice) {
      localStorage.setItem('researchPostRedirectPref', choice);
    }
    setShowModal(false);
    
    if (choice === 'redirect') {
      router.push('/research');
    } else {
      setSuccess('Mradi umesajiliwa kikamilifu!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 sm:p-8 relative">
      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              ✓
            </div>
            <h2 className="text-xl font-bold text-white text-center mb-2">Mradi Umesajiliwa!</h2>
            <p className="text-slate-300 text-center text-sm mb-6">
              Mradi wako umesajiliwa kikamilifu! Je, unataka kwenda kuuona sasa, au unataka kubaki hapa usajili mwingine?
            </p>
            
            <label className="flex items-center gap-3 mb-6 p-3 bg-slate-950/50 rounded-lg cursor-pointer border border-slate-800 hover:border-slate-700 transition-colors">
              <input 
                type="checkbox" 
                checked={rememberChoice}
                onChange={(e) => setRememberChoice(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-800 border-slate-600 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900"
              />
              <span className="text-sm text-slate-300 select-none">Kumbuka chaguo langu (Usiniulize tena)</span>
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => handleModalChoice('stay')}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-medium py-2.5 rounded-xl transition-colors border border-slate-700"
              >
                Baki hapa
              </button>
              <button 
                onClick={() => handleModalChoice('redirect')}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
              >
                Nenda nikauone
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Sajili Mradi Mpya</h1>
            <p className="text-slate-400 mt-1 text-sm">Shiriki utafiti wako kwenye FEBROS16</p>
          </div>
          <Link 
            href="/dashboard" 
            className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition-colors border border-slate-700"
          >
            Rudi Dashboard
          </Link>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-sm p-6 sm:p-8 relative">
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-800 text-red-300 text-sm rounded-xl text-center font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-900/30 border border-green-800 text-green-300 text-sm rounded-xl text-center font-medium">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Kichwa cha Mradi (Title)
              </label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Mfano: Utafiti wa AI kwenye Kilimo..."
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-600 font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Muhtasari (Abstract)
              </label>
              <textarea 
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                placeholder="Andika ufupi wa utafiti wako (Abstract)..."
                required
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-600 font-sans leading-relaxed resize-y"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Maelezo Kamili (Content)
              </label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Andika maelezo kamili ya mradi hapa..."
                required
                rows={8}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-600 font-sans leading-relaxed resize-y"
              ></textarea>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-4">
              <Link 
                href="/dashboard"
                className="text-slate-400 hover:text-white font-medium transition-colors"
              >
                Ghairi
              </Link>
              <button 
                type="submit"
                disabled={loading || !title.trim() || !abstract.trim() || !content.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_25px_rgba(79,70,229,0.4)]"
              >
                {loading ? 'Inasajili...' : 'Sajili Mradi'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

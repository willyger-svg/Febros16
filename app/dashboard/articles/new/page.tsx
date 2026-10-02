"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import Link from 'next/link';

export default function NewArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [rememberChoice, setRememberChoice] = useState(false);
  const router = useRouter();

  // Simple slug generator
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
      await fetchApi('/api/v1/articles', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          slug: slug,
          content_body: content,
          category_id: null 
        }),
      });

      setTitle('');
      setContent('');
      
      const pref = localStorage.getItem('postRedirectPreference');
      if (pref === 'redirect') {
        router.push('/articles');
      } else if (pref === 'stay') {
        setSuccess('Makala imechapishwa kikamilifu!');
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
      localStorage.setItem('postRedirectPreference', choice);
    }
    setShowModal(false);
    
    if (choice === 'redirect') {
      router.push('/articles');
    } else {
      setSuccess('Makala imechapishwa kikamilifu!');
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
            <h2 className="text-xl font-bold text-white text-center mb-2">Makala Imechapishwa!</h2>
            <p className="text-slate-300 text-center text-sm mb-6">
              Makala yako imechapishwa kikamilifu! Je, unataka kwenda kuiona sasa, au unataka kubaki hapa uandike nyingine?
            </p>
            
            <label className="flex items-center gap-3 mb-6 p-3 bg-slate-950/50 rounded-lg cursor-pointer border border-slate-800 hover:border-slate-700 transition-colors">
              <input 
                type="checkbox" 
                checked={rememberChoice}
                onChange={(e) => setRememberChoice(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-800 border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900"
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
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition-colors shadow-lg shadow-blue-500/20"
              >
                Nenda nikaione
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Andika Makala Mpya</h1>
            <p className="text-slate-400 mt-1 text-sm">Shiriki maarifa mapya kwenye FEBROS16</p>
          </div>
          <Link 
            href="/dashboard" 
            className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition-colors border border-slate-700"
          >
            Rudi Dashboard
          </Link>
        </div>

        {/* Form Container */}
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
                Kichwa cha Makala (Title)
              </label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Mfano: Jinsi AI Inavyobadilisha Teknolojia..."
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600 font-medium"
              />
              <p className="text-xs text-slate-500 mt-2">
                Slug (URL) itatengenezwa moja kwa moja: <span className="text-blue-400 italic">{generateSlug(title) || '...'}</span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Yaliyomo (Content)
              </label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Andika makala yako hapa... (HTML au Markdown itakubaliwa baadaye)"
                required
                rows={12}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600 font-sans leading-relaxed resize-y"
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
                disabled={loading || !title.trim() || !content.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]"
              >
                {loading ? 'Inachapisha...' : 'Chapisha Makala'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

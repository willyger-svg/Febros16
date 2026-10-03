"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import Link from 'next/link';

export default function EditResearchProject() {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await fetchApi(`/api/v1/research/${id}`);
        if (data.data?.project) {
          setTitle(data.data.project.title);
          setAbstract(data.data.project.abstract || '');
          setContent(data.data.project.content_body);
        }
      } catch (err: any) {
        setError(err.message || 'Imeshindwa kupata mradi huu.');
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      loadProject();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const slug = generateSlug(title);
      await fetchApi(`/api/v1/research/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: title,
          slug: slug,
          abstract: abstract,
          content_body: content,
        }),
      });

      setSuccess('Mradi umerekebishwa kikamilifu!');
      setTimeout(() => {
        router.push('/dashboard/research/manage');
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || 'Kuna tatizo la mtandao. Tafadhali jaribu tena.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 sm:p-8 relative">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Rekebisha Mradi</h1>
            <p className="text-slate-400 mt-1 text-sm">Hariri maelezo ya utafiti wako</p>
          </div>
          <Link 
            href="/dashboard/research/manage" 
            className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition-colors border border-slate-700"
          >
            Rudi Nyuma
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
                placeholder="Mfano: Utafiti wa AI..."
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
                placeholder="Andika ufupi wa utafiti wako..."
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
                href="/dashboard/research/manage"
                className="text-slate-400 hover:text-white font-medium transition-colors"
              >
                Ghairi
              </Link>
              <button 
                type="submit"
                disabled={loading || !title.trim() || !abstract.trim() || !content.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_25px_rgba(79,70,229,0.4)]"
              >
                {loading ? 'Inahifadhi...' : 'Hifadhi Mabadiliko'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

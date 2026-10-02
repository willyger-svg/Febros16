"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getApiUrl } from '@/lib/api';

// Interface matching the backend response
interface Article {
  id: string;
  title: string;
  slug: string;
  content_body: string;
  author_id: string | null;
  category_id: string | null;
  status: string;
  created_at: string;
}

export default function ArticlesFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check auth status
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }

    const fetchArticles = async () => {
      try {
        // Fetch direct since it's a public API (no token required)
        const response = await fetch(`${getApiUrl()}/api/v1/articles`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || 'Imeshindwa kuvuta makala');
        }

        if (data.data?.articles) {
          setArticles(data.data.articles);
        }
      } catch (err: any) {
        setError(err.message || 'Kuna tatizo la mtandao, jaribu tena baadaye.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      
      {/* Navbar Mchongo */}
      <nav className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white">
            FEBROS<span className="text-blue-500">16</span>
          </Link>
          <div className="flex gap-4 items-center">
            {isLoggedIn ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-4 py-2 rounded-lg transition-colors border border-slate-700"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    import('@/lib/api').then(({ logout }) => logout());
                  }}
                  className="text-sm text-red-400 hover:text-red-300 font-medium px-2 hidden sm:block"
                >
                  Ondoka
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-sm text-slate-300 hover:text-white transition-colors hidden sm:block"
                >
                  Ingia
                </Link>
                <Link 
                  href="/register" 
                  className="text-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Jiunge
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Gundua <span className="text-blue-500">Maarifa</span> Mapya
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Soma makala na tafiti za hivi punde zinazochapishwa na wanajumuiya wa FEBROS16.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-800 text-red-400 p-6 rounded-2xl text-center max-w-lg mx-auto">
            {error}
          </div>
        ) : articles.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 p-12 rounded-3xl text-center">
            <span className="text-5xl mb-4 block">📝</span>
            <h3 className="text-xl font-bold text-white mb-2">Hakuna Makala Bado</h3>
            <p className="text-slate-400">Kuwa wa kwanza kuchapisha makala kwenye jukwaa hili!</p>
            <Link 
              href="/dashboard/articles/new"
              className="inline-block mt-6 text-blue-400 hover:text-blue-300 font-medium"
            >
              Anza kuandika sasa &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div 
                key={article.id} 
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex flex-col h-full group cursor-pointer"
              >
                <div className="mb-4 flex-1">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-500 mb-3">
                    <span className="bg-blue-500/10 px-2 py-1 rounded">
                      {article.status === 'published' ? 'Imechapishwa' : 'Rasimu'}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {article.content_body}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500 mt-auto">
                  <span>
                    {new Date(article.created_at).toLocaleDateString('sw-TZ', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="bg-slate-800 px-2 py-1 rounded">
                    Mwandishi: {article.author_id ? 'Anayejulikana' : 'Asiyejulikana'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi, logout } from '@/lib/api';
import Link from 'next/link';

export default function ManageArticles() {
  const [myArticles, setMyArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchApi('/api/v1/users/me');
        if (data.data?.user) {
          const articlesData = await fetchApi(`/api/v1/articles?author_id=${data.data.user.id}`);
          if (articlesData.data?.articles) {
            setMyArticles(articlesData.data.articles);
          }
        }
      } catch (err: any) {
        setError(err.message || 'Imeshindwa kupata makala.');
        if (err.message.toLowerCase().includes('unauthorized') || err.message.toLowerCase().includes('token')) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const handleDeleteArticle = async (id: string, title: string) => {
    if (!confirm(`Una uhakika unataka kufuta makala hii?\n\n"${title}"\n\nHatua hii haiwezi kurejeshwa.`)) {
      return;
    }
    
    try {
      await fetchApi(`/api/v1/articles/${id}`, {
        method: 'DELETE',
      });
      setMyArticles(prev => prev.filter(article => article.id !== id));
      alert('Makala imefutwa kikamilifu.');
    } catch (err: any) {
      alert(err.message || 'Imeshindwa kufuta makala.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4">
        <div className="bg-red-900/30 border border-red-800 text-red-300 p-6 rounded-xl max-w-md text-center">
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Rudi Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 sm:p-8 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Dhibiti Makala Zako</h1>
            <p className="text-slate-400 mt-1 text-sm">Futa au rekebisha makala ulizoandika</p>
          </div>
          <Link 
            href="/dashboard" 
            className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition-colors border border-slate-700"
          >
            Rudi Dashboard
          </Link>
        </div>

        {/* My Articles List */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden">
          
          {myArticles.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <div className="text-4xl mb-4">📄</div>
              <p className="text-lg mb-4">Bado hujaandika makala yoyote.</p>
              <Link 
                href="/dashboard/articles/new"
                className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-xl transition-all"
              >
                Andika Makala Mpya sasa
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 text-sm border-b border-slate-800">
                    <th className="p-4 font-medium">Kichwa cha Habari</th>
                    <th className="p-4 font-medium hidden sm:table-cell">Hali</th>
                    <th className="p-4 font-medium hidden sm:table-cell">Tarehe</th>
                    <th className="p-4 font-medium text-right">Vitendo</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {myArticles.map((article) => (
                    <tr key={article.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                      <td className="p-4">
                        <p className="font-semibold text-slate-200 line-clamp-1">{article.title}</p>
                        <span className="sm:hidden text-xs text-slate-500 mt-1 block">
                          {new Date(article.created_at).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <span className={`px-2 py-1 text-xs rounded-full border ${
                          article.status === 'published' 
                            ? 'bg-green-900/20 text-green-400 border-green-800/50' 
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          {article.status}
                        </span>
                      </td>
                      <td className="p-4 hidden sm:table-cell text-slate-400">
                        {new Date(article.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <Link 
                          href={`/dashboard/articles/${article.id}/edit`}
                          className="inline-block px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
                        >
                          Badili
                        </Link>
                        <button 
                          onClick={() => handleDeleteArticle(article.id, article.title)}
                          className="inline-block px-3 py-1 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded border border-red-800/30 transition-colors"
                        >
                          Futa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

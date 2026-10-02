"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi, logout } from '@/lib/api';
import Link from 'next/link';

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  bio: string;
  profile_picture_url: string;
  created_at: string;
}

interface UserStats {
  total_articles: number;
  total_research_projects: number;
}

export default function Dashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [myArticles, setMyArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchApi('/api/v1/users/me');
        if (data.data?.user) {
          setUser(data.data.user);
          // Baada ya kupata user ID, vuta makala zake tu
          const articlesData = await fetchApi(`/api/v1/articles?author_id=${data.data.user.id}`);
          if (articlesData.data?.articles) {
            setMyArticles(articlesData.data.articles);
          }
        }
        if (data.data?.stats) {
          setUserStats(data.data.stats);
        }
      } catch (err: any) {
        setError(err.message || 'Imeshindwa kupata taarifa.');
        if (err.message.toLowerCase().includes('unauthorized') || err.message.toLowerCase().includes('token')) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleDeleteArticle = async (id: string, title: string) => {
    if (!confirm(`Una uhakika unataka kufuta makala hii?\n\n"${title}"\n\nHatua hii haiwezi kurejeshwa.`)) {
      return;
    }
    
    try {
      await fetchApi(`/api/v1/articles/${id}`, {
        method: 'DELETE',
      });
      // Update UI after delete
      setMyArticles(prev => prev.filter(article => article.id !== id));
      setUserStats(prev => prev ? { ...prev, total_articles: prev.total_articles - 1 } : null);
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
            onClick={() => router.push('/login')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Rudi Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Navbar Mchongo */}
      <nav className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-extrabold tracking-tighter text-white">
            FEBROS<span className="text-blue-500">16</span>
          </Link>
          <div className="flex gap-4 items-center">
            <Link 
              href="/articles" 
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Makala Zote
            </Link>
            <span className="text-sm text-slate-400 hidden sm:block border-l border-slate-700 pl-4">
              Karibu, {user?.full_name}
            </span>
            <button 
              onClick={logout}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm px-4 py-2 rounded-lg transition-colors border border-slate-700 ml-2"
            >
              Ondoka
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Profile Card */}
          <div className="md:col-span-1 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm h-fit">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-slate-800 rounded-full mb-4 border-2 border-blue-500/50 flex items-center justify-center text-3xl overflow-hidden">
                {user?.profile_picture_url ? (
                  <img src={user.profile_picture_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span>👤</span>
                )}
              </div>
              <h2 className="text-xl font-bold text-white">{user?.full_name}</h2>
              <p className="text-blue-400 text-sm mt-1">{user?.email}</p>
              
              <div className="mt-4 inline-block bg-blue-900/30 border border-blue-800 text-blue-300 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                Role: {user?.role}
              </div>

              <div className="w-full mt-6 pt-6 border-t border-slate-800 text-left">
                <h3 className="text-sm font-semibold text-slate-400 mb-2">Kuhusu (Bio)</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {user?.bio || 'Bado hujaweka maelezo yako.'}
                </p>
              </div>
              
              <div className="w-full mt-4 pt-4 border-t border-slate-800 text-left">
                <p className="text-xs text-slate-500">
                  Mwanachama tangu: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Activity/Content Area */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Call to Action - Phase 3 */}
            <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-800/50 rounded-2xl p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Andika Makala Yako</h2>
                <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                  Changia maarifa kwenye jukwaa la FEBROS16. Andika makala mpya, tafiti, au habari za teknolojia ukiwafikia wasomaji wetu.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link 
                  href="/dashboard/articles/new"
                  className="text-center whitespace-nowrap bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
                >
                  + Andika Makala Mpya
                </Link>
                <Link 
                  href="/articles"
                  className="text-center whitespace-nowrap bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  Tazama Makala Zote
                </Link>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-4">Muhtasari wa Shughuli Zako</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h3 className="text-slate-400 text-sm font-medium">Makala Ulizoandika</h3>
                  <p className="text-3xl font-bold text-white mt-2">{userStats ? userStats.total_articles : 0}</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h3 className="text-slate-400 text-sm font-medium">Miradi ya Utafiti</h3>
                  <p className="text-3xl font-bold text-white mt-2">{userStats ? userStats.total_research_projects : 0}</p>
                </div>
              </div>
            </div>

            {/* My Articles List */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden">
              <div className="p-6 border-b border-slate-800">
                <h2 className="text-xl font-bold text-white">Makala Zangu</h2>
              </div>
              
              {myArticles.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <p>Bado hujaandika makala yoyote.</p>
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
      </main>
    </div>
  );
}

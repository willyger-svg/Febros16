"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi, logout } from '@/lib/api';
import Link from 'next/link';

export default function ManageResearch() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchApi('/api/v1/users/me');
        if (data.data?.user) {
          const projectsData = await fetchApi(`/api/v1/research?author_id=${data.data.user.id}`);
          if (projectsData.data?.projects) {
            setProjects(projectsData.data.projects);
          }
        }
      } catch (err: any) {
        setError(err.message || 'Imeshindwa kupata miradi.');
        if (err.message.toLowerCase().includes('unauthorized') || err.message.toLowerCase().includes('token')) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Una uhakika unataka kufuta mradi huu?\n\n"${title}"\n\nHatua hii haiwezi kurejeshwa.`)) {
      return;
    }
    
    try {
      await fetchApi(`/api/v1/research/${id}`, {
        method: 'DELETE',
      });
      setProjects(prev => prev.filter(p => p.id !== id));
      alert('Mradi umefutwa kikamilifu.');
    } catch (err: any) {
      alert(err.message || 'Imeshindwa kufuta mradi.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Dhibiti Miradi</h1>
            <p className="text-slate-400 mt-1 text-sm">Futa au rekebisha miradi yako ya utafiti</p>
          </div>
          <Link 
            href="/dashboard" 
            className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition-colors border border-slate-700"
          >
            Rudi Dashboard
          </Link>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden">
          {projects.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <div className="text-4xl mb-4">🔬</div>
              <p className="text-lg mb-4">Bado husajili mradi wowote wa utafiti.</p>
              <Link 
                href="/dashboard/research/new"
                className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded-xl transition-all"
              >
                Sajili Mradi Mpya sasa
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 text-sm border-b border-slate-800">
                    <th className="p-4 font-medium">Kichwa cha Mradi</th>
                    <th className="p-4 font-medium hidden sm:table-cell">Hali</th>
                    <th className="p-4 font-medium hidden sm:table-cell">Tarehe</th>
                    <th className="p-4 font-medium text-right">Vitendo</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {projects.map((p) => (
                    <tr key={p.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                      <td className="p-4">
                        <p className="font-semibold text-slate-200 line-clamp-1">{p.title}</p>
                        <span className="sm:hidden text-xs text-slate-500 mt-1 block">
                          {new Date(p.created_at).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <span className={`px-2 py-1 text-xs rounded-full border ${
                          p.status === 'completed' 
                            ? 'bg-green-900/20 text-green-400 border-green-800/50' 
                            : 'bg-indigo-900/20 text-indigo-400 border-indigo-800/50'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 hidden sm:table-cell text-slate-400">
                        {new Date(p.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <Link 
                          href={`/dashboard/research/${p.id}/edit`}
                          className="inline-block px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
                        >
                          Badili
                        </Link>
                        <button 
                          onClick={() => handleDeleteProject(p.id, p.title)}
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

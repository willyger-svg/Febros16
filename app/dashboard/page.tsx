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

export default function Dashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchApi('/api/v1/users/me');
        if (data.data?.user) {
          setUser(data.data.user);
        }
      } catch (err: any) {
        setError(err.message || 'Imeshindwa kupata taarifa.');
        // Kama kosa ni unauthorized (token imeisha muda au haipo), mpeleke login
        if (err.message.toLowerCase().includes('unauthorized') || err.message.toLowerCase().includes('token')) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

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
            <span className="text-sm text-slate-400 hidden sm:block">Karibu, {user?.full_name}</span>
            <button 
              onClick={logout}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm px-4 py-2 rounded-lg transition-colors border border-slate-700"
            >
              Ondoka (Logout)
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

          {/* Activity/Content Area (Placeholder kwa Phase 3) */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-4">Muhtasari wa Shughuli Zako</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h3 className="text-slate-400 text-sm font-medium">Makala Ulizosoma</h3>
                  <p className="text-3xl font-bold text-white mt-2">0</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <h3 className="text-slate-400 text-sm font-medium">Miradi ya Utafiti</h3>
                  <p className="text-3xl font-bold text-white mt-2">0</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-900/20 border border-blue-900/50 rounded-2xl p-6 shadow-xl">
              <h2 className="text-lg font-bold text-blue-400 mb-2">Phase 3 Ipo Njiani! 🚀</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Umefanikiwa kuingia (Login) kikamilifu na mfumo wa JWT unafanya kazi. 
                Sehemu hii itaanza kuonyesha Makala (Articles), Kampeni (kama OO24), na Workspace yako ya Utafiti (Research) katika awamu inayofuata.
              </p>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}

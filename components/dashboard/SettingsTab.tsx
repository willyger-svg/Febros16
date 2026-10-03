"use client";

import React, { useState } from 'react';
import { User, Lock, AlertTriangle, Loader2 } from 'lucide-react';
import { DashboardTabId } from './DashboardLayout';
import { fetchApi, logout } from '../../lib/api';

interface SettingsTabProps {
  user?: any;
  userStats?: any;
  onNavigateTab: (tab: DashboardTabId) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ user }) => {
  // Profile State
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.profile_picture_url || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ text: '', type: '' });

  // Password State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passLoading, setPassLoading] = useState(false);
  const [passMsg, setPassMsg] = useState({ text: '', type: '' });

  // Delete State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState({ text: '', type: '' });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg({ text: '', type: '' });
    try {
      await fetchApi('/api/v1/settings/profile', {
        method: 'PUT',
        body: JSON.stringify({
          full_name: fullName,
          avatar_url: avatarUrl,
          bio: bio,
        }),
      });
      setProfileMsg({ text: 'Taarifa zimesasishwa kikamilifu.', type: 'success' });
      // Reload page to reflect changes globally
      setTimeout(() => window.location.reload(), 1500);
    } catch (err: any) {
      setProfileMsg({ text: err.message || 'Imeshindwa kusasisha taarifa.', type: 'error' });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassLoading(true);
    setPassMsg({ text: '', type: '' });
    try {
      await fetchApi('/api/v1/settings/password', {
        method: 'PUT',
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });
      setPassMsg({ text: 'Nenosiri limebadilishwa kikamilifu.', type: 'success' });
      setOldPassword('');
      setNewPassword('');
    } catch (err: any) {
      setPassMsg({ text: err.message || 'Imeshindwa kubadili nenosiri.', type: 'error' });
    } finally {
      setPassLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      setDeleteMsg({ text: 'Tafadhali andika DELETE kwa herufi kubwa.', type: 'error' });
      return;
    }
    setDeleteLoading(true);
    setDeleteMsg({ text: '', type: '' });
    try {
      await fetchApi('/api/v1/settings/account', {
        method: 'DELETE',
        body: JSON.stringify({ confirmation: deleteConfirmation }),
      });
      logout();
    } catch (err: any) {
      setDeleteMsg({ text: err.message || 'Imeshindwa kufuta akaunti.', type: 'error' });
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-black text-white">Mipangilio ya Akaunti</h1>
        <p className="text-sm text-slate-300 mt-1">
          Rekebisha taarifa zako, badili nenosiri, au dhibiti akaunti yako.
        </p>
      </div>

      <div className="space-y-6">
        {/* A. REKEBISHA WASIFU */}
        <div className="backdrop-blur-xl bg-slate-900/60 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">Rekebisha Wasifu</h2>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            {profileMsg.text && (
              <div className={`p-3 rounded-xl text-sm font-medium ${profileMsg.type === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
                {profileMsg.text}
              </div>
            )}
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Jina Kamili</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Picha (Avatar URL)</label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/picha.jpg"
                  className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Kuhusu Mimi (Bio)</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={profileLoading}
              className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {profileLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Hifadhi Mabadiliko
            </button>
          </form>
        </div>

        {/* B. BADILI NENOSIRI */}
        <div className="backdrop-blur-xl bg-slate-900/60 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">Usalama & Nenosiri</h2>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            {passMsg.text && (
              <div className={`p-3 rounded-xl text-sm font-medium ${passMsg.type === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
                {passMsg.text}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Nenosiri la Zamani</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Nenosiri Jipya</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={passLoading}
              className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {passLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Badili Nenosiri
            </button>
          </form>
        </div>

        {/* C. ENEO LA HATARI */}
        <div className="backdrop-blur-xl bg-red-950/20 border border-red-900/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-red-400">Eneo la Hatari (Danger Zone)</h2>
          </div>
          
          <p className="text-sm text-slate-300 mb-6">
            Ukifuta akaunti yako, taarifa zako zote, tafiti, na makala vitafutwa moja kwa moja na havitarudishwa.
          </p>

          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="px-6 py-3 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 text-red-300 hover:text-white font-bold rounded-xl text-sm transition-all cursor-pointer"
          >
            Futa Akaunti Yangu
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-red-900/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-2">Una uhakika?</h3>
            <p className="text-sm text-slate-300 mb-6">
              Kitendo hiki hakibadiliki. Andika neno <strong className="text-red-400 select-none">DELETE</strong> kuthibitisha.
            </p>

            {deleteMsg.text && (
              <div className="mb-4 p-3 rounded-xl text-sm font-medium bg-red-500/20 text-red-300 border border-red-500/30">
                {deleteMsg.text}
              </div>
            )}

            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="DELETE"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white mb-6 focus:outline-none focus:border-red-500"
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation('');
                  setDeleteMsg({ text: '', type: '' });
                }}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm transition-all"
              >
                Ghairi
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
              >
                {deleteLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Futa Moja kwa Moja
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsTab;

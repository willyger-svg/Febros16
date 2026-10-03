"use client";

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Brain,
  BarChart3,
  ShieldAlert,
  ClipboardCheck,
  BookOpen,
  FlaskConical,
  Bell,
  LogOut,
  Lock,
} from 'lucide-react';
import AppBackground from '../AppBackground';

export type DashboardTabId =
  | 'dashboard'
  | 'learn'
  | 'progress'
  | 'quick-help'
  | 'checkin'
  | 'library'
  | 'research'
  | 'settings';

interface DashboardLayoutProps {
  user?: any;
  userStats?: any;
  currentTab: DashboardTabId;
  onNavigateTab: (tab: DashboardTabId) => void;
  onNavigateHome: () => void;
  onNavigateAssessment?: () => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  user,
  userStats,
  currentTab,
  onNavigateTab,
  onNavigateHome,
  onNavigateAssessment,
  children,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard' as DashboardTabId, label: 'Dashibodi', icon: LayoutDashboard },
    { id: 'learn' as DashboardTabId, label: 'Jifunze', icon: Brain },
    { id: 'progress' as DashboardTabId, label: 'Maendeleo', icon: BarChart3 },
    { id: 'quick-help' as DashboardTabId, label: 'Msaada wa Haraka', icon: ShieldAlert },
    { id: 'checkin' as DashboardTabId, label: 'Tathmini ya Leo', icon: ClipboardCheck },
    { id: 'library' as DashboardTabId, label: 'Maktaba', icon: BookOpen },
    { id: 'research' as DashboardTabId, label: 'Tafiti', icon: FlaskConical },
  ];

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white flex flex-col selection:bg-blue-600 selection:text-white font-sans overflow-x-hidden">
      {/* Background Ambience (Kwa mbali, imara na thabiti) */}
      <AppBackground intensity="medium" />

      {/* ================= TOP NAVBAR ================= */}
      <header className="relative z-30 w-full border-b border-white/10 backdrop-blur-xl bg-slate-950/70 sticky top-0 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xl">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-blue-400 transition-colors drop-shadow">
              FEBROS16
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest text-blue-300 bg-blue-500/20 border border-blue-400/30 px-2.5 py-0.5 rounded-full">
              Ustawi wa Kidijitali
            </span>
          </button>
        </div>

        {/* Right Nav: Notifications, SOS & Profile */}
        <div className="flex items-center gap-3 sm:gap-4 relative">
          {/* Emergency SOS Button */}
          <button
            type="button"
            onClick={() => onNavigateTab('quick-help')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-300 hover:text-rose-200 text-xs font-bold transition-all shadow-md cursor-pointer animate-pulse"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Msaada wa Papo Hapo</span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer relative"
              aria-label="Taarifa"
            >
              <Bell className="w-4 h-4" />
              
            </button>

            {/* Notifications Popover */}
            {notificationsOpen && (
              <div
                className="absolute right-0 mt-3 w-80 rounded-2xl backdrop-blur-2xl bg-slate-950/95 border border-white/20 p-4 shadow-2xl z-50 animate-in fade-in"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h4 className="text-xs font-bold text-white">Taarifa Zako</h4>
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-slate-400 hover:text-white text-xs cursor-pointer"
                  >
                    Funga
                  </button>
                </div>
                <div className="mt-4 pb-2 text-center text-xs text-slate-400">
                  <p>Hakuna taarifa mpya kwa sasa.</p>
                </div>
              </div>
            )}
          </div>

          {/* Profile User Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            >
              {user?.profile_picture_url ? (
                <img src={user.profile_picture_url} alt={user?.full_name || "Mtumiaji"} className="w-7 h-7 rounded-lg object-cover shadow-md" />
              ) : (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                  {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <span className="text-xs font-semibold text-slate-200 hidden sm:inline-block">
                Wasifu Wangu
              </span>
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div
                className="absolute right-0 mt-3 w-56 rounded-2xl backdrop-blur-2xl bg-slate-950/95 border border-white/20 p-2 shadow-2xl z-50 animate-in fade-in"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-3 py-2 border-b border-white/10 flex items-center gap-3">
                  {user?.profile_picture_url && (
                    <img src={user.profile_picture_url} alt="Profile" className="w-10 h-10 rounded-lg object-cover" />
                  )}
                  <div>
                    <p className="text-xs font-bold text-white truncate max-w-[150px]">{user?.full_name || "Mtumiaji"}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-[150px]">{user?.email || "barua@pepe.com"}</p>
                  </div>
                </div>
                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onNavigateTab('settings');
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors flex items-center gap-2 cursor-pointer mb-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                    <span>Mipangilio ya Akaunti</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      if (onNavigateAssessment) onNavigateAssessment();
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <ClipboardCheck className="w-3.5 h-3.5" />
                    <span>Rudia Maswali ya Tathmini</span>
                  </button>
                  <button
                    type="button"
                    onClick={onNavigateHome}
                    className="w-full text-left px-3 py-2 text-xs text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 rounded-xl transition-colors flex items-center gap-2 cursor-pointer mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Ondoka kwenye Mfumo</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= MAIN LAYOUT WITH SIDEBAR ================= */}
      <div className="relative z-20 flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
        
        {/* ================= LEFT SIDEBAR (100% Swahili) ================= */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 backdrop-blur-xl bg-slate-950/40 p-4 md:p-6 shrink-0 flex md:flex-col justify-between overflow-x-auto md:overflow-visible">
          <nav className="flex md:flex-col gap-1.5 w-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigateTab(item.id)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600/30 text-white border border-blue-400/40 shadow-lg shadow-blue-900/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span className="block leading-tight">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Bottom Sidebar Mini Card */}
          <div className="hidden md:block mt-8 pt-6 border-t border-white/10 text-xs text-slate-400 space-y-3">
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-200 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-white text-[11px] uppercase tracking-wider">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Nafasi ya Faragha</span>
              </span>
              <p className="text-[11px] text-slate-300">
                Ukurasa wako binafsi unaolindwa na usimbuaji wa kisasa wa faragha.
              </p>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">FEBROS16 v2.4 · 2026</p>
          </div>
        </aside>

        {/* ================= RIGHT MAIN WORKSPACE ================= */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-4xl">
          {children}
        </main>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-20 w-full border-t border-white/10 backdrop-blur-xl bg-slate-950/40 py-4 px-6 text-center text-xs text-slate-500">
        <p>© 2026 FEBROS16 · febros16.com · Mfumo Huru wa Ustawi wa Kidijitali.</p>
      </footer>
    </div>
  );
};

export default DashboardLayout;

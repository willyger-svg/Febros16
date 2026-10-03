"use client";

import React, { useState, useEffect } from 'react';
import { fetchApi, logout } from '../lib/api';
import DashboardLayout, { DashboardTabId } from './dashboard/DashboardLayout';
import OverviewTab from './dashboard/OverviewTab';
import LearnTab from './dashboard/LearnTab';
import ProgressTab from './dashboard/ProgressTab';
import QuickHelpTab from './dashboard/QuickHelpTab';
import CheckinTab from './dashboard/CheckinTab';
import LibraryTab from './dashboard/LibraryTab';
import ResearchTab from './dashboard/ResearchTab';
import SettingsTab from './dashboard/SettingsTab';

interface DashboardPageProps {
  onNavigateHome: () => void;
  onNavigateAssessment?: () => void;
  initialTab?: DashboardTabId;
  onTabChange?: (tab: DashboardTabId) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigateHome,
  onNavigateAssessment,
  initialTab = 'dashboard',
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTabId>(initialTab);
  const [user, setUser] = useState<any>(null);
  const [userStats, setUserStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchApi('/api/v1/users/me');
        try {
          const statsRes = await fetchApi('/api/v1/dashboard/stats');
          if (statsRes.data) {
             data.data.stats = { ...data.data.stats, ...statsRes.data };
          }
        } catch (statsErr) {
          console.warn("Failed to fetch dashboard stats", statsErr);
        }
        if (data.data?.user) {
          setUser(data.data.user);
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


  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleNavigateTab = (tab: DashboardTabId) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
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
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Rudi Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      user={user}
      userStats={userStats}
      currentTab={activeTab}
      onNavigateTab={handleNavigateTab}
      onNavigateHome={onNavigateHome}
      onNavigateAssessment={onNavigateAssessment}
    >
      {activeTab === 'dashboard' && <OverviewTab onNavigateTab={handleNavigateTab} user={user} userStats={userStats} />}
      {activeTab === 'learn' && <LearnTab onNavigateTab={handleNavigateTab} user={user} userStats={userStats} />}
      {activeTab === 'progress' && <ProgressTab onNavigateTab={handleNavigateTab} user={user} userStats={userStats} />}
      {activeTab === 'quick-help' && <QuickHelpTab onNavigateTab={handleNavigateTab} user={user} userStats={userStats} />}
      {activeTab === 'checkin' && <CheckinTab onNavigateTab={handleNavigateTab} user={user} userStats={userStats} />}
      {activeTab === 'library' && <LibraryTab onNavigateTab={handleNavigateTab} user={user} userStats={userStats} />}
      {activeTab === 'research' && <ResearchTab onNavigateTab={handleNavigateTab} user={user} userStats={userStats} />}
      {activeTab === 'settings' && <SettingsTab onNavigateTab={handleNavigateTab} user={user} userStats={userStats} />}
    </DashboardLayout>
  );
};

export default DashboardPage;

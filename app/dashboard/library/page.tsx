"use client";

import { useRouter } from 'next/navigation';
import DashboardPage from '../../../components/DashboardPage';

export default function LibraryRoute() {
  const router = useRouter();

  return (
    <DashboardPage
      initialTab="library"
      onNavigateHome={() => router.push('/')}
      onNavigateAssessment={() => router.push('/assessment')}
      onTabChange={(tab) => {
        if (tab === 'dashboard') router.push('/dashboard');
        else router.push(`/dashboard/${tab}`);
      }}
    />
  );
}

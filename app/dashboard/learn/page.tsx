"use client";

import { useRouter } from 'next/navigation';
import DashboardPage from '../../../components/DashboardPage';

export default function LearnRoute() {
  const router = useRouter();

  return (
    <DashboardPage
      initialTab="learn"
      onNavigateHome={() => router.push('/')}
      onNavigateAssessment={() => router.push('/assessment')}
      onTabChange={(tab) => {
        if (tab === 'dashboard') router.push('/dashboard');
        else router.push(`/dashboard/${tab}`);
      }}
    />
  );
}

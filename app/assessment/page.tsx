"use client";

import { useRouter } from 'next/navigation';
import AssessmentPage from '../../components/AssessmentPage';

export default function AssessmentRoute() {
  const router = useRouter();

  return (
    <AssessmentPage
      onNavigateHome={() => router.push('/')}
    />
  );
}

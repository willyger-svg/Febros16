"use client";

import { useRouter } from 'next/navigation';
import { SignUpPage } from '../../components/SignUpPage';

export default function RegisterRoute() {
  const router = useRouter();

  return (
    <SignUpPage
      onNavigateHome={() => router.push('/')}
      onNavigateLogin={() => router.push('/login')}
    />
  );
}
"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { LoginPage } from '../../components/LoginPage';
import { useEffect, Suspense } from 'react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const assessed = searchParams.get('assessed');
    const verified = searchParams.get('verified') === 'true';

    if (token) {
      localStorage.setItem('token', token);
      if (assessed === 'true') {
        router.push('/dashboard');
      } else {
        router.push('/assessment');
      }
    }
  }, [searchParams, router]);

  return (
    <LoginPage
      onNavigateHome={() => router.push('/')}
      onNavigateSignup={() => router.push('/register')}
      isVerified={searchParams.get('verified') === 'true'}
    />
  );
}

export default function LoginRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div></div>}>
      <LoginContent />
    </Suspense>
  );
}

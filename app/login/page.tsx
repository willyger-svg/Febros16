"use client";

import { useRouter } from 'next/navigation';
import { LoginPage } from '../../components/LoginPage';

export default function LoginRoute() {
  const router = useRouter();

  return (
    <LoginPage
      onNavigateHome={() => router.push('/')}
      onNavigateSignup={() => router.push('/register')}
    />
  );
}
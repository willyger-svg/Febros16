"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }
  }, []);

  const handleLogout = () => {
    import('@/lib/api').then(({ logout }) => logout());
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 border-b border-white/10 bg-black/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white">
          FEBROS<span className="text-blue-500">16</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/articles" className="hover:text-white transition-colors">Discover</Link>
          <Link href="#" className="hover:text-white transition-colors">Knowledge</Link>
          <Link href="/research" className="hover:text-white transition-colors">Research</Link>
          <Link href="#" className="hover:text-white transition-colors">Resources</Link>
          <Link href="/campaigns/oo24" className="hover:text-white transition-colors">Campaigns</Link>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex gap-4 items-center">
          <button className="text-slate-300 hover:text-white" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          
          <span className="text-white/20">|</span>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="px-5 py-2 text-sm font-medium text-white hover:text-blue-400 transition-colors border border-white/20 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-lg">
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="px-5 py-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-5 py-2 text-sm font-medium text-white hover:text-blue-400 transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                Create Account
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 shadow-2xl">
          <Link href="/" className="text-white font-medium block py-2">Home</Link>
          <Link href="/articles" className="text-white font-medium block py-2">Discover</Link>
          <Link href="#" className="text-white font-medium block py-2">Knowledge</Link>
          <Link href="/research" className="text-white font-medium block py-2">Research</Link>
          <Link href="#" className="text-white font-medium block py-2">Resources</Link>
          <Link href="/campaigns/oo24" className="text-white font-medium block py-2">Campaigns</Link>
          
          <div className="h-px bg-slate-800 my-2"></div>
          
          {isLoggedIn ? (
            <div className="flex flex-col gap-4 mt-2">
              <Link href="/dashboard" className="w-full text-center px-5 py-3 text-sm font-medium text-white border border-slate-700 rounded-full bg-slate-800">
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full text-center px-5 py-3 text-sm font-medium text-red-400 bg-red-950/30 rounded-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-2">
              <Link href="/login" className="w-full text-center px-5 py-3 text-sm font-medium text-white bg-slate-800 rounded-full">
                Sign In
              </Link>
              <Link href="/register" className="w-full text-center px-5 py-3 text-sm font-semibold bg-blue-600 text-white rounded-full">
                Create Account
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

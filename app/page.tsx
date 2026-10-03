import React from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeatureCards from '@/components/landing/FeatureCards';
import CategoryGrid from '@/components/landing/CategoryGrid';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 font-sans selection:bg-blue-500/30 selection:text-white">
      <Navbar />
      
      <HeroSection />
      
      <FeatureCards />
      
      <CategoryGrid />

      {/* Simple Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-extrabold tracking-tighter text-white">
            FEBROS<span className="text-blue-500">16</span>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} FEBROS16. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

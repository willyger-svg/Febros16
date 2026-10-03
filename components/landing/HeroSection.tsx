import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-24 pb-32">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744626753-1fa44df31c7f?q=80&w=2000&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center mt-12 md:mt-0">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
          A platform for knowledge, <br className="hidden md:block"/> research and information
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed drop-shadow">
          Explore articles, educational materials, research resources, opportunities and more in one place.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-16 shadow-2xl">
          <input 
            type="text" 
            placeholder="Search for topics, articles, research..." 
            className="w-full bg-white/10 border border-white/20 backdrop-blur-md rounded-full py-5 pl-8 pr-32 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
          />
          <button className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full px-8 transition-colors">
            Search
          </button>
        </div>

        {/* Dynamic Stats (Mocked for now) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-white/10 pt-8">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">100+</h3>
            <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Articles</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">50+</h3>
            <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Resources</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">20+</h3>
            <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Research</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">10+</h3>
            <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Campaigns</p>
          </div>
        </div>
      </div>
    </div>
  );
}

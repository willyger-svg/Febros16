"use client";

import React, { useState } from 'react';
import { Send, Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubscribeStatus('Please enter a valid email address.');
      return;
    }
    setSubscribeStatus('Thank you for subscribing to the Febros16 Dispatch.');
    setEmail('');
  };

  const navColumns = [
    {
      title: 'Platform Sections',
      links: [
        { label: 'Overview & Hero', href: '#home' },
        { label: 'Discover Modules', href: '#features' },
        { label: 'Knowledge Domains', href: '#categories' },
        { label: 'Research Workflow', href: '#research-workflow' },
        { label: 'Public Campaigns', href: '#ecosystem' },
      ],
    },
    {
      title: 'Knowledge Categories',
      links: [
        { label: 'Education Systems', href: '#categories' },
        { label: 'Technology & AI', href: '#categories' },
        { label: 'Environmental Science', href: '#categories' },
        { label: 'Scientific Methodology', href: '#categories' },
        { label: 'Social Institutions', href: '#categories' },
        { label: 'Health & Biology', href: '#categories' },
      ],
    },
    {
      title: 'Initiatives',
      links: [
        { label: 'Project OO24', href: '#ecosystem' },
        { label: 'Digital Wellness', href: '#ecosystem' },
        { label: 'Open Knowledge Commons', href: '#ecosystem' },
        { label: 'Source Verification', href: '#research-workflow' },
      ],
    },
    {
      title: 'Platform & Trust',
      links: [
        { label: 'febros16.com Domain', href: 'https://febros16.com' },
        { label: 'Editorial Policy', href: '#home' },
        { label: 'Privacy Standards', href: '#home' },
        { label: 'Citation Integrity', href: '#research-workflow' },
      ],
    },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800" role="contentinfo">
      {/* Top Banner: Dispatch */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              The Febros16 Dispatch
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              Stay connected with peer-reviewed research & global opportunities
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
              Receive weekly digests of curated papers, open fellowships, research grants, and platform updates. No spam, ever.
            </p>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your academic or work email"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                aria-label="Email address for dispatch subscription"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-colors shrink-0 shadow-md shadow-blue-900/30 cursor-pointer"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
            {subscribeStatus && (
              <p className="mt-2 text-xs text-blue-400 font-medium">
                {subscribeStatus}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="text-2xl font-black tracking-tight text-white inline-block hover:text-blue-400 transition-colors">
              FEBROS16
            </a>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              A long-term multipurpose platform connecting people with verified knowledge, research, education, resources, and opportunities.
            </p>
            <div className="pt-2 text-xs font-mono text-slate-500">
              <div>Primary Domain:</div>
              <a href="https://febros16.com" className="text-blue-400 hover:underline">
                febros16.com
              </a>
            </div>
          </div>

          {navColumns.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                {col.title}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {col.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Platform Status: <strong>Operational</strong></span>
            </div>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>Domain: <strong>febros16.com</strong></span>
          </div>

          <div className="flex items-center gap-6">
            <span>© 2026 FEBROS16. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

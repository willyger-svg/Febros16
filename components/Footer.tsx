"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Activity, Send } from 'lucide-react';
import { apiService } from '../src/services/api';
import { ApiStatus } from '../src/types';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    online: true,
    endpoint: 'https://api.febros16.com/api/v1',
    latencyMs: 18,
    version: 'v1.0.0 (Go on Render)',
    mode: 'connected',
  });

  useEffect(() => {
    apiService.checkHealth().then((status) => {
      setApiStatus(status);
    });
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubscribeStatus('Please enter a valid email address.');
      return;
    }
    const res = await apiService.subscribeNewsletter(email);
    setSubscribeStatus(res.message);
    setEmail('');
  };

  const navColumns = [
    {
      title: 'Platform Modules',
      links: [
        { label: 'Discover Stream', href: '/discover' },
        { label: 'Knowledge Base', href: '/knowledge' },
        { label: 'Structured Learning', href: '/learn' },
        { label: 'Research Workspace', href: '/research' },
        { label: 'Resource Directory', href: '/resources' },
        { label: 'Global Opportunities', href: '/opportunities' },
      ],
    },
    {
      title: 'Knowledge Categories',
      links: [
        { label: 'Education Systems', href: '/knowledge?category=education' },
        { label: 'Technology & AI', href: '/knowledge?category=technology' },
        { label: 'Environmental Science', href: '/knowledge?category=environment' },
        { label: 'Scientific Methodology', href: '/knowledge?category=research' },
        { label: 'Social Institutions', href: '/knowledge?category=society' },
        { label: 'Health & Biology', href: '/knowledge?category=health' },
      ],
    },
    {
      title: 'Initiatives & Research',
      links: [
        { label: 'Project OO24', href: '/campaigns#oo24' },
        { label: 'Digital Wellness Standard', href: '/campaigns#digital-wellness' },
        { label: 'Open Science Commons', href: '/campaigns#open-commons' },
        { label: 'Verification Protocol', href: '/research' },
        { label: 'Citation Standards', href: '/research' },
      ],
    },
    {
      title: 'Architecture & Trust',
      links: [
        { label: 'febros16.com Domain', href: 'https://febros16.com' },
        { label: 'Go REST API Spec', href: '/resources' },
        { label: 'PostgreSQL Datastore', href: '/research' },
        { label: 'Editorial Independence', href: '/discover' },
        { label: 'Privacy & Data Terms', href: '/discover' },
      ],
    },
  ];

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
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <Link href="/" className="text-2xl font-black tracking-tight text-white inline-block hover:text-blue-400 transition-colors">
              FEBROS16
            </Link>
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

          {/* Links */}
          {navColumns.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                {col.title}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {col.links.map((link, i) => (
                  <li key={i}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* System Architecture */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Go Backend (Render): <strong>Active</strong></span>
            </div>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>Frontend: <strong>Next.js 16 (App Router on Vercel)</strong></span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>Database: <strong>PostgreSQL</strong></span>
          </div>

          <div className="flex items-center gap-6">
            <span>© 2026 FEBROS16. All rights reserved.</span>
            <span>febros16.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

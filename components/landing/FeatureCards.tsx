import React from 'react';
import Link from 'next/link';

const features = [
  {
    title: 'Discover',
    description: 'Read the latest articles and insightful stories from our community of writers.',
    icon: '🧭',
    link: '/articles'
  },
  {
    title: 'Learn',
    description: 'Access educational materials, tutorials, and courses to enhance your skills.',
    icon: '📚',
    link: '#'
  },
  {
    title: 'Research',
    description: 'Dive deep into academic and field research projects published by experts.',
    icon: '🔬',
    link: '/research'
  },
  {
    title: 'Resources',
    description: 'Download tools, templates, and essential assets for your next project.',
    icon: '📦',
    link: '#'
  },
  {
    title: 'Opportunities',
    description: 'Find jobs, internships, scholarships, and networking events globally.',
    icon: '🚀',
    link: '#'
  },
  {
    title: 'Campaigns',
    description: 'Join movements like OO24 and contribute to impactful societal changes.',
    icon: '🌍',
    link: '/campaigns/oo24'
  }
];

export default function FeatureCards() {
  return (
    <div className="relative z-20 max-w-7xl mx-auto px-6 -mt-24 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, index) => (
          <Link href={feat.link} key={index} className="group block">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-slate-800/80 transition-all duration-300 h-full flex flex-col hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="text-4xl mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-colors">
                {feat.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{feat.title}</h3>
              <p className="text-slate-400 leading-relaxed flex-grow mb-6">
                {feat.description}
              </p>
              <div className="mt-auto flex items-center text-blue-400 font-semibold group-hover:text-blue-300">
                Explore <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

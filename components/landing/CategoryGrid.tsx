import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    title: 'Education',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
    link: '#'
  },
  {
    title: 'Technology',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    link: '#'
  },
  {
    title: 'Research',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop',
    link: '/research'
  },
  {
    title: 'Environment',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
    link: '#'
  },
  {
    title: 'Health',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop',
    link: '#'
  },
  {
    title: 'Business',
    image: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?q=80&w=800&auto=format&fit=crop',
    link: '#'
  }
];

export default function CategoryGrid() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 md:flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Explore by category
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl">
              Browse through our curated collections of articles, research papers, and resources categorized for your convenience.
            </p>
          </div>
          <Link href="/articles" className="hidden md:inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            View all categories <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <Link href={cat.link} key={index} className="group block relative overflow-hidden rounded-3xl aspect-[4/3] bg-slate-200">
              <Image 
                src={cat.image} 
                alt={cat.title} 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{cat.title}</h3>
                <p className="text-white/70 text-sm font-medium">Explore collection</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 md:hidden text-center">
          <Link href="/articles" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            View all categories <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
